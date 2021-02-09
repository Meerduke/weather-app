function showTemperature(response){
  let celsius = document.querySelector("#temperature")
  celsius.innerHTML = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let description = document.querySelector("#condition-description");
  description.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let icon = document.querySelector("#current-icon");
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
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
  console.log(position.coords.latitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let cityCount = 1;
  let apiKey = "aae79086babd8e5274d8186968279eae";
  let currentCityUrl = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${cityCount}&appid=${apiKey}&units=metric`;
  console.log(currentCityUrl);
  axios.get(currentCityUrl).then(showCity);
}

function getCurrentLocation(event) {
  event.preventDefault();
  console.log(navigator);
  navigator.geolocation.getCurrentPosition(showPosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Berlin");

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
let minutes = now.getMinutes();
  if (minutes <10){
    minutes = `0${minutes}`;
  }
let changeDate = document.querySelector(".current-date-time");
changeDate.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}`;
