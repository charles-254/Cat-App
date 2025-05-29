let imageResultsWrapper = document.querySelector(".image-results-wrapper")
let factsResultWrapper = document.querySelector(".facts-results-wrapper")
const imgSubmitBtn = document.querySelector("#image-submit-btn")
const factSubmitBtn = document.querySelector("#fact-submit-button")
const loaderContainer = document.querySelector(".loader-container")

async function getCatPhotos() {
    imageResultsWrapper.innerHTML = null
    factsResultWrapper.innerHTML = null

    try {
        let numOfPhotos = document.querySelector("#number-of-photos").value
        
        if (Number(numOfPhotos) < 1) {
            numOfPhotos = 1
        } if (Number(numOfPhotos) > 10) {
            numOfPhotos = 10
        }
        let response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${numOfPhotos}`)
        let data = await response.data

        for (let i = 0; i < numOfPhotos; i++) {
            let div = document.createElement("div")
            div.classList.add("image-results")
            div.style.backgroundImage = `url(${data[i].url})`
            imageResultsWrapper.appendChild(div)
        }

    } catch (error) {
        console.log(error)
    }
    loaderContainer.style.display = "none"
}

async function getCatFacts() {
    imageResultsWrapper.innerHTML = null
    factsResultWrapper.innerHTML = null

    try {
        let numOfFacts = document.querySelector("#number-of-facts").value
        
        if (Number(numOfFacts) < 1) {
            numOfFacts = 1
        }
        if (Number(numOfFacts) > 50) {
            numOfFacts = 50
        }

        let response = await axios.get(`https://meowfacts.herokuapp.com/?count=${numOfFacts}`)
        let data = await response.data
        let ol = document.createElement("ol")

        for (let i = 0; i < data.data.length; i++) {
            let li = document.createElement("li")
            li.innerHTML = data.data[i]
            ol.appendChild(li)
        }

        factsResultWrapper.appendChild(ol)

    } catch (error) {
        console.log(error)
    }
    loaderContainer.style.display = "none"
}

imgSubmitBtn.addEventListener("click", function () {
    loaderContainer.style.display = "flex"
    getCatPhotos()
    
})

factSubmitBtn.addEventListener("click", function () {
    loaderContainer.style.display = "flex"
    getCatFacts()
    
})