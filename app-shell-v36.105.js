/* Hybrid Training v36.105 — modular product shell.
   Presentation/support behavior only. Core physiology stays encapsulated in index.html and is
   reached through the narrow window.HybridCore bridge. */
(function(){
'use strict';
const core=window.HybridCore;
if(!core){console.error('Hybrid Training v36.105 shell: core bridge unavailable');return}
const BUILD='36.105',FOCUS_KEY='hybridTrainingWorkoutFocusV1';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const state=()=>core.getState();
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// ---------- PWA update notification: user-visible and non-destructive ----------
function installUpdateBanner(){
 if($('#v36101UpdateBanner'))return;
 const b=document.createElement('div');b.id='v36101UpdateBanner';b.className='v36101-update-banner hidden';
 b.innerHTML='<div class="v36101-update-copy"><strong id="v36101UpdateTitle">Update available</strong><span id="v36101UpdateText"></span></div><div class="v36101-update-actions"><button class="btn" id="v36101UpdateLater" type="button">Later</button><button class="btn primary" id="v36101UpdateNow" type="button">Update</button></div>';
 document.body.appendChild(b);
 $('#v36101UpdateLater')?.addEventListener('click',()=>b.classList.add('hidden'));
 $('#v36101UpdateNow')?.addEventListener('click',async()=>{
   const latest=b.dataset.latest;if(!latest)return;
   const btn=$('#v36101UpdateNow');if(btn){btn.disabled=true;btn.textContent='Updating…'}
   try{const reg=await navigator.serviceWorker?.getRegistration?.();try{reg?.waiting?.postMessage('SKIP_WAITING')}catch(_){ }try{await reg?.update?.()}catch(_){ }}catch(_){ }
   setTimeout(()=>{const u=new URL(location.href);u.searchParams.set('v',latest);u.searchParams.set('refresh',Date.now());location.replace(u.href)},250);
 });
}
function showUpdateBanner(latest){installUpdateBanner();const b=$('#v36101UpdateBanner');if(!b)return;b.dataset.latest=String(latest);$('#v36101UpdateTitle').textContent='Hybrid Training v'+latest+' available';$('#v36101UpdateText').textContent=' Your current workout data stays on this device.';b.classList.remove('hidden')}
window.HybridShell=Object.freeze({showUpdate:showUpdateBanner});
if(window.__hybridPendingUpdateBuild){showUpdateBanner(window.__hybridPendingUpdateBuild);window.__hybridPendingUpdateBuild=''}

// ---------- Practical data coverage + bottleneck + today-only context ----------
function explicitCtx(dateISO){return state().settings?.dayTrainingContext?.[dateISO]||{}}
function setCtx(patch){const d=core.localISO(new Date());core.setDayContextPatch(d,patch);syncPerformancePanel();syncWeakLinkPanel();syncSecondWorkoutPanel()}
function toggleCtxFlag(key){const c=explicitCtx(core.localISO(new Date()));setCtx({[key]:!c[key]})}
function setTimeBudget(min){const c=explicitCtx(core.localISO(new Date()));setCtx({timeBudget:Number(c.timeBudget)===Number(min)?0:Number(min)})}
function recentRows(dateISO,days){const start=core.localISO(core.addDays(core.parseLocalISO(dateISO),-days));return (state().logs||[]).filter(x=>x?.date>=start&&x.date<=dateISO&&!['skipped','missed'].includes(String(x.status||'').toLowerCase()))}
function dataCoverage(dateISO){
 const s=state(),rec=!!(s.dailyRecovery||{})[dateISO],r28=recentRows(dateISO,28),r60=recentRows(dateISO,60),cond=r60.filter(x=>x.session==='Conditioning'||x.conditioning).length;
 const wear=Object.values(s.wearableSessions||{}).filter(x=>{if(!x?.date)return false;const n=core.daysBetweenISO(x.date,dateISO);return n>=0&&n<=60}).length;
 const score=(rec?2:0)+Math.min(3,r28.length/10)+Math.min(2,cond/5)+Math.min(1,wear/5),level=score>=6?'Strong':score>=3.3?'Moderate':'Limited';
 return {level,rec,rows:r28.length,cond,wear,note:!rec?'No recovery entry today, so workload/fatigue history carries more of the decision.':r28.length<6?'Recovery is current, but recent training evidence is still sparse.':'Recovery and recent training history are both contributing.'};
}
function prettyQuality(k){return String(k||'').replace(/([A-Z])/g,' $1').replace(/[_-]+/g,' ').replace(/^./,x=>x.toUpperCase())}
function bottleneckSnapshot(dateISO){
 try{
   const p=core.conditioningFitnessPortfolio(dateISO)||{},neg=Object.entries(p).filter(([,v])=>v&&v.neglected).sort((a,b)=>(Number(b[1].daysSince)||0)/(Number(b[1].targetDays)||1)-(Number(a[1].daysSince)||0)/(Number(a[1].targetDays)||1));
   if(neg.length){const [k,v]=neg[0];return {label:prettyQuality(k),note:(v.daysSince>=9999?'No dedicated exposure logged yet':v.daysSince+' days since a dedicated exposure')+'. This flags a scheduling gap, not proof that the underlying fitness quality is poor.'}}
   const h=core.hybridAdaptationState(dateISO,{includeHistorical:false});
   if(h?.ready&&h.strength?.direction==='down')return {label:'Strength trend',note:'Recent direct strength evidence is trending down; protect high-quality strength work before adding optional volume.'};
   if(h?.ready&&h.cardio?.aerobic?.direction==='down')return {label:'Aerobic efficiency',note:'Recent aerobic evidence is trending down; easy aerobic consistency is the clearest current lever.'};
   const rec14=Object.keys(state().dailyRecovery||{}).filter(d=>{const n=core.daysBetweenISO(d,dateISO);return n>=0&&n<=14}).length;
   if(rec14<5)return {label:'Data consistency',note:'Recent recovery coverage is limited. Better data may improve decisions more than adding training.'};
   return {label:'No obvious single limiter',note:'Current evidence looks reasonably balanced. Consistent execution is a better lever than forcing extra volume.'};
 }catch(_){return {label:'Still learning',note:'There is not enough stable evidence to name a limiter yet.'}}
}
function installPerformancePanel(){
 if($('#v36101PerformancePanel'))return;const grid=$('#dashboard .dashboard-priority-grid');if(!grid)return;
 const p=document.createElement('details');p.id='v36101PerformancePanel';p.className='v36101-performance-panel';
 p.innerHTML='<summary><div><span class="v36101-performance-summary-kicker">Performance intelligence</span><strong id="v36101PerfSummary">Learning your current limiter</strong></div><span class="v36101-performance-summary-meta" id="v36101DataLevel">—</span></summary><div class="v36101-performance-body"><div class="v36101-performance-top"><div class="v36101-performance-cell"><div class="v36101-performance-kicker">Decision data</div><div class="v36101-data-chips" id="v36101DataChips"></div><div class="v36101-performance-note" id="v36101DataNote"></div></div><div class="v36101-performance-cell"><div class="v36101-performance-kicker">Likely current limiter</div><div class="v36101-performance-value" id="v36101Limiter">—</div><div class="v36101-performance-note" id="v36101LimiterNote"></div></div></div><div class="v36101-context-row"><div class="v36101-context-head"><div><div class="v36101-context-title">Today-only context</div><div class="v36101-context-sub">Temporary constraints; they do not change your normal program.</div></div></div><div class="v36101-context-chips"><button class="btn v36101-context-chip" data-v36101-context="traveling" type="button">Traveling</button><button class="btn v36101-context-chip caution" data-v36101-context="sickReturn" type="button">Sick / returning</button><button class="btn v36101-context-chip caution" data-v36101-context="verySore" type="button">Very sore</button><button class="btn v36101-context-chip" data-v36101-time="30" type="button">30 min</button><button class="btn v36101-context-chip" data-v36101-time="45" type="button">45 min</button><button class="btn v36101-context-chip" data-v36101-context="limitedEquipment" type="button">No gym today</button></div></div></div>';
 grid.insertAdjacentElement('afterend',p);
 p.addEventListener('click',e=>{const c=e.target.closest('[data-v36101-context]');if(c){e.preventDefault();toggleCtxFlag(c.dataset.v36101Context);return}const t=e.target.closest('[data-v36101-time]');if(t){e.preventDefault();setTimeBudget(Number(t.dataset.v36101Time))}});
 syncPerformancePanel();
}
function syncPerformancePanel(){
 const p=$('#v36101PerformancePanel');if(!p)return;const d=core.localISO(new Date()),c=explicitCtx(d),dc=dataCoverage(d),bn=bottleneckSnapshot(d);
 $('#v36101DataLevel').textContent=dc.level+' data';$('#v36101PerfSummary').textContent=bn.label;$('#v36101DataNote').textContent=dc.note;$('#v36101Limiter').textContent=bn.label;$('#v36101LimiterNote').textContent=bn.note;
 $('#v36101DataChips').innerHTML='<span class="v36101-data-chip '+(dc.rec?'good':'warn')+'">Recovery '+(dc.rec?'current':'missing')+'</span><span class="v36101-data-chip '+(dc.rows>=8?'good':'')+'">'+dc.rows+' recent log rows</span><span class="v36101-data-chip '+(dc.cond>=4?'good':'')+'">'+dc.cond+' cardio rows</span><span class="v36101-data-chip">'+dc.wear+' wearable sessions</span>';
 $$('[data-v36101-context]',p).forEach(b=>b.classList.toggle('active',!!c[b.dataset.v36101Context]));$$('[data-v36101-time]',p).forEach(b=>b.classList.toggle('active',Number(c.timeBudget)===Number(b.dataset.v36101Time)));
}


// ---------- Repeated weak-link watch ----------
function installWeakLinkPanel(){
 if($('#v36105WeakLinkPanel'))return;const perf=$('#v36101PerformancePanel');if(!perf)return;const p=document.createElement('details');p.id='v36105WeakLinkPanel';p.className='v36105-weak-panel hidden';p.innerHTML='<summary><div><span class="v36105-kicker">Movement weak-link watch</span><strong id="v36105WeakSummary">No repeated mismatch</strong></div><span class="v36105-confidence" id="v36105WeakConfidence">—</span></summary><div class="v36105-weak-body"><div class="v36105-weak-grid"><div><div class="v36105-kicker">Unexpectedly hard movement</div><div class="v36105-main" id="v36105WeakTarget">—</div></div><div><div class="v36105-kicker">Possible secondary bottleneck</div><div class="v36105-main" id="v36105WeakMuscle">—</div></div></div><div class="v36105-copy" id="v36105WeakWhy"></div><div class="v36105-copy" id="v36105WeakComparators"></div><div class="v36105-suggestions" id="v36105WeakSuggestions"></div><div class="v36105-footnote">This is a confidence-gated training hypothesis, not a diagnosis. One hard session is never enough to trigger it.</div></div>';perf.insertAdjacentElement('afterend',p);syncWeakLinkPanel();
}
function syncWeakLinkPanel(){
 const p=$('#v36105WeakLinkPanel');if(!p)return;let hits=[];try{hits=core.weakLinkDiagnostics(core.localISO(new Date()))||[]}catch(_){hits=[]}if(!hits.length){p.classList.add('hidden');return}p.classList.remove('hidden');const x=hits[0],pct=Math.round((Number(x.confidence)||0)*100),level=pct>=70?'Higher confidence':pct>=52?'Moderate confidence':'Early signal';$('#v36105WeakSummary').textContent=x.target+' → '+x.muscleLabel;const conf=$('#v36105WeakConfidence');if(conf){conf.textContent=level;conf.className='v36105-confidence '+(pct>=70?'high':pct>=52?'medium':'');}$('#v36105WeakTarget').textContent=x.target;$('#v36105WeakMuscle').textContent=x.muscleLabel;$('#v36105WeakWhy').textContent=x.note||'';$('#v36105WeakComparators').innerHTML=x.comparators?.length?'<strong>Related movements behaving better:</strong> '+x.comparators.map(esc).join(' • '):'';$('#v36105WeakSuggestions').innerHTML=x.suggestedExercises?.length?'<strong>Targeted work the model will modestly favor:</strong> '+x.suggestedExercises.map(n=>'<span>'+esc(n)+'</span>').join(''):'';
}

// ---------- Full second-workout guidance ----------
function installSecondWorkoutPanel(){
 if($('#v36105SecondWorkoutPanel'))return;const weak=$('#v36105WeakLinkPanel'),perf=$('#v36101PerformancePanel');const after=weak||perf;if(!after)return;const p=document.createElement('details');p.id='v36105SecondWorkoutPanel';p.className='v36105-second-panel hidden';p.innerHTML='<summary><div><span class="v36105-kicker">Another full session today</span><strong id="v36105SecondSummary">Second-workout guidance</strong></div><span class="v36105-second-state" id="v36105SecondState">—</span></summary><div class="v36105-second-body"><div class="v36105-second-head"><div><div class="v36105-kicker">Best full second workout</div><div class="v36105-main" id="v36105SecondName">—</div><div class="v36105-copy" id="v36105SecondReason"></div></div><button class="btn primary" id="v36105SecondOpen" type="button">Open full workout</button></div><div class="v36105-second-metrics" id="v36105SecondMetrics"></div><div class="v36105-second-options" id="v36105SecondOptions"></div><div class="v36105-footnote">This is a standalone second session, not the short smart-secondary/add-on system. Same-day overlap and tomorrow’s fixed anchor are scored separately.</div></div>';after.insertAdjacentElement('afterend',p);p.addEventListener('click',e=>{const b=e.target.closest('[data-second-session]');if(!b)return;e.preventDefault();core.openFullSecondWorkout(b.dataset.secondSession,core.localISO(new Date()));});$('#v36105SecondOpen')?.addEventListener('click',()=>{const s=$('#v36105SecondOpen')?.dataset?.session;if(s)core.openFullSecondWorkout(s,core.localISO(new Date()))});syncSecondWorkoutPanel();
}
function syncSecondWorkoutPanel(){
 const p=$('#v36105SecondWorkoutPanel');if(!p)return;let r;try{r=core.fullSecondWorkoutRecommendation(core.localISO(new Date()))}catch(_){r=null}if(!r?.available){p.classList.add('hidden');return}p.classList.remove('hidden');const top=r.top,open=$('#v36105SecondOpen');if(!top){$('#v36105SecondSummary').textContent='No suitable full session';$('#v36105SecondState').textContent='Hold';$('#v36105SecondName').textContent='No recommendation';$('#v36105SecondReason').textContent=r.reason||'';if(open)open.classList.add('hidden');return}$('#v36105SecondSummary').textContent=r.recommended?top.session+' • '+top.label:'Full second workout not advised';const stateBadge=$('#v36105SecondState');if(stateBadge){stateBadge.textContent=r.recommended?'Feasible':r.blocked?'Stop at current sessions':'Low value';stateBadge.className='v36105-second-state '+(r.recommended?'good':r.blocked?'stop':'caution');}$('#v36105SecondName').textContent=top.session+' • '+top.label;$('#v36105SecondReason').textContent=r.reason||'';if(open){open.dataset.session=top.session;open.classList.toggle('hidden',!r.recommended)}const gap=Number(top.gapHours)||0,wait=Number(top.waitHours)||0,anchor=r.anchor?.days<9999?(r.anchor.days===1?'Tomorrow: '+r.anchor.session:r.anchor.days+'d: '+r.anchor.session):'No fixed anchor within 2 days';$('#v36105SecondMetrics').innerHTML='<span>Overlap '+Math.round((Number(top.overlap)||0)*100)+'%</span><span>Suggested separation ~'+gap+' h</span>'+(wait>.1?'<span>Wait ~'+wait+' h more</span>':'<span>Separation window okay</span>')+'<span>'+esc(anchor)+'</span>';$('#v36105SecondOptions').innerHTML=(r.options||[]).slice(0,4).map((x,i)=>'<button type="button" class="btn '+(i===0&&r.recommended?'primary':'')+'" data-second-session="'+esc(x.session)+'"'+(!r.recommended?' disabled title="The model is not recommending another full session today."':'')+'><strong>'+esc(x.session)+'</strong><span>'+esc(x.label)+' • score '+esc(x.score)+'</span></button>').join('');
}

// ---------- Workout Mode + progressive exercise disclosure ----------
let focusIndex=0,restTick=0;
function activeMatches(){try{const a=core.readActiveWorkout();return !!(a&&core.trackerMatchesLog(a))}catch(_){return false}}
function readFocus(){try{return JSON.parse(localStorage.getItem(FOCUS_KEY)||'null')}catch(_){return null}}
function writeFocus(x){try{localStorage.setItem(FOCUS_KEY,JSON.stringify(x))}catch(_){ }}
function exerciseCards(){return $$('#plannedExercises>.log-exercise')}
function currentCardName(c){try{return core.currentCardExercise(c)||c?.dataset?.plannedExercise||'Exercise'}catch(_){return c?.dataset?.plannedExercise||'Exercise'}}
function setFocus(i,scroll=false){
 const cards=exerciseCards();if(!cards.length)return;focusIndex=Math.max(0,Math.min(cards.length-1,Number(i)||0));cards.forEach((c,n)=>c.classList.toggle('v36101-current-exercise',n===focusIndex));
 const c=cards[focusIndex],a=core.readActiveWorkout();writeFocus({id:a?.id||'',index:focusIndex});$('#v36101WorkoutName').textContent=currentCardName(c);$('#v36101WorkoutProgress').textContent='Exercise '+(focusIndex+1)+' of '+cards.length;$('#v36101PrevExercise').disabled=focusIndex===0;$('#v36101NextExercise').disabled=focusIndex===cards.length-1;if(scroll)c.scrollIntoView({behavior:'smooth',block:'start'});
}
function sessionElapsed(active){if(!active?.startedAt)return 0;const end=active.status==='paused'&&active.pausedAt?Number(active.pausedAt):Date.now(),paused=Math.max(0,Number(active.pausedMs)||0);return Math.max(0,Math.floor((end-Number(active.startedAt)-paused)/1000))}
function fmtClock(s){return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function installWorkoutBar(){
 if($('#v36101WorkoutModeBar'))return;const tracker=$('#workoutSessionTracker');if(!tracker)return;
 const b=document.createElement('div');b.id='v36101WorkoutModeBar';b.className='v36101-workout-mode-bar';b.innerHTML='<div class="v36101-workout-mode-main"><div class="v36101-workout-mode-name"><span>Workout mode</span><strong id="v36101WorkoutName">Workout</strong><div class="v36101-mode-progress" id="v36101WorkoutProgress"></div><div class="v36101-rest-clock" id="v36101RestClock"></div></div><div class="v36101-workout-mode-nav"><button class="btn" id="v36101PrevExercise" type="button" aria-label="Previous exercise">‹</button><button class="btn" id="v36101NextExercise" type="button" aria-label="Next exercise">›</button><button class="btn primary" id="v36101FinishJump" type="button">Finish</button></div></div>';
 tracker.insertAdjacentElement('beforebegin',b);$('#v36101PrevExercise').addEventListener('click',()=>setFocus(focusIndex-1,true));$('#v36101NextExercise').addEventListener('click',()=>setFocus(focusIndex+1,true));$('#v36101FinishJump').addEventListener('click',()=>{const d=$('#v36101FinishDetails');if(d){d.open=true;d.scrollIntoView({behavior:'smooth',block:'start'})}});
 $('#plannedExercises')?.addEventListener('click',e=>{const card=e.target.closest('.log-exercise');if(!card||card.classList.contains('v36101-current-exercise')||!e.target.closest('.log-title'))return;setFocus(exerciseCards().indexOf(card),true)});syncWorkoutMode();
}
function latestCompletedSetTime(){let t=0;exerciseCards().forEach(c=>$$('.set-detail-row',c).forEach(r=>t=Math.max(t,Number(r.dataset.completedAt)||0)));return t}
function syncRestClock(){
 const e=$('#v36101RestClock');if(!e)return;const a=core.readActiveWorkout(),elapsed=sessionElapsed(a),t=latestCompletedSetTime(),parts=[];if(elapsed)parts.push('Session '+fmtClock(elapsed));if(t){const rest=Math.max(0,Math.floor((Date.now()-t)/1000));parts.push('Rest '+fmtClock(rest))}if(a?.status==='paused')parts.push('Paused');e.textContent=parts.join(' • ');
}
function syncWorkoutMode(){
 installWorkoutBar();const active=activeMatches()&&$('#log')?.classList.contains('active'),bar=$('#v36101WorkoutModeBar');document.body.classList.toggle('v36101-workout-mode',active);bar?.classList.toggle('active',active);
 if(active){const a=core.readActiveWorkout(),saved=readFocus();if(saved?.id===a?.id)focusIndex=Number(saved.index)||0;setFocus(focusIndex,false);syncRestClock()}else exerciseCards().forEach(c=>c.classList.remove('v36101-current-exercise'));
}
function decorateExerciseCard(card){
 if(!card||card.dataset.v36101Decorated==='1')return;card.dataset.v36101Decorated='1';const title=$('.log-title',card);if(title&&!$('.v36101-focus-hint',title)){const h=document.createElement('div');h.className='v36101-focus-hint';h.textContent='Tap to focus';title.querySelector('div')?.appendChild(h)}
 if(card.dataset.conditioning==='1')return;const grid=$('.log-grid',card);if(!grid)return;
 const fields=['.le-tech','.le-status','.le-notes'].map(s=>$(s,card)?.closest('.field')).filter(Boolean),setBox=$('.set-detail-box',card);if(!fields.length&&!setBox)return;
 const more=document.createElement('details');more.className='v36101-exercise-more';const hasValue=fields.some(f=>{const x=$('input,select,textarea',f);return x&&(String(x.value||'').trim()&&!(x.classList.contains('le-status')&&String(x.value)==='Complete'))})||!!setBox?.querySelector('.set-detail-row[data-completed-at]:not([data-completed-at=""])');if(hasValue)more.open=true;
 more.innerHTML='<summary>More exercise details</summary><div class="v36101-exercise-more-body"></div>';const body=$('.v36101-exercise-more-body',more);fields.forEach(f=>body.appendChild(f));if(setBox)body.appendChild(setBox);grid.appendChild(more);
}
function decorateAllCards(){exerciseCards().forEach(decorateExerciseCard);syncWorkoutMode()}
function installFinishDisclosure(){
 if($('#v36101FinishDetails'))return;const feel=$('#log .session-feel');if(!feel)return;const rec=$('#recommendationFeedbackPanel'),wear=$('#wearableWorkoutDetails'),d=document.createElement('details');d.id='v36101FinishDetails';d.className='v36101-finish-details';d.innerHTML='<summary>03 Finish & feedback</summary><div class="v36101-finish-body"></div>';feel.insertAdjacentElement('beforebegin',d);const body=$('.v36101-finish-body',d);body.appendChild(feel);if(rec)body.appendChild(rec);if(wear)body.appendChild(wear);
}

// ---------- Undo expansion ----------
function offerStateUndo(message,snapshot,reason){if(!snapshot)return;core.offerUndo(message,()=>{core.restoreUndo(snapshot,reason);setTimeout(()=>{decorateAllCards();syncPerformancePanel()},20)})}
function installUndoCoverage(){
 $('#plannedExercises')?.addEventListener('click',e=>{if(!e.target.closest('.card-remove'))return;const snap=core.snapshotUndo();setTimeout(()=>offerStateUndo('Exercise removed.',snap,'undo-remove-exercise'),0)},true);
 document.addEventListener('click',e=>{if(!e.target.closest('.v3691-quick-complete button'))return;const snap=core.snapshotUndo(),before=state().logs.length;setTimeout(()=>{if(state().logs.length!==before)offerStateUndo('Workout quick-completed.',snap,'undo-quick-complete')},300)},true);
 document.addEventListener('click',e=>{const b=e.target.closest('[data-intent],[data-action]');if(!b)return;const v=b.dataset.intent||b.dataset.action||'';if(!['plan','active-recovery','rest','cal-adaptive','gym-adaptive','kb-heavy','kb-power','kb-volume','cond-adaptive'].includes(v))return;const snap=core.snapshotUndo();setTimeout(()=>offerStateUndo('Today’s workout changed.',snap,'undo-workout-change'),160)},true);
 const sel=$('#logSession');if(sel){sel.addEventListener('pointerdown',()=>{sel.__v36101UndoSnapshot=core.snapshotUndo()},{capture:true});sel.addEventListener('change',e=>{if(!e.isTrusted)return;const snap=sel.__v36101UndoSnapshot;if(snap)offerStateUndo('Session changed to '+sel.value+'.',snap,'undo-session-change')})}
 // Existing rest-day UI invokes the core function; capture the state immediately before that click.
 document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!/rest day|full rest|set rest/i.test((b.textContent||'')+' '+(b.title||'')))return;const snap=core.snapshotUndo(),before=JSON.stringify(state().restDays||{});setTimeout(()=>{if(JSON.stringify(state().restDays||{})!==before)offerStateUndo('Rest day changed.',snap,'undo-rest-day')},180)},true);
}

