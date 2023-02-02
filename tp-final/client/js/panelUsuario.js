
let murosUsuario = [];
let materiales = [];
let cardItems = document.querySelector("#murosUsuario");
let total = document.querySelector("#total");
let precioTotal = 0;
let carrito, items;

function crearCardsItems() {
    items = murosUsuario;
    if (items.length == 0) {
        let divContenido = document.createElement("div");
        divContenido.classList.add("row");
        divContenido.classList.add("text-center");
        let divCol = document.createElement("div");
        divCol.classList.add("col");

        let h1 = document.createElement("h1");
        h1.innerText = "No posee muros generados";

        cardItems.innerHTML = '';
        divCol.appendChild(h1);
        divContenido.appendChild(divCol);
        cardItems.appendChild(divContenido);
    }
    else {
        for (let i = 0; i < items.length; i++) {
            let divRow = document.createElement("div");
            divRow.classList.add("row");
            divRow.classList.add("align-items-center");
            divRow.classList.add("text-center");
            divRow.classList.add("items");

            let divMateriales = document.createElement("div");
            divMateriales.classList.add("col-2");
            for (let j = 0; j < materiales[i].length; j++) {
                let parrafoMaterial = document.createElement('p');
                parrafoMaterial.innerText = `${materiales[i][j].nombre}`;
                divMateriales.appendChild(parrafoMaterial);
            }


            // img.setAttribute("src", items[i].imagen);
            // img.setAttribute("width", "250px");

            let divPrecio = document.createElement("div");
            divPrecio.classList.add("col-2");
            let parrafoPrecio = document.createElement("p");
            parrafoPrecio.innerText = items[i].precio

            let divCantidad = document.createElement("div");
            divCantidad.classList.add("col-2");
            let inputCantidad = document.createElement("input");
            inputCantidad.value = items[i].stock;
            inputCantidad.classList.add("cantidades");
            inputCantidad.setAttribute("type", "number");
            inputCantidad.id = `cantidad_${items[i].idMuro}`;

            let divCoeficiente = document.createElement("div");
            divCoeficiente.classList.add("col-2");
            let parrafoCoeficiente = document.createElement("p");
            parrafoCoeficiente.innerText = items[i].coeficienteDeTransmitancia.substr(0, 4);

            let divTotal = document.createElement("div");
            divTotal.classList.add("col-1");
            let parrafoTotal = document.createElement("p")
            parrafoTotal.classList.add("precios");

            let divBtnBorrar = document.createElement("div");
            divBtnBorrar.classList.add("col-1");
            divBtnBorrar.classList.add("divsPanelUsuario");
            let btnBorrar = document.createElement("button");
            btnBorrar.value = items[i].idMuro;
            btnBorrar.classList.add(`btnBorrar`);

            let divBtnCarrito = document.createElement("div");
            divBtnCarrito.classList.add("col-2");
            divBtnCarrito.classList.add("divsPanelUsuario");
            let btnCarrito = document.createElement("button");
            btnCarrito.classList.add("btn");
            btnCarrito.classList.add("btn-outline-dark");
            btnCarrito.classList.add("btn-sm");
            btnCarrito.classList.add("px-1");
            btnCarrito.classList.add("btnAgregar");
            btnCarrito.value = items[i].idMuro;
            btnCarrito.innerText = "Agregar al carrito";

            let imagenTarro = document.createElement("i");
            imagenTarro.classList.add("bi");
            imagenTarro.classList.add("bi-trash3-fill");

            btnBorrar.appendChild(imagenTarro);

            precioTotal += items[i].precio * items[i].stock;

            parrafoTotal.innerText = precioTotal;

            //divImg.appendChild(img);
            divPrecio.appendChild(parrafoPrecio);
            divCantidad.appendChild(inputCantidad);
            divCoeficiente.appendChild(parrafoCoeficiente);
            divTotal.appendChild(parrafoTotal);
            divBtnBorrar.appendChild(btnBorrar);
            divBtnCarrito.appendChild(btnCarrito);

            divRow.appendChild(divMateriales);
            divRow.appendChild(divPrecio);
            divRow.appendChild(divCantidad);
            divRow.appendChild(divCoeficiente);
            divRow.appendChild(divTotal);
            divRow.appendChild(divBtnBorrar);
            divRow.appendChild(divBtnCarrito);

            cardItems.appendChild(divRow);
            precioTotal = 0;
        }
        borrarMuro(".btnBorrar");
        agregarCarrito(".btnAgregar");
        actualizarValores(".cantidades", precioTotal);
        precioTotal = 0;
    }

}


