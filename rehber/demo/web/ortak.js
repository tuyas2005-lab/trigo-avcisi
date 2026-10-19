"use strict";
/* ============================================================
   Öğrenci Rehberlik Takip Sistemi — ortak yardımcılar
   Tüm ekranlarda kullanılan: API çağrıları, bildirim kutusu,
   basit grafik çizimi (SVG/HTML, dış kütüphane yok) ve
   Web Speech API ile sesli not alma.
   ============================================================ */

function kacHTML(s) {
  return String(s === null || s === undefined ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function gSayi(n) {
  return Number(n || 0).toLocaleString("tr-TR");
}

/* ---------------------------------------------------------- etiket renkleri
   Tek kaynak: tüm ekranlar (rozetler, filtre noktaları, rapor çubukları,
   rapor tablo başlıkları) renkleri buradan alır. Sunucudaki
   ETIKET_RENKLERI listesiyle aynı anahtarlar kullanılmalıdır. */
var ETIKET_RENKLER = [
  { ad: "mavi",       isim: "Mavi",       koyu: "#17457d", acik: "#e8f0fb", kenar: "#c7dbf5" },
  { ad: "turkuaz",    isim: "Turkuaz",    koyu: "#0e7490", acik: "#e0f4f8", kenar: "#b5e0ea" },
  { ad: "yesil",      isim: "Yeşil",      koyu: "#1a6b45", acik: "#e8f5ee", kenar: "#bfe3cf" },
  { ad: "acikyesil",  isim: "Açık Yeşil", koyu: "#4d7c0f", acik: "#f0f7e1", kenar: "#d3e8b0" },
  { ad: "hardal",     isim: "Hardal",     koyu: "#8a6a00", acik: "#fbf4d9", kenar: "#ecdc9c" },
  { ad: "turuncu",    isim: "Turuncu",    koyu: "#9a5a06", acik: "#fdf3e3", kenar: "#efd6a3" },
  { ad: "mercan",     isim: "Mercan",     koyu: "#c2410c", acik: "#fdebe3", kenar: "#f5c8b3" },
  { ad: "kirmizi",    isim: "Kırmızı",    koyu: "#96271b", acik: "#fdeceb", kenar: "#f3c9c3" },
  { ad: "pembe",      isim: "Pembe",      koyu: "#a3266b", acik: "#fbe8f2", kenar: "#f0c3dc" },
  { ad: "mor",        isim: "Mor",        koyu: "#5b2d9e", acik: "#f2eafc", kenar: "#ddc8f5" },
  { ad: "kahverengi", isim: "Kahverengi", koyu: "#6b4423", acik: "#f4ece4", kenar: "#e0cdb9" },
  { ad: "gri",        isim: "Gri",        koyu: "#475569", acik: "#eef1f6", kenar: "#d3dae4" }
];
function etiketRengi(ad) {
  for (var i = 0; i < ETIKET_RENKLER.length; i++) if (ETIKET_RENKLER[i].ad === ad) return ETIKET_RENKLER[i];
  return ETIKET_RENKLER[0];
}
function renkKodu(ad) { return etiketRengi(ad).koyu; }
(function () {
  var css = ETIKET_RENKLER.map(function (r) {
    return ".rozet-etiket." + r.ad + "{background:" + r.acik + ";color:" + r.koyu + ";border-color:" + r.kenar + "}";
  }).join("\n");
  var st = document.createElement("style");
  st.setAttribute("data-kaynak", "etiket-renkleri");
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);
})();

/* ---------------------------------------------------------- API */

function _govdeCoz(yanit) {
  return yanit.text().then(function (metin) {
    var veri = {};
    try { veri = metin ? JSON.parse(metin) : {}; } catch (e) { veri = {}; }
    if (!yanit.ok) {
      var hata = new Error(veri.hata || ("İstek başarısız (" + yanit.status + ")"));
      hata.kod = yanit.status;
      throw hata;
    }
    return veri;
  });
}

function apiGet(yol) {
  return fetch(yol, { cache: "no-store" }).then(_govdeCoz);
}
function apiPost(yol, veri) {
  return fetch(yol, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(veri || {}),
  }).then(_govdeCoz);
}
function apiPut(yol, veri) {
  return fetch(yol, {
    method: "PUT", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(veri || {}),
  }).then(_govdeCoz);
}
function apiDelete(yol) {
  return fetch(yol, { method: "DELETE" }).then(_govdeCoz);
}

/* ---------------------------------------------------------- bildirim */

var _bildirimZamanlayici = null;
function bildirim(mesaj, hata) {
  var kutu = document.getElementById("bildirim");
  if (!kutu) return;
  kutu.textContent = mesaj;
  kutu.className = hata ? "hata" : "";
  kutu.style.display = "block";
  if (_bildirimZamanlayici) clearTimeout(_bildirimZamanlayici);
  _bildirimZamanlayici = setTimeout(function () { kutu.style.display = "none"; }, hata ? 4500 : 2600);
}

function apiHataGoster(e) {
  /* Sunucudan gelen anlamlı hata mesajları (e.kod var) olduğu gibi gösterilir.
     Tarayıcı içi programlama hatalarında (ör. eski sunucu sürümü yeni ekranlara
     eksik veri gönderdiğinde) teknik İngilizce mesaj yerine açıklama gösterilir. */
  if (e && !e.kod && (e instanceof TypeError || e instanceof ReferenceError)) {
    if (window.console) console.error(e);
    bildirim("Ekran verisi beklenen biçimde gelmedi. Program güncellendiyse siyah program penceresini tamamen kapatıp Baslat.bat ile yeniden açın.", true);
    return;
  }
  if (e && e.kod === 404 && /İstek başarısız/.test(e.message || "")) {
    /* Sunucu bu adresi tanımıyor: ekranlar yeni, arkada çalışan program eski. */
    bildirim("Bu özellik arka planda çalışan eski program sürümünde yok. Siyah program penceresini tamamen kapatıp Baslat.bat ile yeniden açın.", true);
    return;
  }
  bildirim(e && e.message ? e.message : "Bir hata oluştu.", true);
}

/* ---- arayüz / sunucu sürüm uyumu ----
   Bu değer sunucu.py'deki SURUM ile AYNI olmalıdır (her sürüm artışında ikisi
   birlikte değiştirilir). Uyuşmazsa: yeni ekran dosyaları, arka planda hâlâ
   çalışan ESKİ bir sunucu süreciyle konuşuyor demektir (projede tekrar eden
   "eski pencere açık kaldı" durumu) — kullanıcıya üstte kalıcı bir uyarı gösterilir. */
var ARAYUZ_SURUMU = "3.4";

