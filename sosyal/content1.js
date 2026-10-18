/* Sosyal Avcısı müfredatı, 1-3. öğrenme alanları (Türkiye Yüzyılı Maarif Modeli, 6. sınıf Sosyal Bilgiler).
   Kart: {t: başlık, h: metin (HTML), v: görsel, tip: kısa not}
   Soru tipleri: mc (çoktan seçmeli), tf (doğru/yanlış), match (eşleştir), order (sırala), fill (boşluk doldur), map (haritada dokun), grid (koordinat bul). */
window.SA_UNITS=window.SA_UNITS||[];
SA_UNITS.push({id:1,name:'Birlikte Yaşamak',emoji:'🤝',color:'#FFA53D',lessons:[
{id:'u1l1',name:'Gruplar ve Rollerimiz',sub:'Aile, okul, takım… Hepimiz bir yerlere aitiz',outcome:'SB.6.1.1',
cards:[
{t:'Hepimiz gruplara aitiz',h:'Doğduğumuz andan itibaren <b>aile</b>, <b>sınıf</b>, <b>okul</b>, <b>mahalle</b> ve <b>ülke</b> gibi gruplar içinde yaşarız. Bazı gruplara doğuştan (aile), bazılarına isteyerek (spor kulübü, izci grubu) katılırız.',v:['circles',{items:[['🧒','Ben'],['👨‍👩‍👧','Aile'],['🏫','Okul'],['🏘️','Mahalle'],['🗺️','Ülke']]}]},
{t:'Rol nedir?',h:'Bir grupta üstlendiğimiz <b>görev ve davranışlara</b> <b>rol</b> denir. Aynı kişi evde <b>kardeş</b>, okulda <b>öğrenci</b>, takımda <b>kaptan</b>, mahallede <b>komşu</b> olabilir.',v:['icons',{items:[['👨‍👩‍👧','Evde: kardeş'],['🏫','Okulda: öğrenci'],['⚽','Takımda: kaptan'],['🏘️','Mahallede: komşu']]}]},
{t:'Her rolün hakları ve sorumlulukları var',h:'Sınıf başkanı sınıfı <b>temsil etme hakkına</b> sahiptir; sınıfın düzenine yardım etmek ve sorunları öğretmene iletmek de <b>sorumluluğudur</b>. Hak ve sorumluluk bir terazinin iki kefesi gibidir.',v:['balance',{l:['🎖️','Haklar'],r:['📋','Sorumluluklar']}]},
{t:'Roller zamanla değişir',h:'Bugün öğrenci olan biri yarın üniversite öğrencisi, sonra öğretmen, ileride dede ya da nine olur. Bir kardeşin doğunca <b>abla/ağabey</b> rolünü kazanırsın. Yani roller <b>zaman içinde değişebilir</b>.',v:['timeline',{ev:[['Çocuk','Öğrenci','🎒'],['Genç','Üniversiteli','🎓'],['Yetişkin','Öğretmen','🧑‍🏫'],['Yaşlı','Dede / nine','👵']]}]},
{t:'Rol çatışması',h:'Efe’nin futbol maçı ile babaannesinin doğum günü aynı saatte. İki rolün beklentisi çakışınca <b>rol çatışması</b> yaşanır. Çözüm: öncelikleri belirlemek ve konuşarak karar vermek.',v:['versus',{l:['⚽','Takım oyuncusu',['Maça gitmeli']],r:['🎂','Torun',['Doğum gününde olmalı']],mid:'⚡',h:200}],tip:'Biliyor muydun? Bir kişinin aynı anda pek çok rolü olabilir.'}
],
qs:[
{t:'mc',q:'Bir grupta üstlendiğimiz görev ve davranışlara ne denir?',a:'Rol',o:['Kural','Gelenek','Değer'],e:'Grupta üstlendiğimiz görev ve davranışlar <b>rol</b>dür. Örneğin takımda kaptanlık bir roldür.'},
{t:'tf',q:'Bir kişi aynı anda birden fazla grubun üyesi olabilir.',a:true,e:'Doğru! Aynı anda hem aile hem sınıf hem de spor takımı üyesi olabiliriz.'},
{t:'tf',q:'Bir kişinin gruplardaki rolleri hayatı boyunca hiç değişmez.',a:false,e:'Yanlış. Roller zamanla değişir: öğrenci büyüyünce öğretmen, anne ya da baba olabilir.'},
{t:'mc',q:'Zeynep’in kardeşi doğunca Zeynep ailesinde hangi yeni rolü kazanır?',a:'Abla',o:['Öğrenci','Sınıf başkanı','Kaptan'],e:'Kardeşi doğan Zeynep artık <b>abla</b> rolünü de üstlenir.'},
{t:'match',q:'Grubu, o gruptaki rolle eşleştir.',p:[['Aile','Kardeş'],['Okul','Öğrenci'],['Spor takımı','Kaptan'],['Mahalle','Komşu']],e:'Her grupta farklı bir rolümüz olabilir.'},
{t:'mc',q:'Sınıf başkanı Ali’nin sorumluluklarından biri hangisidir?',a:'Sınıfın sorunlarını öğretmene iletmek',o:['Ödevleri arkadaşları yerine yapmak','Sınıfa istediği kuralı koymak','Teneffüse herkesten önce çıkmak'],long:true,e:'Sınıf başkanı sınıfı temsil eder ve sorunları öğretmene iletir.'},
{t:'order',q:'Bir kişinin hayatında rollerin genellikle izlediği sırayı oluştur.',i:['İlkokul öğrencisi','Üniversite öğrencisi','Öğretmen','Emekli'],e:'Roller yaşla birlikte değişir.'},
{t:'fill',q:'Gruplarda üstlendiğimiz roller ___ içinde değişebilir.',a:'zaman',o:['bir an','hiçbir koşul','sadece okul'],e:'Roller <b>zaman</b> içinde değişebilir.'},
{t:'mc',q:'Hangisi isteyerek (gönüllü olarak) katıldığımız bir gruptur?',a:'Satranç kulübü',o:['Aile','Akrabalar','Doğduğumuz şehir'],e:'Kulüplere isteyerek katılırız; aileye ise doğuştan dâhil oluruz.'},
{t:'mc',q:'Efe’nin maçı ile babaannesinin doğum günü aynı saatte. Efe’nin yaşadığı durum nedir?',a:'Rol çatışması',o:['Rol değişimi','Kural ihlali','Hak kaybı'],e:'İki rolün beklentileri çakışınca <b>rol çatışması</b> olur.'},
{t:'tf',q:'Her rol beraberinde bazı haklar ve sorumluluklar getirir.',a:true,e:'Doğru. Örneğin öğrencinin eğitim hakkı ve derslere hazırlanma sorumluluğu vardır.'}
]},
{id:'u1l2',name:'Kültürel Bağlar ve Millî Değerler',sub:'Bizi bir arada tutan ortak değerler',outcome:'SB.6.1.2',
cards:[
{t:'Kültür nedir?',h:'Bir toplumun <b>dil, din, gelenek-görenek, sanat, mutfak, giyim</b> gibi maddi ve manevi değerlerinin tümüne <b>kültür</b> denir. Kültür nesilden nesile aktarılır.',v:['icons',{items:[['🗣️','Dil'],['🎶','Müzik'],['🍲','Yemek'],['🧶','El sanatları'],['👘','Giyim'],['📿','İnanç']]}]},
{t:'Bizi birleştiren bağlar',h:'<b>Ortak dil (Türkçe)</b>, ortak tarih, ortak bayramlar ve ortak değerler toplumu bir arada tutar. Millî bayramlarımız: <b>23 Nisan</b>, <b>19 Mayıs</b>, <b>30 Ağustos</b>, <b>29 Ekim</b>.',v:['timeline',{ev:[['23 Nisan','Ulusal Egemenlik ve Çocuk Bayramı','🧒'],['19 Mayıs','Atatürk’ü Anma, Gençlik ve Spor Bayramı','🏃'],['30 Ağustos','Zafer Bayramı','🎖️'],['29 Ekim','Cumhuriyet Bayramı','🎉']],h:260}]},
{t:'Millî değerlerimiz',h:'<b>Bayrağımız</b>, <b>İstiklal Marşı</b>, <b>vatan</b>, <b>bağımsızlık</b> ve <b>Türkçe</b> millî değerlerimizdir. İstiklal Marşı’nı <b>Mehmet Akif Ersoy</b> yazdı; TBMM 12 Mart 1921’de kabul etti.',v:['flag']},
{t:'Gelenek ve göreneklerimiz',h:'<b>Misafirperverlik</b>, bayramda büyükleri ziyaret, <b>imece</b> (köylülerin birlikte çalışıp bir işi bitirmesi), asker uğurlama ve Nevruz kutlamaları kuşaktan kuşağa aktardığımız geleneklerdir.',v:['icons',{items:[['☕','Misafire ikram'],['🤲','Bayramlaşma'],['🌾','İmece'],['🔥','Nevruz']],cols:2}]},
{t:'Farklılıklar zenginliktir',h:'Karadeniz’de <b>horon</b>, Ege’de <b>zeybek</b>, Doğu ve Güneydoğu’da <b>halay</b>, Trakya’da <b>karşılama</b> oynanır. Farklı yöresel kültürler bir <b>mozaik</b> gibi birleşir. Bu farklılıklara <b>saygı</b> göstermek birliğimizi güçlendirir.',v:['tr',{mk:[['trabzon','Horon','💃'],['izmir','Zeybek','🕺'],['diyarbakir','Halay','👯'],['edirne','Karşılama','🎻']]}]}
],
qs:[
{t:'mc',q:'Bir toplumun dil, din, gelenek ve sanat gibi maddi ve manevi değerlerinin tümüne ne denir?',a:'Kültür',o:['Ekonomi','Teknoloji','Coğrafya'],e:'Bu değerlerin tümü <b>kültür</b>dür.'},
{t:'match',q:'Yöreyi, halk oyunuyla eşleştir.',p:[['Karadeniz','Horon'],['Ege','Zeybek'],['Güneydoğu Anadolu','Halay'],['Trakya','Karşılama']],e:'Her yörenin halk oyunu kültürel zenginliğimizdir.'},
{t:'mc',q:'İstiklal Marşı’nın şairi kimdir?',a:'Mehmet Akif Ersoy',o:['Yunus Emre','Namık Kemal','Ziya Gökalp'],e:'İstiklal Marşı’nı <b>Mehmet Akif Ersoy</b> yazdı.'},
{t:'tf',q:'İstiklal Marşı ve Türk bayrağı millî değerlerimizdendir.',a:true,e:'Doğru. Bayrak ve İstiklal Marşı millî birliğimizin sembolleridir.'},
{t:'mc',q:'Hangisi millî bayramlarımızdan biridir?',a:'29 Ekim Cumhuriyet Bayramı',o:['Ramazan Bayramı','Yılbaşı','Anneler Günü'],long:true,e:'29 Ekim bir <b>millî</b> bayramdır. Ramazan Bayramı ise dinî bayramdır.'},
{t:'fill',q:'Köyde herkesin birlikte çalışarak bir işi bitirmesine ___ denir.',a:'imece',o:['kermes','nöbet','kurultay'],e:'Bu dayanışma geleneğine <b>imece</b> denir.'},
{t:'tf',q:'Farklı yörelerin kültürel özelliklerine saygı göstermek toplumsal birliği zayıflatır.',a:false,e:'Yanlış. Saygı, birliği <b>güçlendirir</b>.'},
{t:'mc',q:'Hangisi toplumu bir arada tutan ortak bir bağdır?',a:'Aynı dili konuşmak',o:['Aynı takımı tutmak','Aynı rengi sevmek','Aynı telefonu kullanmak'],e:'Ortak dil, en güçlü kültürel bağlardandır.'},
{t:'order',q:'Millî bayramlarımızı yıl içindeki sırasına göre diz.',i:['23 Nisan','19 Mayıs','30 Ağustos','29 Ekim'],e:'Nisan, mayıs, ağustos ve ekim sırasıyla.'},
{t:'mc',q:'Misafire ikram etmek ve bayramda büyükleri ziyaret etmek neye örnektir?',a:'Gelenek-görenek',o:['Kanun','Teknoloji','Ekonomi'],e:'Bunlar kuşaktan kuşağa aktarılan <b>geleneklerimizdir</b>.'},
{t:'mc',q:'İstiklal Marşı TBMM’de hangi yıl kabul edildi?',a:'1921',o:['1919','1923','1938'],e:'İstiklal Marşı <b>12 Mart 1921</b>’de kabul edildi.'}
]},
{id:'u1l3',name:'Toplumsal Sorunlar ve Dayanışma',sub:'Birlikte çözeriz: AFAD, Kızılay, vakıflar',outcome:'SB.6.1.3',
cards:[
{t:'Toplumsal sorun nedir?',h:'Toplumdaki birçok kişiyi etkileyen sorunlara <b>toplumsal sorun</b> denir: çevre kirliliği, israf, trafik kazaları, akran zorbalığı, bağımlılık ve doğal afetler gibi.',v:['icons',{items:[['🗑️','Çevre kirliliği'],['🍞','İsraf'],['🚗','Trafik kazaları'],['😢','Akran zorbalığı'],['🚬','Bağımlılık'],['🌊','Doğal afetler']]}]},
{t:'Sorun çözme adımları',h:'Bir sorunu çözmek için önce <b>fark eder</b>, sonra <b>nedenini araştırır</b>, <b>çözüm önerileri</b> üretir ve <b>harekete geçeriz</b>. En sonunda sonucu değerlendiririz.',v:['steps',{items:[['🔍','Sorunu fark et'],['📚','Nedenini araştır'],['💡','Çözüm üret'],['🙌','Harekete geç'],['✅','Sonucu değerlendir']]}]},
{t:'Kurumlar el ele',h:'<b>AFAD</b> afet ve acil durumlarda, <b>Kızılay</b> kan bağışı ve insani yardımda, <b>Yeşilay</b> bağımlılıkla mücadelede, <b>TEMA</b> erozyon ve toprak kaybına karşı çalışır.',v:['icons',{items:[['🚨','AFAD: afet'],['🩸','Kızılay: kan ve yardım'],['🟢','Yeşilay: bağımlılık'],['🌳','TEMA: erozyon']],cols:2}]},
{t:'Tarihimizde dayanışma',h:'<b>Vakıflar</b> çeşme, han, aşevi (imaret) yaptırdı. <b>Ahilik</b> esnafı dayanışma içinde örgütledi. <b>Sadaka taşına</b> veren gizlice para bırakır, ihtiyacı olan da yalnızca ihtiyacı kadarını alırdı.',v:['icons',{items:[['⛲','Vakıf çeşmesi'],['🧰','Ahilik: esnaf'],['🪨','Sadaka taşı']]}]},
{t:'Sen de yapabilirsin',h:'Karşılık beklemeden yardım etmeye <b>gönüllülük</b> denir. Atık pil toplama, kitap bağışı, fidan dikimi gibi <b>sosyal sorumluluk projeleri</b> ile sen de çözümün parçası olabilirsin.',v:['icons',{items:[['🔋','Atık pil topla'],['📚','Kitap bağışla'],['🌱','Fidan dik']]}],tip:'Biliyor muydun? Kızılay’ın temelleri 1868’de atıldı.'}
],
qs:[
{t:'match',q:'Kurumu, çalışma alanıyla eşleştir.',p:[['AFAD','Afet ve acil durum'],['Kızılay','Kan bağışı ve yardım'],['Yeşilay','Bağımlılıkla mücadele'],['TEMA','Erozyonla mücadele']],e:'Her kurum farklı bir toplumsal soruna çözüm arar.'},
{t:'mc',q:'Verenin gizlice para bıraktığı, ihtiyacı olanın yalnızca ihtiyacı kadar aldığı yardımlaşma geleneği hangisidir?',a:'Sadaka taşı',o:['İmece','Kurultay','Kervansaray'],long:true,e:'<b>Sadaka taşı</b> ile yardım, kimsenin onurunu kırmadan yapılırdı.'},
{t:'mc',q:'Ahilik teşkilatı en çok hangi grubu bir araya getirmiştir?',a:'Esnaf ve zanaatkârları',o:['Askerleri','Denizcileri','Öğrencileri'],e:'Ahilik, <b>esnaf ve zanaatkârların</b> dayanışma örgütüdür.'},
{t:'order',q:'Bir sorunu çözerken izlenecek adımları sırala.',i:['Sorunu fark et','Nedenini araştır','Çözüm önerisi üret','Harekete geç'],e:'Önce fark eder, sonra araştırır, çözüm üretir ve uygularız.'},
{t:'tf',q:'Akran zorbalığı okulda karşılaşılabilecek bir toplumsal sorundur.',a:true,e:'Doğru. Zorbalığı gördüğünde bir büyüğüne haber vermelisin.'},
{t:'mc',q:'Hangisi israfa karşı bireysel bir çözümdür?',a:'Tabağına yiyebileceğin kadar yemek almak',o:['Yemeği her gün dışarıdan söylemek','Ekmeği çöpe atmak','Işıkları açık bırakmak'],long:true,e:'Yiyebileceğimiz kadar almak israfı önler.'},
{t:'tf',q:'Vakıflar; çeşme, han ve aşevi gibi hizmetlerle toplumsal dayanışmaya katkı sağlamıştır.',a:true,e:'Doğru. Vakıflar yüzyıllardır topluma hizmet eder.'},
{t:'fill',q:'Karşılık beklemeden topluma yardım için zaman ayırmaya ___ denir.',a:'gönüllülük',o:['zorunluluk','rekabet','tasarruf'],e:'Buna <b>gönüllülük</b> denir.'},
{t:'mc',q:'Depremden sonra arama-kurtarma ve barınma çalışmalarını koordine eden kamu kurumu hangisidir?',a:'AFAD',o:['TEMA','Yeşilay','TSE'],e:'Afet ve Acil Durum Yönetimi Başkanlığı: <b>AFAD</b>.'},
{t:'mc',q:'Okul bahçesinde çöplerin artması sorununa en kalıcı çözüm hangisidir?',a:'Geri dönüşüm kutuları koyup farkındalık kampanyası yapmak',o:['Bahçeyi tamamen kapatmak','Sorunu görmezden gelmek','Sadece bir kez temizlik yapmak'],long:true,e:'Kalıcı çözüm, sorunun <b>nedenini</b> ortadan kaldırır.'},
{t:'mc',q:'Hangisi bir sosyal sorumluluk projesine örnektir?',a:'Okulda atık pil toplama kampanyası düzenlemek',o:['Teneffüste top oynamak','Tatile çıkmak','Yeni bir oyun satın almak'],long:true,e:'Toplum ve çevre yararına yapılan gönüllü işler sosyal sorumluluk projesidir.'}
]}
]});

