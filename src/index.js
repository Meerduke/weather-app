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


let apiKey = "aae79086babd8e5274d8186968279eae";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
let form = document.querySelector("#search-text-input")
form.addEventListener("click", showTemperature);

axios.get(apiUrl).then(showTemperature);


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