// ---------- Comparable prior-session context in History ----------
function groupAvgEffort(g){const a=(g?.rows||[]).map(r=>core.effectiveEffortRpe(r)).filter(x=>x>0);return a.length?a.reduce((s,x)=>s+x,0)/a.length:0}
function groupDemand(g){let sum=0;(g?.rows||[]).filter(r=>!core.rowIsAdaptiveSecondary(r)&&!['skipped','missed'].includes(String(r.status||'').toLowerCase())).forEach(r=>{if(r.session==='Conditioning'||r.conditioning)return;try{sum+=Number(core.utmPlannedDemandIndex(r.exercise,{sets:r.sets,reps:r.reps,weight:r.weight,setDetails:r.setDetails||[]}))||0}catch(_){ }});return sum}
function comparisonText(cur,prev){
 if(!prev)return '';const cRows=core.completedUsableRows(cur),pRows=core.completedUsableRows(prev),cCond=cRows.find(r=>r.session==='Conditioning'||r.metrics?.time||r.metrics?.distance),pCond=pRows.find(r=>r.session==='Conditioning'||r.metrics?.time||r.metrics?.distance),parts=[];
 if(cCond&&pCond){const ct=Number(cCond.metrics?.time)||0,pt=Number(pCond.metrics?.time)||0,cd=Number(cCond.metrics?.distance)||0,pd=Number(pCond.metrics?.distance)||0;if(ct&&pt)parts.push('duration '+(ct-pt>=0?'+':'')+Math.round((ct-pt)*10)/10+' min');if(cd&&pd)parts.push('distance '+(cd-pd>=0?'+':'')+Math.round((cd-pd)*100)/100+' '+(cCond.metrics?.distanceUnit||''));}
 else{const cd=groupDemand(cur),pd=groupDemand(prev);if(cd&&pd){const pct=(cd/pd-1)*100;if(Math.abs(pct)>=2)parts.push('modeled work '+(pct>=0?'+':'')+Math.round(pct)+'%')}const common=cRows.map(r=>r.exercise).filter(x=>pRows.some(r=>r.exercise===x)).slice(0,2);common.forEach(name=>{const a=cRows.find(r=>r.exercise===name),b=pRows.find(r=>r.exercise===name),aw=parseFloat(a?.weight),bw=parseFloat(b?.weight),ar=core.utmRepAverage(a?.reps),br=core.utmRepAverage(b?.reps);if(Number.isFinite(aw)&&Number.isFinite(bw)&&Math.abs(aw-bw)>=2.5)parts.push(name+' '+(aw-bw>0?'+':'')+(Math.round((aw-bw)*10)/10)+' load');else if(ar&&br&&ar!==br)parts.push(name+' '+(ar-br>0?'+':'')+(Math.round((ar-br)*10)/10)+' reps')})}
 const ce=groupAvgEffort(cur),pe=groupAvgEffort(prev);if(ce&&pe&&Math.abs(ce-pe)>=.25)parts.push('avg effort '+(ce-pe>0?'+':'')+(Math.round((ce-pe)*10)/10));if(!parts.length)parts.push('very similar completed dose');return 'Vs '+prev.date+': '+parts.slice(0,3).join(' • ');
}
function enhanceHistoryComparisons(){
 let groups=[];try{groups=core.historySessionGroups()||[]}catch(_){return}
 $$('#historyBody .history-session-header').forEach(h=>{if($('.v36101-history-compare',h))return;const sid=$('.edit-session',h)?.dataset.sessionId,g=sid?groups.find(x=>x.sessionId===sid):null;if(!g)return;const prev=groups.filter(x=>x.session===g.session&&x.date<g.date).sort((a,b)=>b.date.localeCompare(a.date))[0],text=comparisonText(g,prev);if(!text)return;const meta=$('.history-session-meta',h);if(meta){const d=document.createElement('div');d.className='v36101-history-compare';d.innerHTML='<strong>Closest prior:</strong> '+esc(text);meta.appendChild(d)}});
 const mobile=$('#historyMobileCards');if(mobile)$$('.history-mobile-edit',mobile).forEach(edit=>{const sid=edit.dataset.sessionId,g=groups.find(x=>x.sessionId===sid),row=edit.closest('.mobile-data-row');if(!g||!row||$('.v36101-history-compare',row))return;const prev=groups.filter(x=>x.session===g.session&&x.date<g.date).sort((a,b)=>b.date.localeCompare(a.date))[0],text=comparisonText(g,prev);if(text){const d=document.createElement('div');d.className='v36101-history-compare';d.innerHTML='<strong>Closest prior:</strong> '+esc(text);edit.closest('.inline-actions')?.insertAdjacentElement('beforebegin',d)}});
}

