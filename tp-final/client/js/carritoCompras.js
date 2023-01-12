let cardItems = document.querySelector("#cardItems");
let carrito;
function crearCardsItems() {
    let items = carrito;
    console.log(items)
    for (let i = 0; i < items.length; i++) {
        let divRow = document.createElement("div");
        divRow.classList.add("row");
        divRow.classList.add("align-items-center");
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
        divTotal.classList.add("col-2");
        let parrafoTotal = document.createElement("p");
        parrafoTotal.innerText = items[i].muro.precio * items[i].cantidad; // SACAR CANTIDAD DE OTRO LADO QUE NO SEA MURO(YA QUE CANTIDAD ES EL STOCK
        // NO ES LA CANTIDAD QUE ELIJE EL USUARIO)
        divImg.appendChild(img);
        divPrecio.appendChild(parrafoPrecio);
        divCantidad.appendChild(parrafoCantidad);
        divTotal.appendChild(parrafoTotal);

        divRow.appendChild(divImg);
        divRow.appendChild(divPrecio);
        divRow.appendChild(divCantidad);
        divRow.appendChild(divTotal);

        cardItems.appendChild(divRow);
    }



}
async function loadItems() {

    let respuesta = await fetch(`/carrito-compras/usuario/all/${window.sessionStorage.getItem("idUsuario")}`);
    if (respuesta.ok) {
        carrito = await respuesta.json()
        crearCardsItems();
    }

}


loadItems()
