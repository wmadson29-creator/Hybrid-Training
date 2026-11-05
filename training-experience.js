/* Hybrid Training: navigation, screen structure and progressive disclosure. */
(function(){
 'use strict';
 const $=(q,r=document)=>r.querySelector(q),$$=(q,r=document)=>[...r.querySelectorAll(q)];
 const core=window.HybridCore;if(!core)return;
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const paths={home:'M3 11 12 3l9 8v10h-6v-7H9v7H3Z',train:'M4 5h16M4 12h16M4 19h16M8 3v4m8 3v4m-8 3v4',log:'M12 5v14M5 12h14',history:'M4 5v5h5M4 10a8 8 0 1 1 0 5m8-8v5l3 2',chart:'M4 20V4m0 16h16M8 16l4-6 4 2 4-7',heart:'M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-5 5 3 12 8 16 5-4 13-11 8-16Z',settings:'M4 7h16M4 17h16M9 3v8m6 2v8',library:'M4 4h6v16H4Zm10 0h6v16h-6Z',equipment:'M3 9v6m4-9v12m10-12v12m4-9v6M7 12h10',clock:'M12 8v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',arrow:'m9 5 7 7-7 7',search:'m16 16 5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',feedback:'M4 4h16v13H9l-5 4Z',run:'m13 3 2 1m-4 4 4 2 3-2M8 12l4-4 1 6 5 5M4 20l6-6',check:'m5 12 4 4L20 5'};
 const icon=name=>'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="'+(paths[name]||paths.train)+'"/></svg>';
 const screens=[
  ['dashboard','Today','Your plan, recovery and next workout','home','Daily training'],
  ['log','Log workout','Record the work you actually do','log','Daily training'],
  ['trainhub','Train','Programs and workout builders','train','Daily training'],
  ['programs','Programs','Choose a block, review or schedule travel','train','Training'],
  ['kbformats','Circuits & complexes','Build circuits, complexes and rep targets','clock','Training'],
  ['kbworkouts','Kettlebells','Exercise library and fixed KB workouts','equipment','Training'],
  ['gymworkouts','Gym','Build substantial gym sessions','equipment','Training'],
  ['calisthenics','Bodyweight','Bodyweight and band workouts','train','Training'],
  ['emom','EMOM & AMRAP','Timed density workouts','clock','Training'],
  ['conditioninglib','Cardio & speed','Running, swimming, biking and sprints','run','Training'],
  ['classes','Classes & activities','Schedule other training','train','Training'],
  ['history','History','Your completed sessions','history','Progress'],
  ['feedback','Feedback','What actual performance suggests','feedback','Progress'],
  ['insights','Insights','Strength, fitness and body trends','chart','Progress'],
  ['recovery','Recovery','Sleep, energy and soreness','heart','Progress'],
  ['progress','Strength progression','Training waves and benchmark lifts','chart','Progress'],
  ['trends','Training trends','Muscle, fitness and workload trends','chart','Progress'],
  ['bodyweight','Body measurements','Bodyweight and composition','chart','Progress'],
  ['homegym','Home equipment','Your available home setup','equipment','Your setup'],
  ['mygym','Gym equipment','Machines, available loads and locations','equipment','Your setup'],
  ['maxes','Strength maxes','Barbell targets and adjustments','chart','Your setup'],
  ['traininglibrary','Reference library','Training methods and guides','library','Your setup'],
  ['settings','Settings & data','Preferences, backups and app settings','settings','Your setup']
 ];
 const route=id=>{if(!document.getElementById(id))return;core.uiNavigate(id);activate(id);};
 function newScreen(id,title,copy){let view=document.getElementById(id);if(view)return view;view=document.createElement('section');view.id=id;view.className='view experience-view';view.innerHTML='<div class="screen-intro"><div class="experience-eyebrow">YOUR TRAINING</div><h2>'+esc(title)+'</h2><p>'+esc(copy)+'</p></div>';$('.shell').append(view);return view;}
 const tile=(id,title,copy,glyph,tag='')=>'<button class="experience-tile" type="button" data-experience-view="'+id+'"><span class="tile-symbol">'+icon(glyph)+'</span><span class="tile-copy">'+(tag?'<small>'+esc(tag)+'</small>':'')+'<strong>'+esc(title)+'</strong><span>'+esc(copy)+'</span></span>'+icon('arrow')+'</button>';
 function installShell(){
  if($('#experienceSidebar'))return;
  document.body.classList.add('experience');
  const sidebar=document.createElement('aside');sidebar.id='experienceSidebar';sidebar.className='experience-sidebar';sidebar.setAttribute('aria-label','App navigation');
  sidebar.innerHTML='<a class="experience-brand" href="#dashboard" data-experience-view="dashboard"><span class="brand-symbol">H<span>↗</span></span><span>HYBRID<strong>TRAINING</strong></span></a><nav aria-label="Training navigation">'+['Daily training','Training','Progress','Your setup'].map(group=>'<div class="nav-group"><div class="nav-group-title">'+group+'</div>'+screens.filter(s=>s[4]===group&&!['progress','trends','bodyweight','maxes','traininglibrary'].includes(s[0])).map(s=>'<button type="button" class="experience-nav-link" data-experience-view="'+s[0]+'">'+icon(s[3])+'<span>'+s[1]+'</span></button>').join('')+'</div>').join('')+'</nav><div class="experience-sidebar-footer"><span class="connection-dot"></span> Your training, on your device <small>Version '+esc(core.build)+'</small></div>';
  document.body.prepend(sidebar);
  const skip=document.createElement('a');skip.className='experience-skip';skip.href='#experienceMain';skip.textContent='Skip to content';document.body.prepend(skip);
  const shell=$('.shell');shell.id='experienceMain';shell.setAttribute('role','main');shell.setAttribute('tabindex','-1');
  const header=document.createElement('header');header.className='experience-header';header.innerHTML='<div class="header-location"><span id="experienceSection">Daily training</span><h1 id="experienceTitle">Today</h1></div><div class="experience-header-actions"><button type="button" class="experience-search" id="experienceSearch">'+icon('search')+'<span>Find a screen</span><kbd>⌘ K</kbd></button><button class="btn" type="button" data-experience-view="trainhub">'+icon('train')+'<span>Train</span></button><div id="experienceQuickLog"></div></div>';shell.prepend(header);
  const quick=$('#quickLog');if(quick)$('#experienceQuickLog').append(quick);
  const hero=$('.hero');if(hero){hero.classList.add('experience-legacy-hero');hero.setAttribute('aria-hidden','true');}
  const more=$('#mobileMoreSheet');if(more){const row=document.createElement('div');row.className='experience-more-routes';row.innerHTML='<button class="btn" type="button" data-experience-view="trainhub">Train</button><button class="btn" type="button" data-experience-view="programs">Programs</button><button class="btn" type="button" data-experience-view="kbformats">Circuits & complexes</button><button class="btn" type="button" data-experience-view="insights">Insights</button>';more.prepend(row);}const nav=$('#mobileBottomNav');if(nav){const names={dashboard:'home',log:'log',history:'history',feedback:'feedback'};for(const b of $$('button',nav)){const text=b.textContent.trim();b.innerHTML=icon(names[b.dataset.mobileView]||'train')+'<span>'+esc(text)+'</span>';}}
  const status=document.createElement('div');status.id='trainingComputeStatus';status.className='training-compute-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.textContent='Plan up to date';header.append(status);
 }
 function installTraining(){
  const hub=newScreen('trainhub','Make room for great training.','Follow a structured block or build the session that fits today.');
  if(!$('#experienceProgramCard')){const p=document.createElement('div');p.id='experienceProgramCard';p.className='experience-program-current';hub.append(p);const grid=document.createElement('div');grid.className='experience-tile-grid';grid.innerHTML=tile('programs','Choose your program','Kettlebell, barbell and gym combinations.','train','YOUR NEXT BLOCK')+tile('kbformats','Circuits, complexes & rep targets','Choose the format, purpose and prescribed workload.','clock','BUILD A WORKOUT')+tile('kbworkouts','Kettlebells','Your full exercise library and fixed routines.','equipment')+tile('gymworkouts','Gym workout','A complete session for the equipment you have.','equipment')+tile('calisthenics','Bodyweight & bands','Useful training with a smaller setup.','train')+tile('emom','EMOM & AMRAP','Set the time, movements and workout role.','clock')+tile('conditioninglib','Cardio & speed','Easy endurance, intervals, hills and sprints.','run')+tile('classes','Classes & activities','Bring other training into your week.','train');hub.append(grid);}
  const programs=newScreen('programs','A plan you can keep building.','Schedule a block, review your progress and make room for travel.');
  const formats=newScreen('kbformats','Choose how you want to work.','Conventional sets, prescribed circuits, continuous complexes or a rep target.');
  const p=$('#rotatingProgramSetup'),f=$('#kbDynamicFormats');if(p)programs.append(p);if(f)formats.append(f);
  const travel=$('#kbTravelScheduler')||$('#kbTravelSettings')||$('#kbTravelSetup');if(travel)programs.append(travel);
  const old=$('#kbworkouts');if(old&&!$('#experienceKbRoutes')){const box=document.createElement('div');box.id='experienceKbRoutes';box.className='experience-route-banner';box.innerHTML='<div><strong>Programs and workout formats have their own space.</strong><span>Use this screen for the kettlebell library and established fixed routines.</span></div><div class="inline-actions"><button class="btn" type="button" data-experience-view="programs">Programs</button><button class="btn" type="button" data-experience-view="kbformats">Workout formats</button></div>';old.prepend(box);}
 }
 function installInsights(){
  const view=newScreen('insights','See what your training is building.','Explore the results you have logged, with estimates and observations kept distinct.');
  if($('#experienceInsightTiles'))return;const grid=document.createElement('div');grid.id='experienceInsightTiles';grid.className='experience-tile-grid';grid.innerHTML=tile('feedback','Workout feedback','Actual effort, completed work and next-step learning.','feedback')+tile('trends','Training trends','Muscle coverage, fitness qualities and workload.','chart')+tile('progress','Strength progression','Benchmark lifts and your training wave.','chart')+tile('bodyweight','Body measurements','Weight and body-composition trends.','chart')+tile('history','Completed sessions','Review or correct exactly what you recorded.','history')+tile('recovery','Recovery check-in','Sleep, alertness, soreness and wearable observations.','heart');view.append(grid);
  const recent=document.createElement('div');recent.className='panel';recent.innerHTML='<div class="panel-head"><div><div class="panel-title">Recent training</div><div class="panel-sub">Completed sessions from your history.</div></div></div><div id="experienceRecentSessions"></div>';view.append(recent);
 }
 function installDashboard(){
  const home=$('#dashboard');if(!home||$('#experienceTodayIntro'))return;
  const intro=document.createElement('div');intro.id='experienceTodayIntro';intro.className='experience-today-intro';intro.innerHTML='<div><div class="experience-eyebrow" id="experienceTodayDate"></div><h2>Build on yesterday.<br><span>Train for what’s next.</span></h2><p id="experienceTodayProgram">Your training adapts to the work you actually do.</p></div><div class="today-actions"><button class="btn primary" type="button" data-experience-view="trainhub">Explore training '+icon('arrow')+'</button><button class="btn" type="button" data-experience-view="programs">Manage program</button></div>';
  home.prepend(intro);
  const recovery=$('#recoverySnapshot'),calendar=$('.calendar-panel',home),workout=$('.workout-prescription-panel',home),primary=$('#v36152Primary');if(recovery)intro.after(recovery);if(calendar)(recovery||intro).after(calendar);if(primary)(calendar||recovery||intro).after(primary);if(workout)(primary||calendar||recovery||intro).after(workout);
  const context=document.createElement('details');context.className='experience-context';context.id='experienceTrainingContext';context.innerHTML='<summary><span>'+icon('chart')+'Training context & analysis</span><small>Progress, readiness and program details</small></summary><div class="experience-context-body"></div>';home.append(context);
  const body=$('.experience-context-body',context);for(const el of [...home.children])if(el!==context&&el!==intro&&el!==recovery&&el!==calendar&&el!==workout&&el!==primary)body.append(el);
  const title=$('.panel-title',calendar);if(title)title.textContent='Your week';
 }
 function installScreenHeaders(){
  for(const s of screens){const view=document.getElementById(s[0]);if(!view||$('.screen-intro',view)||s[0]==='dashboard')continue;const head=document.createElement('div');head.className='screen-intro screen-intro-compact';head.innerHTML='<div class="experience-eyebrow">'+esc(s[4])+'</div><h2>'+esc(s[1])+'</h2><p>'+esc(s[2])+'</p>';view.prepend(head);}
 }
 function installSettings(){
  const settings=$('#settings');if(!settings||$('#experienceSettingsIndex'))return;
  const index=document.createElement('div');index.id='experienceSettingsIndex';index.className='experience-settings-index';
  const panels=$$(':scope > .panel',settings);panels.forEach((p,i)=>{const title=$('.panel-title',p)?.textContent.trim()||'More settings';p.dataset.settingsGroup=title;if(!p.id)p.id='experienceSettingsGroup'+i;const b=document.createElement('button');b.type='button';b.className='btn';b.textContent=title;b.onclick=()=>p.scrollIntoView({behavior:'smooth',block:'start'});index.append(b);});$('.screen-intro',settings)?.after(index);
 }
 function installSearch(){
  if($('#experienceSearchDialog'))return;const d=document.createElement('dialog');d.id='experienceSearchDialog';d.className='experience-search-dialog';d.setAttribute('aria-label','Find a screen');d.innerHTML='<div class="search-dialog-head">'+icon('search')+'<input id="experienceSearchInput" type="search" placeholder="Where would you like to go?" aria-label="Find a screen"><button class="btn" type="button" id="experienceSearchClose">Close</button></div><div id="experienceSearchResults"></div>';document.body.append(d);
  const input=$('input',d),render=()=>{const q=input.value.toLowerCase().trim(),matches=screens.filter(s=>(s[1]+' '+s[2]+' '+s[4]).toLowerCase().includes(q)).sort((a,b)=>{const rank=s=>s[1].toLowerCase().startsWith(q)?2:s[1].toLowerCase().includes(q)?1:0;return rank(b)-rank(a);});$('#experienceSearchResults').innerHTML=matches.map(s=>'<button class="search-screen-result" type="button" data-experience-view="'+s[0]+'">'+icon(s[3])+'<span><strong>'+s[1]+'</strong><small>'+s[2]+'</small></span>'+icon('arrow')+'</button>').join('')||'<p class="experience-empty">No matching screen. Try “program”, “recovery” or “gym”.</p>';};
  input.addEventListener('input',render);$('#experienceSearchClose').onclick=()=>d.close();$('#experienceSearch').onclick=()=>{input.value='';render();d.showModal();input.focus();};d.addEventListener('click',e=>{if(e.target===d)d.close();});document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#experienceSearch').click();}});
 }
 function activate(id){
  const screen=screens.find(s=>s[0]===id);if(screen){$('#experienceTitle').textContent=screen[1];$('#experienceSection').textContent=screen[4];document.title=screen[1]+' · Hybrid Training';}
  for(const b of $$('[data-experience-view]')){const active=b.dataset.experienceView===id;b.classList.toggle('is-current',active);if(b.closest('nav')){if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');}}
  refresh();
 }
 function refresh(){
  const state=core.getState(),today=core.localISO(new Date()),ctx=window.HybridTrainingRotation?.context(state.settings.rotatingPrograms,today,state.settings.kbTravelWeeks||[]),travel=(state.settings.kbTravelWeeks||[]).find(t=>today>=t.startDate&&today<window.HybridTrainingRotation.shift(t.startDate,7));
  const label=ctx?ctx.name:'Your established training program';
  const date=$('#experienceTodayDate');if(date)date.textContent=new Date(today+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'}).toUpperCase();
  const program=$('#experienceTodayProgram');if(program)program.textContent=travel?'Travel week · your main program is paused.':ctx?label+' · active week '+ctx.week+' of 3.':'Your plan follows actual training, recovery and available equipment.';
  const card=$('#experienceProgramCard');if(card){const text=travel?'Travel week':label,detail=travel?'Your program resumes after travel.':ctx?'Week '+ctx.week+' / 3 · '+ctx.label+' · next review '+ctx.next:'Keep your current routine or schedule a new block.';card.innerHTML='<div><span class="experience-eyebrow">CURRENT PROGRAM</span><h3>'+esc(text)+'</h3><p>'+esc(detail)+'</p></div><button class="btn" type="button" data-experience-view="programs">Review program '+icon('arrow')+'</button>';}
  const recent=$('#experienceRecentSessions');if(recent&&$('#insights')?.classList.contains('active')){const groups=new Map();for(const r of state.logs||[])if(r.date<=today&&!r.projectedForecast&&!r.projectedPlanRow&&!['skipped','missed'].includes(String(r.status||'').toLowerCase())){const key=r.sessionId||r.date+'|'+r.session;if(!groups.has(key))groups.set(key,{date:r.date,session:r.session,count:0});groups.get(key).count++;}const rows=[...groups.values()].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);recent.innerHTML=rows.length?rows.map(r=>'<div class="experience-recent-row"><span class="recent-check">'+icon('check')+'</span><span><strong>'+esc(r.session)+'</strong><small>'+esc(r.count+' recorded movements')+'</small></span><time>'+esc(r.date)+'</time></div>').join(''):'<div class="experience-empty">Your completed sessions will appear here after you log training.</div>';}
 }
 function boot(){installShell();installTraining();installInsights();installDashboard();installScreenHeaders();installSettings();installSearch();document.addEventListener('click',e=>{const b=e.target.closest('[data-experience-view]');if(!b)return;e.preventDefault();$('#experienceSearchDialog')?.close();route(b.dataset.experienceView);});activate($('.view.active')?.id||'dashboard');}
 window.HybridExperience=Object.freeze({activate,refresh,navigate:route,screens:()=>screens.map(s=>({id:s[0],title:s[1],group:s[4]}))});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
