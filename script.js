(function(){
const R='Student Rights · Positive',N='Student Rights · Protections',B='Student Responsibilities';
const S=[
['Introduction','Students’ Rights and Responsibilities Inside the Classroom','A classroom works when every student is protected, respected and accountable. Use the arrows or your keyboard to explore each right and responsibility.','star',220],
[R,'Quality Education','Every student is entitled to well-planned lessons, qualified teaching and the resources needed to learn effectively.','book',215],
[R,'Freedom of Respectful Expression','Students may share ideas, ask questions and disagree politely without fear of ridicule.','speak',195],
[R,'Equal Treatment','Students of every background take part equally and receive the same opportunities and attention.','equal',260],
[R,'A Safe Learning Environment','The classroom must be physically and emotionally safe, so that students can concentrate and thrive.','shield',200],
[R,'Privacy and Personal Dignity','Personal information and individual dignity are respected at all times.','lock',250],
[R,'Academic Support','Students can ask for extra explanations, feedback and guidance whenever they struggle.','help',180],
[R,'Classroom Participation','Every student may raise a hand, contribute to discussions and join learning activities.','hand',205],
[R,'Fair Assessment','Grades are based on clear criteria, applied consistently and explained transparently.','scale',230],
[N,'Protection From Bullying','No student should be intimidated, excluded or mocked; teachers act to protect those targeted.','shield2',275],
[N,'Protection From Discrimination','No student is treated unfairly because of origin, gender, belief, ability or appearance.','equal',285],
[N,'Protection From Physical and Verbal Abuse','Violence, threats, insults and humiliation are never acceptable in any classroom.','stop',350],
[N,'Protection of Personal Belongings','Bags, books and devices are safe from theft, damage and unauthorised searches.','bag',210],
[N,'Protection From Unfair Punishment','Discipline must be proportionate, explained and applied only after listening to the student.','scale',300],
[N,'Protection of Privacy','Grades, records and personal matters are never shared publicly without consent.','lock',265],
[N,'Freedom From Unjust Restrictions','Respectful opinions cannot be silenced without a fair and reasonable justification.','speak',240],
[B+' · Academic','Academic Responsibilities','Learning is a shared effort. Students are expected to:|Attend class regularly and arrive on time|Complete homework and assignments honestly|Bring books and materials every day|Listen actively and take part in lessons|Never cheat or copy the work of others','phoneless',215],
[B+' · Behavioral','Behavioral Responsibilities','Respect makes learning possible. Students are expected to:|Respect teachers, classmates and staff|Raise a hand before speaking|Follow classroom rules and instructions|Resolve conflicts peacefully|Never bully, mock or exclude others|Do not use mobile phones secretly during lessons','phone',190],
[B+' · Environmental','Environmental Responsibilities','A shared space needs shared care. Students are expected to:|Keep the classroom clean and tidy|Handle desks, books and equipment with care|Dispose of waste properly|Report damage to a teacher|Leave the room ready for the next class','trash',160],
[B+' · Digital','Digital Responsibilities','Technology serves learning when used wisely. Students are expected to:|Use devices only for approved activities|Keep phones silent and out of sight|Respect others’ privacy online|Never record or share photos without permission|Communicate kindly in every digital space','phone',200],
['Conclusion','Rights and Responsibilities Walk Together','When students know their rights and fulfil their responsibilities, the classroom becomes a place of trust, growth and respect.','star',230]];


/* PHOTO MANIFEST — all images are in the same folder */
const P=[
['arriving-at-school','Students walking into a school building together'],
['quality-education','Teacher explaining a lesson to attentive students'],
['free-expression','Student raising a hand to share an idea'],
['equal-treatment','Teacher engaging fairly with diverse students'],
['safe-environment','A bright and welcoming classroom'],
['privacy','Student writing privately in a notebook'],
['academic-support','Teacher helping a student with schoolwork'],
['participation','Students discussing a lesson together'],
['fair-assessment','Teacher reviewing a student’s written work'],
['bullying-protection','Student supporting a classmate'],
['no-discrimination','Students of different backgrounds studying together'],
['no-abuse','Teacher speaking respectfully with a student'],
['belongings','Student keeping books safely in a locker'],
['fair-discipline','Teacher listening carefully to a student'],
['privacy','Student privately reading a report card'],
['free-expression','Student speaking during a class discussion'],
['academic-responsibility','Student studying and doing homework'],
['behavior','Students listening attentively to their teacher'],
['environment','Students cleaning their classroom'],
['digital-responsibility','Student using a smartphone in class'],
['conclusion','Teacher and students smiling together']
].map(p=>({
  src:p[0]+'.jpg',
  brief:p[1]
}));

].map(p=>({src:p[0]+'.jpg',brief:p[1]}));
function art(d,n){const p=P[n];return `<img src="${p.src}" alt="${p.brief}" decoding="async" ${n?'loading="lazy"':''}><div class="ph"><span>Photograph</span><p>${p.brief}</p></div>`}
document.addEventListener('error',e=>{if(e.target.tagName=='IMG'&&e.target.closest('.art'))e.target.closest('.art').classList.add('missing')},true);
document.addEventListener('load',e=>{if(e.target.tagName=='IMG'&&e.target.closest('.art'))e.target.closest('.art').classList.add('ready')},true);
const slide=document.getElementById('slide'),cur=document.getElementById('cur'),bar=document.getElementById('bar');
document.getElementById('tot').textContent=String(S.length).padStart(2,'0');
let i=0,busy=false;
function render(n){const d=S[n],parts=d[2].split('|'),body=parts.length>1?`<p>${parts[0]}</p><ul>${parts.slice(1).map(x=>`<li>${x}</li>`).join('')}</ul>`:`<p>${d[2]}</p>`;
slide.innerHTML=`<div class="art">${art(d,n)}</div><div class="txt"><span class="tag">${d[0]}</span>${n==0?'<h1>':'<h2>'}${d[1]}${n==0?'</h1>':'</h2>'}${body}</div>`;
cur.textContent=String(n+1).padStart(2,'0');bar.style.width=((n+1)/S.length*100)+'%'}
function go(n){if(busy||n<0||n>=S.length||n==i)return;busy=true;blip(n>i?520:420);
gsap.to(slide,{scale:.5,z:-600,opacity:0,filter:'blur(14px)',duration:.55,ease:'power2.in',onComplete(){i=n;render(n);
gsap.fromTo(slide,{scale:.35,z:-700,opacity:0,filter:'blur(16px)'},{scale:1,z:0,opacity:1,filter:'blur(0px)',duration:.95,ease:'power3.out',onComplete(){busy=false}})}})}
render(0);gsap.from(slide,{scale:.4,z:-700,opacity:0,filter:'blur(14px)',duration:1.2,ease:'power3.out'});
document.getElementById('next').onclick=()=>go(i+1);document.getElementById('prev').onclick=()=>go(i-1);
addEventListener('keydown',e=>{if(e.key=='ArrowRight'||e.key=='ArrowDown'||e.key==' ')go(i+1);if(e.key=='ArrowLeft'||e.key=='ArrowUp')go(i-1)});
let tx=0;addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>60)go(i+(dx<0?1:-1))});
addEventListener('mousemove',e=>{const a=document.querySelector('.art');if(a&&!busy)gsap.to(a,{rotationY:(e.clientX/innerWidth-.5)*10,rotationX:-(e.clientY/innerHeight-.5)*8,duration:.8,overwrite:'auto'})});

