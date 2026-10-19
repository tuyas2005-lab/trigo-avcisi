/* Tüm sayfalarda aynı üst menü ve alt bilgi. Sayfa <body data-sayfa="..."> ile hangi menü öğesinin seçili olduğunu söyler.
   Alt bilgide her sayfada Kullanım Koşulları bağlantısı ve "MEB'in resmî yazılımı değildir" notu bulunur. */
(function(){
  const CFG=window.RG_CONFIG||{},sayfa=document.body.dataset.sayfa||'';
  const MENU=[['index.html','ana','Ana sayfa'],['index.html#canli','canli','Canlı örnek'],['surumler.html','surumler','Sürüm notları'],['iletisim.html','iletisim','Geliştirme talebi / İletişim']];
  const ust=document.createElement('header');ust.className='site-ust';
  ust.innerHTML='<div class="wrap"><a class="logo" href="index.html"><img src="icon-192.png" alt="" width="38" height="38"><span>Öğrenci Rehberlik<br>Takip Sistemi</span></a>'+
    '<button id="menuTus" type="button" aria-label="Menü" aria-expanded="false">☰</button><nav id="siteMenu">'+
    MENU.map(m=>'<a href="'+m[0]+'"'+(m[1]===sayfa?' aria-current="page"':'')+'>'+m[2]+'</a>').join('')+
    '<a class="btn ana" href="indir.html"'+(sayfa==='indir'?' aria-current="page"':'')+'>⬇ Ücretsiz indir</a><button class="tema-tus" id="temaTus" type="button"></button></nav></div>';
  document.body.prepend(ust);
  const alt=document.createElement('footer');alt.className='site-alt';
  alt.innerHTML='<div class="wrap"><div><b>Öğrenci Rehberlik Takip Sistemi</b><br>Rehber öğretmenler için ücretsiz görüşme kaydı, resmî form çıktısı, takvim ve rapor programı. İnternetsiz çalışır; verileriniz yalnızca sizin bilgisayarınızda kalır.'+
    '<div class="meb">Bu program Millî Eğitim Bakanlığı\'nın ya da herhangi bir kamu kurumunun resmî yazılımı değildir; bu kurumlarla bağlantısı yoktur ve onlar tarafından onaylanmamıştır.</div></div>'+
    '<div><ul><li><a href="indir.html">Ücretsiz indir</a></li><li><a href="surumler.html">Sürüm notları</a></li><li><a href="kosullar.html">Kullanım Koşulları</a></li><li><a href="iletisim.html">Geliştirme talebi / İletişim</a></li><li><a href="index.html#canli">Canlı örnek</a></li><li><a href="index.html#sss">Sıkça sorulanlar</a></li></ul>'+
    (CFG.eposta?'<p style="margin:16px 0 0">İletişim: <a href="mailto:'+CFG.eposta+'">'+CFG.eposta+'</a></p>':'')+
    '<p style="margin:12px 0 0;opacity:.75">Bu site çerez kullanmaz. İndirmeler yalnızca sayı olarak sayılır; indirenlerin listesi tutulmaz.</p></div></div>';
  document.body.append(alt);
  const tus=document.getElementById('menuTus'),menu=document.getElementById('siteMenu');
  tus.addEventListener('click',()=>{const a=menu.classList.toggle('acik');tus.setAttribute('aria-expanded',a);});
  menu.addEventListener('click',e=>{if(e.target.tagName==='A')menu.classList.remove('acik');});
  /* açık / koyu tema: varsayılan açık; seçim tarayıcıda hatırlanır */
  const temaTus=document.getElementById('temaTus'),kok=document.documentElement;
  function temaYaz(){const koyu=kok.dataset.theme==='dark';temaTus.textContent=koyu?'☀️':'🌙';temaTus.title=temaTus.ariaLabel=koyu?'Açık temaya geç':'Koyu temaya geç';}
  temaTus.addEventListener('click',()=>{const koyu=kok.dataset.theme!=='dark';if(koyu)kok.dataset.theme='dark';else delete kok.dataset.theme;try{localStorage.setItem('rg-tema',koyu?'koyu':'acik');}catch(e){}temaYaz();});
  temaYaz();
})();
