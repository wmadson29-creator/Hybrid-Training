(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.HybridExerciseExpansion=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const muscles=new Set(['chest','shoulders','triceps','tricepsLong','tricepsOther','lats','upperBack','biceps','quads','hamstrings','hamKneeFlex','hamHipExt','glutes','calves','gastroc','soleus','tibialis','adductors','serratus','core','grip']);
  const g=(name,equipment,family,defaultLb,load,primaryMuscles,secondaryMuscles,related,note,extra={})=>({name,equipment,family,defaultLb,increment:equipment==='Dumbbell'?5:equipment==='Cable'?5:10,load,plateVisual:false,primaryMuscles,secondaryMuscles,related,note,...extra});
  const c=(name,focus,family,level,baseReps,primaryMuscles,secondaryMuscles,related,note,extra={})=>({name,focus,family,secondary:[],requiresBar:false,level,baseSets:3,baseReps,primaryMuscles,secondaryMuscles,related,note,...extra});

  const gym=[
    g('Plate-Loaded Chest Press','Machine','chest_press',90,'total',['chest'],['triceps','shoulders'],['Machine Chest Press','Barbell Bench Press','Dumbbell Bench Press'],'Independent handles can reduce side-to-side compensation; track this machine separately because lever arms vary.'),
    g('Decline Chest Press Machine','Machine','chest_press',90,'total',['chest'],['triceps','shoulders'],['Machine Chest Press','Dumbbell Bench Press','Barbell Bench Press'],'Decline-path machine press with a chest and triceps emphasis.'),
    g('Iso-Lateral Chest Press','Machine','chest_press',45,'per_side',['chest'],['triceps','shoulders','serratus'],['Plate-Loaded Chest Press','Dumbbell Bench Press','Machine Chest Press'],'Each arm moves independently; log load per side and keep left/right range matched.',{unilateral:true}),
    g('Seated Dip Machine','Machine','triceps',70,'total',['triceps','chest'],['shoulders'],['Bodyweight Dip','Close-Grip Barbell Bench Press','Rope Triceps Pushdown'],'Machine-assisted dip pattern; use a controlled shoulder range rather than forcing extra depth.'),
    g('Assisted Pull-Up Machine','Machine','vertical_pull',70,'assist',['lats','upperBack'],['biceps','grip','core'],['Pull-Up','Neutral-Grip Pull-Up','Lat Pulldown'],'The logged load is assistance, so lower numbers are harder; direct history is kept separate from bodyweight pull-ups.',{assistanceLoad:true}),
    g('Machine Pullover','Machine','vertical_pull',70,'total',['lats'],['tricepsLong','chest','core'],['Straight-Arm Pulldown','Lat Pulldown','Pull-Up'],'Shoulder-extension pull that trains the lats with little elbow-flexor demand.'),
    g('Iso-Lateral High Row','Machine','horizontal_pull',55,'per_side',['upperBack','lats'],['biceps','shoulders','grip'],['Chest-Supported Row Machine','Lat Pulldown','Single-Arm Cable Row'],'Independent high-to-low row; log load per side and avoid rotating to finish.',{unilateral:true}),
    g('Chest-Supported T-Bar Row','Machine','horizontal_pull',70,'total',['upperBack','lats'],['biceps','grip'],['Chest-Supported Row Machine','Landmine Row','Barbell Row'],'Chest support reduces trunk fatigue while retaining a heavy horizontal-pull stimulus.'),
    g('Low Row Machine','Machine','horizontal_pull',80,'total',['lats','upperBack'],['biceps','grip'],['Cable Seated Row','Chest-Supported Row Machine','Single-Arm Cable Row'],'Low horizontal pull; keep the torso stable and finish with the elbows rather than lumbar extension.'),
    g('Machine Preacher Curl','Machine','biceps',40,'total',['biceps'],['grip'],['Cable Preacher Curl','Barbell Curl','Incline Dumbbell Curl'],'Supported elbow-flexion machine; machine geometry makes direct machine history most useful.'),
    g('Machine Biceps Curl','Machine','biceps',40,'total',['biceps'],['grip'],['Machine Preacher Curl','Cable Curl','Dumbbell Curl'],'Selectorized curl with stable resistance; avoid lifting the elbows to finish.'),
    g('Machine Triceps Extension','Machine','triceps',50,'total',['triceps'],['shoulders'],['Rope Triceps Pushdown','Dumbbell Skull Crusher','Seated Dip Machine'],'Supported elbow extension; direct machine performance drives progression.'),
    g('Cable Y Raise','Cable','delts',10,'single',['shoulders','serratus'],['upperBack'],['Prone Y-T-W','Cable Lateral Raise','Cable Reverse Fly'],'Light scapular-plane raise for shoulder control; progress slowly and keep the neck relaxed.'),
    g('Cable Reverse Fly','Cable','rear_delts',12.5,'per_side',['shoulders','upperBack'],['serratus'],['Reverse Pec Deck','Face Pull','Cable Y Raise'],'Cable rear-delt fly with continuous tension; use shoulder motion rather than trunk rotation.'),
    g('Belt Squat','Machine','squat',90,'total',['quads','glutes'],['adductors','core'],['Barbell Back Squat','Leg Press','V-Squat Machine'],'Squat pattern that reduces axial loading; machine setup varies, so compare on the same unit.'),
    g('V-Squat Machine','Machine','squat',90,'total',['quads','glutes'],['adductors','hamstrings'],['Hack Squat Machine','Belt Squat','Leg Press'],'Fixed-path squat machine; stance and machine angle materially change the emphasis.'),
    g('Horizontal Leg Press','Machine','squat',120,'total',['quads','glutes'],['adductors','hamstrings'],['Leg Press','V-Squat Machine','Barbell Back Squat'],'Horizontal sled/selectorized press; do not compare the displayed load directly with angled machines.'),
    g('Smith Machine Split Squat','Machine','lunge',65,'total',['quads','glutes'],['adductors','hamstrings','core'],['Bulgarian Split Squat','Dumbbell Bulgarian Split Squat','Smith Machine Back Squat'],'Guided unilateral squat; reps are per leg and direct history captures the machine path.',{unilateral:true}),
    g('Smith Machine Hip Thrust','Machine','hinge',115,'total',['glutes'],['hamHipExt','hamstrings','core'],['Barbell Hip Thrust','Glute Drive Machine','Glute Bridge'],'Guided hip thrust; keep the ribs stacked and finish with hip extension rather than lumbar arching.'),
    g('Glute Drive Machine','Machine','hinge',90,'total',['glutes'],['hamHipExt','core'],['Smith Machine Hip Thrust','Barbell Hip Thrust','Cable Pull-Through'],'Dedicated hip-extension machine; pad and lever geometry make direct history most useful.'),
    g('Standing Leg Curl','Machine','hamstrings',35,'single',['hamKneeFlex','hamstrings'],['calves','core'],['Seated Leg Curl','Lying Leg Curl','Nordic Hamstring Curl'],'Unilateral knee-flexion curl; keep the hip still and record each side.',{unilateral:true}),
    g('Kneeling Leg Curl Machine','Machine','hamstrings',35,'single',['hamKneeFlex','hamstrings'],['glutes','core'],['Standing Leg Curl','Lying Leg Curl','Seated Leg Curl'],'Single-leg knee-flexion machine; use the same machine and pad setup for comparisons.',{unilateral:true}),
    g('Glute Kickback Machine','Machine','hip_accessory',45,'single',['glutes'],['hamHipExt','core'],['Cable Kickback','Glute Drive Machine','Single-Leg Hip Thrust'],'Single-leg hip extension; keep the pelvis square and avoid finishing with the low back.',{unilateral:true}),
    g('Multi-Hip Machine','Machine','hip_accessory',35,'single',['glutes','adductors'],['quads','core'],['Hip Abduction Machine','Hip Adduction Machine','Cable Kickback'],'Multi-direction hip machine. Log the movement direction in notes because abduction, adduction and extension are not interchangeable.',{unilateral:true}),
    g('Reverse Hyperextension','Machine','hinge',45,'total',['glutes','hamHipExt'],['hamstrings','core'],['45° Back Extension','Barbell Romanian Deadlift','Glute-Ham Raise'],'Hip-extension accessory with a moving lower body; use controlled range and machine-specific history.'),
    g('Glute-Ham Raise','Machine','hamstrings',0,'total',['hamKneeFlex','hamHipExt','hamstrings'],['glutes','calves','core'],['Nordic Hamstring Curl','45° Back Extension','Seated Leg Curl'],'Combined knee-flexion and hip-extension bodyweight movement on a GHD; leave weight blank for bodyweight and record assistance or external load in notes.'),
    g('Single-Leg Press','Machine','lunge',60,'single',['quads','glutes'],['adductors','hamstrings','core'],['Leg Press','Bulgarian Split Squat','Step-Up'],'Unilateral leg press using one working leg; log the displayed load and train both sides.',{unilateral:true}),
    g('Tibialis Raise Machine','Machine','calves',25,'total',['tibialis'],['calves'],['Tibialis Raise','Standing Calf Raise Machine','Seated Calf Raise Machine'],'Loaded ankle dorsiflexion; progress with full controlled range rather than momentum.'),
    g('Forearm Curl Machine','Machine','biceps',30,'total',['grip'],['biceps'],['Hammer Curl','Dumbbell Curl','Dead Hang'],'Wrist-flexion/grip accessory; avoid comparing machine-stack numbers across facilities.'),
    g('Cable Hip Flexion','Cable','hip_accessory',15,'single',['quads','core'],['adductors','glutes'],['Hanging Knee Raise','Step-Up','Multi-Hip Machine'],'Cable resisted hip flexion; use a stable pelvis and log each side.',{unilateral:true})
  ];

  const calisthenics=[
    c('Close-Grip Push-Up','push','triceps',3,10,['triceps','chest'],['shoulders','core','serratus'],['Push-Up','Diamond Push-Up','Close-Grip Barbell Bench Press'],'Narrow push-up that increases elbow-extension demand while retaining a chest stimulus.'),
    c('Deficit Push-Up','push','chest_press',3,8,['chest'],['triceps','shoulders','core'],['Push-Up','Dumbbell Bench Press','Push-Up Plus'],'Hands elevated on stable handles to add controlled bottom range; stop before shoulder position deteriorates.',{auto:false}),
    c('Scapular Push-Up','push','chest_press',1,12,['serratus'],['shoulders','core'],['Push-Up','Plank Shoulder Tap','Cable Y Raise'],'Straight-arm protraction/retraction drill; the torso stays rigid while the shoulder blades move.'),
    c('Wall Handstand Hold','push','shoulder_press',4,0,['shoulders','triceps'],['serratus','core','upperBack'],['Pike Push-Up','Wall Handstand Push-Up','Barbell Overhead Press'],'Wall-supported inversion hold for overhead strength and control.',{baseSeconds:20,auto:false}),
    c('Wall Handstand Push-Up','push','shoulder_press',5,5,['shoulders','triceps'],['serratus','upperBack','core'],['Wall Handstand Hold','Elevated Pike Push-Up','Barbell Overhead Press'],'Advanced wall-supported vertical press; progress range before repetitions.',{auto:false}),
    c('Plank Shoulder Tap','core','core',2,10,['core','serratus'],['shoulders','triceps'],['Front Plank','Scapular Push-Up','Bear Crawl'],'Anti-rotation plank with alternating hand support; reps are per side.'),
    c('RKC Plank','core','core',3,0,['core'],['glutes','shoulders','serratus'],['Front Plank','Body Saw','Hollow Body Hold'],'High-tension short plank; stop when full-body bracing can no longer be maintained.',{baseSeconds:20}),
    c('Side Plank Hip Lift','core','core',3,10,['core','glutes'],['adductors','shoulders'],['Side Plank','Short-Lever Copenhagen Adduction','Side-Lying Hip Abduction'],'Dynamic lateral-trunk and hip exercise; reps are per side.'),
    c('Body Saw','core','core',3,10,['core','serratus'],['shoulders','triceps'],['Front Plank','RKC Plank','Ab Wheel Rollout'],'Long-lever anti-extension plank using sliders or towels; manual selection because a sliding surface is required.',{auto:false}),
    c('Hollow Rock','core','core',3,12,['core'],['quads'],['Hollow Body Hold','Dead Bug','Tuck L-Sit'],'Dynamic hollow-body control; use a range that keeps the low back controlled.'),
    c('Tuck L-Sit','core','core',4,0,['core','triceps'],['quads','shoulders'],['Floor L-Sit','Hollow Body Hold','Hanging Knee Raise'],'Tucked support hold that combines compression and straight-arm support.',{baseSeconds:15}),
    c('Floor L-Sit','core','core',5,0,['core','triceps','quads'],['shoulders'],['Tuck L-Sit','Hanging Leg Raise','Bodyweight Dip'],'Advanced compression/support hold; progress from short clean holds.',{baseSeconds:10,auto:false}),
    c('Single-Leg Hip Thrust','legs','hinge',3,10,['glutes'],['hamHipExt','core'],['Single-Leg Glute Bridge','Barbell Hip Thrust','Feet-Elevated Glute Bridge'],'Bench-supported single-leg hip extension; reps are per side.',{auto:false}),
    c('Feet-Elevated Glute Bridge','legs','hinge',2,12,['glutes','hamHipExt'],['hamstrings','core'],['Glute Bridge','Single-Leg Glute Bridge','Barbell Hip Thrust'],'Feet-elevated bridge increases hip-extension range and posterior-chain demand.'),
    c('Frog Pump','legs','hinge',1,20,['glutes'],['core'],['Glute Bridge','Hip Abduction Machine','Glute Drive Machine'],'Low-load glute bridge variation; use controlled high-quality repetitions.'),
    c('Sliding Leg Curl','legs','hamstrings',3,10,['hamKneeFlex','hamstrings'],['glutes','core'],['Hamstring Walkout','Seated Leg Curl','Nordic Hamstring Curl'],'Supine knee-flexion curl using sliders or towels; manual selection because a sliding surface is required.',{auto:false}),
    c('Single-Leg Sliding Leg Curl','legs','hamstrings',4,6,['hamKneeFlex','hamstrings'],['glutes','core'],['Sliding Leg Curl','Single-Leg Glute Bridge','Nordic Hamstring Curl'],'Hard unilateral slider curl; reps are per leg and a sliding surface is required.',{auto:false}),
    c('Heel-Elevated Bodyweight Squat','legs','squat',2,15,['quads'],['glutes','adductors','core'],['Bodyweight Squat','Sissy Squat','Dumbbell Goblet Squat'],'Heel elevation allows a more knee-forward squat; use a stable wedge or plates.',{auto:false}),
    c('Bodyweight Lateral Lunge','legs','lunge',2,10,['adductors','glutes','quads'],['hamstrings','core'],['Cossack Squat','Dumbbell Lateral Lunge','Walking Lunge'],'Frontal-plane lunge; reps are per side and range should stay controlled.'),
    c('Shrimp Squat','legs','lunge',4,6,['quads','glutes'],['adductors','core'],['Skater Squat','Bulgarian Split Squat','Pistol Squat'],'Advanced single-leg squat with the rear leg folded; reps are per side.',{auto:false}),
    c('Sissy Squat','legs','squat',4,8,['quads'],['core','calves'],['Heel-Elevated Bodyweight Squat','Leg Extension','Reverse Nordic'],'Knee-dominant bodyweight squat; use support and a pain-free range.',{auto:false}),
    c('Split Squat Jump','legs','lunge',4,6,['quads','glutes'],['calves','hamstrings','core'],['Split Squat','Jump Squat','Skater Jump'],'Unilateral plyometric lunge; reps are per side and landing quality ends the set.',{power:true,auto:false}),
    c('Skater Jump','legs','lunge',3,8,['glutes','quads','adductors'],['calves','core'],['Bodyweight Lateral Lunge','Split Squat Jump','Cossack Squat'],'Lateral bound with controlled single-leg landing; reps are per side.',{power:true}),
    c('Broad Jump','fullbody','squat',3,5,['glutes','quads','hamstrings'],['calves','core'],['Jump Squat','Box Jump','Short Hills'],'Horizontal jump for lower-body power; stop when distance or landing control drops.',{power:true}),
    c('Pogo Hop','legs','calves',2,20,['gastroc','soleus','calves'],['tibialis','core'],['Jump Rope','Single-Leg Calf Raise','Short Hills'],'Low-amplitude ankle-dominant hops; keep contacts quick and stop if calf/Achilles tolerance is poor.',{power:true,auto:false}),
    c('Hip Airplane','legs','hip_accessory',3,6,['glutes','adductors'],['hamstrings','core'],['Single-Leg Dumbbell Romanian Deadlift','Side-Lying Hip Abduction','Cossack Squat'],'Single-leg hip rotation/control drill; reps are per side and quality matters more than range.',{auto:false}),
    c('Side-Lying Hip Abduction','legs','hip_accessory',1,15,['glutes'],['core'],['Hip Abduction Machine','Band Lateral Walk','Side Plank Hip Lift'],'Low-load hip-abduction accessory; keep the pelvis stacked and avoid rolling backward.'),
    c('Prone Cobra','pull','rear_delts',1,0,['upperBack','shoulders'],['glutes','core'],['Prone Y-T-W','Reverse Snow Angel','Face Pull'],'Prone isometric for upper-back and shoulder control; use a short, pain-free hold.',{baseSeconds:20}),
    c('Reverse Plank','core','core',2,0,['glutes','core'],['hamstrings','shoulders','triceps'],['Front Plank','Glute Bridge','Prone Cobra'],'Posterior-chain support hold; keep the hips extended without forcing shoulder range.',{baseSeconds:30}),
    c('Back Widow','pull','horizontal_pull',2,10,['upperBack','shoulders'],['biceps','core'],['Inverted Row','Prone Cobra','Superman Row'],'Supine elbow-driven row against the floor; useful when no pulling equipment is available.')
  ];

  function validateCatalog(){
    const errors=[],all=[...gym,...calisthenics],names=new Set();
    for(const item of all){
      if(names.has(item.name))errors.push('Duplicate exercise: '+item.name);names.add(item.name);
      if(!item.name||!item.family)errors.push('Missing identity: '+(item.name||'<unnamed>'));
      if(!Array.isArray(item.primaryMuscles)||!item.primaryMuscles.length)errors.push('Missing primary muscles: '+item.name);
      if(!Array.isArray(item.secondaryMuscles))errors.push('Missing secondary muscles: '+item.name);
      for(const key of [...(item.primaryMuscles||[]),...(item.secondaryMuscles||[])])if(!muscles.has(key))errors.push('Unknown muscle '+key+': '+item.name);
      if(!Array.isArray(item.related)||item.related.length<2)errors.push('Missing exercise relationships: '+item.name);
      if((item.related||[]).includes(item.name))errors.push('Self relationship: '+item.name);
      if(new Set(item.related||[]).size!==(item.related||[]).length)errors.push('Duplicate relationship: '+item.name);
      if((item.primaryMuscles||[]).some(key=>(item.secondaryMuscles||[]).includes(key)))errors.push('Primary/secondary overlap: '+item.name);
    }
    return {valid:errors.length===0,errors,gym:gym.length,calisthenics:calisthenics.length,total:all.length};
  }

  return Object.freeze({version:1,gym:Object.freeze(gym),calisthenics:Object.freeze(calisthenics),validateCatalog});
});
