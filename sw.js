const CACHE="hybrid-training-v36-3";
const FALLBACK="./index.html";
const PRECACHE=[
  FALLBACK,
  "./manifest-v36.webmanifest",
  "./hybrid-training-v34-64.png",
  "./hybrid-training-v34-180.png",
  "./hybrid-training-v34-192.png",
  "./hybrid-training-v34-512.png",
  "./hybrid-training-v34-512-maskable.png"
];
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(CACHE)
   .then(cache=>Promise.all(PRECACHE.map(url=>cache.add(url).catch(()=>null))))
   .then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 if(event.request.mode==="navigate"){
   event.respondWith(fetch(event.request,{cache:"no-store"})
     .then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(FALLBACK,copy));return response})
     .catch(()=>caches.match(FALLBACK)));
   return;
 }
 event.respondWith(fetch(event.request,{cache:"no-store"})
   .then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response})
   .catch(()=>caches.match(event.request)));
});
self.addEventListener("message",event=>{if(event.data==="SKIP_WAITING")self.skipWaiting()});
