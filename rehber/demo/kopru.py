# Canlı örnek köprüsü: programın kendi sunucu.py dosyasını tarayıcıda (Pyodide) çalıştırır.
# Sayfaların /api/... istekleri service worker üzerinden buraya gelir ve sunucu.py'deki
# Istek sınıfına, gerçek bir ağ bağlantısı olmadan verilir. Programın koduna dokunulmaz;
# yalnızca tarayıcıda anlamı olmayan birkaç şey değiştirilir (lisans kilidi, saat dilimi,
# kullanıcı adı) ve canlı örneğe 20 öğrenci sınırı konur.
import io
import json
import os
import shutil
import sys
import http.client
from datetime import datetime as _dt, date as _date, timedelta

sys.path.insert(0, "/app/uygulama")
import sunucu as S

DEMO_SINIR = 20
SINIR_MESAJI = ("Canlı örnekte en fazla %d öğrenci kaydı yapılabilir. "
                "Programın tamamı ücretsizdir ve kayıt sınırı yoktur: siteden indirebilirsiniz." % DEMO_SINIR)
_fark = timedelta(0)


# Pyodide saati UTC'dir; tarihler ziyaretçinin yerel saatine göre hesaplansın.
class _Tarih(_date):
    @classmethod
    def today(cls):
        return _Zaman.now().date()


class _Zaman(_dt):
    @classmethod
    def now(cls, tz=None):
        return _dt.utcnow() + _fark if tz is None else _dt.now(tz)

    @classmethod
    def today(cls):
        return cls.now()


S.date = _Tarih
S.datetime = _Zaman
# Canlı örnek tek bir tarayıcıda çalışır; kopyalamaya karşı kilit burada anlamsızdır.
S.lisans_durum = lambda: {"durum": "yetkili"}
S.kullanici_adi = lambda: "Rehber Öğretmen"


def hazirla(utc_farki_dk):
    """Sayfa açılışında bir kez: saat farkını ayarlar, örnek kaydı ve koşul onayını oluşturur."""
    global _fark
    _fark = timedelta(minutes=utc_farki_dk)
    S.ogrencileri_yukle()
    S.ornek_kayit_olustur_gerekirse()
    if (S.ayarlar_oku().get("kosulKabul") or {}).get("surum") != S.KOSUL_SURUMU:
        S.ayarlar_yaz({"kosulKabul": {"surum": S.KOSUL_SURUMU, "tarih": S.simdi_goster()}})
    return ogrenci_sayisi()


def ogrenci_sayisi():
    return len(S.tum_ogrenciler())


def ornek_id():
    """Eğitimde açılacak öğrenci dosyası: varsa ÖRNEK ÖĞRENCİ, yoksa ilk kayıt."""
    kayitlar = sorted(S.tum_ogrenciler(), key=lambda k: (k.get("adSoyad") != "ÖRNEK ÖĞRENCİ", k.get("olusturma") or ""))
    return kayitlar[0]["id"] if kayitlar else ""


def sifirla(utc_farki_dk):
    """Canlı örneği ilk haline döndürür: tüm deneme verisi silinir, örnek kayıt yeniden oluşur."""
    for ad in os.listdir(S.VERI):
        yol = os.path.join(S.VERI, ad)
        if os.path.isdir(yol):
            shutil.rmtree(yol)
        else:
            os.remove(yol)
    return hazirla(utc_farki_dk)


class _DemoIstek(S.Istek):
    def __init__(self, yontem, yol, basliklar, govde):
        ham = "".join("%s: %s\r\n" % (k, v) for k, v in basliklar) + "\r\n"
        if govde and not any(k.lower() == "content-length" for k, _ in basliklar):
            ham = "Content-Length: %d\r\n" % len(govde) + ham
        self.headers = http.client.parse_headers(io.BytesIO(ham.encode("latin-1", "replace")))
        self.rfile = io.BytesIO(govde or b"")
        self.wfile = io.BytesIO()
        self.command = yontem
        self.path = yol
        self.request_version = "HTTP/1.1"
        self.requestline = "%s %s HTTP/1.1" % (yontem, yol)
        self.client_address = ("127.0.0.1", 0)
        self.close_connection = True
        self.server = None


def _sinir_asilir_mi(yontem, yol, govde):
    yol = yol.split("?", 1)[0]
    if yontem != "POST":
        return False
    if yol == "/api/ogrenci":
        return ogrenci_sayisi() >= DEMO_SINIR
    if yol == "/api/ice-aktar/uygula":
        try:
            subeler = json.loads(govde.decode("utf-8")).get("subeler") or []
            yeni, _ = S.ice_aktar_onizle_hesapla(subeler)
        except Exception:
            return False
        return ogrenci_sayisi() + yeni > DEMO_SINIR
    return False


def istek(yontem, yol, basliklar_json, govde):
    """(durum, [[başlık, değer], ...], gövde) döndürür."""
    basliklar = json.loads(basliklar_json)
    if govde is None:
        govde = b""
    elif hasattr(govde, "to_bytes"):  # tarayıcıdan gelen Uint8Array
        govde = govde.to_bytes()
    else:
        govde = bytes(govde)
    if _sinir_asilir_mi(yontem, yol, govde):
        metin = json.dumps({"hata": SINIR_MESAJI, "demoSiniri": True}, ensure_ascii=False).encode("utf-8")
        return 403, [["Content-Type", "application/json; charset=utf-8"]], metin
    h = _DemoIstek(yontem, yol, basliklar, govde)
    islev = getattr(h, "do_" + yontem, None)
    if islev is None:
        return 405, [], b""
    islev()
    ham = h.wfile.getvalue()
    bas, _, govde = ham.partition(b"\r\n\r\n")
    satirlar = bas.decode("latin-1").split("\r\n")
    durum = int(satirlar[0].split(" ")[1])
    cikis = []
    for s in satirlar[1:]:
        if ":" in s:
            k, v = s.split(":", 1)
            if k.lower() not in ("server", "date", "connection"):
                cikis.append([k, v.strip().encode("latin-1").decode("utf-8", "replace")])
    return durum, cikis, govde
