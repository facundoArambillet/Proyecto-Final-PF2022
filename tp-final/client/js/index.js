

function ocultar () {
    if(window.sessionStorage.getItem("loginOk") == "true") {
        let oculto = document.querySelectorAll(".login");
        // let perfil = document.querySelector("#perfil");

        for(let i = 0; i < oculto.length; i++) {
            oculto[i].style.display = "none";
        }

        crearUserMenu();
    }
}
ocultar();
function crearUserMenu () {
    let liContainer = document.querySelector("#perfil");

    let divUser = document.createElement("div");
    divUser.classList.add("dropdown-container");
    divUser.classList.add("text-white");

    let spanUser = document.createElement("span");
    spanUser.innerText =  window.sessionStorage.nombre;

    let ulUser = document.createElement("ul");
    ulUser.style.backgroundColor = "grey";
    ulUser.style.width = "209px";

    let liUser = document.createElement("li");
    let anchorUser = document.createElement("a");
    if(window.sessionStorage.idRol == "2") {

        let divRow = document.createElement("div");
        divRow.classList.add("row");
        let divColImg = document.createElement("div");
        divColImg.classList.add("col-2");
        let divColText = document.createElement("div");
        divColText.classList.add("col-10");

        let parrafoPanel = document.createElement("p");
        let imgPanel = document.createElement("i");

        imgPanel.classList.add("bi");
        imgPanel.classList.add("bi-bricks");
        parrafoPanel.innerText = "Mis Muros";
        divColImg.appendChild(imgPanel);
        divColText.appendChild(parrafoPanel);
        divRow.appendChild(divColImg);
        divRow.appendChild(divColText);
        anchorUser.appendChild(divRow);
        anchorUser.setAttribute("href","./panelUsuario.html");
    }
    else {
        let divRow = document.createElement("div");
        divRow.classList.add("row");
        let divColImg = document.createElement("div");
        divColImg.classList.add("col-2");
        let divColText = document.createElement("div");
        divColText.classList.add("col-10");

        let parrafoPanel = document.createElement("p");
        let imgPanel = document.createElement("i");

        imgPanel.classList.add("bi");
        imgPanel.classList.add("bi-clipboard-data");
        parrafoPanel.innerText = "Panel Administrador";
        divColImg.appendChild(imgPanel);
        divColText.appendChild(parrafoPanel);
        divRow.appendChild(divColImg);
        divRow.appendChild(divColText);
        anchorUser.appendChild(divRow);
        anchorUser.setAttribute("href","./panelUsuarioAdmin.html");
    }

    anchorUser.classList.add("text-white");

    let liSesion = document.createElement("li");
    let anchorSesion = document.createElement("a");
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    let divColImg = document.createElement("div");
    divColImg.classList.add("col-2");
    let divColText = document.createElement("div");
    divColText.classList.add("col-10");

    let parrafoSesion = document.createElement("p");
    let imgExit = document.createElement("i");
    imgExit.classList.add("bi");
    imgExit.classList.add("bi-box-arrow-right");
    parrafoSesion.innerText = "Cerrar Sesion";
    divColImg.appendChild(imgExit);
    divColText.appendChild(parrafoSesion);
    divRow.appendChild(divColImg);
    divRow.appendChild(divColText);
    anchorSesion.appendChild(divRow);
    anchorSesion.setAttribute("href","#");
    anchorSesion.classList.add("text-white");

    liUser.appendChild(anchorUser);
    liSesion.appendChild(anchorSesion);

    ulUser.appendChild(liUser);
    ulUser.appendChild(liSesion);

    divUser.appendChild(spanUser);
    divUser.appendChild(ulUser);

    liContainer.appendChild(divUser);
    liContainer.style.display = "";

    divUser.addEventListener("click", () => {
        let show = document.querySelector(".dropdown-container ul");
        show.classList.toggle("show");
    })

    cerrarSesion(anchorSesion);
}

function cerrarSesion(anchor) {

    anchor.addEventListener("click", () => {
        window.sessionStorage.clear();
        window.location = "./index.html";
    })
}

document.querySelector("#vistaAvanzada").addEventListener("click", async () => {
   // console.log(window.sessionStorage.getItem("loginOk"))
    if(window.sessionStorage.getItem("loginOk") == 'true') {
        window.location = "./vistaAvanzada.html";
    }
    else {
        document.querySelector("#vistaAvanzada").setAttribute("href","#");  //TENGO QUE HACER ESTO PARA FRENAR EL HREF QUE TE LLEVA AL HTML vistaAvanzada
        let alerta = await swal("Para acceder primero debe loguearse","","error");

        if(alerta) {
            window.location = "./logueo.html"
            // document.querySelector("#vistaAvanzada").setAttribute("href","./logueo.html");
        }
    }
})
document.querySelector("#carritoDeCompras").addEventListener("click", async () => {
    if(window.sessionStorage.getItem("loginOk") == "true") {
        window.location = "./carritoCompras.html";
    }
    else {
        document.querySelector("#carritoDeCompras").setAttribute("href","#"); //TENGO QUE HACER ESTO PARA FRENAR EL HREF QUE TE LLEVA AL HTML carritoCompras
        let alerta = await swal("Para acceder primero debe loguearse","","error");

        if(alerta) {
            window.location = "./logueo.html"
            // document.querySelector("#vistaAvanzada").setAttribute("href","./logueo.html");
        }

    }
})

