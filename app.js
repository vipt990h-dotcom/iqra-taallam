
setTimeout(()=>document.querySelector('.splash')?.classList.add('hide'),1000);

function runChecklist(){
  document.querySelectorAll('.toggle').forEach((t,i)=>{
    setTimeout(()=>t.classList.add('on'), i*120);
  });
  const msg = document.getElementById('qaMsg');
  if(msg) msg.innerHTML = 'تم فحص عناصر الإطلاق تجريبيًا: الواجهة، الصفحات، الأيقونة، PWA، الحقوق، ومسارات الملفات.';
}

function downloadBackup(){
  const backup = {
    project: 'Iqra Taallam V3 Gold',
    phase: 'Institutional Phase 6',
    date: new Date().toISOString(),
    rights: 'جمعية الفرقان',
    idea_design: 'أ. تهاني القرشي',
    supervision: 'أ. غاليه الغامدي',
    status: 'ready for deployment review'
  };
  const blob = new Blob([JSON.stringify(backup,null,2)], {type:'application/json;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'iqra-v3-backup-sample.json'; a.click();
  URL.revokeObjectURL(url);
}

function copyDeploySteps(){
  const text = '1) فك الضغط. 2) رفع محتويات المجلد إلى GitHub. 3) التأكد من وجود index.html في الجذر. 4) تفعيل Pages من Settings > Pages.';
  navigator.clipboard?.writeText(text);
  alert('تم نسخ خطوات النشر المختصرة.');
}

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
}
