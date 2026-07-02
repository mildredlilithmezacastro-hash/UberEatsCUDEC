document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
});

let contenidoLista = '';

db.collection("platillos").onSnapshot((datos) => {
    datos.docChanges().forEach((registro) => {
        if (registro.type === "added") {
            agregarALista(registro.doc.data(), registro.doc.id);
        }
    });
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

function agregarALista(platillo,id){
    contenidoLista += `<option value=' ${id}'>
    ${platillo.nombre}
    </Option>`;
    document.getElementById("listaPlatillos").innerHTML = contenidoLista;
}

M.AutoInit();

const formulario = document.getElementById("form-pedido");

formulario.addEventListener("submit", function(e) {
    e.preventDefault();
     const platillo = document.getElementById("platillo").value;
     const direccion = document.getElementById("direccion").value;
     const idPlatillo = document.getElementById("listaPlatillos").value;


    db.collection("pedidos").add({
        platillo: platillo,
        direccion: direccion,
        idPlatillo: idPlatillo
    })
    .then(() => {
        alert("Pedido guardado correctamente");
        document.querySelector("form").reset();
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("No se pudo guardar el pedido");
    });
});