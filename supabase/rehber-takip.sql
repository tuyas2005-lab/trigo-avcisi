-- Rehber Takip: öğretmen hesapları, ücretsiz öğrenci sınırı ve üyelik başvuruları.
-- KVKK: öğrenci kayıtları burada TUTULMAZ; yalnızca öğretmenin kendi cihazında (tarayıcıda) saklanır.
-- Sunucuda yalnızca öğretmenin adı, e-postası, okulu, üyelik bilgisi ve başvuruları bulunur.
-- Supabase > SQL Editor'e yapıştırıp bir kez çalıştırın (tekrar çalıştırmak güvenlidir).
-- Tablolara doğrudan erişim kapalıdır; site yalnızca aşağıdaki rg_* fonksiyonlarını çağırır.
-- En sonda yönetici PIN'inizi belirleyin: select public.rg_set_admin_pin('BURAYA-PIN');
-- Ücretsiz dönem (sınır yok):   update public.rg_settings set free_limit = null;
-- 30 öğrenci sınırını açmak:    update public.rg_settings set free_limit = 30;

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.rg_teachers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  name        text not null,
  school      text not null default '',
  pw_hash     text not null,
  token       uuid not null default gen_random_uuid(),
  member_until date,
  fail_count  int  not null default 0,
  fail_at     timestamptz,
  created_at  timestamptz not null default now(),
  last_seen   timestamptz not null default now()
);

create table if not exists public.rg_requests (
  id          bigserial primary key,
  teacher_id  uuid not null references public.rg_teachers(id) on delete cascade,
  plan        text not null check (plan in ('aylik','yillik')),
  note        text not null default '',
  status      text not null default 'bekliyor' check (status in ('bekliyor','onaylandi','reddedildi')),
  created_at  timestamptz not null default now(),
  decided_at  timestamptz
);

create table if not exists public.rg_settings (
  id             int primary key default 1 check (id = 1),
  admin_pin_hash text,
  admin_fail     int not null default 0,
  admin_fail_at  timestamptz
);
insert into public.rg_settings (id) values (1) on conflict do nothing;
-- Üye olmayan hesabın en fazla kaç öğrenci kaydedebileceği; null ise sınır yok (ücretsiz dönem).
alter table public.rg_settings add column if not exists free_limit int default 30;

create index if not exists rg_requests_teacher on public.rg_requests (teacher_id, created_at);

alter table public.rg_teachers enable row level security;
alter table public.rg_requests enable row level security;
alter table public.rg_settings enable row level security;
revoke all on public.rg_teachers, public.rg_requests, public.rg_settings from anon, authenticated;

create or replace function public.rg_free_limit() returns int
language sql stable security definer set search_path = public as $$ select free_limit from public.rg_settings where id = 1 $$;

-- Sitenin herkese açık bilgisi: ücretsiz dönemde free_limit null döner.
create or replace function public.rg_public_info() returns json
language sql stable security definer set search_path = public as $$
  select json_build_object('free_limit', free_limit) from public.rg_settings where id = 1
$$;

create or replace function public.rg_is_member(t public.rg_teachers) returns boolean
language sql stable as $$ select t.member_until is not null and t.member_until >= (now() at time zone 'Europe/Istanbul')::date $$;

-- Jetonu doğrular; yanlışsa 'bad_token' fırlatır.
create or replace function public.rg_auth(p_teacher uuid, p_token uuid) returns public.rg_teachers
language plpgsql security definer set search_path = public as $$
declare t public.rg_teachers;
begin
  select * into t from public.rg_teachers where id = p_teacher and token = p_token;
  if not found then raise exception 'bad_token'; end if;
  if t.last_seen < now() - interval '10 minutes' then
    update public.rg_teachers set last_seen = now() where id = t.id;
  end if;
  return t;
end $$;

