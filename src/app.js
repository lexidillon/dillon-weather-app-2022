let now = new Date();
let p = document.querySelector("p");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let month = now.getMonth();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let calendarMonth = months[now.getMonth()];

p.innerHTML = `${day}, ${calendarMonth} ${date}, ${year}, ${hours}:${minutes}`;

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

function displayCurrentWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  fahrenheitTemp = response.data.main.temp;
  document.querySelector("#main-temperature").innerHTML =
    Math.round(fahrenheitTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-status").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#weather-form");
searchForm.addEventListener("submit", handleSubmit);

function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let unit = "imperial";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

let currentCity = document.querySelector("#current-city-button");
currentCity.addEventListener("click", getCurrentWeather);

function displayCelsius(event) {
  event.preventDefault();
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  let temperature = document.querySelector("#main-temperature");
  temperature.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

function displayFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temperature");
  fahrenheitLink.classList.remove("inactive");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.add("inactive");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let fahrenheitTemp = null;

searchCity("Virginia Beach");