/* ---- görünüm teması (tema.js ile birlikte çalışır) ---- */
function temaTercihi() { try { return localStorage.getItem("rehberlikTema") || "acik"; } catch (e) { return "acik"; } }
function temaUygula(t, sadeceYerel) {
  try { localStorage.setItem("rehberlikTema", t); } catch (e) {}
  var koyu = t === "koyu" || (t === "sistem" && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("koyu", !!koyu);
  if (!sadeceYerel) apiPut("/api/ayarlar", { tema: t }).catch(function () {});
}
if (window.matchMedia) {
  try {
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      if (temaTercihi() === "sistem") temaUygula("sistem", true);
    });
  } catch (e) {}
}

/* ---- okul logosu: Ayarlar > Okul Bilgileri'nden yüklenir, veri/okul-logo.png'de
   durur (güncellemelerde silinmez). surum = 0 → logo yok. ---- */
function okulLogoUrl(surum) { return "/api/okul-logo?v=" + encodeURIComponent(surum || 0); }
function menuLogosunuUygula(surum) {
  var ik = document.querySelector("#yan .marka-ikon");
  if (!ik) return;
  if (surum) {
    ik.classList.add("logolu");
    ik.innerHTML = '<img src="' + okulLogoUrl(surum) + '" alt="Okul logosu">';
  } else if (ik.classList.contains("logolu")) {
    ik.classList.remove("logolu");
    ik.innerHTML = ikonSvg("marka");
  }
}
(function surumUyumunuDenetle() {
  if (!document.getElementById("yan")) return;
  fetch("/api/baslangic", { cache: "no-store" }).then(function (y) { return y.ok ? y.json() : null; }).then(function (b) {
    if (b) menuLogosunuUygula(b.logoSurum);
    if (b && b.ayarlar && b.ayarlar.tema && b.ayarlar.tema !== temaTercihi()) temaUygula(b.ayarlar.tema, true);
    if (!b || !b.surum || b.surum === ARAYUZ_SURUMU) return;
    var d = document.createElement("div");
    d.className = "surum-uyari";
    d.innerHTML = "<b>Program tam yeniden başlatılmamış.</b> Ekranlar yeni sürümde (" + kacHTML(ARAYUZ_SURUMU) +
      ") ama arka planda eski sürüm (" + kacHTML(b.surum) + ") çalışıyor; bazı bölümler bu yüzden yüklenemez. " +
      "Görev çubuğundaki siyah program penceresini kapatın (bulamazsanız bilgisayarı yeniden başlatın), sonra Baslat.bat'ı çalıştırın.";
    document.body.insertBefore(d, document.body.firstChild);
  }).catch(function () {});
})();

/* ---------------------------------------------------------- basit grafikler */

function cizSutun(kapsayici, veriler, secenek) {
  secenek = secenek || {};
  veriler = veriler || [];
  var enBuyuk = veriler.reduce(function (a, d) { return Math.max(a, d.sayi); }, 0);
  var tavan = secenek.tavan || Math.max(4, Math.ceil((enBuyuk || 1) / 4) * 4);
  var basamak = 4;
  var eksen = [];
  for (var i = basamak; i >= 0; i--) eksen.push(Math.round(tavan * i / basamak));

  var h = '<div class="sutun-alan"><div class="sutun-eksen">' +
    eksen.map(function (v) { return "<span>" + gSayi(v) + "</span>"; }).join("") +
    '</div><div class="sutun-govde">';
  for (var g = 0; g <= basamak; g++) {
    h += '<div class="izgara" style="bottom:' + (100 * g / basamak) + '%"></div>';
  }
  veriler.forEach(function (d) {
    var yukseklik = tavan ? Math.max(d.sayi > 0 ? 3 : 0, 100 * d.sayi / tavan) : 0;
    var renk = d.vurgu ? "var(--lacivert)" : (d.sayi > 0 ? "#2b4d7d" : "#c7d0dc");
    h += '<div class="sutun" style="height:' + yukseklik + '%">' +
      '<span class="sutun-sayi">' + gSayi(d.sayi) + '</span>' +
      '<i style="display:block;height:100%;background:' + renk + ';border-radius:4px 4px 0 0"></i>' +
      '<span class="sutun-ad">' + (d.vurgu ? "<b>" + kacHTML(d.ad) + "</b>" : kacHTML(d.ad)) + '</span></div>';
  });
  h += "</div></div>";
  kapsayici.innerHTML = h;
}

var HALKA_RENKLER = ["#1c3557", "#2b4d7d", "#1f5fa8", "#d98014", "#8fb6b2", "#96271b"];

/* merkezSayi: halkanın ortasında yazacak GERÇEK sayı (örn. görüşme sayısı).
   Verilmezse dilimlerin toplamı yazılır. Bir görüşmede birden çok konu
   seçilebildiği için konu toplamı görüşme sayısından büyük olabilir. */
function halkaRengi(d, i) {
  return d.etiket === "Diğer konular" ? "#b8c2d0" : HALKA_RENKLER[i % HALKA_RENKLER.length];
}
function cizHalka(kapsayici, veriler, birim, merkezSayi) {
  veriler = (veriler || []).filter(function (d) { return d.sayi > 0; });
  if (!veriler.length) {
    kapsayici.innerHTML = '<div class="bos">Bu dönemde veri yok.</div>';
    return;
  }
  var toplam = veriler.reduce(function (a, d) { return a + d.sayi; }, 0);
  var h = '<div class="halka-sarma"><svg class="halka-svg" viewBox="0 0 200 200">' +
    '<circle cx="100" cy="100" r="70" fill="none" stroke="#eef2f8" stroke-width="26"/>';
  var cevre = 2 * Math.PI * 70;
  var ofset = 0;
  veriler.forEach(function (d, i) {
    var uzunluk = (d.sayi / toplam) * cevre;
    h += '<circle cx="100" cy="100" r="70" fill="none" stroke="' + halkaRengi(d, i) +
      '" stroke-width="26" stroke-dasharray="' + uzunluk.toFixed(1) + " " + cevre.toFixed(1) +
      '" stroke-dashoffset="' + (-ofset).toFixed(1) + '" transform="rotate(-90 100 100)"/>';
    ofset += uzunluk;
  });
  h += '<text x="100" y="97" text-anchor="middle" class="halka-sayi">' + gSayi(merkezSayi != null ? merkezSayi : toplam) + '</text>' +
    '<text x="100" y="115" text-anchor="middle" class="halka-birim">' + kacHTML(birim || "kayıt") + '</text></svg>';
  h += '<div class="halka-lejant">' + veriler.map(function (d, i) {
    return '<div class="lejant-satir"><i style="background:' + halkaRengi(d, i) + '"></i>' +
      '<span>' + kacHTML(d.etiket) + '</span><b>' + gSayi(d.sayi) + '</b></div>';
  }).join("") +
    (merkezSayi != null && toplam > merkezSayi
      ? '<div class="kucuk soluk" style="margin-top:8px">Bir görüşmede birden fazla konu seçilebildiği için konu toplamı (' + gSayi(toplam) + ') görüşme sayısından fazladır.</div>'
      : '') + '</div></div>';
  kapsayici.innerHTML = h;
}