/* Audio: generated, starts only after the toggle is clicked */
let ac,on=false,master;const sb=document.getElementById('snd');
function blip(f){if(!on)return;const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(f,ac.currentTime);o.frequency.exponentialRampToValueAtTime(f*1.6,ac.currentTime+.25);g.gain.setValueAtTime(.0001,ac.currentTime);g.gain.exponentialRampToValueAtTime(.12,ac.currentTime+.03);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.4);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+.45)}
sb.onclick=()=>{if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=0;const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=600;master.connect(lp).connect(ac.destination);
[110,164.8,220,277.2].forEach((f,k)=>{const o=ac.createOscillator(),g=ac.createGain();o.type=k%2?'triangle':'sine';o.frequency.value=f;o.detune.value=k*4;g.gain.value=.05;const l=ac.createOscillator(),lg=ac.createGain();l.frequency.value=.07+k*.03;lg.gain.value=.03;l.connect(lg).connect(g.gain);o.connect(g).connect(master);o.start();l.start()})}
on=!on;ac.resume();master.gain.linearRampToValueAtTime(on?.8:0,ac.currentTime+1);sb.setAttribute('aria-pressed',on);if(on)blip(660)};
document.querySelectorAll('.arrow').forEach(b=>b.addEventListener('mouseenter',()=>blip(900)));

/* Three.js depth field: wireframe crystals that react to the pointer and to page changes */
if(window.THREE){const cv=document.getElementById('bg'),r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true}),sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.1,100);cam.position.z=14;
const grp=new THREE.Group();sc.add(grp);const cols=[0x2f7bff,0x38e1ff,0x8b6cff];
for(let k=0;k<46;k++){const m=new THREE.Mesh(k%2?new THREE.IcosahedronGeometry(1,0):new THREE.OctahedronGeometry(1,0),new THREE.MeshBasicMaterial({color:cols[k%3],wireframe:true,transparent:true,opacity:.28}));
const a=Math.random()*6.28,rad=7+Math.random()*9;m.position.set(Math.cos(a)*rad,(Math.random()-.5)*14,-Math.random()*26+4);m.scale.setScalar(.2+Math.random()*.9);m.userData.s=.002+Math.random()*.006;grp.add(m)}
let mx=0,my=0;addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function rs(){const dp=Math.min(devicePixelRatio,2);r.setPixelRatio(dp);r.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}rs();addEventListener('resize',rs);
(function loop(){grp.children.forEach(m=>{m.rotation.x+=m.userData.s;m.rotation.y+=m.userData.s*1.3});
cam.position.x+=(mx*3-cam.position.x)*.04;cam.position.y+=(-my*2-cam.position.y)*.04;cam.position.z+=((14-i*.35)-cam.position.z)*.03;cam.lookAt(0,0,0);r.render(sc,cam);requestAnimationFrame(loop)})()}
})();
