#!/usr/bin/env python3
"""Öğrenci Rehberlik Takip Sistemi: yeni sürümü siteye koyar.

Kullanım:
    python3 araclar/rehber-guncelle.py Ogrenci-Rehberlik-Takip-Yayin.zip
    python3 araclar/rehber-guncelle.py Yayin.zip --windows Yayin-Windows.zip

Windows paketi taşınabilir Python'u (python/ klasörü) içinde getirir; Mac paketinde bu klasör olmaz
(Mac'te Python bir kez kurulur). Tek zip verilirse ve içinde python/ varsa Windows paketi hepsini, Mac
paketi python/ hariç kalanını alır. Windows paketi ayrı hazırlandıysa --windows ile verin.

Yaptıkları:
  1. rehber/indir/ altına Windows ve Mac indirme dosyalarını yazar (tek klasörlü, geliştirme dosyaları ve
     kişisel olabilecek dosyalar ayıklanmış; eski sürüm dosyaları silinir) ve rehber/indir/surum.js'yi günceller.
  2. rehber/demo/web/ ve rehber/demo/program.zip'i (canlı örnek) programın kendi dosyalarından üretir.
  3. KULLANIM-KOSULLARI.txt metnini rehber/kosullar.html ve rehber/indir.html içine aynen yerleştirir.

Sürüm notlarını (tarih ve değişiklik listesi) rehber/surumler.js dosyasına elle ekleyin.
"""
import html
import io
import json
import os
import re
import shutil
import sys
import zipfile

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REHBER = os.path.join(KOK, "rehber")
KLASOR_ADI = "Ogrenci-Rehberlik-Takip"
# Kullanıcıya gitmemesi gerekenler: geliştirme araçları, çalışma sırasında oluşan veri ve günlükler.
DISLA = re.compile(r"(^|/)(gelistirme|veri|__pycache__)(/|$)|(^|/)hata[^/]*\.(log|tmp)$|\.DS_Store$|(^|/)Thumbs\.db$")


MENU_DUZELTME = """
/* ---- canlı örnek (araclar/rehber-guncelle.py ekler): kısa ekranda sol menü kendi içinde kaydırılır ---- */
#yan nav{min-height:0;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.25) transparent}
#yan nav::-webkit-scrollbar{width:6px}
#yan nav::-webkit-scrollbar-thumb{background:rgba(255,255,255,.25);border-radius:6px}
#yan .kullanici{flex:none}
"""


def oku(zip_yolu):
    with zipfile.ZipFile(zip_yolu) as z:
        dosyalar = {}
        for bilgi in z.infolist():
            if bilgi.is_dir():
                continue
            ad = bilgi.filename.replace("\\", "/")
            dosyalar[ad] = (bilgi, z.read(bilgi))
    # Zip tek bir üst klasör içeriyorsa onu kaldır; köke göre çalışalım.
    ilkler = {a.split("/", 1)[0] for a in dosyalar}
    if len(ilkler) == 1 and all("/" in a for a in dosyalar):
        on = ilkler.pop() + "/"
        dosyalar = {a[len(on):]: v for a, v in dosyalar.items()}
    if "uygulama/sunucu.py" not in dosyalar:
        sys.exit("Hata: zip içinde uygulama/sunucu.py yok. Doğru dosyayı mı seçtiniz?")
    return dosyalar


def eski_zipleri_sil():
    hedef_dizin = os.path.join(REHBER, "indir")
    os.makedirs(hedef_dizin, exist_ok=True)
    for eski in os.listdir(hedef_dizin):
        if eski.endswith(".zip"):
            os.remove(os.path.join(hedef_dizin, eski))