/* Konu listesini ilk N konu + "Diğer konular" olarak halkaya hazırlar. */
function konuHalkaVerisi(liste, ilkN) {
  ilkN = ilkN || 5;
  var sirali = (liste || []).slice().sort(function (a, b) { return b.sayi - a.sayi; });
  var ust = sirali.slice(0, ilkN).map(function (k) { return { etiket: k.konu, sayi: k.sayi }; });
  var kalan = sirali.slice(ilkN).reduce(function (a, k) { return a + k.sayi; }, 0);
  if (kalan > 0) ust.push({ etiket: "Diğer konular", sayi: kalan });
  return ust;
}

function cizYatayCubuk(kapsayici, veriler, secenek) {
  secenek = secenek || {};
  veriler = (veriler || []).filter(function (d) { return d.sayi > 0; });
  if (!veriler.length) {
    kapsayici.innerHTML = '<div class="bos">Veri yok.</div>';
    return;
  }
  var enBuyuk = veriler.reduce(function (a, d) { return Math.max(a, d.sayi); }, 1);
  var renkler = secenek.renkler || null;
  var h = '<div class="cubuk-liste">' + veriler.map(function (d, i) {
    var renk = renkler ? renkler[i % renkler.length] : (i === 0 ? "var(--lacivert)" : "var(--lacivert-acik)");
    var genislik = Math.max(2, 100 * d.sayi / enBuyuk);
    return '<div class="cubuk-satir"><span class="cubuk-ad" title="' + kacHTML(d.ad) + '">' + kacHTML(d.ad) + '</span>' +
      '<div class="cubuk-alan"><i style="width:' + genislik + '%;background:' + renk + '"></i><b>' + gSayi(d.sayi) + '</b></div></div>';
  }).join("") + '</div>';
  kapsayici.innerHTML = h;
}

/* ---------------------------------------------------------- sesli noktalama sözcükleri */
/*
   "nokta", "virgül", "soru işareti", "ünlem" gibi sözcükleri, sesli yazım
   sırasında söylenince gerçek işarete çevirir (Web Speech API bunu kendi
   başına yapmıyor — sadece kelime olarak yazıyor). Tamamen kural tabanlı,
   hiçbir metin bu bilgisayardan dışarı gönderilmez. Bu sözcükler normal
   Türkçe kelimeler olarak da kullanılabildiği için ("kritik nokta" gibi),
   söylenen her "nokta"/"virgül" sözcüğü işarete çevrilir — bu bilinen ve
   kabul edilmiş bir sınırlamadır.
*/
function sesliNoktalamaCevir(metin) {
  if (!metin) return metin;
  var s = metin;
  var kurallar = [
    [/(^|\s)soru\s+işareti(?=\s|$)/gi, "$1?"],
    [/(^|\s)ünlem\s+işareti(?=\s|$)/gi, "$1!"],
    [/(^|\s)nokta(?=\s|$)/gi, "$1."],
    [/(^|\s)virg[uü]l(?=\s|$)/gi, "$1,"],
    [/(^|\s)ünlem(?=\s|$)/gi, "$1!"],
  ];
  kurallar.forEach(function (kural) { s = s.replace(kural[0], kural[1]); });
  s = s.replace(/[ \t]+([.,!?])/g, "$1"); // işaretten önceki boşluğu kaldır
  return s;
}

/* ---------------------------------------------------------- sesli yazım (Web Speech API) */
/*
   Tarayıcı desteği: Chrome/Edge webkitSpeechRecognition sağlar; Firefox/Safari
   henüz desteklemez. Desteklenmiyorsa tuş devre dışı bırakılır ve elle yazma
   her zaman çalışır — sesli yazım bir eklenti, tek giriş yolu değildir.
*/
function sesliYazimKurulumu(tusEl, durumEl, hedefEl, secenek) {
  secenek = secenek || {};
  var Tanima = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Tanima) {
    if (durumEl) durumEl.textContent = "Bu tarayıcıda sesli yazım desteklenmiyor — elle yazabilirsiniz.";
    if (tusEl) { tusEl.disabled = true; tusEl.style.opacity = ".55"; tusEl.style.cursor = "default"; }
    return null;
  }
  var tanima = new Tanima();
  tanima.lang = "tr-TR";
  tanima.continuous = true;
  tanima.interimResults = true;

  var kayittaMi = false;
  var baslangicMetni = "";
  var araMetin = "";

  function metniGuncelle() {
    var ayrac = baslangicMetni && !/\s$/.test(baslangicMetni) ? " " : "";
    hedefEl.value = baslangicMetni + (araMetin ? ayrac + araMetin : "");
    hedefEl.dispatchEvent(new Event("input"));
  }

  tanima.onresult = function (e) {
    var nihai = "", ara = "";
    for (var i = e.resultIndex; i < e.results.length; i++) {
      var parca = e.results[i][0].transcript;
      if (e.results[i].isFinal) nihai += parca; else ara += parca;
    }
    if (nihai) {
      var ayrac = baslangicMetni && !/\s$/.test(baslangicMetni) ? " " : "";
      baslangicMetni = baslangicMetni + (nihai.trim() ? ayrac + nihai.trim() : "");
      baslangicMetni = sesliNoktalamaCevir(baslangicMetni);
    }
    araMetin = ara;
    metniGuncelle();
  };
  tanima.onerror = function (e) {
    if (durumEl) {
      if (e.error === "not-allowed" || e.error === "permission-denied" || e.error === "service-not-allowed") {
        durumEl.innerHTML = "🎤 Mikrofona erişim engellenmiş. Adres çubuğunun solundaki kilit/simge simgesine tıklayıp " +
          "\"Mikrofon\" iznini <b>İzin Ver</b> yapın, sonra sayfayı yenileyip tekrar deneyin. (Bu ekranda elle de yazabilirsiniz.)";
      } else if (e.error === "no-speech") {
        durumEl.textContent = "Ses algılanamadı — mikrofonunuzun bağlı/açık olduğundan emin olup tekrar deneyin.";
      } else {
        durumEl.textContent = "Ses tanıma hatası (" + e.error + ") — elle yazabilirsiniz.";
      }
    }
    durdur();
  };
  tanima.onend = function () {
    if (kayittaMi) {
      try { tanima.start(); } catch (e) { durdur(); }
    }
  };

  function baslat() {
    baslangicMetni = hedefEl.value || "";
    araMetin = "";
    kayittaMi = true;
    if (tusEl) {
      tusEl.classList.add("kayitta");
      tusEl.querySelector(".nokta");
      tusEl.lastChild && (tusEl.lastChild.textContent = secenek.durdurMetin || " Kaydı Durdur");
    }
    if (durumEl) durumEl.textContent = "🔴 Dinleniyor… söylediğiniz yazıya dökülüyor";
    try { tanima.start(); } catch (e) { /* zaten başlamışsa yut */ }
  }
  function durdur() {
    kayittaMi = false;
    if (tusEl) {
      tusEl.classList.remove("kayitta");
      tusEl.lastChild && (tusEl.lastChild.textContent = secenek.baslatMetin || " Sesle Yaz");
    }
    if (durumEl) durumEl.textContent = secenek.durdurulduMetin || "Kayıt durdu. Gerekirse elle düzenleyebilirsiniz.";
    try { tanima.stop(); } catch (e) { /* yut */ }
  }
  if (tusEl) {
    tusEl.addEventListener("click", function () {
      if (kayittaMi) durdur(); else baslat();
    });
  }
  return { baslat: baslat, durdur: durdur, kayittaMi: function () { return kayittaMi; } };
}

