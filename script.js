
function displayWeatherCondition(responce){
    console.log(responce.data);
    let cityName=responce.data.name;
    let country=responce.data.sys.country;
    document.querySelector("#change-text").innerHTML="   ";
    document.querySelector("#city-name").innerHTML=`Weather in ${cityName} ,${country}`;
    let temp=Math.round(responce.data.main.temp);
    document.querySelector("#temprature").innerHTML=`${temp}°C`;
    let description=responce.data.weather[0].description;
    document.querySelector("#description").innerHTML=`<h2>${description}</h2>`;
    let humidity=responce.data.main.humidity;
    document.querySelector("#humidity").innerHTML=`Humidity: ${humidity}%`;
    let wind=responce.data.wind.speed;
    document.querySelector("#wind").innerHTML=`Wind speed: ${wind} km/h`;
    document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+cityName+"')";
    let icon =responce.data.weather[0].icon;
    document.querySelector("#icon").src=`http://openweathermap.org/img/wn/${icon}@2x.png`;
}
function searchCityWeather(event){
    event.preventDefault();
    let city=document.querySelector("#city-input").value;
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b8eed7d5b4af83bf868672afe2265f71&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
}
let searchCity=document.querySelector("#search");
searchCity.addEventListener("click",searchCityWeather);


function searchLocation(position){
	let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b8eed7d5b4af83bf868672afe2265f71&units=metric`;
	axios.get(apiUrl).then(displayWeatherCondition);
}
function showCurrentLocation(event){
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchLocation);
}
let locationButton=document.querySelector("#location");
locationButton.addEventListener("click",showCurrentLocation);









// https://api.pexels.com/v1/search/1600x900/?"+cityName+"
//https://api.pexels.com/v1/search/1600x900/?"+cityName+"
// https://source.unsplash.com/1600x900/?"+cityName+"