def indirme_dosyasi(dosyalar, ad):
    yol = os.path.join(REHBER, "indir", ad)
    with zipfile.ZipFile(yol, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for dosya_adi, (bilgi, veri) in sorted(dosyalar.items()):
            if DISLA.search(dosya_adi):
                continue
            yeni = zipfile.ZipInfo(KLASOR_ADI + "/" + dosya_adi, date_time=bilgi.date_time)
            yeni.external_attr = bilgi.external_attr  # Baslat.command çalıştırılabilir kalsın
            yeni.compress_type = zipfile.ZIP_DEFLATED
            z.writestr(yeni, veri)
    return {"dosya": ad, "boyut": os.path.getsize(yol)}


def canli_ornek(dosyalar):
    demo = os.path.join(REHBER, "demo")
    web = os.path.join(demo, "web")
    if os.path.isdir(web):
        shutil.rmtree(web)
    for dosya_adi, (_, veri) in dosyalar.items():
        if not dosya_adi.startswith("uygulama/web/"):
            continue
        hedef = os.path.join(web, dosya_adi[len("uygulama/web/"):])
        os.makedirs(os.path.dirname(hedef), exist_ok=True)
        if hedef.endswith((".html", ".js", ".css")):
            metin = veri.decode("utf-8")
            # Program sayfaları kökten (/web/...) yükleniyor; canlı örnekte aynı klasöre göre yüklensin.
            metin = re.sub(r"""(["'(])/web/""", r"\1", metin)
            veri = metin.encode("utf-8")
        with open(hedef, "wb") as f:
            f.write(veri)
    # Kısa ekranlarda sol menü kesilmesin: menü kendi içinde kaydırılsın (programın kendisinde de önerilen düzeltme).
    tasarim = os.path.join(web, "tasarim.css")
    if os.path.exists(tasarim):
        with open(tasarim, "a", encoding="utf-8") as f:
            f.write(MENU_DUZELTME)
    # Tarayıcıda çalışacak Python dosyaları (web klasörü statik olarak sunulduğu için dahil değil).
    with zipfile.ZipFile(os.path.join(demo, "program.zip"), "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for dosya_adi, (bilgi, veri) in sorted(dosyalar.items()):
            if dosya_adi == "uygulama/sunucu.py" or (dosya_adi.startswith("uygulama/kutuphane/") and "__pycache__" not in dosya_adi):
                z.writestr(zipfile.ZipInfo(dosya_adi, date_time=bilgi.date_time), veri, zipfile.ZIP_DEFLATED)


def kosullar_html(metin):
    """KULLANIM-KOSULLARI.txt'yi kelimesi kelimesine HTML'e çevirir (yalnızca biçim eklenir)."""
    metin = metin.lstrip("﻿").replace("\r\n", "\n")
    bloklar = [b for b in re.split(r"\n\s*\n", metin.strip()) if b.strip()]
    cikti = []
    for i, blok in enumerate(bloklar):
        satirlar = blok.split("\n")
        if i == 0 and len(satirlar) == 1:
            continue  # başlık sayfada <h1> olarak var
        if all(s.strip().startswith("- ") for s in satirlar):
            cikti.append("<ul>" + "".join("<li>%s</li>" % html.escape(s.strip()[2:]) for s in satirlar) + "</ul>")
            continue
        if re.match(r"^\d+\.\s", satirlar[0]) and len(satirlar) == 1:
            cikti.append("<h2>%s</h2>" % html.escape(satirlar[0].strip()))
            continue
        paragraf = html.escape(" ".join(s.strip() for s in satirlar))
        if paragraf.startswith("Kısaca:"):
            cikti.append('<p class="ozet"><b>Kısaca:</b>%s</p>' % paragraf[len("Kısaca:"):])
        elif "Koşul sürümü" in paragraf and len(paragraf) < 120:
            cikti.append('<p class="ver">%s</p>' % paragraf)
        else:
            cikti.append("<p>%s</p>" % paragraf)
    # Metinde maddeler boş satırla ayrılmış; art arda gelenler tek liste olsun.
    return "\n".join(cikti).replace("</ul>\n<ul>", "")


def surum_oku(dosyalar):
    sunucu = dosyalar["uygulama/sunucu.py"][1].decode("utf-8")
    surum = re.search(r'^SURUM\s*=\s*"([^"]+)"', sunucu, re.M).group(1)
    kosul = re.search(r'^KOSUL_SURUMU\s*=\s*"([^"]+)"', sunucu, re.M).group(1)
    return surum, kosul


def main():
    argumanlar = sys.argv[1:]
    windows_zip = None
    if "--windows" in argumanlar:
        i = argumanlar.index("--windows")
        if i + 1 >= len(argumanlar):
            sys.exit(__doc__)
        windows_zip = argumanlar[i + 1]
        del argumanlar[i:i + 2]
    if len(argumanlar) != 1:
        sys.exit(__doc__)
    dosyalar = oku(argumanlar[0])
    surum, kosul = surum_oku(dosyalar)
    win_dosyalar = oku(windows_zip) if windows_zip else dosyalar
    if surum_oku(win_dosyalar)[0] != surum:
        sys.exit("Hata: Windows paketinin sürümü (%s) ana paketle (%s) aynı değil." % (surum_oku(win_dosyalar)[0], surum))
    # Taşınabilir Python yalnızca Windows'ta çalışır; Mac paketinde gereksiz yer kaplamasın.
    mac_dosyalar = {a: v for a, v in dosyalar.items() if not a.startswith("python/")}
    python_var = any(a.startswith("python/") for a in win_dosyalar)

    eski_zipleri_sil()
    windows = indirme_dosyasi(win_dosyalar, "%s-%s-Windows.zip" % (KLASOR_ADI, surum))
    windows["python"] = python_var
    mac = indirme_dosyasi(mac_dosyalar, "%s-%s-Mac.zip" % (KLASOR_ADI, surum))
    with open(os.path.join(REHBER, "indir", "surum.js"), "w", encoding="utf-8") as f:
        f.write("/* araclar/rehber-guncelle.py üretir; elle değiştirmeyin. */\n")
        f.write("window.RG_DOSYA=%s;\n" % json.dumps({"surum": surum, "kosulSurumu": kosul, "windows": windows, "mac": mac}, ensure_ascii=False))
    if not python_var:
        print("Uyarı: Windows paketinde python/ klasörü yok; Windows kullanıcılarının da Python kurması gerekecek.")

    canli_ornek(dosyalar)

    if "KULLANIM-KOSULLARI.txt" in dosyalar:
        govde = kosullar_html(dosyalar["KULLANIM-KOSULLARI.txt"][1].decode("utf-8-sig"))
        for sayfa_adi in ("kosullar.html", "indir.html"):
            sayfa_yolu = os.path.join(REHBER, sayfa_adi)
            with open(sayfa_yolu, encoding="utf-8") as f:
                sayfa = f.read()
            sayfa = re.sub(r"(<!-- KOSULLAR:BASLA -->).*?(<!-- KOSULLAR:BITIS -->)",
                           lambda m: m.group(1) + "\n" + govde + "\n" + m.group(2), sayfa, flags=re.S)
            with open(sayfa_yolu, "w", encoding="utf-8") as f:
                f.write(sayfa)
    else:
        print("Uyarı: zip içinde KULLANIM-KOSULLARI.txt yok; koşullar sayfası güncellenmedi.")

    with open(os.path.join(REHBER, "surumler.js"), encoding="utf-8") as f:
        if "surum:'%s'" % surum not in f.read().replace('"', "'").replace(" ", ""):
            print("Uyarı: rehber/surumler.js içinde %s sürümünün notu yok. Tarih ve değişiklikleri ekleyin." % surum)
    print("Tamam: sürüm %s, koşul sürümü %s, Windows %.1f MB, Mac %.1f MB" % (surum, kosul, windows["boyut"] / 1e6, mac["boyut"] / 1e6))


if __name__ == "__main__":
    main()
