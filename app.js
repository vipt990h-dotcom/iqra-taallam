const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
function showRole(role){localStorage.setItem('iqraRole',role);location.href=role+'.html'}
function demoLogin(){const role=$('#role')?.value||'parent';showRole(role)}
let recorder, chunks=[];
async function startRec(){try{const stream=await navigator.mediaDevices.getUserMedia({audio:true});recorder=new MediaRecorder(stream);chunks=[];recorder.ondataavailable=e=>chunks.push(e.data);recorder.onstop=()=>{const blob=new Blob(chunks,{type:'audio/webm'});const url=URL.createObjectURL(blob);$('#audioPreview').src=url;$('#audioPreview').style.display='block';$('#recStatus').textContent='تم حفظ التسجيل التجريبي ويمكن إرساله للمعلمة';localStorage.setItem('lastRecitation','سورة العلق - تسجيل تجريبي');};recorder.start();$('#recStatus').textContent='جاري التسجيل...';}catch(e){$('#recStatus').textContent='لم يسمح المتصفح باستخدام الميكروفون';}}
function stopRec(){if(recorder&&recorder.state==='recording')recorder.stop()}
function saveTeacherEval(){localStorage.setItem('teacherEval',$('#eval').value+' - '+$('#note').value);alert('تم حفظ تقييم المعلمة تجريبيًا')}
function loadParent(){const ev=localStorage.getItem('teacherEval')||'بانتظار تقييم المعلمة';const box=$('#teacherEval');if(box)box.textContent=ev}
function addPoints(n){let p=+(localStorage.getItem('points')||2450)+n;localStorage.setItem('points',p);const el=$('#points');if(el)el.textContent=p+' نقطة';alert('أحسنتِ! تم إضافة '+n+' نقطة')}
document.addEventListener('DOMContentLoaded',()=>{loadParent();const p=$('#points');if(p)p.textContent=(localStorage.getItem('points')||2450)+' نقطة';});
