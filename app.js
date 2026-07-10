const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const pages=$$('.page'), navButtons=$$('[data-go]'), roleButtons=$$('.role-nav button');
function go(id){
  pages.forEach(p=>p.classList.toggle('active',p.id===id));
  roleButtons.forEach(b=>b.classList.toggle('active',b.dataset.go===id));
  $('#roleNav').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}
navButtons.forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
$('#menuBtn').addEventListener('click',()=>$('#roleNav').classList.toggle('open'));

const days=[
 {label:'اليوم 1',range:'الآيات 1–2',verses:[1,2],text:'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ'},
 {label:'اليوم 2',range:'الآية 3',verses:[3],text:'اقْرَأْ وَرَبُّكَ الْأَكْرَمُ'},
 {label:'اليوم 3',range:'الآيات 4–5',verses:[4,5],text:'الَّذِي عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ'},
 {label:'اليوم 4',range:'الآية 6',verses:[6],text:'كَلَّا إِنَّ الْإِنسَانَ لَيَطْغَىٰ'},
 {label:'اليوم 5',range:'الآيات 7–8',verses:[7,8],text:'أَن رَّآهُ اسْتَغْنَىٰ ۝ إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰ'},
 {label:'اليوم 6',range:'الآية 9 + مراجعة',verses:[9],text:'أَرَأَيْتَ الَّذِي يَنْهَىٰ'},
 {label:'اليوم 7',range:'الآية 10',verses:[10],text:'عَبْدًا إِذَا صَلَّىٰ'},
 {label:'اليوم 8',range:'الآيات 11–12',verses:[11,12],text:'أَرَأَيْتَ إِن كَانَ عَلَى الْهُدَىٰ ۝ أَوْ أَمَرَ بِالتَّقْوَىٰ'},
 {label:'اليوم 9',range:'الآية 13 + مراجعة',verses:[13],text:'أَرَأَيْتَ إِن كَذَّبَ وَتَوَلَّىٰ'},
 {label:'اليوم 10',range:'الآية 14',verses:[14],text:'أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ'},
 {label:'اليوم 11',range:'الآية 15',verses:[15],text:'كَلَّا لَئِن لَّمْ يَنتَهِ لَنَسْفَعًا بِالنَّاصِيَةِ'},
 {label:'اليوم 12',range:'الآية 16 + مراجعة',verses:[16],text:'نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ'},
 {label:'اليوم 13',range:'الآية 17',verses:[17],text:'فَلْيَدْعُ نَادِيَهُ'},
 {label:'اليوم 14',range:'الآية 18',verses:[18],text:'سَنَدْعُ الزَّبَانِيَةَ'},
 {label:'اليوم 15',range:'الآية 19 + مراجعة',verses:[19],text:'كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِب'}
];
const daySelect=$('#daySelect'), verseText=$('#verseText'), planList=$('#planList'), player=$('#husaryPlayer');
days.forEach((d,i)=>daySelect.add(new Option(`${d.label} — ${d.range}`,i)));
planList.innerHTML=days.map((d,i)=>`<div class="plan-item ${i===0?'active':''}" data-day="${i}"><span>${d.label}: ${d.range}</span><span>${i<3?'مفتوح':'قريبًا'}</span></div>`).join('');
function verseUrl(v){return `https://everyayah.com/data/Husary_128kbps/096${String(v).padStart(3,'0')}.mp3`}
let playlist=[], playIndex=0, repeatsLeft=0;
function setDay(i){
 const d=days[i]; verseText.textContent=d.text; playlist=d.verses.map(verseUrl); player.src=playlist[0];
 $$('.plan-item').forEach((p,n)=>p.classList.toggle('active',n===Number(i)));
}
daySelect.addEventListener('change',e=>setDay(e.target.value));
setDay(0);
function playSequence(repeats=1){playlist=days[daySelect.value].verses.map(verseUrl); playIndex=0; repeatsLeft=repeats; player.src=playlist[0]; player.play().catch(()=>alert('تعذر تشغيل الصوت. تأكدي من اتصال الإنترنت ثم اضغطي تشغيل مرة أخرى.'))}
player.addEventListener('ended',()=>{
 playIndex++;
 if(playIndex<playlist.length){player.src=playlist[playIndex];player.play()}
 else if(--repeatsLeft>0){playIndex=0;player.src=playlist[0];player.play()}
});
$('#playVerses').addEventListener('click',()=>playSequence(1));
$('#repeatThree').addEventListener('click',()=>playSequence(3));
planList.addEventListener('click',e=>{const item=e.target.closest('[data-day]');if(item){daySelect.value=item.dataset.day;setDay(item.dataset.day)}});