async function borrarMuro(clase) {
    let btns = document.querySelectorAll(clase);

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", async () => {
            swal({
                title: "Estas seguro que desea eliminar este muro?",
                text: "Una vez eliminado, no podra recuperarse",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (willDelete) => { //EL DE ACA ASYNC ES PARA EL AWAIT DE LA RESPUESTA DEL DELETE
                    if (willDelete) {

                        // METO LA FUNCIONALIDAD DENTRO DEL ALERT PARA QUE NO SE DISPARE EL BORRADO SI EL USUARIO SE ARREPIENTE
                        if (btns[i].value == murosUsuario[i].idMuro) {
                            let respuesta = await fetch(`/muro/${murosUsuario[i].idMuro}`, {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                            })


                            if (respuesta.ok) {
                                let divPadre = document.querySelector("#murosUsuario");
                                let items = document.querySelectorAll(".items");
                                for (let j = 0; j < items.length; j++) {
                                    divPadre.removeChild(items[j]);
                                }
                                swal("Muro borrado con exito!", {
                                    icon: "success",
                                });
                                loadMuros();
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
                });

        })

    }

}
async function agregarCarrito(clase) {
    let btnsAgregar = document.querySelectorAll(clase);

    for (let i = 0; i < btnsAgregar.length; i++) {
        btnsAgregar[i].addEventListener("click", async () => {
            let inputCantidad = document.querySelector(`#cantidad_${btnsAgregar[i].value}`)
            let nuevaCantidad = {
                "stock": Number(inputCantidad.value)
            }
            console.log(inputCantidad)
            console.log(nuevaCantidad)
            console.log(Number(btnsAgregar[i].value))
            let response = await fetch(`muro/stock/${Number(btnsAgregar[i].value)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaCantidad)
            })
            if (response.ok) {
                let carrito = {
                    "precioTotal": murosUsuario[i].precio,
                    "cantidad": nuevaCantidad.stock,
                    "usuarioIdUsuario": window.sessionStorage.idUsuario,
                    "muroIdMuro": btnsAgregar[i].value
                }
                console.log(carrito)
                let respuesta = await fetch("/carrito-compras", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(carrito)
                })
                if (respuesta.ok) {
                    swal("Muro agregado al carrito", "", "success");
                }

            }

        })
    }

}

function actualizarValores(clase) {
    let inputs = document.querySelectorAll(clase);
    let precios = document.querySelectorAll(".precios");
    precioTotal = 0;
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("change", () => {
            if (inputs[i].value <= 0) {
                inputs[i].value = 1;
            }
            precios[i].innerText = murosUsuario[i].precio * inputs[i].value;

            for (let k = 0; k < precios.length; k++) {
                precioTotal += Number(precios[k].innerText);
            }
            precioTotal = 0;
        })
    }
}



async function loadMuros() {
    murosUsuario = [];
    let respuesta = await fetch(`/usuario/all/id/${window.sessionStorage.idUsuario}`)
    if (respuesta.ok) {
        let json = await respuesta.json();
        murosUsuario = json.muros;
    }
    let cargaMateriales = await loadMateriales();
    if (cargaMateriales) {
        crearCardsItems();
    }

}
async function loadMateriales() {
    materiales = [];
    for (let i = 0; i < murosUsuario.length; i++) {
        let response = await fetch(`/muro/relacion/id/${murosUsuario[i].idMuro}`);
        if (response.ok) {
            let json = await response.json();
            materiales.push(json.materiales);
        }
    }
    return true;
}
loadMuros();
