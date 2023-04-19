import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import { createMarkup, onShowCountryList  } from './js/markup.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(e) {
    const userInput = e.target.value.trim();
    if (userInput === '') {
        countryList.innerHTML = '';
        countryInfoEl.innerHTML = '';
    }
    if (userInput) {
        fetchCountries(userInput).then(positiveProcess).catch(negativeProcess)
        }
};

function positiveProcess(data) {
    if (data.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        countryList.innerHTML = '';
        countryInfoEl.innerHTML = '';
    }
    if (data.length >= 2 && data.length <= 10) {
        countryInfoEl.innerHTML = '';
        countryList.innerHTML = data
            .map(country => onShowCountryList(country))
            .join('');
    }
    if (data.length === 1) {
        countryList.innerHTML = '';
        countryInfoEl.innerHTML = data.map(country => createMarkup(country)).join('')
    }
}
function negativeProcess(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
    countryList.innerHTML = '';
    countryInfoEl.innerHTML = '';
    throw new Error(error); 
}

