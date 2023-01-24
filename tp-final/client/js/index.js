


function ocultar() {
    if (window.sessionStorage.getItem("loginOk") == "true") {
        let oculto = document.querySelectorAll(".login");
        // let perfil = document.querySelector("#perfil");

        for (let i = 0; i < oculto.length; i++) {
            oculto[i].style.display = "none";
        }
        let btnSesion = document.querySelector('.btn-iniciar-sesion');
        btnSesion.setAttribute("href","#")
        let userMenu = document.querySelector('.dd_menu');
        usuarioMenu(btnSesion,userMenu);
    }
}
ocultar();

function usuarioMenu(btnSesion,userMenu) {
    let nombre = document.querySelector('#email-perfil') 
    let panelUsuario = document.querySelector("#panelUsuario");
    let btnCerrarSesion = document.querySelector("#btn_cerrar_sesion");
    btnSesion.addEventListener('click', function () {
        nombre.innerHTML = window.sessionStorage.getItem('nombre');
        if(window.sessionStorage.idRol == "2") {
            panelUsuario.innerHTML = "Mis Muros";
            panelUsuario.addEventListener("click", () => {
                window.location = "./panelUsuario.html";
            })
        }
        else {
            panelUsuario.innerHTML = "Panel Administrador";
            panelUsuario.addEventListener("click", () => {
                window.location = "./panelUsuarioAdmin.html";
            })
        }
        userMenu.classList.toggle('activo');

    });
    cerrarSesion(btnCerrarSesion);

}

function cerrarSesion(btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
        window.sessionStorage.clear();
        window.location = "./index.html";
    })
}

let vistaAvanzada = document.querySelectorAll(".vistaAvanzada");
for (let i = 0; i < vistaAvanzada.length; i++) {
    vistaAvanzada[i].addEventListener("click", function () {
        bloquear("./vistaAvanzada.html", "./logueo.html");
    });
}

let carritoVentana = document.querySelectorAll(".carritoDeCompras");
for (let index = 0; index < carritoVentana.length; index++) {
    carritoVentana[index].addEventListener("click", function () {
        bloquear("./carritoCompras.html", "./logueo.html");
    });
}

async function bloquear(locationOK, locationError) {
    if (window.sessionStorage.getItem("loginOk") == "true") {
        window.location = locationOK;
    }
    else {
        let alerta = await swal("Para acceder primero debe loguearse", "", "error");

        if (alerta) {
            window.location = locationError;
        }

    }
}