/* ---------------------------------------------------------- noktalama / büyük harf düzenleme */
/*
   Sesli yazımda (veya elle hızlı yazarken) noktalama işaretleri eksik/
   düzensiz kalabiliyor. Bu fonksiyon YALNIZCA sabit kurallara dayanır —
   hiçbir metin bu bilgisayardan dışarı gönderilmez, internete çıkılmaz:
   fazla boşlukları temizler, noktalama işaretinden önceki boşluğu kaldırır,
   metnin başını ve nokta/ünlem/soru işaretinden (veya yeni satırdan) sonraki
   ilk harfi büyütür. Cümlenin nerede bittiğini "anlayıp" eksik bir nokta ya
   da virgülü kendiliğinden EKLEYEMEZ — bunun için gerçek bir yapay zekâya
   (ve internet bağlantısına) ihtiyaç olurdu; bilerek yapılmadı.
*/
function ilkHarfBuyutTr(s) {
  var m = s.match(/^([a-zçğıöşü])/);
  if (!m) return s;
  return m[1].toLocaleUpperCase("tr-TR") + s.slice(1);
}

function noktalamaDuzenle(metin) {
  if (!metin) return metin;
  var s = metin;
  s = s.replace(/[ \t]+/g, " ");                 // fazla boşlukları teke indir
  s = s.replace(/[ \t]*\n[ \t]*/g, "\n");         // satır başı/sonundaki boşlukları temizle
  s = s.replace(/[ \t]+([.,!?;:])/g, "$1");       // noktalama işaretinden önceki boşluğu kaldır
  s = s.replace(/ {2,}/g, " ");
  s = s.trim();
  s = ilkHarfBuyutTr(s);
  // cümle sonu işaretinden (. ! ?) sonra boşluk varsa, ardından gelen ilk harfi büyüt
  s = s.replace(/([.!?]+[ \t]+)([a-zçğıöşü])/g, function (tam, ayrac, harf) {
    return ayrac + harf.toLocaleUpperCase("tr-TR");
  });
  // her yeni satırın ilk harfini de büyüt
  s = s.replace(/(\n)([a-zçğıöşü])/g, function (tam, yeniSatir, harf) {
    return yeniSatir + harf.toLocaleUpperCase("tr-TR");
  });
  return s;
}

/* hedefEl: düzenlenecek textarea/input. tusEl: tıklanınca düzenlemeyi uygulayan tuş. */
function duzenleTusuEkle(tusEl, hedefEl) {
  if (!tusEl || !hedefEl) return;
  tusEl.addEventListener("click", function () {
    var yeni = noktalamaDuzenle(hedefEl.value);
    if (yeni === hedefEl.value) { bildirim("Değiştirilecek bir şey bulunamadı."); return; }
    hedefEl.value = yeni;
    hedefEl.dispatchEvent(new Event("input"));
    bildirim("Metin düzenlendi — sonucu kontrol edip gerekirse elle düzeltebilirsiniz.");
  });
}

/* ---------------------------------------------------------- onay penceresi (modal) */
/*
   Tarayıcının kendi confirm() penceresi yerine, uygulamanın görünümüne uyan
   bir onay penceresi. Promise döner: Evet -> true, Hayır -> false,
   pencere dışına tıklama veya Esc -> null (vazgeç, hiçbir şey yapılmaz).
*/
function onayModali(opts) {
  opts = opts || {};
  return new Promise(function (resolve) {
    var eski = document.getElementById("modalKok");
    if (eski) eski.remove();
    var kok = document.createElement("div");
    kok.id = "modalKok";
    kok.className = "modal-orten";
    kok.innerHTML =
      '<div class="modal-kutu">' +
      (opts.baslik ? '<h3>' + kacHTML(opts.baslik) + '</h3>' : '') +
      '<p>' + kacHTML(opts.mesaj || "") + '</p>' +
      '<div class="modal-aksiyonlar">' +
      '<button id="modalHayirBtn">' + kacHTML(opts.hayirMetin || "Vazgeç") + '</button>' +
      '<button id="modalEvetBtn" class="' + (opts.tehlikeli ? "tehlike" : "birincil") + '">' +
      kacHTML(opts.evetMetin || "Tamam") + '</button>' +
      '</div></div>';
    document.body.appendChild(kok);
    document.getElementById("modalEvetBtn").focus();
    function kapat(sonuc) {
      document.removeEventListener("keydown", tusDinleyici);
      kok.remove();
      resolve(sonuc);
    }
    function tusDinleyici(e) { if (e.key === "Escape") kapat(null); }
    document.addEventListener("keydown", tusDinleyici);
    kok.addEventListener("click", function (e) { if (e.target === kok) kapat(null); });
    document.getElementById("modalEvetBtn").addEventListener("click", function () { kapat(true); });
    document.getElementById("modalHayirBtn").addEventListener("click", function () { kapat(false); });
  });
}

/* ---------------------------------------------------------- tarih giriş maskesi */
/* Kullanıcı yalnızca rakam yazar; nokta otomatik eklenir (gg.aa.yyyy). */
function tarihMaskeUygula(inputEl) {
  inputEl.addEventListener("input", function () {
    var rakamlar = inputEl.value.replace(/\D/g, "").slice(0, 8);
    var yeni = rakamlar;
    if (rakamlar.length > 4) {
      yeni = rakamlar.slice(0, 2) + "." + rakamlar.slice(2, 4) + "." + rakamlar.slice(4);
    } else if (rakamlar.length > 2) {
      yeni = rakamlar.slice(0, 2) + "." + rakamlar.slice(2);
    }
    inputEl.value = yeni;
  });
}

