const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c4c24927ccmsha9cafa99ebd0ec3p172fbcjsnc4552afe9eab',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};
const getWeather = (city) => {

    //Getting City name from search
    cityName.innerHTML = city
    // Getting random image from unsplash and changing the background
    document.body.style.backgroundImage = "url(https://source.unsplash.com/random/?"+city+")";
    // Getting Weather data from weather api

    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
        .then(response => response.json())
        .then((response) => {
            console.log(response)
            let sunRise = response.sunrise
            let sunriseTime = new Date(sunRise * 1000);
            let sunSet = response.sunset
            let sunsetTime = new Date(sunSet * 1000);

            //Updating weather on weather app
            temp.innerHTML = response.temp
            max_temp.innerHTML = response.max_temp
            min_temp.innerHTML = response.min_temp
            humidity.innerHTML = response.humidity
            feels_like.innerHTML = response.feels_like
            wind_speed.innerHTML = response.wind_speed
            wind_degrees.innerHTML = response.wind_degrees
            sunrise.innerHTML = sunriseTime.toLocaleTimeString()
            sunset.innerHTML = sunsetTime.toLocaleTimeString()
        })
        .catch(err => console.error(err));
}

// Getting city name by user

submit.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather(city.value)
})

//Calling the function
getWeather("Delhi")

const getWeatherForOtherCity = async () => {

    //Getting Other cities name from HTML File
    let items = document.getElementsByClassName("otherCity");
    let otherCity = [].map.call(items, otherCity => otherCity.textContent);
    console.log(otherCity);

    // Gettitng Weather of Other Cities

    for (let i = 0; i < 5; i++) {
        const element = otherCity[i];
        console.log(element);
        let weatherData = await fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + element, options)
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch(err => console.error(err));
        let sunRise = weatherData.sunrise
        let sunriseTime = new Date(sunRise * 1000).toLocaleTimeString();
        let sunSet = weatherData.sunset
        let sunsetTime = new Date(sunSet * 1000).toLocaleTimeString();
        
        //Updating weather on weather app
        document.getElementById(`${element}_temp`).innerHTML = weatherData.temp
        document.getElementById(`${element}_humidity`).innerHTML = weatherData.humidity
        document.getElementById(`${element}_windspeed`).innerHTML = weatherData.wind_speed
        document.getElementById(`${element}_sunrise`).innerHTML = sunriseTime
        document.getElementById(`${element}_sunset`).innerHTML = sunsetTime
    }
}
getWeatherForOtherCity();
