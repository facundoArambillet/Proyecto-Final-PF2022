let tipoMateriales = [];
let divMateriales = document.querySelector("#materials");
let btnGenerar = document.querySelector("#btnGenerar");

async function crearCardsMateriales() {

    let divContainerMaterial = document.createElement("div");
    divContainerMaterial.classList.add("table-container");

    let tableMaterial = document.createElement("table");
    tableMaterial.classList.add("table-rwd");

    let trMateriales = document.createElement("tr");

    let tdMaterial = document.createElement("td");
    tdMaterial.innerText = "Materiales";


    let tdConductividad = document.createElement("td");
    tdConductividad.innerText = "Conductividad";

    let tdEspesor = document.createElement("td");
    tdEspesor.innerText = "Espesor";

    let tdResistencia = document.createElement("td");
    tdResistencia.innerText = "Resistencia";

    let tdPrecioMaterial = document.createElement("td");
    tdPrecioMaterial.innerText = "Precio";

    let tdCantidad = document.createElement("td");
    tdCantidad.innerText = "Cantidad";



    trMateriales.appendChild(tdMaterial);
    trMateriales.appendChild(tdConductividad);
    trMateriales.appendChild(tdEspesor);
    trMateriales.appendChild(tdResistencia);
    trMateriales.appendChild(tdCantidad);
    trMateriales.appendChild(tdPrecioMaterial);
    tableMaterial.appendChild(trMateriales);
    divContainerMaterial.appendChild(tableMaterial);
    divMateriales.appendChild(divContainerMaterial);



    for (let i = 1; i <= tipoMateriales.length; i++) {
        let tr = document.createElement("tr");

        tdEspesor = document.createElement("td");
        let parrafoIndiceE = document.createElement("p");
        parrafoIndiceE.innerText = "0";
        tdEspesor.appendChild(parrafoIndiceE);

        tdConductividad = document.createElement("td");
        let parrafoLambda = document.createElement("p");
        parrafoLambda.innerText = "0";
        tdConductividad.appendChild(parrafoLambda);

        tdResistencia = document.createElement("td");
        let parrafoIndiceR = document.createElement("p");
        parrafoIndiceR.innerText = "0";
        tdResistencia.appendChild(parrafoIndiceR);

        tdCantidad = document.createElement("td");
        tdCantidad.classList.add("cantidad");
        let inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        tdCantidad.appendChild(inputCantidad);

        tdPrecioMaterial = document.createElement("td");
        tdPrecioMaterial.classList.add("precio");
        let parrafoPrecio = document.createElement("p");
        parrafoPrecio.innerHTML = "$ 0";
        tdPrecioMaterial.appendChild(parrafoPrecio);

        // VER COMO HACER UNA FUNCION PARA CREAR LOS DROPDOWNS(SELECTS)
        tdMaterial = document.createElement("td");
        let selectMateriales = document.createElement("select");
        selectMateriales.classList.add("selects");
        selectMateriales.id = `selectMateriales_${i}`;
        selectMateriales.style.width = "120px";
        selectMateriales.style.height = "30px";
        selectMateriales.innerHTML = "";
        tdMaterial.appendChild(selectMateriales);
        let optionNone = document.createElement("option");
        optionNone.innerHTML = "None";
        selectMateriales.appendChild(optionNone);

        crearOptions(i, selectMateriales, parrafoIndiceE, parrafoLambda, parrafoIndiceR, inputCantidad, parrafoPrecio, optionNone);





        tr.appendChild(tdMaterial);
        tr.appendChild(tdEspesor);
        tr.appendChild(tdConductividad);
        tr.appendChild(tdResistencia);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdPrecioMaterial);
        tableMaterial.appendChild(tr);
        divContainerMaterial.appendChild(tableMaterial);
        divMateriales.appendChild(divContainerMaterial);
    }


}


async function crearOptions(id, selectMateriales, parrafoIndiceE, parrafoLambda, parrafoIndiceR, inputCantidad, parrafoPrecio, optionNone) {
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
                option.value = material.idMaterial;
                selectMateriales.appendChild(option);

                selectMateriales.addEventListener("change", () => {
                    if (option.selected) {
                        parrafoIndiceE.innerText = material.conductividadTermica;
                        parrafoLambda.innerText = material.espesor;
                        parrafoIndiceR.innerText = material.resistenciaTermica;
                        inputCantidad.value = 1;
                        inputCantidad.addEventListener("change", () => {         //CON ESTO HAGO QUE NO ME CARGUEN VALORES MENORES A 1
                            if (inputCantidad.value <= 0) {
                                inputCantidad.value = 1;
                            }
                        })
                        parrafoPrecio.innerText = material.precio;
                    }
                    else if (optionNone.selected) {
                        parrafoIndiceE.innerText = "0";
                        parrafoLambda.innerText = "0";
                        parrafoIndiceR.innerText = "0";
                        inputCantidad.innerText = "0";
                        parrafoPrecio.innerText = "$ 0";
                    }
                })
            }
        }

    }

}

