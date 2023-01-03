let usuarios = [];
let inputEmail = document.querySelector("#typeEmailX")
let password = document.querySelector("#password");
let inputPassword = document.querySelector("#typePasswordX");
let logueo = document.querySelector("#logueo");

logueo.addEventListener("click", async () => {

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
        let datos = {
            "nombre": json.usuario.nombre,
            "token": json.token
        }
        console.log(datos);
        window.sessionStorage.setItem("loginOk", true);
        window.sessionStorage.setItem('ingreso', datos);
        console.log(window.sessionStorage.getItem("loginOk") )
        window.location.href = './index.html';
        console.log("Sesion iniciada correctamente");
    }
    else  {
        window.sessionStorage.setItem("loginOk", false);
        window.sessionStorage.setItem('ingreso', '');
        //console.clear() BUSCAR COMO HACER PARA QUE NO ME APAREZCAN EL ERROR DEL POST
        swal.fire("Email o Contraseña invalidos");
    }

})

password.addEventListener("click", () => {
    if (inputPassword.getAttribute("type") == "password") {
        inputPassword.removeAttribute("type");
    }
    else {
        inputPassword.setAttribute("type", "password");
    }

})

async function loadUsuarios() {
    usuarios = [];
    let respuesta = await fetch("/usuario");
    if (respuesta.ok) {
        let json = await respuesta.json();
        usuarios = json;
    }
}
loadUsuarios();
