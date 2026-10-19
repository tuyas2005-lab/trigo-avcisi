/* Rehber Takip: sunucu bağlantısı ve oturum. Site, uygulama ve yönetim sayfası bunu kullanır.
   Sunucu yalnızca öğretmen hesabını ve üyeliği bilir; öğrenci kayıtları cihazdan hiç çıkmaz (KVKK). */
(function(){
  const CFG=window.RG_CONFIG||{},KEY='rg-oturum';
  const ERR={bad_email:'Geçerli bir e-posta adresi yazın.',bad_password:'Şifre en az 8 karakter olmalı.',bad_name:'Ad soyad 2-60 karakter olmalı.',bad_school:'Okul adı çok uzun.',email_taken:'Bu e-posta ile zaten bir hesap var. Giriş yapın.',wrong_login:'E-posta ya da şifre yanlış.',too_many_attempts:'Çok fazla hatalı deneme. 15 dakika sonra tekrar deneyin.',bad_token:'Oturumunuz kapanmış, yeniden giriş yapın.',request_pending:'Bekleyen bir üyelik başvurunuz zaten var.',bad_plan:'Bir üyelik seçin.',wrong_pin:'Yönetici PIN\'i yanlış.',admin_not_set:'Yönetici PIN\'i henüz belirlenmemiş (KURULUM.md).',offline:'İnternet bağlantısı yok.',not_configured:'Sunucu bağlantısı henüz kurulmadı.'};
  const ONLINE=!!(CFG.url&&CFG.key);
  async function rpc(fn,args){
    if(!ONLINE)throw new Error('not_configured');
    const h={'Content-Type':'application/json',apikey:CFG.key};if(!/^sb_/.test(CFG.key))h.Authorization='Bearer '+CFG.key;
    let r;try{r=await fetch(CFG.url.replace(/\/$/,'')+'/rest/v1/rpc/'+fn,{method:'POST',headers:h,body:JSON.stringify(args||{})});}catch(e){throw new Error('offline');}
    const txt=await r.text();let j=null;try{j=txt?JSON.parse(txt):null;}catch(e){}
    if(!r.ok){const m=(j&&j.message)||('http_'+r.status);if(m==='bad_token')setSession(null);throw new Error(m);}
    return j;}
  function getSession(){try{return JSON.parse(localStorage.getItem(KEY))||null;}catch(e){return null;}}
  function setSession(s){try{s?localStorage.setItem(KEY,JSON.stringify(s)):localStorage.removeItem(KEY);}catch(e){}}
  function need(){const s=getSession();if(!s)throw new Error('bad_token');return {p_teacher:s.id,p_token:s.token};}
  window.RG={
    cfg:CFG,online:ONLINE,
    errText(e){return ERR[e.message]||('Bir sorun oluştu ('+e.message+').');},
    session:getSession,
    async register(email,password,name,school){const r=await rpc('rg_register',{p_email:email,p_password:password,p_name:name,p_school:school});setSession({id:r[0].teacher_id,token:r[0].token});},
    async login(email,password){const r=(await rpc('rg_login',{p_email:email,p_password:password}))[0];if(r.error)throw new Error(r.error);setSession({id:r.teacher_id,token:r.token});},
    logout(){setSession(null);},
    async logoutAll(){await rpc('rg_logout_all',need());setSession(null);},
    info(){return rpc('rg_public_info');},
    me(){return rpc('rg_me',need());},
    requestMembership(plan,note){return rpc('rg_request_membership',Object.assign(need(),{p_plan:plan,p_note:note||''}));},
    admin(pin){return rpc('rg_admin',{p_pin:pin});},
    adminSetMember(pin,teacher,until){return rpc('rg_admin_set_member',{p_pin:pin,p_teacher:teacher,p_until:until});},
    adminReject(pin,req){return rpc('rg_admin_reject',{p_pin:pin,p_request:req});},
    /* Uygulamayı indir: Android/bilgisayarda kurulum penceresini açar; açamazsa false döner (iPhone'da elle "Ana Ekrana Ekle"). */
    canInstall(){return !!installEvt;},
    installed(){return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;},
    isIOS(){return /iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);},
    async install(){if(!installEvt)return false;installEvt.prompt();const r=await installEvt.userChoice;installEvt=null;return r.outcome==='accepted';}
  };
  let installEvt=null;
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e;});
  if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('/rehber/sw.js',{scope:'/rehber/'}).catch(()=>{}));
})();
