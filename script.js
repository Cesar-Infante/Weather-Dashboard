//api key
const apiKey = '0ea29993b310996e906dcc76aebf0224';

//DOM elements
const timeEl = document.getElementById('time')
const dateEl = document.getElementById('date')
const currentWeatherItemsEl = document.getElementById('current-weather-items')
const timeZone = document.getElementById('time-zone')
const countryEl = document.getElementById('country')
const weatherForecastEl = document.getElementById('weather-forecast')
const currentTempEl = document.getElementById('current-temp')

// using momentjs to set time and date
dateEl.textContent = moment().format('dddd, MMMM Do, YYYY');
timeEl.textContent = moment().format('hh:mm A');

