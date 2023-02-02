
let materiales = [];
let btnActualizarEliminarMaterial = document.querySelector("#actualizarEliminarMaterial");

btnActualizarEliminarMaterial.addEventListener("click", () => {
    function crearTablaMateriales() {
        let divContainer = document.createElement("div");
        divContainer.classList.add("table-container");
        let table = document.createElement("table");
        table.classList.add("table-rwd");
        let tr = document.createElement("tr");
        let tdNombre = document.createElement("td");
        tdNombre.innerText = "Materiales";
        let tdPrecio = document.createElement("td");
        tdPrecio.innerText = "Precio";
        // let tdStock = document.createElement("td");
        // tdStock.innerText = "Stock";
        let tdConductividad = document.createElement("td");
        tdConductividad.innerText = "Conductividad Termica";
        let tdEspesor = document.createElement("td");
        tdEspesor.innerText = "Espesor";
        let tdResistencia = document.createElement("td");
        tdResistencia.innerText = "Resistencia Termica";
        let tdActualizarBorrar = document.createElement("td");
        tdActualizarBorrar.innerText = "Actualizar/Borrar";
    
    
        tr.appendChild(tdNombre);
        tr.appendChild(tdPrecio);
        // tr.appendChild(tdStock);
        tr.appendChild(tdConductividad);
        tr.appendChild(tdEspesor);
        tr.appendChild(tdResistencia);
        tr.appendChild(tdActualizarBorrar);
        table.appendChild(tr);
        divContainer.appendChild(table);
        container.appendChild(divContainer);
    
        for (let i = 0; i < materiales.length; i++) {
            let tr = document.createElement("tr");
            tr.classList.add("items");
            let tdNombre = document.createElement("td");
            let textNombre = document.createElement("textarea");
            textNombre.style.resize = "none";
            textNombre.innerText = materiales[i].nombre;
            textNombre.id = `nombre_${materiales[i].idMaterial}`;
            tdNombre.appendChild(textNombre);

            let tdPrecio = document.createElement("td");
            let inputPrecio = document.createElement("input");
            inputPrecio.style.width = "80px";
            inputPrecio.type = "number";
            inputPrecio.value = materiales[i].precio;
            inputPrecio.id = `precio_${materiales[i].idMaterial}`;
            tdPrecio.appendChild(inputPrecio);
            inputPrecio.addEventListener("change", () => {         //CON ESTO HAGO QUE NO ME CARGUEN VALORES MENORES A 1
                if (inputPrecio.value <= 0) {
                    inputPrecio.value = 1;
                }
            })
            // let tdStock = document.createElement("td");
            // let inputStock = document.createElement("input");
            // inputStock.style.width = "80px"
            // inputStock.type = "number";
            // inputStock.value = materiales[i].stock;
            // inputStock.id = `stock_${materiales[i].idMaterial}`;
            // tdStock.appendChild(inputStock);
            let tdConductividad = document.createElement("td");
            let inputConductividad = document.createElement("input")
            inputConductividad.style.width = "80px";
            inputConductividad.value = materiales[i].conductividadTermica;
            inputConductividad.id = `conductividad_${materiales[i].idMaterial}`
            tdConductividad.appendChild(inputConductividad);
            inputConductividad.addEventListener("change", () => {         //CON ESTO HAGO QUE NO ME CARGUEN VALORES MENORES A 1
                if (inputConductividad.value <= 0) {
                    inputConductividad.value = 1;
                }
            })
            
            let tdEspesor = document.createElement("td");
            let inputEspesor = document.createElement("input");
            inputEspesor.style.width = "80px";
            inputEspesor.value = materiales[i].espesor;
            inputEspesor.id = `espesor_${materiales[i].idMaterial}`;
            tdEspesor.appendChild(inputEspesor);
            inputEspesor.addEventListener("change", () => {         //CON ESTO HAGO QUE NO ME CARGUEN VALORES MENORES A 1
                if (inputEspesor.value <= 0) {
                    inputEspesor.value = 1;
                }
            })

            let tdResistencia = document.createElement("td");
            let inputResistencia = document.createElement("input");
            inputResistencia.style.width = "80px";
            inputResistencia.value = materiales[i].espesor;
            inputResistencia.id = `resistencia_${materiales[i].idMaterial}`;
            tdResistencia.appendChild(inputResistencia);
            inputResistencia.addEventListener("change", () => {         //CON ESTO HAGO QUE NO ME CARGUEN VALORES MENORES A 1
                if (inputResistencia.value <= 0) {
                    inputResistencia.value = 1;
                }
            })

            let tdIconos = document.createElement("td");
            let divRow = document.createElement("div");
            divRow.classList.add("row");

            let divBorrar = document.createElement("div");
            divBorrar.classList.add("col-6");
            let divActualizar = document.createElement("div");
            divActualizar.classList.add("col-6");
    
            let iBorrar = document.createElement("i");
            iBorrar.classList.add("bi");
            iBorrar.classList.add("bi-trash3-fill");
            let iActualizar = document.createElement("i");
            iActualizar.classList.add("bi");
            iActualizar.classList.add("bi-arrow-repeat");
    
            let btnBorrar = document.createElement("button");
            btnBorrar.appendChild(iBorrar);
            btnBorrar.value = materiales[i].idMaterial;
            btnBorrar.classList.add("btnBorrarMaterial")
            btnBorrar.classList.add("btns-tabla");

            let btnActualizar = document.createElement("button");
            btnActualizar.appendChild(iActualizar);
            btnActualizar.value = materiales[i].idMaterial;
            btnActualizar.classList.add("btnActualizarMaterial");
            btnActualizar.classList.add("btns-tabla");
    
    
            divBorrar.appendChild(btnBorrar);
            divActualizar.appendChild(btnActualizar)
            divRow.appendChild(divActualizar);
            divRow.appendChild(divBorrar);
            tdIconos.appendChild(divRow);
    
            tr.appendChild(tdNombre);
            tr.appendChild(tdPrecio);
            //tr.appendChild(tdStock);
            tr.appendChild(tdConductividad);
            tr.appendChild(tdEspesor);
            tr.appendChild(tdResistencia);
            tr.appendChild(tdIconos);
            table.appendChild(tr);
            divContainer.appendChild(table);
            container.appendChild(divContainer);
        }
        
        borrarMaterial(".btnBorrarMaterial");
        actualizarMaterial(".btnActualizarMaterial");
    }

    async function borrarMaterial(clase) {
        let btns = document.querySelectorAll(clase);

        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", async () => {


                swal({
                    title: "¿Estas seguro que desea eliminar este Material?",
                    text: "una vez eliminado, No podra recuperarse",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then(async (willDelete) => { //EL DE ACA ASYNC ES PARA EL AWAIT DE LA RESPUESTA DEL DELETE
                        if (willDelete) {
                            swal("Material borrado con exito!", {
                                icon: "success",
                            });
                            // METO LA FUNCIONALIDAD DENTRO DEL ALERT PARA QUE NO SE DISPARE EL BORRADO SI EL USUARIO SE ARREPIENTE
                            if (btns[i].value == materiales[i].idMaterial) {
                                let respuesta = await fetch(`/material/${materiales[i].idMaterial}`, {
                                    method: 'DELETE',
                                    headers: { 'Content-Type': 'application/json' },
                                })
                                if (respuesta.ok) {
                                    let materialEliminado = await respuesta.json();
                                    if(materialEliminado) {
                                        eliminarTipoMaterial(materialEliminado.tipoMaterial.nombre)
                                        let panel = document.querySelector("#panelContenido");
                                        panel.innerHTML = "";
                                        loadMaterialesAdmin();
                                    }

                                    
                                }
                                else {
                                    console.log("error en la respuesta");
                                }
                            }
                            else {
                                console.log("valores no coinciden");
                            }
                        }
                    });



            })
        }
    }

    async function actualizarMaterial(clase) {
        let btnsActualizar = document.querySelectorAll(clase);
        for (let i = 0; i < btnsActualizar.length; i++) {
            btnsActualizar[i].addEventListener("click", async () => {

                if (btnsActualizar[i].value == materiales[i].idMaterial) {
                    let response = await fetch(`/material/${materiales[i].idMaterial}`)
                    if (response.ok) {

                        let json = await response.json();

                        let nuevoNombre = document.querySelector(`#nombre_${materiales[i].idMaterial}`);
                        let nuevoPrecio = document.querySelector(`#precio_${materiales[i].idMaterial}`);
                        let nuevaConductividad = document.querySelector(`#conductividad_${materiales[i].idMaterial}`);
                        let nuevoEspesor = document.querySelector(`#espesor_${materiales[i].idMaterial}`);
                        let nuevaResistencia = document.querySelector(`#resistencia_${materiales[i].idMaterial}`)

                        let nuevoMaterial = {
                            "nombre": nuevoNombre.value,
                            "cantidad": 1,
                            "precio": Number(nuevoPrecio.value),
                            "conductividadTermica": Number(nuevaConductividad.value),
                            "espesor": Number(nuevoEspesor.value),
                            "resistenciaTermica": Number(nuevaResistencia.value),
                        }
                        console.log(nuevoMaterial)
                        let respuesta = await fetch(`/material/${materiales[i].idMaterial}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(nuevoMaterial)
                        })
                        if (respuesta.ok) {
                            swal("Material actualizado con exito", "", "success");
                        }
                        else {
                            console.log("error en la respuesta");
                        }
                    }
                    else {
                        console.log("valores no coinciden");
                    }
                }

            })
        }
    }
    async function eliminarTipoMaterial(nombre) {
        let respuesta = await fetch(`/tipo-material/all/${nombre}`)
        if(respuesta.ok) {
            let tipoMateriales = await respuesta.json();
            console.log(tipoMateriales)
            if(tipoMateriales && tipoMateriales[0].materiales.length == 0) {  //TipoMateriales me retorna un arreglo(con un unico elemento por eso el [0])
                let response = await fetch(`/tipo-material/${tipoMateriales[0].idTipoMaterial}`,{
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                })
            }
        }
    }
    async function loadMaterialesAdmin() {
        let respuesta = await fetch("/material");
        if(respuesta.ok) {
            let json = await respuesta.json();
            materiales = json;
        }
        crearTablaMateriales();
    }
    loadMaterialesAdmin();
    container.style.display = "initial";
})
