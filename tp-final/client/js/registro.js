
let btnRegistro = document.querySelector("#btnRegistro");
let password = document.querySelector("#password");
let inputContrasenia = document.querySelector("#contrasenia");
let confirmacionPassword = document.querySelector("#confirmacionPassword");
let inputConfirmacion = document.querySelector("#confirmacionContrasenia");
let usuarios = [];
btnRegistro.addEventListener("click", async () => {

    let inputEmail = document.querySelector("#email");
    let validacionEmail = /([a-zA-Z0-9])+@([a-zA-Z])+\.[com]/;
    let validacionContrasenia = /[\w-.@]{8,20}/; // BUSCAR MEJOR PORQUE NO ME VALIDA EL PUNTO MAXIMO

    if (validacionEmail.test(inputEmail.value) && validacionContrasenia.test(inputContrasenia.value) && inputContrasenia.value === inputConfirmacion.value) {
        let usuarioRepetido;

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].nombre === inputEmail.value) {
                usuarioRepetido = inputEmail.value;
            }
        }
        
        if (usuarioRepetido == undefined) {
            let usuario = {
                "nombre": inputEmail.value,
                "contrasenia": inputContrasenia.value,
                "rolIdRol": 2
            }
            let respuesta = await fetch("/usuario", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            if (respuesta.ok) {
                usuarios.push(usuario);
                loadUsuarios();
                console.log("Usuario Creado");
            }
            else {
                console.log("Error en la creacion")
            }
        }
        else {
            
            console.log("Error el email ya existe")
        }

    }
    else if (!validacionEmail.test(inputEmail.value)) {
        console.log("Formato de correo invalido");
    }
    else if (!validacionContrasenia.test(inputContrasenia.value)) {
        console.log("Formato de contraseña invalido");
    }
    else if (inputContrasenia.value != inputConfirmacion.value) {
        console.log("Las contraseñas no coinciden");
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




password.addEventListener("click", () => {
    if (inputContrasenia.getAttribute("type") == "password") {
        inputContrasenia.removeAttribute("type");
    }
    else {
        inputContrasenia.setAttribute("type", "password");
    }

})
confirmacionPassword.addEventListener("click", () => {
    if (inputConfirmacion.getAttribute("type") == "password") {
        inputConfirmacion.removeAttribute("type");
    }
    else {
        inputConfirmacion.setAttribute("type", "password");
    }

})