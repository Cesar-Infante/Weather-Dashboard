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

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`).then(res => res.json()).then(data => {

            console.log(data)
            showWeatherData(data);
        })

    })
}

getWeatherData()

const showWeatherData = (data) => {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current
    const template = `
    <div class="weather-item">
      <div>Humidity</div>
      <div>${humidity}</div>
    </div>
    <div class="weather-item">
      <div>Pressure</div>
      <div>${pressure}</div>
    </div>
    <div class="weather-item">
      <div>wind Speed</div>
      <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
      <div>Sunrise</div>
      <div>${window.moment(sunrise * 1000).format('hh:mm a')}</div>
    </div>
    <div class="weather-item">
      <div>Sunset</div>
      <div>${window.moment(sunset * 1000).format('hh:mm a')}</div>
    </div>
    `
    saferInnerHTML(currentWeatherItemsEl, template)
}