-- Sosyal Avcısı: sınıf ligi ve öğretmen paneli için veritabanı.
-- Supabase > SQL Editor'e yapıştırıp bir kez çalıştırın (tekrar çalıştırmak güvenlidir).
-- Tablolara doğrudan erişim kapalıdır; uygulama yalnızca aşağıdaki sa_* fonksiyonlarını çağırır.

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.sa_classes (
  code        text primary key,
  name        text not null,
  pin_hash    text not null,
  fail_count  int  not null default 0,
  fail_at     timestamptz,
  created_at  timestamptz not null default now()
);

create table if not exists public.sa_students (
  id          uuid primary key default gen_random_uuid(),
  class_code  text not null references public.sa_classes(code) on delete cascade,
  name        text not null,
  login_code  text not null,
  token       uuid not null default gen_random_uuid(),
  xp          int  not null default 0,
  created_at  timestamptz not null default now(),
  last_seen   timestamptz not null default now(),
  unique (class_code, login_code)
);

create table if not exists public.sa_events (
  id          bigserial primary key,
  student_id  uuid not null references public.sa_students(id) on delete cascade,
  class_code  text not null,
  kind        text not null check (kind in ('open','lesson','boss','review','daily')),
  item        text not null default '',
  correct     int  not null default 0,
  total       int  not null default 0,
  xp          int  not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists sa_events_class_time on public.sa_events (class_code, created_at);
create index if not exists sa_events_student on public.sa_events (student_id, created_at);
create index if not exists sa_students_class on public.sa_students (class_code);

alter table public.sa_classes  enable row level security;
alter table public.sa_students enable row level security;
alter table public.sa_events   enable row level security;
revoke all on public.sa_classes, public.sa_students, public.sa_events from anon, authenticated;

-- Dönüş tipi değişen eski sürümleri kaldır (yeniden çalıştırma için).
drop function if exists public.sa_check_pin(text, text);
drop function if exists public.sa_teacher_remove(text, text, uuid);
drop function if exists public.sa_teacher_rename_class(text, text, text);
drop function if exists public.sa_board(text);

-- Karıştırılmayan harfler: 0/O, 1/I gibi çiftler yok.
create or replace function public.sa_rand_code(n int) returns text
language sql volatile set search_path = public, extensions as $$
  select string_agg(substr('ABCDEFGHJKMNPRSTUVYZ23456789', 1 + floor(random()*28)::int, 1), '')
  from generate_series(1, n);
$$;

-- Haftanın başlangıcı: Türkiye saatiyle pazartesi 00:00.
create or replace function public.sa_week_start() returns timestamptz
language sql stable set search_path = public as $$
  select date_trunc('week', now() at time zone 'Europe/Istanbul') at time zone 'Europe/Istanbul';
$$;

create or replace function public.sa_today() returns text
language sql stable set search_path = public as $$
  select to_char(now() at time zone 'Europe/Istanbul', 'YYYY-MM-DD');
$$;

-- Öğretmen PIN'ini doğrular; 15 dakikada 10 hatalı denemeden sonra sınıfı geçici kilitler.
-- Hata fırlatmaz: fırlatsaydı hatalı deneme sayacı da geri alınırdı.
create or replace function public.sa_check_pin(p_code text, p_pin text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare c public.sa_classes;
begin
  select * into c from public.sa_classes where code = upper(trim(p_code));
  if not found then return 'class_not_found'; end if;
  if c.fail_count >= 10 and c.fail_at > now() - interval '15 minutes' then
    return 'too_many_attempts';
  end if;
  if c.pin_hash <> crypt(coalesce(p_pin, ''), c.pin_hash) then
    update public.sa_classes
      set fail_count = case when fail_at > now() - interval '15 minutes' then fail_count + 1 else 1 end,
          fail_at = now()
      where code = c.code;
    return 'wrong_pin';
  end if;
  update public.sa_classes set fail_count = 0 where code = c.code and fail_count > 0;
  return 'ok';
end $$;

create or replace function public.sa_create_class(p_name text, p_pin text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare v_code text;
begin
  p_name := trim(coalesce(p_name, ''));
  if length(p_name) < 1 or length(p_name) > 60 then raise exception 'bad_name'; end if;
  if p_pin !~ '^[0-9]{4,12}$' then raise exception 'bad_pin'; end if;
  loop
    v_code := sa_rand_code(6);
    exit when not exists (select 1 from public.sa_classes where code = v_code);
  end loop;
  insert into public.sa_classes (code, name, pin_hash) values (v_code, p_name, crypt(p_pin, gen_salt('bf')));
  return v_code;
end $$;

create or replace function public.sa_class_info(p_code text) returns table (name text, students int)
language sql stable security definer set search_path = public as $$
  select c.name, (select count(*)::int from public.sa_students s where s.class_code = c.code)
  from public.sa_classes c where c.code = upper(trim(p_code));
$$;

create or replace function public.sa_join(p_code text, p_name text)
returns table (student_id uuid, token uuid, login_code text, class_name text)
language plpgsql security definer set search_path = public, extensions as $$
declare c public.sa_classes; v_login text; s public.sa_students;
begin
  select * into c from public.sa_classes where code = upper(trim(p_code));
  if not found then raise exception 'class_not_found'; end if;
  p_name := trim(regexp_replace(coalesce(p_name, ''), '\s+', ' ', 'g'));
  if length(p_name) < 2 or length(p_name) > 24 then raise exception 'bad_name'; end if;
  if (select count(*) from public.sa_students where class_code = c.code) >= 300 then raise exception 'class_full'; end if;
  if exists (select 1 from public.sa_students x where x.class_code = c.code and lower(x.name) = lower(p_name)) then
    raise exception 'name_taken';
  end if;
  loop
    v_login := sa_rand_code(5);
    exit when not exists (select 1 from public.sa_students x where x.class_code = c.code and x.login_code = v_login);
  end loop;
  insert into public.sa_students (class_code, name, login_code) values (c.code, p_name, v_login) returning * into s;
  return query select s.id, s.token, s.login_code, c.name;
end $$;

-- Telefon değişince: öğretmen panelindeki ya da profildeki giriş koduyla aynı hesaba dönülür.
create or replace function public.sa_rejoin(p_code text, p_login text)
returns table (student_id uuid, token uuid, login_code text, class_name text, name text, xp int)
language sql stable security definer set search_path = public as $$
  select s.id, s.token, s.login_code, c.name, s.name, s.xp
  from public.sa_students s join public.sa_classes c on c.code = s.class_code
  where s.class_code = upper(trim(p_code)) and s.login_code = upper(trim(p_login));
$$;

create or replace function public.sa_log(p_student uuid, p_token uuid, p_kind text, p_item text,
                                         p_correct int, p_total int, p_xp int) returns int
language plpgsql security definer set search_path = public as $$
declare s public.sa_students; v_xp int;
begin
  select * into s from public.sa_students where id = p_student and token = p_token;
  if not found then raise exception 'bad_token'; end if;
  -- Aşırı hızlı istekleri sessizce yok say (hile ve hata koruması).
  if (select count(*) from public.sa_events where student_id = s.id and created_at > now() - interval '10 minutes') >= 80 then
    return s.xp;
  end if;
  v_xp := greatest(0, least(coalesce(p_xp, 0), 400));
  -- Günün meydan okumasında yalnızca ilk deneme sayılır.
  if p_kind = 'daily' and exists (select 1 from public.sa_events e where e.student_id = s.id and e.kind = 'daily' and e.item = p_item) then
    v_xp := 0;
    p_item := p_item || '+';
  end if;
  insert into public.sa_events (student_id, class_code, kind, item, correct, total, xp)
    values (s.id, s.class_code, p_kind, left(coalesce(p_item, ''), 40),
            greatest(0, least(coalesce(p_correct, 0), 100)), greatest(0, least(coalesce(p_total, 0), 100)), v_xp);
  update public.sa_students set xp = xp + v_xp, last_seen = now() where id = s.id returning xp into v_xp;
  return v_xp;
end $$;

-- Sınıf ligi: herkes kendi sınıfını görür (sınıf kodu bilinerek).
create or replace function public.sa_board(p_code text)
returns table (name text, xp int, week_xp int, daily_correct int, daily_total int)
language sql stable security definer set search_path = public as $$
  select s.name, s.xp,
    coalesce((select sum(e.xp)::int from public.sa_events e where e.student_id = s.id and e.created_at >= sa_week_start()), 0),
    d.correct, d.total
  from public.sa_students s
  left join lateral (
    select e.correct, e.total from public.sa_events e
    where e.student_id = s.id and e.kind = 'daily' and e.item = sa_today()
    order by e.id limit 1
  ) d on true
  where s.class_code = upper(trim(p_code))
  order by 3 desc, s.xp desc, s.name
  limit 300;
$$;

create or replace function public.sa_teacher(p_code text, p_pin text) returns json
language plpgsql security definer set search_path = public, extensions as $$
declare v_code text := upper(trim(p_code)); r json; v_ok text;
begin
  v_ok := sa_check_pin(v_code, p_pin);
  if v_ok <> 'ok' then return json_build_object('error', v_ok); end if;
  select json_build_object(
    'name', (select name from public.sa_classes where code = v_code),
    'code', v_code,
    'students', coalesce((select json_agg(x order by x.week_xp desc, x.xp desc) from (
        select s.id, s.name, s.login_code, s.xp, s.last_seen, s.created_at,
          coalesce(sum(e.xp) filter (where e.created_at >= sa_week_start()), 0)::int as week_xp,
          count(*) filter (where e.kind = 'open')::int as opens,
          count(*) filter (where e.kind = 'open' and e.created_at >= sa_week_start())::int as week_opens,
          count(*) filter (where e.kind = 'lesson')::int as lessons,
          count(distinct e.item) filter (where e.kind = 'lesson')::int as lessons_unique,
          count(*) filter (where e.kind = 'boss')::int as bosses,
          count(*) filter (where e.kind = 'review')::int as reviews,
          count(*) filter (where e.kind = 'daily')::int as dailies,
          coalesce(sum(e.correct) filter (where e.kind <> 'open'), 0)::int as correct,
          coalesce(sum(e.total) filter (where e.kind <> 'open'), 0)::int as total,
          count(distinct (e.created_at at time zone 'Europe/Istanbul')::date)::int as active_days
        from public.sa_students s
        left join public.sa_events e on e.student_id = s.id
        where s.class_code = v_code
        group by s.id) x), '[]'::json),
    'days', coalesce((select json_agg(d order by d.day) from (
        select to_char((e.created_at at time zone 'Europe/Istanbul')::date, 'YYYY-MM-DD') as day,
               count(*) filter (where e.kind = 'open')::int as opens,
               count(*) filter (where e.kind <> 'open')::int as plays,
               count(distinct e.student_id)::int as students
        from public.sa_events e
        where e.class_code = v_code and e.created_at > now() - interval '14 days'
        group by 1) d), '[]'::json),
    'units', coalesce((select json_agg(u order by u.unit) from (
        select substring(e.item from '^u([0-9]+)')::int as unit,
               sum(e.correct)::int as correct, sum(e.total)::int as total,
               count(distinct e.student_id)::int as students
        from public.sa_events e
        where e.class_code = v_code and e.kind in ('lesson','boss','review') and e.item ~ '^u[0-9]+'
        group by 1) u), '[]'::json),
    'items', coalesce((select json_agg(i) from (
        select e.item, sum(e.correct)::int as correct, sum(e.total)::int as total, count(distinct e.student_id)::int as students
        from public.sa_events e
        where e.class_code = v_code and e.kind = 'lesson'
        group by e.item) i), '[]'::json)
  ) into r;
  return r;
end $$;

create or replace function public.sa_teacher_remove(p_code text, p_pin text, p_student uuid) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare v_ok text := sa_check_pin(p_code, p_pin);
begin
  if v_ok <> 'ok' then return v_ok; end if;
  delete from public.sa_students where id = p_student and class_code = upper(trim(p_code));
  return 'ok';
end $$;

create or replace function public.sa_teacher_rename_class(p_code text, p_pin text, p_name text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare v_ok text := sa_check_pin(p_code, p_pin);
begin
  if v_ok <> 'ok' then return v_ok; end if;
  p_name := trim(coalesce(p_name, ''));
  if length(p_name) < 1 or length(p_name) > 60 then return 'bad_name'; end if;
  update public.sa_classes set name = p_name where code = upper(trim(p_code));
  return 'ok';
end $$;

revoke execute on function public.sa_check_pin(text, text) from public, anon, authenticated;
revoke execute on function public.sa_rand_code(int) from public, anon, authenticated;
grant execute on function
  public.sa_create_class(text, text), public.sa_class_info(text), public.sa_join(text, text),
  public.sa_rejoin(text, text), public.sa_log(uuid, uuid, text, text, int, int, int),
  public.sa_board(text), public.sa_teacher(text, text), public.sa_teacher_remove(text, text, uuid),
  public.sa_teacher_rename_class(text, text, text)
  to anon, authenticated;