btnGenerar.addEventListener("click", async () => {
    let selectNombre = document.querySelector("#selectMateriales_1");
    let optionNone = false;
    for (let i = 0; i < selectNombre.children.length; i++) {
        if (selectNombre.children[i].value == "None" && selectNombre.children[i].selected) {
            optionNone = true;
        }
    }
    if (!optionNone) {
        let muroGenerado = document.querySelector("#muroGenerado");
        let nombreMuro = "";
        let idsMateriales = [];
        let selects = document.querySelectorAll(".selects");
        let inputsCantidades = document.querySelectorAll(".cantidad");
        let parrafosPrecios = document.querySelectorAll(".precio");
        let total = 0;
        let coeficiente = "";
        const estandarCoeficiente = 0.35;
        let parrafo = document.createElement("p");
        parrafo.classList.add("items");
        let btnBorrar = document.createElement("button");
        btnBorrar.classList.add("btnBorrar");
        btnBorrar.style.backgroundColor = "white";
        btnBorrar.style.border = 0;
        let imagenTarro = document.createElement("i");
        imagenTarro.classList.add("bi");
        imagenTarro.classList.add("bi-trash3-fill");


        for (let i = 0; i < selects.length; i++) {

            for (let j = 0; j < selects[i].children.length; j++) {
                if (selects[i].children[j].selected && selects[i].children[j].value != "None") {

                    total += Number(inputsCantidades[i].children[0].value * parrafosPrecios[i].children[0].innerText)
                    idsMateriales.push(Number(selects[i].children[j].value));
                }

            }
            for (let k = 0; k < selects[0].children.length; k++) {
                if (selects[0].children[k].selected && selects[0].children[k].value != "None") {
                    nombreMuro = selects[0].children[k].innerText;
                }
            }
        }

        let muro = {
            "nombre": `Muro ${nombreMuro}`,
            "precio": total,
            "stock": 1,
            "descripcion": "Muro generado",
            "usuarioIdUsuario": Number(window.sessionStorage.idUsuario),
            "idsMateriales": idsMateriales
        }
        console.log(muro)
        let respuesta = await fetch('/muro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(muro)
        })
        if (respuesta.ok) {
            muroUsuario = await respuesta.json();
            btnBorrar.value = muroUsuario.idMuro;
            if (muroUsuario.coeficienteDeTransmitancia < estandarCoeficiente) {
                coeficiente = "Eficiente";
            }
            else {
                coeficiente = "Ineficiente";
            }                                                                    // LA FUNCION toFixed() LIMITA LA CANTIDAD DE DECIMALES //LA FUNCION substr() HACE LO MISMO PARA LOS STRINGS
            parrafo.innerHTML = `Muro ${nombreMuro} tiene una transmitancia de : ${muroUsuario.coeficienteDeTransmitancia.substr(0, 4)}, su transmitancia es ${coeficiente}, y su costo total es de: $ ${muroUsuario.precio} mas IVA`
        }
        btnBorrar.appendChild(imagenTarro)
        parrafo.appendChild(btnBorrar);
        muroGenerado.appendChild(parrafo);

        borrarMuroGenerado(".btnBorrar");
    }
    else {
        swal("El primer material no puede estar vacio", "", "error");
    }

})


async function borrarMuroGenerado(clase) {
    let btns = document.querySelectorAll(clase);

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", async () => {
            swal({
                title: "Esta seguro?",
                text: "Una vez eliminado, no podra recuperar este muro!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (willDelete) => { //EL ASYNC ES PARA EL AWAIT DEL RESPONSE DEL DELETE
                    if (willDelete) {
                        swal("Muro eliminado de su perfi!", {
                            icon: "success",
                        });
                        let response = await fetch(`/muro/${btns[i].value}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        })
                        if (response.ok) {

                            let divPadre = document.querySelector("#muroGenerado");
                            let items = document.querySelectorAll(".items");
                            divPadre.removeChild(items[i]);
                            console.log("muro borrado");

                        }
                        else {
                            console.log("error en el response");
                        }
                    }
                });

        })
    }
}
async function loadTipoMateriales() {
    let respuesta = await fetch("/tipo-material");
    if (respuesta.ok) {
        let json = await respuesta.json();
        tipoMateriales = json;
    }
    crearCardsMateriales();
}
loadTipoMateriales();