/* ---------------------------------------------------------- diğer küçük yardımcılar */

function otoBuyutTextarea(el) {
  el.style.height = "auto";
  el.style.height = (el.scrollHeight + 2) + "px";
}

function coguldan(dizi, ayirici) {
  return (dizi || []).join(ayirici || ", ");
}

function debounce(fn, ms) {
  var z = null;
  return function () {
    var args = arguments, self = this;
    clearTimeout(z);
    z = setTimeout(function () { fn.apply(self, args); }, ms);
  };
}

/* çoklu-seçim onay kutusu grubu üretir (rf-secenekler / başvurma-konu-çalışma-kurum ortak yapı) */
function secenekGrubuOlustur(secili, tumSecenekler, isim) {
  return '<div class="rf-secenekler">' + tumSecenekler.map(function (s, i) {
    var isaretli = (secili || []).indexOf(s) >= 0;
    return '<label class="rf-secenek"><input type="checkbox" data-secenek="' + kacHTML(s) + '"' +
      (isaretli ? " checked" : "") + '> ' + kacHTML(s) + '</label>';
  }).join("") + '</div>';
}

function secilenleriTopla(kapsayici) {
  return Array.prototype.slice.call(kapsayici.querySelectorAll('input[data-secenek]:checked'))
    .map(function (el) { return el.getAttribute("data-secenek"); });
}

/* 30 dakikalık aralıklarla saat seçenekleri üretir (00:00 – 23:30) */
function saatSecenekleriDoldur(selectEl, opsiyonelMi) {
  var h = opsiyonelMi ? '<option value="">Saat (opsiyonel)</option>' : "";
  for (var sa = 0; sa < 24; sa++) {
    for (var dk = 0; dk < 60; dk += 30) {
      var etiket = (sa < 10 ? "0" : "") + sa + ":" + (dk === 0 ? "00" : "30");
      h += '<option value="' + etiket + '">' + etiket + '</option>';
    }
  }
  selectEl.innerHTML = h;
}

/* ============================================================
   TASARIM 2.0 — ikonlar, menü, avatar, sayfa bandı yardımcıları
   (hepsi satır içi SVG; internete çıkmaz)
   ============================================================ */
var IKONLAR = {
  panel: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  gundem: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="M3.5 6l1.5 1.5L7.5 5M3.5 12l1.5 1.5 2.5-2.5M3.5 18l1.5 1.5 2.5-2.5"/>',
  takvim: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  ogrenciler: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.5 3.3-5.5 6.5-5.5s5.9 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.8c1.7.8 2.8 2.6 3 5.2"/>',
  kayit: '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20c.6-3.5 3.3-5.5 6.5-5.5 1.6 0 3 .4 4.2 1.2"/><path d="M19 14v6M16 17h6"/>',
  etkinlik: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 21l4-1 4 1"/><path d="M7 12l3-3 2 2 4-4"/>',
  toplanti: '<circle cx="12" cy="6.5" r="2.5"/><circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><path d="M4 15h16v2.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/>',
  okulrapor: '<path d="M3 21h18M5 21V10l7-5 7 5v11"/><path d="M10 21v-5h4v5"/><path d="M9.5 11.5h5"/>',
  rapor: '<path d="M3 21h18"/><rect x="5" y="11" width="3" height="7" rx=".8"/><rect x="10.5" y="5" width="3" height="13" rx=".8"/><rect x="16" y="14" width="3" height="4" rx=".8"/>',
  ayarlar: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  marka: '<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="M12 14s-3.5-2.1-3.5-4.2A1.8 1.8 0 0 1 12 9a1.8 1.8 0 0 1 3.5.8C15.5 11.9 12 14 12 14z"/>',
  uyari: '<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4M12 17.5v.5"/>',
  zil: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  saat: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  dosya: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
  yukle: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
  arti: '<path d="M12 5v14M5 12h14"/>',
  kalkan: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><rect x="9" y="11" width="6" height="5" rx="1"/><path d="M10 11V9.5a2 2 0 0 1 4 0V11"/>',
  bos: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12h8M12 8v8"/>',
  kalem: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  yorum: '<path d="M4 5h16v11H9l-5 4z"/>',
  bilgi: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  hedef: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'
};
function ikonSvg(ad, sinif) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' +
    (sinif ? ' class="' + sinif + '"' : "") + ' aria-hidden="true">' + (IKONLAR[ad] || IKONLAR.bos) + '</svg>';
}

/* baş harf avatarı: ismin baş harfleri, isimden türetilen sabit (ama rastgele görünen) renk */
var AVATAR_RENKLER = ["#1f5fa8", "#0e7490", "#1a6b45", "#5b2d9e", "#a3266b", "#9a5a06", "#475569", "#c2410c", "#2b4d7d", "#4d7c0f"];
function basHarfler(ad) {
  var p = String(ad || "").replace(/^ÖRNEK\s*-\s*/i, "").trim().split(/\s+/).filter(Boolean);
  if (!p.length) return "?";
  var ilk = p[0].charAt(0), son = p.length > 1 ? p[p.length - 1].charAt(0) : "";
  return (ilk + son).toLocaleUpperCase("tr-TR");
}
function avatarRengi(ad) {
  var h = 0, s = String(ad || "");
  for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return AVATAR_RENKLER[h % AVATAR_RENKLER.length];
}
function avatarHtml(ad, ekSinif) {
  return '<span class="avatar' + (ekSinif ? " " + ekSinif : "") + '" style="background:' + avatarRengi(ad) + '">' +
    kacHTML(basHarfler(ad)) + '</span>';
}

/* boş durum kutusu */
function bosDurumHtml(baslik, aciklama, ikon) {
  return '<div class="bos-durum">' + ikonSvg(ikon || "bos") + '<b>' + kacHTML(baslik) + '</b>' +
    (aciklama ? '<span class="kucuk">' + kacHTML(aciklama) + '</span>' : "") + '</div>';
}

