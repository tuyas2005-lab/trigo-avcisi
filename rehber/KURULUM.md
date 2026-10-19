# Rehber Takip: kurulum

Site `https://trigo-avcisi.vercel.app/rehber/` adresinde çalışır.

| Sayfa | Adres |
|---|---|
| Eğitim sitesi (rehberlik yazıları, tanıtım, üyelik, SSS) | `/rehber/` |
| Uygulama | `/rehber/uygulama/` |
| Yönetim (üyelik onayı, yalnızca siz) | `/rehber/yonetim.html` |

## KVKK: veriler nerede?

- **Öğrenci kayıtları sunucuya hiç gönderilmez.** Öğretmenin kendi cihazındaki tarayıcıda (localStorage) saklanır. Uygulamadaki **Yedek al / Yedekten yükle** ile başka bilgisayara taşınır.
- Sunucuda (Supabase) yalnızca üyelik için açılan öğretmen hesabı (ad, e-posta, okul, şifrenin özeti, üyelik bitiş tarihi) ve üyelik başvuruları tutulur.
- Uygulama hesap açmadan da kullanılabilir. Hesap yalnızca üye olmak için gerekir.

## Veritabanı (bir kez yapılır)

1. Supabase'de Sosyal Avcısı ile aynı projeyi açın > **SQL Editor**.
2. `supabase/rehber-takip.sql` dosyasının tamamını yapıştırıp **Run** deyin. Tablolar `rg_` ile başlar, Sosyal Avcısı'na dokunmaz.
3. Yönetici PIN'inizi belirleyin (en az 8 karakter):
   ```sql
   select public.rg_set_admin_pin('kendi-pininiz');
   ```

## Ücretsiz dönem ve 30 öğrenci sınırı

Sınır sunucudaki tek bir ayardır; site ve uygulama kendiliğinden uyum sağlar.

```sql
-- Şimdilik herkese ücretsiz, sınır yok (üyelik bölümleri sitede gizlenir):
update public.rg_settings set free_limit = null;

-- 30 öğrenci sınırını ve üyelik sistemini açmak:
update public.rg_settings set free_limit = 30;
```

Not: Kayıtlar öğretmenin cihazında durduğu için sınır da cihazda uygulanır. Bilgili biri tarayıcı verisini değiştirerek aşabilir; bu, verinin sunucuya hiç gitmemesinin bedelidir.

## Üyelik (manuel ödeme)

1. `rehber/config.js` içine fiyatları, IBAN'ı, alıcı adını ve iletişim adresini yazın. Boş alanlar sitede görünmez.
2. Öğretmen sitede hesap açar, **Üye ol** ile aylık/yıllık başvurur ve havale açıklamasına e-postasını yazar.
3. Siz `/rehber/yonetim.html` sayfasında PIN'le girersiniz. Ödeme gelince **Ödeme alındı · 1 ay/1 yıl aç** dersiniz. Bitiş tarihini öğretmen satırından elle de değiştirebilirsiniz.

## Uygulamayı indirme

Site, "ana ekrana eklenebilen" bir web uygulamasıdır (PWA). **Uygulamayı indir** düğmesi Android'de ve bilgisayarda Chrome/Edge'in kurulum penceresini açar. iPhone'da kullanıcıya Safari > Paylaş > Ana Ekrana Ekle adımları gösterilir. Mağazaya yüklemek gerekmez.

## "Nasıl kullanılır?" videosu

Video yokken sayfada 4 adımlı canlı tanıtım döner. Videoyu YouTube'a yükledikten sonra bağlantısını `rehber/config.js` içindeki `video:` alanına yazın; sayfada video oynatıcı görünür.

Önerilen çekim (ekran kaydı, 2-3 dakika, telefon dikey değil yatay):

1. **(0:00) Giriş:** "Rehber Takip, rehber öğretmenler için öğrenci takip uygulaması. KVKK kapsamında öğrenci bilgileri yalnızca sizin bilgisayarınızda saklanıyor."
2. **(0:15) İndirme:** Siteyi açın, **Uygulamayı indir**'e basın, kurulum penceresini gösterin. Masaüstünde açılan simgeyi gösterin.
3. **(0:40) Öğrenci ekleme:** **+ Öğrenci ekle** > ad (örn. "Ayşe K."), sınıf, takip konusu > Kaydet. Adın yalnızca baş harfle yazılmasını önerin.
4. **(1:10) Görüşme notu:** Öğrenciye dokunun, yeni görüşme notu yazın, durumu "İzleniyor" yapın.
5. **(1:40) Arama:** Arama kutusuna sınıf ya da konu yazarak süzün.
6. **(2:00) Yedek:** **Yedek al** ile dosyayı indirin; yeni bilgisayarda **Yedekten yükle**.
7. **(2:20) Kapanış:** Rehberlik Köşesi yazılarını gösterip siteye davet edin.

Videoda gerçek öğrenci adı kullanmayın; örnek adlarla çekin.
