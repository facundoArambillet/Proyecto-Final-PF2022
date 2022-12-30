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
        console.log("Sesion iniciada correctamente");
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