/* sol menüyü yeni tasarıma çevirir: marka bloğu, ikonlar, bölüm başlıkları, kullanıcı kutusu */
(function menuyuGuzellestir() {
  var yan = document.getElementById("yan");
  if (!yan || yan.getAttribute("data-tasarim")) return;
  yan.setAttribute("data-tasarim", "2");
  var h1 = yan.querySelector("h1"), alt = yan.querySelector(".alt");
  if (h1) {
    var marka = document.createElement("div");
    marka.className = "marka";
    marka.innerHTML = '<span class="marka-ikon">' + ikonSvg("marka") + '</span><div class="marka-yazi"></div>';
    yan.insertBefore(marka, h1);
    var yazi = marka.querySelector(".marka-yazi");
    yazi.appendChild(h1);
    if (alt) yazi.appendChild(alt);
  }
  /* "Okul Raporu" menü öğesi: tüm sayfalara tek yerden eklenir (Raporlar'ın hemen altına) */
  var raporA = yan.querySelector('nav a[data-yol="rapor"]');
  if (raporA && !yan.querySelector('nav a[data-yol="okulrapor"]')) {
    var okulA = document.createElement("a");
    okulA.href = "okul-raporu.html";
    okulA.setAttribute("data-yol", "okulrapor");
    okulA.textContent = "Okul Raporu";
    if (/okul-raporu\.html$/.test(location.pathname)) okulA.className = "etkin";
    raporA.parentNode.insertBefore(okulA, raporA.nextSibling);
  }
  var bolumler = { panel: "Günlük", ogrenciler: "Öğrenciler", etkinlik: "Planlama", rapor: "Analiz" };
  yan.querySelectorAll("nav a[data-yol]").forEach(function (a) {
    var yol = a.getAttribute("data-yol");
    if (bolumler[yol]) {
      var b = document.createElement("div");
      b.className = "menu-baslik";
      b.textContent = bolumler[yol];
      a.parentNode.insertBefore(b, a);
    }
    a.setAttribute("title", a.textContent.trim());
    a.innerHTML = ikonSvg(yol) + '<span>' + a.innerHTML + '</span>';
  });

  /* ---- açılır/kapanır menü: tercih bu bilgisayarın tarayıcısında hatırlanır ---- */
  var DAR_ANAHTAR = "rehberlikMenuDar";
  function darMi() { try { return localStorage.getItem(DAR_ANAHTAR) === "1"; } catch (e) { return false; } }
  function uygula(dar) {
    document.body.classList.toggle("menu-dar", dar);
    tus.setAttribute("title", dar ? "Menüyü sabitle (aç)" : "Menüyü daralt (yalnızca ikonlar)");
    tus.setAttribute("aria-label", tus.getAttribute("title"));
    tus.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
      (dar ? '<path d="M9 6l6 6-6 6"/>' : '<path d="M15 6l-6 6 6 6"/>') + '</svg>';
  }
  var tus = document.createElement("button");
  tus.type = "button";
  tus.className = "menu-daralt-tusu";
  yan.appendChild(tus);
  tus.addEventListener("click", function () {
    var yeni = !document.body.classList.contains("menu-dar");
    try { localStorage.setItem(DAR_ANAHTAR, yeni ? "1" : "0"); } catch (e) {}
    uygula(yeni);
    tus.blur();
  });
  uygula(darMi());
  var kutu = document.getElementById("kullaniciKutu");
  if (kutu) {
    var bicimle = function () {
      if (kutu.querySelector(".avatar")) return;
      var parcalar = kutu.innerHTML.split(/<br\s*\/?>/i);
      var ad = parcalar[0].replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
      if (!ad || /Yükleniyor/.test(ad)) return;
      var unvan = (parcalar[1] || "").replace(/<[^>]*>/g, "").trim();
      gozlemci.disconnect();
      kutu.innerHTML = avatarHtml(ad) + '<div><b>' + kacHTML(ad) + '</b><br>' + kacHTML(unvan) + '</div>';
      gozlemci.observe(kutu, { childList: true, characterData: true, subtree: true });
    };
    var gozlemci = new MutationObserver(bicimle);
    gozlemci.observe(kutu, { childList: true, characterData: true, subtree: true });
    bicimle();
  }
})();

/* gündem öğesinin türünü (renk sınıfı + etiket) belirler */
function gundemOgeTuru(o) {
  if (o.toplantiId || o.kaynak === "Toplantı") return { sinif: "toplanti", ad: "Toplantı" };
  if (o.etkinlikId || o.kaynak === "Sınıf Etkinliği") return { sinif: "etkinlik", ad: "Sınıf Etkinliği" };
  if (o.kaynak === "Zamanlama") return { sinif: "plan", ad: "Hatırlatma" };
  if (/^veli görüşmesi/i.test(o.metin || "")) return { sinif: "aile", ad: "Veli Görüşmesi" };
  return { sinif: "izleme", ad: "Öğrenci Görüşmesi" };
}
function gundemOgeUrl(o) {
  if (o.ogrenciId) return "dosya.html?id=" + encodeURIComponent(o.ogrenciId);
  if (o.toplantiId) return "toplanti.html";
  return "sinif-etkinlik.html";
}
function turCipHtml(tur) {
  return '<span class="tur-cip ' + tur.sinif + '"><i></i>' + kacHTML(tur.ad) + '</span>';
}
/* "3 gün önce" / "bugün" gibi göreli ifade */
function gunFarkiMetni(gun) {
  if (gun === null || gun === undefined) return "hiç görüşülmedi";
  if (gun <= 0) return "bugün";
  if (gun === 1) return "dün";
  return gun + " gün önce";
}
/* önceki döneme göre değişim rozeti */
function degisimRozeti(simdi, onceki, etiket) {
  if (!onceki && !simdi) return "";
  if (!onceki) return '<span class="kpi-degisim sabit" title="' + kacHTML(etiket || "") + '">yeni</span>';
  var fark = simdi - onceki, yuzde = Math.round(100 * fark / onceki);
  var sinif = fark > 0 ? "artis" : (fark < 0 ? "azalis" : "sabit");
  var ok = fark > 0 ? "▲" : (fark < 0 ? "▼" : "•");
  return '<span class="kpi-degisim ' + sinif + '" title="' + kacHTML(etiket || "") + '">' + ok + " %" + Math.abs(yuzde) + '</span>';
}

/* tarih rozeti: büyük gün, ay + yıl, altında saat (aynı bilgiyi iki kez yazmaz) */
var AY_KISA_TR = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
function tarihRozetiHtml(tarihStr, saatMetni, ekSinif) {
  var p = String(tarihStr || "").split(".");
  var gun = p.length === 3 ? parseInt(p[0], 10) : "";
  var ay = p.length === 3 ? AY_KISA_TR[parseInt(p[1], 10) - 1] + " " + p[2] : tarihStr;
  return '<div class="tarih-rozet' + (ekSinif ? " " + ekSinif : "") + '"><b>' + kacHTML(gun) + '</b><span>' + kacHTML(ay) + '</span>' +
    (saatMetni ? '<em>' + kacHTML(saatMetni) + '</em>' : '') + '</div>';
}
/* tarih ("gg.aa.yyyy") -> karşılaştırılabilir sayı */
function tarihSayi(t) {
  var p = String(t || "").split(".");
  return p.length === 3 ? (+p[2]) * 10000 + (+p[1]) * 100 + (+p[0]) : 0;
}

