import './css/styles.css';
import {fetchCountries} from './fetchCountries'
const DEBOUNCE_DELAY = 300;
var debounce = require('lodash.debounce');
// console.log(fetchCountries("Ukraine"))

const refs = {
    input: document.querySelector("input"),
    countrylist: document.querySelector(".country-list"),
    countryinfo: document.querySelector(".country-info"),
}

refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));


function searchCountry(event){
    const name = refs.input.value.trim();
    fetchCountries(name)
    .then((resp)=>{
        refs.countrylist.innerHTML = "";
        refs.countryinfo.innerHTML = "";
        // refs.countrylist.insertAdjacentHTML('beforeend', renderList(resp))
        console.log(resp) 
        if(name.length === 1){
            refs.countrylist.insertAdjacentHTML('beforeend', renderList(resp))
        }else{
            refs.countryinfo.insertAdjacentHTML('beforeend', renderInfo(resp))
        }
    })
    .catch((error)=>{
        console.log(error)
    })
}

function renderList(arryCountry){
    const markap = arryCountry.map(({name , flags})=>{
        return `<li>
        <img src="${flags.svg}" alt="${name.official}" width="50px" height="25px">
        <h1 class="title">"${name.official}"</h1>
        </li>`
    }).join("")
    return markap
}
function renderInfo(arryCountry){
    const markInfo = arryCountry.map(({name,capital,population,flags,languages})=>{
        return `<ul>
        <li>
        <img src="${flags.svg}" alt="${name.official}" width="25px" height="15px">
        <h1 class="title">${name.official}</h1>
        <p class="capital">Capital: ${capital} ;</p>
        <p class="population">Population: ${population} peoples;</p>
        <p class="languages">Languages: ${languages} ;</p>
        </li>
        </ul>
        `
    }).join("")
    return markInfo
}