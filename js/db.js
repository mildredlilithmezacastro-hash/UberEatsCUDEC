db.collection("platillos").onSnapshot((datos) => {
   datos.docChanges().forEach((registro) => {
      if (registro.type === "added"){
         mostrarPlatillo(registro.doc.data(),registro.doc.id);
      }
      if (registro.type === "modified"){
         actualizarPlatillo(registro.doc.data(), registro.doc.id);
      }
   });
});

const formularioAgregar = document.querySelector("form");
formularioAgregar.addEventListener("submit", (e) =>{
   e.preventDefault();
   const platilloNuevo = {
      nombre: formularioAgregar.title.value,
      ingredientes: formularioAgregar.ingredientes.value,
      precio: formularioAgregar.precio.value
   }
   db.collection("platillos").add(platilloNuevo)
   .catch((error) =>{
      console.log(error);
      alert("error al agregar platillo");
   }
   );
   formularioAgregar.title.value= "";
   formularioAgregar.ingredients.value ="";
   formularioAgregar.price.value ="";
   alert("platillos agregado");

});