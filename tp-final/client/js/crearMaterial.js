let panelContenido = document.querySelector("#panelContenido");
let btnGenerarMaterial = document.createElement("button");
let crearMaterialUsuario = document.querySelector("#crearMaterial");


function crearCardMaterial() {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    divRow.classList.add("text-center");
    divRow.style.marginTop = "1%"
    let divNombre = document.createElement("div");
    divNombre.classList.add("col-2");
    let parrafoNombre = document.createElement("p");
    parrafoNombre.innerText = "Nombre";
    let inputNombre = document.createElement("input");
    inputNombre.id = "inputNombre";
    inputNombre.type = "text";
    inputNombre.style.width = "100%";

    divNombre.appendChild(parrafoNombre);
    divNombre.appendChild(inputNombre);

    // let divCantidad = document.createElement("div");
    // divCantidad.classList.add("col-2");
    // let parrafoCantidad = document.createElement("p");
    // parrafoCantidad.innerText = "Cantidad";
    // let inputCantidad = document.createElement("input");
    // inputCantidad.id = "inputCantidad";
    // inputCantidad.type = "number";
    // inputCantidad.style.width = "100%";

    // divCantidad.appendChild(parrafoCantidad);
    // divCantidad.appendChild(inputCantidad);


    let divPrecio = document.createElement("div");
    divPrecio.classList.add("col-2");
    let parrafoPrecio = document.createElement("p");
    parrafoPrecio.innerText = "Precio";
    let inputPrecio = document.createElement("input");
    inputPrecio.id = "inputPrecio";
    inputPrecio.type = "number";
    inputPrecio.style.width = "100%";

    divPrecio.appendChild(parrafoPrecio);
    divPrecio.appendChild(inputPrecio);

    let divConductividad = document.createElement("div");
    divConductividad.classList.add("col-2");
    let parrafoConductividad = document.createElement("p");
    parrafoConductividad.innerText = "Conductividad";
    let inputConductividad = document.createElement("input");
    inputConductividad.id = "inputConductividad";
    inputConductividad.type = "number";
    inputConductividad.style.width = "100%";

    divConductividad.appendChild(parrafoConductividad);
    divConductividad.appendChild(inputConductividad);

    let divEspesor = document.createElement("div");
    divEspesor.classList.add("col-2");
    let parrafoEspesor = document.createElement("p");
    parrafoEspesor.innerText = "Espesor";
    let inputEspesor = document.createElement("input");
    inputEspesor.id = "inputEspesor";
    inputEspesor.type = "number";
    inputEspesor.style.width = "100%";

    divEspesor.appendChild(parrafoEspesor);
    divEspesor.appendChild(inputEspesor);


    let divResistencia = document.createElement("div");
    divResistencia.classList.add("col-2");
    let parrafoResistencia = document.createElement("p");
    parrafoResistencia.innerText = "Resistencia";
    let inputResistencia = document.createElement("input");
    inputResistencia.id = "inputResistencia";
    inputResistencia.type = "number";
    inputResistencia.style.width = "100%";

    divResistencia.appendChild(parrafoResistencia);
    divResistencia.appendChild(inputResistencia);

    let divTipoMaterial = document.createElement("div");
    divTipoMaterial.classList.add("col-2");
    let parrafoTipoMaterial = document.createElement("p");
    parrafoTipoMaterial.innerText = "Tipo de material";
    let inputTipoMaterial = document.createElement("input");
    inputTipoMaterial.id = "inputTipoMaterial";
    inputTipoMaterial.type = "text";
    inputTipoMaterial.style.width = "100%";

    divTipoMaterial.appendChild(parrafoTipoMaterial);
    divTipoMaterial.appendChild(inputTipoMaterial);

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


    divRow.appendChild(divNombre);
   // divRow.appendChild(divCantidad);
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
    container.style.display = "initial";

})

btnGenerarMaterial.addEventListener("click", async () => {
    let nombre = document.querySelector("#inputNombre").value;
    //let cantidad = document.querySelector("#inputCantidad").value;
    let precio = document.querySelector("#inputPrecio").value;
    let conductividad = document.querySelector("#inputConductividad").value;
    let espesor = document.querySelector("#inputEspesor").value;
    let resistencia = document.querySelector("#inputResistencia").value;
    let tipoDeMaterial = document.querySelector("#inputTipoMaterial").value;
    let tipoMaterial;
    let nuevoMaterial;

    let valorTipoMaterial = {
        "nombre": tipoDeMaterial
    }
    let validacion = await fetch(`/tipo-material/all/tipoMaterial/${valorTipoMaterial.nombre}`)
    if(validacion.ok) {
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
        let response = await fetch("/material", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoMaterial)
        })
        if(response.ok) {
            swal("Material creado con exito","","success");
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
            if(response.ok) {
                swal("Material creado con exito","","success");
            }
        }
    }

})