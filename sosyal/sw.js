/* Çevrimdışı destek: önce ağdan dener, olmazsa son kaydedilen kopyayı verir. Supabase istekleri önbelleğe alınmaz. */
const CACHE='sosyal-avcisi-v2';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','index.html','art.js','content1.js','content2.js','config.js','manifest.webmanifest','icon-192.png']).catch(()=>{})));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.startsWith('/_vercel'))return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
});
