"use strict";

async function redireccionar() {
    if (!window.sessionStorage.getItem("loginOk")) {
        window.location = "./logueo.html";
    }
}

redireccionar();