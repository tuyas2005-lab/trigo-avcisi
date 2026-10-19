-- Öğrenci Rehberlik Takip Sistemi sitesi: indirme sayacı ve gönüllü e-posta listesi.
-- Supabase > SQL Editor'e yapıştırıp bir kez çalıştırın (tekrar çalıştırmak güvenlidir).
-- Tablolara dışarıdan doğrudan erişim kapalıdır; site yalnızca aşağıdaki rs_* fonksiyonlarını çağırır.
--
-- İndirme sayacı: sürüm başına yalnızca bir SAYI tutulur. IP, tarayıcı, tarih gibi hiçbir kişisel veri kaydedilmez.
--   Sayıları görmek:  select * from public.rs_indirme order by surum desc;
-- E-posta listesi: yalnızca adresi gönüllü bırakanlar. Liste: select eposta, kayit from public.rs_abone order by kayit;
--   Birini elle silmek: delete from public.rs_abone where eposta = 'ornek@ornek.com';

create table if not exists public.rs_indirme (
  surum  text primary key,
  sayi   bigint not null default 0
);

create table if not exists public.rs_abone (
  eposta       text primary key,
  onay_metni   text not null,            -- hangi aydınlatma metnine onay verildiği
  kayit        timestamptz not null default now()
);

alter table public.rs_indirme enable row level security;
alter table public.rs_abone   enable row level security;
revoke all on public.rs_indirme, public.rs_abone from anon, authenticated;

-- İndir düğmesine her basılışta bir artar. Kimin indirdiği bilinmez.
create or replace function public.rs_indir(p_surum text) returns void
language sql security definer set search_path = public as $$
  insert into public.rs_indirme (surum, sayi) values (left(coalesce(nullif(trim(p_surum), ''), '?'), 20), 1)
  on conflict (surum) do update set sayi = public.rs_indirme.sayi + 1;
$$;

create or replace function public.rs_abone_ol(p_eposta text, p_onay boolean) returns text
language plpgsql security definer set search_path = public as $$
begin
  p_eposta := lower(trim(coalesce(p_eposta, '')));
  if not coalesce(p_onay, false) then return 'onay_yok'; end if;
  if p_eposta !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(p_eposta) > 120 then return 'gecersiz'; end if;
  -- Kötüye kullanımı sınırla: son bir saatte çok fazla yeni kayıt varsa geçici olarak durdur.
  if (select count(*) from public.rs_abone where kayit > now() - interval '1 hour') >= 200 then return 'yogun'; end if;
  insert into public.rs_abone (eposta, onay_metni) values (p_eposta, 'aydinlatma-1.0')
  on conflict (eposta) do nothing;
  return 'ok';
end $$;

-- "Listeden çık" sayfası. Adres listede olsa da olmasa da aynı yanıt döner (kimin listede olduğu öğrenilemesin).
create or replace function public.rs_abone_cik(p_eposta text) returns text
language plpgsql security definer set search_path = public as $$
begin
  delete from public.rs_abone where eposta = lower(trim(coalesce(p_eposta, '')));
  return 'ok';
end $$;

grant execute on function public.rs_indir(text), public.rs_abone_ol(text, boolean), public.rs_abone_cik(text) to anon, authenticated;
