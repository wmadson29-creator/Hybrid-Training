/* Hybrid Training v36.202 machine variants and search audit; stable filename retained for deployment compatibility. */
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
    g('Hanging Knee Raise','Bodyweight / Pull-up Bar','core',0,'bodyweight',['core'],['grip','shoulders','lats'],['Hanging Leg Raise','Reverse Crunch','Dead Hang'],'Hang from a secure bar, lift the knees and curl the pelvis toward the ribs without swinging. Hip flexors lift the thighs; the trunk controls the pelvic curl.',{requiresBar:true,increment:5}),
    g('Hanging Leg Raise','Bodyweight / Pull-up Bar','core',0,'bodyweight',['core'],['grip','shoulders','lats'],['Hanging Knee Raise','Toes-to-Bar','Reverse Crunch'],'Raise straighter legs from a controlled hang, curl the pelvis at the top and lower slowly. Use the knee-raise variation when the longer lever cannot stay controlled.',{requiresBar:true,increment:5}),
    g('Reverse Crunch','Bodyweight','core',0,'bodyweight',['core'],[],['Hanging Knee Raise','Bicycle Crunch','Dead Bug'],'Floor-based pelvic curl. Bring the pelvis toward the ribs under control instead of swinging the legs.',{increment:5}),
    g('Dead Bug','Bodyweight','core',0,'bodyweight',['core'],[],['Reverse Crunch','Front Plank','Bird Dog'],'Alternate opposite arm and leg while keeping the trunk and low back controlled. No machine or hanging bar is required.',{increment:5}),
    g('Bicycle Crunch','Bodyweight','core',0,'bodyweight',['core'],[],['Reverse Crunch','Dead Bug','Cable Wood Chop'],'Controlled alternating trunk rotation and knee drive. Reps are per side; avoid pulling on the neck.',{increment:5}),
    g('Plate-Loaded Chest Press','Machine','chest_press',90,'total',['chest'],['triceps','shoulders'],['Machine Chest Press','Barbell Bench Press','Dumbbell Bench Press'],'Independent handles can reduce side-to-side compensation; track this machine separately because lever arms vary.'),
    g('Decline Chest Press Machine','Machine','chest_press',90,'total',['chest'],['triceps','shoulders'],['Machine Chest Press','Dumbbell Bench Press','Barbell Bench Press'],'Decline-path machine press with a chest and triceps emphasis.'),
    g('Iso-Lateral Chest Press','Machine','chest_press',45,'per_side',['chest'],['triceps','shoulders','serratus'],['Plate-Loaded Chest Press','Dumbbell Bench Press','Machine Chest Press'],'Each arm moves independently; log load per side and keep left/right range matched.',{unilateral:false}),
    g('Seated Dip Machine','Machine','triceps',70,'total',['triceps','chest'],['shoulders'],['Bodyweight Dip','Close-Grip Barbell Bench Press','Rope Triceps Pushdown'],'Machine-assisted dip pattern; use a controlled shoulder range rather than forcing extra depth.'),
    g('Assisted Pull-Up Machine','Machine','vertical_pull',70,'assist',['lats','upperBack'],['biceps','grip','core'],['Pull-Up','Neutral-Grip Pull-Up','Lat Pulldown'],'The logged load is assistance, so lower numbers are harder; direct history is kept separate from bodyweight pull-ups.',{assistanceLoad:true}),
    g('Machine Pullover','Machine','vertical_pull',70,'total',['lats'],['tricepsLong','chest','core'],['Straight-Arm Pulldown','Lat Pulldown','Pull-Up'],'Shoulder-extension pull that trains the lats with little elbow-flexor demand.'),
    g('Iso-Lateral High Row','Machine','horizontal_pull',55,'per_side',['upperBack','lats'],['biceps','shoulders','grip'],['Chest-Supported Row Machine','Lat Pulldown','Single-Arm Cable Row'],'Independent high-to-low row; log load per side and avoid rotating to finish.',{unilateral:false,aliases:['Plate-Loaded High Row','Plate-Loaded Iso-Lateral High Row'],resistanceKind:'plate-loaded'}),
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
    g('Barbell Forearm Curl','Barbell','biceps',45,'barbell',['grip'],['biceps'],['Forearm Curl Machine','Barbell Curl','Hammer Curl','Dead Hang'],'Supported barbell wrist curl. Log total bar weight, keep the forearms still, and use a controlled wrist range. Direct barbell history stays separate from the machine version.',{increment:5,plateVisual:true}),
    g('Cable Hip Flexion','Cable','hip_accessory',15,'single',['quads','core'],['adductors','glutes'],['Hanging Knee Raise','Step-Up','Multi-Hip Machine'],'Cable resisted hip flexion; use a stable pelvis and log each side.',{unilateral:true}),
    g('Single-Arm Lat Pulldown','Cable','vertical_pull',35,'single',['lats'],['upperBack','biceps','grip','core'],['Lat Pulldown','Neutral-Grip Lat Pulldown','Single-Arm Cable Row'],'Unilateral vertical pull. Keep the torso quiet and use direct left/right history instead of converting the load to a bilateral pulldown.',{unilateral:true}),
    g('Wide-Grip Lat Pulldown','Cable','vertical_pull',80,'total',['lats','upperBack'],['biceps','grip'],['Lat Pulldown','Pull-Up','Neutral-Grip Lat Pulldown'],'Pronated wide-grip pulldown. It remains a vertical-pull variant; grip width is not treated as automatically superior for lat recruitment.'),
    g("Cable Lat Pulldown","Cable","vertical_pull",70,"total",["lats","upperBack"],["biceps","grip"],["Lat Pulldown","Lat Pulldown Machine","Plate-Loaded Lat Pulldown"],"Bilateral pulldown using one cable/stack. Log its displayed setting, not a pulley-ratio conversion.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"cable"}),
    g("Neutral-Grip Cable Lat Pulldown","Cable","vertical_pull",70,"total",["lats","upperBack"],["biceps","grip"],["Lat Pulldown","Cable Lat Pulldown","Lat Pulldown Machine","Plate-Loaded Lat Pulldown"],"Neutral-grip bilateral cable pulldown using one stack; keep the attachment and machine consistent.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"cable"}),
    g("Lat Pulldown Machine","Machine","vertical_pull",70,"total",["lats","upperBack"],["biceps","grip"],["Lat Pulldown","Cable Lat Pulldown","Plate-Loaded Lat Pulldown"],"Selectorized guided-arm lat pulldown. Log the displayed stack setting separately from a cable station or plate-loaded pulldown.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"selectorized"}),
    g("Neutral-Grip Lat Pulldown Machine","Machine","vertical_pull",70,"total",["lats","upperBack"],["biceps","grip"],["Lat Pulldown","Cable Lat Pulldown","Lat Pulldown Machine","Plate-Loaded Lat Pulldown"],"Neutral-grip selectorized guided-arm pulldown; log the displayed stack setting for this machine.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"selectorized"}),
    g("Plate-Loaded Lat Pulldown","Machine","vertical_pull",25,"per_side",["lats","upperBack"],["biceps","grip"],["Lat Pulldown","Cable Lat Pulldown","Lat Pulldown Machine"],"Independent-arm plate-loaded pulldown performed with both arms. Weight is added plates per side; reps are total bilateral repetitions. Do not include an assumed lever-arm weight.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"plate-loaded"}),
    g("Plate-Loaded Wide-Grip Lat Pulldown","Machine","vertical_pull",25,"per_side",["lats","upperBack"],["biceps","grip"],["Lat Pulldown","Cable Lat Pulldown","Lat Pulldown Machine","Plate-Loaded Lat Pulldown"],"Wide-path independent-arm plate-loaded pulldown with both arms. Log added plates per side and total bilateral reps; it has its own history.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"plate-loaded"}),
    g("Single-Arm Plate-Loaded Lat Pulldown","Machine","vertical_pull",25,"single",["lats","upperBack"],["biceps","grip"],["Lat Pulldown","Cable Lat Pulldown","Lat Pulldown Machine","Plate-Loaded Lat Pulldown"],"One working arm on a plate-loaded pulldown. Log added plates on that arm and reps per side; complete both sides.",{"unilateral":true,"defaultAvailable":false,"increment":5,"resistanceKind":"plate-loaded"}),
    g("Plate-Loaded Seated Row","Machine","horizontal_pull",25,"per_side",["lats","upperBack"],["biceps","grip"],["Cable Seated Row","Seated Row Machine","Iso-Lateral High Row"],"Seated independent-arm plate-loaded row with chest support. Log added plates per side and total bilateral reps; keep seat and grip consistent.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"plate-loaded"}),
    g("Plate-Loaded Low Row","Machine","horizontal_pull",25,"per_side",["lats","upperBack"],["biceps","grip"],["Cable Seated Row","Seated Row Machine","Iso-Lateral High Row"],"Independent-arm low-row machine, both arms together. Log added plates per side and total bilateral reps; this is distinct from the cable low-row station.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"plate-loaded"}),
    g("Single-Arm Plate-Loaded Row","Machine","horizontal_pull",25,"single",["lats","upperBack"],["biceps","grip"],["Cable Seated Row","Seated Row Machine","Iso-Lateral High Row"],"One-arm plate-loaded supported row. Log added plates on the working arm and reps per side; complete both sides.",{"unilateral":true,"defaultAvailable":false,"increment":5,"resistanceKind":"plate-loaded"}),
    g("Single-Arm Plate-Loaded Shoulder Press","Machine","shoulder_press",15,"single",["shoulders"],["triceps","serratus"],["Machine Shoulder Press","Plate-Loaded Shoulder Press","Dumbbell Shoulder Press"],"One working arm on an independent-arm shoulder press. Log added plates on that arm and reps per side; keep it separate from bilateral pressing.",{"unilateral":true,"defaultAvailable":false,"increment":5,"resistanceKind":"plate-loaded"}),
    g("Plate-Loaded Leg Press","Machine","squat",180,"total",["quads","glutes"],["adductors","hamstrings"],["Leg Press","Horizontal Leg Press","Hack Squat Machine"],"Angled plate-loaded leg press. Log total added plates across both sides, excluding the sled; use the same depth and seat setup.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"plate-loaded"}),
    g("Plate-Loaded Hack Squat","Machine","squat",90,"total",["quads","glutes"],["adductors","calves"],["Hack Squat Machine","Leg Press","Barbell Back Squat"],"Plate-loaded hack squat. Log total added plates across both sides, excluding the sled.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"plate-loaded"}),
    g("Plate-Loaded Seated Calf Raise","Machine","calves",45,"total",["soleus","calves"],["gastroc"],["Seated Calf Raise Machine","Standing Calf Raise Machine","Leg Press Calf Raise"],"Seated calf machine with a single loading point. Log total added plates, excluding the lever arm.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"plate-loaded"}),
    g("Plate-Loaded Hip Thrust","Machine","hinge",90,"total",["glutes"],["hamstrings","hamHipExt","core"],["Glute Drive Machine","Barbell Hip Thrust","Smith Machine Hip Thrust"],"Plate-loaded hip-thrust machine. Log total added plates across both sides; machine starting resistance is not an assumed plate weight.",{"unilateral":false,"defaultAvailable":false,"increment":5,"resistanceKind":"plate-loaded"}),
    g('Plate-Loaded Shoulder Press','Machine','shoulder_press',45,'per_side',['shoulders'],['triceps','upperBack','serratus'],['Machine Shoulder Press','Barbell Overhead Press','Iso-Lateral Chest Press'],'Plate-loaded overhead press. Log load per side and compare progress on the same machine because lever arms differ.',{unilateral:false}),
    g('Smith Machine Overhead Press','Machine','shoulder_press',65,'total',['shoulders'],['triceps','upperBack','serratus'],['Barbell Overhead Press','Machine Shoulder Press','Plate-Loaded Shoulder Press'],'Guided vertical press; direct Smith-machine history is more useful than converting its load to a free-weight press.'),
    g('Cable Upright Row','Cable','delts',35,'total',['shoulders','upperBack'],['biceps','grip'],['Dumbbell Lateral Raise','Cable Lateral Raise','Face Pull'],'Cable upright row using a comfortable grip and pain-free range. It overlaps lateral-delt and upper-back work but is not treated as an overhead-press substitute.'),
    g('Landmine Squat','Barbell','squat',70,'total',['quads','glutes'],['adductors','core'],['Dumbbell Goblet Squat','Barbell Front Squat','Belt Squat'],'Front-loaded squat using an anchored bar. Log total implement weight (45 lb bar plus plates on the loaded end); direct history stays separate from back squats.',{increment:5,plateVisual:'landmine'}),
    g('Cable Belt Squat','Cable','squat',70,'total',['quads','glutes'],['adductors','core'],['Belt Squat','Leg Press','Dumbbell Goblet Squat'],'Low-cable belt squat with little upper-body loading. Cable stack geometry varies, so compare within the same setup.'),
    g('Smith Machine Calf Raise','Machine','calves',95,'total',['gastroc','calves'],['soleus','grip'],['Standing Calf Raise Machine','Cable Calf Raise','Single-Leg Calf Raise'],'Straight-knee calf raise under a guided bar; use full controlled ankle range and direct machine history.'),
    g('Donkey Calf Raise Machine','Machine','calves',70,'total',['gastroc','calves'],['soleus','hamstrings','core'],['Standing Calf Raise Machine','Smith Machine Calf Raise','Seated Calf Raise Machine'],'Hip-hinged straight-knee calf machine. It mainly complements, rather than replaces, bent-knee soleus work.'),
    g('Barbell Reverse Wrist Curl','Barbell','biceps',25,'barbell',['grip'],['biceps'],['Barbell Forearm Curl','Cable Reverse Wrist Curl','Wrist Roller'],'Supported wrist-extension curl. Log total bar weight and keep the forearms fixed; use lighter loading than wrist flexion.',{increment:5,plateVisual:true}),
    g('Cable Reverse Wrist Curl','Cable','biceps',15,'total',['grip'],['biceps'],['Barbell Reverse Wrist Curl','Forearm Curl Machine','Wrist Roller'],'Cable wrist-extension accessory with continuous resistance; keep the elbow and forearm position fixed.'),
    g('Wrist Roller','Cable','biceps',15,'total',['grip'],['biceps','shoulders'],['Barbell Forearm Curl','Barbell Reverse Wrist Curl','Farmer Carry'],'Forearm flexion/extension endurance using a wrist roller. Log the attached load and completed up/down cycles in the reps field.')
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
    c('Back Widow','pull','horizontal_pull',2,10,['upperBack','shoulders'],['biceps','core'],['Inverted Row','Prone Cobra','Superman Row'],'Supine elbow-driven row against the floor; useful when no pulling equipment is available.'),
    c('Bodyweight Triceps Extension','push','triceps',3,10,['triceps'],['chest','shoulders','core'],['Close-Grip Push-Up','Diamond Push-Up','Rope Triceps Pushdown'],'Standing or inclined bodyweight elbow extension against a secure low bar or suspension setup. Keep the body rigid and change foot position to scale difficulty.',{requiresLowRow:true}),
    c('Planche Lean','push','shoulder_press',5,0,['shoulders','serratus'],['chest','triceps','core'],['Pseudo-Planche Push-Up','Scapular Push-Up','Wall Handstand Hold'],'Advanced straight-arm forward lean. Use short controlled holds and manual selection because wrist tolerance and technique determine suitability.',{baseSeconds:12,auto:false}),
    c('Wall Handstand Shoulder Tap','push','shoulder_press',5,6,['shoulders','triceps'],['serratus','upperBack','core'],['Wall Handstand Hold','Wall Handstand Push-Up','Plank Shoulder Tap'],'Advanced wall-supported alternating hand lift; reps are per side and trunk control ends the set.',{auto:false}),
    c('Towel-Grip Pull-Up','pull','vertical_pull',5,4,['lats','upperBack','grip'],['biceps','core'],['Pull-Up','Neutral-Grip Pull-Up','Dead Hang'],'Manual pull-up variation using two securely anchored towels. High grip demand is explicit; never use an improvised or unverified anchor.',{requiresBar:true,auto:false}),
    c('Archer Inverted Row','pull','horizontal_pull',4,6,['upperBack','lats'],['biceps','grip','core'],['Inverted Row','Feet-Elevated Inverted Row','Archer Pull-Up'],'Asymmetric horizontal row toward one hand while the opposite arm stays straighter; reps are per side.',{requiresLowRow:true,auto:false}),
    c('Reverse Lunge to Knee Drive','legs','lunge',3,8,['quads','glutes'],['adductors','hamstrings','calves','core'],['Reverse Lunge','Walking Lunge','Step-Up'],'Reverse lunge followed by a controlled knee drive and single-leg balance; reps are per side.'),
    c('Dragon Flag Negative','core','core',5,4,['core'],['lats','upperBack','glutes'],['Hollow Body Hold','Hanging Leg Raise','Ab Wheel Rollout'],'Advanced eccentric trunk exercise using a secure handhold. Lower only through a range that preserves a rigid trunk.',{auto:false}),
    c('Hanging Windshield Wiper','core','core',5,5,['core'],['lats','upperBack','grip','shoulders'],['Hanging Leg Raise','Toes-to-Bar','Side Plank Reach-Through'],'Advanced hanging rotation with controlled side-to-side leg movement; reps are per side.',{requiresBar:true,auto:false}),
    c('Single-Leg Bent-Knee Calf Raise','legs','calves',2,15,['soleus','calves'],['gastroc','core'],['Bent-Knee Soleus Raise','Single-Leg Calf Raise','Seated Calf Raise Machine'],'Single-leg bent-knee calf raise that increases soleus demand; reps are per side and balance support is allowed.'),
    c('Quadruped Knee Hover','core','core',1,0,['core','serratus'],['shoulders','quads'],['Bear Crawl','Front Plank','Plank Shoulder Tap'],'Hands-and-knees hover with the knees just off the floor; maintain quiet breathing and a stable trunk.',{baseSeconds:25}),
    c('Eccentric Push-Up','push','chest_press',2,6,['chest'],['triceps','shoulders','serratus','core'],['Knee Push-Up','Push-Up','Deficit Push-Up'],'Slow lowering push-up progression. Reset from the knees if needed rather than turning the concentric into a failed repetition.'),
    c('Side Plank Reach-Through','core','core',3,8,['core'],['shoulders','serratus','glutes'],['Side Plank','Side Plank Hip Lift','Hanging Windshield Wiper'],'Controlled side-plank rotation; reps are per side and the supporting shoulder stays stacked.'),
    c('Bodyweight Good Morning','legs','hinge',1,15,['hamHipExt','glutes'],['hamstrings','core'],['Hip Hinge','Glute Bridge','Barbell Romanian Deadlift'],'Unloaded hip-hinge drill. It builds patterning and local endurance but does not prove loaded deadlift strength.'),
    c('Superman Hold','core','hinge',2,0,['hamHipExt','glutes','upperBack'],['hamstrings','shoulders','core'],['Superman Row','Prone Cobra','Reverse Plank'],'Short prone posterior-chain isometric. Use a comfortable lift rather than forcing lumbar range.',{baseSeconds:20})
  ];

  // v36.166: meaningful variants, not alternate spellings of existing records.
  gym.push(...[
  {
    "name": "Single-Arm Cable Chest Press",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Press from a split stance with the pulley at chest height; resist torso rotation.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Incline Cable Chest Press",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Use a supported incline bench between low pulleys; keep forearms aligned with the cable path.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "High-to-Low Cable Fly",
    "family": "chest_isolation",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "shoulders"
    ],
    "note": "Sweep from high pulleys toward the lower chest with a small fixed elbow bend; the line of pull changes emphasis, not isolation.",
    "related": [
      "Pec Deck / Machine Fly",
      "Cable Fly",
      "Low-to-High Cable Fly",
      "Band Chest Fly"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Single-Arm Cable Fly",
    "family": "chest_isolation",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "shoulders"
    ],
    "note": "Draw one handle across the chest while keeping the shoulder and trunk controlled.",
    "related": [
      "Pec Deck / Machine Fly",
      "Cable Fly",
      "Low-to-High Cable Fly",
      "Band Chest Fly"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Cable Shoulder Press",
    "family": "shoulder_press",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "serratus"
    ],
    "note": "Press from low pulleys; avoid using trunk lean to finish the overhead range.",
    "related": [
      "Barbell Overhead Press",
      "Barbell Push Press",
      "Dumbbell Push Press",
      "Half-Kneeling Landmine Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Behind-the-Body Cable Lateral Raise",
    "family": "delts",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "upperBack"
    ],
    "note": "Start the handle slightly behind the hip; raise in a comfortable scapular plane without shrugging.",
    "related": [
      "Machine Lateral Raise",
      "Dumbbell Lateral Raise",
      "Dumbbell Front Raise",
      "Cable Lateral Raise"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Leaning Cable Lateral Raise",
    "family": "delts",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "upperBack"
    ],
    "note": "Use a secure hand support and a low pulley; retain a quiet trunk throughout the raise.",
    "related": [
      "Machine Lateral Raise",
      "Dumbbell Lateral Raise",
      "Dumbbell Front Raise",
      "Cable Lateral Raise"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Single-Arm Cable Rear-Delt Row",
    "family": "rear_delts",
    "primaryMuscles": [
      "shoulders",
      "upperBack"
    ],
    "secondaryMuscles": [
      "serratus"
    ],
    "note": "Row at upper-chest height with the elbow out; use a lighter load than a lat-focused row.",
    "related": [
      "Cable External Rotation",
      "Reverse Pec Deck",
      "Rear-Delt Dumbbell Fly",
      "Face Pull"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Cable Internal Rotation",
    "family": "delts",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "note": "Rotate the forearm inward with the elbow supported at the side; use light controlled resistance.",
    "related": [
      "Machine Lateral Raise",
      "Dumbbell Lateral Raise",
      "Dumbbell Front Raise",
      "Cable Lateral Raise"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Cable Serratus Punch",
    "family": "chest_press",
    "primaryMuscles": [
      "serratus"
    ],
    "secondaryMuscles": [
      "shoulders"
    ],
    "note": "Keep the elbow almost straight and reach the shoulder blade forward against a chest-height cable.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false,
    "auto": false
  },
  {
    "name": "Supinated Lat Pulldown",
    "family": "vertical_pull",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [
      "upperBack",
      "biceps",
      "grip"
    ],
    "note": "Underhand vertical pull; elbow flexors assist but the grip does not guarantee greater lat growth.",
    "related": [
      "Lat Pulldown",
      "Neutral-Grip Lat Pulldown",
      "Dumbbell Pullover",
      "Straight-Arm Pulldown"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Half-Kneeling Single-Arm Cable Pulldown",
    "family": "vertical_pull",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [
      "upperBack",
      "biceps",
      "grip"
    ],
    "note": "Kneel under a high pulley and draw the elbow toward the hip without leaning back.",
    "related": [
      "Lat Pulldown",
      "Neutral-Grip Lat Pulldown",
      "Dumbbell Pullover",
      "Straight-Arm Pulldown"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Chest-Supported Cable Row",
    "family": "horizontal_pull",
    "primaryMuscles": [
      "upperBack",
      "lats"
    ],
    "secondaryMuscles": [
      "biceps",
      "grip"
    ],
    "note": "Support the chest on a bench facing the pulley to reduce unsupported trunk demand.",
    "related": [
      "Barbell Row",
      "Pendlay Row",
      "Landmine Row",
      "Seated Row Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Single-Arm Cable High Row",
    "family": "horizontal_pull",
    "primaryMuscles": [
      "upperBack",
      "lats"
    ],
    "secondaryMuscles": [
      "biceps",
      "grip"
    ],
    "note": "Pull from a high diagonal line toward the ribs with controlled scapular motion.",
    "related": [
      "Barbell Row",
      "Pendlay Row",
      "Landmine Row",
      "Seated Row Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Cable Shrug",
    "family": "traps",
    "primaryMuscles": [
      "upperBack"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Elevate the shoulder blades against a low cable without rolling the shoulders.",
    "related": [
      "Dumbbell Shrug"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Behind-the-Body Cable Curl",
    "family": "biceps",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Face away from a low pulley with the upper arm slightly behind the torso; flex the elbow without shoulder swing.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Single-Arm Cable Preacher Curl",
    "family": "biceps",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Support the upper arm on a preacher pad and keep the cable path consistent.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Cable Reverse Curl",
    "family": "biceps",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Use a pronated grip; brachialis and brachioradialis contribute, with wrist extensors stabilizing.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Single-Arm Cable Triceps Pushdown",
    "family": "triceps",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "Extend one elbow from a high pulley while keeping the upper arm still.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Cross-Body Cable Triceps Extension",
    "family": "triceps",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "Extend the elbow across the torso from a high opposite pulley; keep the shoulder quiet.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Single-Arm Overhead Cable Triceps Extension",
    "family": "triceps",
    "primaryMuscles": [
      "triceps",
      "tricepsLong"
    ],
    "secondaryMuscles": [
      "tricepsOther"
    ],
    "note": "Extend one elbow with the upper arm overhead, allowing a controlled stretch without arching the back.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Lying Cable Triceps Extension",
    "family": "triceps",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "Lie on a bench facing a low pulley; extend the elbows with stable upper arms.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Cable Hip Abduction",
    "family": "hip_accessory",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "note": "Use an ankle cuff and low pulley; move the leg away from the midline without tilting the pelvis.",
    "related": [
      "Hip Abduction Machine",
      "Hip Adduction Machine",
      "Cable Kickback",
      "Glute Kickback Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Cable Hip Adduction",
    "family": "hip_accessory",
    "primaryMuscles": [
      "adductors"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "note": "Use an ankle cuff and low pulley; draw the leg inward without trunk sway.",
    "related": [
      "Hip Abduction Machine",
      "Hip Adduction Machine",
      "Cable Kickback",
      "Glute Kickback Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Cable Standing Leg Curl",
    "family": "hamstrings",
    "primaryMuscles": [
      "hamstrings",
      "hamKneeFlex"
    ],
    "secondaryMuscles": [
      "calves"
    ],
    "note": "Flex the knee against a low cable with an ankle cuff, keeping the thigh still.",
    "related": [
      "Seated Leg Curl",
      "Lying Leg Curl",
      "Standing Leg Curl",
      "Kneeling Leg Curl Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Cable Reverse Lunge",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Step back against a low cable while holding a handle or belt; control the forward pull.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Cable Romanian Deadlift",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Face a low pulley and hinge at the hips; cable pull direction differs from free-weight RDL loading.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Cable Lift",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Rotate upward along a low-to-high diagonal with controlled hips and trunk; reps are per side.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Half-Kneeling Pallof Press",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Press a chest-height handle away while resisting rotation; train both sides.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Cable Side Bend",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Use a low pulley to resist controlled lateral trunk flexion; avoid rotation.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Cable",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Single-Arm Dumbbell Bench Press",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Bench press one dumbbell with the trunk braced against rotation.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Neutral-Grip Dumbbell Bench Press",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Press with palms facing inward and a comfortable elbow path; grip is a setup variant rather than a proven universal advantage.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "per_db",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Decline Dumbbell Bench Press",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Use a secure decline bench and a controlled shoulder range.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "per_db",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Dumbbell Chest Fly",
    "family": "chest_isolation",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "shoulders"
    ],
    "note": "Use a slight fixed elbow bend; lower only as far as shoulder control permits.",
    "related": [
      "Pec Deck / Machine Fly",
      "Cable Fly",
      "Low-to-High Cable Fly",
      "Band Chest Fly"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "per_db",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Incline Dumbbell Fly",
    "family": "chest_isolation",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "shoulders"
    ],
    "note": "Use a modest incline; the shoulder angle changes the line of pull and anterior-delt contribution.",
    "related": [
      "Pec Deck / Machine Fly",
      "Cable Fly",
      "Low-to-High Cable Fly",
      "Band Chest Fly"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "per_db",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Seated Dumbbell Overhead Press",
    "family": "shoulder_press",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "serratus"
    ],
    "note": "Press from a stable seat with ribs stacked; avoid turning the set into a back extension.",
    "related": [
      "Barbell Overhead Press",
      "Barbell Push Press",
      "Dumbbell Push Press",
      "Half-Kneeling Landmine Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "per_db",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Single-Arm Dumbbell Overhead Press",
    "family": "shoulder_press",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "serratus"
    ],
    "note": "Press one dumbbell overhead while resisting side bending.",
    "related": [
      "Barbell Overhead Press",
      "Barbell Push Press",
      "Dumbbell Push Press",
      "Half-Kneeling Landmine Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Dumbbell Reverse Curl",
    "family": "biceps",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Curl with palms down and wrists straight; use a lighter load than a supinated curl.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "per_db",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Dumbbell Preacher Curl",
    "family": "biceps",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Support the upper arm; control the bottom range instead of bouncing.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Dumbbell Triceps Kickback",
    "family": "triceps",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "Hold the upper arm behind the torso and extend the elbow; gravity loads the extended position most.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Dumbbell Wrist Curl",
    "family": "biceps",
    "primaryMuscles": [
      "grip"
    ],
    "secondaryMuscles": [],
    "note": "Support the forearms and curl the wrists; keep the elbow still.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Dumbbell Reverse Wrist Curl",
    "family": "biceps",
    "primaryMuscles": [
      "grip"
    ],
    "secondaryMuscles": [],
    "note": "Support the forearms and extend the wrists under light controlled load.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Dumbbell Hip Thrust",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Support the upper back on a secure bench and extend the hips with a padded dumbbell on the pelvis.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Dumbbell Sumo Squat",
    "family": "squat",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Hold a dumbbell centrally in a comfortable wider stance; avoid forcing foot turnout.",
    "related": [
      "Barbell Front Squat",
      "Barbell Back Squat",
      "Dumbbell Jump Squat",
      "Smith Machine Back Squat"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Dumbbell Split Squat",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Keep the feet planted and lower between them; train both legs.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "per_db",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Dumbbell Walking Lunge",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Take controlled alternating steps with sufficient clear floor space; reps are per leg.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "equipment": "Dumbbell",
    "defaultLb": 10,
    "increment": 5,
    "load": "per_db",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Barbell Sumo Deadlift",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Use a comfortable wide stance and hands inside the knees; individual structure determines the stance.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "equipment": "Barbell",
    "defaultLb": 45,
    "increment": 5,
    "load": "barbell",
    "plateVisual": true,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Barbell Floor Press",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Press from the floor with upper arms touching gently; the floor limits shoulder extension.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Barbell",
    "defaultLb": 45,
    "increment": 5,
    "load": "barbell",
    "plateVisual": true,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Barbell Preacher Curl",
    "family": "biceps",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Use a supported upper arm and a comfortable bar grip; log total bar weight.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "equipment": "Barbell",
    "defaultLb": 45,
    "increment": 5,
    "load": "barbell",
    "plateVisual": true,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "EZ-Bar Curl",
    "family": "biceps",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Use the angled bar grip to accommodate wrist position; record total implement weight.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "equipment": "Barbell",
    "defaultLb": 45,
    "increment": 5,
    "load": "barbell",
    "plateVisual": true,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "EZ-Bar Skull Crusher",
    "family": "triceps",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "Lower the bar with controlled elbow flexion and stable upper arms; use a spotter or safe exit setup.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "equipment": "Barbell",
    "defaultLb": 45,
    "increment": 5,
    "load": "barbell",
    "plateVisual": true,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Barbell Shrug",
    "family": "traps",
    "primaryMuscles": [
      "upperBack"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Elevate the shoulder blades with arms long; avoid rolling the shoulders.",
    "related": [
      "Dumbbell Shrug"
    ],
    "catalogAdded": "36.166",
    "equipment": "Barbell",
    "defaultLb": 45,
    "increment": 5,
    "load": "barbell",
    "plateVisual": true,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Smith Machine Incline Bench Press",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Position the bench to match the guided path and set the safeties before lifting.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "total",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Smith Machine Front Squat",
    "family": "squat",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Use a front-rack grip and foot position suited to the machine path; set safeties.",
    "related": [
      "Barbell Front Squat",
      "Barbell Back Squat",
      "Dumbbell Jump Squat",
      "Smith Machine Back Squat"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "total",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Smith Machine Reverse Lunge",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Step back under a guided bar; use safeties and a consistent foot position.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "total",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Single-Leg Leg Extension",
    "family": "quads",
    "primaryMuscles": [
      "quads"
    ],
    "secondaryMuscles": [],
    "note": "Align the knee with the machine pivot and extend one knee under control.",
    "related": [
      "Backward Sled Drag",
      "Leg Extension",
      "Reverse Nordic",
      "Wall Sit"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Single-Leg Seated Leg Curl",
    "family": "hamstrings",
    "primaryMuscles": [
      "hamstrings",
      "hamKneeFlex"
    ],
    "secondaryMuscles": [
      "calves"
    ],
    "note": "Align the knee and secure the thigh pad; flex one knee with the hip flexed.",
    "related": [
      "Seated Leg Curl",
      "Lying Leg Curl",
      "Standing Leg Curl",
      "Kneeling Leg Curl Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Single-Leg Lying Leg Curl",
    "family": "hamstrings",
    "primaryMuscles": [
      "hamstrings",
      "hamKneeFlex"
    ],
    "secondaryMuscles": [
      "calves"
    ],
    "note": "Keep the pelvis supported while flexing one knee against the pad.",
    "related": [
      "Seated Leg Curl",
      "Lying Leg Curl",
      "Standing Leg Curl",
      "Kneeling Leg Curl Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Machine Shrug",
    "family": "traps",
    "primaryMuscles": [
      "upperBack"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Elevate the shoulder blades along the machine path without bending the elbows.",
    "related": [
      "Dumbbell Shrug"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "total",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Single-Arm Machine Chest Press",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Use one independently moving handle and brace against rotation; the machine must support unilateral use.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Single-Arm Seated Row Machine",
    "family": "horizontal_pull",
    "primaryMuscles": [
      "upperBack",
      "lats"
    ],
    "secondaryMuscles": [
      "biceps",
      "grip"
    ],
    "note": "Use an independent handle; retain chest contact if supported and resist trunk rotation.",
    "related": [
      "Barbell Row",
      "Pendlay Row",
      "Landmine Row",
      "Seated Row Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "single",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Plate-Loaded Incline Chest Press",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Use a modest incline path and record plates per side; keep this machine history separate.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "per_side",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  },
  {
    "name": "Machine Standing Hip Abduction",
    "family": "hip_accessory",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "note": "Move the thigh outward against a pad with the pelvis level; match the machine pivot to the hip.",
    "related": [
      "Hip Abduction Machine",
      "Hip Adduction Machine",
      "Cable Kickback",
      "Glute Kickback Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "total",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Machine Standing Hip Adduction",
    "family": "hip_accessory",
    "primaryMuscles": [
      "adductors"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "note": "Bring the thigh inward against a pad; avoid shifting the pelvis.",
    "related": [
      "Hip Abduction Machine",
      "Hip Adduction Machine",
      "Cable Kickback",
      "Glute Kickback Machine"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "total",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": true
  },
  {
    "name": "Machine Shoulder External Rotation",
    "family": "delts",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "note": "Use the machine only for its intended rotator-cuff path; keep the elbow supported and load light.",
    "related": [
      "Machine Lateral Raise",
      "Dumbbell Lateral Raise",
      "Dumbbell Front Raise",
      "Cable Lateral Raise"
    ],
    "catalogAdded": "36.166",
    "equipment": "Machine",
    "defaultLb": 10,
    "increment": 5,
    "load": "total",
    "plateVisual": false,
    "defaultAvailable": false,
    "unilateral": false
  }
]);
  calisthenics.push(...[
  {
    "name": "Band Triceps Pushdown",
    "family": "triceps",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "High anchor; extend the elbows with the upper arms still.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Single-Arm Band Chest Press",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Anchor behind you at chest height and press one arm without twisting.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": true
  },
  {
    "name": "Single-Arm Band Row",
    "family": "horizontal_pull",
    "primaryMuscles": [
      "upperBack",
      "lats"
    ],
    "secondaryMuscles": [
      "biceps",
      "grip"
    ],
    "note": "Anchor at lower-chest height and row toward the ribs without rotating.",
    "related": [
      "Barbell Row",
      "Pendlay Row",
      "Landmine Row",
      "Seated Row Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "pull",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": true
  },
  {
    "name": "Band High Row",
    "family": "horizontal_pull",
    "primaryMuscles": [
      "upperBack",
      "lats"
    ],
    "secondaryMuscles": [
      "biceps",
      "grip"
    ],
    "note": "Use a high anchor and draw the elbows down and back.",
    "related": [
      "Barbell Row",
      "Pendlay Row",
      "Landmine Row",
      "Seated Row Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "pull",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Reverse Fly",
    "family": "rear_delts",
    "primaryMuscles": [
      "shoulders",
      "upperBack"
    ],
    "secondaryMuscles": [
      "serratus"
    ],
    "note": "Anchor at chest height; spread the arms with a slight elbow bend.",
    "related": [
      "Cable External Rotation",
      "Reverse Pec Deck",
      "Rear-Delt Dumbbell Fly",
      "Face Pull"
    ],
    "catalogAdded": "36.166",
    "focus": "pull",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band External Rotation",
    "family": "delts",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "note": "Use a light side anchor and rotate the forearm outward with the elbow supported.",
    "related": [
      "Machine Lateral Raise",
      "Dumbbell Lateral Raise",
      "Dumbbell Front Raise",
      "Cable Lateral Raise"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Internal Rotation",
    "family": "delts",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "note": "Use a light side anchor and rotate the forearm inward with the elbow supported.",
    "related": [
      "Machine Lateral Raise",
      "Dumbbell Lateral Raise",
      "Dumbbell Front Raise",
      "Cable Lateral Raise"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Serratus Punch",
    "family": "chest_press",
    "primaryMuscles": [
      "serratus"
    ],
    "secondaryMuscles": [
      "shoulders"
    ],
    "note": "Anchor behind the shoulder and reach the shoulder blade forward with the elbow almost straight.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Reverse Curl",
    "family": "biceps",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Stand on the band and curl with palms down and wrists straight.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "focus": "pull",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Hip Abduction",
    "family": "hip_accessory",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "note": "Use an ankle loop or low anchor and move one thigh outward with the pelvis level.",
    "related": [
      "Hip Abduction Machine",
      "Hip Adduction Machine",
      "Cable Kickback",
      "Glute Kickback Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": true
  },
  {
    "name": "Band Hip Adduction",
    "family": "hip_accessory",
    "primaryMuscles": [
      "adductors"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "note": "Use a low side anchor and ankle loop; draw the thigh inward without leaning.",
    "related": [
      "Hip Abduction Machine",
      "Hip Adduction Machine",
      "Cable Kickback",
      "Glute Kickback Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": true
  },
  {
    "name": "Band Standing Leg Curl",
    "family": "hamstrings",
    "primaryMuscles": [
      "hamstrings",
      "hamKneeFlex"
    ],
    "secondaryMuscles": [
      "calves"
    ],
    "note": "Use a low anchor and ankle loop; flex the knee while keeping the thigh still.",
    "related": [
      "Seated Leg Curl",
      "Lying Leg Curl",
      "Standing Leg Curl",
      "Kneeling Leg Curl Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Lying Leg Curl",
    "family": "hamstrings",
    "primaryMuscles": [
      "hamstrings",
      "hamKneeFlex"
    ],
    "secondaryMuscles": [
      "calves"
    ],
    "note": "Lie prone with a low foot-end anchor and ankle loops; flex the knees without lifting the pelvis.",
    "related": [
      "Seated Leg Curl",
      "Lying Leg Curl",
      "Standing Leg Curl",
      "Kneeling Leg Curl Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Seated Leg Curl",
    "family": "hamstrings",
    "primaryMuscles": [
      "hamstrings",
      "hamKneeFlex"
    ],
    "secondaryMuscles": [
      "calves"
    ],
    "note": "Sit with the band anchored in front and the hip flexed; pull the heel back under the seat.",
    "related": [
      "Seated Leg Curl",
      "Lying Leg Curl",
      "Standing Leg Curl",
      "Kneeling Leg Curl Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Leg Extension",
    "family": "quads",
    "primaryMuscles": [
      "quads"
    ],
    "secondaryMuscles": [],
    "note": "Use a low anchor behind the chair and an ankle loop; extend the knee with the thigh supported.",
    "related": [
      "Backward Sled Drag",
      "Leg Extension",
      "Reverse Nordic",
      "Wall Sit"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Hip Thrust",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Use a secured band across the pelvis and a stable upper-back support; extend the hips without arching.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Pull-Through",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Face away from a low anchor with the band between the legs; hinge and extend the hips.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Split Squat",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Stand on the band under the front foot; hold the ends at the shoulders and lower between planted feet.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band-Assisted Pull-Up",
    "family": "vertical_pull",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [
      "upperBack",
      "biceps",
      "grip"
    ],
    "note": "Use a pull-up bar and securely attached assistance band; greater assistance is easier, not a heavier lifting load.",
    "related": [
      "Lat Pulldown",
      "Neutral-Grip Lat Pulldown",
      "Dumbbell Pullover",
      "Straight-Arm Pulldown"
    ],
    "catalogAdded": "36.166",
    "focus": "pull",
    "secondary": [],
    "requiresBar": true,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band-Assisted Dip",
    "family": "triceps",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "Use stable dip bars and a securely positioned assistance band; control the shoulder range.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": true,
    "unilateral": false
  },
  {
    "name": "Band Kneeling Crunch",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Use a high anchor and curl the trunk toward the pelvis without pulling with the arms.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "core",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Low-to-High Wood Chop",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Use a low diagonal anchor and rotate upward under control; train both sides.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "core",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Half-Kneeling Pallof Press",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Use a chest-height side anchor while half kneeling and resist rotation during the press.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "core",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": true
  },
  {
    "name": "Band Anti-Rotation Reverse Lunge",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Hold a chest-height side-anchored band while stepping backward; resist trunk rotation.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": true
  },
  {
    "name": "Band Ankle Dorsiflexion",
    "family": "calves",
    "primaryMuscles": [
      "tibialis"
    ],
    "secondaryMuscles": [],
    "note": "Use a low forward anchor around the forefoot and pull the toes toward the shin without moving the knee.",
    "related": [
      "Standing Calf Raise Machine",
      "Seated Calf Raise Machine",
      "Leg Press Calf Raise",
      "Single-Leg Dumbbell Calf Raise"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": true
  },
  {
    "name": "Band Ankle Plantarflexion",
    "family": "calves",
    "primaryMuscles": [
      "calves",
      "gastroc"
    ],
    "secondaryMuscles": [
      "soleus"
    ],
    "note": "Hold the band ends while it loops around the forefoot; point the toes against resistance.",
    "related": [
      "Standing Calf Raise Machine",
      "Seated Calf Raise Machine",
      "Leg Press Calf Raise",
      "Single-Leg Dumbbell Calf Raise"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": true
  },
  {
    "name": "Band Wrist Curl",
    "family": "biceps",
    "primaryMuscles": [
      "grip"
    ],
    "secondaryMuscles": [],
    "note": "Support the forearm and flex the wrist against a light band.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "focus": "pull",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Band Reverse Wrist Curl",
    "family": "biceps",
    "primaryMuscles": [
      "grip"
    ],
    "secondaryMuscles": [],
    "note": "Support the forearm and extend the wrist against a light band.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "focus": "pull",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresBands": true,
    "requiresDipBars": false,
    "unilateral": false
  },
  {
    "name": "Wall Push-Up",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Place hands on a wall and keep a straight body; move the feet farther away to increase demand.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 1,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false
  },
  {
    "name": "Ring Push-Up",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Use secure low rings with hands close to the ribs; unstable support raises control demands.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 4,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": true,
    "requiresDipBars": false
  },
  {
    "name": "Ring Dip",
    "family": "triceps",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "Use secure rings and a controlled shoulder range; first establish a stable support hold.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 5,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": true,
    "requiresDipBars": false
  },
  {
    "name": "Ring Row",
    "family": "horizontal_pull",
    "primaryMuscles": [
      "upperBack",
      "lats"
    ],
    "secondaryMuscles": [
      "biceps",
      "grip"
    ],
    "note": "Use secure rings, a rigid trunk and matched handle height; change foot position to scale demand.",
    "related": [
      "Barbell Row",
      "Pendlay Row",
      "Landmine Row",
      "Seated Row Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "pull",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": true,
    "requiresDipBars": false
  },
  {
    "name": "Ring Chin-Up",
    "family": "vertical_pull",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [
      "upperBack",
      "biceps",
      "grip"
    ],
    "note": "Use secure overhead rings and allow a comfortable grip rotation during the pull.",
    "related": [
      "Lat Pulldown",
      "Neutral-Grip Lat Pulldown",
      "Dumbbell Pullover",
      "Straight-Arm Pulldown"
    ],
    "catalogAdded": "36.166",
    "focus": "pull",
    "secondary": [],
    "requiresBar": true,
    "level": 4,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false
  },
  {
    "name": "Ring Triceps Extension",
    "family": "triceps",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "Use low secure rings, keep the body rigid and extend the elbows without shoulder collapse.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 4,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": true,
    "requiresDipBars": false
  },
  {
    "name": "Ring Biceps Curl",
    "family": "biceps",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Lean away from securely anchored rings and curl with stable upper arms; leverage sets the resistance.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "focus": "pull",
    "secondary": [],
    "requiresBar": false,
    "level": 4,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": true,
    "requiresDipBars": false
  },
  {
    "name": "Suspension Chest Press",
    "family": "chest_press",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "shoulders"
    ],
    "note": "Use secure straps and lean forward into a controlled press; scale difficulty by foot position.",
    "related": [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Smith Machine Bench Press",
      "Machine Chest Press"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": true,
    "requiresDipBars": false
  },
  {
    "name": "Suspension Row",
    "family": "horizontal_pull",
    "primaryMuscles": [
      "upperBack",
      "lats"
    ],
    "secondaryMuscles": [
      "biceps",
      "grip"
    ],
    "note": "Use secure straps and lean back with a rigid trunk; pull the handles toward the ribs.",
    "related": [
      "Barbell Row",
      "Pendlay Row",
      "Landmine Row",
      "Seated Row Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "pull",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": true,
    "requiresDipBars": false
  },
  {
    "name": "Suspension Hamstring Curl",
    "family": "hamstrings",
    "primaryMuscles": [
      "hamstrings",
      "hamKneeFlex"
    ],
    "secondaryMuscles": [
      "calves"
    ],
    "note": "Lie supine with heels in secure foot cradles; flex the knees while keeping the hips controlled.",
    "related": [
      "Seated Leg Curl",
      "Lying Leg Curl",
      "Standing Leg Curl",
      "Kneeling Leg Curl Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 4,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": true,
    "requiresDipBars": false
  },
  {
    "name": "Suspension Fallout",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Lean forward through a controlled shoulder reach while resisting lumbar extension.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "core",
    "secondary": [],
    "requiresBar": false,
    "level": 4,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": true,
    "requiresDipBars": false
  },
  {
    "name": "Suspension Body Saw",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Support feet in secure cradles and gently move the rigid plank backward and forward.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "core",
    "secondary": [],
    "requiresBar": false,
    "level": 4,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": true,
    "requiresDipBars": false
  },
  {
    "name": "Tuck Front Lever Hold",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Hang from a secure bar with knees tucked and trunk horizontal; advanced straight-arm pulling skill.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "core",
    "secondary": [],
    "requiresBar": true,
    "level": 5,
    "baseSets": 2,
    "baseReps": 0,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false,
    "baseSeconds": 15
  },
  {
    "name": "Ring Support Hold",
    "family": "triceps",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "Hold stable rings at the sides with elbows extended and shoulders controlled; advanced isometric support.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 4,
    "baseSets": 2,
    "baseReps": 0,
    "auto": false,
    "requiresLowRow": true,
    "requiresDipBars": false,
    "baseSeconds": 15
  },
  {
    "name": "Parallel-Bar Knee Raise",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Support on secure dip bars and lift the knees with a pelvic curl without swinging.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "core",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": true
  },
  {
    "name": "Seated Pike Compression Lift",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Sit tall with legs forward and lift the heels without leaning back; hip-flexor and compression skill.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "core",
    "secondary": [],
    "requiresBar": false,
    "level": 4,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false
  },
  {
    "name": "Bent-Knee Hollow Hold",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Use bent knees to shorten the hollow-body lever while retaining controlled ribs and pelvis.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "core",
    "secondary": [],
    "requiresBar": false,
    "level": 1,
    "baseSets": 2,
    "baseReps": 0,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false,
    "baseSeconds": 25
  },
  {
    "name": "Kneeling Side Plank",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Use forearm and bent-knee support; maintain a stacked trunk and hips.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "core",
    "secondary": [],
    "requiresBar": false,
    "level": 1,
    "baseSets": 2,
    "baseReps": 0,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false,
    "baseSeconds": 25
  },
  {
    "name": "Incline Bodyweight Triceps Extension",
    "family": "triceps",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "Use a secure high rail, rigid trunk and controlled elbow flexion; lower rail height increases demand.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "focus": "push",
    "secondary": [],
    "requiresBar": false,
    "level": 2,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false
  },
  {
    "name": "Wall Calf Raise",
    "family": "calves",
    "primaryMuscles": [
      "calves",
      "gastroc"
    ],
    "secondaryMuscles": [
      "soleus"
    ],
    "note": "Use the wall for balance only and raise the heels through controlled ankle range.",
    "related": [
      "Standing Calf Raise Machine",
      "Seated Calf Raise Machine",
      "Leg Press Calf Raise",
      "Single-Leg Dumbbell Calf Raise"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 1,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false
  },
  {
    "name": "Seated Bodyweight Calf Raise",
    "family": "calves",
    "primaryMuscles": [
      "soleus",
      "calves"
    ],
    "secondaryMuscles": [
      "gastroc"
    ],
    "note": "Sit with knees bent and raise the heels; low-load soleus practice, not a heavy strength substitute.",
    "related": [
      "Standing Calf Raise Machine",
      "Seated Calf Raise Machine",
      "Leg Press Calf Raise",
      "Single-Leg Dumbbell Calf Raise"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 1,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false
  },
  {
    "name": "Heel-Dig Bridge",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Dig the heels into the floor and extend the hips with knees partially bent; avoid lumbar arching.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 2,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false
  },
  {
    "name": "Single-Leg Hamstring Walkout",
    "family": "hamstrings",
    "primaryMuscles": [
      "hamstrings",
      "hamKneeFlex"
    ],
    "secondaryMuscles": [
      "calves"
    ],
    "note": "Start in a bridge and slowly walk one heel outward; retain level hips and shorten the range if control fails.",
    "related": [
      "Seated Leg Curl",
      "Lying Leg Curl",
      "Standing Leg Curl",
      "Kneeling Leg Curl Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 4,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false
  },
  {
    "name": "Quadruped Hip Extension",
    "family": "hip_accessory",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "note": "Extend one hip from hands and knees without rotating the pelvis; low-load control drill.",
    "related": [
      "Hip Abduction Machine",
      "Hip Adduction Machine",
      "Cable Kickback",
      "Glute Kickback Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 1,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false
  },
  {
    "name": "Fire Hydrant",
    "family": "hip_accessory",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "note": "Lift one bent thigh sideways from hands and knees with a stable pelvis; low-load hip-abduction drill.",
    "related": [
      "Hip Abduction Machine",
      "Hip Adduction Machine",
      "Cable Kickback",
      "Glute Kickback Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 1,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false
  },
  {
    "name": "Standing Hip Adduction",
    "family": "hip_accessory",
    "primaryMuscles": [
      "adductors"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "note": "Move one straight leg across the midline with balance support; unloaded adductor control drill.",
    "related": [
      "Hip Abduction Machine",
      "Hip Adduction Machine",
      "Cable Kickback",
      "Glute Kickback Machine"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 1,
    "baseSets": 2,
    "baseReps": 10,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false
  },
  {
    "name": "Squat Jump to Stick",
    "family": "squat",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Jump vertically and land quietly into a stable squat; stop when landing quality drops.",
    "related": [
      "Barbell Front Squat",
      "Barbell Back Squat",
      "Dumbbell Jump Squat",
      "Smith Machine Back Squat"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 3,
    "baseSets": 2,
    "baseReps": 5,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false,
    "power": true
  },
  {
    "name": "Lateral Bound to Stick",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Bound sideways onto the other leg and stabilize the landing; leave adequate clear space.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "focus": "legs",
    "secondary": [],
    "requiresBar": false,
    "level": 4,
    "baseSets": 2,
    "baseReps": 5,
    "auto": false,
    "requiresLowRow": false,
    "requiresDipBars": false,
    "power": true
  }
]);
  const kettlebells=[
  {
    "name": "Bottom-Up Kettlebell Press",
    "family": "press",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "serratus"
    ],
    "note": "Balance the bell upside down with a secure grip and press slowly; use a much lighter load than a conventional press.",
    "related": [
      "Barbell Overhead Press",
      "Barbell Push Press",
      "Dumbbell Push Press",
      "Half-Kneeling Landmine Press"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "shoulder_press",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Half-Kneeling Bottom-Up Press",
    "family": "press",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "serratus"
    ],
    "note": "Press an inverted bell from half kneeling while keeping the trunk quiet; grip and balance limit load.",
    "related": [
      "Barbell Overhead Press",
      "Barbell Push Press",
      "Dumbbell Push Press",
      "Half-Kneeling Landmine Press"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "shoulder_press",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Z Press",
    "family": "press",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "serratus"
    ],
    "note": "Sit on the floor with legs forward and press one bell with the trunk tall; shorten the range if posture fails.",
    "related": [
      "Barbell Overhead Press",
      "Barbell Push Press",
      "Dumbbell Push Press",
      "Half-Kneeling Landmine Press"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "shoulder_press",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Tall-Kneeling Kettlebell Press",
    "family": "press",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "serratus"
    ],
    "note": "Press one bell while tall kneeling with ribs and pelvis stacked.",
    "related": [
      "Barbell Overhead Press",
      "Barbell Push Press",
      "Dumbbell Push Press",
      "Half-Kneeling Landmine Press"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "shoulder_press",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Seated Press",
    "family": "press",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "serratus"
    ],
    "note": "Press one bell from a stable seat without leg drive.",
    "related": [
      "Barbell Overhead Press",
      "Barbell Push Press",
      "Dumbbell Push Press",
      "Half-Kneeling Landmine Press"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "shoulder_press",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Push Jerk",
    "family": "press",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "serratus"
    ],
    "note": "Dip, drive and re-bend under one bell before standing; advanced power skill, not a strict press.",
    "related": [
      "Barbell Overhead Press",
      "Barbell Push Press",
      "Dumbbell Push Press",
      "Half-Kneeling Landmine Press"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "shoulder_press",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false,
    "power": true
  },
  {
    "name": "Double Kettlebell Jerk",
    "family": "press",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "serratus"
    ],
    "note": "Drive two bells and re-bend beneath them; advanced rack and overhead control required.",
    "related": [
      "Barbell Overhead Press",
      "Barbell Push Press",
      "Dumbbell Push Press",
      "Half-Kneeling Landmine Press"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "shoulder_press",
    "defaultKg": 8,
    "load": "double",
    "auto": false,
    "unilateral": false,
    "power": true
  },
  {
    "name": "Kettlebell Thruster",
    "family": "squat",
    "primaryMuscles": [
      "quads",
      "glutes",
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "core"
    ],
    "note": "Combine a goblet squat with a leg-driven overhead press; dose depends on reps, pace and rest.",
    "related": [
      "Barbell Front Squat",
      "Barbell Back Squat",
      "Dumbbell Jump Squat",
      "Smith Machine Back Squat"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "squat",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false,
    "power": true
  },
  {
    "name": "Double Kettlebell Thruster",
    "family": "squat",
    "primaryMuscles": [
      "quads",
      "glutes",
      "shoulders"
    ],
    "secondaryMuscles": [
      "triceps",
      "core"
    ],
    "note": "Combine a double front squat with a leg-driven overhead press; record weight per bell.",
    "related": [
      "Barbell Front Squat",
      "Barbell Back Squat",
      "Dumbbell Jump Squat",
      "Smith Machine Back Squat"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "squat",
    "defaultKg": 8,
    "load": "double",
    "auto": false,
    "unilateral": false,
    "power": true
  },
  {
    "name": "Kettlebell Goblet Reverse Lunge",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Hold one bell at the chest and step backward under control; reps are per leg.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "lunge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Goblet Split Squat",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Hold a bell at the chest with feet planted and lower between them.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "lunge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Bulgarian Split Squat",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Use a secure rear-foot support and one bell in a goblet hold; train both sides.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "lunge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Step-Up",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Step onto a stable platform holding one bell; control the descent without pushing off excessively.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "lunge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Lateral Lunge",
    "family": "lunge",
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "note": "Hold one bell centrally and step sideways, sitting into the working hip.",
    "related": [
      "Dumbbell Lateral Lunge",
      "Dumbbell Reverse Lunge",
      "Dumbbell Bulgarian Split Squat",
      "Dumbbell Step-Up"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "lunge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Sumo Deadlift",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Use a comfortable wider stance and lift a single bell between the feet by extending the hips and knees.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "hinge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Suitcase Deadlift",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Lift a single bell beside one foot with a level trunk; resist side bending.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "hinge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Kickstand RDL",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Use the rear foot for light balance assistance while hinging over the front leg.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "hinge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Single Kettlebell Romanian Deadlift",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Hold one bell with two hands and hinge with soft knees and controlled hip motion.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "hinge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Dead-Stop Kettlebell Swing",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Reset the bell on the floor between swings; use a crisp hip hinge and avoid shoulder lifting.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "hinge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Hand-to-Hand Kettlebell Swing",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Switch hands during the float of a single-bell swing; advanced grip timing in a clear space.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "hinge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Swing to Clean",
    "family": "hinge",
    "primaryMuscles": [
      "glutes",
      "hamHipExt",
      "hamstrings"
    ],
    "secondaryMuscles": [
      "core",
      "grip"
    ],
    "note": "Alternate a swing and a clean to the rack; technique and density determine fatigue.",
    "related": [
      "Barbell Romanian Deadlift",
      "Conventional Barbell Deadlift",
      "Barbell Hip Thrust",
      "Barbell Good Morning"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "hinge",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Low Windmill",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Hold a bell in the lower hand while hinging sideways through a controlled hip range; keep the upper arm unloaded.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "core",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Half Turkish Get-Up",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Roll to elbow, then hand, with the bell overhead; stop before the standing transition and return under control.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "core",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Arm Bar",
    "family": "core",
    "primaryMuscles": [
      "core"
    ],
    "secondaryMuscles": [],
    "note": "Use a light bell overhead while carefully rolling the body around a stable shoulder; manual technique drill.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "core",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Front Rack Hold",
    "family": "core",
    "primaryMuscles": [
      "core",
      "grip"
    ],
    "secondaryMuscles": [
      "shoulders",
      "upperBack"
    ],
    "note": "Stand still with one bell in the rack and resist trunk rotation; no walking space needed.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "core",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false,
    "timed": true
  },
  {
    "name": "Kettlebell Overhead Hold",
    "family": "core",
    "primaryMuscles": [
      "core",
      "grip"
    ],
    "secondaryMuscles": [
      "shoulders",
      "upperBack"
    ],
    "note": "Stand still with one light bell overhead and ribs stacked; stop when shoulder control changes.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "core",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false,
    "timed": true
  },
  {
    "name": "Bottom-Up Kettlebell Hold",
    "family": "core",
    "primaryMuscles": [
      "core",
      "grip"
    ],
    "secondaryMuscles": [
      "shoulders",
      "upperBack"
    ],
    "note": "Balance an inverted light bell in the rack without walking; grip and balance limit duration.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "core",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false,
    "timed": true
  },
  {
    "name": "Kettlebell Goblet Curl",
    "family": "accessory",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Hold the bell by the horns and flex the elbows with quiet upper arms.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "biceps",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Single-Arm Curl",
    "family": "accessory",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Curl one bell with a stable wrist and no trunk swing; reps are per side.",
    "related": [
      "Barbell Curl",
      "Dumbbell Curl",
      "Hammer Curl",
      "Incline Dumbbell Curl"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "biceps",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Overhead Triceps Extension",
    "family": "accessory",
    "primaryMuscles": [
      "triceps",
      "tricepsLong"
    ],
    "secondaryMuscles": [
      "tricepsOther"
    ],
    "note": "Hold one light bell by the horns overhead and extend the elbows through a controlled range.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "triceps",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Skull Crusher",
    "family": "accessory",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "note": "Lie on the floor and extend the elbows with a securely held light bell; maintain a safe bell path.",
    "related": [
      "Close-Grip Barbell Bench Press",
      "Assisted Dip Machine",
      "Dumbbell Skull Crusher",
      "Single-Dumbbell Overhead Triceps Extension"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "triceps",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Pullover",
    "family": "pull",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [
      "chest",
      "tricepsLong",
      "core"
    ],
    "note": "Lie on the floor holding a light bell with both hands; move through controlled shoulder extension without rib flare.",
    "related": [
      "Lat Pulldown",
      "Neutral-Grip Lat Pulldown",
      "Dumbbell Pullover",
      "Straight-Arm Pulldown"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "vertical_pull",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Supported Row",
    "family": "pull",
    "primaryMuscles": [
      "upperBack",
      "lats"
    ],
    "secondaryMuscles": [
      "biceps",
      "grip"
    ],
    "note": "Support the free hand on a stable bench and row one bell toward the hip.",
    "related": [
      "Barbell Row",
      "Pendlay Row",
      "Landmine Row",
      "Seated Row Machine"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "horizontal_pull",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Kettlebell Chest-Supported Row",
    "family": "pull",
    "primaryMuscles": [
      "upperBack",
      "lats"
    ],
    "secondaryMuscles": [
      "biceps",
      "grip"
    ],
    "note": "Use an incline bench for chest support and row one bell without lifting the torso.",
    "related": [
      "Barbell Row",
      "Pendlay Row",
      "Landmine Row",
      "Seated Row Machine"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "horizontal_pull",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": true
  },
  {
    "name": "Double Kettlebell Shrug",
    "family": "pull",
    "primaryMuscles": [
      "upperBack"
    ],
    "secondaryMuscles": [
      "grip"
    ],
    "note": "Hold two bells at the sides and elevate the shoulder blades without elbow bend.",
    "related": [
      "Dumbbell Shrug"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "traps",
    "defaultKg": 8,
    "load": "double",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Glute Bridge",
    "family": "accessory",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "note": "Place a padded bell securely across the pelvis and extend the hips from the floor.",
    "related": [
      "Hip Abduction Machine",
      "Hip Adduction Machine",
      "Cable Kickback",
      "Glute Kickback Machine"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "hip_accessory",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Hip Thrust",
    "family": "accessory",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "note": "Use a stable upper-back support and padded bell across the pelvis; finish with hip extension.",
    "related": [
      "Hip Abduction Machine",
      "Hip Adduction Machine",
      "Cable Kickback",
      "Glute Kickback Machine"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "hip_accessory",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Standing Calf Raise",
    "family": "accessory",
    "primaryMuscles": [
      "calves",
      "gastroc"
    ],
    "secondaryMuscles": [
      "soleus"
    ],
    "note": "Hold one bell and use balance support; raise the heels through controlled range.",
    "related": [
      "Standing Calf Raise Machine",
      "Seated Calf Raise Machine",
      "Leg Press Calf Raise",
      "Single-Leg Dumbbell Calf Raise"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "calves",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Seated Calf Raise",
    "family": "accessory",
    "primaryMuscles": [
      "soleus",
      "calves"
    ],
    "secondaryMuscles": [
      "gastroc"
    ],
    "note": "Sit with bent knees and pad a light bell securely on the working thigh; raise the heel.",
    "related": [
      "Standing Calf Raise Machine",
      "Seated Calf Raise Machine",
      "Leg Press Calf Raise",
      "Single-Leg Dumbbell Calf Raise"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "calves",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  },
  {
    "name": "Kettlebell Figure Eight",
    "family": "core",
    "primaryMuscles": [
      "core",
      "glutes"
    ],
    "secondaryMuscles": [
      "grip",
      "hamstrings"
    ],
    "note": "Pass a light bell between the legs with controlled hip hinges; coordination drill, not proof of heavy hinge strength.",
    "related": [
      "Ab Crunch Machine",
      "Plate-Loaded Ab Crunch Machine",
      "Kneeling Ab Crunch Machine",
      "Rotary Torso Machine"
    ],
    "catalogAdded": "36.166",
    "anatomyFamily": "core",
    "defaultKg": 8,
    "load": "single",
    "auto": false,
    "unilateral": false
  }
];

  kettlebells.push({"name": "Single-Arm Kettlebell Thruster", "family": "squat", "anatomyFamily": "squat", "defaultKg": 8, "load": "single", "unilateral": true, "power": true, "auto": false, "catalogAdded": "36.174", "primaryMuscles": ["quads", "glutes", "shoulders"], "secondaryMuscles": ["triceps", "core"], "related": ["Kettlebell Thruster", "Double Kettlebell Thruster", "Single-Arm Push Press"], "note": "Squat with one bell in the rack, then use controlled leg drive into an overhead press. Reps and load are per side; the bell stays at the weaker side's comfortable load."});
  // Profiles are anatomical/programming descriptions, never measured activation percentages.
  const sourceCatalog=Object.freeze({
    ace:{title:'ACE exercise library — movement-family guidance',url:'https://www.acefitness.org/resources/everyone/exercise-library/',level:'Professional technique guidance; family-level match'},
    aceBands:{title:'ACE bands/cables library',url:'https://www.acefitness.org/resources/everyone/exercise-library/equipment/resistance-bands-cables/',level:'Equipment and movement-family guidance'},
    ankle:{title:'ACE — band/cable ankle dorsiflexion technique',url:'https://www.acefitness.org/resources/everyone/exercise-library/23/ankle-flexion/',level:'Direct technique example; no growth ranking'},
    antiLunge:{title:'ACE — anti-rotation reverse lunge technique',url:'https://www.acefitness.org/resources/everyone/exercise-library/348/anti-rotation-reverse-lunge/',level:'Direct technique example; no load-equivalence claim'},
    kneelingPull:{title:'ACE — kneeling lat pulldown technique',url:'https://www.acefitness.org/resources/everyone/exercise-library/35/kneeling-lat-pulldown/',level:'Direct technique example; variant setup can differ'},
    aceKB:{title:'ACE kettlebell technique examples',url:'https://www.acefitness.org/continuing-education/certified/october-2022/8147/kettlebells-kick-butt-in-more-ways-than-one/',level:'Practitioner guidance; not a growth comparison'},
    overhead:{title:'Maeo et al. — overhead vs neutral cable elbow extension',url:'https://pubmed.ncbi.nlm.nih.gov/35819335/',level:'Direct comparison of tested cable versions; other implements are extrapolations'},
    hamstrings:{title:'Maeo et al. — seated vs prone leg curl',url:'https://pubmed.ncbi.nlm.nih.gov/33009197/',level:'Direct comparison of tested machine versions; band/cable versions are extrapolations'},
    calves:{title:'Kinoshita et al. — standing vs seated calf raises',url:'https://pubmed.ncbi.nlm.nih.gov/38156065/',level:'Direct tested calf-raise comparison; not a ranking of all calf exercises'},
    strongfirst:{title:'StrongFirst — bottoms-up technique and prerequisites',url:'https://www.strongfirst.com/the-bottoms-up-experiment/',level:'Practitioner experience; not controlled comparative growth evidence'},
    calLibrary:{title:'Hybrid Calisthenics exercise library',url:'https://www.hybridcalisthenics.com/exercise-library',level:'Practitioner movement/progression guidance'},
    variation:{title:'Exercise variation systematic review',url:'https://pubmed.ncbi.nlm.nih.gov/35438660/',level:'Programming evidence; not a ranking of every variant'},
    tricepsAnatomy:{title:'NCBI — triceps anatomy and shoulder position',url:'https://www.ncbi.nlm.nih.gov/books/NBK536996/',level:'Anatomy reference'}
  });
  const familyProfiles={
    chest_press:{primary:['chest'],assist:['triceps','shoulders'],action:'Shoulder horizontal adduction/flexion with elbow extension.',detail:'Pectoralis major produces pressing force; anterior deltoid and triceps assist. Scapular stabilizers control the shoulder girdle.',variants:'Incline changes shoulder angle and commonly increases anterior-delt and clavicular-pectoral demand. Floor pressing limits the bottom shoulder-extension range. Grip and bench angle are context, not a universal growth ranking.',fatigue:['chest','triceps','shoulders'],regress:['Wall Push-Up','Incline Push-Up'],progress:['Push-Up','Dumbbell Bench Press']},
    chest_isolation:{primary:['chest'],assist:['shoulders'],action:'Shoulder horizontal adduction with a relatively fixed elbow angle.',detail:'Pectoralis major drives the fly; anterior deltoid assists and elbow/shoulder stabilizers hold position.',variants:'Low-to-high and high-to-low paths change the direction of shoulder demand. A fly gives little direct elbow-extension work and cannot replace a triceps exercise.',fatigue:['chest','shoulders'],regress:['Band Chest Fly','Pec Deck / Machine Fly'],progress:['Cable Fly','Dumbbell Chest Fly']},
    shoulder_press:{primary:['shoulders'],assist:['triceps','serratus'],action:'Shoulder elevation and elbow extension with scapular upward rotation.',detail:'Anterior/medial deltoid and triceps provide pressing force; serratus anterior and trapezius rotate the scapula. The rotator cuff centers the humeral head.',variants:'Strict pressing differs from leg-driven push press/jerk. Seated support reduces some balance demand; unilateral and kneeling setups raise trunk-control demands. More instability can reduce useful pressing load.',fatigue:['shoulders','triceps','upperBack'],regress:['Band Overhead Press','Machine Shoulder Press'],progress:['Single-Arm Strict Press','Dumbbell Shoulder Press']},
    delts:{primary:['shoulders'],assist:['upperBack'],action:'Shoulder raise or rotation; exact joint action depends on the variant.',detail:'Lateral raises emphasize medial deltoid, front raises anterior deltoid. External rotation uses infraspinatus/teres minor; internal rotation involves subscapularis and other shoulder internal rotators.',variants:'A raise and a rotator-cuff rotation are different tasks even though both occupy the broad shoulder model channel. The cuff drill is not proof of overhead-press strength.',fatigue:['shoulders'],regress:['Band Lateral Raise','Cable External Rotation'],progress:['Dumbbell Lateral Raise','Cable Lateral Raise']},
    rear_delts:{primary:['shoulders','upperBack'],assist:['serratus'],action:'Shoulder horizontal abduction and scapular control.',detail:'Posterior deltoid, middle trapezius and rhomboids contribute; cuff and scapular muscles stabilize.',variants:'A higher, flared-elbow row adds elbow-flexor work; a reverse fly uses a relatively fixed elbow. Keep these different from a lat-focused elbow-to-hip row.',fatigue:['shoulders','upperBack'],regress:['Band Pull-Apart','Prone Y-T-W'],progress:['Reverse Pec Deck','Cable Reverse Fly']},
    triceps:{primary:['triceps'],assist:[],action:'Elbow extension; pressing/dip versions also move the shoulder.',detail:'Long, lateral and medial heads extend the elbow. The long head crosses the shoulder; no grip completely isolates one head.',variants:'Overhead positioning lengthens the long head. A direct cable study found greater growth overhead than at the side, especially in the long head; this is not a precise ratio for every implement or person. Pushdowns remain useful elbow-extension work.',fatigue:['triceps'],regress:['Band Triceps Pushdown','Incline Bodyweight Triceps Extension'],progress:['Rope Triceps Pushdown','Overhead Cable Triceps Extension']},
    biceps:{primary:['biceps'],assist:['grip'],action:'Elbow flexion; wrist-only accessories are distinguished below.',detail:'Biceps brachii, brachialis and brachioradialis share elbow-flexion work. Grip changes their mechanical roles; forearm muscles control the wrist.',variants:'Supinated, neutral and pronated grips alter the task, not a clean isolation of individual heads. Shoulder position and cable direction change torque across the curl.',fatigue:['biceps','grip'],regress:['Band Biceps Curl','Machine Biceps Curl'],progress:['Dumbbell Curl','Cable Curl']},
    horizontal_pull:{primary:['upperBack','lats'],assist:['biceps','grip'],action:'Shoulder extension/horizontal abduction, scapular motion and elbow flexion.',detail:'Latissimus dorsi, posterior deltoid, trapezius and rhomboids share pulling work; biceps/brachialis and grip assist.',variants:'Elbow-to-hip paths favor shoulder extension; higher flared-elbow paths add upper-back/rear-delt demand. Chest support reduces unsupported trunk loading without removing the pulling work.',fatigue:['upperBack','lats','biceps','grip'],regress:['Band Seated Row','Inverted Row'],progress:['Cable Seated Row','One-Arm Dumbbell Row']},
    vertical_pull:{primary:['lats'],assist:['upperBack','biceps','grip'],action:'Shoulder adduction/extension with elbow flexion in most versions.',detail:'Latissimus dorsi and teres major drive shoulder pulling; elbow flexors and scapular muscles assist. Straight-arm versions have less elbow-flexor involvement.',variants:'Grip width alone does not prove greater lat growth. Assisted pull-ups use assistance, so less assistance is harder. Pullover/straight-arm versions cannot demonstrate equivalent pull-up elbow-flexor strength.',fatigue:['lats','upperBack','biceps','grip'],regress:['Band Lat Pulldown','Lat Pulldown'],progress:['Pull-Up','Neutral-Grip Pull-Up']},
    traps:{primary:['upperBack'],assist:['grip'],action:'Scapular elevation with relatively straight elbows.',detail:'Upper trapezius and levator scapulae elevate the shoulder girdle; forearm muscles hold the implement.',variants:'Shrugs target elevation; rows and reverse flies emphasize different scapular actions. Rolling the shoulders adds no necessary shrug progression.',fatigue:['upperBack','grip'],regress:['Cable Shrug','Machine Shrug'],progress:['Dumbbell Shrug','Barbell Shrug']},
    squat:{primary:['quads','glutes'],assist:['adductors','core'],action:'Knee and hip extension from a squat.',detail:'Quadriceps extend the knees; gluteus maximus and adductor magnus contribute at the hip. Trunk and hip stabilizers maintain position.',variants:'Depth, stance, heel support and torso angle change joint demands. They do not isolate a single quad head or prove a universal glute/quads percentage. Thrusters add overhead pressing.',fatigue:['quads','glutes','adductors'],regress:['Bodyweight Squat','Leg Press'],progress:['Goblet Squat','Barbell Front Squat']},
    quads:{primary:['quads'],assist:[],action:'Knee extension against resistance.',detail:'Vasti and rectus femoris extend the knee. Rectus femoris also crosses the hip, so hip angle affects its operating length.',variants:'Leg extension isolates knee motion more than a squat or leg press. Reverse Nordic changes leverage and muscle length; its eccentric demand requires separate progression.',fatigue:['quads'],regress:['Band Leg Extension','Leg Extension'],progress:['Single-Leg Leg Extension','Reverse Nordic']},
    hinge:{primary:['glutes','hamstrings','hamHipExt'],assist:['core','grip'],action:'Hip extension with a comparatively small change in knee angle for RDLs.',detail:'Gluteus maximus, hip-extending hamstrings and adductor magnus extend the hip. Spinal extensors and abdominal muscles brace; grip holds free weights.',variants:'Hip hinges and knee curls train different hamstring functions. Thrust/bridge patterns emphasize hip extension with bent knees. Swings, cleans and snatches are ballistic skills with protocol-dependent fatigue.',fatigue:['glutes','hamstrings','core','grip'],regress:['Bodyweight Good Morning','Glute Bridge'],progress:['Dumbbell Romanian Deadlift','Barbell Romanian Deadlift']},
    hamstrings:{primary:['hamstrings','hamKneeFlex'],assist:['calves'],action:'Knee flexion; some variants also require hip-extension control.',detail:'Biceps femoris, semitendinosus and semimembranosus flex the knee; gastrocnemius can assist. The biceps femoris short head does not extend the hip.',variants:'Seated curls lengthen the biarticular hamstrings through hip flexion. A direct machine study found greater growth than prone curls in those muscles. Nordics and sliders have different leverage and eccentric demand; do not copy machine loads to them.',fatigue:['hamstrings','calves'],regress:['Band Seated Leg Curl','Assisted Nordic Hamstring Curl'],progress:['Seated Leg Curl','Nordic Hamstring Curl']},
    lunge:{primary:['quads','glutes'],assist:['adductors','core'],action:'Unilateral or staggered knee/hip extension with balance control.',detail:'Quadriceps, gluteus maximus and adductor magnus produce force; gluteus medius/minimus and trunk muscles stabilize the pelvis.',variants:'Stride, support, step height and torso inclination alter joint demands. Longer stride/hip flexion can increase hip demand; balance can limit load before prime movers do.',fatigue:['quads','glutes','adductors','core'],regress:['Split Squat','Reverse Lunge'],progress:['Dumbbell Split Squat','Bulgarian Split Squat']},
    hip_accessory:{primary:['glutes'],assist:['core'],action:'Hip abduction, adduction or extension as named.',detail:'Abduction emphasizes gluteus medius/minimus with other hip abductors; adduction uses the adductor group. Bridges/thrusts emphasize gluteus maximus.',variants:'Abduction and adduction are opposing tasks and are not interchangeable. Unloaded drills are motor-control/local-endurance work rather than proof of heavy squat or hinge capacity.',fatigue:['glutes'],regress:['Side-Lying Hip Abduction','Glute Bridge'],progress:['Hip Abduction Machine','Cable Kickback']},
    calves:{primary:['calves','gastroc'],assist:['soleus'],action:'Ankle plantarflexion unless explicitly a dorsiflexion exercise.',detail:'Gastrocnemius and soleus plantarflex the ankle. Gastrocnemius also crosses the knee; tibialis anterior dorsiflexes the ankle.',variants:'Bent-knee raises reduce gastrocnemius contribution and emphasize soleus; straight-knee raises involve both. Tibialis raises are the opposing ankle action. Hops add impact/elastic demand and do not share ordinary calf-raise dosing.',fatigue:['calves'],regress:['Bodyweight Calf Raise','Seated Bodyweight Calf Raise'],progress:['Single-Leg Calf Raise','Seated Calf Raise Machine']},
    core:{primary:['core'],assist:[],action:'Trunk flexion/rotation or resistance to extension, rotation or lateral flexion.',detail:'Rectus abdominis, obliques and deeper abdominal muscles act according to the task; spinal extensors assist posture. Leg lifts also use hip flexors and need pelvic control for meaningful abdominal work.',variants:'Anti-rotation, anti-extension, lateral stability and pelvic-curl work are distinct. Hanging versions add grip/scapular demand. Get-ups and windmills require shoulder/hip skill rather than acting as pure abdominal isolation.',fatigue:['core'],regress:['Dead Bug','Kneeling Side Plank'],progress:['Front Plank','Pallof Press']}
  };
  function profile(ex,kind='gym'){
    const n=String(ex.name||'').toLowerCase(),mapped=kind==='kettlebell'?({press:/floor press/.test(n)?'chest_press':'shoulder_press',pull:'horizontal_pull',carry:'core',stability:'core',clean:'hinge',ballistic:'hinge',accessory:'core'}[ex.family]||ex.family):ex.family,
      family=ex.anatomyFamily||mapped,f=familyProfiles[family]||familyProfiles.core,
      primary=[...(ex.primaryMuscles?.length?ex.primaryMuscles:f.primary)],assist=[...(ex.secondaryMuscles||f.assist)].filter(x=>!primary.includes(x)),stabilizers=new Set(),variants=[f.variants],sources=[kind==='kettlebell'?'aceKB':/band|cable/.test(n)?'aceBands':'ace','variation'];
    let detail=f.detail,action=f.action;
    if(/wrist|forearm|wrist roller/.test(n)){primary.splice(0,primary.length,'grip');assist.splice(0);action=/reverse|extension/.test(n)?'Wrist extension with supported forearms.':'Wrist flexion/extension or grip endurance as named.';detail='Forearm wrist flexors/extensors or finger flexors provide the direct work. This is not a direct biceps-strength measurement.';variants.splice(0,variants.length,'Flexion, extension and grip endurance are separate tasks; do not transfer curl load directly to a wrist exercise.');}
    if(/external rotation|internal rotation|arm bar|halo|figure eight|hip airplane|cobra|y-t-w/.test(n))variants.push('Control/mobility skill: load, leverage and range are bounded by technique. Do not interpret completion as evidence of maximal compound strength.');
    if(/external rotation|internal rotation/.test(n)){primary.splice(0,primary.length,'shoulders');assist.splice(0);detail=/external/.test(n)?'Infraspinatus and teres minor externally rotate the shoulder; scapular muscles stabilize.':'Subscapularis contributes to shoulder internal rotation; pectoralis major, latissimus dorsi and teres major can assist depending on position.';action='Glenohumeral '+(/external/.test(n)?'external':'internal')+' rotation with a stable supported elbow.';}
    if(/hip flexion|pike compression/.test(n)){detail='Iliopsoas and rectus femoris lift the thigh; sartorius and tensor fasciae latae can assist. Abdominal muscles control the pelvis. The model has broad quads/core channels rather than a separate iliopsoas channel.';action='Hip flexion with controlled pelvis and trunk.';variants.push('Hip-flexor work is different from hip abduction, adduction and glute-focused extension; do not substitute across these tasks by the hip-accessory label alone.')}
    if(/serratus punch|scapular push-up|push-up plus/.test(n)){primary.splice(0,primary.length,'serratus');assist.splice(0,assist.length,'shoulders');detail='Serratus anterior drives scapular protraction and helps upward rotation. Hold the trunk and elbow position; this is not ordinary chest pressing.';action='Scapular protraction/retraction with little elbow motion.';}
    if(/adduction|copenhagen/.test(n)){primary.splice(0,primary.length,'adductors');assist.splice(0,assist.length,'core');action='Hip adduction or isometric adduction under trunk-control demand.';detail='Adductor longus, brevis, magnus, gracilis and pectineus contribute according to hip angle. Copenhagen versions add lateral trunk stability.';}
    if(/abduction|clamshell|lateral walk|monster walk|fire hydrant/.test(n)){primary.splice(0,primary.length,'glutes');detail='Gluteus medius/minimus and other hip abductors control the thigh and pelvis. Pelvic motion changes the task; the broad model channel is glutes.';}
    if(/tibialis|dorsiflexion/.test(n)){primary.splice(0,primary.length,'tibialis');assist.splice(0);action='Ankle dorsiflexion.';detail='Tibialis anterior and toe extensors raise the forefoot; this is distinct from calf plantarflexion.';}
    if(/seated|bent-knee|soleus/.test(n)&&/calf|soleus/.test(n)){primary.splice(0,primary.length,'soleus','calves');assist.splice(0,assist.length,'gastroc');}
    if(/pullover|straight-arm pulldown/.test(n)&&!/standing pullover/.test(n)){primary.splice(0,primary.length,'lats');assist.splice(0,assist.length,'tricepsLong','chest');action='Shoulder extension with relatively fixed elbows.';variants.push('Reduced elbow-flexor work relative to rows/pulldowns; shared lat demand does not establish equivalent curl or pull-up capacity.');}
    if(/standing pullover/.test(n)){primary.splice(0,primary.length,'shoulders','triceps');assist.splice(0);action='Light controlled overhead/behind-head movement while standing.';detail='Shoulder/triceps control and range practice. A lat stretch does not make this the same task as a lying pullover.';}
    if(/thruster/.test(n)){primary.splice(0,primary.length,'quads','glutes','shoulders');assist.splice(0,assist.length,'triceps');action='Front squat flows into an overhead press with leg drive; one complete sequence is one rep.';detail='Combined squat and press; log the actual repetitions, effort and rest. This is not a fresh strict-press strength test.';}
    if(/hip thrust|glute bridge|frog pump/.test(n)){primary.splice(0,primary.length,'glutes');assist.splice(0,assist.length,'hamHipExt');variants.push('Bent-knee hip extension: glute emphasis; not a substitute for direct knee-flexion hamstring work.');}
    if(/overhead.*triceps|triceps overhead/.test(n)){sources.push('overhead','tricepsAnatomy');primary.splice(0,primary.length,'triceps','tricepsLong');assist.splice(0,assist.length,'tricepsOther');}
    if(/seated.*leg curl|lying.*leg curl|prone.*leg curl/.test(n))sources.push('hamstrings');
    if(/calf raise|soleus/.test(n))sources.push('calves');
    if(/dorsiflexion/.test(n))sources.push('ankle');
    if(/anti-rotation reverse lunge/.test(n))sources.push('antiLunge');
    if(/kneeling.*pulldown/.test(n))sources.push('kneelingPull');
    if(/bottom-up/.test(n))sources.push('strongfirst');
    if(kind==='calisthenics'&&!ex.requiresBands)sources.push('calLibrary');
    if(/swing|clean|snatch|jerk|thruster|push press|jump|bound/.test(n))variants.push('Power/density variant: use crisp technique and adequate rest. Workload, pace and effort determine conditioning credit; the implement alone does not.');
    if(/bottom-up/.test(n))variants.push('Grip/balance often limits this version; do not reuse a conventional pressing load or interpret it as a stronger muscle-growth stimulus.');
    if(/ring|suspension/.test(n))variants.push('Secure suspension/ring hardware is required. Foot position and instability change effective resistance; setup-specific history matters.');
    const equipment=ex.equipment||(kind==='kettlebell'?(ex.load==='double'?'Two kettlebells':'One kettlebell'):ex.requiresBands?'Resistance band':ex.requiresBar?'Pull-up bar':ex.requiresLowRow?'Secure low-row/ring/suspension setup':ex.requiresDipBars?'Dip bars':ex.requiresAbWheel?'Ab wheel':'Bodyweight / stable support as described'),
      band=/band/.test(n)||ex.requiresBands,machine=equipment==='Machine',hold=!!ex.timed||Number(ex.baseSeconds)>0||/hold|hang|wall sit/.test(n),unilateral=!!ex.unilateral||/single-|one-arm|half-kneeling|lunge|split squat|side plank|copenhagen/.test(n),
      resistance=band?'Elastic resistance usually rises as the band stretches; joint torque also depends on anchor direction and lever arm. Record band identity, anchor, starting stretch and grip; colors are not standardized loads.':machine?'Machine geometry, lever arms and stack/pulley ratios define the resistance curve. Displayed weight is setup-specific; do not compare stacks or plate-loaded machines directly.':equipment==='Cable'?'Cable tension acts along the pulley line; joint torque changes with angle and lever arm. Pulley ratios vary, so retain setup-specific history.':/bodyweight|support|bar|rings|suspension/i.test(equipment)&&kind==='calisthenics'?'Bodyweight resistance changes with leverage, body mass, support and assistance. Record the variation and support height; reps alone do not equate loads.':'Gravity provides the load; joint torque changes with lever arm and position. Bell/dumbbell/bar load is not an activation measurement.',
      logging=band?'Band identity and setup in notes; reps'+(unilateral?' per side':'')+'. Assistance bands: less assistance is harder.':kind==='kettlebell'?'kg '+(ex.load==='double'?'per bell':'for the single bell')+'; '+(hold?'hold seconds in time/notes':'reps'+(unilateral?' per side when applicable':''))+'; do not count two bells as one-bell kg.':kind==='calisthenics'?(hold?'Seconds per hold, plus assistance/support/leverage.':'Reps'+(unilateral?' per side':'')+', plus assistance/support/leverage.'):'Use the existing load convention ('+(ex.load||'total')+'); '+(ex.assistanceLoad?'lower assistance is harder. ': '')+(unilateral?'reps per side; ':'')+'keep machine and setup history distinct.';
    if(/calf raise|soleus/.test(n))variants.push('A direct standing-versus-seated training study favored standing for gastrocnemius growth; soleus growth was similar. Bent-knee emphasis does not mean proven greater soleus growth.');
    if(!machine&&!/supported|seated|lying|floor|prone/.test(n))stabilizers.add('core');
    if(kind==='kettlebell'||/barbell|dumbbell|cable|band|row|pull-up|hang/.test(n))stabilizers.add('grip');
    if(/press|raise|row|pull|hold|hang|ring/.test(n))stabilizers.add('shoulders');
    if(unilateral&&/squat|lunge|leg|step|hip/.test(n))stabilizers.add('glutes');
    let regressions=f.regress.slice(),progressions=f.progress.slice();
    if(/wrist|forearm|wrist roller/.test(n)){regressions=/reverse/.test(n)?['Band Reverse Wrist Curl','Dumbbell Reverse Wrist Curl']:['Band Wrist Curl','Dumbbell Wrist Curl'];progressions=/reverse/.test(n)?['Dumbbell Reverse Wrist Curl','Cable Reverse Wrist Curl','Barbell Reverse Wrist Curl']:['Dumbbell Wrist Curl','Barbell Forearm Curl','Forearm Curl Machine']}
    if(/external rotation/.test(n)){regressions=['Band External Rotation','Cable External Rotation'];progressions=['Cable External Rotation','Machine Shoulder External Rotation']}
    if(/internal rotation/.test(n)){regressions=['Band Internal Rotation','Cable Internal Rotation'];progressions=['Cable Internal Rotation','Band Internal Rotation']}
    if(/hip flexion|pike compression/.test(n)){regressions=['Hanging Knee Raise','Seated Leg Raise Machine'];progressions=['Hanging Leg Raise','Cable Hip Flexion']}
    if(/serratus punch|scapular push-up|push-up plus/.test(n)){regressions=['Scapular Push-Up','Band Serratus Punch'];progressions=['Push-Up Plus','Cable Serratus Punch']}
    if(/adduction|copenhagen/.test(n)){regressions=['Standing Hip Adduction','Short-Lever Copenhagen Adduction'];progressions=['Hip Adduction Machine','Cable Hip Adduction','Long-Lever Copenhagen Adduction']}
    if(/abduction|clamshell|lateral walk|monster walk|fire hydrant/.test(n)){regressions=['Side-Lying Hip Abduction','Band Clamshell'];progressions=['Hip Abduction Machine','Cable Hip Abduction']}
    if(/tibialis|dorsiflexion/.test(n)){regressions=['Band Ankle Dorsiflexion','Tibialis Raise'];progressions=['Tibialis Raise','Tibialis Raise Machine']}
    if(/pullover|straight-arm pulldown/.test(n)&&!/standing pullover/.test(n)){regressions=['Band Straight-Arm Pulldown','Straight-Arm Pulldown'];progressions=['Straight-Arm Pulldown','Machine Pullover','Dumbbell Pullover']}
    if(/bottom-up/.test(n)){regressions=['Single-Arm Strict Press','Kettlebell Front Rack Hold'];progressions=['Bottom-Up Kettlebell Hold','Bottom-Up Kettlebell Press','Half-Kneeling Bottom-Up Press']}
    const fatigue=[...new Set([...primary,...assist,...stabilizers])],related=[...new Set(ex.related||[...f.regress,...f.progress])].filter(x=>x!==ex.name);
    return {version:1,reviewed:'2026-10-12',family,primary,assist,stabilizers:[...stabilizers].filter(x=>!primary.includes(x)&&!assist.includes(x)),muscleDetail:detail,jointAction:action,equipment,unilateral,doseUnit:hold?'seconds':'repetitions',resistance,logging,
      progression:band?'Progress controlled reps/range first, then change band or leverage in small steps; record the changed setup as distinct context.':hold?'Progress controlled hold duration inside the app window, then leverage/load; stop before position fails.':'Use the app prescription and exact performance history: controlled reps first, then the next available load or harder variation. Preserve manual targets.',
      variantNotes:variants,fatigueOverlap:fatigue,sequence:'Earlier hard work for '+primary.join(', ')+' can reduce later capacity. Shared assistance/grip/bracing also matters; later-set performance is not a fresh-capacity measurement.',
      related,regressions:regressions.filter(x=>x!==ex.name),progressions:progressions.filter(x=>x!==ex.name),
      substitution:'Related movements share some muscles or actions; they are not guaranteed load-equivalent. Match equipment, direction, skill and range; exact exercise history outranks transfer.',
      limitations:'Anatomical roles and model coefficients are planning estimates, not measured activation percentages, a guarantee of growth or individualized joint-force data.',
      sources:[...new Set(sources)].map(id=>({...sourceCatalog[id],id})),evidence:'Anatomical inference and movement-family guidance'+(sources.includes('overhead')||sources.includes('hamstrings')?'; a scoped direct variant comparison is linked':'')};
  }
  function enrichCatalogs(catalogs){
    const all=Object.values(catalogs).flat();
    for(const [kind,entries] of Object.entries(catalogs))for(const ex of entries){
      const p=profile(ex,kind);p.related=[...new Set([...p.related,...(ex.name==='Broad Jump'?['Squat Jump to Stick','Skater Jump']:ex.name==='Pogo Hop'?['Bodyweight Calf Raise','Seated Bodyweight Calf Raise']:[])])].filter(n=>all.some(x=>x.name===n)&&n!==ex.name);p.regressions=p.regressions.filter(n=>all.some(x=>x.name===n));p.progressions=p.progressions.filter(n=>all.some(x=>x.name===n));
      // Fill absent metadata only; preserve previously curated muscle weights/identity.
      if(!ex.primaryMuscles?.length)ex.primaryMuscles=p.primary.slice();
      if(!ex.secondaryMuscles)ex.secondaryMuscles=p.assist.slice();
      if(!ex.related?.length)ex.related=p.related.slice();
      ex.exerciseProfile=p;
    }
    return catalogs;
  }

  for(const ex of [...gym,...kettlebells].filter(x=>/Shrug$/.test(x.name))){ex.related=['Dumbbell Shrug','Barbell Shrug','Cable Shrug','Machine Shrug'].filter(n=>n!==ex.name)}
  const searchAliases={kb:'kettlebell',kbs:'kettlebell',db:'dumbbell',dbs:'dumbbell',bb:'barbell',bw:'bodyweight',tubing:'band',elastic:'band',resistance:'band',pec:'chest',pecs:'chest',pectoral:'chest',pectorals:'chest',ab:'core',abs:'core',abdominal:'core',abdominals:'core',quad:'quads',quadriceps:'quads',hamstring:'hamstrings',glute:'glutes',butt:'glutes',delt:'shoulders',delts:'shoulders',deltoid:'shoulders',deltoids:'shoulders',tri:'tricep',triceps:'tricep',bi:'bicep',biceps:'bicep',lat:'lats',calf:'calves',bands:'band',rows:'row',presses:'press',machines:'machine',cables:'cable'};
  function normalizeSearch(value){
    return String(value||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/pull[- ]?ups?/g,'pull up').replace(/push[- ]?ups?/g,'push up').replace(/pull[- ]?downs?/g,'pull down').replace(/rdl/g,'romanian deadlift').replace(/ohp/g,'overhead press').replace(/[^a-z0-9]+/g,' ').trim().split(/\s+/).map(w=>searchAliases[w]||w).join(' ');
  }
  function oneEdit(a,b){
    if(a.length<4||b.length<4||Math.abs(a.length-b.length)>1)return false;
    let i=0,j=0,edits=0;while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++;continue}if(++edits>1)return false;if(a.length>=b.length)i++;if(b.length>=a.length)j++}return edits+(i<a.length||j<b.length?1:0)<=1;
  }
  function searchScore(item,query){
    const q=normalizeSearch(query);if(!q)return 1;
    const name=normalizeSearch(item.name||item),tags=normalizeSearch(item.tags||''),words=[...new Set((name+' '+tags).split(' '))],tokens=[...new Set(q.split(' '))];let score=0;
    for(const token of tokens){const inName=name.split(' ').some(w=>w===token||w.startsWith(token)),inTags=words.some(w=>w===token||w.startsWith(token));if(inName)score+=12;else if(inTags)score+=4;else if(words.some(w=>oneEdit(w,token)))score+=1;else return 0}
    return score+(name===q?100:name.includes(q)?30:0);
  }

  function validateCatalog(){
    const errors=[],all=[...gym,...calisthenics,...kettlebells],names=new Set();
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
    return {valid:errors.length===0,errors,gym:gym.length,calisthenics:calisthenics.length,kettlebells:kettlebells.length,total:all.length};
  }

  const machineVisuals=typeof require==='function'?require('./machine-context.js'):globalThis.HybridMachineContext;
  gym.forEach(ex=>{const mode=machineVisuals?.plateMode(ex);if(mode)ex.plateVisual=mode;});

  return Object.freeze({version:6,kettlebells:Object.freeze(kettlebells),profile,enrichCatalogs,normalizeSearch,searchScore,gym:Object.freeze(gym),calisthenics:Object.freeze(calisthenics),validateCatalog});
});
