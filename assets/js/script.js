import { Get, Set } from "./localStorage.js";

const QUOTE_URL = ' https://thatsthespir.it/api';

const body = document.querySelector("body")
const btn = document.querySelector("button")

function generateQuote(section, element) {
    const blockquote = document.createElement('blockquote')
    blockquote.innerText = element
    section.appendChild(blockquote)
}

function generateImg(section, element) {
    const img = document.createElement("img")
    img.src= element
    section.appendChild(img)
}


function generateP(section, element, classAdded){
    const p = document.createElement('p')
    p.innerText = element
    p.classList.add(classAdded)
    section.appendChild(p)
}

function generateDiv(section) {
    const div = document.createElement("div")
    section.appendChild(div)
}


const fetchQuote = () => fetch(QUOTE_URL)


btn.addEventListener("click", ()=>{
    generatePage(true)
})

generatePage(false)

function generateTitle(element) {
    const h1 = document.querySelector("h1")
    h1.innerText = `A quote from ${element}`
}
let initialObject = {
    author:"",
    quote:"",
    photo:""
}

function generatePage(bool) {
    let initialPage = Get("quote", initialObject)
    const section = document.querySelector("#containerQuote")
    const div = document.querySelector("div")
    if (initialPage.author!=="" && bool==false) { //il y a quelque chose dans le get -> tu affiches ca
        section.innerHTML=""
        generateDiv(section)
        generateQuote(div, initialPage.quote)
            if (!initialPage.photo) {
                generateImg(div, "./assets/img/cat.jpg")
            } else{
                generateImg(div, initialPage.photo)
            }
            generateP(div, initialPage.author,"author")
            generateTitle(initialPage.author)
    }
    else{
    fetchQuote()
        .then((response) => response.json())
        .then((json) => {
            Set("quote", json)
            section.innerHTML=""
            generateDiv(section)
            generateQuote(div, json.quote)
            if (!json.photo) {
                generateImg(div, "./assets/img/cat.jpg")
            } else{
                generateImg(div, json.photo)
            }
            generateP(div, json.author,"author")
            generateTitle(json.author)
        }) 
    }
}
