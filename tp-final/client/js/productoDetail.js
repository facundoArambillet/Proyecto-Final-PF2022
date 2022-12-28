let params = [];
let muro;

function processParams() {
    let paramstr = window.location.search.substr(1);
    let paramarr = paramstr.split("&");
    for (let i = 0; i < paramarr.length; i++) {
        let tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    
}
processParams();

function loadDateMuro() {
    let titulo = document.querySelector("#nombreMuro");
    let descripcion = document.querySelector("#descripcionMuro");
    let precio = document.querySelector("#precioMuro");
    let imagen = document.querySelector("#imagen");

    titulo.innerHTML = muro.nombre;
    descripcion.innerHTML = muro.descripcion;
    precio.innerHTML =`$ ${muro.precio} c/u`;
    imagen.setAttribute("src",muro.imagen);
}

async function loadMuros() {
    muro = [];
    let respuesta = await fetch(`/muro/relacion/id/${params.idMuro}`)
    console.log(respuesta)
    if (respuesta.ok) {
        console.log("Entro")
        let json = await respuesta.json();
        muro = json;
    }
    loadDateMuro();
}
loadMuros();