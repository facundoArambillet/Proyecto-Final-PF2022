'use strict';

let panel = document.querySelector("#panelContenido");
let body = document.querySelector("body");
let crearMuro = document.querySelector("#crearMuro");
let crearMaterial = document.querySelector("#crearMaterial");
let actualizarEliminarMuro = document.querySelector("#actualizarEliminarMuro");
let actualizarEliminarMaterial = document.querySelector("#actualizarEliminarMaterial");
// let script;

function eliminarContenido() {
    panel.innerHTML = "";

}
// function crearScript() {
//     let script = document.createElement("script");
//     script.id = "script";
//     body.appendChild(script);
// }

crearMuro.addEventListener("click",eliminarContenido);
crearMaterial.addEventListener("click", eliminarContenido);
actualizarEliminarMuro.addEventListener("click",eliminarContenido);
actualizarEliminarMaterial.addEventListener("click",eliminarContenido);