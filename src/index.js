function showTemperature(response){
  let celsius = document.querySelector(".temperature")
  let currentCity = document.querySelector("#current-city");
  let description = document.querySelector("#condition-description");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let icon = document.querySelector("#current-icon");

  celsius.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function search(city) {
  let apiKey = "aae79086babd8e5274d8186968279eae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  search(cityInput.value);
}

function showCity(response) {
  search(response.data.list[0].name);
}

function showPosition (position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let cityCount = 1;
  let apiKey = "aae79086babd8e5274d8186968279eae";
  let currentCityUrl = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${cityCount}&appid=${apiKey}&units=metric`;
  axios.get(currentCityUrl).then(showCity);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheit(event){
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9)/5+32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event){
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;
let fahrenheitTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit-button");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius-button");
celsius.addEventListener("click", displayCelsius);


let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let date = now.getDate();
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
  "December"
];
let month = months[now.getMonth()];
let hours = now.getHours();
    if (hours <10){
    hours = `0${hours}`;
  }
let minutes = now.getMinutes();
    if (minutes <10){
    minutes = `0${minutes}`;
  }
let changeDate = document.querySelector(".current-date-time");
changeDate.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;


search("Berlin");