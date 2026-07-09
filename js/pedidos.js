document.addEventListener("DOMContentLoaded", () => {

    
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, { edge: "right" });

    const lista = document.getElementById("listaPlatillos");

    
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

        const select = document.getElementById("listaPlatillos");

        db.collection("pedidos").add({

            cliente: document.getElementById("cliente").value,
            direccion: document.getElementById("direccion").value,
            idPlatillo: select.value,
            platillo: select.options[select.selectedIndex].text

        })
        .then(() => {

            alert("Pedido guardado correctamente.");
            formulario.reset();

            
            M.FormSelect.init(document.querySelectorAll("select"));

        })
        .catch((error) => {

            console.error(error);
            alert("Error al guardar el pedido.");

        });

    });

   
    document.getElementById("btnUbicacion").addEventListener("click", function () {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(exito, error);

        } else {

            alert("Tu navegador no soporta geolocalización.");

        }

    });

});


function exito(posicion) {

    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`)
        .then(response => response.json())
        .then(data => {

            document.getElementById("direccion").value = data.display_name;

            
            M.updateTextFields();

        })
        .catch(err => {

            console.error(err);
            alert("No se pudo obtener la dirección.");

        });

}


function error(err) {

    console.error(err);

    alert("No fue posible obtener la ubicación.");

}