SA_UNITS.push({id:2,name:'Evimiz Dünya',emoji:'🌍',color:'#2EC4F1',lessons:[
{id:'u2l1',name:'Enlem ve Boylam',sub:'Paralel, meridyen ve saat farkı',outcome:'SB.6.2.1',
cards:[
{t:'Konum nedir?',h:'Bir yerin Dünya üzerinde bulunduğu yere <b>konum</b> denir. Paralel ve meridyenlerle (enlem ve boylamla) belirlenen konuma <b>mutlak konum</b>, bir yerin çevresine göre konumuna <b>göreceli (özel) konum</b> denir.',v:['globe',{tr:true}]},
{t:'Paraleller ve enlem',h:'<b>Ekvator</b> 0° enlemidir ve Dünya’yı Kuzey ve Güney yarım kürelere ayırır. Kuzeye ve güneye 90’ar paralel vardır. Paralellerin boyu Ekvator’dan <b>kutuplara doğru kısalır</b>.',v:['globe',{lon:false,latlab:true}]},
{t:'Meridyenler ve boylam',h:'<b>Başlangıç meridyeni</b> 0° boylamıdır ve Londra’daki <b>Greenwich</b>’ten geçer. Doğuya ve batıya 180’er meridyen vardır. Meridyenler kutuplarda birleşir ve <b>hepsinin boyu eşittir</b>.',v:['globe',{lat:false,pm:true,eq:false}]},
{t:'Her meridyen 4 dakika',h:'Dünya 24 saatte (1440 dakika) 360° döner. 1440 ÷ 360 = <b>4 dakika</b>. Yani iki meridyen arasında 4 dakikalık <b>yerel saat farkı</b> vardır. Doğudaki yerde Güneş <b>önce doğar</b>, saat <b>ileridir</b>.',v:['clock',{l:['A şehri','10:00',30],r:['B şehri','10:40',40],mid:'+40 dk'}]},
{t:'Koordinat okuma',h:'Bir noktanın konumu yazılırken önce <b>enlem</b>, sonra <b>boylam</b> yazılır. Aşağıdaki A noktası: <b>30° Kuzey, 60° Doğu</b>. Enlem K/G, boylam D/B ile gösterilir.',v:['grid',{pt:[30,60]}],tip:'İpucu: Enlem → yatay çizgiler (merdiven basamakları). Boylam → dikey çizgiler.'}
],
qs:[
{t:'mc',q:'Başlangıç (0°) meridyeni hangi şehirden geçer?',a:'Londra (Greenwich)',o:['Paris','İstanbul','New York'],e:'0° meridyeni Londra yakınındaki <b>Greenwich</b>’ten geçer.'},
{t:'tf',q:'Bütün meridyenlerin boyu birbirine eşittir.',a:true,e:'Doğru. Tüm meridyenler kutuptan kutba uzanan eşit yarım dairelerdir.'},
{t:'tf',q:'Paralellerin boyu Ekvator’dan kutuplara doğru uzar.',a:false,e:'Yanlış. Paraleller kutuplara doğru <b>kısalır</b>; en uzun paralel Ekvator’dur.'},
{t:'mc',q:'0° enlemi olan ve Dünya’yı iki yarım küreye ayıran çizgi hangisidir?',a:'Ekvator',o:['Başlangıç meridyeni','Yengeç Dönencesi','Kutup dairesi'],e:'0° enlemi <b>Ekvator</b>dur.'},
{t:'grid'},{t:'grid'},
{t:'mc',q:'İki meridyen arasında kaç dakika yerel saat farkı vardır?',a:'4 dakika',o:['1 dakika','15 dakika','60 dakika'],e:'1440 dakika ÷ 360° = <b>4 dakika</b>.'},
{t:'mc',q:'A şehri 30° D, B şehri 40° D boylamındadır. Hangisi doğrudur?',a:'Güneş B şehrinde daha önce doğar',o:['Güneş A şehrinde daha önce doğar','İki şehrin yerel saati aynıdır','A şehrinin yerel saati daha ileridir'],long:true,e:'Doğudaki yerde (40° D) Güneş önce doğar ve yerel saat ileridir.'},
{t:'mc',q:'Aralarında 10 meridyen bulunan iki şehir arasındaki yerel saat farkı kaç dakikadır?',a:'40 dakika',o:['10 dakika','24 dakika','60 dakika'],e:'10 × 4 = <b>40 dakika</b>.'},
{t:'match',q:'Kavramı açıklamasıyla eşleştir.',p:[['Paralel','Ekvator’a paralel daireler'],['Meridyen','Kutupları birleştiren yarım daireler'],['Ekvator','0° enlemi'],['Greenwich','0° boylamı']],e:'Paraleller enlemi, meridyenler boylamı gösterir.'},
{t:'fill',q:'Bir yerin enlem ve boylamla belirlenen konumuna ___ konum denir.',a:'mutlak',o:['göreceli','komşu','yakın'],e:'Enlem ve boylamla belirlenen konum <b>mutlak (matematik) konum</b>dur.'},
{t:'tf',q:'Bir yerin konumu yazılırken önce enlem, sonra boylam yazılır.',a:true,e:'Doğru: örneğin 40° K, 30° D.'}
]},
{id:'u2l2',name:'Türkiye’nin Konumu',sub:'36°-42° K, 26°-45° D ve köprü ülke',outcome:'SB.6.2.1',
cards:[
{t:'Türkiye’nin mutlak konumu',h:'Türkiye <b>36°-42° Kuzey enlemleri</b> ile <b>26°-45° Doğu boylamları</b> arasında yer alır. Yani <b>Kuzey</b> ve <b>Doğu</b> yarım kürededir.',v:['tr',{grid:true,seas:true}]},
{t:'Enlemin sonuçları',h:'Türkiye <b>ılıman kuşakta</b> yer alır: <b>dört mevsim</b> belirgin yaşanır. Güneyden kuzeye gidildikçe sıcaklık genel olarak azalır. Güneş ışınları hep güneyden geldiği için evlerin güney cephesi daha çok ışık alır.',v:['seasons']},
{t:'Boylamın sonuçları',h:'Türkiye’nin doğusu ile batısı arasında 45 − 26 = <b>19 meridyen</b> fark vardır. 19 × 4 = <b>76 dakika</b> yerel saat farkı oluşur. Güneş ilk olarak doğudaki illerde doğar. Ülke genelinde ortak bir <b>ulusal saat</b> kullanılır.',v:['clock']},
{t:'Uç noktalarımız',h:'En kuzey ucumuz <b>Sinop</b>, en güney ucumuz <b>Hatay</b>, en doğu ucumuz <b>Iğdır</b>, en batı ucumuz <b>Çanakkale</b>’dedir. Türkiye’nin <b>8 komşusu</b> vardır.',v:['tr',{ext:true,nb:true}]},
{t:'Göreceli (özel) konum',h:'Türkiye <b>Asya ile Avrupa arasında bir köprüdür</b>. <b>Üç tarafı denizlerle</b> (Karadeniz, Ege, Akdeniz) çevrili bir yarımadadır; <b>Marmara</b> bir iç denizdir. <b>İstanbul</b> ve <b>Çanakkale</b> boğazları Karadeniz’i Akdeniz’e bağlar.',v:['tr',{seas:true,mk:[['istanbul','İstanbul Boğazı'],['canakkale','Çanakkale Boğazı']]}],tip:'Göreceli konum bir yerin komşularına, denizlere, yollara göre konumudur.'}
],
qs:[
{t:'map',q:'Haritada <b>Karadeniz</b>’e dokun.',v:['tr',{seas:true,tap:true,nolabel:true}],a:'karadeniz',e:'Karadeniz Türkiye’nin kuzeyindedir.'},
{t:'map',q:'Haritada <b>Ege Denizi</b>’ne dokun.',v:['tr',{seas:true,tap:true,nolabel:true}],a:'ege',e:'Ege Denizi Türkiye’nin batısındadır.'},
{t:'map',q:'Haritada iç denizimiz <b>Marmara</b>’ya dokun.',v:['tr',{seas:true,tap:true,nolabel:true}],a:'marmara',e:'Marmara Denizi tamamen Türkiye topraklarıyla çevrili iç denizimizdir.'},
{t:'mc',q:'Türkiye hangi enlemler arasındadır?',a:'36°-42° Kuzey',o:['26°-45° Kuzey','36°-42° Güney','26°-45° Doğu'],e:'Enlemler <b>36°-42° K</b>, boylamlar 26°-45° D.'},
{t:'mc',q:'Türkiye’nin en doğusu ile en batısı arasında kaç dakika yerel saat farkı vardır?',a:'76 dakika',o:['19 dakika','45 dakika','60 dakika'],e:'19 meridyen × 4 dk = <b>76 dakika</b>.'},
{t:'tf',q:'Türkiye Ekvator’un güneyinde yer alır.',a:false,e:'Yanlış. Türkiye <b>Kuzey</b> yarım kürededir.'},
{t:'mc',q:'Türkiye’nin üç tarafının denizlerle çevrili olması hangi konum özelliğidir?',a:'Göreceli (özel) konum',o:['Mutlak konum','Saat dilimi','Enlem farkı'],long:true,e:'Çevresine göre konum: <b>göreceli konum</b>.'},
{t:'mc',q:'Hangisi Türkiye’nin enleminin bir sonucudur?',a:'Dört mevsimin belirgin yaşanması',o:['Doğu ile batı arasında saat farkı olması','Üç tarafının denizlerle çevrili olması','Asya ile Avrupa arasında köprü olması'],long:true,e:'Ilıman kuşakta olmamız (enlem) <b>dört mevsimi</b> belirgin kılar. Saat farkı boylamın sonucudur.'},
{t:'match',q:'Uç noktayı ille eşleştir.',p:[['En kuzey','Sinop'],['En güney','Hatay'],['En doğu','Iğdır'],['En batı','Çanakkale']],e:'Sinop, Hatay, Iğdır ve Çanakkale uç noktalarımızdır.'},
{t:'mc',q:'Hangisi Türkiye’nin komşusu değildir?',a:'Mısır',o:['Gürcistan','İran','Bulgaristan'],e:'Mısır komşumuz değildir; Akdeniz’in güneyindedir.'},
{t:'fill',q:'Asya ile Avrupa’yı ayıran boğazlarımız İstanbul ve ___ boğazlarıdır.',a:'Çanakkale',o:['Sinop','Hatay','İzmir'],e:'<b>İstanbul ve Çanakkale</b> boğazları.'},
{t:'tf',q:'Türkiye’de Güneş ilk olarak doğudaki illerde doğar.',a:true,e:'Doğru. Dünya batıdan doğuya döndüğü için doğu illeri Güneş’i önce görür.'}
]},
{id:'u2l3',name:'Doğal ve Beşerî Çevre',sub:'Yer şekilleri, iklim ve yaşam',outcome:'SB.6.2.2',
cards:[
{t:'Doğal mı, beşerî mi?',h:'İnsan eli değmeden oluşan dağ, ova, akarsu, orman ve iklim <b>doğal çevredir</b>. İnsanların yaptığı ev, yol, köprü, baraj, tarla ve fabrika ise <b>beşerî çevredir</b>.',v:['scene']},
{t:'Türkiye’nin yer şekilleri',h:'Türkiye’nin ortalama yükseltisi fazladır ve <b>batıdan doğuya doğru yükselti artar</b>. Dağlar kıyılara paralel uzanır. En yüksek dağ <b>Ağrı Dağı (5137 m)</b>, en büyük göl <b>Van Gölü</b>, en uzun akarsu <b>Kızılırmak</b>’tır.',v:['profile']},
{t:'Üç ana iklim',h:'<b>Karadeniz iklimi:</b> her mevsim yağışlı, bitki örtüsü orman. <b>Akdeniz iklimi:</b> yazlar sıcak ve kurak, kışlar ılık ve yağışlı, bitki örtüsü maki. <b>Karasal iklim:</b> yazlar sıcak-kurak, kışlar soğuk ve karlı, bitki örtüsü bozkır.',v:['tr',{zones:true}]},
{t:'Çevre yaşamı etkiler',h:'Karadeniz’de ormanlar bol olduğu için <b>ahşap evler</b>, eğimli arazide <b>dağınık yerleşme</b> görülür. İç Anadolu’da <b>kerpiç evler</b> ve tahıl tarımı yaygındır. Akdeniz kıyılarında ılık kış <b>seracılığı</b> ve <b>turizmi</b> geliştirir.',v:['icons',{items:[['🛖','Karadeniz: ahşap ev'],['🧱','İç Anadolu: kerpiç ev'],['🏖️','Akdeniz: turizm']]}]},
{t:'İnsan çevreyi değiştirir',h:'İnsanlar baraj, tünel, köprü yapar; bataklıkları kurutur. Bunların bazıları faydalıdır ama ormanları kesmek erozyona yol açar. Türkiye ayrıca <b>deprem kuşağındadır</b>; <b>heyelan</b> en çok Karadeniz’de görülür.',v:['icons',{items:[['🏗️','Baraj ve köprü'],['🪓','Orman kesimi → erozyon'],['🌋','Deprem kuşağı'],['⛰️','Heyelan: Karadeniz']],cols:2}],tip:'Afetlere karşı deprem çantası hazırlamak hayat kurtarır.'}
],
qs:[
{t:'map',q:'Haritada <b>Karadeniz iklimi</b> görülen alana dokun.',v:['tr',{zones:true,tap:true,nolabel:true}],a:'karadeniz',e:'Karadeniz iklimi kuzey kıyılarımızda görülür.'},
{t:'map',q:'Haritada <b>Akdeniz iklimi</b> görülen alana dokun.',v:['tr',{zones:true,tap:true,nolabel:true}],a:'akdeniz',e:'Akdeniz iklimi güney ve batı kıyılarımızda görülür.'},
{t:'mc',q:'Hangisi beşerî çevre unsurudur?',a:'Baraj',o:['Göl','Dağ','Ova'],e:'Barajı insanlar yapar: <b>beşerî</b> unsur.'},
{t:'match',q:'İklimi özelliğiyle eşleştir.',p:[['Karadeniz iklimi','Her mevsim yağışlı'],['Akdeniz iklimi','Yazı sıcak ve kurak, kışı ılık'],['Karasal iklim','Kışı soğuk ve karlı']],e:'Üç iklim, üç farklı yaşam biçimi.'},
{t:'match',q:'İklimi bitki örtüsüyle eşleştir.',p:[['Karadeniz iklimi','Orman'],['Akdeniz iklimi','Maki'],['Karasal iklim','Bozkır']],e:'Bitki örtüsü iklime göre değişir.'},
{t:'mc',q:'Türkiye’nin en yüksek dağı hangisidir?',a:'Ağrı Dağı',o:['Erciyes Dağı','Uludağ','Kaçkar Dağı'],e:'<b>Ağrı Dağı</b>: 5137 m.'},
{t:'mc',q:'Karadeniz kıyılarında evlerin genellikle ahşaptan yapılmasının temel sebebi nedir?',a:'Bölgede ormanların çok olması',o:['Arazinin düz olması','Yağışın az olması','Taşın çok ucuz olması'],long:true,e:'Doğal çevre (orman) insanların ev yapımını etkiler.'},
{t:'tf',q:'Türkiye’de batıdan doğuya gidildikçe yükselti genel olarak artar.',a:true,e:'Doğru. Doğu Anadolu en yüksek bölgemizdir.'},
{t:'mc',q:'Heyelan en çok hangi bölgemizde görülür?',a:'Karadeniz Bölgesi',o:['Ege Bölgesi','İç Anadolu Bölgesi','Güneydoğu Anadolu Bölgesi'],e:'Bol yağış ve eğimli arazi nedeniyle <b>Karadeniz</b>.'},
{t:'mc',q:'Hangisi insanın doğal çevreyi olumsuz etkilemesine örnektir?',a:'Orman alanlarını yerleşime açmak',o:['Fidan dikmek','Çöpleri ayrıştırmak','Erozyona karşı teraslama yapmak'],long:true,e:'Ormanları yok etmek erozyon ve sel riskini artırır.'},
{t:'fill',q:'İç Anadolu’daki kısa otlardan oluşan bitki örtüsüne ___ denir.',a:'bozkır',o:['maki','orman','tundra'],e:'Karasal iklimin bitki örtüsü <b>bozkır</b>dır.'},
{t:'mc',q:'Türkiye’nin en büyük gölü hangisidir?',a:'Van Gölü',o:['Tuz Gölü','Beyşehir Gölü','Eğirdir Gölü'],e:'<b>Van Gölü</b> en büyük gölümüzdür.'}
]},
{id:'u2l4',name:'Türk Dünyası ile İş Birliği',sub:'Ortak dil, ortak kültür, ortak gelecek',outcome:'SB.6.2.3',
cards:[
{t:'Türk dünyası',h:'Türkiye, <b>Azerbaycan, Kazakistan, Kırgızistan, Özbekistan, Türkmenistan</b> ve <b>KKTC</b> ile birlikte geniş bir coğrafyada yaşayan Türk toplulukları; ortak dil kökü, tarih ve kültürle birbirine bağlıdır.',v:['ea',{mk:[['ankara'],['baku'],['astana'],['biskek',null,0,16],['taskent'],['askabat',null,0,16],['lefkose',null,0,16]],label:'Türk dünyasının başkentleri'}]},
{t:'Ortak mirasımız',h:'<b>Nevruz</b> (21 Mart) baharın gelişini kutlar. <b>Dede Korkut Hikâyeleri</b> Oğuzların, <b>Manas Destanı</b> Kırgızların destanıdır. <b>Ahmet Yesevi</b> ve <b>Yunus Emre</b> tüm Türk dünyasının ortak değerleridir.',v:['icons',{items:[['🔥','Nevruz'],['📖','Dede Korkut'],['🐎','Manas Destanı'],['🕌','Ahmet Yesevi']],cols:2}]},
{t:'İş birliği kuruluşları',h:'<b>Türk Devletleri Teşkilatı</b> (2009’da Türk Konseyi adıyla kuruldu) Türk devletleri arasındaki iş birliğini artırır. <b>TÜRKSOY</b> (1993) Türk kültür ve sanatını korur. <b>TİKA</b> kalkınma projeleri yürütür, <b>Yunus Emre Enstitüsü</b> Türkçeyi dünyaya tanıtır.',v:['web',{center:'Türk dünyası iş birliği',items:[['🤝','TDT'],['🎭','TÜRKSOY'],['🏗️','TİKA'],['📚','Yunus Emre Enst.']],cc:'#2EC4F1'}]},
{t:'Eğitim ve spor köprüleri',h:'Kazakistan’daki <b>Ahmet Yesevi Üniversitesi</b> ve Kırgızistan’daki <b>Manas Üniversitesi</b> ortak üniversitelerdir. <b>Türkiye Bursları</b> ile öğrenciler ülkemizde okur. <b>Dünya Göçebe Oyunları</b> geleneksel sporları yaşatır.',v:['icons',{items:[['🎓','Ahmet Yesevi Üniv. (Kazakistan)'],['🎓','Manas Üniv. (Kırgızistan)'],['🏹','Dünya Göçebe Oyunları']]}]},
{t:'Neden önemli?',h:'Kültürel iş birlikleri <b>kardeşlik bağlarını güçlendirir</b>, ortak mirası korur, ticareti ve turizmi artırır. Ortak film, kitap ve festival projeleri gençleri birbirine yaklaştırır.',v:['big',{e:'🌉',t:'Ortak geçmiş + ortak gelecek',c:'#2EC4F1'}]}
],
qs:[
{t:'mc',q:'Türk kültür ve sanatını korumak ve tanıtmak amacıyla 1993’te kurulan kuruluş hangisidir?',a:'TÜRKSOY',o:['AFAD','TEMA','Kızılay'],e:'<b>TÜRKSOY</b>, Türk kültürünün ortak kurumudur.'},
{t:'mc',q:'21 Mart’ta baharın gelişini kutlamak için Türk dünyasında ortak kutlanan bayram hangisidir?',a:'Nevruz',o:['Hıdırellez','Kurban Bayramı','Hasat Şenliği'],e:'Baharın müjdecisi <b>Nevruz</b>.'},
{t:'match',q:'Kavramı açıklamasıyla eşleştir.',p:[['Manas Destanı','Kırgız Türklerinin destanı'],['Dede Korkut','Oğuz Türklerinin hikâyeleri'],['TİKA','Kalkınma ve yardım projeleri'],['Yunus Emre Enstitüsü','Türkçeyi dünyaya tanıtma']],e:'Ortak miras ve ortak kurumlar.'},
{t:'tf',q:'Türk Devletleri Teşkilatı’nın amaçlarından biri Türk devletleri arasındaki iş birliğini artırmaktır.',a:true,e:'Doğru.'},
{t:'mc',q:'Hangisi Türk dünyası ile kültürel iş birliğine örnektir?',a:'Dünya Göçebe Oyunları’nın düzenlenmesi',o:['Bir şehirde yeni metro açılması','Okulda sınav takviminin açıklanması','Bir fabrikanın üretimi artırması'],long:true,e:'Göçebe Oyunları, ortak geleneksel sporları yaşatır.'},
{t:'tf',q:'Azerbaycan, Kazakistan, Kırgızistan ve Özbekistan bağımsız Türk devletleridir.',a:true,e:'Doğru.'},
{t:'mc',q:'Kırgızistan’daki Türkiye-Kırgızistan ortak üniversitesi hangisidir?',a:'Manas Üniversitesi',o:['Ahmet Yesevi Üniversitesi','Nahçıvan Üniversitesi','Kaşgar Üniversitesi'],e:'Bişkek’teki <b>Manas Üniversitesi</b>.'},
{t:'fill',q:'Türk dünyasının ortak destanlarından ___ Destanı Kırgız Türklerine aittir.',a:'Manas',o:['Oğuz Kağan','Ergenekon','Türeyiş'],e:'<b>Manas Destanı</b> Kırgızlarındır.'},
{t:'mc',q:'Yurt dışında Türkçeyi ve Türk kültürünü tanıtan kurumumuz hangisidir?',a:'Yunus Emre Enstitüsü',o:['TSE','AFAD','Türk Patent ve Marka Kurumu'],long:true,e:'<b>Yunus Emre Enstitüsü</b> dünyanın birçok şehrinde Türkçe öğretir.'},
{t:'mc',q:'Türk dünyasında kültürel iş birliklerinin artmasının en önemli sonucu nedir?',a:'Kardeşlik ve kültürel bağların güçlenmesi',o:['Ortak dilin tamamen kaybolması','Ticaretin sona ermesi','Geleneklerin unutulması'],long:true,e:'İş birliği ortak bağları güçlendirir.'},
{t:'mc',q:'Ahmet Yesevi Üniversitesi hangi ülkededir?',a:'Kazakistan',o:['Azerbaycan','Kırgızistan','Türkmenistan'],e:'Kazakistan’ın Türkistan şehrinde.'}
]}
]});

