/* Sosyal Avcısı görselleri: her ders kartı ve soru için SVG çizimler.
   ART.draw(spec) → SVG metni. spec bir dizi: ['tr', {...}] gibi. Haritalar basitleştirilmiştir. */
(function(){
const EMO='font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif"';
const TXT='font-family="Nunito Sans,Segoe UI,Roboto,sans-serif" font-weight="800"';
const C={bg:'#0F1B2D',panel:'#17263D',panel2:'#1F3250',line:'#2B3E5C',fg:'#F4F1EA',muted:'#A9B6C9',
  red:'#FF5A5F',blue:'#2EC4F1',purple:'#B98CFF',orange:'#FFA53D',green:'#5BE49B',yellow:'#FFD84D',
  sea:'#16406B',land:'#E9DDBF',land2:'#D9C79C',ink:'#0F1B2D'};
const PAL=[C.orange,C.blue,C.red,C.purple,C.green,C.yellow];
function esc(s){return String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));}
function svg(w,h,body,label){return '<svg class="art" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+esc(label||'Görsel')+'" xmlns="http://www.w3.org/2000/svg">'+body+'</svg>';}
function t(x,y,s,o){o=o||{};return '<text x="'+x+'" y="'+y+'" fill="'+(o.c||C.fg)+'" font-size="'+(o.fs||16)+'" text-anchor="'+(o.a||'middle')+'" dominant-baseline="middle" '+TXT+(o.stroke?' stroke="'+o.stroke+'" stroke-width="5" paint-order="stroke" stroke-linejoin="round"':'')+'>'+esc(s)+'</text>';}
function e(x,y,s,fs){return '<text x="'+x+'" y="'+y+'" font-size="'+(fs||30)+'" text-anchor="middle" dominant-baseline="central" '+EMO+'>'+s+'</text>';}
/* Uzun etiketi en fazla iki satıra böler. */
function wrap(s,max){s=String(s);if(s.length<=max)return [s];const w=s.split(' ');let a='',b='';for(const x of w){if(!b&&(a+' '+x).trim().length<=max)a=(a+' '+x).trim();else b=(b+' '+x).trim();}return b?[a,b]:[a];}
function tl(x,y,s,max,o){const L=wrap(s,max);const lh=(o&&o.fs?o.fs:16)*1.15;return L.map((l,i)=>t(x,y+(i-(L.length-1)/2)*lh,l,o)).join('');}

/* ---------- Türkiye haritası (boylam, enlem) ---------- */
const ANA=[[26.4,40.05],[26.7,40.35],[27.3,40.45],[27.95,40.36],[28.8,40.38],[29.3,40.45],[29.95,40.74],[29.4,40.82],[29.05,41.02],[29.12,41.22],[29.6,41.17],[30.7,41.1],[31.4,41.28],[31.8,41.45],[32.4,41.75],[33.4,41.95],[34.3,42.0],[35.15,42.05],[35.9,41.73],[36.33,41.3],[37.3,41.13],[37.9,41.0],[38.4,40.92],[39.72,41.0],[40.52,41.03],[41.43,41.4],[41.55,41.52],[42.5,41.48],[43.4,41.15],[43.6,40.7],[43.7,40.15],[44.3,40.0],[44.8,39.7],[44.25,39.4],[44.45,38.4],[44.3,37.75],[44.8,37.15],[43.6,37.25],[42.4,37.1],[41.0,37.08],[40.0,36.85],[39.0,36.7],[38.0,36.85],[37.0,36.65],[36.6,36.83],[36.68,36.25],[36.2,35.83],[35.95,36.1],[36.17,36.6],[36.2,36.88],[35.8,36.77],[35.38,36.57],[34.63,36.8],[33.93,36.37],[32.83,36.02],[32.0,36.54],[30.7,36.88],[30.57,36.6],[30.15,36.3],[29.64,36.2],[29.1,36.62],[28.8,36.73],[28.27,36.85],[27.4,36.68],[27.43,37.03],[27.27,37.38],[27.26,37.86],[26.6,38.1],[26.3,38.32],[26.75,38.42],[26.85,38.75],[26.9,39.07],[26.69,39.32],[27.0,39.55],[26.07,39.48],[26.2,39.9]];
const THR=[[26.05,40.73],[26.2,40.05],[26.67,40.42],[27.5,40.97],[28.25,41.07],[28.98,41.0],[29.05,41.2],[28.6,41.4],[27.98,41.88],[27.55,42.0],[27.0,42.08],[26.6,41.75],[26.35,41.72],[26.6,41.2],[26.35,40.95]];
const TRB={x0:23.7,x1:46.6,y0:34.8,y1:43.6,k:20,ky:26};
function P(lon,lat){return [(lon-TRB.x0)*TRB.k,(TRB.y1-lat)*TRB.ky];}
const TRW=Math.round((TRB.x1-TRB.x0)*TRB.k),TRH=Math.round((TRB.y1-TRB.y0)*TRB.ky);
function poly(pts){return pts.map((p,i)=>{const q=P(p[0],p[1]);return (i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1);}).join(' ')+' Z';}
const TRPATH=poly(ANA)+' '+poly(THR);
/* İklim bölgeleri (basitleştirilmiş). */
const KARADENIZ=[[29.1,41.25],[31.4,41.35],[33.4,42.1],[35.15,42.2],[37.9,41.1],[41.6,41.6],[42.6,41.6],[42.4,40.7],[40.0,40.45],[38.0,40.45],[36.0,40.75],[34.0,41.0],[32.0,40.9],[30.3,40.6],[29.1,40.85]];
const AKDENIZ=[[25.9,40.2],[27.3,40.0],[27.9,39.3],[28.2,38.4],[28.4,37.7],[29.2,37.2],[30.4,37.3],[32.0,36.95],[33.6,36.75],[35.0,37.15],[36.3,37.2],[36.9,36.5],[36.4,35.7],[35.0,36.2],[32.0,35.9],[29.5,36.0],[27.0,36.5],[26.0,38.0],[25.8,39.4]];
const SEAS={karadeniz:{n:'Karadeniz',x:35,y:43.0,box:[[27.6,43.6],[41.8,43.6],[41.8,41.75],[36,42.25],[33,42.25],[29,41.4],[28.2,42.1]]},
  ege:{n:'Ege Denizi',x:25.0,y:38.4,box:[[23.7,41.0],[26.05,40.6],[26.2,40.0],[26.6,38.2],[27.2,36.8],[23.7,36.8]]},
  akdeniz:{n:'Akdeniz',x:31.5,y:35.5,box:[[23.7,36.8],[27.3,36.55],[30.2,36.1],[32.8,35.9],[36.0,35.75],[36.3,34.8],[23.7,34.8]]},
  marmara:{n:'Marmara',x:28.2,y:40.75,box:[[26.75,40.43],[27.5,40.95],[28.98,41.0],[29.8,40.78],[28.8,40.43],[27.4,40.48]]}};
/* İl ve yer noktaları. */
const PL={istanbul:['İstanbul',29.0,41.0],ankara:['Ankara',32.85,39.93],izmir:['İzmir',27.14,38.42],rize:['Rize',40.52,41.02],konya:['Konya',32.48,37.87],adana:['Adana',35.32,37.0],cukurova:['Çukurova',35.3,36.9],erzurum:['Erzurum',41.27,39.9],sanliurfa:['Şanlıurfa',38.8,37.16],zonguldak:['Zonguldak',31.8,41.45],batman:['Batman',41.13,37.88],nevsehir:['Nevşehir',34.7,38.62],trabzon:['Trabzon',39.72,41.0],antalya:['Antalya',30.7,36.89],sinop:['Sinop',35.15,42.02],hatay:['Hatay',36.16,36.2],igdir:['Iğdır',44.04,39.92],canakkale:['Çanakkale',26.41,40.15],malatya:['Malatya',38.31,38.35],isparta:['Isparta',30.55,37.76],giresun:['Giresun',38.39,40.91],ordu:['Ordu',37.88,40.98],eskisehir:['Eskişehir',30.52,39.78],sivas:['Sivas',37.02,39.75],malazgirt:['Malazgirt',42.53,39.14],denizli:['Denizli',29.09,37.78],agri:['Ağrı Dağı',44.3,39.7],van:['Van Gölü',42.9,38.65],diyarbakir:['Diyarbakır',40.23,37.91],mardin:['Mardin',40.73,37.31],erzincan:['Erzincan',39.49,39.75],tokat:['Tokat',36.55,40.31],bursa:['Bursa',29.06,40.19],kocaeli:['Kocaeli',29.92,40.77],iznik:['İznik',29.72,40.43],kutahya:['Kütahya',29.98,39.42],adiyaman:['Adıyaman',38.28,37.76],elazig:['Elazığ',39.22,38.67],mersin:['Mersin',34.64,36.8],aydin:['Aydın',27.84,37.85],edirne:['Edirne',26.56,41.68],kars:['Kars',43.1,40.6],samsun:['Samsun',36.33,41.29],afsin:['Afşin-Elbistan',36.92,38.2],artvin:['Artvin',41.82,41.18],kastamonu:['Kastamonu',33.78,41.38]};
function trMap(o){
  o=o||{};let b='<rect width="'+TRW+'" height="'+TRH+'" rx="18" fill="'+C.sea+'"/>';
  if(o.grid){for(const lat of [36,42]){const y=P(0,lat)[1];b+='<line x1="0" x2="'+TRW+'" y1="'+y+'" y2="'+y+'" stroke="'+C.yellow+'" stroke-width="2" stroke-dasharray="6 5"/>'+t(6,y-10,lat+'° K',{a:'start',fs:13,c:C.yellow,stroke:C.sea});}
    for(const lon of [26,45]){const x=P(lon,0)[0];b+='<line y1="0" y2="'+TRH+'" x1="'+x+'" x2="'+x+'" stroke="'+C.blue+'" stroke-width="2" stroke-dasharray="6 5"/>'+t(x+(lon===26?18:-18),TRH-12,lon+'° D',{fs:13,c:C.blue,stroke:C.sea});}}
  b+='<defs><clipPath id="trc"><path d="'+TRPATH+'"/></clipPath></defs>';
  b+='<path d="'+TRPATH+'" fill="'+(o.zones?'#E7C27A':C.land)+'" stroke="#8C7A55" stroke-width="2" stroke-linejoin="round"'+(o.zones&&o.tap?' class="hit" data-z="karasal"':'')+'/>';
  if(o.zones){b+='<g clip-path="url(#trc)"><path d="'+poly(KARADENIZ)+'" fill="#6FCB8B" '+(o.tap?'class="hit" data-z="karadeniz"':'')+'/><path d="'+poly(AKDENIZ)+'" fill="#FF8C7A" '+(o.tap?'class="hit" data-z="akdeniz"':'')+'/></g>';
    if(!o.nolabel){b+=t(...P(36.2,40.95),'Karadeniz iklimi',{fs:14,c:C.ink});b+=t(...P(34.3,39.0),'Karasal iklim',{fs:15,c:C.ink});b+=t(...P(31.3,36.98),'Akdeniz iklimi',{fs:14,c:C.ink});}}
  if(o.seas){for(const k in SEAS){const s=SEAS[k];if(o.tap)b+='<path class="hit" data-z="'+k+'" d="'+poly(s.box)+'" fill="rgba(255,255,255,0.001)"/>';if(!o.nolabel){const q=P(s.x,s.y);b+=t(q[0],q[1],s.n,{fs:k==='marmara'?11:15,c:'#CFE6FF',stroke:C.sea});}}}
  if(o.mk){for(const m of o.mk){const pl=PL[m[0]]||[m[0],m[1],m[2]];const q=P(pl[1],pl[2]);const lab=m[1]===undefined||typeof m[1]==='number'?pl[0]:m[1];const em=m[2];
    if(o.tap){b+='<g class="hit" data-z="'+m[0]+'"><circle cx="'+q[0]+'" cy="'+q[1]+'" r="18" fill="rgba(0,0,0,0.001)"/><circle cx="'+q[0]+'" cy="'+q[1]+'" r="8" fill="'+C.red+'" stroke="#fff" stroke-width="3"/></g>';continue;}
    if(em){b+=e(q[0],q[1]-4,em,26);}else b+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="6" fill="'+C.red+'" stroke="#fff" stroke-width="2.5"/>';
    if(lab)b+=t(q[0],q[1]+(em?20:-15),lab,{fs:13,c:C.ink,stroke:'#fff'});}}
  if(o.arrows){for(const a of o.arrows){const p1=P(a[0],a[1]),p2=P(a[2],a[3]);b+='<line x1="'+p1[0]+'" y1="'+p1[1]+'" x2="'+p2[0]+'" y2="'+p2[1]+'" stroke="'+C.red+'" stroke-width="5" stroke-linecap="round" marker-end="url(#ah)"/>';}
    b='<defs><marker id="ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="'+C.red+'"/></marker></defs>'+b;}
  if(o.ext){const E=[['sinop','EN KUZEY',0,-20],['hatay','EN GÜNEY',0,22],['igdir','EN DOĞU',-20,26],['canakkale','EN BATI',22,26]];for(const x of E){const pl=PL[x[0]];const q=P(pl[1],pl[2]);b+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="7" fill="'+C.red+'" stroke="#fff" stroke-width="2.5"/>'+t(q[0]+x[2],q[1]+x[3],x[1]+': '+pl[0],{fs:13,c:C.ink,stroke:'#fff'});}}
  if(o.nb){const N=[['Yunanistan',25.4,41.75],['Bulgaristan',27.4,42.6],['Gürcistan',43.2,42.05],['Ermenistan',45.3,40.75],['Nahçıvan',45.5,39.2],['İran',45.8,38.2],['Irak',43.4,36.6],['Suriye',38.9,36.1]];for(const n of N){const q=P(n[1],n[2]);b+=t(q[0],q[1],n[0],{fs:13,c:C.yellow,stroke:C.sea});}}
  return svg(TRW,TRH,b,o.label||'Türkiye haritası');}

/* ---------- Avrasya (çok basitleştirilmiş) ---------- */
const EAB={x0:-12,x1:132,y0:4,y1:58,k:3.1};
function Q(lon,lat){return [(lon-EAB.x0)*EAB.k,(EAB.y1-lat)*EAB.k*1.15];}
const EAW=Math.round((EAB.x1-EAB.x0)*EAB.k),EAH=Math.round((EAB.y1-EAB.y0)*EAB.k*1.15);
function epoly(pts){return pts.map((p,i)=>{const q=Q(p[0],p[1]);return (i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1);}).join(' ')+' Z';}
const LAND=[[-12,58],[132,58],[132,45],[128,40],[122,40],[121,31],[118,24],[108,21],[106,10],[100,13],[98,8],[100,4],[92,4],[94,16],[92,22],[88,22],[80,15],[77,8],[73,17],[68,23],[62,25],[57,25],[56,27],[50,30],[48,29.5],[50,26],[56,24],[59,22],[52,16],[43,12.5],[51,11],[48,4],[-8,4],[-17,15],[-17,21],[-10,30],[-6,36],[-10,37],[-9,43],[-2,43.5],[-5,48],[2,51],[8,54],[10,57],[5,58]];
const WATER=[[[-5.5,36],[0,36],[10,37],[11,33],[20,31],[30,31],[36,36],[36,37],[30,36.5],[27,37],[26,40],[23,40],[22,37],[20,40],[16,41],[18,40],[12,44],[9,44],[3,43],[-1,38]],
  [[28,41.5],[28,44],[30,46],[33,44.5],[37,45],[40,44],[41.5,41.5],[36,41.5],[31,41]],
  [[47,44],[50,46.5],[53,46.5],[54,42],[53.5,37],[49,38],[49.5,40.5],[47.5,42]],
  [[32.5,29.8],[35,28],[39,21],[43.3,12.6],[42.5,13],[38,18],[34,26]]];
const EPL={mekke:['Mekke',39.8,21.4],medine:['Medine',39.6,24.5],bagdat:['Bağdat',44.4,33.3],sam:['Şam',36.3,33.5],kurtuba:['Kurtuba',-4.8,37.9],kahire:['Kahire',31.2,30.0],semerkant:['Semerkant',67,39.6],buhara:['Buhara',64.4,39.8],kasgar:['Kaşgar',76,39.5],otuken:['Ötüken',102,47.5],orhun:['Orhun',102.5,47],altay:['Altay Dağları',89,48],tanri:['Tanrı Dağları',80,42],xian:['Çin (Şian)',109,34.3],istanbul:['İstanbul',29,41],venedik:['Venedik',12.3,45.4],talas:['Talas',72.2,42.5],baku:['Bakü',49.9,40.4],astana:['Astana',71.4,51.2],biskek:['Bişkek',74.6,42.9],taskent:['Taşkent',69.2,41.3],askabat:['Aşkabat',58.4,38],ankara:['Ankara',32.85,39.9],lefkose:['Lefkoşa',33.4,35.2],turkistan:['Türkistan',68.3,43.3],gazne:['Gazne',68.4,33.5],hindistan:['Hindistan',78,22],kazan:['Kazan',49.1,55.8],tebriz:['Tebriz',46.3,38.1],merv:['Merv',61.8,37.6],delhi:['Delhi',77.2,28.6]};
function eurasia(o){
  o=o||{};let b='<rect width="'+EAW+'" height="'+EAH+'" rx="18" fill="'+C.sea+'"/><path d="'+epoly(LAND)+'" fill="'+C.land+'" stroke="#8C7A55" stroke-width="1.5"/>';
  for(const w of WATER)b+='<path d="'+epoly(w)+'" fill="'+C.sea+'" stroke="#8C7A55" stroke-width="1.2"/>';
  if(o.region){const r=o.region;b+='<ellipse cx="'+Q(r[0],r[1])[0]+'" cy="'+Q(r[0],r[1])[1]+'" rx="'+r[2]+'" ry="'+r[3]+'" fill="'+(r[4]||C.orange)+'" opacity=".45"/>';if(r[5])b+=t(Q(r[0],r[1])[0],Q(r[0],r[1])[1],r[5],{fs:15,c:C.ink});}
  if(o.route){const pts=o.route.map(k=>{const p=EPL[k];return Q(p[1],p[2]);});b+='<polyline points="'+pts.map(p=>p.join(',')).join(' ')+'" fill="none" stroke="'+(o.rc||C.red)+'" stroke-width="5" stroke-dasharray="10 7" stroke-linecap="round" stroke-linejoin="round"/>';}
  if(o.arrows){b='<defs><marker id="ah2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="'+C.red+'"/></marker></defs>'+b;for(const a of o.arrows){const p1=Q(a[0],a[1]),p2=Q(a[2],a[3]);b+='<path d="M'+p1+' Q'+((p1[0]+p2[0])/2)+','+(Math.min(p1[1],p2[1])-30)+' '+p2+'" fill="none" stroke="'+C.red+'" stroke-width="4" marker-end="url(#ah2)"/>';}}
  if(o.mk){for(const m of o.mk){const p=EPL[m[0]];const q=Q(p[1],p[2]);const em=m[1];if(em)b+=e(q[0],q[1]-2,em,22);else b+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="5.5" fill="'+C.red+'" stroke="#fff" stroke-width="2"/>';b+=t(q[0]+(m[2]||0),q[1]+(m[3]===undefined?(em?18:-13):m[3]),p[0],{fs:12,c:C.ink,stroke:'#fff'});}}
  return svg(EAW,EAH,b,o.label||'Harita');}

/* ---------- Dünya küresi ---------- */
function globe(o){
  o=o||{};const cx=150,cy=150,r=118;let b='<defs><clipPath id="gc"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"/></clipPath><radialGradient id="gg" cx=".35" cy=".3"><stop offset="0" stop-color="#3C82C4"/><stop offset="1" stop-color="#123C66"/></radialGradient></defs>';
  b+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="url(#gg)"/>';
  b+='<g clip-path="url(#gc)" fill="#7BC47F" opacity=".85"><path d="M95 70c20-14 52-12 66 4 10 12-4 26-18 30-16 5-12 22-28 26-18 5-40-6-42-22-2-14 8-28 22-38z"/><path d="M170 120c18-6 40 4 46 22 6 20-6 44-24 52-16 7-28-6-30-22-2-14-10-20-6-34 2-8 6-14 14-18z"/><path d="M80 170c14 0 26 12 24 30-2 16-14 30-26 26-12-4-16-22-14-36 2-12 6-20 16-20z"/></g>';
  const lat=o.lat!==false,lon=o.lon!==false;
  if(lat){for(const d of [-60,-30,30,60]){const y=cy-r*Math.sin(d*Math.PI/180),rx=r*Math.cos(d*Math.PI/180);b+='<ellipse cx="'+cx+'" cy="'+y+'" rx="'+rx+'" ry="'+(rx*.18)+'" fill="none" stroke="'+C.yellow+'" stroke-width="1.6" opacity=".75"/>';}}
  if(lon){for(const k of [.35,.7,1]){b+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(r*k)+'" ry="'+r+'" fill="none" stroke="'+C.blue+'" stroke-width="1.6" opacity=".75"/>';}b+='<line x1="'+cx+'" x2="'+cx+'" y1="'+(cy-r)+'" y2="'+(cy+r)+'" stroke="'+(o.pm?C.red:C.blue)+'" stroke-width="'+(o.pm?4:1.6)+'"/>';}
  b+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+r+'" ry="'+(r*.18)+'" fill="none" stroke="'+(o.eq!==false?C.red:C.yellow)+'" stroke-width="'+(o.eq!==false?4:1.6)+'"/>';
  b+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#9BD1FF" stroke-width="3"/>';
  b+='<circle cx="'+cx+'" cy="'+(cy-r)+'" r="5" fill="#fff"/>'+t(cx,cy-r-14,'Kuzey Kutbu',{fs:13,c:C.muted});
  b+='<circle cx="'+cx+'" cy="'+(cy+r)+'" r="5" fill="#fff"/>'+t(cx,cy+r+15,'Güney Kutbu',{fs:13,c:C.muted});
  if(o.eq!==false)b+=t(cx+r+6,cy,'Ekvator 0°',{a:'start',fs:14,c:C.red});
  if(o.pm)b+=t(cx-8,cy+r*.5,'Başlangıç',{a:'end',fs:13,c:C.red,stroke:'#123C66'})+t(cx-8,cy+r*.5+16,'meridyeni 0°',{a:'end',fs:13,c:C.red,stroke:'#123C66'});
  if(o.tr){b+='<circle cx="'+(cx+28)+'" cy="'+(cy-r*Math.sin(39*Math.PI/180)+6)+'" r="7" fill="'+C.orange+'" stroke="#fff" stroke-width="2.5"/>'+t(cx+40,cy-r*Math.sin(39*Math.PI/180)+6,'Türkiye',{a:'start',fs:13,stroke:'#123C66'});}
  if(lat&&o.latlab)b+=t(14,cy-r*Math.sin(30*Math.PI/180),'30° K',{a:'start',fs:13,c:C.yellow})+t(14,cy+r*Math.sin(30*Math.PI/180),'30° G',{a:'start',fs:13,c:C.yellow});
  return svg(400,300,b,o.label||'Dünya küresi: paraleller ve meridyenler');}

/* ---------- Koordinat ızgarası (soru için de) ---------- */
const GLAT=[60,30,0,-30,-60],GLON=[-60,-30,0,30,60];
function gname(v,ax){if(v===0)return '0°';return Math.abs(v)+'° '+(ax==='lat'?(v>0?'K':'G'):(v>0?'D':'B'));}
function grid(o){
  o=o||{};const x0=66,y0=34,s=60;let b='<rect width="400" height="330" rx="18" fill="#123C66"/>';
  GLAT.forEach((v,i)=>{const y=y0+i*s;b+='<line x1="'+x0+'" x2="'+(x0+4*s)+'" y1="'+y+'" y2="'+y+'" stroke="'+(v===0?C.red:C.yellow)+'" stroke-width="'+(v===0?3.5:2)+'"/>'+t(x0-12,y,gname(v,'lat'),{a:'end',fs:14,c:v===0?C.red:C.yellow});});
  GLON.forEach((v,i)=>{const x=x0+i*s;b+='<line y1="'+y0+'" y2="'+(y0+4*s)+'" x1="'+x+'" x2="'+x+'" stroke="'+(v===0?C.red:C.blue)+'" stroke-width="'+(v===0?3.5:2)+'"/>'+t(x,y0+4*s+22,gname(v,'lon'),{fs:14,c:v===0?C.red:C.blue});});
  b+=t(x0+4*s+8,y0+2*s-12,'Ekvator',{a:'start',fs:12,c:C.red});
  b+=t(x0+2*s,y0-14,'Başlangıç meridyeni',{fs:13,c:C.red});
  GLAT.forEach((la,i)=>GLON.forEach((lo,j)=>{const x=x0+j*s,y=y0+i*s;const id=la+','+lo;
    if(o.tap)b+='<g class="hit" data-z="'+id+'"><circle cx="'+x+'" cy="'+y+'" r="20" fill="rgba(0,0,0,0.001)"/><circle cx="'+x+'" cy="'+y+'" r="7" fill="#fff" opacity=".85"/></g>';
    else if(o.pt&&o.pt[0]===la&&o.pt[1]===lo)b+='<circle cx="'+x+'" cy="'+y+'" r="11" fill="'+C.green+'" stroke="#fff" stroke-width="3"/>'+t(x+16,y-16,o.ptLabel||'A',{a:'start',fs:16,c:C.green,stroke:'#123C66'});}));
  return svg(400,330,b,'Paralel ve meridyen ızgarası');}

/* ---------- Genel şemalar ---------- */
function icons(o){
  const it=o.items,n=it.length,cols=o.cols||Math.min(n,n===4?2:3),rows=Math.ceil(n/cols),cw=380/cols,ch=o.h||118;let b='';
  it.forEach((x,i)=>{const c=i%cols,r=Math.floor(i/cols);const cx=10+cw*c+cw/2,cy=10+ch*r+ch/2;const col=x[2]||PAL[i%PAL.length];
    b+='<rect x="'+(10+cw*c+5)+'" y="'+(10+ch*r+5)+'" width="'+(cw-10)+'" height="'+(ch-10)+'" rx="18" fill="'+C.panel2+'" stroke="'+col+'" stroke-width="2.5"/>';
    b+=e(cx,cy-16,x[0],38)+tl(cx,cy+30,x[1],Math.floor(cw/9.2),{fs:14,c:col});});
  return svg(400,20+ch*rows,b,o.label||it.map(x=>x[1]).join(', '));}
function timeline(o){
  const ev=o.ev,n=ev.length,w=400,h=o.h||220,y=h/2;let b='<line x1="20" x2="380" y1="'+y+'" y2="'+y+'" stroke="'+C.line+'" stroke-width="6" stroke-linecap="round"/>';
  ev.forEach((x,i)=>{const cx=52+i*(296/(n-1||1)),col=x[3]||PAL[i%PAL.length],up=i%2===0;
    b+='<circle cx="'+cx+'" cy="'+y+'" r="10" fill="'+col+'" stroke="'+C.bg+'" stroke-width="3"/>';
    b+=t(cx,up?y-24:y+26,x[0],{fs:16,c:col});
    if(x[2])b+=e(cx,up?y-58:y+60,x[2],28);
    b+=tl(cx,up?y-(x[2]?92:52):y+(x[2]?94:54),x[1],n>4?10:13,{fs:13});});
  return svg(w,h,b,o.label||ev.map(x=>x[0]+' '+x[1]).join(', '));}
function web(o){
  const it=o.items,n=it.length,cx=200,cy=150,R=112;let b='';
  it.forEach((x,i)=>{const a=-Math.PI/2+i*2*Math.PI/n,px=cx+R*Math.cos(a)*1.25,py=cy+R*Math.sin(a);b+='<line x1="'+cx+'" y1="'+cy+'" x2="'+px+'" y2="'+py+'" stroke="'+C.line+'" stroke-width="4"/>';});
  b+='<circle cx="'+cx+'" cy="'+cy+'" r="46" fill="'+(o.cc||C.orange)+'"/>'+tl(cx,cy,o.center,10,{fs:15,c:C.ink});
  it.forEach((x,i)=>{const a=-Math.PI/2+i*2*Math.PI/n,px=cx+R*Math.cos(a)*1.25,py=cy+R*Math.sin(a),col=PAL[(i+1)%PAL.length];
    b+='<rect x="'+(px-58)+'" y="'+(py-30)+'" width="116" height="60" rx="16" fill="'+C.panel2+'" stroke="'+col+'" stroke-width="2.5"/>'+e(px-36,py,x[0],24)+tl(px+14,py,x[1],9,{fs:12,c:col});});
  return svg(400,300,b,o.label||o.center+': '+it.map(x=>x[1]).join(', '));}
function cycle(o){
  const it=o.items,n=it.length,cx=200,cy=135,R=92;let b='<defs><marker id="ca" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="'+C.muted+'"/></marker></defs>';
  for(let i=0;i<n;i++){const a1=-Math.PI/2+i*2*Math.PI/n+.42,a2=-Math.PI/2+(i+1)*2*Math.PI/n-.42;b+='<path d="M'+(cx+R*Math.cos(a1))+' '+(cy+R*Math.sin(a1))+' A'+R+' '+R+' 0 0 1 '+(cx+R*Math.cos(a2))+' '+(cy+R*Math.sin(a2))+'" fill="none" stroke="'+C.muted+'" stroke-width="4" marker-end="url(#ca)"/>';}
  it.forEach((x,i)=>{const a=-Math.PI/2+i*2*Math.PI/n,px=cx+R*Math.cos(a),py=cy+R*Math.sin(a),col=PAL[i%PAL.length];b+='<circle cx="'+px+'" cy="'+py+'" r="40" fill="'+C.panel2+'" stroke="'+col+'" stroke-width="3"/>'+e(px,py-8,x[0],28)+t(px,py+20,x[1],{fs:12,c:col});});
  if(o.center)b+=tl(cx,cy,o.center,12,{fs:14,c:C.muted});
  return svg(400,270,b,o.label||it.map(x=>x[1]).join(' → '));}
function steps(o){
  const it=o.items,n=it.length,h=24+n*62;let b='';
  it.forEach((x,i)=>{const y=12+i*62,col=PAL[i%PAL.length];b+='<rect x="'+(20+i*14)+'" y="'+y+'" width="'+(360-i*28)+'" height="52" rx="16" fill="'+C.panel2+'" stroke="'+col+'" stroke-width="2.5"/>'+'<circle cx="'+(46+i*14)+'" cy="'+(y+26)+'" r="16" fill="'+col+'"/>'+t(46+i*14,y+27,String(i+1),{fs:16,c:C.ink})+e(86+i*14,y+26,x[0],24)+t(108+i*14,y+27,x[1],{a:'start',fs:15});});
  return svg(400,h,b,o.label||it.map(x=>x[1]).join(', '));}
function versus(o){
  let b='';[o.l,o.r].forEach((s,k)=>{const x=10+k*195,col=s[3]||(k?C.blue:C.orange);b+='<rect x="'+x+'" y="10" width="185" height="'+(o.h||260)+'" rx="20" fill="'+C.panel2+'" stroke="'+col+'" stroke-width="3"/>'+e(x+92,58,s[0],46)+tl(x+92,104,s[1],14,{fs:17,c:col});
    s[2].forEach((l,i)=>{b+=tl(x+92,142+i*30,l,20,{fs:13.5});});});
  if(!o.novs)b+='<circle cx="200" cy="58" r="20" fill="'+C.bg+'" stroke="'+C.line+'" stroke-width="3"/>'+t(200,59,o.mid||'ve',{fs:13,c:C.muted});
  return svg(400,(o.h||260)+20,b,o.label||o.l[1]+' ve '+o.r[1]);}
function pyramid(o){
  const it=o.items,n=it.length,h=20+n*58;let b='';
  it.forEach((x,i)=>{const y=10+i*58,w1=90+i*(260/n),w2=90+(i+1)*(260/n),col=PAL[i%PAL.length];b+='<path d="M'+(200-w1/2)+' '+y+' L'+(200+w1/2)+' '+y+' L'+(200+w2/2)+' '+(y+52)+' L'+(200-w2/2)+' '+(y+52)+' Z" fill="'+col+'"/>'+t(200,y+27,x,{fs:16,c:C.ink});});
  return svg(400,h,b,o.label||it.join(' > '));}
function circles(o){
  const it=o.items,n=it.length,R=118,r0=34,bot=248,rr=i=>r0+i*(R-r0)/(n-1||1);let b='';
  for(let i=n-1;i>=0;i--)b+='<circle cx="200" cy="'+(bot-rr(i))+'" r="'+rr(i)+'" fill="'+PAL[i%PAL.length]+'" stroke="'+C.bg+'" stroke-width="3"/>';
  b+=e(200,bot-r0-6,it[0][0],30)+t(200,bot-12,it[0][1],{fs:12,c:C.ink});
  for(let i=1;i<n;i++)b+=t(200,bot-rr(i)-rr(i-1),it[i][0]+' '+it[i][1],{fs:13,c:C.ink});
  return svg(400,256,b,o.label||it.map(x=>x[1]).join(' içinde '));}
function balance(o){
  let b='<line x1="200" y1="40" x2="200" y2="230" stroke="'+C.muted+'" stroke-width="8" stroke-linecap="round"/><path d="M150 240h100" stroke="'+C.muted+'" stroke-width="10" stroke-linecap="round"/><line x1="60" y1="70" x2="340" y2="70" stroke="'+C.muted+'" stroke-width="7" stroke-linecap="round"/><circle cx="200" cy="40" r="12" fill="'+C.yellow+'"/>';
  [[o.l,60,C.orange],[o.r,340,C.blue]].forEach(([s,x,col])=>{b+='<line x1="'+x+'" y1="70" x2="'+(x-38)+'" y2="140" stroke="'+C.muted+'" stroke-width="2"/><line x1="'+x+'" y1="70" x2="'+(x+38)+'" y2="140" stroke="'+C.muted+'" stroke-width="2"/><path d="M'+(x-52)+' 140 Q'+x+' 185 '+(x+52)+' 140 Z" fill="'+col+'"/>'+e(x,118,s[0],30)+tl(x,206,s[1],14,{fs:15,c:col});});
  return svg(400,260,b,o.label||o.l[1]+' ile '+o.r[1]+' dengesi');}
function flag(){
  /* Türk Bayrağı Kanunu oranları: G=1,5 en; hilal ve yıldız ölçüleri. */
  const G=200,L=G*1.5;const A=0.5*G,B=0.5*G,Cc=0.0625*G,D=0.4*G,E=1/3*G,F=0.25*G;
  const cx1=B,cx2=B+Cc,cy=A;
  const sx=B+E-D/2+0.0+F/2,sr=F/2;let star='';for(let i=0;i<10;i++){const r=i%2?sr*0.382:sr,a=Math.PI+i*Math.PI/5;star+=(i?'L':'M')+(sx+r*Math.cos(a)).toFixed(2)+' '+(cy+r*Math.sin(a)).toFixed(2);}
  const b='<rect width="'+L+'" height="'+G+'" rx="10" fill="#E30A17"/><circle cx="'+cx1+'" cy="'+cy+'" r="'+(B/2)+'" fill="#fff"/><circle cx="'+cx2+'" cy="'+cy+'" r="'+(D/2)+'" fill="#E30A17"/><path d="'+star+'Z" fill="#fff"/>';
  return '<svg class="art flag" viewBox="0 0 '+L+' '+G+'" role="img" aria-label="Türk Bayrağı" xmlns="http://www.w3.org/2000/svg">'+b+'</svg>';}
function branches(o){
  const it=o.items||[['🏛️','YASAMA','TBMM','Kanun yapar',C.orange],['🧑‍💼','YÜRÜTME','Cumhurbaşkanı','Kanunları uygular',C.blue],['⚖️','YARGI','Bağımsız mahkemeler','Adaleti sağlar',C.purple]];
  let b='<rect x="20" y="10" width="360" height="44" rx="14" fill="'+C.yellow+'"/>'+t(200,33,o.top||'TÜRKİYE CUMHURİYETİ ANAYASASI',{fs:15,c:C.ink});
  it.forEach((x,i)=>{const cx=72+i*128;b+='<line x1="'+cx+'" y1="54" x2="'+cx+'" y2="80" stroke="'+C.yellow+'" stroke-width="4"/><rect x="'+(cx-58)+'" y="80" width="116" height="190" rx="18" fill="'+C.panel2+'" stroke="'+x[4]+'" stroke-width="3"/>'+e(cx,120,x[0],38)+t(cx,164,x[1],{fs:15,c:x[4]})+tl(cx,200,x[2],12,{fs:13})+tl(cx,244,x[3],12,{fs:12,c:C.muted});});
  return svg(400,282,b,'Yasama, yürütme ve yargı');}
function scene(o){
  /* Doğal ve beşerî çevre sahnesi. */
  let b='<rect width="400" height="240" rx="18" fill="#8FD3FF"/><circle cx="340" cy="50" r="26" fill="#FFD84D"/><path d="M0 150 L70 70 L130 140 L190 60 L260 150 Z" fill="#6E8BA8"/><path d="M160 92 L190 60 L218 96 Z" fill="#fff"/><rect y="150" width="400" height="90" fill="#7BC47F"/><path d="M0 200 C80 180 140 225 220 205 S330 185 400 200 L400 240 L0 240Z" fill="#3C82C4"/>';
  b+=e(40,170,'🌲',30)+e(80,178,'🌳',28)+e(120,168,'🌲',26);
  b+='<rect x="250" y="120" width="140" height="10" fill="#555"/>'+e(270,148,'🏠',30)+e(310,146,'🏭',30)+e(355,150,'🏘️',30)+'<rect x="196" y="196" width="60" height="10" fill="#8A6D46"/>'+e(330,212,'🌾',24);
  b+='<rect x="8" y="8" width="150" height="30" rx="10" fill="'+C.green+'"/>'+t(83,24,'Doğal: dağ, orman, göl',{fs:12,c:C.ink});
  b+='<rect x="242" y="78" width="150" height="30" rx="10" fill="'+C.orange+'"/>'+t(317,94,'Beşerî: ev, yol, fabrika',{fs:12,c:C.ink});
  return svg(400,240,b,'Doğal çevre ve beşerî çevre');}
function profile(){
  let b='<rect width="400" height="220" rx="18" fill="#8FD3FF"/><path d="M0 200 L40 185 L90 170 L130 150 L170 140 L210 120 L250 115 L290 90 L320 60 L350 70 L380 45 L400 50 L400 220 L0 220Z" fill="#B58B5A"/><path d="M0 200 L400 200 L400 220 L0 220Z" fill="#3C82C4"/>';
  b+=t(40,212,'Batı (Ege)',{fs:13,c:'#fff'})+t(350,212,'Doğu',{fs:13,c:'#fff'})+t(330,22,'Ağrı Dağı 5137 m',{fs:12,c:C.ink});
  b+='<path d="M60 120 L330 40" stroke="'+C.red+'" stroke-width="4" marker-end="url(#pa)" stroke-dasharray="8 6"/><defs><marker id="pa" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="'+C.red+'"/></marker></defs>'+t(150,72,'Yükselti artar',{fs:15,c:C.red,stroke:'#8FD3FF'});
  return svg(400,220,b,'Batıdan doğuya yükselti artar');}
function seasons(){
  let b='<rect width="400" height="220" rx="18" fill="#123C66"/><circle cx="70" cy="110" r="40" fill="#FFD84D"/>';
  for(let i=0;i<5;i++)b+='<line x1="115" y1="'+(70+i*20)+'" x2="250" y2="'+(70+i*20)+'" stroke="#FFD84D" stroke-width="3" stroke-dasharray="8 6"/>';
  b+='<circle cx="300" cy="110" r="72" fill="#3C82C4"/><ellipse cx="300" cy="110" rx="72" ry="13" fill="none" stroke="'+C.red+'" stroke-width="3"/><circle cx="318" cy="64" r="8" fill="'+C.orange+'" stroke="#fff" stroke-width="2"/>'+t(318,40,'Türkiye',{fs:13});
  b+=t(300,196,'Ilıman kuşak: 4 mevsim',{fs:14,c:C.yellow})+t(70,170,'Güneş',{fs:13,c:C.yellow});
  return svg(400,220,b,'Güneş ışınları ve Türkiye: dört mevsim');}
function clock(o){
  o=o||{};const L=o.l||['Edirne','08:00',26],R=o.r||['Iğdır','09:16',45];let b='';
  [[L,100,C.blue],[R,300,C.orange]].forEach(([s,x,col])=>{b+='<circle cx="'+x+'" cy="100" r="64" fill="'+C.panel2+'" stroke="'+col+'" stroke-width="5"/>';for(let i=0;i<12;i++){const a=i*Math.PI/6;b+='<line x1="'+(x+52*Math.sin(a))+'" y1="'+(100-52*Math.cos(a))+'" x2="'+(x+58*Math.sin(a))+'" y2="'+(100-58*Math.cos(a))+'" stroke="'+C.muted+'" stroke-width="3"/>';}
    const [hh,mm]=s[1].split(':').map(Number);const ha=((hh%12)+mm/60)*Math.PI/6,ma=mm*Math.PI/30;b+='<line x1="'+x+'" y1="100" x2="'+(x+30*Math.sin(ha))+'" y2="'+(100-30*Math.cos(ha))+'" stroke="'+C.fg+'" stroke-width="6" stroke-linecap="round"/><line x1="'+x+'" y1="100" x2="'+(x+46*Math.sin(ma))+'" y2="'+(100-46*Math.cos(ma))+'" stroke="'+col+'" stroke-width="4" stroke-linecap="round"/>';
    b+=t(x,186,s[0]+' ('+s[2]+'° D)',{fs:15,c:col})+t(x,210,'Yerel saat '+s[1],{fs:14});});
  b+=t(200,100,o.mid||'+76 dk',{fs:16,c:C.yellow});
  return svg(400,226,b,o.label||'Yerel saat farkı');}
function orhun(){
  let b='<rect width="400" height="250" rx="18" fill="#B9D7A8"/><path d="M0 200 Q200 170 400 205 L400 250 L0 250Z" fill="#8FB57A"/><path d="M150 210 L150 50 Q200 18 250 50 L250 210 Z" fill="#9A9488" stroke="#6E6A60" stroke-width="3"/>';
  const letters=['⊢','⋎','ᛉ','Ϡ','ᚱ','ϒ','⌒','ᛦ','ꓘ','ᚴ','ᛏ','ᛋ','⊃','ᚼ','ᚢ','ᛒ'];let k=0;
  for(let c=0;c<4;c++)for(let r=0;r<7;r++){b+='<text x="'+(170+c*20)+'" y="'+(70+r*19)+'" font-size="16" fill="#3E3A33" text-anchor="middle" font-family="serif" font-weight="700">'+letters[(k++)*7%letters.length]+'</text>';}
  b+='<rect x="130" y="206" width="140" height="18" rx="4" fill="#6E6A60"/>'+t(80,40,'Orhun Yazıtları',{fs:16,c:'#2B3A22'})+t(80,62,'8. yüzyıl',{fs:13,c:'#2B3A22'})+t(330,120,'Göktürk',{fs:14,c:'#2B3A22'})+t(330,140,'alfabesi',{fs:14,c:'#2B3A22'});
  return svg(400,250,b,'Orhun Yazıtları: Göktürk alfabesiyle yazılmış taş anıt');}
function decimal(){
  const it=[['10','Onbaşı'],['100','Yüzbaşı'],['1.000','Binbaşı'],['10.000','Tümen']];let b='';
  it.forEach((x,i)=>{const y=14+i*56,w=230+i*40;b+='<rect x="'+(200-w/2)+'" y="'+y+'" width="'+w+'" height="46" rx="14" fill="'+PAL[i]+'"/>'+t(200,y+24,x[0]+' asker → '+x[1],{fs:16,c:C.ink});});
  return svg(400,240,b,'Mete Han onlu sistem: 10, 100, 1000, 10000');}
function money(o){
  const items=o.items;let b='';const max=Math.max(...items.map(x=>x[1]));
  items.forEach((x,i)=>{const y=16+i*52,w=280*x[1]/max;b+=t(10,y+20,x[0],{a:'start',fs:14})+'<rect x="110" y="'+(y+4)+'" width="'+w+'" height="34" rx="10" fill="'+(x[2]||PAL[i%PAL.length])+'"/>'+t(118+w,y+21,x[3]||String(x[1]),{a:'start',fs:14,c:C.fg});});
  return svg(400,24+items.length*52,b,o.label||'Grafik');}
function label(){
  let b='<rect x="40" y="16" width="320" height="226" rx="18" fill="#fff"/><rect x="40" y="16" width="320" height="46" rx="18" fill="'+C.green+'"/><rect x="40" y="44" width="320" height="18" fill="'+C.green+'"/>'+t(200,40,'ÜRÜN ETİKETİ',{fs:17,c:C.ink});
  const rows=[['📅','Son kullanma: 12.05.2027'],['🏷️','Fiyat: 45 TL'],['🧪','İçindekiler: süt, kakao…'],['✅','TSE belgeli'],['🏭','Üretici ve adres bilgisi']];
  rows.forEach((r,i)=>{b+=e(74,88+i*31,r[0],20)+t(96,89+i*31,r[1],{a:'start',fs:15,c:C.ink});});
  return svg(400,258,b,'Ürün etiketinde bakılacaklar');}
function silk(){return eurasia({route:['xian','kasgar','semerkant','buhara','merv','tebriz','istanbul','venedik'],mk:[['xian','🧵'],['semerkant','📜'],['istanbul','🕌',0,20],['venedik',null]],label:'İpek Yolu: Çin’den Avrupa’ya'});}
function phone(){
  let b='<rect x="140" y="10" width="120" height="230" rx="22" fill="'+C.panel2+'" stroke="'+C.blue+'" stroke-width="4"/><rect x="152" y="34" width="96" height="176" rx="8" fill="#0A1426"/>';
  const ic=['📰','🎵','🍲','🎬','🌍','💬'];ic.forEach((x,i)=>{b+=e(176+(i%2)*48,64+Math.floor(i/2)*52,x,30);});
  b+=t(70,60,'Haber',{fs:14,c:C.orange})+t(70,120,'Müzik',{fs:14,c:C.red})+t(70,180,'Yemek',{fs:14,c:C.green})+t(330,60,'Film',{fs:14,c:C.purple})+t(330,120,'Gezi',{fs:14,c:C.blue})+t(330,180,'Sohbet',{fs:14,c:C.yellow});
  return svg(400,250,b,'İletişim teknolojileri ile kültürler buluşur');}
function lock(){
  let b='<rect x="120" y="100" width="160" height="130" rx="22" fill="'+C.yellow+'"/><path d="M150 100 V70 a50 50 0 0 1 100 0 V100" fill="none" stroke="'+C.muted+'" stroke-width="16"/><circle cx="200" cy="155" r="16" fill="'+C.ink+'"/><rect x="194" y="160" width="12" height="36" rx="5" fill="'+C.ink+'"/>';
  b+=t(60,140,'Güçlü',{fs:14,c:C.green})+t(60,160,'şifre',{fs:14,c:C.green})+t(340,140,'Bilgini',{fs:14,c:C.orange})+t(340,160,'paylaşma',{fs:14,c:C.orange});
  return svg(400,240,b,'Dijital güvenlik: güçlü şifre ve kişisel bilgilerin korunması');}
function bigtext(o){
  let b='<rect x="10" y="10" width="380" height="'+(o.h||150)+'" rx="22" fill="'+(o.bg||C.panel2)+'" stroke="'+(o.c||C.orange)+'" stroke-width="3"/>'+(o.e?e(200,58,o.e,48):'')+tl(200,o.e?(o.h||150)-24:(o.h||150)/2+10,o.t,26,{fs:o.fs||22,c:o.c||C.orange});
  return svg(400,(o.h||150)+20,b,o.t);}

const KINDS={tr:trMap,ea:eurasia,globe,grid,icons,timeline,web,cycle,steps,versus,pyramid,circles,balance,flag,branches,scene,profile,seasons,clock,orhun,decimal,money,label,silk,phone,lock,big:bigtext};
window.ART={draw(spec){if(!spec)return '';if(typeof spec==='string')spec=[spec,{}];const f=KINDS[spec[0]];return f?f(spec[1]||{}):'';},C,PL,SEAS,GLAT,GLON,gname};
})();
