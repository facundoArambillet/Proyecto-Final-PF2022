let panelContenido = document.querySelector("#panelContenido");
let btnGenerarMaterial = document.createElement("button");
let crearMaterialUsuario = document.querySelector("#crearMaterial");


function crearCardMaterial() {
    // let divRow = document.createElement("div");
    // divRow.classList.add("row");
    // divRow.classList.add("text-center");
    // divRow.style.marginTop = "1%"
    // let divNombre = document.createElement("div");
    // divNombre.classList.add("col-2");
    // let parrafoNombre = document.createElement("p");
    // parrafoNombre.innerText = "Nombre";
    // let inputNombre = document.createElement("input");
    // inputNombre.id = "inputNombre";
    // inputNombre.type = "text";
    // inputNombre.style.width = "100%";

    // divNombre.appendChild(parrafoNombre);
    // divNombre.appendChild(inputNombre);

    // // let divCantidad = document.createElement("div");
    // // divCantidad.classList.add("col-2");
    // // let parrafoCantidad = document.createElement("p");
    // // parrafoCantidad.innerText = "Cantidad";
    // // let inputCantidad = document.createElement("input");
    // // inputCantidad.id = "inputCantidad";
    // // inputCantidad.type = "number";
    // // inputCantidad.style.width = "100%";

    // // divCantidad.appendChild(parrafoCantidad);
    // // divCantidad.appendChild(inputCantidad);


    // let divPrecio = document.createElement("div");
    // divPrecio.classList.add("col-2");
    // let parrafoPrecio = document.createElement("p");
    // parrafoPrecio.innerText = "Precio";
    // let inputPrecio = document.createElement("input");
    // inputPrecio.id = "inputPrecio";
    // inputPrecio.type = "number";
    // inputPrecio.style.width = "100%";

    // divPrecio.appendChild(parrafoPrecio);
    // divPrecio.appendChild(inputPrecio);

    // let divConductividad = document.createElement("div");
    // divConductividad.classList.add("col-2");
    // let parrafoConductividad = document.createElement("p");
    // parrafoConductividad.innerText = "Conductividad";
    // let inputConductividad = document.createElement("input");
    // inputConductividad.id = "inputConductividad";
    // inputConductividad.type = "number";
    // inputConductividad.style.width = "100%";

    // divConductividad.appendChild(parrafoConductividad);
    // divConductividad.appendChild(inputConductividad);

    // let divEspesor = document.createElement("div");
    // divEspesor.classList.add("col-2");
    // let parrafoEspesor = document.createElement("p");
    // parrafoEspesor.innerText = "Espesor";
    // let inputEspesor = document.createElement("input");
    // inputEspesor.id = "inputEspesor";
    // inputEspesor.type = "number";
    // inputEspesor.style.width = "100%";

    // divEspesor.appendChild(parrafoEspesor);
    // divEspesor.appendChild(inputEspesor);


    // let divResistencia = document.createElement("div");
    // divResistencia.classList.add("col-2");
    // let parrafoResistencia = document.createElement("p");
    // parrafoResistencia.innerText = "Resistencia";
    // let inputResistencia = document.createElement("input");
    // inputResistencia.id = "inputResistencia";
    // inputResistencia.type = "number";
    // inputResistencia.style.width = "100%";

    // divResistencia.appendChild(parrafoResistencia);
    // divResistencia.appendChild(inputResistencia);

    // let divTipoMaterial = document.createElement("div");
    // divTipoMaterial.classList.add("col-2");
    // let parrafoTipoMaterial = document.createElement("p");
    // parrafoTipoMaterial.innerText = "Tipo de material";
    // let inputTipoMaterial = document.createElement("input");
    // inputTipoMaterial.id = "inputTipoMaterial";
    // inputTipoMaterial.type = "text";
    // inputTipoMaterial.style.width = "100%";

    // divTipoMaterial.appendChild(parrafoTipoMaterial);
    // divTipoMaterial.appendChild(inputTipoMaterial);

    // let divContainerBtn = document.createElement("div");
    // divContainerBtn.classList.add("container");
    // divContainerBtn.style.marginTop = "1%";
    // divContainerBtn.style.display = "flex";
    // divContainerBtn.style.justifyContent = "flex-end";
    // divContainerBtn.setAttribute("role", "group");
    // divContainerBtn.setAttribute("aria-label", "Basic outlined example");

    // btnGenerarMaterial.type = "button";
    // btnGenerarMaterial.classList.add("btn");
    // btnGenerarMaterial.classList.add("btn-outline-dark");
    // btnGenerarMaterial.setAttribute("id", "btnGenerarMaterial");
    // btnGenerarMaterial.innerText = "Generar";
    // divContainerBtn.appendChild(btnGenerarMaterial);


    // divRow.appendChild(divNombre);
    // // divRow.appendChild(divCantidad);
    // divRow.appendChild(divPrecio);
    // divRow.appendChild(divConductividad);
    // divRow.appendChild(divEspesor);
    // divRow.appendChild(divResistencia);
    // divRow.appendChild(divTipoMaterial);
    // panelContenido.appendChild(divRow);
    // panelContenido.appendChild(divContainerBtn);



    let divContainerMaterial = document.createElement("div");
    divContainerMaterial.classList.add("table-container");
    let tableMaterial = document.createElement("table");
    tableMaterial.classList.add("table-rwd");
    let trMateriales = document.createElement("tr");
    let tdNombreMaterial = document.createElement("td");
    tdNombreMaterial.innerText = "Nombre";
    let tdPrecioMaterial = document.createElement("td");
    tdPrecioMaterial.innerText = "Precio";
    let tdStockConductividad = document.createElement("td");
    tdStockConductividad.innerText = "Conductividad";
    let tdEspesor = document.createElement("td");
    tdEspesor.innerText = "Espesor";
    let tdResistencia = document.createElement("td");
    tdResistencia.innerText = "Resistencia";
    let tdTipoMaterial = document.createElement("td");
    tdTipoMaterial.innerText = "Tipo de material";


    trMateriales.appendChild(tdNombreMaterial);
    trMateriales.appendChild(tdPrecioMaterial);
    trMateriales.appendChild(tdStockConductividad);
    trMateriales.appendChild(tdEspesor);
    trMateriales.appendChild(tdResistencia);
    trMateriales.appendChild(tdTipoMaterial);
    tableMaterial.appendChild(trMateriales);
    divContainerMaterial.appendChild(tableMaterial);
    panelContenido.appendChild(divContainerMaterial);



    let tr = document.createElement("tr");
    tr.classList.add("materiales");
    let tdInputNombre = document.createElement("td");
    let textAreaMaterial = document.createElement("textarea");
    textAreaMaterial.id = "inputNombre";
    textAreaMaterial.style.resize = "none";
    tdInputNombre.appendChild(textAreaMaterial);

    let tdInputPrecio = document.createElement("td");
    let inputPrecioMaterial = document.createElement("input");
    inputPrecioMaterial.id = "inputPrecio";
    inputPrecioMaterial.type = "number";
    tdInputPrecio.appendChild(inputPrecioMaterial);

    let tdConductividadMaterial = document.createElement("td");
    let inputConductividadMaterial = document.createElement("input");
    inputConductividadMaterial.id = "inputConductividad";
    inputConductividadMaterial.type = "number";
    tdConductividadMaterial.appendChild(inputConductividadMaterial);

    let tdEspesorMaterial = document.createElement("td");
    let inputEspesorMaterial = document.createElement("input");
    inputEspesorMaterial.id = "inputEspesor";
    inputEspesorMaterial.type = "number";
    tdEspesorMaterial.appendChild(inputEspesorMaterial);

    let tdResistenciaMaterial = document.createElement("td");
    let inputResistenciaMaterial = document.createElement("input");
    inputResistenciaMaterial.id = "inputResistencia";
    inputResistenciaMaterial.type = "number";
    tdResistenciaMaterial.appendChild(inputResistenciaMaterial);

    let tdTipoMaterialValue = document.createElement("td");
    let inpuTipoMaterial = document.createElement("input");
    inpuTipoMaterial.id = "inputTipoMaterial";
    inpuTipoMaterial.type = "text";
    tdTipoMaterialValue.appendChild(inpuTipoMaterial);

    let divContainerBtn = document.createElement("div");
    divContainerBtn.classList.add("container");
    divContainerBtn.style.marginTop = "1%";
    divContainerBtn.style.display = "flex";
    divContainerBtn.style.justifyContent = "flex-end";
    divContainerBtn.setAttribute("role", "group");
    divContainerBtn.setAttribute("aria-label", "Basic outlined example");

    btnGenerarMaterial.type = "button";
    btnGenerarMaterial.classList.add("btn");
    btnGenerarMaterial.classList.add("btn-outline-dark");
    btnGenerarMaterial.setAttribute("id", "btnGenerarMaterial");
    btnGenerarMaterial.innerText = "Generar";
    divContainerBtn.appendChild(btnGenerarMaterial);




    tr.appendChild(tdInputNombre);
    tr.appendChild(tdInputPrecio);
    tr.appendChild(tdConductividadMaterial);
    tr.appendChild(tdEspesorMaterial);
    tr.appendChild(tdResistenciaMaterial);
    tr.appendChild(tdTipoMaterialValue);
    tableMaterial.appendChild(tr);
    divContainerMaterial.appendChild(tableMaterial);
    panelContenido.appendChild(divContainerMaterial);
    panelContenido.appendChild(divContainerBtn);

}