/* ======================================================================
   ETKİNLİK ALARMI — saati gelen sınıf etkinliği / toplantı / hatırlatma için
   sağ üstte bildirim kartı. Program (herhangi bir sayfası) açıkken çalışır.
   Ayarlar > Görünüm ve Bildirim'den açılıp kapatılır; tercihler ayarlar.json'da.
   Kart kapatma/erteleme bilgisi tarayıcıda tutulur, böylece açık diğer sekmelerde
   ve sayfa değiştirince aynı uyarı tekrar tekrar çıkmaz.
   ====================================================================== */
var ALARM_VARSAYILAN = { acik: true, onceDk: 10, ses: true, windows: false };
var ALARM_AYAR = Object.assign({}, ALARM_VARSAYILAN);
var _alarmKayitlar = [], _alarmCaldi = {}, _sesBaglam = null;

function _alarmDepo(anahtar, deger) {
  try {
    if (deger === undefined) {
      var o = JSON.parse(localStorage.getItem("rehberlikAlarm") || "{}");
      return o._gun === new Date().toDateString() ? o[anahtar] : undefined;
    }
    var d = JSON.parse(localStorage.getItem("rehberlikAlarm") || "{}");
    var bugunEk = new Date().toDateString();
    if (d._gun !== bugunEk) d = { _gun: bugunEk };      // her gün temiz başla
    if (deger === null) delete d[anahtar]; else d[anahtar] = deger;
    localStorage.setItem("rehberlikAlarm", JSON.stringify(d));
  } catch (e) {}
}
function _alarmAnahtar(k) { return k.tur + ":" + k.id + ":" + k.saat; }
function _alarmZamani(k) {
  var p = (k.saat || "").split(":"), d = new Date();
  d.setHours(+p[0] || 0, +p[1] || 0, 0, 0);
  return d;
}

/* tarayıcıda üretilen kısa zil sesi (dosya / internet gerektirmez) */
function alarmSesiCal() {
  if (!ALARM_AYAR.ses) return;
  try {
    _sesBaglam = _sesBaglam || new (window.AudioContext || window.webkitAudioContext)();
    var t0 = _sesBaglam.currentTime;
    [[880, 0], [1175, 0.18], [1568, 0.36], [1175, 0.9], [1568, 1.08]].forEach(function (n) {
      var o = _sesBaglam.createOscillator(), g = _sesBaglam.createGain();
      o.type = "sine"; o.frequency.value = n[0];
      g.gain.setValueAtTime(0.0001, t0 + n[1]);
      g.gain.exponentialRampToValueAtTime(0.22, t0 + n[1] + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + n[1] + 0.5);
      o.connect(g); g.connect(_sesBaglam.destination);
      o.start(t0 + n[1]); o.stop(t0 + n[1] + 0.55);
    });
  } catch (e) {}
}
/* tarayıcılar sesi ancak bir tıklamadan sonra açar: ilk tıklamada ses motorunu hazırla */
document.addEventListener("click", function () {
  try { _sesBaglam = _sesBaglam || new (window.AudioContext || window.webkitAudioContext)(); if (_sesBaglam.state === "suspended") _sesBaglam.resume(); } catch (e) {}
}, { once: true });

var ALARM_TUR = {
  etkinlik: { ad: "Sınıf Etkinliği", ikon: "etkinlik", renk: "#7c3aed" },
  toplanti: { ad: "Toplantı", ikon: "toplanti", renk: "#0e7490" },
  hatirlatma: { ad: "Hatırlatma", ikon: "saat", renk: "#d97706" }
};

function _alarmKutusu() {
  var k = document.getElementById("alarmYigini");
  if (!k) { k = document.createElement("div"); k.id = "alarmYigini"; k.setAttribute("aria-live", "polite"); document.body.appendChild(k); }
  return k;
}

function _alarmKartCiz(k, durum, dk) {
  var anahtar = _alarmAnahtar(k), t = ALARM_TUR[k.tur] || ALARM_TUR.hatirlatma;
  var kart = document.querySelector('.alarm-kart[data-anahtar="' + CSS.escape(anahtar) + '"]');
  var yeni = !kart;
  if (yeni) { kart = document.createElement("div"); kart.className = "alarm-kart"; kart.setAttribute("data-anahtar", anahtar); }
  kart.classList.toggle("simdi", durum === "simdi");
  kart.style.setProperty("--alarm-renk", t.renk);
  var zaman = durum === "simdi" ? (dk <= 0 ? "Şimdi başlıyor" : dk + " dk önce başladı") : dk + " dk sonra başlıyor";
  kart.innerHTML =
    '<div class="alarm-zil">' + ikonSvg("zil") + '</div>' +
    '<div class="alarm-govde">' +
      '<div class="alarm-ust"><span class="alarm-tur">' + t.ad + '</span><span class="alarm-saat">' + kacHTML(k.saat) + (k.bitis ? "–" + kacHTML(k.bitis) : "") + '</span></div>' +
      '<b class="alarm-baslik">' + kacHTML(k.baslik) + '</b>' +
      (k.alt ? '<div class="alarm-alt">' + kacHTML(k.alt) + '</div>' : '') +
      '<div class="alarm-durum">' + zaman + '</div>' +
      '<div class="alarm-tuslar">' +
        '<button type="button" class="alarm-tamam">✓ Tamamlandı</button>' +
        '<button type="button" class="alarm-ertele">5 dk ertele</button>' +
        '<a class="alarm-git" href="' + kacHTML(k.url || "gundem.html") + '">Aç</a>' +
      '</div>' +
    '</div>' +
    '<button type="button" class="alarm-kapat" title="Kapat (bugün bir daha gösterme)">✕</button>';
  kart.querySelector(".alarm-kapat").onclick = function () { _alarmDepo(anahtar, { kapandi: 1 }); _alarmKaldir(anahtar); };
  kart.querySelector(".alarm-ertele").onclick = function () { _alarmDepo(anahtar, { ertele: Date.now() + 5 * 60000 }); _alarmKaldir(anahtar); };
  kart.querySelector(".alarm-tamam").onclick = function () {
    var b = this; b.disabled = true;
    apiPost("/api/hatirlaticilar/tamamla", { tur: k.tur, id: k.id, ogrenciId: k.ogrenciId || "" }).then(function () {
      _alarmDepo(anahtar, { kapandi: 1 });
      _alarmKaldir(anahtar);
      bildirim("“" + k.baslik + "” tamamlandı olarak işaretlendi.");
      ["listeyiYukle", "yukle", "takvimYukle", "gundemYukle", "panelYukle"].forEach(function (f) {
        if (typeof window[f] === "function") { try { window[f](); } catch (e) {} }
      });
    }).catch(function (e) { b.disabled = false; apiHataGoster(e); });
  };
  if (yeni) { _alarmKutusu().appendChild(kart); requestAnimationFrame(function () { kart.classList.add("gorunur"); }); }
  /* 15 sn sonra sayfadaki işi kapatmasın diye küçük bir zil rozetine dönüşür; üzerine gelince açılır.
     Vakti geldiğinde ("şimdi") yeniden büyür ve 15 sn daha açık kalır. */
  if (yeni || kart.getAttribute("data-durum") !== durum) {
    kart.setAttribute("data-durum", durum);
    kart.classList.remove("kucuk");
    clearTimeout(kart._kucult);
    kart._kucult = setTimeout(function () { kart.classList.add("kucuk"); }, 15000);
  }
}

