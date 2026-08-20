const CACHE_NAME = "Mil rincon del sabor -cache-v2";

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


// ACTIVAR
self.addEventListener(
  "activate",
  function (event) {

    event.waitUntil(

      caches
        .keys()

        .then(function (cacheNames) {

          return Promise.all(

            cacheNames.map(
              function (cacheName) {

                if (
                  cacheName !== CACHE_NAME
                ) {

                  return caches.delete(
                    cacheName
                  );

                }

              }
            )

          );

        })

    );

    self.clients.claim();

  }
);


// PETICIONES
self.addEventListener(
  "fetch",
  function (event) {

    if (
      event.request.method !== "GET"
    ) {

      return;

    }

    event.respondWith(

      caches
        .match(event.request)

        .then(function (respuesta) {

          if (respuesta) {

            return respuesta;

          }

          return fetch(
            event.request
          );

        })

    );

  }
);