function showTemperature(response) {
  let temperature = Math.round(response.data.list[0].main.temp);
  let celsius = document.querySelector("#celsius-button");
  celsius.innerHTML = `${temperature}°C`;
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchInput.value}`;
  let apiKey = "aae79086babd8e5274d8186968279eae";
  let currentTempUrl = `https://api.openweathermap.org/data/2.5/find?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(currentTempUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function showCurrentTemp(response) {
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = response.data.list[0].name;
  let temperature = Math.round(response.data.list[0].main.temp);
  let celsius = document.querySelector("#celsius-button");
  celsius.innerHTML = `${temperature}°C`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let cityCount = 1;
  let apiKey = "aae79086babd8e5274d8186968279eae";
  let currentCityUrl = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${cityCount}&appid=${apiKey}&units=metric`;
  axios.get(currentCityUrl).then(showCurrentTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}













let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);

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

let changeDate = document.querySelector(".current-date-time");
changeDate.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}`;
