const dropArea = document.querySelector(".drag-area");
let dragText = dropArea.querySelector("header");
let button = dropArea.querySelector("button");
let input = dropArea.querySelector("input");
let file;

button.onclick = () => {
    input.click();
}
console.log(input)
input.addEventListener("change", ()=> {
    file = this.file[0];
    dropArea.classList.add("active");
    showFile();
})

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
})

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
})

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showFile();
})

// dropArea.addEventListener("drop", (event) => {
//     event.preventDefault();

//     file = event.dataTransfer.files[0];
//     showFile();
// })

function showFile(){
    let fileType = file.type;
    let validExtensions = ["image/jpeg","image/jpg","image/png"];
    if(validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileUrl = fileReader.result;
            let imgTag = `<img src="${fileUrl}" alt="">`;

            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    }
    else {
        alert("Esto no es un archivo de imagen")
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}