create or replace function public.rg_register(p_email text, p_password text, p_name text, p_school text)
returns table (teacher_id uuid, token uuid)
language plpgsql security definer set search_path = public, extensions as $$
declare t public.rg_teachers;
begin
  p_email := lower(trim(coalesce(p_email, '')));
  p_name := trim(regexp_replace(coalesce(p_name, ''), '\s+', ' ', 'g'));
  p_school := trim(coalesce(p_school, ''));
  if p_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(p_email) > 120 then raise exception 'bad_email'; end if;
  if length(coalesce(p_password, '')) < 8 or length(p_password) > 72 then raise exception 'bad_password'; end if;
  if length(p_name) < 2 or length(p_name) > 60 then raise exception 'bad_name'; end if;
  if length(p_school) > 100 then raise exception 'bad_school'; end if;
  if exists (select 1 from public.rg_teachers x where x.email = p_email) then raise exception 'email_taken'; end if;
  insert into public.rg_teachers (email, name, school, pw_hash)
    values (p_email, p_name, p_school, crypt(p_password, gen_salt('bf')))
    returning * into t;
  return query select t.id, t.token;
end $$;

-- 15 dakikada 10 hatalı denemeden sonra hesabı geçici kilitler.
-- Hata fırlatmaz: fırlatsaydı hatalı deneme sayacı da geri alınırdı.
create or replace function public.rg_login(p_email text, p_password text)
returns table (teacher_id uuid, token uuid, error text)
language plpgsql security definer set search_path = public, extensions as $$
declare t public.rg_teachers;
begin
  select * into t from public.rg_teachers where email = lower(trim(coalesce(p_email, '')));
  if not found then return query select null::uuid, null::uuid, 'wrong_login'::text; return; end if;
  if t.fail_count >= 10 and t.fail_at > now() - interval '15 minutes' then
    return query select null::uuid, null::uuid, 'too_many_attempts'::text; return;
  end if;
  if t.pw_hash <> crypt(coalesce(p_password, ''), t.pw_hash) then
    update public.rg_teachers
      set fail_count = case when fail_at > now() - interval '15 minutes' then fail_count + 1 else 1 end,
          fail_at = now()
      where id = t.id;
    return query select null::uuid, null::uuid, 'wrong_login'::text; return;
  end if;
  update public.rg_teachers set fail_count = 0, last_seen = now() where id = t.id;
  return query select t.id, t.token, null::text;
end $$;

-- Tüm cihazlardan çıkış: jetonu yeniler.
create or replace function public.rg_logout_all(p_teacher uuid, p_token uuid) returns text
language plpgsql security definer set search_path = public as $$
begin
  perform public.rg_auth(p_teacher, p_token);
  update public.rg_teachers set token = gen_random_uuid() where id = p_teacher;
  return 'ok';
end $$;

create or replace function public.rg_me(p_teacher uuid, p_token uuid) returns json
language plpgsql security definer set search_path = public as $$
declare t public.rg_teachers;
begin
  t := public.rg_auth(p_teacher, p_token);
  return json_build_object(
    'name', t.name, 'email', t.email, 'school', t.school,
    'member', public.rg_is_member(t), 'member_until', t.member_until,
    'limit', case when public.rg_is_member(t) then null else public.rg_free_limit() end,
    'request', (select json_build_object('plan', r.plan, 'status', r.status, 'created_at', r.created_at)
                from public.rg_requests r where r.teacher_id = t.id order by r.created_at desc limit 1)
  );
end $$;

create or replace function public.rg_request_membership(p_teacher uuid, p_token uuid, p_plan text, p_note text) returns text
language plpgsql security definer set search_path = public as $$
begin
  perform public.rg_auth(p_teacher, p_token);
  if p_plan not in ('aylik', 'yillik') then raise exception 'bad_plan'; end if;
  if exists (select 1 from public.rg_requests where teacher_id = p_teacher and status = 'bekliyor') then
    raise exception 'request_pending';
  end if;
  insert into public.rg_requests (teacher_id, plan, note) values (p_teacher, p_plan, left(trim(coalesce(p_note, '')), 500));
  return 'ok';
end $$;

