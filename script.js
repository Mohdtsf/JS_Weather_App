// for bg image
const client_id = "_AE7sCO8tWFmAiWkdlve6pwwCOhJMeo8lmEBRQhSgls";

// for Weathr data
const API_key = "bff141d1f5b5a5b33765029b0ce71b58";

// Show loading animation
let loader = document.getElementById("loading");

// Hide loading animation after loading is complete
window.addEventListener("load", () => {
  setTimeout(() => {
    // Hide loading animation after loading is complete
    loader.style.display = "none";
  }, 6500);
});

const getWeather = (city) => {
  //Getting City name from search
  cityName.innerHTML = city;

  // Getting random image from unsplash and changing the background
  fetch(
    `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${city}`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      // For getting random image of th searched city
      let x = Math.floor(Math.random() * 10);

      // for chnaging the background image dynamically same as the city which is searchd
      document.body.style.backgroundImage = `url(${response.results[x].urls.raw})`;
    })
    .catch((err) => {
      console.error(err);
    });

  // Getting Weather data from weather api

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let sunRise = response.sys.sunrise;
      let sunriseTime = new Date(sunRise * 1000);
      let sunSet = response.sys.sunset;
      let sunsetTime = new Date(sunSet * 1000);

      //Updating weather on weather app
      temp.innerHTML = response.main.temp;
      max_temp.innerHTML = response.main.temp_max;
      min_temp.innerHTML = response.main.temp_min;
      humidity.innerHTML = response.main.humidity;
      feels_like.innerHTML = response.main.feels_like;
      wind_speed.innerHTML = response.wind.speed;
      wind_degrees.innerHTML = response.wind.deg;
      sunrise.innerHTML = sunriseTime.toLocaleTimeString();
      sunset.innerHTML = sunsetTime.toLocaleTimeString();
    })
    .catch((err) => {
      console.error(err);
    });
};

// Getting city name by user

submit.addEventListener("click", (e) => {
  e.preventDefault();
  // Show loading animation on click
  document.getElementById("loading").style.display = "block";
  setTimeout(() => {
    // Hide loading animation after loading is complete
    document.getElementById("loading").style.display = "none";
  }, 6500);
  getWeather(city.value);
});

//Calling the function
getWeather("Delhi");

const getWeatherForOtherCity = async () => {
  //Getting Other cities name from HTML File
  let items = document.getElementsByClassName("otherCity");
  let otherCity = [].map.call(items, (otherCity) => otherCity.textContent);
  console.log(otherCity);

  // Gettitng Weather of Other Cities

  for (let i = 0; i < 5; i++) {
    const element = otherCity[i];
    console.log(element);
    let weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${element}&appid=${API_key}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => console.error(err));
    let sunRise = weatherData.sys.sunrise;
    let sunriseTime = new Date(sunRise * 1000).toLocaleTimeString();
    let sunSet = weatherData.sys.sunset;
    let sunsetTime = new Date(sunSet * 1000).toLocaleTimeString();

    //Updating weather on weather app
    document.getElementById(`${element}_temp`).innerHTML =
      weatherData.main.temp;
    document.getElementById(`${element}_humidity`).innerHTML =
      weatherData.main.humidity;
    document.getElementById(`${element}_windspeed`).innerHTML =
      weatherData.wind.speed;
    document.getElementById(`${element}_sunrise`).innerHTML = sunriseTime;
    document.getElementById(`${element}_sunset`).innerHTML = sunsetTime;
  }
};
getWeatherForOtherCity();