crearMaterialUsuario.addEventListener("click", () => {
    crearCardMaterial();
    let container = document.querySelector("#panelContenido");
    container.style.display = "initial";

})

btnGenerarMaterial.addEventListener("click", async () => {
    let nombre = document.querySelector("#inputNombre").value;
    //let cantidad = document.querySelector("#inputCantidad").value;
    let precio = document.querySelector("#inputPrecio").value;
    let conductividad = document.querySelector("#inputConductividad").value;
    let espesor = document.querySelector("#inputEspesor").value;
    let resistencia = document.querySelector("#inputResistencia").value;
    let tipoDeMaterial = document.querySelector("#inputTipoMaterial").value.toLowerCase();
    let tipoMaterial;
    let nuevoMaterial;

    let valorTipoMaterial = {
        "nombre": tipoDeMaterial
    }
    let validacion = await fetch(`/tipo-material/all/tipoMaterial/${valorTipoMaterial.nombre}`)
    if (validacion.ok) {
        tipoMaterial = await validacion.json();
        nuevoMaterial = {
            "nombre": nombre,
            "cantidad": 1, //Number(cantidad)
            "precio": Number(precio),
            "conductividadTermica": Number(conductividad),
            "espesor": Number(espesor),
            "tipoMaterialIdTipoMaterial": tipoMaterial.idTipoMaterial,
            "resistenciaTermica": Number(resistencia),

        }
        console.log(nuevoMaterial)
        let response = await fetch("/material", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoMaterial)
        })
        if (response.ok) {
            swal("Material creado con exito", "", "success");
        }
    }
    else {
        let respuesta = await fetch("/tipo-material", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valorTipoMaterial)
        })

        if (respuesta.ok) {
            tipoMaterial = await respuesta.json();
            nuevoMaterial = {
                "nombre": nombre,
                "cantidad": 1, //Number(cantidad)
                "precio": Number(precio),
                "conductividadTermica": Number(conductividad),
                "espesor": Number(espesor),
                "tipoMaterialIdTipoMaterial": tipoMaterial.idTipoMaterial,
                "resistenciaTermica": Number(resistencia),

            }
            console.log(nuevoMaterial)
            let response = await fetch("/material", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoMaterial)
            })
            if (response.ok) {
                swal("Material creado con exito", "", "success");
            }
        }
    }

})