// let usuarios = [];
let inputEmail = document.querySelector("#typeEmailX")
let password = document.querySelector("#password");
let inputPassword = document.querySelector("#typePasswordX");
let logueo = document.querySelector("#logueo");

async function  cargarData() {
    let usuario = {
        "nombre": inputEmail.value,
        "contrasenia": inputPassword.value,
    }
    //console.log(usuario)
    let respuesta = await fetch("usuario/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    if (respuesta.ok) {
        let json = await respuesta.json();
        console.log(json)
        // let datos = {   //SI LO HAGO ASI NO ME DEJA ACCEDER A LOS DATOS(EL VALOR DE DATOS ME APARECERIA COMO [OBJECT,OBJECT])
        //     "nombre": json.usuario.nombre,
        //     "token": json.token
        // }
        //console.log(datos);
        window.sessionStorage.setItem("loginOk", true);
        window.sessionStorage.setItem("idUsuario", json.usuario.idUsuario);
        window.sessionStorage.setItem("nombre", json.usuario.nombre);
        window.sessionStorage.setItem("idRol", json.usuario.rolIdRol);
        window.sessionStorage.setItem("token", json.token);
        console.log(window.sessionStorage.getItem("loginOk") );
        window.location.href = './index.html';
        console.log("Sesion iniciada correctamente");
    }
    else  {
        window.sessionStorage.clear()
        //console.clear() BUSCAR COMO HACER PARA QUE NO ME APAREZCAN EL ERROR DEL POST
        swal("Email o Contraseña invalidos","","error");
    }
}
logueo.addEventListener("click", cargarData);
window.onkeydown = function (event){ // FUNCION QUE SIRVE PARA LOGUEARTE APRETANDO ENTER
    if (event.keyCode == '13'){
        cargarData();
    }
 }
password.addEventListener("click", () => {
    if (inputPassword.getAttribute("type") == "password") {
        inputPassword.removeAttribute("type");
    }
    else {
        inputPassword.setAttribute("type", "password");
    }

})

// async function loadUsuarios() {
//     usuarios = [];
//     let respuesta = await fetch("/usuario");
//     if (respuesta.ok) {
//         let json = await respuesta.json();
//         usuarios = json;
//     }
// }
// loadUsuarios();
