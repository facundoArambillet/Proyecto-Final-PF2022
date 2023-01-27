let tipoMateriales = [];
let divMateriales = document.querySelector("#materials");
let btnGenerar = document.querySelector("#btnGenerar");

async function crearCardsMateriales() {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    divRow.style.marginBottom = "2%"

    let divMaterial = document.createElement("div");
    divMaterial.classList.add("col");
    let strongMaterial = document.createElement("strong");
    strongMaterial.classList.add("subtituloMaterial");
    strongMaterial.innerText = "Materiales";
    divMaterial.appendChild(strongMaterial);

    let divIndiceE = document.createElement("div");
    divIndiceE.classList.add("col");
    divIndiceE.classList.add("contenidoNone");
    let strongIndiceE = document.createElement("strong");
    strongIndiceE.classList.add("subtituloIndiceE");
    strongIndiceE.innerText = "Indice E";
    divIndiceE.appendChild(strongIndiceE);

    let divIndiceLambda = document.createElement("div");
    divIndiceLambda.classList.add("col");
    divIndiceLambda.classList.add("contenidoNone");
    let strongIndiceLambda = document.createElement("strong");
    strongIndiceLambda.classList.add("subtituloIndiceLambda");
    strongIndiceLambda.innerText = "Indice λ";
    divIndiceLambda.appendChild(strongIndiceLambda);

    let divIndiceR = document.createElement("div");
    divIndiceR.classList.add("col");
    divIndiceR.classList.add("contenidoNone");
    let strongIndiceR = document.createElement("strong");
    strongIndiceR.classList.add("subtituloIndiceR");
    strongIndiceR.innerText = "Indice R";
    divIndiceR.appendChild(strongIndiceR);

    let divCantidadSubtitulo = document.createElement("div");
    divCantidadSubtitulo.classList.add("col");
    let strongCantidad = document.createElement("strong");
    strongCantidad.classList.add("subtituloCantidad");
    strongCantidad.innerText = "Cantidad";
    divCantidadSubtitulo.appendChild(strongCantidad);

    let divPrecioSubtitulo = document.createElement("div");
    divPrecioSubtitulo.classList.add("col");
    let strongPrecio = document.createElement("strong");
    strongPrecio.classList.add("subtituloPrecio");
    strongPrecio.innerText = "Precio C/U";
    divPrecioSubtitulo.appendChild(strongPrecio);

    divRow.appendChild(divMaterial);
    divRow.appendChild(divIndiceE);
    divRow.appendChild(divIndiceLambda);
    divRow.appendChild(divIndiceR);
    divRow.appendChild(divCantidadSubtitulo);
    divRow.appendChild(divPrecioSubtitulo);
    divMateriales.appendChild(divRow);


    for (let i = 1; i <= tipoMateriales.length; i++) {
        divRow = document.createElement("div");
        divRow.classList.add("row");

        divIndiceE = document.createElement("div");
        divIndiceE.classList.add("col");
        divIndiceE.classList.add("contenidoNone");
        let parrafoIndiceE = document.createElement("p");
        parrafoIndiceE.innerText = "0";
        divIndiceLambda = document.createElement("div");
        divIndiceLambda.classList.add("col");
        divIndiceLambda.classList.add("contenidoNone");
        let parrafoLambda = document.createElement("p");
        parrafoLambda.innerText = "0";

        divIndiceR = document.createElement("div");
        divIndiceR.classList.add("col");
        divIndiceR.classList.add("contenidoNone");
        let parrafoIndiceR = document.createElement("p");
        parrafoIndiceR.innerText = "0";

        divCantidad = document.createElement("div");
        divCantidad.classList.add("col");
        divCantidad.classList.add("cantidad");
        let inputCantidad = document.createElement("input");
        inputCantidad.type = "number";

        divPrecio = document.createElement("div");
        divPrecio.classList.add("col");
        divPrecio.classList.add("precio");
        let parrafoPrecio = document.createElement("p");
        parrafoPrecio.innerHTML = "$ 0";
        // VER COMO HACER UNA FUNCION PARA CREAR LOS DROPDOWNS(SELECTS)
        let divSection = document.createElement("div");
        divSection.classList.add("col");
        let selectMateriales = document.createElement("select");
        selectMateriales.classList.add("selects");
        selectMateriales.id = `selectMateriales_${i}`
        selectMateriales.style.width = "120px";
        selectMateriales.style.height = "30px";
        selectMateriales.innerHTML = "";
        let optionNone = document.createElement("option");
        optionNone.innerHTML = "None";
        selectMateriales.appendChild(optionNone);

        crearOptions(i, selectMateriales, parrafoIndiceE, parrafoLambda, parrafoIndiceR, inputCantidad, parrafoPrecio, optionNone);
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
        //             parrafoIndiceE.value = materiales[j].conductividadTermica;
        //             parrafoLambda.value = materiales[j].espesor;
        //             parrafoIndiceR.value = materiales[j].resistenciaTermica;
        //             inputCantidad.value = materiales[j].cantidad;
        //             parrafoPrecio.value = materiales[j].precio;
        //         })
        //     }

        // }


        divSection.appendChild(selectMateriales)
        divIndiceE.appendChild(parrafoIndiceE);
        divIndiceLambda.appendChild(parrafoLambda);
        divIndiceR.appendChild(parrafoIndiceR);
        divCantidad.appendChild(inputCantidad);
        divPrecio.appendChild(parrafoPrecio);

        divRow.appendChild(divSection);
        divRow.appendChild(divIndiceE);
        divRow.appendChild(divIndiceLambda);
        divRow.appendChild(divIndiceR);
        divRow.appendChild(divCantidad);
        divRow.appendChild(divPrecio);
        divMateriales.appendChild(divRow)
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
                //cargarOption(material,selectMateriales,parrafoIndiceE,parrafoLambda, parrafoIndiceR, inputCantidad, parrafoPrecio)
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

// async function cargarOption(material,selectMateriales, parrafoIndiceE, parrafoLambda, parrafoIndiceR, inputCantidad, parrafoPrecio) {
//     selectMateriales.addEventListener("change", () => {
//         console.log(option.selected)
//         parrafoIndiceE.value = material.conductividadTermica;
//         parrafoLambda.value = material.espesor;
//         parrafoIndiceR.value = material.resistenciaTermica;
//         inputCantidad.value = material.cantidad;
//         parrafoPrecio.value = material.precio;
//     })
// }
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
        // let btnCarrito = document.createElement("button");
        // btnCarrito.innerText = "Agregar al carrito";
        let btnBorrar = document.createElement("button");
        btnBorrar.classList.add("btnBorrar");
        btnBorrar.style.backgroundColor = "white";
        btnBorrar.style.border = 0;
        let imagenTarro = document.createElement("i");
        imagenTarro.classList.add("bi");
        imagenTarro.classList.add("bi-trash3-fill");

        //AGARRAR TODOS LOS MATERIALES(ya los id de los materiales en los id del option , probar agarrar todos los selects y hacer una matriz), 
        //GENERAR MURO , COMPARAR TRANSMITANCIA TERMICA CON UNA CONSTANTE(INVENTADA) 

        for (let i = 0; i < selects.length; i++) {

            for (let j = 0; j < selects[i].children.length; j++) {
                if (selects[i].children[j].selected && selects[i].children[j].value != "None") {

                    total += Number(inputsCantidades[i].children[0].value * parrafosPrecios[i].children[0].innerText)
                    //parrafo.innerHTML = `Muro ${select.children[i].value}`
                    idsMateriales.push(Number(selects[i].children[j].value));
                }

            }
            for (let k = 0; k < selects[0].children.length; k++) {
                if (selects[0].children[k].selected && selects[0].children[k].value != "None") {
                    nombreMuro = selects[0].children[k].innerText;
                    // console.log(selects[0].children[k])
                    // console.log(nombreMuro)
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
        // parrafo.appendChild(btnCarrito)
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