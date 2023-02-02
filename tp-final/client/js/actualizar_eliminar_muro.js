

let muros = [];
let container = document.querySelector("#panelContenido");
let btnActualizarEliminar = document.querySelector("#actualizarEliminarMuro");
btnActualizarEliminar.addEventListener("click", () => {
    function crearTabla() {
        let divContainer = document.createElement("div");
        divContainer.classList.add("table-container");
        let table = document.createElement("table");
        table.classList.add("table-rwd");
        let tr = document.createElement("tr");
        let tdNombre = document.createElement("td");
        tdNombre.innerText = "Nombre";
        let tdPrecio = document.createElement("td");
        tdPrecio.innerText = "Precio";
        let tdStock = document.createElement("td");
        tdStock.innerText = "Stock";
        let tdCoeficiente = document.createElement("td");
        tdCoeficiente.innerText = "Coeficiente";
        let tdDescripcion = document.createElement("td");
        tdDescripcion.innerText = "Descripcion";
        let tdActualizarBorrar = document.createElement("td");
        tdActualizarBorrar.innerText = "Actualizar/Borrar";


        tr.appendChild(tdNombre);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdStock);
        tr.appendChild(tdCoeficiente);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdActualizarBorrar);
        table.appendChild(tr);
        divContainer.appendChild(table);
        container.appendChild(divContainer);

        for (let i = 0; i < muros.length; i++) {
            let tr = document.createElement("tr");
            tr.classList.add("items");
            let tdNombre = document.createElement("td");
            let textNombre = document.createElement("textarea");
            textNombre.style.resize = "none";
            textNombre.innerText = muros[i].nombre;
            textNombre.id = `nombre_${muros[i].idMuro}`;
            tdNombre.appendChild(textNombre);

            let tdPrecio = document.createElement("td");
            let inputPrecio = document.createElement("input");
            inputPrecio.style.width = "80px"
            inputPrecio.type = "number";
            inputPrecio.value = muros[i].precio;
            inputPrecio.id = `precio_${muros[i].idMuro}`;
            tdPrecio.appendChild(inputPrecio);
            inputPrecio.addEventListener("change", () => {         //CON ESTO HAGO QUE NO ME CARGUEN VALORES MENORES A 1
                if (inputPrecio.value <= 0) {
                    inputPrecio.value = 1;
                }
            })
            let tdStock = document.createElement("td");
            let inputStock = document.createElement("input");
            inputStock.style.width = "80px"
            inputStock.type = "number";
            inputStock.value = muros[i].stock;
            inputStock.id = `stock_${muros[i].idMuro}`;
            tdStock.appendChild(inputStock);
            inputStock.addEventListener("change", () => {         //CON ESTO HAGO QUE NO ME CARGUEN VALORES MENORES A 1
                if (inputStock.value < 0) {
                    inputStock.value = 1;
                }
            })

            let tdCoeficiente = document.createElement("td");
            tdCoeficiente.innerText = muros[i].coeficienteDeTransmitancia.substring(0, 4);
            let tdDescripcion = document.createElement("td");
            let textDescripcion = document.createElement("textarea");
            textDescripcion.style.resize = "none";
            textDescripcion.innerText = muros[i].descripcion;
            textDescripcion.id = `descripcion_${muros[i].idMuro}`;
            tdDescripcion.appendChild(textDescripcion);

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
            btnBorrar.value = muros[i].idMuro;
            btnBorrar.classList.add("btnBorrar")
            btnBorrar.classList.add("btns-tabla");

            let btnActualizar = document.createElement("button");
            btnActualizar.appendChild(iActualizar);
            btnActualizar.value = muros[i].idMuro;
            btnActualizar.classList.add("btnActualizar");
            btnActualizar.classList.add("btns-tabla");


            divBorrar.appendChild(btnBorrar);
            divActualizar.appendChild(btnActualizar)
            divRow.appendChild(divActualizar);
            divRow.appendChild(divBorrar);
            tdIconos.appendChild(divRow);

            tr.appendChild(tdNombre);
            tr.appendChild(tdPrecio);
            tr.appendChild(tdStock);
            tr.appendChild(tdCoeficiente);
            tr.appendChild(tdDescripcion);
            tr.appendChild(tdIconos);
            table.appendChild(tr);
            divContainer.appendChild(table);
            container.appendChild(divContainer);
        }

        borrarMuro(".btnBorrar");
        actualizarMuro(".btnActualizar");
    }
    let inputs = document.querySelectorAll("input");



    async function borrarMuro(clase) {
        let btns = document.querySelectorAll(clase);

        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", async () => {


                swal({
                    title: "¿Estas seguro que desea eliminar este muro?",
                    text: "una vez eliminado, No podra recuperarse",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then(async (willDelete) => { //EL DE ACA ASYNC ES PARA EL AWAIT DE LA RESPUESTA DEL DELETE
                        if (willDelete) {
                            // METO LA FUNCIONALIDAD DENTRO DEL ALERT PARA QUE NO SE DISPARE EL BORRADO SI EL USUARIO SE ARREPIENTE
                            if (btns[i].value == muros[i].idMuro) {
                                let respuesta = await fetch(`/muro/${btns[i].value}`, {
                                    method: 'DELETE',
                                    headers: { 'Content-Type': 'application/json' },
                                })
                                if (respuesta.ok) {
                                    container.innerHTML = '';
                                    loadMurosAdmin();
                                    swal("Muro borrado con exito!", {
                                        icon: "success",
                                    });
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

    async function actualizarMuro(clase) {
        let btnsActualizar = document.querySelectorAll(clase);
        for (let i = 0; i < btnsActualizar.length; i++) {
            btnsActualizar[i].addEventListener("click", async () => {

                if (btnsActualizar[i].value == muros[i].idMuro) {
                    let response = await fetch(`/muro/relacion/id/${muros[i].idMuro}`)
                    if (response.ok) {
                        let json = await response.json();
                        
                        let idsMateriales = [];
                        for (let j = 0; j < json.materiales.length; j++) {
                            console.log(json.materiales[j])
                            idsMateriales.push(json.materiales[j].idMaterial)
                        }

                        let nuevoNombre = document.querySelector(`#nombre_${muros[i].idMuro}`);
                        let nuevoPrecio = document.querySelector(`#precio_${muros[i].idMuro}`);
                        let imagen = json.imagen;
                        let nuevoStock = document.querySelector(`#stock_${muros[i].idMuro}`);
                        let nuevaDescripcion = document.querySelector(`#descripcion_${muros[i].idMuro}`);

                        let nuevoMuro = {
                            "nombre": nuevoNombre.value,
                            "precio": Number(nuevoPrecio.value),
                            "stock": Number(nuevoStock.value),
                            "imagen": imagen,
                            "descripcion": nuevaDescripcion.value,
                            "idsMateriales": idsMateriales
                        }
                        let respuesta = await fetch(`/muro/${muros[i].idMuro}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(nuevoMuro)
                        })
                        if (respuesta.ok) {
                            swal("Muro actualizado con exito", "", "success");
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

    async function loadMurosAdmin() {
        let respuesta = await fetch(`/usuario/all/id/${Number(window.sessionStorage.idUsuario)}`)
        if (respuesta.ok) {
            let murosAdmin = await respuesta.json();
            muros = murosAdmin.muros;
        }
        crearTabla();
    }
    loadMurosAdmin();

    container.style.display = "initial";
})