SA_UNITS.push({id:3,name:'Ortak Mirasımız',emoji:'🏺',color:'#FF5A5F',lessons:[
{id:'u3l1',name:'İlk Türk Devletleri',sub:'Asya Hun, Göktürk, Uygur',outcome:'SB.6.3.1',
cards:[
{t:'Anayurt: Orta Asya',h:'Türklerin anayurdu <b>Orta Asya</b>’dır (Altay ve Tanrı Dağları çevresi). Bozkırda <b>göçebe</b> yaşayan Türkler hayvancılıkla geçinir, ata çok önem verirdi. <b>Kuraklık, nüfus artışı, otlakların yetmemesi</b> ve siyasi baskılar göçlere yol açtı.',v:['ea',{region:[85,45,70,34,'#FFA53D','Orta Asya'],arrows:[[80,45,35,40],[80,45,55,36],[80,45,78,24]],mk:[['altay'],['tanri',null,0,16]],label:'Orta Asya ve Türk göçleri'}]},
{t:'Asya Hun Devleti',h:'Bilinen <b>ilk Türk devletidir</b>. En ünlü hükümdarı <b>Mete Han</b>, orduyu <b>onlu sisteme</b> göre düzenledi. Bu sistem bugün de birçok orduda kullanılır. Çinliler Hun akınlarına karşı <b>Çin Seddi</b>’ni güçlendirdi.',v:['decimal']},
{t:'Göktürkler (552)',h:'<b>Bumin Kağan</b> kurdu. <b>“Türk” adını devlet adı olarak ilk kullanan</b> devlettir. Kendi alfabeleri vardı. <b>Orhun Yazıtları</b>, Türk adının geçtiği <b>ilk Türkçe yazılı belgelerdir</b>; Kül Tigin, Bilge Kağan ve Tonyukuk adına dikildi.',v:['orhun']},
{t:'Uygurlar (745)',h:'<b>Yerleşik hayata geçen ilk Türk devletidir</b>. Tarım yaptılar; şehirler, saraylar, tapınaklar kurdular. <b>Uygur alfabesini</b> kullandılar, <b>kâğıt</b> ve <b>matbaa</b> (tahta kalıplarla baskı) kullanarak kitaplar bastılar.',v:['icons',{items:[['🏯','Şehir ve mimari'],['🌾','Tarım'],['📜','Kâğıt ve matbaa']]}]},
{t:'Devlet ve kültür',h:'<b>Kurultay:</b> devlet işlerinin görüşüldüğü meclis. <b>Töre:</b> yazısız hukuk kuralları. <b>Kut:</b> yönetme yetkisinin Tanrı tarafından verildiği inancı. <b>Hatunlar</b> yönetimde söz sahibiydi. Bozkır kültürü bize <b>çadır (otağ), keçe, üzengi ve pantolonu</b> kazandırdı.',v:['icons',{items:[['🏕️','Otağ (çadır)'],['🐎','At ve üzengi'],['👖','Pantolon'],['🗣️','Kurultay'],['📏','Töre'],['👑','Kut']]}]}
],
qs:[
{t:'mc',q:'Bilinen ilk Türk devleti hangisidir?',a:'Asya Hun Devleti',o:['Göktürkler','Uygurlar','Karahanlılar'],e:'<b>Asya Hun Devleti</b>.'},
{t:'mc',q:'Orduyu onlu sisteme göre düzenleyen Türk hükümdarı kimdir?',a:'Mete Han',o:['Bumin Kağan','Bilge Kağan','Satuk Buğra Han'],e:'Asya Hun hükümdarı <b>Mete Han</b>.'},
{t:'mc',q:'“Türk” adını resmî devlet adı olarak ilk kullanan Türk devleti hangisidir?',a:'Göktürkler',o:['Asya Hunları','Uygurlar','Gazneliler'],e:'<b>Göktürkler</b> (552).'},
{t:'mc',q:'Yerleşik hayata geçen ilk Türk devleti hangisidir?',a:'Uygurlar',o:['Asya Hunları','Göktürkler','Avarlar'],e:'<b>Uygurlar</b> tarım ve mimaride ilerledi.'},
{t:'match',q:'Kavramı anlamıyla eşleştir.',p:[['Kurultay','Devlet meclisi'],['Töre','Yazısız hukuk kuralları'],['Kut','Yönetme yetkisinin Tanrı’dan geldiği inancı'],['Otağ','Hükümdar çadırı']],e:'İlk Türk devletlerinin temel kavramları.'},
{t:'order',q:'Devletleri kuruluş sırasına göre diz (eskiden yeniye).',i:['Asya Hun Devleti','Göktürkler','Uygurlar','Karahanlılar'],e:'MÖ 220 → 552 → 745 → 840.'},
{t:'tf',q:'Orhun Yazıtları, Türk adının geçtiği ilk Türkçe yazılı belgelerdir.',a:true,e:'Doğru! Göktürk alfabesiyle yazılmıştır.'},
{t:'tf',q:'İlk Türk devletlerinde hatunlar devlet yönetiminde söz sahibiydi.',a:true,e:'Doğru. Hatunlar kurultaya katılır, elçileri kabul ederdi.'},
{t:'mc',q:'Hangisi Orta Asya’dan yapılan Türk göçlerinin sebeplerinden biri değildir?',a:'Deniz ticaretinin gelişmesi',o:['Kuraklık','Nüfus artışı','Otlakların yetersiz kalması'],e:'Göçler kuraklık, nüfus artışı, otlak sorunu ve siyasi baskılarla oldu.'},
{t:'fill',q:'Kül Tigin, Bilge Kağan ve Tonyukuk adına dikilen yazıtlara ___ Yazıtları denir.',a:'Orhun',o:['Kaşgar','Malazgirt','Talas'],e:'<b>Orhun Yazıtları</b>.'},
{t:'mc',q:'Uygurların yerleşik hayata geçmesinin sonucu hangisidir?',a:'Tarım, mimari ve matbaada gelişme',o:['Göçebe hayatın güçlenmesi','Çadır kullanımının artması','Ata bağlılığın artması'],long:true,e:'Yerleşik hayat tarımı, mimariyi ve yazı kültürünü geliştirdi.'},
{t:'mc',q:'Göktürk Devleti’ni kim kurmuştur?',a:'Bumin Kağan',o:['Mete Han','Alparslan','Tuğrul Bey'],e:'<b>Bumin Kağan</b>, 552.'}
]},
{id:'u3l2',name:'İslam Medeniyetinin Katkıları',sub:'7-13. yüzyıllarda bilim ve sanat',outcome:'SB.6.3.2',
cards:[
{t:'İslamiyet’in doğuşu',h:'İslamiyet <b>610</b> yılında Mekke’de doğdu. Hz. Muhammed 622’de <b>Medine</b>’ye göç etti (<b>Hicret</b>). Kısa sürede Arabistan’dan Orta Asya’ya, Kuzey Afrika’dan Endülüs’e kadar yayıldı.',v:['ea',{mk:[['mekke',null,0,15],['medine'],['bagdat'],['sam',null,-20,0],['kahire',null,0,15],['kurtuba']],label:'İslam medeniyetinin merkezleri'}]},
{t:'Bilgi merkezleri',h:'Abbasiler döneminde Bağdat’ta kurulan <b>Beytülhikme</b>’de Yunan, Hint ve İran eserleri Arapçaya çevrildi. <b>Medreseler</b> (örneğin Selçuklu veziri Nizamülmülk’ün <b>Nizamiye Medreseleri</b>), kütüphaneler ve <b>rasathaneler</b> kuruldu.',v:['icons',{items:[['📚','Beytülhikme'],['🏫','Medrese'],['🔭','Rasathane']]}]},
{t:'Büyük bilginler',h:'<b>Harezmî:</b> cebirin kurucusu, “algoritma” onun adından gelir. <b>İbn-i Sina:</b> tıp kitabı <i>El-Kanun</i> Avrupa’da yüzyıllarca okutuldu. <b>Bîrûnî:</b> Dünya’nın kendi ekseninde döndüğünü savundu. <b>Farabi:</b> “İkinci Öğretmen”, felsefe ve müzik.',v:['icons',{items:[['➗','Harezmî: cebir'],['🩺','İbn-i Sina: tıp'],['🌍','Bîrûnî: astronomi'],['🎼','Farabi: felsefe, müzik']],cols:2}]},
{t:'Kâğıdın yolculuğu',h:'<b>Talas Savaşı (751)</b> sonrasında kâğıt yapımı Çin’den <b>Semerkant</b>’a geçti. Kâğıt, İslam dünyası üzerinden Avrupa’ya ulaştı. Bu sayede kitaplar çoğaldı, bilgi hızla yayıldı.',v:['ea',{route:['xian','talas','semerkant','bagdat','kahire','kurtuba'],mk:[['xian','📜'],['talas',null,0,-13],['semerkant',null,0,15],['bagdat'],['kurtuba']],label:'Kâğıdın Çin’den Avrupa’ya yolculuğu'}]},
{t:'Mimari, sanat ve hukuk',h:'Cami, medrese, <b>kervansaray</b> ve <b>darüşşifa</b> (hastane) yapıldı. Kubbe ve kemerler gelişti. <b>Hat, tezhip, minyatür ve çini</b> sanatları yükseldi. Vakıflar ve hukuk düzeni insanlığın ortak mirasına katkı sağladı.',v:['icons',{items:[['🕌','Cami ve kubbe'],['🏥','Darüşşifa'],['🐫','Kervansaray'],['🖋️','Hat sanatı'],['🎨','Minyatür'],['🧩','Çini']]}]}
],
qs:[
{t:'match',q:'Bilgini çalıştığı alanla eşleştir.',p:[['Harezmî','Cebir (matematik)'],['İbn-i Sina','Tıp'],['Farabi','Felsefe ve müzik'],['Bîrûnî','Astronomi ve coğrafya']],e:'İslam medeniyetinin büyük bilginleri.'},
{t:'mc',q:'Abbasiler döneminde Bağdat’ta kurulan, eserlerin tercüme edildiği bilim merkezi hangisidir?',a:'Beytülhikme',o:['Nizamiye Medresesi','Darüşşifa','Kervansaray'],e:'<b>Beytülhikme</b>: “Bilgelik Evi”.'},
{t:'mc',q:'“İkinci Öğretmen” (Muallim-i Sani) unvanıyla bilinen bilgin kimdir?',a:'Farabi',o:['İbn-i Sina','Harezmî','Bîrûnî'],e:'<b>Farabi</b>, Aristoteles’ten sonra “ikinci öğretmen” sayıldı.'},
{t:'tf',q:'İbn-i Sina’nın tıp kitabı El-Kanun Avrupa’da yüzyıllarca ders kitabı olarak okutulmuştur.',a:true,e:'Doğru.'},
{t:'mc',q:'Kâğıt yapımının Çin’den İslam dünyasına geçmesini sağlayan savaş hangisidir?',a:'Talas Savaşı (751)',o:['Malazgirt Savaşı','Dandanakan Savaşı','Miryokefalon Savaşı'],e:'<b>Talas Savaşı</b> sonrası Semerkant’ta kâğıt üretildi.'},
{t:'fill',q:'İslam medeniyetinde hastanelere ___ denirdi.',a:'darüşşifa',o:['kervansaray','rasathane','medrese'],e:'“Şifa evi”: <b>darüşşifa</b>.'},
{t:'mc',q:'Hangisi İslam medeniyetinin insanlığın ortak mirasına katkılarından biri değildir?',a:'Buhar makinesinin icadı',o:['Cebirin gelişmesi','Tıp kitaplarının yazılması','Rasathanelerin kurulması'],e:'Buhar makinesi 18. yüzyılda İngiltere’de geliştirildi.'},
{t:'order',q:'Olayları eskiden yeniye sırala.',i:['İslamiyet’in doğuşu (610)','Hicret (622)','Talas Savaşı (751)','Nizamiye Medresesi’nin açılışı (1067)'],e:'610 → 622 → 751 → 1067.'},
{t:'tf',q:'Bîrûnî, Dünya’nın kendi ekseni etrafında döndüğünü savunan bilginlerdendir.',a:true,e:'Doğru.'},
{t:'mc',q:'Ticaret yolları üzerinde tüccarların konakladığı yapılara ne denir?',a:'Kervansaray',o:['Darüşşifa','Medrese','Rasathane'],e:'<b>Kervansaraylar</b> ticareti güvenli ve hızlı hâle getirdi.'},
{t:'mc',q:'“Algoritma” kelimesi hangi bilginin adından gelir?',a:'Harezmî',o:['Farabi','İbn-i Sina','Kaşgarlı Mahmut'],e:'Latince “Algoritmi”: <b>Harezmî</b>.'}
]},
{id:'u3l3',name:'İslamiyet Sonrası Türk Kültürü',sub:'Karahanlılar, Gazneliler, Selçuklular',outcome:'SB.6.3.3',
cards:[
{t:'Türkler İslamiyet’le tanışıyor',h:'Talas Savaşı’ndan sonra Türklerle Müslüman Araplar arasında yakınlaşma başladı. Ticaret ve kültürel etkileşimle İslamiyet Türkler arasında yayıldı. <b>Karahanlılar</b> (Satuk Buğra Han döneminde) <b>ilk Müslüman Türk devleti</b> oldu.',v:['timeline',{ev:[['751','Talas Savaşı','⚔️'],['840','Karahanlılar','🕌'],['963','Gazneliler','👑'],['1040','Büyük Selçuklu','🏹']]}]},
{t:'Gazneliler ve Selçuklular',h:'<b>Gazneli Mahmut</b> “sultan” unvanını kullanan ilk Türk hükümdarıdır ve İslamiyet’i Hindistan’a yaydı. <b>Büyük Selçuklu Devleti</b>, Tuğrul Bey’in <b>Dandanakan Savaşı (1040)</b> zaferiyle kesin olarak kuruldu.',v:['ea',{mk:[['kasgar','🕌'],['gazne','👑',0,18],['merv','🏹',0,18],['bagdat']],label:'Karahanlı, Gazneli ve Selçuklu merkezleri'}]},
{t:'Ölümsüz eserler',h:'<b>Kutadgu Bilig</b> (Yusuf Has Hacip): “mutluluk veren bilgi”, iyi yönetimi anlatır. <b>Divanü Lügati’t-Türk</b> (Kaşgarlı Mahmut): Araplara Türkçe öğretmek için yazılmış sözlük. <b>Atabetü’l-Hakayık</b> (Edip Ahmet Yükneki) ve <b>Divan-ı Hikmet</b> (Ahmet Yesevi).',v:['icons',{items:[['📘','Kutadgu Bilig'],['📗','Divanü Lügati’t-Türk'],['📙','Atabetü’l-Hakayık'],['📕','Divan-ı Hikmet']],cols:2}]},
{t:'Neler değişti?',h:'Türkler <b>Arap alfabesini</b> kullanmaya başladı, yeni isimler aldı. Cami, medrese ve kervansaray yapıldı. “Sultan” unvanı, <b>Hicri takvim</b> kullanıldı. Kurultay geleneği <b>Divan-ı Saltanat</b> olarak sürdü.',v:['versus',{l:['🏕️','Önce',['Göktürk alfabesi','Kağan, kurultay','Çadır, otağ']],r:['🕌','Sonra',['Arap alfabesi','Sultan, divan','Cami, medrese']],mid:'→',h:250}]},
{t:'Neler korundu?',h:'Türkler eski kültürlerini tamamen bırakmadı: <b>misafirperverlik, adalet, cesaret</b>, aileye ve büyüklere saygı, töre anlayışı İslam’ın değerleriyle birleşti. Böylece zengin bir <b>Türk-İslam kültürü</b> oluştu.',v:['big',{e:'🤝',t:'Eski gelenekler + yeni inanç',c:'#FF5A5F'}]}
],
qs:[
{t:'mc',q:'İlk Müslüman Türk devleti hangisidir?',a:'Karahanlılar',o:['Gazneliler','Büyük Selçuklular','Uygurlar'],e:'<b>Karahanlılar</b>.'},
{t:'match',q:'Eseri yazarıyla eşleştir.',p:[['Kutadgu Bilig','Yusuf Has Hacip'],['Divanü Lügati’t-Türk','Kaşgarlı Mahmut'],['Divan-ı Hikmet','Ahmet Yesevi'],['Atabetü’l-Hakayık','Edip Ahmet Yükneki']],e:'Karahanlı döneminin ölümsüz eserleri.'},
{t:'mc',q:'Araplara Türkçeyi öğretmek amacıyla yazılan sözlük hangisidir?',a:'Divanü Lügati’t-Türk',o:['Kutadgu Bilig','Siyasetname','Divan-ı Hikmet'],e:'Kaşgarlı Mahmut’un <b>Divanü Lügati’t-Türk</b> eseri.'},
{t:'mc',q:'“Sultan” unvanını kullanan ilk Türk hükümdarı kimdir?',a:'Gazneli Mahmut',o:['Tuğrul Bey','Alparslan','Satuk Buğra Han'],e:'<b>Gazneli Mahmut</b>.'},
{t:'tf',q:'Türkler İslamiyet’i kabul ettikten sonra Arap alfabesini kullanmaya başladı.',a:true,e:'Doğru.'},
{t:'mc',q:'“Kutadgu Bilig” ne anlama gelir?',a:'Mutluluk veren bilgi',o:['Türk dili sözlüğü','Hakikatlerin eşiği','Bilgelik evi'],e:'<b>Mutluluk veren bilgi</b>.'},
{t:'tf',q:'Türkler İslamiyet’i kabul edince eski kültürlerinin tamamını bıraktılar.',a:false,e:'Yanlış. Birçok gelenek korunarak İslam değerleriyle birleşti.'},
{t:'mc',q:'Büyük Selçuklu Devleti hangi savaşla kesin olarak kuruldu?',a:'Dandanakan Savaşı (1040)',o:['Malazgirt Savaşı (1071)','Talas Savaşı (751)','Kösedağ Savaşı (1243)'],long:true,e:'Tuğrul Bey’in Gaznelileri yendiği <b>Dandanakan</b>.'},
{t:'order',q:'Devletleri kuruluş sırasına göre diz.',i:['Karahanlılar','Gazneliler','Büyük Selçuklular','Türkiye Selçukluları'],e:'840 → 963 → 1040 → 1075.'},
{t:'fill',q:'Karahanlı hükümdarı Satuk Buğra Han İslamiyet’i kabul ederek ___ adını aldı.',a:'Abdülkerim',o:['Abdülhamit','Alparslan','Tuğrul'],e:'<b>Abdülkerim</b> Satuk Buğra Han.'},
{t:'mc',q:'Hangisi İslamiyet’in kabulünden sonra Türk kültüründe görülen bir değişimdir?',a:'Cami, medrese ve kervansaray yapılması',o:['Göktürk alfabesinin yaygınlaşması','Kurganların artması','Göçebe hayata dönülmesi'],long:true,e:'İslamiyet’le birlikte yeni yapı türleri yaygınlaştı.'}
]},
{id:'u3l4',name:'Anadolu Türk Yurdu Oluyor',sub:'Malazgirt’ten Kösedağ’a (11-13. yy)',outcome:'SB.6.3.4',
cards:[
{t:'Malazgirt Savaşı (1071)',h:'Büyük Selçuklu Sultanı <b>Alparslan</b>, Bizans İmparatoru Romen Diyojen’i <b>Malazgirt</b>’te yendi. Bu zaferle <b>Anadolu’nun kapıları Türklere açıldı</b> ve Türkler Anadolu’ya yerleşmeye başladı.',v:['tr',{mk:[['malazgirt','Malazgirt 1071','⚔️']],arrows:[[44.8,39.4,40,39.3],[40,39.3,33,39]]}]},
{t:'İlk Türk beylikleri',h:'Malazgirt’ten sonra Anadolu’da ilk Türk beylikleri kuruldu: <b>Saltuklular</b> (Erzurum), <b>Mengücekliler</b> (Erzincan, Divriği), <b>Danişmentliler</b> (Sivas, Tokat), <b>Artuklular</b> (Diyarbakır, Mardin) ve ilk Türk donanmasını kuran <b>Çaka Beyliği</b> (İzmir).',v:['tr',{mk:[['erzurum','Saltuklu'],['erzincan','Mengücekli'],['tokat','Danişmentli'],['mardin','Artuklu'],['izmir','Çaka Beyliği']]}]},
{t:'Türkiye Selçuklu Devleti (1075)',h:'<b>Kutalmışoğlu Süleyman Şah</b> kurdu, ilk başkent <b>İznik</b> oldu. <b>Haçlı Seferleri</b> sırasında İznik kaybedilince başkent <b>Konya</b>’ya taşındı.',v:['tr',{mk:[['iznik','İznik (ilk başkent)'],['konya','Konya','🕌']],arrows:[[29.8,40.2,32.3,38.1]]}]},
{t:'Miryokefalon (1176) ve Kösedağ (1243)',h:'<b>II. Kılıç Arslan</b>, Miryokefalon’da Bizans’ı yendi; Bizans Anadolu’yu geri alma umudunu yitirdi ve <b>Anadolu’nun Türk yurdu olduğu kesinleşti</b>. <b>Kösedağ Savaşı</b>’nda ise Moğollara yenilen Türkiye Selçukluları zayıfladı, <b>Beylikler Dönemi</b> başladı.',v:['timeline',{ev:[['1040','Dandanakan','🏹'],['1071','Malazgirt','⚔️'],['1176','Miryokefalon','🛡️'],['1243','Kösedağ','🐎']]}]},
{t:'Ticaret ve kültür',h:'Selçuklular yollar üzerine <b>kervansaraylar</b> (Sultan Han gibi) yaptırdı; tüccarların malları devlet güvencesindeydi. Sinop, Antalya ve Alanya limanlarıyla deniz ticareti gelişti. <b>Ahilik</b> esnafı örgütledi; Anadolu cami ve medreselerle süslendi.',v:['icons',{items:[['🐫','Kervansaray'],['⚓','Liman ticareti'],['🧰','Ahilik'],['🕌','Cami ve medrese']],cols:2}],tip:'Divriği Ulu Camii ve Darüşşifası UNESCO Dünya Mirası Listesi’ndedir.'}
],
qs:[
{t:'mc',q:'Anadolu’nun kapılarını Türklere açan savaş hangisidir?',a:'Malazgirt Savaşı (1071)',o:['Miryokefalon Savaşı','Dandanakan Savaşı','Kösedağ Savaşı'],e:'<b>Malazgirt</b>, 1071.'},
{t:'mc',q:'Malazgirt’te Bizans ordusunu yenen Selçuklu sultanı kimdir?',a:'Alparslan',o:['Tuğrul Bey','Melikşah','II. Kılıç Arslan'],e:'<b>Alparslan</b>.'},
{t:'mc',q:'Anadolu’nun kesin olarak Türk yurdu olduğunu gösteren savaş hangisidir?',a:'Miryokefalon Savaşı (1176)',o:['Malazgirt Savaşı (1071)','Talas Savaşı (751)','Kösedağ Savaşı (1243)'],long:true,e:'<b>Miryokefalon</b> sonrası Bizans umudunu yitirdi.'},
{t:'order',q:'Savaşları eskiden yeniye sırala.',i:['Dandanakan (1040)','Malazgirt (1071)','Miryokefalon (1176)','Kösedağ (1243)'],e:'1040 → 1071 → 1176 → 1243.'},
{t:'match',q:'Beyliği merkeziyle eşleştir.',p:[['Saltuklular','Erzurum'],['Mengücekliler','Erzincan-Divriği'],['Danişmentliler','Sivas-Tokat'],['Artuklular','Diyarbakır-Mardin']],e:'İlk Türk beylikleri.'},
{t:'tf',q:'Türkiye Selçuklu Devleti’nin ilk başkenti İznik’tir.',a:true,e:'Doğru. Sonra başkent Konya oldu.'},
{t:'mc',q:'İlk Türk donanmasını kuran beylik hangisidir?',a:'Çaka Beyliği',o:['Saltuklular','Artuklular','Danişmentliler'],e:'İzmir merkezli <b>Çaka Beyliği</b>.'},
{t:'tf',q:'Kösedağ Savaşı’nda Moğollara yenilen Türkiye Selçuklu Devleti güçlendi.',a:false,e:'Yanlış. Devlet <b>zayıfladı</b> ve Beylikler Dönemi başladı.'},
{t:'mc',q:'Haçlı Seferleri sırasında Türkiye Selçuklularının başkenti nereye taşındı?',a:'Konya',o:['Sivas','Kayseri','Bursa'],e:'İznik kaybedilince başkent <b>Konya</b> oldu.'},
{t:'fill',q:'Türkiye Selçuklu Devleti’ni Kutalmışoğlu ___ Şah kurmuştur.',a:'Süleyman',o:['Alparslan','Melikşah','Tuğrul'],e:'Kutalmışoğlu <b>Süleyman Şah</b>, 1075.'},
{t:'mc',q:'Türkiye Selçukluları ticareti geliştirmek için yollar üzerine ne yaptırdı?',a:'Kervansaray',o:['Rasathane','Kale surları','Darphane'],e:'<b>Kervansaraylar</b> tüccarlara güvenli konaklama sağladı.'},
{t:'map',q:'Haritada <b>Konya</b>’ya dokun (Türkiye Selçuklularının başkenti).',v:['tr',{tap:true,mk:[['konya'],['istanbul'],['erzurum'],['izmir'],['sivas'],['antalya']]}],a:'konya',e:'Konya, İç Anadolu’dadır.'}
]}
]});
