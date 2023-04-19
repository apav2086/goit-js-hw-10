import './css/styles.css';
import API from './js/fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list')
function checkAPI(e) {
    const userInput = e.target.value.trim();
    if (userInput === '') {
        countryList.innerHTML = '';
    }
    API.fetchCountries(userInput).then(data => {
        console.log(data);
        if (data.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (data.length > 1 && data.length <= 10) {
            data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<img src=${item.flags.svg}/>
                <h3>${item.name.official} </h3>`;
                countryList.append(li);
                countryList.setAttribute('style', 'list-style: none');
            });
        } else if (data.length === 1) {
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
            <img src=${item.flags.svg}/>
                <h3>${item.name.official} </h3>
                <h4>Capital: ${item.capital}</h4>
       <h4>Population:${item.population}</h4>
       <h4>Languages:${item.languages}</h4>`;
        
        } else if (data.lenght === 0) {
            Notiflix.Notify.failure("Oops, there is no country with that name");
        }
    });
};

inputEl.addEventListener('input', debounce(checkAPI, DEBOUNCE_DELAY));