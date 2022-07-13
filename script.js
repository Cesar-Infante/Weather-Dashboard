/* DOM Elements */
const currentCity = document.querySelector('.currentCity');
const dateEl = document.querySelector('#todaysDate');
const weatherContainer = document.querySelector('#todaysWeatherContainer');
const weatherValue = document.querySelector('#todaysWeatherValue');
const currentTempEl = document.querySelector('#currentTempEl');
const currentWindEl = document.querySelector('#currentWindEl');
const currentHumidityEl = document.querySelector('#currentHumidityEl');
const currentUvEl = document.querySelector('#currentUvEl');
const cardDate = document.querySelectorAll('.cardDate');
const recentSearches = document.querySelector('#recentSearches');
const searchBar = document.querySelector('.searchBar');
const searchBtn = document.querySelector('.btn');
const cityForm = document.querySelector('#cityForm');
console.log(cityForm);
// console.log(cardDate)

/* Declaring a constant variable called apiKey and assigning it the value of the string*/
const apiKey = '0ea29993b310996e906dcc76aebf0224';

/* This is a constant variable called dateEl that is selecting the element with the id of todaysDate. */
dateEl.textContent = moment().format('dddd, MMMM Do, YYYY');

for (let i = 0; i < cardDate.length; i++) {
    cardDate[i].textContent = moment().add(i + 1, 'd').format("dddd, MMMM Do");
}

function showRecentSearches(event) {
    event.preventDefault();

}





