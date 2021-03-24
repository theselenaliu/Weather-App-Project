//Feature #1

let now = new Date();
let currentHour = now.getHours();
let currentMinutes = String(now.getMinutes()).padStart(2, "0");
let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let currentDay = days[now.getDay()];
let currentDateTime = `${currentDay}, ${currentHour}:${currentMinutes}`;

let currentTimestamp = document.getElementById("currentCityTime");
currentTimestamp.innerHTML = currentDateTime;

//Feature #2

let temperature = null;

function searchResult(event) {
	event.preventDefault();
	let cityElement = document.querySelector("#currentCity");
	let cityInput = document.querySelector("#search");

	cityElement.innerHTML = cityInput.value;
	searchCity(cityInput);
}

function showTemperature(response) {
	console.log("temp" + response.data.main.temp);
	document.querySelector("#currentCity").innerHTML = response.data.name;

	temperature = Math.round(response.data.main.temp);

	let weatherDescription = response.data.weather[0].description;
	let temperatureElement = document.querySelector("#temperature");
	let weatherDescriptionElement = document.querySelector(
		"#weather-text-description"
	);
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let iconElement = document.querySelector("#icon");

	temperatureElement.innerHTML = `${temperature}`;
	weatherDescriptionElement.innerHTML = weatherDescription;

	windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
	humidityElement.innerHTML = response.data.main.humidity;
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
	let forecastElement = document.querySelector("#forecast");
	forecastElement.innerHTML = null;
	let forecast = null;
	let forecastTitle = document.querySelector("#forecast-title");
	for (let index = 0; index < 6; index++) {
		forecast = response.data.list[index];
		forecastTitle.innerHTML = "3-Hourly Forecast";
		forecastElement.innerHTML += `<div class="row"> <div class="col" id="forecast-time">${formatHours(
			forecast.dt * 1000
		)}</div>
							<div class="col"> <img
        src="http://openweathermap.org/img/wn/${
					forecast.weather[0].icon
				}@2x.png"
      />
        ${Math.round(forecast.main.temp_min)}°
      </div></div>
							
	</div>
  `;
	}
}
function formatHours(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${hours}:${minutes}`;
}

function searchCity(cityInput) {
	let apiKey = "78238a72c5a21c61b3b1fb1a5792932d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showTemperature);

	apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchResult);

function searchLocation(position) {
	let apiKey = "78238a72c5a21c61b3b1fb1a5792932d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(showTemperature);

	apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.latitude}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function convertToFahrenheit(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	let fahrenheitTemp = Math.round((temperature * 9) / 5 + 32);
	temperatureElement.innerHTML = fahrenheitTemp;
}

function convertToCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	let celsiusTemp = Math.round(temperature);
	temperatureElement.innerHTML = celsiusTemp;
}

var fahrenheitLink = document.querySelector("#currentFahreinheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
var celsiusLink = document.querySelector("#currentCelsius");
celsiusLink.addEventListener("click", convertToCelsius);
