let cardItems = document.querySelector("#cardItems");
let carrito;
let btnsBorrar = [];
function crearCardsItems() {
    let precioTotal = 0;
    let items = carrito;
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

        let t = document.querySelector(`#btnBorrar${1}`)
        btnBorrar.appendChild(imagenTarro);
        btnsBorrar.push(t);

        precioTotal += items[i].muro.precio * items[i].cantidad;
        console.log(precioTotal)

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
    let valorPrecioTotal = document.querySelector("#precioTotal");
    valorPrecioTotal.innerText = `$ ${precioTotal}`;
}
async function borrarCarrito(clase) {
    carrito = [];
    let btns = document.querySelectorAll(clase);

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", async () => {
            let response = await fetch(`/carrito-compras/usuario/all/${window.sessionStorage.idUsuario}`);
            if (response.ok) {
                let carritosUsuario = await response.json();
                console.log(btns[i].value)
                if (btns[i].value == carritosUsuario[i].muroIdMuro) {

                    let respuesta = await fetch(`/carrito-compras/${carritosUsuario[i].idCarritoDeCompras}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                    })
                    if (respuesta.ok) {
                        let divPadre = document.querySelector("#cardItems");
                        let items = document.querySelectorAll(".items");
                        for(let j = 0; j < items.length; j++) {
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

async function loadItems() {
    carrito = [];
    let respuesta = await fetch(`/carrito-compras/usuario/all/${window.sessionStorage.getItem("idUsuario")}`);
    if (respuesta.ok) {
        carrito = await respuesta.json()
        crearCardsItems();
    }

}


loadItems();