function _alarmKaldir(anahtar) {
  var kart = document.querySelector('.alarm-kart[data-anahtar="' + CSS.escape(anahtar) + '"]');
  if (!kart) return;
  kart.classList.remove("gorunur");
  setTimeout(function () { kart.remove(); }, 260);
}

function alarmlariDenetle() {
  if (!ALARM_AYAR.acik) { _alarmKutusu().innerHTML = ""; return; }
  var simdi = Date.now();
  _alarmKayitlar.forEach(function (k) {
    var anahtar = _alarmAnahtar(k), d = _alarmDepo(anahtar) || {};
    var bas = _alarmZamani(k).getTime(), dk = Math.round((bas - simdi) / 60000);
    var gorunsun = !d.kapandi && !(d.ertele && d.ertele > simdi) &&
      simdi >= bas - (+ALARM_AYAR.onceDk || 0) * 60000 && simdi <= bas + 60 * 60000;
    if (!gorunsun) { _alarmKaldir(anahtar); return; }
    var durum = simdi >= bas ? "simdi" : "yakinda";
    _alarmKartCiz(k, durum, durum === "simdi" ? -dk : dk);
    var calKey = anahtar + ":" + durum;
    if (!_alarmCaldi[calKey] && !(d.caldi || {})[durum]) {
      _alarmCaldi[calKey] = true;
      var c = d.caldi || {}; c[durum] = 1; d.caldi = c; _alarmDepo(anahtar, d);   // diğer sekmeler tekrar çalmasın
      alarmSesiCal();
      if (ALARM_AYAR.windows && window.Notification && Notification.permission === "granted" && (document.hidden || durum === "simdi")) {
        try {
          var n = new Notification((ALARM_TUR[k.tur] || {}).ad + " · " + k.saat, { body: k.baslik + (k.alt ? "\n" + k.alt : ""), tag: anahtar, icon: "/favicon.ico" });
          n.onclick = function () { window.focus(); n.close(); };
        } catch (e) {}
      }
    }
  });
}

function alarmlariYukle() {
  fetch("/api/hatirlaticilar", { cache: "no-store" }).then(function (y) { return y.ok ? y.json() : null; }).then(function (v) {
    if (!v) return;
    _alarmKayitlar = v.kayitlar || [];
    // listede artık olmayan (tamamlanmış/silinmiş) kartları kaldır
    var gecerli = {}; _alarmKayitlar.forEach(function (k) { gecerli[_alarmAnahtar(k)] = 1; });
    document.querySelectorAll(".alarm-kart").forEach(function (kart) { if (!gecerli[kart.getAttribute("data-anahtar")]) _alarmKaldir(kart.getAttribute("data-anahtar")); });
    alarmlariDenetle();
  }).catch(function () {});
}

(function alarmBaslat() {
  if (!document.getElementById("yan")) return;          // yalnızca program sayfalarında (çıktı sayfalarında değil)
  fetch("/api/baslangic", { cache: "no-store" }).then(function (y) { return y.ok ? y.json() : null; }).then(function (b) {
    if (b && b.ayarlar && b.ayarlar.bildirim) ALARM_AYAR = Object.assign({}, ALARM_VARSAYILAN, b.ayarlar.bildirim);
    alarmlariYukle();
    setInterval(alarmlariYukle, 60000);       // yeni eklenen kayıtlar dakikada bir
    setInterval(alarmlariDenetle, 15000);     // zaman kontrolü 15 sn'de bir
  }).catch(function () {});
  window.addEventListener("storage", function (e) { if (e.key === "rehberlikAlarm") alarmlariDenetle(); });
})();


/* ============================================================
   KULLANIM KOŞULLARI ONAYI (sürüm 3.4)
   Koşullar hiç kabul edilmemişse ya da koşul sürümü değiştiyse, programın
   ana sayfalarında koşulları gösteren ve onay isteyen bir pencere açılır.
   ============================================================ */
(function kosulOnayiDenetle() {
  if (!document.getElementById("yan")) return;          // yalnızca menülü ana sayfalarda
  fetch("/api/kosullar", { cache: "no-store" }).then(function (y) { return y.ok ? y.json() : null; }).then(function (v) {
    if (!v || !v.gerekli) return;
    var kutu = document.createElement("div");
    kutu.className = "kosul-perde";
    kutu.innerHTML = '<div class="kosul-pencere" role="dialog" aria-modal="true">' +
      '<div class="kosul-baslik"><b>Kullanım Koşulları</b><span>Programı kullanmaya devam etmek için lütfen okuyup onaylayın.</span></div>' +
      '<iframe src="kullanim-kosullari.html?gomulu=1" title="Kullanım Koşulları"></iframe>' +
      '<div class="kosul-alt"><label><input type="checkbox" id="kosulOnayKutu"> Kullanım Koşulları ve Sorumluluk Reddi\'ni okudum ve kabul ediyorum.</label>' +
      '<button type="button" class="birincil" id="kosulOnayTus" disabled>Kabul Ediyorum</button></div></div>';
    document.body.appendChild(kutu);
    var onay = document.getElementById("kosulOnayKutu"), tus = document.getElementById("kosulOnayTus");
    onay.addEventListener("change", function () { tus.disabled = !onay.checked; });
    tus.addEventListener("click", function () {
      tus.disabled = true;
      apiPost("/api/kosullar/kabul", {}).then(function () { kutu.remove(); bildirim("Teşekkürler, koşullar kabul edildi."); })
        .catch(function (e) { tus.disabled = false; apiHataGoster(e); });
    });
  }).catch(function () {});
})();
