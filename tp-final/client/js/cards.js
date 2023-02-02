
let cards = document.querySelector("#cards");
let sliderMuro = document.querySelector("#sliderMuro");
let muros = [];
let arrayImgs = ["https://www.shutterstock.com/image-vector/red-brick-tile-wall-background-600w-1429103369.jpg","https://www.shutterstock.com/image-photo/red-brick-wall-texture-background-600w-719331211.jpg",
"https://img.freepik.com/fotos-premium/muro-hormigon-blanco-textura-fondo_33720-905.jpg?w=1380","https://images.pexels.com/photos/2378959/pexels-photo-2378959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
"https://www.aparicio-partner.com/wp-content/uploads/2017/05/foto_sassi_rocce_02-1024x675.jpg","https://img.freepik.com/fotos-premium/muro-ciudad-madera_23-2148106996.jpg?w=900"];

function crearCards() {
    if(muros) {
        //console.log(muros.length)
        for(let i = 0; i < muros.length; i++) {
          //  console.log(muros)
            let divCol = document.createElement("div");
            divCol.classList.add("col-md-4");
            let divCard = document.createElement("div");
            divCard.classList.add("card");
            divCard.setAttribute("width", "18rem;");
            let imagen = document.createElement("img");
            imagen.setAttribute("src",muros[i].imagen);
             imagen.style.height = "250px"
            
            imagen.classList.add("card-img-top");
            divCard.appendChild(imagen);
            let divBody = document.createElement("div");
            divBody.classList.add("card-body")
            let titulo = document.createElement("h5");
            titulo.classList.add("card-title");
            titulo.innerHTML = muros[i].nombre;
            divBody.appendChild(titulo);
            let parrafo = document.createElement("p");
            parrafo.classList.add("card-text");
            parrafo.innerHTML = "Some quick example text to build on the card title and make up the bulk of the cards content.";
            divBody.appendChild(parrafo);
            let boton = document.createElement("a");
            boton.setAttribute("href",`./productos.html?idMuro=${muros[i].idMuro}`);
            boton.setAttribute("value",muros[i].idMuro);
            boton.classList.add("btn","btn-dark");
            boton.innerHTML = "Ver Mas";
            divBody.appendChild(boton);
            divCard.appendChild(divBody);
            divCol.appendChild(divCard);
            cards.appendChild(divCol);
        }
    }


}

async function loadMuros(){
    let respuesta = await fetch(`/muro/all/${1}`);
    if(respuesta.ok) {
        let json = await respuesta.json();
        muros = json;
    }
    crearCards();

}
loadMuros();
