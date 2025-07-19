const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

const themeBtn = document.getElementById('themeBtn');
const body = document.body;

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const icon = themeBtn.querySelector('i');
  icon.classList.toggle('fa-sun');
  icon.classList.toggle('fa-moon');
});

function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (city) fetchWeather(city);
}

function fetchWeather(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => updateUI(data))
    .catch(() => alert('City not found or API error.'));
}

function updateUI(data) {
  if (!data || data.cod !== 200) return;

  const iconMap = {
    Clear: 'fa-sun',
    Clouds: 'fa-cloud',
    Rain: 'fa-cloud-showers-heavy',
    Thunderstorm: 'fa-bolt',
    Snow: 'fa-snowflake',
    Drizzle: 'fa-cloud-rain',
    Mist: 'fa-smog'
  };

  document.getElementById('temperature').innerText = `${data.main.temp} °C`;
  document.getElementById('description').innerText = data.weather[0].description;
  document.getElementById('location').innerText = `📍 ${data.name}, ${data.sys.country}`;
  document.getElementById('humidity').innerText = `💧 Humidity: ${data.main.humidity}%`;
  document.getElementById('wind').innerText = `💨 Wind: ${data.wind.speed} km/h`;

  const iconClass = iconMap[data.weather[0].main] || 'fa-cloud';
  document.getElementById('weatherIcon').className = `fas ${iconClass}`;
}

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => updateUI(data));
    });
  }
});