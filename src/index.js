import './css/styles.css';
import {fetchCountries} from './fetchCountries'
import Notiflix from 'notiflix';

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
        let objectEd = resp.length;
        // refs.countrylist.insertAdjacentHTML('beforeend', renderList(resp))
        // console.log(resp) 
        // 3 && name.length > 1
        if(name.length <= objectEd){
            refs.countrylist.insertAdjacentHTML('beforeend', renderList(resp));
        }else{
            refs.countryinfo.insertAdjacentHTML('beforeend', renderInfo(resp));
            // flagBack(refs);
        }
        ifElse(objectEd)
    })
    .catch((error)=>{
        Notiflix.Notify.failure("Oops, there is no country with that name");
        refs.countrylist.innerHTML = "";
        refs.countryinfo.innerHTML = "";
        // console.log(error)
    })
}

function ifElse(objectEd){
    if(objectEd >= 10){
        Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
        refs.countrylist.innerHTML = "";
        refs.countryinfo.innerHTML = "";
    }
}

function renderList(arryCountry){
    const markap = arryCountry.map(({name , flags})=>{
        return `<li class="speedInfo">
        <img src="${flags.svg}" alt="${name.official}" width="60px" height="30px">
        <h1 class="title"> ${name.official} </h1>
        </li>`
    }).join("")
    return markap
}
function renderInfo(arryCountry){
    const markInfo = arryCountry.map(({name,capital,population,flags,languages})=>{
        return `<ul class="fullInfo">
        <li class="title_country">
        <img src="${flags.svg}" alt="${name.official}" width="40px" height="20px">
        <h1 class="title">${name.official}</h1>
        </li>
        <li>
        <p class="capital">Capital is ${capital} ;</p>
        </li>
        <li>
        <p class="population">Population: ${population} peoples;</p>
        </li>
        <li>
        <p class="languages">Languages: ${Object.values(languages)} ;</p>
        </li>
        </ul>
        `
    }).join("")
    return markInfo
}

// function flagBack(colors){
//     let backColor = document.querySelector('.fullInfo');
//     const countryFlag = colors.map(({flags})=>{
//         backColor.style.backgroundImage = `url(${flags.svg})`;
//     })
//     return countryFlag
// }