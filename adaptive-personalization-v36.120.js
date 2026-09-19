/* Hybrid Training v36.126: personalized calibration and legacy swim-data migration. */
(()=>{
'use strict';
const core=window.HybridCore;if(!core)return;
const VER='36.126',LEGACY_SWIM='hybridSwimMetadataV36120';
const originals={getState:core.getState?.bind(core),readiness:core.readiness?.bind(core),hybridAdaptationState:core.hybridAdaptationState?.bind(core),effectiveEffortRpe:core.effectiveEffortRpe?.bind(core)};
const FEEL={'too easy':[4.5,1.7],easy:[6,1.15],comfortable:[7,.8],challenging:[8,1],'very hard':[9.5,1.7],'too hard':[9.5,1.7]};
const CARDIO=/(run|walk|swim|bike|cycling|cycle|row|ruck|conditioning|lss|tempo|sprint|hill|stair|elliptical|cardio)/i;
const n=v=>Number.isFinite(+v)?+v:0,clone=v=>JSON.parse(JSON.stringify(v));
const read=(k,d)=>{try{return Object.assign(clone(d),JSON.parse(localStorage.getItem(k)||'{}'))}catch{return clone(d)}};
const day=s=>{const t=Date.parse((s||'')+'T12:00:00Z');return Number.isFinite(t)?Math.floor(t/864e5):0};
const isCardio=r=>!!r&&(r.conditioning||String(r.session||'').toLowerCase()==='conditioning'||CARDIO.test(r.exercise||''));
function duration(r){const activity=n(r?.metrics?.time);if(isCardio(r)&&activity>0)return [activity,'activity-metrics-time'];const tracked=n(r?.trackedSessionDurationMinutes);if(tracked>0)return [tracked,'tracked-session'];const session=n(r?.sessionDurationMinutes);return [session,session>0?'session-duration':'none']}
function key(r){return [r?.date||'',r?.sessionId||'',r?.exercise||'',r?.completedAt||''].join('|')}
function loose(r){return [r?.date||'',r?.session||'',r?.exercise||''].join('|')}
function migrateLegacySwimMetrics(row,legacy){
 if(!legacy||typeof legacy!=='object')return;
 const m=row.metrics=row.metrics&&typeof row.metrics==='object'?row.metrics:{};
 const put=(name,value)=>{if((m[name]===undefined||m[name]==='')&&value!==undefined&&value!==null&&value!=='')m[name]=value};
 put('poolLengths',legacy.lengthCount);put('poolLength',legacy.poolLength);put('poolLengthUnit',legacy.poolLengthUnit);
 put('poolPreset',legacy.poolPreset==='home21'?'custom':legacy.poolPreset);put('distance',legacy.calculatedDistance);put('distanceUnit',legacy.distanceUnit||legacy.poolLengthUnit);
 if(!m.swimStroke)m.swimStroke='freestyle';
}
function normalize(state){
 (state?.logs||[]).forEach(r=>{const [mins,source]=duration(r);if(mins>0){if(source==='activity-metrics-time'){const old=n(r.sessionDurationMinutes);if(old&&Math.abs(old-mins)>.01&&r.loggingSessionDurationMinutes==null)r.loggingSessionDurationMinutes=old;r.sessionDurationMinutes=mins}r.effectiveDurationMinutes=mins;r.durationSource=source}});
 const meta=read(LEGACY_SWIM,{byLog:{},pending:{}});(state?.logs||[]).filter(r=>/swim/i.test(r.exercise||'')).forEach(r=>migrateLegacySwimMetrics(r,meta.byLog?.[key(r)]||meta.pending?.[loose(r)]));return state;
}
function observed(r){const exact=n(r?.rpe);if(exact>0)return [exact,1.45];const f=String(r?.feel||'').trim().toLowerCase();return FEEL[f]||null}
const predicted=r=>n(r?.modelExpectedRpe)||n(r?.modelPlannedExpectedRpe);
function calibration(exercise,state){
 const rows=(state?.logs||[]).filter(r=>r.exercise===exercise).map(r=>({r,o:observed(r),p:predicted(r)})).filter(x=>x.o&&x.p>0);if(!rows.length)return {exercise,n:0,effectiveN:0,correction:0,confidence:0,label:'Learning'};
 const extremes=rows.filter(x=>['too easy','very hard','too hard'].includes(String(x.r.feel||'').toLowerCase()));let boost=1;if(extremes.length>=2){const signs=extremes.map(x=>Math.sign(x.o[0]-x.p)).filter(Boolean);if(signs.length>=2&&signs.every(s=>s===signs[0]))boost=Math.min(1.5,1+.12*(signs.length-1))}
 let sw=0,se=0,sq=0;rows.forEach(x=>{const age=Math.max(0,day(new Date().toISOString().slice(0,10))-day(x.r.date)),ext=['too easy','very hard','too hard'].includes(String(x.r.feel||'').toLowerCase()),w=x.o[1]*Math.exp(-age/56)*(ext?boost:1),err=Math.max(-3,Math.min(3,x.o[0]-x.p));sw+=w;se+=w*err;sq+=w*w});
 const eff=sw*sw/(sq||1),raw=se/(sw||1),cor=Math.max(-1.75,Math.min(1.75,raw*(eff/(eff+3.5)))),conf=Math.min(.95,1-Math.exp(-eff/5));return {exercise,n:rows.length,effectiveN:+eff.toFixed(2),correction:+cor.toFixed(2),confidence:+conf.toFixed(2),label:conf>=.65?'Established':conf>=.35?'Emerging':'Learning'};
}
function annotate(state){const c={};(state?.logs||[]).forEach(r=>{if(!r.exercise||!predicted(r))return;const x=c[r.exercise]||(c[r.exercise]=calibration(r.exercise,state));r.personalEffortCorrection=x.correction;r.personalCalibrationConfidence=x.confidence;r.personalExpectedRpe=Math.max(1,Math.min(10,+(predicted(r)+x.correction).toFixed(1)))})}
function weightGate(state){const a=Object.entries(state?.bodyweightMeasurements||{}).map(([date,x])=>({date,lb:n(x?.lb)})).filter(x=>x.lb>0).sort((a,b)=>a.date.localeCompare(b.date)),span=a.length>1?day(a.at(-1).date)-day(a[0].date):0,ready=a.length>=7&&span>=14;return {ready,entries:a.length,spanDays:span,label:ready?'Trend established':'Early estimate — insufficient data'}}
function recoveryAuthority(state){const s=state?.adaptiveModelSnapshot||{},nr=s.neuromuscularReadiness||{},back=s.shadowBacktest||s.adaptiveBacktest?.shadowBacktest||{},passed=Array.isArray(back.passed)?back.passed:[],validated=passed.length>0&&(n(nr.effectiveN)>=8||n(nr.confidence)>=.7);return {validated,authority:validated?'programming':'informational',note:validated?'Personal recovery signals cleared validation gates.':'Personal recovery signals are still learning, so they will not lower training on their own.'}}
function state(){const s=originals.getState?originals.getState():{};normalize(s);annotate(s);const g=weightGate(s);if(s.bodyweightSnapshot){s.bodyweightSnapshot.personalTrendReady=g.ready;s.bodyweightSnapshot.personalTrendLabel=g.label;s.bodyweightSnapshot.personalTrendSpanDays=g.spanDays}return s}
core.getState=state;
if(originals.readiness)core.readiness=function(...args){const r=originals.readiness(...args),a=recoveryAuthority(state());return r&&typeof r==='object'?Object.assign({},r,{personalRecoveryAuthority:a.authority,personalRecoveryValidated:a.validated,personalRecoveryNote:a.note}):r};
if(originals.hybridAdaptationState)core.hybridAdaptationState=function(...args){const r=originals.hybridAdaptationState(...args);if(!r||typeof r!=='object')return r;const g=weightGate(state()),out=Object.assign({},r,{bodyweightTrendGate:g});if(!g.ready&&out.weight)out.weight=Object.assign({},out.weight,{direction:'unknown',displayRate:false,displayLabel:g.label,confidence:Math.min(n(out.weight.confidence),.12)});return out};
if(originals.effectiveEffortRpe)core.effectiveEffortRpe=function(r){const o=observed(r);return o?o[0]:originals.effectiveEffortRpe(r)};
function swimDistance(count,length,unit='yd'){return {distance:+(Math.max(0,n(count))*Math.max(0,n(length))).toFixed(2),unit,lengthCount:Math.max(0,n(count)),poolLength:Math.max(0,n(length))}}
function tissue(state){const s=state.adaptiveModelSnapshot||{},t=s.tissueStress||{},a=Object.entries(t.channels||{}).sort((x,y)=>n(y[1])-n(x[1]))[0];if(!a||n(a[1])<.9)return null;const names={achillesCalf:'lower-leg / Achilles-calf',kneeQuad:'knee / quad',hamstringSpeed:'hamstring / speed',adductorGroin:'adductor / groin',impact:'impact'},ready=!n(s.preparedness)||n(s.preparedness)>=.75;return {headline:ready?`Ready overall • Recent ${names[a[0]]||a[0]} load is elevated`:`Recent ${names[a[0]]||a[0]} load is elevated`,detail:'Local tissue load is shown separately from overall fatigue. It guides training load; it does not predict injury.'}}
function status(){let b=document.querySelector('#v36120-status');if(!b){const anchor=document.querySelector('#v36101PerformancePanel')||document.querySelector('.panel');if(!anchor)return;b=document.createElement('div');b.id='v36120-status';b.className='v36120-status';anchor.insertAdjacentElement('afterend',b)}const s=state(),a=recoveryAuthority(s),t=tissue(s);b.innerHTML=`<div><small>Personal calibration</small><strong>${t?.headline||(a.validated?'Recovery signals ready to use':'Recovery signals still learning')}</strong><p>${t?.detail||''} ${a.note}</p></div><em>${a.validated?'Ready':'Informational'}</em>`}
function weightUI(){const g=weightGate(state());let b=document.querySelector('#v36120-weight');if(!b){const h=[...document.querySelectorAll('h1,h2,h3,h4,strong,.panel-title,.section-title')].find(x=>/body\s*weight|weight tracking/i.test(x.textContent||''));const panel=h?.closest('.panel,section,details,div');if(!panel)return;b=document.createElement('div');b.id='v36120-weight';b.className='v36120-weight';panel.appendChild(b)}b.innerHTML=`<strong>${g.label}</strong><span>${g.ready?`${g.entries} measurements across ${g.spanDays} days.`:`${g.entries}/7 measurements • ${g.spanDays}/14 days. The trend is not used for decisions yet.`}</span>`}
function css(){if(document.querySelector('#v36120-css'))return;const s=document.createElement('style');s.id='v36120-css';s.textContent=`.v36120-status,.v36120-weight{margin:10px 0;padding:12px;border:1px solid color-mix(in srgb,currentColor 18%,transparent);border-radius:14px;background:color-mix(in srgb,currentColor 4%,transparent)}.v36120-status{display:flex;justify-content:space-between;gap:12px}.v36120-status small,.v36120-status p,.v36120-weight span{opacity:.72}.v36120-status strong{display:block}.v36120-status p{margin:4px 0 0;font-size:.86rem}.v36120-status em{font-size:.75rem;font-style:normal;font-weight:700}.v36120-weight{display:flex;gap:7px;align-items:baseline;flex-wrap:wrap}@media(max-width:560px){.v36120-status{flex-direction:column}}`;document.head.appendChild(s)}
let busy=false;function refresh(){if(busy)return;busy=true;setTimeout(()=>{busy=false;try{state()}catch{}css();status();weightUI()},60)}new MutationObserver(refresh).observe(document.documentElement,{childList:true,subtree:true});
window.HybridPersonalization=Object.freeze({version:VER,resolveDuration:duration,effortCalibration:e=>calibration(e,state()),bodyweightTrendGate:()=>weightGate(state()),recoveryAuthority:()=>recoveryAuthority(state()),swimDistanceFromLengths:swimDistance,refresh});
refresh();console.info('[Hybrid v36.126] personalization layer active');
})();
