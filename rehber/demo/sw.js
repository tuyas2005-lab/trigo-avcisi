/* Canlı örnek: program sayfalarının /api/... isteklerini, Python'u çalıştıran kabuk sayfasına
   (demo/index.html) iletir ve yanıtı geri verir. Böylece resimler, indirmeler ve yeni sekmede açılan
   rapor sayfaları da gerçek programdaki gibi çalışır. Sayfa dosyaları normal yoldan gelir. */
const KABUK=new URL('./',self.location).pathname;
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin||!u.pathname.startsWith('/api/'))return;
  e.respondWith(ilet(e.request,u));
});
const BOS_GOVDE=[101,204,205,304];
function jsonYanit(durum,veri){return new Response(JSON.stringify(veri),{status:durum,headers:{'Content-Type':'application/json; charset=utf-8'}});}
async function kabukBul(){
  const hepsi=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  const kabuklar=hepsi.filter(c=>{const p=new URL(c.url).pathname;return p===KABUK||p===KABUK+'index.html';});
  return kabuklar.find(c=>c.focused)||kabuklar.find(c=>c.visibilityState==='visible')||kabuklar[0];
}
async function ilet(istek,u){
  const kabuk=await kabukBul();
  if(!kabuk)return jsonYanit(503,{hata:'Canlı örnek kapalı. Canlı örnek sayfasını yeniden açın.'});
  const govde=istek.method==='GET'||istek.method==='HEAD'?null:await istek.arrayBuffer();
  const kanal=new MessageChannel();
  const yanit=new Promise((tamam,olmadi)=>{kanal.port1.onmessage=e=>tamam(e.data);setTimeout(()=>olmadi(new Error('zaman aşımı')),60000);});
  kabuk.postMessage({tur:'rg-istek',yontem:istek.method,url:u.pathname+u.search,basliklar:[...istek.headers],govde},[kanal.port2].concat(govde?[govde]:[]));
  try{
    const r=await yanit;
    return new Response(BOS_GOVDE.includes(r.durum)?null:r.govde,{status:r.durum,headers:r.basliklar});
  }catch(err){return jsonYanit(504,{hata:'Canlı örnek yanıt vermedi. Sayfayı yenileyin.'});}
}
