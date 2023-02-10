"use strict";
async function redireccionar() { //FUNCION PARA QUE NO PUEDAN VER LOS CONTENIDOS SIN AUTORIZACION METIENDOSE EN LA URL
    if (!window.sessionStorage.getItem("loginOk")) {
        window.location = "./logueo.html";
    }
}

redireccionar();