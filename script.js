const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

// Function to fetch weather data
async function fetchWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  return data;
}

// Function to display weather data
function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

  // Set weather icon based on weather condition
  const iconCode = data.weather[0].icon;
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">`;
}

// Event listener for search button
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (city) {
    try {
      const weatherData = await fetchWeather(city);
      displayWeather(weatherData);
    } catch (error) {
      alert("City not found. Please try again.");
    }
  } else {
    alert("Please enter a city name.");
  }
});

// Optional: Fetch weather for a default city on page load
window.onload = async () => {
  const defaultCity = "London";
  const weatherData = await fetchWeather(defaultCity);
  displayWeather(weatherData);
};
