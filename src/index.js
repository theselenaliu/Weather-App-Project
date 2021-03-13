//Feature #1

let now = new Date();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
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
	let temperature = Math.round(response.data.main.temp);
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = `${temperature}`;
	let celsiusTemp = Math.round(temperature);
	let fahrenheitTemp = Math.round((temperature * 9) / 5 + 32);
}

function searchCity(cityInput) {
	let apiKey = "78238a72c5a21c61b3b1fb1a5792932d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchResult);

function searchLocation(position) {
	let apiKey = "78238a72c5a21c61b3b1fb1a5792932d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Feature #3

let temperature = 25;
let celsiusTemp = Math.round(temperature);
let fahrenheitTemp = Math.round((temperature * 9) / 5 + 32);

function convertToFahrenheit(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = fahrenheitTemp;
}

function convertToCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = celsiusTemp;
}

var fahrenheitLink = document.querySelector("#currentFahreinheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
var celsiusLink = document.querySelector("#currentCelsius");
celsiusLink.addEventListener("click", convertToCelsius);
