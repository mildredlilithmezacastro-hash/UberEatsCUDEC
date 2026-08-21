document.addEventListener(
  "DOMContentLoaded",
  function () {


    // ==========================================
    // OBTENER PLATILLOS DE FIRESTORE
    // ==========================================

    db.collection("platillos")
      .onSnapshot(

        function (datos) {

          datos.docChanges().forEach(
            function (registro) {


              // ==========================
              // NUEVO PLATILLO
              // ==========================

              if (
                registro.type === "added"
              ) {

                mostrarPlatillo(
                  registro.doc.data(),
                  registro.doc.id
                );

              }


              // ==========================
              // PLATILLO MODIFICADO
              // ==========================

              if (
                registro.type === "modified"
              ) {

                actualizarPlatillo(
                  registro.doc.data(),
                  registro.doc.id
                );

              }


              // ==========================
              // PLATILLO ELIMINADO
              // ==========================

              if (
                registro.type === "removed"
              ) {

                const elemento =
                  document.getElementById(
                    registro.doc.id
                  );


                if (elemento) {

                  elemento.remove();

                }

              }

            }
          );

        },

        function (error) {

          console.error(
            "Error de Firestore:",
            error
          );

          alert(
            "No se pudieron cargar los platillos."
          );

        }

      );


    // ==========================================
    // FORMULARIO
    // ==========================================

    const formularioAgregar =
      document.querySelector(
        ".add-recipe"
      );


    if (!formularioAgregar) {

      console.error(
        "No se encontró el formulario."
      );

      return;

    }


    // ==========================================
    // AGREGAR PLATILLO
    // ==========================================

    formularioAgregar.addEventListener(
      "submit",
      function (e) {

        e.preventDefault();


        // Obtener valores

        const nombre =
          document.getElementById(
            "title"
          ).value.trim();


        const ingredientes =
          document.getElementById(
            "ingredients"
          ).value.trim();


        const precio =
          document.getElementById(
            "price"
          ).value.trim();


        // ======================================
        // VALIDAR
        // ======================================

        if (
          nombre === "" ||
          ingredientes === "" ||
          precio === ""
        ) {

          alert(
            "Por favor completa todos los campos."
          );

          return;

        }


        // ======================================
        // CREAR PLATILLO
        // ======================================

        const platilloNuevo = {

          nombre: nombre,

          ingredientes: ingredientes,

          precio: precio

        };


        // ======================================
        // GUARDAR EN FIRESTORE
        // ======================================

        db.collection("platillos")
          .add(platilloNuevo)

          .then(function () {

            console.log(
              "Platillo agregado correctamente."
            );


            // Limpiar formulario

            document.getElementById(
              "title"
            ).value = "";


            document.getElementById(
              "ingredients"
            ).value = "";


            document.getElementById(
              "price"
            ).value = "";


            // Actualizar labels de Materialize

            M.updateTextFields();


            alert(
              "¡Platillo agregado correctamente!"
            );

          })

          .catch(function (error) {

            console.error(
              "Error al agregar platillo:",
              error
            );


            alert(
              "Error al agregar el platillo."
            );

          });

      }

    );

  }
);