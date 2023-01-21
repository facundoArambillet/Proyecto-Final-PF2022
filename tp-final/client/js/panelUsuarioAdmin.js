let panel = document.querySelector("#panelContenido");
let body = document.querySelector("body");
let crearMuro = document.querySelector("#crearMuro");
let crearMaterial = document.querySelector("#crearMaterial");
let script;

function eliminarContenido() {
    panel.innerHTML = "";
    // if(body.childElementCount == 7) { // ENCUENTRO EL SCRIPT PARA ELIMINARLO
    //     body.removeChild(body.children[6]);
    // }

}
function crearScript() {
    let script = document.createElement("script");
    script.id = "script";
    body.appendChild(script);
}
crearMuro.addEventListener("click", () => {
    eliminarContenido();
    // crearScript();
    // script = document.querySelector("#script");
    // script.src = "./js/imagenAdmin.js";

})

crearMaterial.addEventListener("click", () => {
    eliminarContenido();
    // crearScript();
    // script = document.querySelector("#script");
    // script.src = "./js/crearMaterial.js";

})
