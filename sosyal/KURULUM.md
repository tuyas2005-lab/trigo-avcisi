# Sosyal Avcısı: kurulum

Uygulama `https://trigo-avcisi.vercel.app/sosyal/` adresinde çalışır. Sınıf ligi ve öğretmen paneli olmadan da tek kişilik modda oynanabilir.

## Sınıf ligi ve öğretmen paneli (bir kez yapılır)

1. https://supabase.com adresinde ücretsiz bir proje açın (bölge: Frankfurt / eu-central-1 önerilir).
2. Projede **SQL Editor**'ü açın, `supabase/sosyal-avcisi.sql` dosyasının tamamını yapıştırıp **Run** deyin.
3. **Project Settings > API** sayfasından **Project URL** ve **anon public** (ya da **publishable**) anahtarı kopyalayın.
4. `sosyal/config.js` dosyasına yazın:
   ```js
   window.SA_CONFIG={url:'https://xxxx.supabase.co',key:'eyJ...'};
   ```
5. Yayınlayın (Vercel otomatik günceller).

Bu anahtar tarayıcıda kullanılmak için tasarlanmıştır. Tablolar doğrudan okunamaz; uygulama yalnızca `sa_*` fonksiyonlarını çağırabilir.

## Öğretmen

1. Uygulamada **Profil > Öğretmen paneli** (ya da adresin sonuna `#ogretmen`).
2. **Yeni sınıf oluştur**: sınıf adı ve PIN. 6 haneli sınıf kodu çıkar.
3. **Davet gönder** ile kodu ve bağlantıyı WhatsApp'tan paylaşın. Bağlantıyı açan öğrencinin kodu otomatik dolar.
4. Panelde: öğrenci sayısı, haftalık aktif öğrenci, **kullanım sayısı** (uygulamanın açılışı, 30 dakikada en fazla bir kez sayılır), tamamlanan ders, doğruluk, son 14 günün grafiği, ünitelere göre sınıf başarısı, en çok zorlanılan dersler ve CSV (Excel) indirme.
5. Telefonunu değiştiren öğrencinin **giriş kodu** öğrenci satırına dokununca görünür.

## Gizlilik

Öğrenciden yalnızca ad (önerilen: ad + soyadının baş harfi) alınır. E-posta, telefon, konum gibi kişisel veri toplanmaz.

## İçerik

Müfredat `content1.js` (1-3. öğrenme alanları) ve `content2.js` (4-6) dosyalarındadır: her ders için görselli kartlar ve soru havuzu. Görseller `art.js` içinde SVG olarak çizilir.
