let panelContenido = document.querySelector("#panelContenido");
let btnGenerarMaterial = document.createElement("button");
let crearMaterialUsuario = document.querySelector("#crearMaterial");


function crearCardMaterial() {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    divRow.classList.add("text-center");

    let divNombre = document.createElement("div");
    divNombre.classList.add("col-2");
    let parrafoNombre = document.createElement("p");
    parrafoNombre.innerText = "Nombre";
    let inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.style.width = "100px";

    divNombre.appendChild(parrafoNombre);
    divNombre.appendChild(inputNombre);

    let divCantidad = document.createElement("div");
    divCantidad.classList.add("col-2");
    let parrafoCantidad = document.createElement("p");
    parrafoCantidad.innerText = "Cantidad";
    let inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.style.width = "100px";

    divCantidad.appendChild(parrafoCantidad);
    divCantidad.appendChild(inputCantidad);


    let divPrecio = document.createElement("div");
    divPrecio.classList.add("col-2");
    let parrafoPrecio = document.createElement("p");
    parrafoPrecio.innerText = "Precio";
    let inputPrecio = document.createElement("input");
    inputPrecio.type = "number";
    inputPrecio.style.width = "100px";

    divPrecio.appendChild(parrafoPrecio);
    divPrecio.appendChild(inputPrecio);
    
    let divConductividad = document.createElement("div");
    divConductividad.classList.add("col-2");
    let parrafoConductividad = document.createElement("p");
    parrafoConductividad.innerText = "Conductividad";
    let inputConductividad = document.createElement("input");
    inputConductividad.type = "number";
    inputConductividad.style.width = "100px";

    divConductividad.appendChild(parrafoConductividad);
    divConductividad.appendChild(inputConductividad);

    let divEspesor = document.createElement("div");
    divEspesor.classList.add("col-2");
    let parrafoEspesor = document.createElement("p");
    parrafoEspesor.innerText = "Espesor";
    let inputEspesor = document.createElement("input");
    inputEspesor.type = "number";
    inputEspesor.style.width = "100px";

    divEspesor.appendChild(parrafoEspesor);
    divEspesor.appendChild(inputEspesor);

    
    let divResistencia = document.createElement("div");
    divResistencia.classList.add("col-2");
    let parrafoResistencia = document.createElement("p");
    parrafoResistencia.innerText = "Resistencia";
    let inputResistencia = document.createElement("input");
    inputResistencia.type = "number";
    inputResistencia.style.width = "100px";

    divResistencia.appendChild(parrafoResistencia);
    divResistencia.appendChild(inputResistencia);

    let divTipoMaterial = document.createElement("div");
    divTipoMaterial.classList.add("col-2");
    let parrafoTipoMaterial = document.createElement("p");
    parrafoTipoMaterial.innerText = "Tipo de material";
    let inputTipoMaterial = document.createElement("input");
    inputTipoMaterial.type = "number";
    inputTipoMaterial.style.width = "100px";

    divTipoMaterial.appendChild(parrafoTipoMaterial);
    divTipoMaterial.appendChild(inputTipoMaterial);

    let divContainerBtn = document.createElement("div");
    divContainerBtn.classList.add("container");
    divContainerBtn.setAttribute("role", "group");
    divContainerBtn.setAttribute("aria-label", "Basic outlined example");

    btnGenerarMaterial.type = "button";
    btnGenerarMaterial.classList.add("btn");
    btnGenerarMaterial.classList.add("btn-outline-dark");
    btnGenerarMaterial.setAttribute("id", "btnGenerarMaterial");
    btnGenerarMaterial.innerText = "Generar";
    divContainerBtn.appendChild(btnGenerarMaterial);


    divRow.appendChild(divNombre);
    divRow.appendChild(divCantidad);
    divRow.appendChild(divPrecio);
    divRow.appendChild(divConductividad);
    divRow.appendChild(divEspesor);
    divRow.appendChild(divResistencia);
    divRow.appendChild(divTipoMaterial);
    panelContenido.appendChild(divRow);
    panelContenido.appendChild(divContainerBtn);
}

crearMaterialUsuario.addEventListener("click", () => {
    crearCardMaterial();
    let container = document.querySelector("#panelContenido");
    container.style.display = "";
    
})