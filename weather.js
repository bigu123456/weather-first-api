// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = '6498b3255d6e916bd41bd3d9f1d677ee';

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid=${apiKey}&units=metric`;

const weatherContainer = document.getElementById('weather');
const weatherIconContainer = document.getElementById('weather-icon');
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityNameElement = document.getElementById('city-name');
const dateElement = document.getElementById('date');

searchButton.addEventListener('mouseout', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    cityInput.value = '';
  }
});

getWeather('Guildford');

function getWeather(city) {
  const url = apiUrl.replace('{CITY_NAME}', city);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const cityName = `${data.name}, ${data.sys.country}`;
      const currentDate = new Date().toLocaleDateString('en-US', { dateStyle: 'long' });
      const weatherCondition = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const temperature = data.main.temp;
      const pressure = data.main.pressure;
      const windSpeed = data.wind.speed;
      const humidity = data.main.humidity;

      const weatherHtml = `
        <div class="weather-parameter">
          <i class="wi wi-${getWeatherIcon(iconCode)} icon"></i>
          <div class="value">${weatherCondition}</div>
          <div class="label">Weather Condition</div>
        </div>
        <div class="weather-parameter">
          <i class="wi wi-thermometer icon"></i>
          <div class="value">${temperature}°C</div>
          <div class="label">Temperature</div>
        </div>
        <div class="weather-parameter">
          <i class="wi wi-barometer icon"></i>
          <div class="value">${pressure} hPa</div>
          <div class="label">Pressure</div>
        </div>
        <div class="weather-parameter">
          <i class="wi wi-strong-wind icon"></i>
          <div class="value">${windSpeed} m/s</div>
          <div class="label">Wind Speed</div>
        </div>
        <div class="weather-parameter">
          <i class="wi wi-humidity icon"></i>
          <div class="value">${humidity}%</div>
          <div class="label">Humidity</div>
        </div>
      `;

      weatherContainer.innerHTML = weatherHtml;

      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
      weatherIconContainer.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;

      cityNameElement.textContent = cityName;
      dateElement.textContent = currentDate;
    })
    .catch(error => {
      console.log('Error:', error);
      weatherContainer.textContent = 'Failed to fetch weather data.';
      weatherIconContainer.innerHTML = '';
    });
}

function getWeatherIcon(iconCode) {
  const iconMapping = {
    '01d': 'day-sunny',
    '02d': 'day-cloudy',
    '03d': 'cloud',
    '04d': 'cloudy',
    '09d': 'showers',
    '10d': 'day-rain',
    '11d': 'day-thunderstorm',
    '13d': 'day-snow',
    '50d': 'day-fog',
    '01n': 'night-clear',
    '02n': 'night-alt-cloudy',
    '03n': 'cloud',
    '04n': 'cloudy',
    '09n': 'showers',
    '10n': 'night-alt-rain',
    '11n': 'night-alt-thunderstorm',
    '13n': 'night-alt-snow',
    '50n': 'night-fog',
  };

  return iconMapping[iconCode] || 'na';
}
