// ==========================================
// NOMBRE DE LA CACHÉ
// ==========================================

const CACHE_NAME = "mil-rincon-del-sabor-v3";


// ==========================================
// ARCHIVOS PRINCIPALES
// ==========================================

const ARCHIVOS = [

  "./",
  "./index.html",

  // CSS
  "./css/materialize.min.css",
  "./css/styles.css",

  // JavaScript
  "./js/materialize.min.js",
  "./js/firebase.js",
  "./js/index.js",
  "./js/db.js",

  // PWA
  "./manifest.json"

];


// ==========================================
// INSTALAR SERVICE WORKER
// ==========================================

self.addEventListener("install", function (event) {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(function (cache) {

        console.log(
          "Guardando archivos en caché..."
        );

        return cache.addAll(ARCHIVOS);

      })

  );

  // Activar inmediatamente
  self.skipWaiting();

});


// ==========================================
// ACTIVAR SERVICE WORKER
// ==========================================

self.addEventListener("activate", function (event) {

  event.waitUntil(

    caches.keys()

      .then(function (cacheNames) {

        return Promise.all(

          cacheNames.map(function (cacheName) {

            // Eliminar cachés anteriores
            if (cacheName !== CACHE_NAME) {

              console.log(
                "Eliminando caché antigua:",
                cacheName
              );

              return caches.delete(cacheName);

            }

          })

        );

      })

  );

  // Tomar control inmediatamente
  self.clients.claim();

});


// ==========================================
// PETICIONES
// ==========================================

self.addEventListener("fetch", function (event) {

  // Solo peticiones GET
  if (event.request.method !== "GET") {

    return;

  }


  event.respondWith(

    fetch(event.request)

      .then(function (respuesta) {

        // Guardar una copia actualizada
        const copia = respuesta.clone();

        caches.open(CACHE_NAME)
          .then(function (cache) {

            cache.put(
              event.request,
              copia
            );

          });

        // Mostrar la versión actual
        return respuesta;

      })

      .catch(function () {

        // Si no hay internet,
        // utilizar la versión guardada

        return caches.match(
          event.request
        );

      })

  );

});