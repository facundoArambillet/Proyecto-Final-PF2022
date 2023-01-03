function ocultar () {
    if(window.sessionStorage.getItem("loginOk") == "true") {
        let oculto = document.querySelectorAll(".login");
        for(let i = 0; i < oculto.length; i++) {
            oculto[i].style.display = "none";
        }
    }
}
ocultar();
document.querySelector("#vistaAvanzada").addEventListener("click", () => {
    console.log(window.sessionStorage.getItem("loginOk"))
    if(window.sessionStorage.getItem("loginOk") == 'true') {
        window.location = "./vistaAvanzada.html";
    }
    else {
        alert("Para acceder primero debe loguearse");
        //swal.fire("Para acceder primero debe loguearse");
        document.querySelector("#vistaAvanzada").setAttribute("href","./logueo.html");
    }
})
document.querySelector("#carritoDeCompras").addEventListener("click", () => {
    if(window.sessionStorage.getItem("loginOk") == "true") {
        window.location = "./carritoCompras.html";
    }
    else {
        alert("Para acceder primero debe loguearse");
        //swal.fire("Para acceder primero debe loguearse");
        document.querySelector("#carritoDeCompras").setAttribute("href","./logueo.html");
    }
})

