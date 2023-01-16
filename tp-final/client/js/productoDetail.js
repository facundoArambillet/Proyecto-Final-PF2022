
let params = [];
let btnAgregar = document.querySelector("#btnCarritoAgregar");
let muro, item;
let carrito = [];

function processParams() {
    let paramstr = window.location.search.substr(1);
    let paramarr = paramstr.split("&");
    for (let i = 0; i < paramarr.length; i++) {
        let tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }

}
processParams();

function loadDataMuro() {
    let titulo = document.querySelector("#nombreMuro");
    let descripcion = document.querySelector("#descripcionMuro");
    let precio = document.querySelector("#precioMuro");
    let stock = document.querySelector("#stock");
    let imagen = document.querySelector("#imagen");

    titulo.innerHTML = muro.nombre;
    descripcion.innerHTML = muro.descripcion;
    precio.innerHTML = `$ ${muro.precio} c/u`;
    stock.innerHTML = `Stock: ${muro.stock}`;
    imagen.setAttribute("src", muro.imagen);
}

btnAgregar.addEventListener("click", async () => {
    if(window.sessionStorage.token) {
        let carrito = {
            "precioTotal": muro.precio,
            "cantidad": 1,
            "usuarioIdUsuario": window.sessionStorage.idUsuario,
            "muroIdMuro":  params.idMuro
        }
        let respuesta = await fetch("/carrito-compras", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carrito)
        })
        if(respuesta.ok) {
            swal.fire("Muro agregado al carrito");
        }
    }
    else {
        let alerta =  await swal.fire("Primero debe loguearse");
        if(alerta) {
            window.location.href = './logueo.html';
        }

    }


})


async function loadMuros() {
    muro = [];
    let respuesta = await fetch(`/muro/relacion/id/${params.idMuro}`)

    if (respuesta.ok) {
        let json = await respuesta.json();
        muro = json;
    }
    loadDataMuro();
}
loadMuros();