let cardItems = document.querySelector("#cardItems");
let btnComprar = document.querySelector("#btnComprar");
let valorPrecioTotal = document.querySelector("#precioTotal");
let total = document.querySelector("#total");
//let btnsBorrar = [];
let precioTotal = 0;
let carrito, items;
function crearCardsItems() {

    items = carrito;
    console.log(items)
    for (let i = 0; i < items.length; i++) {
        let divRow = document.createElement("div");
        divRow.classList.add("row");
        divRow.classList.add("align-items-center");
        divRow.classList.add("items")
        // divRow.setAttribute("value", `${items[i].muro.idMuro}`);
        divRow.style.marginBottom = "5%";
        let divImg = document.createElement("div");
        divImg.classList.add("col-4");
        // divImg.classList.add("text-start");
        let img = document.createElement('img');
        img.setAttribute("src", items[i].muro.imagen);
        img.setAttribute("width", "200px");
        let divPrecio = document.createElement("div");
        divPrecio.classList.add("col-3");
        let parrafoPrecio = document.createElement("p");
        parrafoPrecio.innerText = items[i].muro.precio
        let divCantidad = document.createElement("div");
        divCantidad.classList.add("col-3");
        let parrafoCantidad = document.createElement("p");
        parrafoCantidad.innerText = items[i].cantidad
        let divTotal = document.createElement("div");
        divTotal.classList.add("col-1");
        let parrafoTotal = document.createElement("p");
        parrafoTotal.innerText = items[i].muro.precio * items[i].cantidad;
        let divBtn = document.createElement("div");
        divBtn.classList.add("col-1");
        divBtn.style.marginBottom = "1.5%";
        let btnBorrar = document.createElement("button");
        btnBorrar.style.backgroundColor = "white";
        btnBorrar.style.border = 0;
        btnBorrar.value = items[i].muroIdMuro;
        btnBorrar.classList.add(`btnBorrar`);
        let imagenTarro = document.createElement("i");
        imagenTarro.classList.add("bi");
        imagenTarro.classList.add("bi-trash3-fill");

       // let btnBorrarEspecifico = document.querySelector(`#btnBorrar${1}`)
        btnBorrar.appendChild(imagenTarro);
        //btnsBorrar.push(btnBorrarEspecifico);

        precioTotal += items[i].muro.precio * items[i].cantidad;

        divImg.appendChild(img);
        divPrecio.appendChild(parrafoPrecio);
        divCantidad.appendChild(parrafoCantidad);
        divTotal.appendChild(parrafoTotal);
        divBtn.appendChild(btnBorrar);

        divRow.appendChild(divImg);
        divRow.appendChild(divPrecio);
        divRow.appendChild(divCantidad);
        divRow.appendChild(divTotal);
        divRow.appendChild(divBtn);

        cardItems.appendChild(divRow);
    }
    borrarCarrito(".btnBorrar");

    valorPrecioTotal.innerText = `$ ${precioTotal}`;
    total.innerText = `$ ${precioTotal}`;
    precioTotal = 0;
}

async function borrarCarrito(clase) {
    let btns = document.querySelectorAll(clase);

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", async () => {
            let response = await fetch(`/carrito-compras/usuario/all/${window.sessionStorage.idUsuario}`);
            if (response.ok) {
                let carritosUsuario = await response.json();
                if (btns[i].value == carritosUsuario[i].muroIdMuro) {

                    let respuesta = await fetch(`/carrito-compras/${carritosUsuario[i].idCarritoDeCompras}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                    })
                    if (respuesta.ok) {
                        let divPadre = document.querySelector("#cardItems");
                        let items = document.querySelectorAll(".items");
                        for (let j = 0; j < items.length; j++) {
                            divPadre.removeChild(items[j]);
                        }
                        loadItems();
                        console.log("muro borrado");
                    }
                    else {
                        console.log("error en la respuesta");
                    }
                }
                else {
                    console.log("valores no coinciden");
                }
            }
            else {
                console.log("error en el response");
            }


        })
    }
}

async function realizarCompra() {
    let items = carrito;
    let idsMateriales = [];
    let idsMuros = [];
    let cantidadDescontada = false;
    let cantidadNegativa = false
    for (let i = 0; i < items.length; i++) {
        let muroRelaciones = await fetch(`/muro/relacion/id/${items[i].muroIdMuro}`)
        let json = await muroRelaciones.json();

        idsMuros.push(items[i].muroIdMuro)
        for (let j = 0; j < items.length; j++) {                // VER COMO HACER PARA VERIFICAR QUE LA CANTIDAD NO SEA MAYOR
            let muro = await fetch(`/muro/${items[j].muroIdMuro}`);        // AL STOCK EN TODOS LOS MUROS A LA VEZ ANTES DE HACER UN PUT
            let jsonMuro = await muro.json();
            let stock = jsonMuro.stock - items[i].cantidad;
            if (stock < 0) {
                cantidadNegativa = true;
            }
        }
        //     if (cantidad < 0) {                                     
        //     }


        if (cantidadNegativa) {
            swal.fire("La cantidad excede el stock disponible");
        }
        else {
            let stock = {
                "stock": items[i].muro.stock - items[i].cantidad,
            }

            let respuesta = await fetch(`/muro/stock/${items[i].muroIdMuro}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stock)
            })

            if (respuesta.ok) {
                idsMateriales = [];
                precioTotal += items[i].muro.precio * items[i].cantidad;
                cantidadDescontada = true;
                console.log("cantidad descontada");
            }
            else {
                console.log("Error para descontar cantidad");
            }
        }

    }
    if (cantidadDescontada) {
        crearFactura(precioTotal, idsMuros);
    }

}

async function crearFactura(precioTotal, idsMuros) {
    let factura = {
        "fecha": new Date(),
        "total": precioTotal,
        "usuarioIdUsuario": window.sessionStorage.idUsuario,
        "idsMuros": idsMuros
    }
    let response = await fetch("/factura", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(factura)
    })

    if (response.ok) {
        swal.fire("Articulos comprados");
        // valorPrecioTotal.innerText = `$ 0`;
        // total.innerText = `$ 0`;
        let carritoBorrado = await borrarTodoCarrito();
        if (carritoBorrado) {
            loadItems();
        }
    }
    else {
        swal.fire("Error en la creacion de factura");
    }
}
async function borrarTodoCarrito() {

    for (let i = 0; i < carrito.length; i++) {
        let respuesta = await fetch(`/carrito-compras/${carrito[i].idCarritoDeCompras}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        if (respuesta.ok) {
            let divPadre = document.querySelector("#cardItems");
            let items = document.querySelectorAll(".items");
            for (let j = 0; j < items.length; j++) {
                divPadre.removeChild(items[j]);
            }

        }
    }
    precioTotal = 0;
    return true

}
// async function crearDetalleFactura(cantidad,idMuro,idFactura) {
//     let detalle = {
//         "cantidad": cantidad,
//         "muroIdMuro": idMuro,
//         "facturaIdFactura": idFactura
//     }
//     console.log(detalle)
//     let respuesta = await fetch("/detallefactura", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(detalle)
//     })
//     if(respuesta.ok) {
//         console.log("detalle creado");
//     }
//     else {
//         console.log("Error detalle");
//     }

// }

async function loadItems() {
    carrito = [];
    let respuesta = await fetch(`/carrito-compras/usuario/all/${Number(window.sessionStorage.getItem("idUsuario"))}`);
    if (respuesta.ok) {
        carrito = await respuesta.json()
        crearCardsItems();
    }

}

loadItems();
btnComprar.addEventListener("click", realizarCompra);
