const container = document.querySelector(".container");
const imgInput = document.getElementById("imgInput");
const selections = document.querySelector(".selections");
const unit = document.getElementById("unit");
const pixel = document.getElementById("pixel");
const percent = document.getElementById("percent");
const percentage = document.getElementById("percentage");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const quality = document.getElementById("quality");
let imgResized = false;

imgInput.addEventListener("change", () => {
    let imgFile = imgInput.files[0];
    let readFile = new FileReader();
    readFile.onload = (e) => {
        createImagePreview(imgFile, e.target.result);
        selections.style.display = "block";
        quality.addEventListener("input", () => {
            document.getElementById("qualityValue").textContent = quality.value;
        })
        pixel.style.display = "block";
        unit.addEventListener("change", () => {
            if(unit.value === "Pixels"){
                pixel.style.display = "block";
                percent.style.display = "none";
            }
            else if(unit.value === "Percentage"){
                percent.style.display = "block";
                pixel.style.display = "none";
            }
        })

        const button = document.createElement("button");
        button.textContent = `Resize & Compress`;
        container.appendChild(button);

        button.addEventListener("click", () => {
            if(imgResized){
                return;
            }
            let width;
            let height;
            if(unit.value === "Percentage"){
                const percentValue = parseInt(percentage.value);
                if(isNaN(percentValue) || percentValue < 0 || percentValue > 100){
                    alert("Please enter a valid percentage value");
                    return;
                }
                width = (document.getElementById("img").width * percentValue) / 100;
                height = (document.getElementById("img").height * percentValue) / 100;
                widthInput.value = width;
                heightInput.value = height;
            }
            else{
                width = parseInt(widthInput.value);
                height = parseInt(heightInput.value);
            }

            const a = document.createElement("a");
            a.textContent = `Download Compressed Image`;
            a.classList.add("downloadButton");

            let qualityValue = parseInt(quality.value) /100;
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let imgObj = new Image();
            imgObj.onload = () => {
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(imgObj,0, 0, width, height);
                let resizedDataUrl = canvas.toDataURL("image/jpeg",qualityValue);
                document.getElementById("img").src = resizedDataUrl;

                a.href = resizedDataUrl;
                a.download = `compressed-image.jpg`;
            }
            imgObj.onerror = () =>{
                button.textContent = `Error`;
            }
            container.appendChild(a);
            imgObj.src = document.getElementById("img").src;

            updateDimensions();
        })
        
    }
    readFile.readAsDataURL(imgFile);
})

function createImagePreview(imgFile, result) {
    const imgPrev = document.createElement("div");
    imgPrev.classList.add("imgPrev");
    const h2 = document.createElement("h2");
    h2.textContent = `Preview:`;
    imgPrev.appendChild(h2);

    const img = document.createElement("img");
    img.id = `img`;
    img.src = result;
    imgPrev.appendChild(img);

    const imgDesc = document.createElement("p");
    imgDesc.id = `imgDesc`;
    imgDesc.classList.add("imgDesc");
    try{
        const image = new Image();
        image.onload = () => {
            const width = image.width;
            const height = image.height;
            URL.revokeObjectURL(image.src);
            imgDesc.textContent = `Image Dimensions: ${width} x ${height} px`;
        }
        image.onerror = () => {
            imgDesc.textContent = "Error loading image dimensions.";
        }
        image.src = URL.createObjectURL(imgFile);
    }
    catch (error) {
        console.error(`Error creating image preview: ${error}`);
    }
    imgPrev.appendChild(imgDesc);

    container.insertBefore(imgPrev, selections);
}
    
function updateDimensions() {
    if(unit.value === "Pixels"){
        document.getElementById("imgDesc").textContent = `Image Dimensions: ${widthInput.value} x ${heightInput.value} px`;
    }
    else{
        const percentValue = parseInt(percentage.value);
        if(!isNaN(percentValue)){
            const width = (document.getElementById("img").width * percentValue) / 100;
            const height = (document.getElementById("img").height * percentValue) / 100;
            document.getElementById("imgDesc").textContent = `Image Dimensions: ${Math.floor(width)} x ${Math.floor(height)} px`;
        }
    }
}