/* Elements References */
const addCard = document.getElementById("addCard");
const displayCard = document.getElementById("displayCard");
const loadingCard = document.getElementById("loadingCard");
const downloadCard = document.getElementById("downloadCard");

const fileInput = document.getElementById("fileInput");

const displayImage = document.getElementById("display-img");

const startButton = document.getElementById("startBtn");

const image_before = document.querySelector(".image-before");
const image_after = document.querySelector(".image-after");

const uploadAnother = document.getElementById("uploadAnother");

const downloadHref = document.getElementById("downloadHref");


/* ------ */

let file = null;

const reader = new FileReader();
const formData = new FormData();

const API_URL = "https://api.remove.bg/v1.0/removebg";
const API_KEY = "ZWkioNGkCygHJrhUsymgyCah";


activeScreen(addCard);


fileInput.addEventListener("input", () => {
    file = fileInput.files[0];
    reader.readAsDataURL(file)
    reader.onloadend = () => {
        displayImage.setAttribute("src", reader.result);
        image_before.setAttribute("src", reader.result);
    };
    activeScreen(displayCard)
})


startButton.addEventListener("click", () => {
    formData.append("image_file", file);
    activeScreen(loadingCard);
    fetch(API_URL, {
        method: "POST",
        headers: {
            'X-Api-Key': API_KEY
        },
        body: formData,
    }).then(
        (response) => response.blob()
    ).then(
        (blob) => {
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                image_after.src = reader.result;
                downloadHref.setAttribute("href", reader.result)
            };
            activeScreen(downloadCard)
        }
    )
})


uploadAnother.addEventListener("click", () => {
    window.location.reload()
})



// active screen function
function activeScreen(screen) {
    [addCard, displayCard, loadingCard, downloadCard].forEach(screen => {
        screen.style.display = "none"
    })
    screen.style.display = "flex";
}