const letters='ا أ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي'.split(' ');
const lettersGrid=$('#lettersGrid');
lettersGrid.innerHTML=letters.map(l=>`<button class="letter-btn" data-letter="${l}">${l}</button>`).join('');
function speak(text){if(!('speechSynthesis'in window))return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ar-SA';u.rate=.72;speechSynthesis.speak(u)}
lettersGrid.addEventListener('click',e=>{const b=e.target.closest('[data-letter]');if(b)speak(b.dataset.letter)});

let mediaRecorder=null, chunks=[], stream=null, timerId=null, seconds=0, audioBlob=null;
const startBtn=$('#startRecord'), stopBtn=$('#stopRecord'), deleteBtn=$('#deleteRecord'), sendBtn=$('#sendRecord');
const recState=$('#recordState'), recTimer=$('#recordTimer'), recDot=$('#recordDot'), wave=$('#wave'), playback=$('#recordPlayback'), message=$('#recordMessage');
function formatTime(s){return `00:${String(s).padStart(2,'0')}`}
startBtn.addEventListener('click',async()=>{
 try{
  stream=await navigator.mediaDevices.getUserMedia({audio:true});
  chunks=[]; audioBlob=null; message.classList.remove('show');
  mediaRecorder=new MediaRecorder(stream);
  mediaRecorder.ondataavailable=e=>e.data.size&&chunks.push(e.data);
  mediaRecorder.onstop=()=>{
    audioBlob=new Blob(chunks,{type:mediaRecorder.mimeType||'audio/webm'});
    playback.src=URL.createObjectURL(audioBlob);playback.hidden=false;
    deleteBtn.disabled=false;sendBtn.disabled=false;
    stream.getTracks().forEach(t=>t.stop());
  };
  mediaRecorder.start();seconds=0;recTimer.textContent='00:00';
  timerId=setInterval(()=>{seconds++;recTimer.textContent=formatTime(seconds)},1000);
  recState.textContent='جاري التسجيل';recDot.classList.add('live');wave.classList.add('live');
  startBtn.disabled=true;stopBtn.disabled=false;
 }catch(err){alert('لم يتمكن المتصفح من استخدام الميكروفون. افتحي الموقع عبر HTTPS واسمحي بإذن الميكروفون.')}
});
stopBtn.addEventListener('click',()=>{
 if(mediaRecorder&&mediaRecorder.state!=='inactive')mediaRecorder.stop();
 clearInterval(timerId);recState.textContent='تم التسجيل';recDot.classList.remove('live');wave.classList.remove('live');
 startBtn.disabled=false;stopBtn.disabled=true;
});
deleteBtn.addEventListener('click',()=>{
 if(playback.src)URL.revokeObjectURL(playback.src);playback.removeAttribute('src');playback.hidden=true;audioBlob=null;
 deleteBtn.disabled=true;sendBtn.disabled=true;recState.textContent='جاهز للتسجيل';recTimer.textContent='00:00';
});
sendBtn.addEventListener('click',()=>{
 localStorage.setItem('iqra_has_recording','true');
 recState.textContent='تم الإرسال تجريبيًا للمعلمة';message.textContent='أحسنتِ، تم تسجيل التسميع في نسخة الاختبار. سيُرفع فعليًا بعد ربط Firebase.';message.classList.add('show');
 $('#newRecords').textContent=Number($('#newRecords').textContent)+1;
});

let score=0, tries=0, target='';
function newGame(){
 target=letters[Math.floor(Math.random()*letters.length)];
 $('#gameQuestion').textContent=`اختر الحرف: ${target}`;
 let opts=[target];while(opts.length<4){const l=letters[Math.floor(Math.random()*letters.length)];if(!opts.includes(l))opts.push(l)}
 opts.sort(()=>Math.random()-.5);$('#gameOptions').innerHTML=opts.map(l=>`<button class="game-option" data-answer="${l}">${l}</button>`).join('');
 $('#gameFeedback').textContent='';
}
$('#gameOptions').addEventListener('click',e=>{
 const b=e.target.closest('[data-answer]');if(!b)return;tries++;$('#tries').textContent=tries;
 if(b.dataset.answer===target){b.classList.add('correct');score+=10;$('#score').textContent=score;$('#gameFeedback').textContent='أحسنت ⭐ +10 نقاط';speak('أحسنت');addStar()}
 else{b.classList.add('wrong');$('#gameFeedback').textContent='حاولي مرة أخرى';speak('حاولي مرة أخرى')}
});
$('#newRound').addEventListener('click',newGame);newGame();
function addStar(){const el=$('#starsCount');el.textContent=Number(el.textContent)+1;$('#metricStars').textContent=el.textContent;localStorage.setItem('iqra_stars',el.textContent)}
const savedStars=localStorage.getItem('iqra_stars');if(savedStars){$('#starsCount').textContent=savedStars;$('#metricStars').textContent=savedStars}

const rewardModal=$('#rewardModal'), certModal=$('#certificateModal');
$('#rewardBtn').addEventListener('click',()=>{
 const rewards=['وسام القارئ المجتهد','نجمتان إضافيتان','وسام إتقان الحروف','كأس بطل اليوم'];
 $('#rewardText').textContent=rewards[Math.floor(Math.random()*rewards.length)];
 rewardModal.classList.add('show');rewardModal.setAttribute('aria-hidden','false');
});
$('#previewCertificate').addEventListener('click',()=>{certModal.classList.add('show');certModal.setAttribute('aria-hidden','false')});
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>{$$('.modal').forEach(m=>{m.classList.remove('show');m.setAttribute('aria-hidden','true')})}));
$$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show')}));

const students=['سارة محمد','عبدالله خالد','مريم أحمد','يوسف علي'];
$('#teacherStudents').innerHTML=students.map((n,i)=>`<div class="student-row"><div><b>${n}</b><small>اليوم ${i+1} — ${i%2?'بانتظار التسميع':'تسجيل جديد'}</small></div><div><button class="btn soft" onclick="alert('سيظهر التسجيل الحقيقي بعد ربط Firebase')">استماع</button> <button class="btn gold" onclick="alert('تم الاعتماد تجريبيًا')">اعتماد</button></div></div>`).join('');
$('#supervisorStudents').innerHTML=students.map((n,i)=>`<div class="student-row"><div><b>${n}</b><small>التقدم ${72+i*6}% — آخر تسميع: اليوم</small></div><button class="btn soft" onclick="alert('سيظهر التسجيل الحقيقي بعد ربط Firebase Storage')">سماع القراءة</button></div>`).join('');

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js').catch(()=>{}))}
