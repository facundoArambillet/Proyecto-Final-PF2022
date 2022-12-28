let password = document.querySelector("#password");
let inputPassword = document.querySelector("#typePasswordX");

password.addEventListener("click", () => {
    if(inputPassword.getAttribute("type") == "password") {
        inputPassword.removeAttribute("type");
    }
    else {
        inputPassword.setAttribute("type","password");
    }

})