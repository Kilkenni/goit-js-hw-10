import './css/styles.css';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputElem = document.querySelector("#search-box");
const countryListElem = document.querySelector(".country-list");
const countryInfoElem = document.querySelector(".country-info");

//console.log(inputElem.value);

function onSearchInput() {
    const trimmedCountry = inputElem.value.trim();
    if (trimmedCountry !== "") {
        fetchCountries(trimmedCountry)
            .then((countriesJSON) => {
                if (countriesJSON.length > 10) {
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                    return;
                }
                
                if ((countriesJSON.length >= 2) && (countriesJSON.length <= 10)) {
                    let markup = "";
                    //for
                    console.log(countriesJSON);
                    return;
                }

                if (countriesJSON.length === 1) {
                    countryInfoElem.innerHTML = "";

                    countryInfoElem.insertAdjacentHTML("beforeend", getSingleCountryMarkup(countriesJSON));
                    return;
                }
            })
            .catch((error) => {
                Notiflix.Notify.failure("Oops, there is no country with that name");
            });
    }
}

function getSingleCountryMarkup(countriesJSON) {
    const countryMarkup =  countriesJSON.map((country) => {
        return `<h1 class="country-name"><img src=${country.flags.svg} alt="country flag" width="100">${country.name.official}</h1>
        <p><span>Capital: </span>${country.capital}</p>
        <p><span>Population: </span>${country.population}</p>
        <p><span>Languages: </span>${Object.values(country.languages).join(", ")}</p>`;
    }).join("");
    return countryMarkup;
}


inputElem.addEventListener("input", debounce(onSearchInput, DEBOUNCE_DELAY));
