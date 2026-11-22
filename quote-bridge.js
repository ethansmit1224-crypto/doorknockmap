/* MN Lawn Pros - attach the secure quick-quote screen to an existing DoorKnockMap door.
   This is intentionally a small additive enhancement; the map and sync logic remain intact. */
(()=>{'use strict';
  const STORAGE_KEY='mnpros_d2d_selected_door_v1';
  function addQuoteButton(){
    const sheet=document.getElementById('sheet');
    if(!sheet || !sheet.querySelector('.sh-head') || sheet.querySelector('#mnpros-map-quote'))return;
    const btn=document.createElement('button');
    btn.id='mnpros-map-quote'; btn.type='button';
    btn.textContent='Create HOMEWORKS estimate    Leaf / Snow';
    btn.setAttribute('aria-label','Create leaf or snow estimate for this house');
    btn.style.cssText='display:block;width:calc(100% - 28px);margin:13px 14px 15px;padding:15px 12px;background:var(--accent,#1E6B22);color:var(--on-accent,#fff);border:0;border-radius:13px;font:800 15px Manrope,system-ui,sans-serif;box-shadow:0 3px 10px rgba(0,0,0,.13);text-align:center;';
    btn.textContent='Quick Quote  |  Leaf + Snow';
    btn.addEventListener('click',()=>{
      try{
        if(typeof S==='undefined'||!S.sheet?.door){alert('Choose a house pin first.');return;}
        const d=JSON.parse(JSON.stringify(S.sheet.door));
        // Store this door before leaving, even when it was just created.
        if(typeof putDoor==='function')putDoor(d);
        sessionStorage.setItem(STORAGE_KEY,JSON.stringify({id:d.id,name:d.name,address:d.address,phone:d.phone,notes:d.notes,status:d.status,lat:d.lat,lng:d.lng}));
        location.href='./quote.html';
      }catch(error){alert('Could not open Quick Quote. '+(error?.message||'Try again.'));}
    });
    sheet.querySelector('.sh-head').insertAdjacentElement('afterend',btn);
  }
  function init(){
    const sheet=document.getElementById('sheet');
    if(!sheet)return;
    new MutationObserver(addQuoteButton).observe(sheet,{childList:true});
    addQuoteButton();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
