# rehberliktakip.com: site kurulumu ve güncelleme

Öğrenci Rehberlik Takip Sistemi'nin tanıtım ve indirme sitesi. `rehber/` klasörünün tamamı sitedir.

| Sayfa | Kalıcı adres | Dosya |
|---|---|---|
| Ana sayfa (ekran görüntüleri, canlı örnek, Rehberlik Köşesi, SSS) | `rehberliktakip.com/` | `index.html` |
| İndirme (sürüm, tarih, koşul onayı, kurulum) | `rehberliktakip.com/indir` | `indir.html` |
| Sürüm notları | `rehberliktakip.com/surumler` | `surumler.html` + `surumler.js` |
| Kullanım koşulları | `rehberliktakip.com/kosullar` | `kosullar.html` |
| Geliştirme talebi / iletişim / e-posta listesi | `rehberliktakip.com/iletisim` | `iletisim.html` |
| Canlı örnek | `rehberliktakip.com/demo/` | `demo/` |

Programın **Ayarlar → Hakkında** bölümüne `rehberliktakip.com` ve sürüm notları için `rehberliktakip.com/surumler` yazılabilir. Bu adresler değişmez.

## 1. Alan adını bağlama (bir kez)

1. Vercel'de `rehberliktakip.com` alan adını satın alın (ya da başka yerden alıp Vercel'e yönlendirin).
2. Vercel'de **Add New → Project** ile aynı GitHub deposunu (`trigo-avcisi`) yeniden içe aktarın. **Root Directory** olarak `rehber` seçin; Framework: **Other**.
3. Projenin **Settings → Domains** sayfasında `rehberliktakip.com` ve `www.rehberliktakip.com` ekleyin.
4. İsterseniz **Analytics** sekmesinden Web Analytics'i açın. Çerez kullanmaz, kişisel veri toplamaz; bu yüzden çerez bildirimi gerekmez.

`rehber/vercel.json` kısa adresleri (`/indir`, `/surumler` …) ve önbellek ayarlarını yapar. Site eski adreste (`trigo-avcisi.vercel.app/rehber/`) de çalışmaya devam eder.

## 2. Yeni sürüm yayımlama

1. Programın Mac ve Windows yayın zip'lerini hazırlayın (KULLANIM-KOSULLARI.txt içinde olsun; Windows paketinde `python/` klasörü).
2. Depoda şu komutu çalıştırın:
   ```
   python3 araclar/rehber-guncelle.py Rehberlik-Takip-Mac.zip --windows Rehberlik-Takip-Windows.zip
   ```
   (Tek zip verilirse ve içinde `python/` varsa Windows paketi hepsini, Mac paketi `python/` hariç kalanını alır.) Bu komut:
   - `indir/Ogrenci-Rehberlik-Takip-<sürüm>-Windows.zip` ve `-Mac.zip` dosyalarını üretir (tek klasörlü; `gelistirme/`, `veri/`, `hata*.log` gibi dosyalar ayıklanır; eski sürüm dosyaları silinir),
   - `indir/surum.js` dosyasına sürüm numarasını ve dosya boyutlarını yazar (İndir sayfasındaki düğmeler buradan beslenir),
   - canlı örneği (`demo/web/`, `demo/program.zip`) yeni sürümden yeniden üretir,
   - KULLANIM-KOSULLARI.txt metnini **kelimesi kelimesine** `kosullar.html` ve `indir.html` içine yerleştirir.
3. `surumler.js` dosyasının **en üstüne** yeni sürümü ekleyin: sürüm, tarih (`YYYY-AA-GG`), başlık, maddeler. Önemli bir hata düzeltmesiyse `onemli:true` yazın; sitede kırmızı **ÖNEMLİ GÜNCELLEME** etiketi çıkar.
4. Commit edip gönderin; Vercel siteyi kendiliğinden günceller.

## 3. Ayarlar (`config.js`)

- `eposta`: geliştirme talepleri ve iletişim adresi. Boşsa iletişim formu "adres henüz eklenmedi" der.
- `whatsapp`: isteğe bağlı, ülke koduyla (örn. `905xxxxxxxxx`).
- `video`: YouTube "nasıl kullanılır" videosunun bağlantısı. Boşsa ana sayfada yalnızca 4 adımlık kurulum kartları görünür.
- `supabaseUrl`, `supabaseKey`: indirme sayacı ve e-posta listesi (aşağıda).

## 4. İndirme sayacı ve e-posta listesi (Supabase, bir kez)

Supabase **SQL Editor**'de `supabase/rehber-site.sql` dosyasını çalıştırın.

- **İndirme sayacı:** İndir düğmesine her basılışta o sürüm ve sistemin sayısı bir artar (örn. `3.6-windows`, `3.6-mac`). IP, tarayıcı, tarih gibi hiçbir bilgi kaydedilmez. Görmek için: `select * from public.rs_indirme order by surum desc;`
- **E-posta listesi:** Yalnızca gönüllü bırakılan adresler ve onaylanan aydınlatma metninin sürümü. Liste: `select eposta, kayit from public.rs_abone order by kayit;`. Ziyaretçi `rehberliktakip.com/iletisim#cik` adresinden kendisi çıkabilir. Duyuru e-postalarının altına bu bağlantıyı koyun. Birini elle silmek için: `delete from public.rs_abone where eposta = '...';`

Site çerez kullanmaz. İndirenlerin listesi tutulmaz.

## 5. Canlı örnek nasıl çalışır?

`demo/` sayfası programın **gerçek** `sunucu.py` dosyasını ziyaretçinin tarayıcısında çalıştırır (Pyodide, cdn.jsdelivr.net'ten yüklenir, yaklaşık 14 MB). Program sayfalarının `/api/...` istekleri `demo/sw.js` üzerinden `demo/kopru.py`'ye gider. Bu yüzden canlı örnek, programın her yeni sürümünde kendiliğinden aynı kalır.

- Bir **ÖRNEK ÖĞRENCİ** kaydıyla başlar. En fazla **20 öğrenci** eklenebilir. Kayıtlar yalnızca ziyaretçinin tarayıcısında (IndexedDB) durur.
- İlk açılışta **yönlendirmeli eğitim** başlar: ekranın ilgili yeri vurgulanır, "buraya basın" denir. **Eğitimi geç** ile atlanabilir, üst şeritteki **❔ Eğitim** ile yeniden açılır. Adımlar `demo/index.html` içindeki `ADIMLAR` listesindedir; programda bir düğmenin kimliği (`id`) değişirse buradaki seçici de güncellenmelidir.
- Canlı örnekte lisans kilidi kapalıdır, koşullar önceden onaylanmıştır, kullanıcı adı "Rehber Öğretmen"dir. Dosyadan okuma gerektiren bazı özellikler (fotoğraftan çizelge okuma gibi) tarayıcıda çalışmaz.

## 6. Ekran görüntüleri

`img/` klasöründeki görüntüler gerçek programdan, **uydurma** örnek verilerle alındı. Yenilemek için programı kendi bilgisayarınızda örnek verilerle açıp 1440×900 ekran görüntüsü alın; aynı adla `img/*.webp` olarak kaydedin (`-k` ekli olanlar 720×450 küçük kopyalardır).
