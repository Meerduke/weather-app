function showTemperature(response){
  let celsius = document.querySelector(".temperature")
  let currentCity = document.querySelector("#current-city");
  let description = document.querySelector("#condition-description");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let icon = document.querySelector("#current-icon");
  let changeDate = document.querySelector(".current-date-time");

  celsiusTemperature = response.data.main.temp;

  celsius.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  changeDate.innerHTML = formatDate(response.data.dt*1000);

  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${units}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&${units}`;
  axios.get(apiUrl).then(showForecast);
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
  let currentCityUrl = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${cityCount}&appid=${apiKey}&${units}`;
  axios.get(currentCityUrl).then(showCity);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheit(event){
  event.preventDefault();
  let temperature = document.querySelector(".temperature");

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9)/5+32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event){
  event.preventDefault();
  let temperature = document.querySelector(".temperature");

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  temperature.innerHTML = Math.round(celsiusTemperature);
}

function formatHours (timestamp){
  let now = new Date(timestamp);
  let hours = now.getHours();
    if (hours <10){
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
    if (minutes <10){
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showForecast(response){
  let forecast = null;
  let forecastElement = document.querySelector(".forecast");
  forecastElement.innerHTML = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-md-auto">
                                  ${formatHours (forecast.dt * 1000)}
                                    <br />
                                  <img
                                    src = "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                                    alt = "weather icon"
                                  />
                                    <br />
                                  <span>
                                    ${Math.round(forecast.main.temp_max)}°C | ${Math.round(forecast.main.temp_min)}°C
                                  </span>
                                  <br />
                                  <div>
                                    max | min
                                  </div>
                                 </div>`  

  }                        
}

function formatDate (timestamp){
  let now = new Date(timestamp);
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
  
return `${day} ${date} ${month} ${formatHours(timestamp)}`;

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

let units = "units=metric";
let apiKey = "aae79086babd8e5274d8186968279eae";



search("Berlin");