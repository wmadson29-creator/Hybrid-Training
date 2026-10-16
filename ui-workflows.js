/* v36.183: practical mobile workflows. Presentation never writes training records. */
(()=>{
 'use strict';
 const core=window.HybridCore;if(!core)return;
 // Keep search results and editable fields inside the visible part of a phone.
 // visualViewport also covers browsers whose layout viewport does not shrink for IME.
 function keyboardViewport(){
  const viewport=window.visualViewport,html=document.documentElement;
  let baseline=innerHeight,width=innerWidth,frame=0;
  const editable=el=>el instanceof HTMLElement&&!el.matches('[readonly],[disabled]')&&(el.isContentEditable||el.matches('textarea,input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="color"]):not([type="date"]):not([type="time"]):not([type="hidden"])'));
  function reveal(el,top,bottom){
   const rect=el.getBoundingClientRect(),delta=rect.bottom>bottom?rect.bottom-bottom:rect.top<top?rect.top-top:0;
   if(Math.abs(delta)<2)return;
   for(let parent=el.parentElement;parent&&parent!==document.body;parent=parent.parentElement){
    if(/auto|scroll/.test(getComputedStyle(parent).overflowY)&&parent.scrollHeight>parent.clientHeight+1){const before=parent.scrollTop;parent.scrollBy({top:delta,behavior:'instant'});if(parent.scrollTop!==before)return}
   }
   window.scrollBy({top:delta,behavior:'instant'});
  }
  function update(){
   frame=0;const height=viewport?.height||innerHeight,top=viewport?.offsetTop||0,el=document.activeElement;
   if(Math.abs(innerWidth-width)>80){baseline=innerHeight;width=innerWidth}
   baseline=Math.max(baseline,innerHeight,height);
   const phone=matchMedia('(max-width:820px), (pointer:coarse)').matches,open=phone&&(editable(el)||document.body.classList.contains('keyboard-open'))&&(viewport?.scale||1)<1.1&&baseline-height>120;
   html.style.setProperty('--hybrid-visible-height',Math.round(height)+'px');html.style.setProperty('--hybrid-visible-top',Math.round(top)+'px');
   document.body.classList.toggle('keyboard-open',open);
   if(open&&editable(el))reveal(el,top+12,top+height-16);
  }
  const queue=()=>{if(!frame)frame=requestAnimationFrame(update)};
  viewport?.addEventListener('resize',queue,{passive:true});viewport?.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',queue,{passive:true});
  document.addEventListener('focusin',()=>{queue();setTimeout(queue,300)});document.addEventListener('focusout',queue);queue();
 }
 keyboardViewport();
 const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const text=(n,s)=>{if(n&&n.textContent!==String(s??''))n.textContent=s??''};
 const iso=()=>core.localISO(new Date()),day=(d,n)=>core.localISO(core.addDays(core.parseLocalISO(d),n));
 const valid=r=>r.date<=iso()&&!['skipped','missed'].includes(String(r.status||'').toLowerCase());
 const state=()=>core.getState(),button=(s,fn)=>{const b=document.createElement('button');b.type='button';b.className='btn';b.textContent=s;b.addEventListener('click',fn);return b};
 let trendsStamp='',pendingEdit=null,recalc=null,raf=0,historyTimer=0;
 const uiStyle=document.createElement('style');uiStyle.textContent=`
 .v36152-primary{border-left:4px solid var(--accent,#4aaff3);margin-bottom:12px}.v36152-primary h2{font-size:1.25rem;margin:5px 0}.v36152-primary p{margin:6px 0;color:var(--muted);line-height:1.4}.v36152-primary .selected-workout-actions{margin:12px 0 0}.v36152-recovery>summary,.v36152-more>summary{cursor:pointer;padding:12px;font-weight:800}.v36152-recovery{border:1px solid var(--line);border-radius:16px;margin:12px 0}.v36152-recovery>div{padding:0 12px 12px}.v36152-recovery .panel{margin-top:12px}
 .v36152-history-filters{margin:0 0 12px;padding:12px;background:var(--panel);border:1px solid var(--line);border-radius:14px}.v36152-filter-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.v36152-filter-grid label{font-size:.75rem;color:var(--muted);display:block;margin:0 0 4px}.v36152-filter-grid input,.v36152-filter-grid select{width:100%;min-width:0}.v36152-history-filters .inline-actions{margin-top:10px}
 .v36152-summary-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.v36152-summary-grid .card{min-width:0;padding:12px}.v36152-summary-grid strong{display:block;font-size:1.25rem;margin:4px 0}.v36152-summary-grid small{color:var(--muted)}.v36152-window{font-size:.72rem;color:var(--muted);margin:8px 0}.v36152-exercise-controls{display:grid;grid-template-columns:2fr 1fr;gap:10px}.v36152-exercise-controls select{width:100%;min-width:0}.v36152-metric-buttons{display:flex;gap:7px;margin:10px 0;flex-wrap:wrap}.v36152-metric-buttons .active{border-color:var(--accent,#4aaff3);color:var(--accent,#4aaff3)}.v36152-chart svg{display:block;width:100%;height:auto}.v36152-chart input[type=range]{width:100%;padding:0}.v36152-result{border:1px solid var(--line);border-radius:10px;padding:10px;margin:8px 0;line-height:1.5}.v36152-result p{font-size:.75rem;color:var(--muted);margin:5px 0}.v36152-result dl{display:grid;grid-template-columns:1fr auto;gap:5px;margin:8px 0;font-size:.78rem}.v36152-result dd{margin:0;text-align:right}.v36152-result dt{color:var(--muted)}.v36152-mobile-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v36152-mobile-metrics .v36152-result{margin:0}
 .v36175-exercise-chooser{grid-column:1/-1;border-bottom:1px solid var(--line);margin:0 0 8px;padding:6px 0}.v36175-exercise-chooser>summary{color:var(--muted);font-size:.72rem;cursor:pointer;padding:8px 0}.v36175-exercise-chooser>.field{margin-top:8px}.v36175-redundant-target{display:none}#v36175WorkoutSettings{display:grid;gap:10px;margin:12px 0}#v36175WorkoutSettings>.btn{width:100%}#v36175WorkoutEquipment>summary{font-size:.76rem;line-height:1.5}#v36175WorkoutEquipment .btn{margin-top:10px}.v36152-class-details{grid-column:1/-1;border-top:1px solid var(--line);margin-top:6px;padding-top:8px}.v36152-class-details>summary{padding:8px 0;font-weight:800;cursor:pointer}.v36152-class-details .log-grid{padding-top:8px}.v36152-class-primary .class-focus-host{grid-column:1/-1}
 .v36152-conflict{border-left:3px solid #e8b459;padding:10px;margin:10px 0;background:rgba(232,180,89,.06);border-radius:8px}.v36152-conflict p{font-size:.78rem;line-height:1.45}.v36152-conflict form{display:grid;gap:8px;margin-top:10px}.v36152-conflict form input,.v36152-conflict form select{width:100%;min-width:0}.v36152-conflict-badge,.v36152-updated-badge{display:block;color:#efc570;font-size:.65rem;font-weight:800;margin:5px 0}.v36152-updated-badge{color:var(--accent,#4aaff3)}.day-card.v36152-updated{box-shadow:inset 0 0 0 2px var(--accent,#4aaff3)}.v36152-recalc{margin:10px 0;padding:12px;border:1px solid var(--line);border-radius:14px;background:var(--panel)}.v36152-recalc p{font-size:.78rem;line-height:1.5}.v36152-recalc li{font-size:.75rem;margin:10px 0;line-height:1.5}.v36152-recalc .btn{margin-right:6px}.v36152-more .tablewrap{max-width:100%;overflow:auto}
 /* v36.183: consistent disclosure sizing and readable secondary screens. */
 #dashboard #v36152RecoveryMore{padding:0;min-height:72px;border-radius:14px;background:var(--surface);overflow:hidden}
 #dashboard #v36152RecoveryMore>summary{margin:0;min-height:72px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:16px;list-style:none;line-height:1.4;font-weight:600}
 #v36152RecoveryMore>summary::-webkit-details-marker{display:none}
 .v36176-disclosure-copy{display:grid;gap:4px;min-width:0}
 .v36176-disclosure-copy strong{font-size:1rem;font-weight:650;line-height:1.4}
 .v36176-disclosure-copy small{font-size:.8125rem;line-height:1.4;color:var(--muted);font-weight:450}
 .v36176-disclosure-toggle{color:var(--accent2);font-size:1.3rem;flex:0 0 20px;text-align:center}
 .v36176-disclosure-toggle::before{content:'+'}#v36152RecoveryMore[open] .v36176-disclosure-toggle::before{content:'−'}
 #dashboard #v36152RecoveryMore>div{padding:0 16px 16px;border-top:1px solid var(--line)}
 #dashboard .home-workout-details{padding:0 14px;border-radius:14px;background:var(--surface);margin-top:14px}
 #dashboard .home-workout-details>summary{margin:0;padding:14px 0;min-height:74px;line-height:1.4}
 #dashboard .home-workout-details>summary strong{font-size:1rem;font-weight:650}
 #dashboard .home-workout-details>summary span{font-size:.875rem;line-height:1.4;margin-top:4px;font-weight:450}
 #dashboard .home-workout-details[open]{padding-bottom:14px}
 #dashboard .v36152-primary h2,.workout-prescription-panel .panel-title{font-weight:700;letter-spacing:-.02em}
 #history .btn,#trends .btn,#recovery .btn,#mobileMoreSheet .btn{font-size:.875rem;font-weight:600;min-height:44px;border-radius:10px;box-shadow:none}
 #history .field label,#trends .field label,#recovery .field label{font-size:.8125rem;font-weight:600;line-height:1.4}
 #history .hint,#trends .hint,#recovery .hint,#v36152HistoryFilters label{font-size:.8125rem;line-height:1.5}
 #v36152HistoryFilters{background:var(--surface);border-radius:14px;padding:14px}
 #history .mobile-data-card{padding:14px;border-radius:14px;background:var(--surface);box-shadow:none}
 #history .mobile-data-card h4{font-size:1rem;font-weight:650}
 #history .mobile-data-meta,#history .mobile-data-row{font-size:.8125rem;line-height:1.5}
 #trends .v36152-result strong{font-weight:650}#trends .v36152-result p,#trends .v36152-window{font-size:.8125rem;line-height:1.5}
 #recovery .optional-details>summary{margin:0;min-height:48px;font-size:.875rem;font-weight:600;line-height:1.4;padding:12px 2px}
 .v36101-performance-panel>summary,.v36107-diagnostics>summary,.v36107-history-long>summary{margin:0;min-height:64px;padding:14px;gap:12px}
 .v36101-performance-panel>summary strong,.v36107-diagnostics>summary strong,.v36107-history-long>summary strong{font-size:1rem;font-weight:650;line-height:1.35}
 .v36101-performance-summary-kicker,.v36107-kicker,.v36107-history-long>summary span{font-size:.75rem;font-weight:600;letter-spacing:.035em;line-height:1.4}
 .v36101-performance-note,.v36101-context-sub,.v36101-performance-summary-meta,.v36107-context-note{font-size:.8125rem;line-height:1.5;font-weight:450}
 .v36101-performance-value{font-size:1rem;font-weight:650;line-height:1.35}
 .v36101-context-chip{font-size:.8125rem;font-weight:550;min-height:40px}
 #mobileMoreSheet .mobile-more-group-label{font-size:.75rem;font-weight:600;letter-spacing:.035em;margin:8px 2px 2px}
 #mobileMoreSheet .btn{padding:12px;min-height:48px}
 #stretching .sf-panel,#stretching .sf-card{background:var(--surface);border-radius:14px;padding:14px;box-shadow:none}
 #stretching .sf-title{font-weight:650;letter-spacing:-.015em}#stretching .sf-card-name{font-size:1rem;font-weight:650;line-height:1.4}
 #stretching .sf-copy,#stretching .sf-standalone,#stretching .sf-output-meta,#stretching .sf-how,#stretching .sf-why,#stretching .sf-caution,#stretching .sf-safety{font-size:.8125rem;line-height:1.5}
 #stretching .sf-step,#stretching .sf-region-label{font-size:.75rem;font-weight:600;letter-spacing:.03em}
 #stretching .sf-chip{font-size:.8125rem;font-weight:550;min-height:44px;border-radius:10px;padding:9px 11px}
 #stretching .sf-dose{font-size:.875rem;line-height:1.5;font-weight:550}#stretching .sf-badge{font-size:.75rem;font-weight:500}
 button:focus-visible,summary:focus-visible{outline:2px solid var(--accent2);outline-offset:3px}
 @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}*,*::before,*::after{scroll-behavior:auto!important;transition-duration:0s!important;animation-duration:0s!important}}
 /* A quieter hierarchy for logging: one surface per exercise, readable support text,
    and plain controls. The existing navigation and training behavior stay intact. */
 #log>.panel{background:transparent;border:0;box-shadow:none;padding:4px 0}
 #log .btn{font-weight:650;border-radius:10px;box-shadow:none;font-size:.875rem;min-height:44px}
 #log .btn.primary{background:var(--accent);font-weight:750}
 #log .panel-head h2{font-size:1.375rem;font-weight:700;letter-spacing:-.025em}
 #log .hint,#log .muted,#log .effort-help,#log .session-fatigue-note{font-size:.8125rem;line-height:1.5}
 #log .field label{font-size:.8125rem;font-weight:600;line-height:1.4;margin-bottom:6px}
 #log input,#log select,#log textarea{border-radius:10px;font-weight:450;box-shadow:none}
 #logFlowChooser{background:transparent;border:0;border-bottom:1px solid var(--line);border-radius:0;padding:8px 0 18px;margin-bottom:16px;box-shadow:none}
 #log .v36114-flow-kicker{font-size:.75rem;font-weight:600;letter-spacing:.045em}
 #log .v36114-flow-title{font-size:1.35rem;font-weight:700;letter-spacing:-.02em;line-height:1.25;margin:5px 0}
 #log .v36114-flow-copy,#log .v36114-inline-copy{font-size:.875rem;line-height:1.5;font-weight:450}
 #log .v36114-inline-panel{border:0;padding:12px 0 0;background:transparent}
 #log .v36114-inline-title{font-size:1rem;font-weight:650}
 #log .v36114-build-grid{gap:8px}
 #log .v36114-build-btn{text-align:left;padding:12px;background:var(--surface2)}
 #log .v36114-build-btn strong{font-size:.9375rem;font-weight:650}
 #log .v36114-build-btn span{font-size:.8125rem;font-weight:450;line-height:1.4;margin-top:4px}
 #preparedWorkoutEditor{padding:0 14px;background:var(--surface);border:1px solid var(--line);border-radius:14px;margin:14px 0}
 #preparedWorkoutEditor>summary{border:0;background:transparent;padding:14px 0;font-size:.9375rem;text-align:left;font-weight:650}
 #preparedWorkoutEditor[open]{padding-bottom:14px}
 #preparedWorkoutEditor>p{font-size:.875rem;line-height:1.5;color:var(--muted);margin:0 0 10px}
 #preparedWorkoutEditor .inline-actions{gap:8px}
 #v36175WorkoutSettings{gap:0;margin:0 0 14px}
 #v36175WorkoutSettings>details{border:0;border-bottom:1px solid var(--line);border-radius:0;margin:0;padding:0;background:transparent}
 #v36175WorkoutSettings>details>summary{font-size:.875rem;font-weight:600;padding:13px 0}
 #v36175WorkoutSettings>.btn{margin:8px 0}
 #log .v36175-equipment-caption{margin:0 0 10px}
 #log .gym-choice{font-weight:500;font-size:.875rem;line-height:1.4;min-height:44px}
 #plannedExercises>.log-exercise{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:16px;margin:16px 0 0;box-shadow:none}
 #plannedExercises>.log-exercise::before{display:none}
 #log .log-title{background:transparent;border:0;border-radius:0;padding:0 0 12px;margin:0;gap:10px}
 #log .log-title strong{font-size:1.125rem;line-height:1.3;font-weight:650;letter-spacing:-.015em}
 #plannedExercises>.log-exercise .log-title::before{width:26px;height:26px;flex-basis:26px;font-size:.8125rem;font-weight:600;background:var(--surface2);border:0}
 #log .planned{font-size:.875rem;line-height:1.5;font-weight:500;margin-top:5px}
 #log .log-card-controls .btn{min-width:36px;min-height:36px;padding:5px;font-size:.8125rem;background:transparent;border-color:transparent}
 #log .log-card-controls .btn.danger{color:var(--danger)}
 #log .log-card-controls .card-remove{font-size:0}#log .log-card-controls .card-remove::after{font-size:1.125rem}
 #log .log-swap-trigger{background:transparent;border:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);border-radius:0;padding:12px 0;margin:3px 0 8px}
 #log .log-swap-copy strong{font-size:.875rem;font-weight:600}
 #log .log-swap-copy span{font-size:.8125rem;line-height:1.4;font-weight:450}
 #log .log-swap-icon{background:transparent;border:0}
 #log .log-grid{gap:12px 10px}
 #log .v36175-exercise-chooser{margin:0;padding:2px 0 8px}
 #log .v36175-exercise-chooser>summary,#log .workout-row-tools>summary{font-size:.8125rem;font-weight:500;padding:10px 0}
 #log .optional-details>summary,#log .log-extra-details>summary,#log .set-detail-box>summary{font-size:.875rem;font-weight:600;line-height:1.4}
 #log .effort-chips{gap:8px}
 #log .effort-chip{font-size:.8125rem;min-height:40px;font-weight:550;padding:8px 10px;border-radius:10px}
 #log.v36175-blank-workout #plannedExercises:empty::before{display:none}
 #log.v36175-blank-workout:has(#plannedExercises:empty) #addLogExercise{display:none}
 #log:not(.custom-setup-open):not(.v36114-advanced-open)>.panel>#logGuidedBuilderDetails{display:none}
 @media(max-width:650px){#log .v36114-build-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#log .v36114-build-btn{min-width:0;overflow-wrap:anywhere}#plannedExercises>.log-exercise{padding:14px}#log .log-title{flex-wrap:wrap}#log .log-card-controls{margin-left:auto}}
 @media(max-width:650px){.v36152-summary-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.v36152-mobile-metrics{grid-template-columns:1fr}.v36152-exercise-controls{grid-template-columns:1fr}.v36152-primary .btn{min-height:44px}.v36152-result{overflow-wrap:anywhere}}
 `;document.head.appendChild(uiStyle);const mountStyle=()=>document.body.appendChild(uiStyle);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mountStyle,{once:true});else mountStyle();

 function today(){
  const dash=$('#dashboard');if(!dash)return;
  let top=$('#v36152Primary');if(!top){
   top=document.createElement('section');top.id='v36152Primary';top.className='panel v36152-primary';top.innerHTML='<div class="label" id="v36152PrimaryDate"></div><h2 id="v36152PrimaryTitle"></h2><p id="v36152PrimaryDose"></p><p id="v36152PrimaryContext"></p><div id="v36152ResumeOther"></div>';dash.prepend(top);top.append($('#selectedWorkoutActions'));
   const details=document.createElement('details');details.id='v36152RecoveryMore';details.className='v36152-recovery';details.innerHTML='<summary><span class="v36176-disclosure-copy"><strong>Progress & program details</strong><small>Training balance and plan settings</small></span><span class="v36176-disclosure-toggle" aria-hidden="true"></span></summary><div></div>';dash.append(details);
   const body=$('div',details);[$('.dashboard-priority-grid',dash),$('.program-details',dash),$('#recoverySnapshot')].filter(Boolean).forEach(n=>body.append(n));
  }
  const recovery=$('#recoverySnapshot');if(recovery&&(recovery.parentElement!==dash||recovery.previousElementSibling!==top))dash.insertBefore(recovery,top.nextElementSibling);
  const d=core.uiDayState(),title=$('#workoutTitle')?.textContent||'Your workout',selected=$('#weekStrip .day-card.selected'),dose=selected?.querySelector('.day-focus')?.textContent||$('#tbSub')?.textContent||'';
  text($('#v36152PrimaryDate'),(d.date===iso()?'Today':'Selected day')+' · '+d.date);text($('#v36152PrimaryTitle'),title);text($('#v36152PrimaryDose'),dose);text($('#v36152PrimaryContext'),d.contextText||'');
  const why=$('.v3691-why-panel',top);let whyMore=$('#v36152Why');if(why){if(!whyMore){whyMore=document.createElement('details');whyMore.id='v36152Why';whyMore.className='v36152-more';whyMore.innerHTML='<summary>Why this workout</summary>';top.append(whyMore)}if(why.parentElement!==whyMore)whyMore.append(why)}else whyMore?.remove();
  const primary=$('#selectedWorkoutActions .primary');if(d.active?.date===d.date)text(primary,'Resume Workout');
  let edit=$('#editWorkoutBeforeStart');if(!d.active&&!/Full Rest|Recovery \/ Rest/.test(title)){if(!edit){edit=button('Edit workout',()=>core.uiEditWorkout(core.uiDayState().date));edit.id='editWorkoutBeforeStart';$('#selectedWorkoutActions').append(edit)}}else edit?.remove();
  const saved=core.uiPreparedDraft?.(d.date);let resume=$('#v36176ResumePrepared'),discard=$('#v36183DiscardPrepared');
  if(saved&&!d.active){
   if(!resume){resume=button('Resume saved edits',()=>core.uiResumePrepared(core.uiDayState().date));resume.id='v36176ResumePrepared';$('#selectedWorkoutActions').append(resume);}resume.title=saved.name+' · '+saved.role;
   if(!discard){discard=button('Discard saved edits',()=>core.uiDiscardPrepared(core.uiDayState().date));discard.id='v36183DiscardPrepared';$('#selectedWorkoutActions').append(discard);}discard.title='Discard saved edits for '+d.date+' and return to the default workout.';
  }else{resume?.remove();discard?.remove();}
  const other=$('#v36152ResumeOther');if(d.active&&d.active.date!==d.date){if(other.dataset.date!==d.active.date){other.replaceChildren(button('Resume '+d.active.date+' workout',()=>core.uiOpenWorkout(d.active.date)));other.dataset.date=d.active.date}}else if(other.childNodes.length){other.replaceChildren();delete other.dataset.date}
  conflicts(d);classOverlap(d);renderRecalc();
 }
 function classOverlap(d){
  const warning=core.uiClassOverlap(d.date);let host=$('#v36154ClassOverlap');if(!warning){host?.remove();return}
  const stamp=JSON.stringify(warning);if(host?.dataset.stamp===stamp)return;host?.remove();host=document.createElement('div');host.id='v36154ClassOverlap';host.className='v36152-conflict';host.dataset.stamp=stamp;host.innerHTML='<strong>Class overlaps the next Barbell workout</strong><p>'+esc(warning.text)+'</p><div class="inline-actions"></div>';$('.inline-actions',host).append(button('Review class day',()=>core.uiSelectDate(warning.classDate)));$('#v36152Primary').append(host);
 }
 function conflicts(d){
  const selectedSession=$('#weekStrip .day-card.selected .day-session')?.textContent||$('#workoutTitle')?.textContent||'',noGym=d.context.gymAccess==='no'||d.context.limitedEquipment,conflict=noGym&&/Barbell|Generic Gym/i.test(selectedSession);
  let host=$('#v36152Conflict');if(!conflict){host?.remove()}else if(!host||host.dataset.date!==d.date){
   host?.remove();host=document.createElement('div');host.id='v36152Conflict';host.dataset.date=d.date;host.className='v36152-conflict';host.innerHTML='<strong>Workout needs gym equipment</strong><p>Your saved '+(d.context.traveling?'travel / ':'')+'No gym context conflicts with this workout. The fixed or chosen workout stays in place until you change it.</p><div class="inline-actions"></div>';
   $('.inline-actions',host).append(button('Change workout',()=>core.uiChangeWorkout(d.date)),button('Edit day context',()=>core.uiOpenContext(d.date)));
   if(d.anchor.fixed){const more=document.createElement('details');more.className='v36152-more';more.innerHTML='<summary>Move this program day once</summary><form><label>Move to <input type="date" name="target" value="'+day(d.date,1)+'" min="'+day(d.date,-7)+'" max="'+day(d.date,7)+'" required></label><label>Replace '+d.date+' with <select name="replacement"><option value="active">Active Recovery</option><option value="open">Automatic open day</option><option value="rest">Full Rest</option><option value="conditioning">Conditioning</option></select></label><button type="submit" class="btn primary">Move program day</button><small class="muted">Within 7 days. Another fixed anchor cannot be replaced.</small></form>';more.addEventListener('submit',e=>{e.preventDefault();const target=$('[name=target]',more).value;beginEdit(d.date,target);core.uiMoveProgram(d.date,target,$('[name=replacement]',more).value)});host.append(more)}
   $('#v36152Primary').append(host);
  }
  $$('#weekStrip .day-card').forEach(card=>{const date=card.dataset.date||card.getAttribute('data-iso')||'',session=$('.day-session',card)?.textContent||'';if(!date)return;const c=core.getDayContext(date),bad=(c.gymAccess==='no'||c.limitedEquipment)&&/Barbell|Generic Gym/i.test(session),existing=$('.v36152-conflict-badge',card);if(bad&&!existing){const badge=document.createElement('span');badge.className='v36152-conflict-badge';badge.textContent='Equipment conflict';card.append(badge)}else if(!bad)existing?.remove()});
 }

 function history(){
  const view=$('#history');if(!view||$('#v36152HistoryFilters'))return;
  const host=document.createElement('div');host.id='v36152HistoryFilters';host.className='v36152-history-filters';host.innerHTML='<div class="v36152-filter-grid"><div><label for="historyFrom">From</label><input id="historyFrom" type="date"></div><div><label for="historyTo">To</label><input id="historyTo" type="date"></div><div><label for="historyFamily">Workout family</label><select id="historyFamily"><option value="all">All workouts & recovery</option><option value="barbell">Barbell Strength</option><option value="kb">Kettlebell</option><option value="gym">Generic Gym</option><option value="calisthenics">Calisthenics</option><option value="se">Strength-Endurance</option><option value="emom">EMOM</option><option value="aerobic">LSS / Aerobic</option><option value="hard">Sprints / HIC</option><option value="class">Classes / Activities</option><option value="rest">Full Rest</option></select></div><div><label for="historyExercise">Exercise</label><input id="historyExercise" type="search" placeholder="Find an exercise…"></div></div><div class="inline-actions"></div><p class="v36152-window">Filters search all saved dates, including older history. Edit and wearable actions stay with each matching workout.</p>';
  const actions=$('.inline-actions',host);actions.append(button('All dates',()=>{textRange('','')}),button('Last 30 days',()=>textRange(day(iso(),-29),iso())),button('Last 90 days',()=>textRange(day(iso(),-89),iso())),button('Clear filters',()=>{$$('input',host).forEach(i=>i.value='');$('#historyFamily').value='all';core.uiHistoryRender()}));
  function textRange(a,b){$('#historyFrom').value=a;$('#historyTo').value=b;core.uiHistoryRender()}
  host.addEventListener('change',()=>core.uiHistoryRender());$('#historyExercise',host).addEventListener('input',()=>{clearTimeout(historyTimer);historyTimer=setTimeout(()=>core.uiHistoryRender(),180)});
  const mobile=$('#historyMobileCards'),panel=$('.panel',view);if(panel)panel.insertBefore(host,panel.children[1]||null);else view.insertBefore(host,mobile||view.firstChild);
 }

 function log(){
  const flow=$('#logFlowChooser'),planned=$('#plannedExercises .log-exercise'),blank=core.uiWorkoutEquipment?.().blank;
  $('#log')?.classList.toggle('v36175-blank-workout',!!blank);
  if(flow&&(planned||blank)&&$('.v36114-first-actions',flow)&&!$('.v36152-log-change',flow)){
   const details=document.createElement('details');details.className='v36152-more v36152-log-change';details.innerHTML='<summary>Change workout type</summary>';const actions=$('.v36114-first-actions',flow),advanced=$('.v36114-advanced-btn',flow);$$('button[disabled]',actions).forEach(n=>n.remove());if(advanced)details.append(advanced);details.append(actions);flow.append(details);if(planned)text($('.v36114-flow-copy',flow),'Ready to start. Review or edit your exercises below.');
   const choices=$('.v36114-build-grid',flow)?.closest('.v36114-inline-panel');if(choices){details.append(choices);details.open=true;actions.classList.add('hidden');if(advanced)details.append(advanced);}else details.addEventListener('click',e=>{if(e.target===$(':scope > summary',details))core.uiShowWorkoutTypes?.();});
  }
  let emomSetup=$('#editEmomSetup');if(flow&&planned&&$('#logSession')?.value==='EMOM'){if(!emomSetup){emomSetup=button('Edit minute order & EMOM setup',()=>core.uiEditEmomSetup());emomSetup.id='editEmomSetup';flow.insertBefore(emomSetup,$('.v36152-log-change',flow));}emomSetup.disabled=!core.uiCanEditEmomSetup();}else{emomSetup?.remove();emomSetup=null;}
  let customSetup=$('#editCustomSetup');if(flow&&planned&&core.uiCanEditCustomSetup()){if(!customSetup){customSetup=button('Edit workout preferences',()=>core.uiEditCustomSetup());customSetup.id='editCustomSetup';flow.append(customSetup);}}else{customSetup?.remove();customSetup=null;}
  simplifyLog(flow,planned,emomSetup,customSetup);
  $$('#plannedExercises .log-exercise[data-conditioning="1"]').forEach(card=>{
   if(!core.uiIsClass(core.currentCardExercise(card)))return;
   const grid=$('.log-grid',card),holder=$('.conditioning-fields',card)||grid;if(!grid||$('.v36152-class-details',holder))return;
   const optional=[...holder.children].filter(n=>n.matches('.field,details')&&!n.querySelector('.le-ex,.le-time,.le-rpe,.le-feel')&&!n.classList.contains('class-focus-host'));
   if(!optional.length)return;grid.classList.add('v36152-class-primary');const details=document.createElement('details');details.className='v36152-class-details';details.innerHTML='<summary>More class details</summary><div class="log-grid"></div>';optional.forEach(n=>$('div',details).append(n));holder.append(details);
   const primary=['.le-time','.le-rpe','.le-feel','.class-focus-host'].map(s=>{const n=$(s,holder);return n?.closest('.field')}).filter(Boolean);primary.reverse().forEach(n=>holder.insertBefore(n,holder.firstChild));
   const update=()=>{const filled=$$('input,select',details).filter(n=>n.value&&!(n.classList.contains('le-status')&&n.value==='Complete')).length;text($('summary',details),'More class details'+(filled?' · '+filled+' entered':''))};details.addEventListener('input',update);details.addEventListener('change',update);update();
  });
 }

 function simplifyLog(flow,planned,emomSetup,customSetup){
  const preparation=$('#preparedWorkoutEditor'),active=core.readActiveWorkout(),emom=$('#logSession')?.value==='EMOM',workout=core.uiWorkoutEquipment?.();
  const tools=$('#workoutTools');if(tools&&emom&&!tools.classList.contains('hidden'))tools.classList.add('hidden');text($('#addLogExercise'),emom?'+ Add extra exercise after EMOM':'+ Add Exercise');
  $$('#plannedExercises .workout-pair').forEach(x=>{if(emom)x.disabled=true;});
  if(preparation&&(planned||workout?.blank)&&!active&&workout?.canEdit){
   if(preparation.classList.contains('hidden'))preparation.classList.remove('hidden');
   const add=$('#preparedAddExercise');text(add,'+ Add exercise');if(add)add.classList.toggle('hidden',emom);
   text($(':scope > summary',preparation),workout.blank&&!planned?'Build your workout':'Edit workout');text($(':scope > p',preparation),workout.blank&&!planned?'Choose the equipment you have, then add your first exercise.':'Change targets or swap exercises below. Save edits to keep this workout for this date.');
   if(add)text(add,workout.blank&&!planned?'+ Add first exercise':'+ Add exercise');
   $('#savePreparedWorkout')?.classList.toggle('hidden',!planned);$('#resetPreparedWorkout')?.classList.toggle('hidden',workout.blank);
   let cancel=$('#v36175CancelBlank');if(workout.canCancelBlank){if(!cancel){cancel=button('Cancel blank workout',()=>core.uiCancelBlankWorkout());cancel.id='v36175CancelBlank';$('.inline-actions',preparation).append(cancel);}}else cancel?.remove();
   let settings=$('#v36175WorkoutSettings');if(!settings){settings=document.createElement('div');settings.id='v36175WorkoutSettings';preparation.insertBefore(settings,$('.inline-actions',preparation));}
   const change=$('.v36152-log-change',flow);if(change){$('.v36152-log-change',settings)?.remove();settings.append(change);}
   if(emomSetup&&emomSetup.parentElement!==settings)settings.prepend(emomSetup);if(customSetup&&customSetup.parentElement!==settings)settings.prepend(customSetup);
   if(core.uiWorkoutEquipment?.().canEdit){let equipment=$('#v36175WorkoutEquipment');if(!equipment){equipment=document.createElement('details');equipment.id='v36175WorkoutEquipment';equipment.className='optional-details';equipment.innerHTML='<summary>Equipment for this workout</summary><p class="hint">Use these choices for substitutes in this workout.</p><div class="gym-choice-grid"></div><button class="btn" type="button">Apply equipment</button><p role="status"></p>';settings.prepend(equipment);const choices=$('.gym-choice-grid',equipment);for(const [value,label] of Object.entries(core.uiWorkoutEquipment().labels)){const box=document.createElement('label');box.className='gym-choice';box.innerHTML='<input type="checkbox" value="'+value+'">'+esc(label);choices.append(box);}$('button',equipment).addEventListener('click',()=>{core.uiSetWorkoutEquipment($$('input:checked',equipment).map(x=>x.value));equipment.dataset.editing='';text($('[role=status]',equipment),'Equipment updated. Swap any exercise that needs equipment you did not select.');log();});equipment.addEventListener('change',()=>equipment.dataset.editing='1');}
    const snapshot=core.uiWorkoutEquipment(),eq=snapshot.scope.equipment;const label=eq.map(x=>snapshot.labels[x]).filter(Boolean).join(' · ');text($('summary',equipment),'Equipment for this workout');let caption=$('.v36175-equipment-caption',equipment);if(!caption){caption=document.createElement('p');caption.className='v36175-equipment-caption hint';equipment.insertBefore(caption,$('summary',equipment).nextSibling);}text(caption,label||'No equipment selected');if(!equipment.dataset.editing)$$('input',equipment).forEach(x=>x.checked=eq.includes(x.value));if(snapshot.blank&&!snapshot.hasExercises&&!equipment.dataset.blankOpened){equipment.open=true;equipment.dataset.blankOpened='1';}if(!snapshot.blank)delete equipment.dataset.blankOpened;
   }
  }
  // Defer cosmetic reparenting while typing: moving an input's ancestor drops focus.
  $$('#plannedExercises .log-exercise[data-conditioning="0"]').forEach(card=>{
   const grid=$(':scope > .log-grid',card),swapAction=$(':scope > .log-swap-action',card);if(grid&&swapAction&&swapAction.nextElementSibling!==grid&&!grid.contains(document.activeElement))swapAction.after(grid);const evidence=$(':scope > .target-evidence',card);if(grid&&evidence&&grid.nextElementSibling!==evidence)grid.after(evidence);
   const field=$('.le-ex',card)?.closest('.field');if(field&&!field.closest('.v36175-exercise-chooser')){const details=document.createElement('details');details.className='v36175-exercise-chooser';details.innerHTML='<summary>More exercise choices / custom exercise</summary>';field.before(details);details.append(field);details.open=card.dataset.unplannedExercise==='1';}
   const name=core.currentCardExercise(card),meta=(()=>{try{return JSON.parse(card.dataset.emomPlan||'null')}catch{return null}})();
   if(meta?.dose){const d=meta.dose,reps=$('.le-reps',card),weight=$('.le-weight',card),sets=$('.le-sets',card);text($('.log-title .planned',card),'Target: '+(sets?.value||'')+' rounds · '+(reps?.value||'')+' each minute · '+(weight?.value||'')+' · '+d.estimatedWorkSeconds+'s total work / '+d.estimatedRestSeconds+'s rest');if(reps){const label=$('label',reps.closest('.field'));text(label,(meta.seconds?'Seconds':'Reps')+(meta.perSide?' per side':' total'));}if(sets)text($('label',sets.closest('.field')),'Rounds');}
   else if(!active&&name){const sets=$('.le-sets',card)?.value,reps=$('.le-reps',card)?.value,weight=$('.le-weight',card)?.value;text($('.log-title .planned',card),'Target: '+[sets&&reps?sets+' × '+reps:'',weight||'',card.dataset.plannedRestSeconds?card.dataset.plannedRestSeconds+'s rest':''].filter(Boolean).join(' · '));}
   const swap=$('.log-swap-copy span',card);if(swap)text(swap,'Choose an available '+(meta?'exercise for this minute':'substitute')+'.');
   const note=$('.substitution-rx-note',card);if(note)note.classList.toggle('v36175-redundant-target',note.textContent.startsWith('Updated substitute target:'));
  });
  const gym=$('#logGuidedGymPanel');if(gym&&!$('.v36175-more-preferences',gym)){const extra=document.createElement('details');extra.className='optional-details v36175-more-preferences';extra.innerHTML='<summary>More workout preferences</summary>';['#logGymRepStyle','#logGymPriorityFocus'].forEach(selector=>{const step=$(selector,gym)?.closest('.gym-step');if(step)extra.append(step);});gym.append(extra);}
  // Context belongs with the optional rows, outside the narrow title/actions area.
  $$('#plannedExercises .log-exercise').forEach(card=>{
   const context=$('.workout-card-context',card);if(!context||context.parentElement===card)return;
   const anchor=$(':scope > .target-evidence',card)||$(':scope > .log-grid',card)||$(':scope > .log-title',card);
   if(anchor)anchor.after(context);
  });
 }

 function trends(){
  const view=$('#trends');if(!view?.classList.contains('active'))return;
  const stats=$('#trendStats'),filters=$('#trendFilterRow');if(filters&&filters.nextElementSibling!==$('#v36152TrendSummary')){const summary=$('#v36152TrendSummary');if(summary)filters.insertAdjacentElement('afterend',summary);else stats.before(filters)}
  let summary=$('#v36152TrendSummary');if(!summary){summary=document.createElement('div');summary.id='v36152TrendSummary';filters.insertAdjacentElement('afterend',summary);const more=document.createElement('details');more.className='v36152-more';more.innerHTML='<summary>More totals & model metrics</summary>';stats.before(more);more.append(stats)}
  const totals=stats.closest('details');if(totals&&summary.nextElementSibling!==totals)summary.insertAdjacentElement('afterend',totals);
  const stamp=String(state()._persistedAt||0)+'|'+iso();if(trendsStamp!==stamp||!$('#trendExerciseFocus')?.children.length){trendsStamp=stamp;renderSummary(summary);exerciseChart();strengthCards();balance();}
  phoneTable($('#trendProgression'),'Progression details');
 }
 function renderSummary(host){
  const start=day(iso(),-27),rows=(state().logs||[]).filter(r=>valid(r)&&r.date>=start),groups=core.historySessionGroups().filter(g=>g.date>=start&&g.date<=iso()&&g.rows.some(r=>valid(r)&&r.exercise!=='Rest Day')),aerobic=rows.filter(r=>core.uiIsCardio(r)&&/LSS|Active Recovery/i.test(r.exercise+' '+r.session)).reduce((n,r)=>n+(Number(r.metrics?.time)||Number(r.metrics?.duration)||0),0),recovery=Object.keys(state().dailyRecovery||{}).filter(d=>d>=start&&d<=iso()).length;
  // Sessions are grouped by their saved session identity; planned days never count.
  const cards=[['Completed workouts',groups.length,'sessions'],['Easy aerobic work',Math.round(aerobic),'minutes logged'],['Resistance workouts',groups.filter(g=>g.rows.some(r=>valid(r)&&!core.uiIsCardio(r)&&r.exercise!=='Rest Day')).length,'sessions'],['Recovery check-ins',recovery,'days']];
  host.innerHTML='<p class="v36152-window">Last 28 days · '+esc(start)+'–'+esc(iso())+'</p><div class="v36152-summary-grid">'+cards.map(([label,value,unit])=>'<div class="card"><div class="label">'+esc(label)+'</div><strong>'+value+'</strong><small>'+esc(unit)+'</small></div>').join('')+'</div>';
 }
 let chartExercise='',chartMetric='load',chartDays='90',chartGrip='';
 function exerciseChart(){
  let root=$('#trendExerciseFocus');if(!root){const card=document.createElement('div');card.className='trend-card';card.innerHTML='<h3>One exercise at a time</h3><div class="sub">Recorded load, reps and effort. Choose a result below the chart.</div><div id="trendExerciseFocus"></div>';$('.trend-grid',$('#trends')).prepend(card);root=$('#trendExerciseFocus')}
  const rows=(state().logs||[]).filter(r=>valid(r)&&!core.uiIsCardio(r)&&r.exercise!=='Rest Day'),names=[...new Set(rows.map(r=>r.exercise))].sort();if(!names.includes(chartExercise))chartExercise=names[0]||'';
  root.innerHTML=names.length?'<div class="v36152-exercise-controls"><select id="v36152Exercise" aria-label="Exercise to chart">'+names.map(n=>'<option '+(n===chartExercise?'selected':'')+'>'+esc(n)+'</option>').join('')+'</select><select id="v36152ExerciseRange" aria-label="Exercise chart date range">'+[['30','Last 30 days'],['90','Last 90 days'],['365','Last year'],['all','All recorded dates']].map(([v,l])=>'<option value="'+v+'" '+(v===chartDays?'selected':'')+'>'+l+'</option>').join('')+'</select></div><div class="v36152-metric-buttons">'+['load','reps','effort'].map(m=>'<button class="btn '+(m===chartMetric?'active':'')+'" type="button" data-chart-metric="'+m+'">'+m[0].toUpperCase()+m.slice(1)+'</button>').join('')+'</div><div id="v36152ExercisePlot" class="v36152-chart"></div>':'<div class="empty">Log a resistance exercise to see its recorded results.</div>';
  if(chartExercise==='Weighted Pull-up'){
   if(!chartGrip)chartGrip=core.uiPullupGrip(rows.filter(r=>r.exercise===chartExercise).sort((a,b)=>String(a.date).localeCompare(b.date)||Number(a.completedAt||0)-Number(b.completedAt||0)).at(-1)?.pullupGrip)||'unknown';
   const field=document.createElement('label');field.className='v36152-window';field.textContent='Recorded pull-up grip';const select=document.createElement('select');select.id='v36154ChartGrip';select.setAttribute('aria-label','Recorded pull-up grip');select.innerHTML=[['neutral','Side / Neutral'],['overhand','Overhand'],['unknown','Not recorded']].map(([value,label])=>'<option value="'+value+'" '+(chartGrip===value?'selected':'')+'>'+label+'</option>').join('');field.append(select);root.querySelector('.v36152-exercise-controls').after(field);select.addEventListener('change',event=>{chartGrip=event.target.value;plotExercise(rows)});
  }
  $('#v36152Exercise',root)?.addEventListener('change',e=>{chartExercise=e.target.value;chartGrip='';exerciseChart()});$('#v36152ExerciseRange',root)?.addEventListener('change',e=>{chartDays=e.target.value;exerciseChart()});$$('[data-chart-metric]',root).forEach(b=>b.addEventListener('click',()=>{chartMetric=b.dataset.chartMetric;exerciseChart()}));if(names.length)plotExercise(rows);
 }
 function metric(r){
  const details=Array.isArray(r.setDetails)&&r.setDetails.length?r.setDetails:[r];
  if(chartMetric==='effort'){const numbers=details.map(x=>Number(x.rpe)).filter(x=>x>0&&x<=10);return {value:numbers.length?numbers.reduce((a,b)=>a+b,0)/numbers.length:Number(r.rpe)||null,unit:'RPE',note:'Recorded numerical effort; feedback-only entries have no chart point.'}}
  if(chartMetric==='reps'){const values=details.map(x=>String(x.reps||r.reps||'')).filter(s=>/^\d+(?:\.\d+)?$/.test(s.trim())).map(Number);return {value:values.length?values.reduce((a,b)=>a+b,0)/values.length:null,unit:'reps / set',note:'Mean recorded reps per set. Holds and mixed rep/time prescriptions are excluded.'}}
  const weight=String(r.weight||'').trim(),assisted=/assist/i.test(weight+' '+r.exercise),values=details.map(x=>String(x.weight??r.weight??'')).map(s=>{if(/bodyweight|^bw$/i.test(s))return 0;if(!/^\+?\d+(?:\.\d+)?\s*(?:kg|lb|lbs)?(?:\s*\/\s*(?:hand|bell|side|arm))?$/i.test(s.trim()))return null;const n=parseFloat(s);return /kg/i.test(s)?n*2.2046226218:n}).filter(n=>n!==null&&Number.isFinite(n));
  return {value:values.length?Math.max(...values):null,unit:'lb'+(/\/\s*(hand|bell|side)/i.test(weight)?' per hand / bell / side':''),note:assisted?'Assistance load: less assistance is harder. Compare the same setup.':'Heaviest recorded set load; kg converted to lb. Bodyweight is 0 added load. Compare the same setup.'};
 }
 function plotExercise(rows){
  const start=chartDays==='all'?'':day(iso(),1-Number(chartDays)),points=rows.filter(r=>r.exercise===chartExercise&&(!start||r.date>=start)&&(chartExercise!=='Weighted Pull-up'||(core.uiPullupGrip(r.pullupGrip)||'unknown')===chartGrip)).sort((a,b)=>String(a.date).localeCompare(b.date)||Number(a.completedAt||0)-Number(b.completedAt||0)).map(r=>({r,...metric(r)})).filter(x=>x.value!==null&&Number.isFinite(x.value)),root=$('#v36152ExercisePlot');
  if(!points.length){root.innerHTML='<div class="empty">No recorded '+esc(chartMetric)+' values in this date range.</div>';return}
  const ys=points.map(x=>x.value),min=Math.min(...ys),max=Math.max(...ys),spread=max-min||Math.max(1,Math.abs(max)*.1),lo=Math.max(0,min-spread*.12),hi=max+spread*.12,first=Date.parse(points[0].r.date),last=Date.parse(points.at(-1).r.date),xy=points.map(p=>({x:45+(last===first?.5:(Date.parse(p.r.date)-first)/(last-first))*300,y:172-(p.value-lo)/(hi-lo)*135}));
  root.innerHTML=(chartExercise==='Weighted Pull-up'?'<p class="v36152-window">'+(chartGrip==='unknown'?'Actual grip was not recorded. Individual results are shown without a comparable grip trend.':'Comparing recorded '+esc(chartGrip==='neutral'?'Side / Neutral':'Overhand')+' grip only.')+'</p>':'')+'<p class="v36152-window">'+esc(start||points[0].r.date)+'–'+esc(iso())+' · '+points.length+' result'+(points.length===1?'':'s')+' · '+esc(points[0].unit)+'</p><svg viewBox="0 0 380 210" role="img" aria-label="Recorded '+esc(chartMetric)+' for '+esc(chartExercise)+'"><line x1="45" y1="172" x2="345" y2="172" stroke="currentColor" opacity=".3"/><text x="3" y="43" fill="currentColor" font-size="11">'+hi.toFixed(1)+'</text><text x="3" y="174" fill="currentColor" font-size="11">'+lo.toFixed(1)+'</text><polyline fill="none" stroke="#4aaff3" stroke-width="2" points="'+xy.map(p=>p.x+','+p.y).join(' ')+'"/>'+points.map((p,i)=>'<circle cx="'+xy[i].x+'" cy="'+xy[i].y+'" r="4" fill="#4aaff3"><title>'+esc(p.r.date+': '+p.value.toFixed(1)+' '+p.unit)+'</title></circle>').join('')+'<text x="45" y="200" fill="currentColor" font-size="10">'+esc(points[0].r.date)+'</text><text x="345" y="200" text-anchor="end" fill="currentColor" font-size="10">'+esc(points.at(-1).r.date)+'</text></svg><label for="v36152ChartPoint">Inspect result</label><input id="v36152ChartPoint" type="range" min="0" max="'+(points.length-1)+'" value="'+(points.length-1)+'" step="1"><div id="v36152ChartResult" class="v36152-result" aria-live="polite"></div><p class="v36152-window">'+esc(points[0].note)+'</p>';
  if(chartExercise==='Weighted Pull-up'&&chartGrip==='unknown')root.querySelector('polyline')?.remove();
  const show=i=>{const p=points[i];$('#v36152ChartResult').innerHTML='<strong>'+esc(p.r.date)+' · '+p.value.toFixed(1)+' '+esc(p.unit)+'</strong><p>'+esc([p.r.sets&&p.r.reps?p.r.sets+' × '+p.r.reps:p.r.reps,p.r.weight,p.r.feel,p.r.exercise==='Weighted Pull-up'?'Actual grip: '+(core.uiPullupGrip(p.r.pullupGrip)==='neutral'?'Side / Neutral':core.uiPullupGrip(p.r.pullupGrip)==='overhand'?'Overhand':'Not recorded'):''].filter(Boolean).join(' · '))+'</p>'};$('#v36152ChartPoint').addEventListener('input',e=>show(Number(e.target.value)));show(points.length-1);
 }
 function strengthCards(){
  const root=$('#trendStrengthIntelligence');if(!root)return;const names=[...new Set((state().logs||[]).filter(r=>valid(r)&&!core.uiIsCardio(r)&&r.exercise!=='Rest Day').map(r=>r.exercise))],profiles=names.map(n=>core.uiStrengthProfile(n,iso())).filter(p=>p.n>0||p.observedN>0).sort((a,b)=>(b.observedN||b.n)-(a.observedN||a.n)).slice(0,12),pct=n=>(n>0?'+':'')+Number(n).toFixed(1)+'%',window=w=>w.from+(w.from!==w.to?'–'+w.to:'')+' ('+w.n+' results)';
  root.innerHTML='<p class="v36152-window">Estimated performance compares the earlier and later halves of the last 6 usable results. It accounts for reps, load, effort and exercise order; it is not a measured 1RM.</p><div class="v36152-mobile-metrics">'+profiles.map(p=>'<article class="v36152-result"><strong>'+esc(p.name)+'</strong>'+(p.gripEvidence?'<p>'+esc(p.gripEvidence)+(p.excludedGripRows?' '+p.excludedGripRows+' results with another or unrecorded grip excluded.':'')+'</p>':'')+'<p>'+esc(p.comparison?window(p.comparison.early)+' → '+window(p.comparison.late):p.n?'One result; comparison needs another exposure.':'Comparison needs a recorded actual grip.')+'</p><dl><dt>Estimated performance</dt><dd>'+ (p.comparison?pct(p.absoluteTrendPct):'—')+'</dd><dt>Bodyweight-adjusted trend</dt><dd>'+(p.comparison&&p.latestRelative>0?pct(p.relativeTrendPct):'—')+'</dd><dt>Within-workout set drop</dt><dd>'+(p.repeatabilityObservations?Number(p.repeatabilityDrop).toFixed(1)+'%':'Not recorded')+'</dd><dt>Set-level evidence</dt><dd>'+p.repeatabilityObservations+' workouts</dd><dt>Median recorded rest</dt><dd>'+(p.medianRest?p.medianRest+' seconds':'Not recorded')+'</dd></dl><p>Evidence: '+(p.n<3?'limited':p.n<6?'developing':'more established')+' · '+p.n+' usable results. Confidence score '+Math.round(p.confidence*100)+'% describes evidence availability, not probability of accuracy.</p></article>').join('')+'</div><details class="v36152-more"><summary>Why strength and repeatability can differ</summary><p class="v36152-window">A heavier first set can improve estimated performance while later sets lose more output. Set drop compares the first recorded set with the mean of the last two later sets in that workout; the value above averages workouts with at least two recorded sets. Missing set data is excluded. Bodyweight changes, effort, rep ranges and program waves can also change the estimate. A progression “hold” describes the next prescription, not proof that your fitness stopped improving.</p></details>';
  compactCards(root,4,'More exercise comparisons');
 }
 function compactCards(root,count,label){const grid=$(':scope > .v36152-mobile-metrics',root);if(!grid||grid.children.length<=count)return;const more=document.createElement('details');more.className='v36152-more';more.innerHTML='<summary>'+esc(label)+'</summary><div class="v36152-mobile-metrics"></div>';[...grid.children].slice(count).forEach(n=>$('div',more).append(n));grid.after(more)}
 function phoneTable(root,label){
  if(!root||$('.v36152-mobile-metrics',root))return;const table=$('table',root);if(!table)return;const heads=$$('thead th',table).map(n=>n.textContent),rows=$$('tbody tr',table),cards=document.createElement('div');cards.className='v36152-mobile-metrics';cards.innerHTML=rows.map(r=>{const cells=$$('td',r);return '<article class="v36152-result"><strong>'+esc(cells[0]?.textContent)+'</strong><dl>'+cells.slice(1).map((c,i)=>'<dt>'+esc(heads[i+1])+'</dt><dd>'+esc(c.textContent)+'</dd>').join('')+'</dl></article>'}).join('');
  const wrap=table.closest('.tablewrap')||table,more=document.createElement('details');more.className='v36152-more';more.innerHTML='<summary>'+esc(label)+' table</summary>';wrap.before(cards,more);more.append(wrap);
  if(root.id==='trendProgression'){const note=document.createElement('p');note.className='v36152-window';note.textContent='Direction describes the next prescription. The quality check uses recent results; Hold does not mean strength is unchanged. Effort error is actual minus estimated difficulty, in RPE points. Confidence describes the available evidence.';cards.before(note);$$(':scope > article',cards).forEach(card=>{const name=$('strong',card)?.textContent,rows=(state().logs||[]).filter(r=>valid(r)&&r.exercise===name).sort((a,b)=>a.date.localeCompare(b.date)).slice(-5);if(rows.length){const dates=document.createElement('p');dates.textContent='Recent logged window: '+rows[0].date+'–'+rows.at(-1).date+' · '+rows.length+' records';card.append(dates)}});compactCards(root,4,'More progression signals')}
 }
 function balance(){
  const root=$('#trendTrainingBalance');if(!root)return;phoneTable(root,'Main muscle areas');compactCards(root,4,'All main muscle areas');const muscles=core.muscleDevelopment(iso()),accessory=(muscles.areas||[]).filter(x=>['calves','tibialis','adductors','serratus','grip'].includes(x.key));
  const goals=(core.athleticQualityDevelopment(iso()).rows||[]).slice().sort((a,b)=>b.need-a.need).slice(0,3),goalBox=document.createElement('div');goalBox.className='v36152-result';goalBox.innerHTML='<strong>Training goals</strong><dl>'+goals.map(x=>'<dt>'+esc(x.label)+'</dt><dd>'+esc(x.status)+'</dd>').join('')+'</dl><details class="v36152-more"><summary>Current work & rolling targets</summary>'+goals.map(x=>'<p><strong>'+esc(x.label)+'</strong> · '+esc(x.current)+'<br>Target: '+esc(x.target)+'</p>').join('')+'</details>';root.prepend(goalBox);
  const more=document.createElement('details');more.className='v36152-more v36152-balance-more';more.innerHTML='<summary>Show more: accessory areas, qualities & benchmarks</summary><div class="v36152-mobile-metrics">'+accessory.map(x=>'<article class="v36152-result"><strong>'+esc(x.label)+'</strong><p>'+x.weeklyDose.toFixed(1)+' estimated working sets / week · '+esc(x.status)+'</p><p>'+esc(x.reason)+'</p></article>').join('')+'</div><p class="v36152-window">Display order does not change muscle priorities or prescribed training.</p>';
  const heading=$$('strong',root).find(n=>n.textContent.trim()==='Athletic qualities'),start=heading?.parentElement;if(start){let n=start;while(n){const next=n.nextSibling;more.append(n);n=next}}const horizon=$('.v36131-horizon',root);if(horizon)more.append(horizon);root.append(more);
 }

 function programmingStamp(){const s=state().settings||{};return JSON.stringify(['dayTrainingContext','workoutIntent','dayOverrides','programDayMoves','programPauseWeeks','customDayWorkouts','classOverrides','genericGymWorkouts','calisthenicsWorkouts','kbCustomWorkouts'].map(k=>s[k]))}
 function surrounding(anchors){const rows=new Map();anchors.forEach(d=>core.uiScheduleSnapshot(d).forEach(r=>rows.set(r.date,r)));return [...rows.values()].sort((a,b)=>a.date.localeCompare(b.date))}
 function beginEdit(date,otherDate){if(!date||date<iso())return;if(pendingEdit?.date===date&&Date.now()-pendingEdit.at<1500)return;const anchors=[...new Set([date,otherDate].filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d||'')))];pendingEdit={date,anchors,stamp:programmingStamp(),before:surrounding(anchors),at:Date.now()};const edit=pendingEdit;setTimeout(()=>{if(pendingEdit===edit&&edit.stamp===programmingStamp())pendingEdit=null},4000)}
 function settleEdit(){
  if(!pendingEdit||pendingEdit.stamp===programmingStamp())return;const previous=pendingEdit;pendingEdit=null;const after=surrounding(previous.anchors),changes=[];
  for(const n of after){const old=previous.before.find(x=>x.date===n.date);if(old&&!n.fixed&&!n.manual&&!n.completed&&!old.fixed&&!old.manual&&!old.completed&&JSON.stringify([old.session,old.dose,old.secondary])!==JSON.stringify([n.session,n.dose,n.secondary]))changes.push({old,next:n})}
  recalc={date:previous.date,from:after[0]?.date,to:after.at(-1)?.date,changes};renderRecalc();
 }
 function renderRecalc(){
  if(!recalc)return;let host=$('#v36152Recalc');if(!host){host=document.createElement('div');host.id='v36152Recalc';host.className='v36152-recalc';host.setAttribute('aria-live','polite');$('.calendar-panel')?.before(host)}
  if(host.dataset.report!==JSON.stringify(recalc)){host.dataset.report=JSON.stringify(recalc);host.innerHTML='<strong>Schedule rechecked after your '+esc(recalc.date)+' edit</strong><p>'+esc(recalc.from)+'–'+esc(recalc.to)+'. '+(recalc.changes.length?recalc.changes.length+' nearby automatic day'+(recalc.changes.length===1?' changed.':'s changed.'):'Nearby automatic workouts still fit, so their recommendations stayed the same.')+' Fixed anchors, manual choices and completed days are preserved.</p>'+(recalc.changes.length?'<ul>'+recalc.changes.map(c=>'<li><strong>'+esc(c.next.date)+'</strong><br>Before: '+esc([c.old.label,c.old.dose,c.old.secondary].filter(Boolean).join(' · '))+'<br>Now: '+esc([c.next.label,c.next.dose,c.next.secondary].filter(Boolean).join(' · '))+(c.next.why?'<br>Model reason: '+esc(c.next.why):'')+' <button class="btn" type="button" data-recalc-date="'+c.next.date+'">View day</button></li>').join('')+'</ul>':'')+'<button class="btn" type="button" data-recalc-dismiss>Dismiss</button>';$$('[data-recalc-date]',host).forEach(b=>b.addEventListener('click',()=>core.uiSelectDate(b.dataset.recalcDate)));$('[data-recalc-dismiss]',host).addEventListener('click',()=>{recalc=null;host.remove();markChanged()})}markChanged();
 }
 function markChanged(){$$('#weekStrip .day-card').forEach(card=>{const changed=recalc?.changes.some(c=>c.next.date===card.dataset.date),old=$('.v36152-updated-badge',card);card.classList.toggle('v36152-updated',!!changed);if(changed&&!old){const badge=document.createElement('span');badge.className='v36152-updated-badge';badge.textContent='Updated after your edit';card.append(badge)}else if(!changed)old?.remove()})}
 document.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;if(pendingEdit&&Date.now()-pendingEdit.at>300000)pendingEdit=null;const id=t.id||'',scope=t.closest('#tbList,#workoutIntentPanel,#conditioningLibrary,#dayContextModal,#v3677DayContextModal');if(t.matches('[data-intent]')||t.closest('[data-v3677="context"]')||/save.*context|context.*save|builder.*save|save.*builder|use.*conditioning|switch.*mode/i.test(id)||scope&&t.matches('[data-session],[data-mode],.use-conditioning,.adaptive-mode-btn'))beginEdit(t.matches('.use-conditioning')?$('#conditioningTargetDate')?.value||core.uiDayState().date:core.uiDayState().date)},true);
 document.addEventListener('change',e=>{if(e.target.id==='blockModeSelect')beginEdit(core.uiDayState().date)},true);
 window.addEventListener('hybrid:state-saved',()=>{if(pendingEdit&&pendingEdit.stamp!==programmingStamp())setTimeout(settleEdit,0)});
 const run=()=>{raf=0;window.hybridWireExerciseSearch?.();const active=$('.view.active')?.id;if(active==='dashboard')today();else if(active==='history')history();else if(active==='log')log();else if(active==='trends')trends()};
 const queue=()=>{if(!raf)raf=requestAnimationFrame(run)};new MutationObserver(queue).observe(document.body,{childList:true,subtree:true});document.addEventListener('change',queue);document.addEventListener('click',queue);document.addEventListener('input',e=>{if(e.target.closest('#plannedExercises'))queue()});run();
 // Read-only inspection and explicit capture are useful to native controls and QA.
 window.HybridUIWorkflows=Object.freeze({beginScheduleEdit:beginEdit,refresh:queue,scheduleFeedback:()=>({pendingDate:pendingEdit?.date||'',pendingChanged:!!pendingEdit&&pendingEdit.stamp!==programmingStamp(),report:recalc})});
})();