// ---------- Wiring ----------
function boot(){
 installUpdateBanner();installPerformancePanel();installWeakLinkPanel();installSecondWorkoutPanel();installWorkoutBar();installFinishDisclosure();installUndoCoverage();decorateAllCards();syncWorkoutMode();syncPerformancePanel();syncWeakLinkPanel();syncSecondWorkoutPanel();enhanceHistoryComparisons();
 const plan=$('#plannedExercises');if(plan)new MutationObserver(()=>{clearTimeout(window.__v36101CardTimer);window.__v36101CardTimer=setTimeout(decorateAllCards,0)}).observe(plan,{childList:true,subtree:true});
 const hist=$('#history');if(hist)new MutationObserver(()=>{clearTimeout(window.__v36101HistTimer);window.__v36101HistTimer=setTimeout(enhanceHistoryComparisons,15)}).observe(hist,{childList:true,subtree:true});
 ['startWorkoutTracker','pauseWorkoutTracker','resumeWorkoutTracker','discardWorkoutTracker'].forEach(id=>$('#'+id)?.addEventListener('click',()=>setTimeout(syncWorkoutMode,30)));$('#saveSession')?.addEventListener('click',()=>setTimeout(()=>{syncWorkoutMode();syncWeakLinkPanel();syncSecondWorkoutPanel()},450));
 document.addEventListener('click',e=>{if(e.target.closest('[data-view="log"],#quickLog,#activeWorkoutReturn'))setTimeout(()=>{syncWorkoutMode();decorateAllCards()},60);if(e.target.closest('[data-view="history"],[data-mobile-view="history"]'))setTimeout(enhanceHistoryComparisons,80)});
 restTick=setInterval(()=>{if(document.body.classList.contains('v36101-workout-mode'))syncRestClock()},1000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
