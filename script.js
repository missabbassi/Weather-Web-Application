function dateTime(){
    let currentDate= new Date();
    let dayOfWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let mounts=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let currentMount=mounts[currentDate.getMonth()];
    let currentDay=dayOfWeek[currentDate.getDay()];
    let day=currentDate.getDate();
    let year=currentDate.getFullYear();
    document.querySelector("#date-time").innerHTML=`${currentDay}, ${day} ${currentMount}, ${year}`;
}

function getForecast(coordinates){
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=b8eed7d5b4af83bf868672afe2265f71&units=metric`;
    axios.get(apiUrl).then(displayForecast);  
}

function formatDay(timestamp){
    let date= new Date(timestamp * 1000);
    let day=date.getDay();
    let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days[day];
}


function displayForecast(responce){
    let forecast=responce.data.daily;
    //console.log(responce.data.daily);
    let forecastElement=document.querySelector("#weather-forecast");


    let forecastHTML=`<div class="row-xs-12 weather-forecast" id="weather-forecast" >`;

    forecast.forEach(function(forecastDay, index){
        if(index < 6){
        forecastHTML=
            forecastHTML +
        `
        <!--Weather Forecast--> 
          <ul class="list-inline col forecast">
            <li class="col-xs-4 col-sm-2 text-center">
              <h3 class="h5">${formatDay(forecastDay.dt)}</h3>
              <p>
                <img
                  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt=""
                  title="${forecastDay.weather[0].description}"
                  width="50px"
                /><br />${Math.round(forecastDay.temp.max)}° <br /><span style="font-size:9px; color: rgb(198, 198, 198);">${forecastDay.weather[0].main}</span>
              </p>
            </li>
          </ul>
        <!--Weather Forecast End-->
        `;
        }
    })
    forecastHTML=forecastHTML+`</div>`;
    forecastElement.innerHTML=forecastHTML;
}


function displayWeatherCondition(responce){
    dateTime();
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
    //weatherForecast(responce.data.coord);
    getForecast(responce.data.coord);
    displayForecast();
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





