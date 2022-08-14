const API_KEY = "b2229f2d48090cd59f74a1f7196c2bea";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const weatherContainer = document.getElementById("weather");
        const city = weatherContainer.querySelector("span:first-child");
        const weather = weatherContainer.querySelector("span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
    console.log(url);
}

function onGeoError(){
    alert("Can't find yyou. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
