const TILT=22,$=s=>document.querySelector(s);
const CATS={p:{n:'Мирні ролі',c:'#d65a5a',s:'♥'},b:{n:'Чорні ролі',c:'#b3202f',s:'♠'},n:{n:'Нейтральні ролі',c:'#a99ad6',s:'♦'},s:{n:'Святкові та спеціальні ролі',c:'#d4b46a',s:'♣'}};
const WIN={'Мирні':'Вигнати всю мафію та небезпечних одинаків — місто перемагає.','Мафія':'Зрівняти кількість мафії з кількістю решти гравців.'};
const mk=(c,e,n,d,r,o)=>Object.assign({c,e,n,d,r},o);
// ===== Список ролей: редагуйте описи, категорії, команди й умови перемоги тут =====
const R=[
mk('p','🕵️‍♂️','Слідчий','Уночі може дізнатися роль одного з гравців або вбити когось наосліп. Зазвичай бере на себе керування грою, спираючись на перевірених гравців і маючи пістолет справедливості.',['Нічна дія: перевірка ролі або постріл наосліп.']),
mk('p','👮‍♂️','Сержант','Допомагає Слідчому наводити порядок у місті. Знає ролі гравців, перевірених Слідчим. Якщо Слідчий помирає, Сержант посідає його місце.',['Знає результати перевірок Слідчого.','Після смерті Слідчого займає його місце.']),
mk('p','👨‍⚕️','Лікар','Уночі може відвідати одного з учасників і врятувати йому життя. Один раз за гру може вилікувати самого себе.',['Самолікування — лише один раз за гру.']),
mk('p','🍻','Волоцюга','Ходить по домівках у пошуках випивки. Може стати свідком убивства та дізнатися ім’я вбивці, але не його роль. Убивцею може виявитися не лише Дон чи Маніяк, а й Слідчий або Лікар.',['Бачить ім’я вбивці, але не його роль.']),
mk('p','🫦','Повія','Може відволікти будь-якого персонажа на цілу ніч. Якщо відвідує Дона або Маніяка, блокує їхні дії. Проте якщо Дон знаходить Повію, її блокування на нього не діє.',['Блокує нічні дії відвіданого гравця.','Якщо Дон знаходить Повію, блокування на нього не діє.']),
mk('p','👨','Мирний житель','Уночі спить, а вдень намагається визначити поганих персонажів і вигнати їх голосуванням. Не має особливих нічних здібностей, але його голос може бути вирішальним.'),
mk('p','💣','Камікадзе','Удень і вночі поводиться як звичайний Мирний житель. Якщо його лінчують, може обрати одного з гравців, підкласти вибухівку в його дім і забрати його із собою.',['Спрацьовує лише після лінчування.']),
mk('p','🤞','Щасливчик','Мирна роль із додатковим шансом на порятунок. Повинен допомогти місту знайти мафію. Один раз за гру під час замаху може залишитися живим із шансом 50%.',['Один раз за гру: шанс вижити після замаху — 50%.']),
mk('p','👩‍💻','Журналістка','Уночі бере інтерв’ю у двох жителів міста та аналізує їхні відповіді. Може визначити, чи належать вони до однієї команди, якщо її дію ніхто не збаламутить.',['Дію можна збити іншою нічною роллю.']),
mk('p','🎅','Миколай','Зимова святкова роль. Уночі може залишити будь-якому гравцеві 10 гривників або різку.',['Нічна дія: подарунок (10 гривників) або різка.'],{s:'Зима (святкова роль)',a:'#6fa8dc'}),
mk('b','🤵‍♂️','Дон','Глава мафії. Уночі шукає важливі активні ролі, щоб усунути їх і допомогти своїй команді перемогти. Повинен бути обережним, щоб не залишити слідів для Слідчого.'),
mk('b','👩🏽','Домініка','Дружина Дона, яка грає за Мафію. Доступна в іграх від 12 гравців. Поки Дон живий, відволікає інших персонажів від їхніх нічних дій. Після його смерті сама стає Доном і може помститися за нього. Не любить Повію та через емоції може видати себе іншим ролям.',['Доступна в іграх від 12 гравців.','Після смерті Дона сама стає Доном.']),
mk('b','🧔‍♂️','Мафія','Виконує вказівки Дона та допомагає команді вбивати суперників. Якщо Дон помирає, один із відповідних гравців посідає його місце й продовжує керувати мафією.'),
mk('b','🧰','Адвокат','Грає за Мафію. Якщо в одну ніч із перевіркою Слідчого обирає мафіозі, може захистити його від викриття: Слідчий побачить Мирного жителя. Адвокат не має списку союзників, тому повинен самостійно визначати потенційних чорних гравців.',['Не знає своїх союзників.']),
mk('b','🎭','Баламут','Грає за Мафію. Може захистити союзника від перевірки та підставити мирного гравця. Якщо Баламут відвідує когось тієї самої ночі, коли його перевіряє Слідчий, результат може показати чорну роль.'),
mk('n','🔌🛁','Самогубець','За правилами цієї версії грає за Мафію, але його мета — заплутувати місто й домогтися власного вигнання під час денного голосування. Може видавати себе за Слідчого, Волоцюгу або іншу роль.',['Команда — Мафія, але мета особиста.'],{t:'Мафія',w:'Домогтися власного вигнання під час денного голосування.'}),
mk('n','🪓','Маніяк','Грає сам за себе. Для перемоги повинен стежити за діями Мирних і Мафії та використовувати боротьбу між ними на власну користь.',null,{t:'Сам за себе',w:'Залишитися останнім, використавши боротьбу Мирних і Мафії.'}),
mk('n','🪄','Чаклун','Його неможливо вбити вночі. Якщо хтось відвідує Чаклуна або сили однієї команди значно переважають інші, він може розпочати власне полювання.',['Нічне вбивство на нього не діє.'],{t:'Сам за себе',w:'Виграти власне полювання та пережити протистояння команд.'}),
mk('n','🔪','Джек-Різник','Полює на Повію та перемагає, якщо вбиває її. Якщо Повію вбиває інший персонаж раніше, Джек змінює мету й полює на її вбивцю.',['Якщо Джек відвідує Лікаря, він отримує його інструменти та навички: рятує інших і ховає роль від перевірки Слідчого.','Джек із навичками Лікаря та Повія одночасно відвідують гравця — шанс його загибелі дорівнює нулю.','Якщо Джек і Слідчий разом відвідують одного гравця, Слідчий вішає Джека наступного дня.','Після вбивства Повії Джек залишає червоні мітки, які Слідчий бачить наступної ночі. Серед позначених буде Джек.'],{t:'Сам за себе',w:'Убити Повію (або її вбивцю, якщо Повію вбив хтось інший).'}),
mk('s','😈','Крампус','Зимова роль, яка полює на Святого Миколая. Перемагає, якщо вбиває його. Іншим гравцям роздає подарунки, що можуть накладати прокляття: отримувачі матимуть шанс померти щоночі в наступній грі. Якщо Миколай убиває Крампуса, прокляття спадають із наступної ночі.',null,{t:'Сам за себе',w:'Убити Святого Миколая.',s:'Зима',a:'#c0563a'}),
mk('s','🧝‍♀️','Мавка','Особлива великодня роль. Може грати за різні команди та перемагає разом з останньою командою, яку обрала. Зупинити її може лише часник.',['За Мирних перевіряє випадкового гравця.','За Мафію випадково вбиває всіх, окрім членів мафії.','Може самостійно обирати жертву, як Маніяк.'],{t:'Змінна',w:'Перемогти разом з останньою обраною командою.',s:'Великдень',a:'#5fae6e'}),
mk('s','🐶','Пес Патрон','Роль до Дня Незалежності. Забирає всі міни собі та отримує за них бонус. Його голос на денному голосуванні рахується за два. Для перемоги повинен вижити.',['Голос на денному голосуванні рахується за два.'],{t:'Особиста мета',w:'Вижити.',s:'День Незалежності',a:'#e3c640'}),
mk('s','💀','Смерть','Роль до Гелловіну. Гравець може спробувати відкупитися цукерками. Якщо Смерть перебуває в доброму настрої, вона захищає його, а якщо ні — накладає прокляття, яке знімає бафи та змушує мовчати.',['Відкуп цукерками: захист або прокляття.'],{t:'Особиста мета',w:'Умови визначає подія Гелловін.',s:'Гелловін',a:'#e0833a'}),
mk('s','💘','Амур','Роль до Дня закоханих. Шукає пару закоханих і перемагає разом із нею, якщо знаходить. Усі гравці, яких відвідує Амур, отримують троянди.',null,{t:'Закохані',w:'Знайти пару закоханих і перемогти разом із нею.',s:'День закоханих',a:'#e0577d'}),
mk('s','🎂','Іменинник','Роль до дня народження MafiaUA. Повинен роздати торти певній кількості гравців. Ті отримують приємні бонуси, а Іменинник святкує день народження.',null,{t:'Особиста мета',w:'Роздати торти потрібній кількості гравців.',s:'День народження MafiaUA',a:'#e89b3c'})
];
R.forEach((r,i)=>{r.id=i;r.t=r.t||{p:'Мирні',b:'Мафія',n:'Нейтральна',s:'Особлива'}[r.c];r.w=r.w||WIN[r.t];r.a=r.a||CATS[r.c].c});
// ===================================================================================
const body=document.body,scene=$('#scene'),cam=$('#cam'),plane=$('#plane'),roles=$('#roles'),info=$('#info'),tag=$('#tag'),cm=$('#cm'),ov=$('#ov'),title=$('#title'),fin=$('#fin'),fl=$('#fl');
const S={intro:true,busy:false,allUp:false,sel:null,top:0},G={w:1,h:1,cw:80,ch:112},TM=[];
let drag=null,lp=0,tt=0;
const L=(f,ms)=>TM.push(setTimeout(f,ms)),stopAll=()=>{TM.forEach(clearTimeout);TM.length=0;S.busy=false};
const isM=()=>innerWidth<=760;
// ---- звук (WebAudio, без файлів) ----
let AC,MG,mute=false;
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=mute?0:1;MG.connect(AC.destination);[48,48.7].forEach(f=>{const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.value=.04;o.connect(g).connect(MG);o.start()})}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function nz(d,f,v,q){if(!AC||mute)return;const n=AC.sampleRate*d|0,b=AC.createBuffer(1,n,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);const s=AC.createBufferSource(),fi=AC.createBiquadFilter(),g=AC.createGain();s.buffer=b;fi.type='bandpass';fi.frequency.value=f;fi.Q.value=q;g.gain.value=v;s.connect(fi).connect(g).connect(MG);s.start()}
function tn(f,d,v,t){if(!AC||mute)return;const o=AC.createOscillator(),g=AC.createGain();o.type=t;o.frequency.value=f;g.gain.setValueAtTime(v,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(g).connect(MG);o.start();o.stop(AC.currentTime+d)}
const sfx={flip:()=>nz(.09,3000,.5,.8),whoosh:()=>nz(.5,700,.6,.5),zap:()=>{nz(.25,1800,.7,.3);tn(70,.25,.25,'sawtooth')},pick:()=>tn(440,.08,.1,'triangle')};
// ---- дим (canvas) ----
const cv=$('#smoke'),cx=cv.getContext('2d');let amt=0,tgt=0,P=[];
function szS(){cv.width=innerWidth/2|0;cv.height=innerHeight/2|0;const n=isM()?14:30;P=Array.from({length:n},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:70+Math.random()*130,vx:(Math.random()-.5)*.35,vy:-.1-Math.random()*.25,a:.25+Math.random()*.3,red:Math.random()<.3,ph:Math.random()*6}))}
function loop(t){amt+=(tgt-amt)*.02;cx.clearRect(0,0,cv.width,cv.height);if(amt>.01)P.forEach(p=>{p.x+=p.vx+Math.sin(t/1500+p.ph)*.2;p.y+=p.vy;if(p.y<-p.r)p.y=cv.height+p.r;if(p.x<-p.r)p.x=cv.width+p.r;if(p.x>cv.width+p.r)p.x=-p.r;const col=p.red?'130,14,28':'40,33,36',g=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);g.addColorStop(0,`rgba(${col},${p.a*amt*(p.red?.5:1)})`);g.addColorStop(1,`rgba(${col},0)`);cx.fillStyle=g;cx.fillRect(p.x-p.r,p.y-p.r,p.r*2,p.r*2)});requestAnimationFrame(loop)}
// ---- карти ----
const cards=R.map((r,i)=>{const el=document.createElement('div');el.className='card dn';el.innerHTML='<div class="inner"><div class="face front"></div><div class="face back"><i>♠</i><b>MAFIA</b></div></div>';plane.appendChild(el);const c={el,i,role:i,x:.5,y:.5,r:0,lz:0,s:1,dn:true,up:false,ux:.5,uy:.5,o:i,drag:false};el._c=c;return c});
function paint(c){const r=R[c.role],k=CATS[r.c].s;c.el.style.setProperty('--ac',r.a);c.el.querySelector('.front').innerHTML=`<span class="su">${k}</span><span class="em">${r.e}</span><span class="nm">${r.n}</span><span class="tm">${r.t}</span><span class="su sb">${k}</span>`}
function render(c){const W=G.w-G.cw,H=G.h-G.ch,u=c.up,x=(u?c.ux:c.x)*W,y=(u?c.uy:c.y)*H,sl=S.sel===c,z=c.drag?70:u?60+c.o*.1:sl?20:c.lz+c.o*.2,s=c.s*(sl?1.1:1)*(c.drag?1.06:1),k=c.el.classList;
c.el.style.transform=`translate3d(${x}px,${y}px,${z}px) rotateX(${u?-TILT:0}deg) rotateZ(${u?0:c.r}deg) scale(${s})`;k.toggle('dn',c.dn);k.toggle('sel',sl);k.toggle('drag',c.drag);k.toggle('lift',u||c.lz>0)}
const renderAll=()=>cards.forEach(render);
function snap(f){plane.classList.add('nt');f();void plane.offsetWidth;plane.classList.remove('nt')}
function stag(){cards.forEach((c,k)=>c.el.style.transitionDelay=k*14+'ms');clearTimeout(tt);tt=setTimeout(()=>cards.forEach(c=>c.el.style.transitionDelay=''),1100)}
function fit(){G.w=plane.offsetWidth;G.h=plane.offsetHeight;G.cw=Math.max(52,Math.min(100,Math.sqrt(G.w*G.h*.42/35)));G.ch=G.cw*1.4;plane.style.setProperty('--cw',G.cw+'px');if(S.allUp)layoutUp();renderAll()}
function scatter(){const n=R.length,cols=Math.ceil(Math.sqrt(n*G.w/G.h)),rows=Math.ceil(n/cols),cl=v=>Math.max(0,Math.min(1,v)),ix=[...Array(n).keys()].sort(()=>Math.random()-.5),out=[];
ix.forEach((k,j)=>{const gx=(j%cols+.5)/cols+(Math.random()-.5)*.9/cols,gy=(Math.floor(j/cols)+.5)/rows+(Math.random()-.5)*.9/rows;out[k]={x:cl((gx-.5)*.96+.5),y:cl((gy-.5)*.96+.5),r:(Math.random()-.5)*80}});return out}
function layoutUp(){const n=cards.length,cols=G.w>=700?9:5,rows=Math.ceil(n/cols),cw=G.w/cols,ch=G.h/(rows+.4),s=Math.min(1.5,cw*.96/G.cw,ch*.9/G.ch),cl=v=>Math.max(0,Math.min(1,v));
cards.forEach((c,k)=>{if(!c.up)return;const row=Math.floor(k/cols),cnt=row===rows-1?n-row*cols:cols,px=(k%cols+.5)*cw-G.cw/2+(cols-cnt)*cw/2,py=(row+.9)*ch-G.ch/2;c.ux=cl(px/(G.w-G.cw));c.uy=cl(py/(G.h-G.ch));c.s=s;c.o=k})}
// ---- вибір / панель ----
function tagUpd(c){const r=R[c.role];tag.textContent=`Карта №${c.i+1} · ${r.e} ${r.n}`;tag.classList.add('show')}
function select(c){const p=S.sel;S.sel=c;if(p)render(p);if(c){c.o=++S.top;render(c);tagUpd(c);showInfo(c.role);sfx.pick()}else tag.classList.remove('show')}
function showInfo(id){const r=R[id];info.querySelector('.bd').innerHTML=`<div class="ph" style="--ac:${r.a}">${r.img?`<img src="${r.img}" alt="">`:r.e}</div><h2>${r.n}</h2><div class="tg" style="--ac:${CATS[r.c].c}"><span>${CATS[r.c].n}</span><span>Команда: ${r.t}</span>${r.s?`<span class="se">🎉 ${r.s}</span>`:''}</div><h3>Опис</h3><p>${r.d}</p><h3>Особливі правила</h3>${r.r?`<ul>${r.r.map(x=>`<li>${x}</li>`).join('')}</ul>`:'<p>Додаткових особливих правил немає.</p>'}<h3>Умова перемоги</h3><p>${r.w}</p>${r.s?`<h3>Святкова подія</h3><p>${r.s}</p>`:''}`;info.classList.add('show');roles.querySelectorAll('.ro').forEach(b=>b.classList.toggle('on',+b.dataset.id===id))}
function assign(id,c){c.role=id;paint(c);c.el.classList.remove('pulse');void c.el.offsetWidth;c.el.classList.add('pulse');if(S.sel===c)tagUpd(c);showInfo(id);sfx.flip()}
Object.keys(CATS).forEach(k=>{const d=document.createElement('div');d.style.setProperty('--cc',CATS[k].c);const rs=R.filter(r=>r.c===k);d.innerHTML=`<button class="ch"><span>${CATS[k].s} ${CATS[k].n}</span><em>${rs.length}</em><i>▾</i></button><div class="cl">${rs.map(r=>`<button class="ro" data-id="${r.id}"><span class="re">${r.e}</span><span>${r.n}</span><small>${r.t}</small></button>`).join('')}</div>`;d.querySelector('.ch').onclick=()=>d.classList.toggle('shut');roles.appendChild(d)});
roles.addEventListener('click',e=>{const b=e.target.closest('.ro');if(!b||S.intro)return;const id=+b.dataset.id;if(S.sel)assign(id,S.sel);else{showInfo(id);toast('Оберіть карту, щоб призначити їй цю роль')}if(isM())roles.classList.remove('open')});
$('#ix').onclick=()=>info.classList.remove('show');
let tm2=0;function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(tm2);tm2=setTimeout(()=>e.classList.remove('show'),3800)}
// ---- дії над картами ----
const flip=c=>{c.dn=!c.dn;render(c);sfx.flip()};
const toggleUp=c=>{c.up=!c.up;if(c.up){c.ux=c.x;c.uy=c.y;c.s=1.25;c.dn=false}else c.s=1;render(c);sfx.whoosh()};
const back=c=>{c.up=false;c.s=1;c.dn=false;render(c);sfx.whoosh()};
function raiseAll(tg){if(S.intro||S.busy)return;if(tg&&S.allUp)return lowerAll();S.allUp=true;select(null);cards.forEach(c=>{c.up=true;c.dn=false});layoutUp();stag();renderAll();sfx.whoosh()}
function lowerAll(){if(S.intro||S.busy)return;S.allUp=false;stag();cards.forEach(c=>{c.up=false;c.s=1;c.dn=false;render(c)});sfx.whoosh()}
function shuffle(){if(S.intro||S.busy)return;S.busy=true;select(null);S.allUp=false;stag();cards.forEach(c=>{c.up=false;c.s=1;c.dn=true;c.x=c.y=.5;c.r=(Math.random()-.5)*10;render(c)});sfx.whoosh();
L(()=>{const ids=cards.map(c=>c.role).sort(()=>Math.random()-.5),lay=scatter();stag();cards.forEach((c,k)=>{c.role=ids[k];paint(c);Object.assign(c,lay[k]);c.dn=false;render(c)});sfx.whoosh()},800);L(()=>S.busy=false,2300)}
function reset(){if(S.intro)return;stopAll();select(null);closeCm();info.classList.remove('show');S.allUp=false;stag();const lay=scatter();cards.forEach((c,k)=>{c.role=c.i;paint(c);Object.assign(c,lay[k],{up:false,dn:false,s:1,lz:0});render(c)});sfx.whoosh()}
function closeCm(){cm.classList.remove('show')}
function cardMenu(c,x,y){select(c);const it=[[c.dn?'👁 Відкрити карту':'🔄 Перевернути',()=>flip(c)],[c.up?'⬇ Опустити на стіл':'⬆ Підняти над столом',()=>toggleUp(c)],['↩ Повернути на стіл',()=>back(c)],['📖 Опис ролі',()=>showInfo(c.role)],['⟲ Скинути роль карти',()=>assign(c.i,c)]];
cm.innerHTML='';it.forEach(([t,f])=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{closeCm();f()};cm.appendChild(b)});cm.classList.add('show');cm.style.left=Math.max(4,Math.min(x,innerWidth-cm.offsetWidth-6))+'px';cm.style.top=Math.max(4,Math.min(y,innerHeight-cm.offsetHeight-6))+'px'}
// ---- миша / дотик ----
const lpClear=()=>{clearTimeout(lp);lp=0};
scene.addEventListener('pointerdown',e=>{if(S.intro||S.busy||e.button===2)return;ac();closeCm();lpClear();const el=e.target.closest('.card'),c=el&&el._c,touch=e.pointerType!=='mouse';
if(!c){select(null);if(touch)lp=setTimeout(()=>raiseAll(true),550);return}
drag={c,sx:e.clientX,sy:e.clientY,ox:c.up?c.ux:c.x,oy:c.up?c.uy:c.y,moved:false};
if(touch)lp=setTimeout(()=>{if(drag&&!drag.moved){cardMenu(c,e.clientX,e.clientY);drag=null}},550);
try{scene.setPointerCapture(e.pointerId)}catch(_){}});
addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.sx,dy=e.clientY-drag.sy,c=drag.c;if(!drag.moved){if(Math.hypot(dx,dy)<6)return;drag.moved=true;lpClear();c.drag=true;c.o=++S.top}
const nx=Math.max(0,Math.min(1,drag.ox+dx/(G.w-G.cw))),ny=Math.max(0,Math.min(1,drag.oy+dy/Math.cos(TILT*Math.PI/180)/(G.h-G.ch)));if(c.up){c.ux=nx;c.uy=ny}else{c.x=nx;c.y=ny}render(c)});
const upH=e=>{lpClear();if(!drag)return;const{c,moved}=drag;drag=null;if(moved){c.drag=false;render(c);sfx.flip()}else if(e.type==='pointerup')select(c)};
addEventListener('pointerup',upH);addEventListener('pointercancel',upH);
addEventListener('pointerdown',e=>{if(!e.target.closest('#cm'))closeCm()},true);
scene.addEventListener('contextmenu',e=>{e.preventDefault();if(S.intro||S.busy||(e.pointerType&&e.pointerType!=='mouse'))return;ac();const el=e.target.closest('.card');if(el)cardMenu(el._c,e.clientX,e.clientY);else{closeCm();raiseAll(true)}});
scene.addEventListener('dblclick',e=>{const el=e.target.closest('.card');if(el&&!S.intro&&!S.busy)flip(el._c)});
addEventListener('keydown',e=>{if(e.key==='Escape'){closeCm();info.classList.remove('show');select(null)}});
// ---- вступ ----
function intro(){stopAll();S.intro=true;S.allUp=false;S.sel=null;tag.classList.remove('show');info.classList.remove('show');closeCm();body.classList.add('intro');ov.className='';title.classList.remove('on');fin.classList.remove('on');fl.style.opacity=0;scene.classList.remove('gl');tgt=0;
snap(()=>{cam.style.transition='none';cam.style.transform='translateZ(-260px)';cards.forEach(c=>{Object.assign(c,{role:c.i,x:.5,y:.5,r:(Math.random()-.5)*8,dn:true,up:false,s:1,lz:0,o:c.i});paint(c);render(c)})});
L(()=>title.classList.add('on'),500);
L(()=>{title.classList.remove('on');tgt=1},3000);
L(()=>{ov.classList.add('open');cam.style.transition='transform 6s cubic-bezier(.2,.6,.2,1)';cam.style.transform='translateZ(90px)'},3600);
L(fly,4700);L(flicker,7000);
L(()=>{fin.classList.remove('on');ov.classList.remove('dim');cam.style.transition='transform 1.6s ease';cam.style.transform='translateZ(0)'},9900);
L(end,10900)}
function fly(){const lay=scatter(),ord=[...cards.keys()].sort(()=>Math.random()-.5);ord.forEach((k,j)=>{const c=cards[k];L(()=>{c.lz=150;c.dn=false;Object.assign(c,lay[k]);c.r=lay[k].r+(Math.random()<.5?-1:1)*(120+Math.random()*200);render(c);if(j%4===0)sfx.whoosh();L(()=>{c.lz=0;c.r=lay[k].r;render(c);if(j%3===0)sfx.flip()},650)},j*50)})}
function flicker(){[[0,'r'],[110,0],[190,'w'],[260,0],[380,'r'],[470,0],[560,'w'],[640,0],[760,'r'],[900,0],[1000,'w'],[1700,0]].forEach(([t,k])=>L(()=>{if(k){fl.style.background=k==='r'?'#5c0012':'repeating-linear-gradient(0deg,#cfc8c8 0 3px,#8f8a8a 3px 5px)';fl.style.opacity=k==='r'?.6:.42;scene.classList.add('gl');sfx.zap()}else{fl.style.opacity=0;scene.classList.remove('gl')}},t));
L(()=>{fin.classList.add('on');ov.classList.add('dim')},1000)}
function end(){S.intro=false;body.classList.remove('intro');tgt=.22;toast(matchMedia('(pointer:coarse)').matches?'Дотик — вибір · утримання карти — меню · утримання столу — підняти карти':'ПКМ по столу — підняти карти · ПКМ по карті — меню · перетягуйте мишкою')}
function skip(){if(!S.intro)return;stopAll();snap(()=>{const lay=scatter();cards.forEach((c,k)=>{Object.assign(c,lay[k],{role:c.i,dn:false,lz:0,up:false,s:1});paint(c);render(c)});cam.style.transition='none';cam.style.transform='translateZ(0)'});title.classList.remove('on');fin.classList.remove('on');fl.style.opacity=0;scene.classList.remove('gl');ov.classList.remove('dim');ov.classList.add('open');end()}
// ---- кнопки ----
$('#bI').onclick=()=>{ac();intro()};$('#skip').onclick=skip;
$('#bU').onclick=()=>{ac();raiseAll(false)};$('#bR').onclick=()=>{ac();lowerAll()};$('#bS').onclick=()=>{ac();shuffle()};$('#bZ').onclick=()=>{ac();reset()};
$('#bM').onclick=()=>{ac();mute=!mute;if(MG)MG.gain.value=mute?0:1;$('#bM').textContent=mute?'🔇':'🔊'};
$('#bA').onclick=()=>{if(S.intro)return;S.sel?cardMenu(S.sel,innerWidth/2-100,innerHeight/3):toast('Спочатку торкніться карти')};
$('#bP').onclick=()=>roles.classList.toggle('open');
addEventListener('resize',()=>{fit();szS()});
// ---- старт ----
let n=0;$('#h1').innerHTML='ЛАСКАВО ПРОСИМО ДО МАФІЇ'.split(' ').map(w=>`<b class="w">${[...w].map(ch=>`<span style="animation-delay:${n++*70}ms">${ch}</span>`).join('')}</b>`).join(' ');
cards.forEach(paint);szS();fit();requestAnimationFrame(loop);intro();
