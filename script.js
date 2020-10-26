function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("#city");

  console.log(searchInput.value);
  h1.innerHTML = `${searchInput.value}`;

  searchCity(searchInput.value);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function weather(response) {
  console.log(response.data.main.temp);

  let temperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("#temperature-now");
  heading.innerHTML = `${temperature}`;
}

function searchCity(city) {
  let apiKey = "b032d609bc74d1e42dce6078fbbffc67";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(weather);
}

function showPosition(position) {
  let h1 = document.querySelector("#city");
  h1.innerHTML = "St. Gallen";
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "b032d609bc74d1e42dce6078fbbffc67";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=Switzerland&units=metric";

  axios.get(`${apiUrl}&appid=${apiKey}`).then(weather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);
