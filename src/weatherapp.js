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

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;



let apikey = "9aea41cabd59435563a6686b4ee04401";

function fetchWeather(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  
    axios.get(apiUrl).then(function (response) {
      let temperatureElement = document.querySelector("#temperature");
      let descriptionElement = document.querySelector("h3");
      let humidityElement = document.querySelector("#humidity");
      let windElement = document.querySelector("#wind");
      let iconElement = document.querySelector("#icon");

      celsiusTemperature= response.data.main.temp;

  
      let temperature = Math.round(celsiusTemperature);
      let description = response.data.weather[0].description;
      let humidity = response.data.main.humidity;
      let windSpeed = Math.round(response.data.wind.speed * 3.6);
      let iconUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  
      temperatureElement.innerHTML = `${temperature}`;
      descriptionElement.innerHTML = `${description}`;
      humidityElement.innerHTML = `${humidity}`;
      windElement.innerHTML = `${windSpeed}`;
      iconElement.setAttribute("src", iconUrl);
      iconElement.setAttribute("alt", description);
    });
  }

  function showPosition(position) {
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}&units=metric`;
  
    axios
      .get(apiurl)
      .then(function (response) {
        celsiusTemperature = response.data.main.temp; // Store the temperature in Celsius
  
        let temperatureElement = document.querySelector("#temperature");
        let cityNameElement = document.querySelector(".city-name");
        let temperature = Math.round(celsiusTemperature); 
        
        temperatureElement.innerHTML = `${temperature}`; 
  
        cityNameElement.innerHTML = response.data.name;
        let humidityElement = document.querySelector("#humidity");
        let windElement = document.querySelector("#wind");
        let iconElement = document.querySelector("#icon");
        humidityElement.innerHTML = response.data.main.humidity;
        windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
        iconElement.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
        iconElement.setAttribute("alt", response.data.weather[0].description);
      })
      .catch(function (error) {
        console.error("Weather API Error:", error);
      });
  }

  function changeintofahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)}`;
  }
  
  function changeintocelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}`;
  }
  

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celsiusTemperature=null;

let button = document.querySelector("#current-location-btn");
button.addEventListener("click", getCurrentPosition);

let fahrenheit= document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeintofahrenheit);

let celsius= document.querySelector("#celsius");
celsius.addEventListener("click", changeintocelsius);

