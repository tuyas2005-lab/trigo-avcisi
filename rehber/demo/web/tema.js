/* Görünüm (açık / koyu / sistem) — sayfa çizilmeden önce, <head> içinde çalışır ki
   ekran bir an beyaz yanıp sönmesin. Tercih bu bilgisayarda tarayıcıda ve ayarlar.json'da tutulur. */
(function () {
  var t = "acik";
  try { t = localStorage.getItem("rehberlikTema") || "acik"; } catch (e) {}
  var koyu = t === "koyu" || (t === "sistem" && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
  if (koyu) document.documentElement.classList.add("koyu");
})();
