let detalles = [];
let muros = [];
let btn = document.querySelector("#btn");
let tabla = "";
let total = 0;

function loadProductos() {
    console.log(muros)
    console.log(detalles)
    for (let i = 0; i < muros.length; i++) {
        let precioUnitario = muros[i].precio;
        let totalProducto = precioUnitario * detalles[i].cantidad
        total += totalProducto;
        tabla += `<tr>
        <td>${muros[i].nombre}</td>
        <td>${detalles[i].cantidad}</td>
        <td>$ ${precioUnitario}</td>
        <td>$ ${totalProducto}</td>
        </tr>`
    }
    let tablaProductos = document.querySelector("#productos");
    let subtotal = document.querySelector("#subtotal");
    let descuento = document.querySelector("#descuento");
    let subtotalDescuento = document.querySelector("#subtotalDescuento");
    let iva = document.querySelector("#iva");
    let valorIva = total * 0.21;
    let tablaTotal = document.querySelector("#total");

    subtotal.innerText = `$ ${total}`;
    descuento.innerText = "$ 0";
    subtotalDescuento.innerText = "$ 0";
    iva.innerText = `$ ${valorIva}`;
    tablaTotal.innerText = `$ ${total + valorIva}`;
    tablaProductos.innerHTML = tabla;
}

function loadNombreCliente() {
    let nombre = document.querySelector("#nombreCliente");
    nombre.innerHTML = window.sessionStorage.nombre;
}

async function loadDetalle() {
    detalles = [];
    muros = [];
    // CON IDUSUARIO(SESSION STORAGE) TRAER LAS FACTURAS Y CON ESO AGARRAR LA ULTIMA(USUARIO.FACTURAS[FACTURAS.LENGTH - 1]);
    let respuestaUsuario = await fetch(`/usuario/all/id/${window.sessionStorage.idUsuario}`);
    if (respuestaUsuario) {
        let json = await respuestaUsuario.json();
        let ultimaFactura = json.facturas[json.facturas.length - 1];
        let fechaFactura = document.querySelector("#fecha");
        let nroFactura = document.querySelector("#nroFactura");
        fechaFactura.innerHTML = ultimaFactura.fecha.substring(0, 10);  //ACORTO EL STRING QUE ME DEVUELVE "FECHA" PARA QUE SE VEA MEJOR EN LA FACTURA 
        nroFactura.innerHTML = ultimaFactura.idFactura;
        console.log(json)
        let respuesta = await fetch(`/detalle-factura/${ultimaFactura.idFactura}`);
        if (respuesta.ok) {
            detalles = await respuesta.json();

            for (let i = 0; i < detalles.length; i++) {
                let response = await fetch(`/muro/relacion/id/${detalles[i].muroIdMuro}`);
                if (response.ok) {
                    let muro = await response.json();
                    muros.push(muro);
                }
            }

        }
    }


    loadProductos();
    loadNombreCliente();
    window.print();
}

loadDetalle();

btn.addEventListener("click", () => {
    window.location = "/index.html";
})

