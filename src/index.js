function showTemperature(response){
  console.log(response.data);
}


let apiKey = "aae79086babd8e5274d8186968279eae";
let cityName = 'London';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

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

let changeDate = document.querySelector(".current-date-time");
changeDate.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}`;
