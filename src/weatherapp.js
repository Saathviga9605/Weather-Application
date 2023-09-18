let now = new Date();
let h2 = document.querySelector(".calendar");

let minutes = now.getMinutes();
let hours = now.getHours();

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

if (minutes < 10) {
  h2.innerHTML = `${day}, ${hours}:0${minutes}`;
} else {
  h2.innerHTML = `${day}, ${hours}:${minutes}`;
}

let form = document.querySelector("#search-form");

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".text");
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = `${searchInput.value}`;
  fetchWeather(searchInput.value);
}

form.addEventListener("submit", search);

let apikey = "9aea41cabd59435563a6686b4ee04401";

function fetchWeather(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    let temp = document.querySelector("#temperature");
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let h3 = document.querySelector("h3");
    h3.innerHTML = `${description}`;

    temp.innerHTML = `${temperature}`;
  });
}

function showPosition(position) {
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}&units=metric`;

  axios
    .get(apiurl)
    .then(function (response) {
      let temperatureElement = document.querySelector("#temperature");
      let cityNameElement = document.querySelector(".city-name");
      temperatureElement.innerHTML = response.data.main.temp;
      cityNameElement.innerHTML = response.data.name;
      let humidityElement = document.querySelector("#humidity");
      let windElement = document.querySelector("#wind");
      let iconElement = document.querySelector("#icon");
      humidityElement.innerHTML = response.data.main.humidity;
      windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
      iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description);
    
    })
    .catch(function (error) {
      console.error("Weather API Error:", error);
    });
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location-btn");
button.addEventListener("click", getCurrentPosition);
