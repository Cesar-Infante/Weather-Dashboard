//api key
const apiKey = '0ea29993b310996e906dcc76aebf0224';

//DOM elements
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const preloader = document.querySelector('.type-preloader')
// using momentjs to set time and date
dateEl.textContent = moment().format('dddd, MMMM Do, YYYY');
timeEl.textContent = moment().format('hh:mm A');

// Button to request weather
const weatherBtn = document.getElementById('btn');

// function to request location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(useGeoLocation);
  } else {
    preloader.textContent = 'Denied Weather Request';
  }
}

// If request is successful, let latitude and longitude equal to success.coords and make a fetch request,
// pass that data into showWeatherData
function useGeoLocation(success) {
  let { latitude, longitude } = success.coords;
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${apiKey}`).then(res => res.json()).then(data => {

    // console.log(data);
    showWeatherData(data);
  });
}

// event listener on weatherBtn
weatherBtn.addEventListener('click', getLocation);

// the data that gets passed in will be destructured into the following variables and into current,
// we then get timzone along with lat, lon
// and pass the data into a template literal and utilizing saferInnerHTML to ensure security.
const showWeatherData = (data) => {
  let { humidity, uvi, sunrise, sunset, wind_speed } = data.current;

  timeZone.textContent = data.timezone;
  countryEl.textContent = `${data.lat}N ${data.lon}E`;

  const template = `
    <div class="weather-item">
      <div>Humidity</div>
      <div>${humidity}%</div>
    </div>
    <div class="weather-item">
      <div>UV Index</div>
      <div>${uvi}%</div>
    </div>
    <div class="weather-item">
      <div>Wind Speed</div>
      <div>${wind_speed} mph</div>
    </div>
    <div class="weather-item">
      <div>Sunrise</div>
      <div>${window.moment(sunrise * 1000).format('hh:mm a')}</div>
    </div>
    <div class="weather-item">
      <div>Sunset</div>
      <div>${window.moment(sunset * 1000).format('hh:mm a')}</div>
    </div>
    `;
  saferInnerHTML(currentWeatherItemsEl, template);

  // template literal for each of the days following future forecast
  let otherDayForecast = '';
  data.daily.forEach((day, idx) => {
    if (idx === 0) {
      const currentTemp = `
            <img src="https://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;F</div>
                <div class="temp">Day - ${day.temp.day}&#176;F</div>
            </div>
            `
      saferInnerHTML(currentTempEl, currentTemp);
    } else {
      const otherDaysTemp = otherDayForecast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;F</div>
                <div class="temp">Day - ${day.temp.day}&#176;F</div>
            </div>
            `
      saferInnerHTML(weatherForecastEl, otherDaysTemp);
    };
  });
};