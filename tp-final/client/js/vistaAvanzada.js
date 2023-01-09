
let divMateriales = document.querySelector("#materials");
let btnGenerar = document.querySelector("#btnGenerar");

async function crearCardsMateriales() {
    for (let i = 1; i < 10; i++) {
        let divRow = document.createElement("div");
        divRow.classList.add("row");

        let divIndiceE = document.createElement("div");
        divIndiceE.classList.add("col-md-2");
        let inputIndiceE = document.createElement("input");

        let divIndiceLambda = document.createElement("div");
        divIndiceLambda.classList.add("col-md-2");
        let inputIndiceLambda = document.createElement("input");


        let divIndiceR = document.createElement("div");
        divIndiceR.classList.add("col-md-2");
        let inputIndiceR = document.createElement("input");

        let divCantidad = document.createElement("div");
        divCantidad.classList.add("col-md-2");
        let inputCantidad = document.createElement("input");

        let divPrecio = document.createElement("div");
        divPrecio.classList.add("col-md-2");
        let inputPrecio = document.createElement("input");


        // VER COMO HACER UNA FUNCION PARA CREAR LOS DROPDOWNS(SELECTS)
        let divSection = document.createElement("div");
        divSection.classList.add("col-md-2");
        let selectMateriales = document.createElement("select");
        selectMateriales.id = `selectMateriales_${i}`
        selectMateriales.style.width = "154px";
        selectMateriales.style.height = "30px";
        selectMateriales.innerHTML = "";
        let optionNone = document.createElement("option");
        optionNone.innerHTML = "None";
        selectMateriales.appendChild(optionNone);

        crearOptions(i, selectMateriales, inputIndiceE, inputIndiceLambda, inputIndiceR, inputCantidad, inputPrecio,optionNone);
        // let respuesta = await fetch(`material/tipo-material/${i}`);
        // if (respuesta.ok) {

        //     let materiales = await respuesta.json();

        //     for (let j = 0; j < materiales.length; j++) {
        //         console.log("Entro")
        //         let option = document.createElement("option");
        //         option.innerHTML = materiales[j].nombre;
        //         option.value = materiales[j].idMaterial;
        //         selectMateriales.appendChild(option);

        //        FUNCION PARA CARGAR LOS DATOS DE LOS OPTIONS
        //         selectMateriales.addEventListener("change", () => {
        //             console.log(option.value)
        //             inputIndiceE.value = materiales[j].conductividadTermica;
        //             inputIndiceLambda.value = materiales[j].espesor;
        //             inputIndiceR.value = materiales[j].resistenciaTermica;
        //             inputCantidad.value = materiales[j].cantidad;
        //             inputPrecio.value = materiales[j].precio;
        //         })
        //     }

        // }


        divSection.appendChild(selectMateriales)
        divIndiceE.appendChild(inputIndiceE);
        divIndiceLambda.appendChild(inputIndiceLambda);
        divIndiceR.appendChild(inputIndiceR);
        divCantidad.appendChild(inputCantidad);
        divPrecio.appendChild(inputPrecio);

        divRow.appendChild(divSection);
        divRow.appendChild(divIndiceE);
        divRow.appendChild(divIndiceLambda);
        divRow.appendChild(divIndiceR);
        divRow.appendChild(divCantidad);
        divRow.appendChild(divPrecio);
        divMateriales.appendChild(divRow)
    }


}


async function crearOptions(id, selectMateriales, inputIndiceE, inputIndiceLambda, inputIndiceR, inputCantidad, inputPrecio, optionNone) {

    let respuesta = await fetch(`material/tipo-material/${id}`, {
        headers: {
            "Authorization": "Bearer " + window.sessionStorage.getItem("token")
        }
    });
    if (respuesta.ok) {
        let materiales = await respuesta.json();


        for (let i = 0; i < materiales.length; i++) {  
            if (materiales[i] != undefined) {
                let material = materiales[i];
                let option = document.createElement("option");
                option.innerHTML = material.nombre;
                option.id = `optionMaterial_${material.idMaterial}`;
                selectMateriales.appendChild(option);
                //cargarOption(material,selectMateriales,inputIndiceE,inputIndiceLambda, inputIndiceR, inputCantidad, inputPrecio)
                selectMateriales.addEventListener("change", () => {
                    if (option.selected) {
                        inputIndiceE.value = material.conductividadTermica;
                        inputIndiceLambda.value = material.espesor;
                        inputIndiceR.value = material.resistenciaTermica;
                        inputCantidad.value = material.cantidad;
                        inputPrecio.value = material.precio;
                    }
                    else if(optionNone.selected) {
                        inputIndiceE.value = "";
                        inputIndiceLambda.value = "";
                        inputIndiceR.value = "";
                        inputCantidad.value = "";
                        inputPrecio.value = "";
                    }
                })
            }
        }

    }

}

// async function cargarOption(material,selectMateriales, inputIndiceE, inputIndiceLambda, inputIndiceR, inputCantidad, inputPrecio) {
//     selectMateriales.addEventListener("change", () => {
//         console.log(option.selected)
//         inputIndiceE.value = material.conductividadTermica;
//         inputIndiceLambda.value = material.espesor;
//         inputIndiceR.value = material.resistenciaTermica;
//         inputCantidad.value = material.cantidad;
//         inputPrecio.value = material.precio;
//     })
// }
crearCardsMateriales();
btnGenerar.addEventListener("click", () => {
    let muroGenerado = document.querySelector("#muroGenerado");
    let select = document.querySelector("#selectMateriales_1");
    let parrafo = document.createElement("p");
    for(let i = 0; i < select.children.length; i++) {
        if(select.children[i].selected && select.children[i].value != "None") {
            parrafo.innerHTML = `Muro ${select.children[i].value}`
        }
    }
    muroGenerado.appendChild(parrafo);
})