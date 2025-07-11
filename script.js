const apiKey = 'Y7T5VEMTF3HXTTUT6P2DYS8XA'; // Replace with your key

async function getWeather(location, isCelsius = false) {
  const unit = isCelsius ? 'metric' : 'us';
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unit}&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Failed to fetch weather data: " + error.message);
    console.error("Fetch error:", error);
  }
}


function processWeatherData(data) {
  return {
    location: data.resolvedAddress,
    temp: data.currentConditions.temp,
    conditions: data.currentConditions.conditions,
    icon: data.currentConditions.icon
  };
}


function displayWeather(weather) {
  const display = document.getElementById("weather-display");

  display.innerHTML = `
    <h2>${weather.location}</h2>
    <p><strong>Conditions:</strong> ${weather.conditions}</p>
    <p><strong>Temperature:</strong> ${weather.temp}°</p>
    <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${weather.icon}.png" alt="${weather.conditions}" />
  `;
}


function showLoading(isLoading) {
  const loader = document.getElementById('loading');
  loader.classList.toggle('hidden', !isLoading);
}

// Event Listener for form
document.getElementById('weather-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = document.getElementById('location-input').value;
  const isCelsius = document.getElementById('unit-toggle').checked;

  showLoading(true);
  const rawData = await getWeather(location, isCelsius);
  const weather = processWeatherData(rawData);
  showLoading(false);
  displayWeather(weather);
});

window.addEventListener("DOMContentLoaded", async () => {
  const defaultLocation = "New Delhi";
  const isCelsius = document.getElementById("unit-toggle").checked;

  showLoading(true);
  const rawData = await getWeather(defaultLocation, isCelsius);
  const weather = processWeatherData(rawData);
  showLoading(false);
  displayWeather(weather);
});

