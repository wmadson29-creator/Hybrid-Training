const BUILD="36.224";
const CACHE="hybrid-training-v36-224-workout-workflows";
const FALLBACK="./index.html?v=36.224";
const PERSONALIZATION="./adaptive-personalization-v36.120.js?v=36.224";
const REQUIRED_PRECACHE=[
  "./training-forecast-worker.js?v=36.224",
  "./training-rotation.js?v=36.224",
  "./training-modern.css?v=36.224",
  "./training-experience.js?v=36.224",
  "./session-feedback.js?v=36.224",
  "./workout-preferences.js?v=36.224",
  "./muscle-model.js?v=36.224",
  "./kb-programming.js?v=36.224",
  FALLBACK,
  "./weight-units.js?v=36.224",
  "./training-profile.js?v=36.224",
  "./reactive-schedule.js?v=36.224",
  "./personal-recommendations.js?v=36.224",
  "./personal-training.js?v=36.224",
  "./profile-week-editor.js?v=36.224",
  "./profile-setup.js?v=36.224",
  "./profile-equipment.js?v=36.224",
  "./equipment-views.js?v=36.224",
  "./app-language.js?v=36.224",
  "./locales-pl.js?v=36.224",

  "./manifest-v36.webmanifest?v=36.224",
  "./decision-integrity-v36.131.js?v=36.224",
  "./actual-load-feedback-v36.126.js?v=36.224",
  "./forecast-balance-v36.127.js?v=36.224",
  "./machine-context.js?v=36.224",
  "./exercise-expansion-v36.128.js?v=36.224",
  "./app-shell-v36.119.css?v=36.224",
  "./app-shell-v36.119.js?v=36.224",
  "./stretching-flexibility-v36.119.js?v=36.224",
  "./ui-workflows.js?v=36.224",
  "./kb-load-layout.js?v=36.224",
  "./kettlebell-programs.js?v=36.224",
  "./kb-weekly-circuit.js?v=36.224",
  "./kb-refinement.js?v=36.224",
  "./performed-training.js?v=36.224",
  "./barbell-plate-layout.js?v=36.224",
  "./kb-internal-stack.js?v=36.224",
  "./emom-templates.js?v=36.224",
  "./training-effects.js?v=36.224",
  "./session-fatigue.js?v=36.224",
  "./workout-optimizer.js?v=36.224",
  PERSONALIZATION
];
const OPTIONAL_PRECACHE=[
  "./hybrid-training-v34-64.png",
  "./hybrid-training-v34-180.png",
  "./hybrid-training-v34-192.png",
  "./hybrid-training-v34-512.png",
  "./hybrid-training-v34-512-maskable.png"
];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(async cache=>{
    await cache.addAll(REQUIRED_PRECACHE);
    await Promise.all(OPTIONAL_PRECACHE.map(url=>cache.add(url).catch(()=>null)));
  }).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k.startsWith("hybrid-training-")&&k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
async function fetchAndCache(cache,url,requestOptions={}){
  const response=await fetch(url,requestOptions);
  if(response&&response.ok)await cache.put(FALLBACK,response.clone());
  return response;
}
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(url.pathname.endsWith("/version.json")){
    event.respondWith(fetch(event.request,{cache:"no-store"}).catch(()=>caches.match(event.request)));
    return;
  }
  if(event.request.mode==="navigate"){
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE),cached=await cache.match(FALLBACK);
      if(cached){
        event.waitUntil(fetchAndCache(cache,"./index.html?v="+BUILD,{cache:"no-store"}).catch(()=>null));
        return cached.clone();
      }
      try{return await fetchAndCache(cache,"./index.html?v="+BUILD,{cache:"no-store"})}
      catch(_e){return cached?cached.clone():Response.error()}
    })());
    return;
  }
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE),cached=await cache.match(event.request);
    if(cached){
      event.waitUntil(fetch(event.request,{cache:"no-store"}).then(r=>{if(r&&r.ok)return cache.put(event.request,r.clone())}).catch(()=>null));
      return cached;
    }
    try{
      const response=await fetch(event.request,{cache:"no-store"});
      if(response&&response.ok)event.waitUntil(cache.put(event.request,response.clone()));
      return response;
    }catch(_e){return cached||Response.error()}
  })());
});
self.addEventListener("message",event=>{if(event.data==="SKIP_WAITING")self.skipWaiting()});
