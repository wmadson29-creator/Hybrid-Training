/* Numeric weight entry. Units and loading basis remain part of the saved load. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root){root.HybridWeightEntry=api;api.install(root);}})(typeof window==='undefined'?null:window,function(){
 'use strict';
 function describe(source,defaultUnit='lb'){
  const raw=String(source??'').trim(),unit=/\bkg\b|kilogram/i.test(raw)?'kg':/\blbs?\b|pound/i.test(raw)?'lb':defaultUnit==='kg'?'kg':'lb',number=/[+-]\s*(?:\d+(?:[.,]\d*)?|[.,]\d+)|(?:\d+(?:[.,]\d*)?|[.,]\d+)/.exec(raw),basis=/\/\s*side\b|per\s+side/i.test(raw)?'per side':/\/\s*(?:DB|dumbbell)\b|per\s+dumbbell/i.test(raw)?'per dumbbell':/\/\s*bell\b|per\s+bell/i.test(raw)?'per bell':/\/\s*hand\b|per\s+hand/i.test(raw)?'per hand':/\beach\b/i.test(raw)?'each':/\btotal\b/i.test(raw)?'total':/\bplates?\b/i.test(raw)?'plates':'',bodyweight=/^body\s*weight$/i.test(raw),range=/\d\s*[–—]\s*\d|\d\s*-\s*\d/.test(raw),added=!!number&&(number[0].startsWith('+')||/^body\s*weight\s*\+/i.test(raw));
  return {raw,unit,basis,bodyweight,range,editable:!raw||!!number||bodyweight,value:bodyweight?'0':number&&!range?String(Number(number[0].replace(/\s/g,'').replace(',','.'))):'',number:number?.[0]||'',index:number?.index??-1,label:[unit,basis||(bodyweight||added?'added':'')].filter(Boolean).join(' ')};
 }
 function compose(description,value){
  const d=typeof description==='string'?describe(description):description,text=String(value??'').trim().replace(',','.');if(!text)return '';const n=Number(text);if(!Number.isFinite(n))throw Error('Enter a number for weight.');const normalized=String(n);
  if(d.bodyweight)return n===0?d.raw:'Bodyweight '+(n>=0?'+ ':'- ')+Math.abs(n)+' '+d.unit;
  if(d.range)return normalized+' '+d.unit+(d.basis?' '+d.basis:'');
  if(d.number){const signed=d.number.startsWith('+')&&n>=0?'+'+(/^[+]\s+/.test(d.number)?' ':'')+normalized:normalized;return d.raw.slice(0,d.index)+signed+d.raw.slice(d.index+d.number.length);}
  return normalized+' '+d.unit+(d.basis?' '+d.basis:'');
 }
 let installed=false,serial=0,windowRef=null,pending=0;const records=new WeakMap();
 const selector='.le-weight,.sd-weight,.le-left-weight,.le-right-weight,.le-kbweight,.le-secondweight,.le-sledgeweight';
 function defaultUnit(el){if(el.matches('.le-kbweight,.le-secondweight'))return 'kg';const main=el.closest('.log-exercise')?.querySelector('.le-weight')?.value||'';return /\bkg\b/i.test(main)?'kg':/\blbs?\b/i.test(main)?'lb':windowRef.HybridUnits?.unit?.()||'lb';}
 function contextDescription(el){const value=describe(el.value,defaultUnit(el));if(!el.value.trim()&&el.matches('.sd-weight,.le-left-weight,.le-right-weight')){const primary=el.closest('.log-exercise')?.querySelector('.le-weight');if(primary?.value.trim()){const reference=describe(primary.value,defaultUnit(el));return {...reference,value:''};}}return value;}

 function synchronize(record){
  const {legacy,input,unit}=record,meta=legacy.value.trim()?describe(legacy.value,defaultUnit(legacy)):{...record.meta,value:''};
  if(!meta.editable){input.hidden=true;if(unit.textContent!==meta.raw)unit.textContent=meta.raw;return;}input.hidden=false;
  if(legacy.value!==record.last||input!==legacy.ownerDocument.activeElement){if(input.value!==meta.value)input.value=meta.value;}
  record.meta=meta;record.last=legacy.value;if(unit.textContent!==meta.label)unit.textContent=meta.label;input.disabled=legacy.disabled;input.readOnly=legacy.readOnly;input.required=legacy.required;
 }
 function enhance(legacy){
  const current=records.get(legacy);if(current){synchronize(current);return;}
  const meta=contextDescription(legacy);if(!meta.editable)return;
  const doc=legacy.ownerDocument,wrap=doc.createElement('div'),input=doc.createElement('input'),unit=doc.createElement('span');wrap.className='numeric-weight-field';input.className='weight-number';input.type='number';input.inputMode='decimal';input.step='any';input.id='numeric-weight-'+(++serial);input.placeholder='Weight';unit.className='numeric-weight-unit';unit.id=input.id+'-unit';input.setAttribute('aria-describedby',unit.id);
  const field=legacy.closest('.field'),label=field?.querySelector('label');field?.classList.add('numeric-weight-host');input.setAttribute('aria-label',(label?.textContent.trim()||'Weight')+' · '+meta.label);if(label&&(!label.htmlFor||label.htmlFor===legacy.id))label.htmlFor=input.id;
  legacy.before(wrap);wrap.append(input,unit,legacy);legacy.type='hidden';legacy.classList.add('numeric-weight-source');const record={legacy,input,unit,meta,last:null};records.set(legacy,record);synchronize(record);
  const commit=event=>{event.stopPropagation();if(input.validity.badInput)return;try{legacy.value=compose(record.meta,input.value);record.last=legacy.value;if(legacy.value.trim())record.meta=describe(legacy.value,defaultUnit(legacy));if(unit.textContent!==record.meta.label)unit.textContent=record.meta.label;legacy.dispatchEvent(new Event(event.type,{bubbles:true}));}catch(error){input.setCustomValidity(error.message);return;}input.setCustomValidity('');};input.addEventListener('input',commit);input.addEventListener('change',commit);legacy.addEventListener('input',()=>synchronize(record));legacy.addEventListener('change',()=>synchronize(record));
 }
 function refresh(root){if(!installed)return;root=root||windowRef.document.querySelector('.view.active')||windowRef.document;for(const el of root.querySelectorAll(selector))enhance(el);for(const el of root.querySelectorAll('.kb-row-kg,.gym-row-lb'))el.inputMode='decimal';}
 function install(w){if(installed||!w?.document)return;installed=true;windowRef=w;const queue=()=>{if(!pending)pending=w.requestAnimationFrame(()=>{pending=0;refresh();});};new w.MutationObserver(queue).observe(w.document.body,{childList:true,subtree:true});w.document.addEventListener('input',queue);w.document.addEventListener('change',queue);w.document.addEventListener('hybrid-units-change',queue);if(w.document.readyState==='loading')w.document.addEventListener('DOMContentLoaded',queue,{once:true});else queue();}
 return Object.freeze({describe,compose,install,refresh});
});
