const CACHE_NAME = "Mil rincon del sabor-cache-v2";

const ARCHIVOS = [
  "./",
  "./index.html",
  "./css/materialize.min.css",
  "./css/styles.css",
  "./js/materialize.min.js",
  "./js/index.js",
  "./js/firebase.js",
  "./js/db.js",
  "./manifest.json"
];


// INSTALAR SERVICE WORKER
self.addEventListener(
  "install",
  function (event) {

    event.waitUntil(

      caches
        .open(CACHE_NAME)

        .then(function (cache) {

          console.log(
            "Guardando archivos en caché"
          );

          return cache.addAll(
            ARCHIVOS
          );

        })

    );

    self.skipWaiting();

  }
);

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('sw-cache').then(function(cache){
            return cache.add('index.html');
        })
    );
});