-- Yönetici PIN'i yalnızca SQL Editor'den belirlenir (site bu fonksiyonu çağıramaz).
create or replace function public.rg_set_admin_pin(p_pin text) returns text
language plpgsql security definer set search_path = public, extensions as $$
begin
  if length(coalesce(p_pin, '')) < 8 then raise exception 'PIN en az 8 karakter olmalı'; end if;
  update public.rg_settings set admin_pin_hash = crypt(p_pin, gen_salt('bf')), admin_fail = 0 where id = 1;
  return 'ok';
end $$;

create or replace function public.rg_check_admin(p_pin text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare s public.rg_settings;
begin
  select * into s from public.rg_settings where id = 1;
  if s.admin_pin_hash is null then return 'admin_not_set'; end if;
  if s.admin_fail >= 5 and s.admin_fail_at > now() - interval '15 minutes' then return 'too_many_attempts'; end if;
  if s.admin_pin_hash <> crypt(coalesce(p_pin, ''), s.admin_pin_hash) then
    update public.rg_settings
      set admin_fail = case when admin_fail_at > now() - interval '15 minutes' then admin_fail + 1 else 1 end,
          admin_fail_at = now()
      where id = 1;
    return 'wrong_pin';
  end if;
  update public.rg_settings set admin_fail = 0 where id = 1 and admin_fail > 0;
  return 'ok';
end $$;

create or replace function public.rg_admin(p_pin text) returns json
language plpgsql security definer set search_path = public as $$
declare v text;
begin
  v := public.rg_check_admin(p_pin);
  if v <> 'ok' then return json_build_object('error', v); end if;
  return json_build_object(
    'teachers', coalesce((select json_agg(json_build_object(
        'id', t.id, 'name', t.name, 'email', t.email, 'school', t.school,
        'member_until', t.member_until, 'member', public.rg_is_member(t),
        'created_at', t.created_at, 'last_seen', t.last_seen) order by t.created_at desc)
      from public.rg_teachers t), '[]'::json),
    'requests', coalesce((select json_agg(json_build_object(
        'id', r.id, 'teacher_id', r.teacher_id, 'name', t.name, 'email', t.email, 'school', t.school,
        'plan', r.plan, 'note', r.note, 'status', r.status, 'created_at', r.created_at) order by r.created_at desc)
      from public.rg_requests r join public.rg_teachers t on t.id = r.teacher_id
      where r.status = 'bekliyor' or r.created_at > now() - interval '90 days'), '[]'::json)
  );
end $$;

-- Üyeliği verilen tarihe kadar açar (null: üyeliği kapatır). Bekleyen başvuru varsa sonuçlandırır.
create or replace function public.rg_admin_set_member(p_pin text, p_teacher uuid, p_until date) returns text
language plpgsql security definer set search_path = public as $$
declare v text;
begin
  v := public.rg_check_admin(p_pin);
  if v <> 'ok' then return v; end if;
  update public.rg_teachers set member_until = p_until where id = p_teacher;
  update public.rg_requests set status = case when p_until is null then 'reddedildi' else 'onaylandi' end, decided_at = now()
    where teacher_id = p_teacher and status = 'bekliyor';
  return 'ok';
end $$;

create or replace function public.rg_admin_reject(p_pin text, p_request bigint) returns text
language plpgsql security definer set search_path = public as $$
declare v text;
begin
  v := public.rg_check_admin(p_pin);
  if v <> 'ok' then return v; end if;
  update public.rg_requests set status = 'reddedildi', decided_at = now() where id = p_request and status = 'bekliyor';
  return 'ok';
end $$;

revoke execute on function
  public.rg_auth(uuid, uuid), public.rg_set_admin_pin(text), public.rg_check_admin(text),
  public.rg_is_member(public.rg_teachers), public.rg_free_limit()
  from public, anon, authenticated;
grant execute on function
  public.rg_public_info(),
  public.rg_register(text, text, text, text), public.rg_login(text, text), public.rg_logout_all(uuid, uuid),
  public.rg_me(uuid, uuid), public.rg_request_membership(uuid, uuid, text, text),
  public.rg_admin(text), public.rg_admin_set_member(text, uuid, date), public.rg_admin_reject(text, bigint)
  to anon, authenticated;
