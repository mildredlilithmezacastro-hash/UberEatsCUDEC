let contenido = "";

document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // MENÚ LATERAL
  // =========================

  const menus = document.querySelectorAll(".side-menu");

  if (menus.length > 0) {
    M.Sidenav.init(menus, {
      edge: "right"
    });
  }


  // =========================
  // FORMULARIO
  // =========================

  const forms = document.querySelectorAll(".side-form");

  if (forms.length > 0) {
    M.Sidenav.init(forms, {
      edge: "left"
    });
  }


  // =========================
  // BOTONES DE CÁMARA
  // =========================

  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const foto = document.getElementById("foto");

  const btnFoto = document.getElementById("btnFoto");
  const btnTomarFoto = document.getElementById("tomarFoto");

  let streaming = false;

  const width = 320;
  let height = 0;

  let streamActual = null;


  // =========================
  // ABRIR CÁMARA
  // =========================

  if (btnFoto && video) {

    btnFoto.addEventListener("click", function () {

      if (!navigator.mediaDevices ||
          !navigator.mediaDevices.getUserMedia) {

        alert("Tu navegador no permite utilizar la cámara.");

        return;
      }


      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: {
              ideal: "environment"
            }
          },
          audio: false
        })

        .then(function (stream) {

          streamActual = stream;

          video.srcObject = stream;

          video.setAttribute("playsinline", true);

          video.play();

        })

        .catch(function (error) {

          console.error("Error al abrir la cámara:", error);

          alert(
            "No se pudo abrir la cámara. " +
            "Verifica que hayas dado permiso para utilizarla."
          );

        });

    });

  }


  // =========================
  // CONFIGURAR VIDEO
  // =========================

  if (video) {

    video.addEventListener("canplay", function () {

      if (!streaming) {

        if (video.videoWidth && video.videoHeight) {

          height =
            video.videoHeight /
            (video.videoWidth / width);

        } else {

          height = 240;

        }


        video.setAttribute("width", width);
        video.setAttribute("height", height);

        streaming = true;

      }

    });

  }


  // =========================
  // TOMAR FOTO
  // =========================

  if (btnTomarFoto) {

    btnTomarFoto.addEventListener(
      "click",
      tomarFoto
    );

  }


  function tomarFoto() {

    if (!canvas || !video || !foto) {
      return;
    }


    const contexto = canvas.getContext("2d");


    if (width && height && video.videoWidth > 0) {

      canvas.width = width;
      canvas.height = height;


      contexto.drawImage(
        video,
        0,
        0,
        width,
        height
      );


      const fotoFinal =
        canvas.toDataURL("image/png");


      foto.setAttribute(
        "src",
        fotoFinal
      );


      console.log("Foto tomada correctamente.");

    } else {

      limpiarFoto();

      alert(
        "Espera a que la cámara esté lista."
      );

    }

  }


  // =========================
  // LIMPIAR FOTO
  // =========================

  function limpiarFoto() {

    if (foto) {
      foto.src = "";
    }

  }


  // =========================
  // ELIMINAR PLATILLO
  // =========================

  const recipes =
    document.querySelector(".recipes");


  if (recipes) {

    recipes.addEventListener(
      "click",
      function (e) {

        if (
          e.target.classList.contains(
            "material-icons"
          )
        ) {

          const id =
            e.target.dataset.id;


          if (id) {

            eliminarPlatillo(id);

          }

        }

      }
    );

  }


  // =========================
  // DETENER CÁMARA
  // =========================

  const sideForm =
    document.getElementById("side-form");


  if (sideForm) {

    sideForm.addEventListener(
      "click",
      function () {

        // La cámara continúa funcionando
        // mientras el usuario la utilice.

      }
    );

  }

});


// =====================================================
// MOSTRAR PLATILLO
// =====================================================

function mostrarPlatillo(platillo, id) {

  const recipes =
    document.querySelector(".recipes");


  if (!recipes) {
    return;
  }


  const tarjeta = document.createElement("div");

  tarjeta.className =
    "card-panel recipe white row";


  tarjeta.id = id;


  tarjeta.innerHTML = `

    <div class="recipe-details">

      <div class="recipe-title">
        ${platillo.nombre || ""}
      </div>

      <div class="recipe-ingredients">
        ${platillo.ingredientes || ""}
      </div>

      <div class="recipe-price">
        Precio: $${platillo.precio || ""}
      </div>

    </div>


    <div class="recipe-delete">

      <i
        class="material-icons"
        data-id="${id}">
        delete_outline
      </i>

    </div>

  `;


  recipes.appendChild(tarjeta);

}


// =====================================================
// ACTUALIZAR PLATILLO
// =====================================================

function actualizarPlatillo(platillo, id) {

  const tarjeta =
    document.getElementById(id);


  if (!tarjeta) {
    return;
  }


  const titulo =
    tarjeta.querySelector(
      ".recipe-title"
    );


  const ingredientes =
    tarjeta.querySelector(
      ".recipe-ingredients"
    );


  const precio =
    tarjeta.querySelector(
      ".recipe-price"
    );


  if (titulo) {

    titulo.innerHTML =
      platillo.nombre || "";

  }


  if (ingredientes) {

    ingredientes.innerHTML =
      platillo.ingredientes || "";

  }


  if (precio) {

    precio.innerHTML =
      "Precio: $" +
      (platillo.precio || "");

  }

}


// =====================================================
// ELIMINAR PLATILLO
// =====================================================

function eliminarPlatillo(id) {

  if (!id) {
    return;
  }


  db.collection("platillos")
    .doc(id)
    .delete()

    .then(function () {

      console.log(
        "Platillo eliminado correctamente"
      );

    })

    .catch(function (error) {

      console.error(
        "Error al eliminar:",
        error
      );

      alert(
        "No se pudo eliminar el platillo."
      );

    });

}