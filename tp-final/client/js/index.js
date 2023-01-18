

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

    let liMuros = document.createElement("li");
    let anchorMuros = document.createElement("a")
    anchorMuros.innerHTML = "Mis Muros";
    anchorMuros.setAttribute("href","./misMuros.html")
    anchorMuros.classList.add("text-white")

    let liSesion = document.createElement("li");
    let anchorSesion = document.createElement("a")
    anchorSesion.innerText = "Cerrar Sesion";
    anchorSesion.setAttribute("href","#")
    anchorSesion.classList.add("text-white")

    liMuros.appendChild(anchorMuros);
    liSesion.appendChild(anchorSesion);

    ulUser.appendChild(liMuros);
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
        let alerta = await swal.fire("Para acceder primero debe loguearse");

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
        let alerta = await swal.fire("Para acceder primero debe loguearse");

        if(alerta) {
            window.location = "./logueo.html"
            // document.querySelector("#vistaAvanzada").setAttribute("href","./logueo.html");
        }

    }
})

