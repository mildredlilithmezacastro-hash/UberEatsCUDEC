document.addEventListener("DOMContentLoaded", () => {

    // Menú lateral
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, { edge: "right" });

    const lista = document.getElementById("listaPlatillos");

    // Cargar platillos desde Firestore
    db.collection("platillos").onSnapshot((datos) => {

        lista.innerHTML = "";

        datos.forEach((doc) => {

            const platillo = doc.data();

            lista.innerHTML += `
                <option value="${doc.id}">
                    ${platillo.nombre}
                </option>
            `;

        });

        M.FormSelect.init(document.querySelectorAll("select"));
        
    });

   
    const formulario = document.getElementById("form-pedido");

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        db.collection("pedidos").add({

            platillo: document.getElementById("platillo").value,
            direccion: document.getElementById("direccion").value,
            idPlatillo: document.getElementById("listaPlatillos").value

        })
        .then(() => {

            alert("Pedido guardado correctamente.");
            formulario.reset();

        })
        .catch((error) => {

            console.error(error);
            alert("Error al guardar el pedido.");

        });

    });

});

document.getElementById("btnUbicacion").addEventListener("click",function() {
            if (navigator.geoLocation){
                navigator.geoLocation.getCurrentPosition(exito,error);
            }
        });
        function exito(posicion) {
            alert(posicion.coords.latitude + "," + posicion.coords.longitude);
        }
         function error() {
            alert("no se pudo obtener ubicacion" );
        }