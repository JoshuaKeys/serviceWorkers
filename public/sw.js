self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open('v2').then(cache=>{
            return cache.addAll([
                './',
                './assets/data.json',
                './assets/favicon.ico',
                './assets/joshua.jpeg',
                './scripts/index.js',
                './scripts/app.js',
                './styles/index.css',
                './index.html'
            ])
        })
    )
});
self.addEventListener('fetch', (event)=>{
    event.respondWith(
        caches.match(event.request).then(response=> response || fetch(event.request).then(response=>{
            return caches.open('v1').then(cache => {
                cache.put(event.request, response.clone())
                return response;
            })
        })).catch(()=> {
            console.log('Hellosssss')
            return caches.match('./assets/joshua.jpeg');
        })
    )
})

self.addEventListener('activate', event=>{
    var cacheKeepList = ['v2'];
    event.waitUntil(
        caches.keys().then(keyList=>{
            return Promise.all(keyList.map(key => {
                if(cacheKeepList.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }))
        })
    )
})