const V='codera-v2',SHELL=['index.html','videos.html','teachers.html','courses.html','books.html','news.html','social.html','404.html','assets/css/style.css','assets/js/data.js','assets/js/icons.js','assets/js/app.js','assets/img/logo.webp','assets/img/favicon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==location.origin||r.headers.has('range')||/\.(mp4|pdf)$/.test(u.pathname))return;
 const img=/\.(png|jpe?g|webp|svg)$/.test(u.pathname);
 e.respondWith(img?caches.match(r).then(m=>m||fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(r,c));return n})):
  fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(r,c));return n}).catch(()=>caches.match(r).then(m=>m||caches.match('404.html'))))});
