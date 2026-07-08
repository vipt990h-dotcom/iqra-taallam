
setTimeout(()=>document.querySelector('.splash')?.classList.add('hide'),1100);
const pages = document.querySelectorAll('.page');
function showPage(id){pages.forEach(p=>p.classList.toggle('active', p.id===id));window.scrollTo({top:0, behavior:'smooth'});}
let mediaRecorder, chunks=[], currentAudioBlob=null;
async function startRecording(){
  const s=document.getElementById('recStatus');
  try{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    mediaRecorder=new MediaRecorder(stream); chunks=[];
    mediaRecorder.ondataavailable=e=>chunks.push(e.data);
    mediaRecorder.onstop=()=>{currentAudioBlob=new Blob(chunks,{type:'audio/webm'});document.getElementById('audioPreview').src=URL.createObjectURL(currentAudioBlob);s.innerHTML='تم حفظ التسجيل مؤقتًا. استمعي له قبل الإرسال.';};
    mediaRecorder.start(); s.innerHTML='جاري التسجيل الآن...';
  }catch(e){s.innerHTML='لم يسمح المتصفح باستخدام الميكروفون. فعّلي الإذن أو جرّبي متصفحًا آخر.'}
}
function stopRecording(){ if(mediaRecorder && mediaRecorder.state!=='inactive') mediaRecorder.stop(); }
function submitRecitation(){
  const s=document.getElementById('recStatus');
  if(!currentAudioBlob){s.innerHTML='سجلي التلاوة أولًا قبل الإرسال.'; return;}
  const child=document.getElementById('childName')?.value || 'محمد أحمد';
  const ayat=document.getElementById('ayatRange')?.value || 'العلق 1-5';
  document.getElementById('recitationRows')?.insertAdjacentHTML('afterbegin',`<tr><td>${child}</td><td>${ayat}</td><td><span class="status yellow">بانتظار التقييم</span></td><td>اليوم</td></tr>`);
  s.innerHTML='تم إرسال التسجيل تجريبيًا. الربط الحقيقي سيكون عبر Firebase.';
}
function saveEvaluation(){const msg=document.getElementById('evalMsg'); if(msg) msg.innerHTML='تم حفظ تقييم المعلمة تجريبيًا وسيظهر لولي الأمر عند ربط قاعدة البيانات.';}
function markDone(btn){btn.textContent='تم الإنجاز ✓';btn.classList.add('gold');}
function exportReport(name){
  const text='تقرير '+name+'\nمنصة اقرأ وتعلّم V3 Gold\nالمحتوى التعليمي: جمعية الفرقان\nفكرة وتصميم المنصة: أ. تهاني القرشي\nإشراف: أ. غاليه الغامدي';
  const blob=new Blob([text],{type:'text/plain;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='iqra-report-'+name+'.txt'; a.click();
}
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));}
