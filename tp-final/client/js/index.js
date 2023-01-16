
function ocultar () {
    if(window.sessionStorage.getItem("loginOk") == "true") {
        let oculto = document.querySelectorAll(".login");
        let perfil = document.querySelector("#perfil");

        for(let i = 0; i < oculto.length; i++) {
            oculto[i].style.display = "none";
        }

        perfil.firstElementChild.innerText = window.sessionStorage.nombre;
        perfil.style.display = "";
    }
}
ocultar();
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

