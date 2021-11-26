
// new variables to store a reference to the <form>
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#cityname");
var submitBtn = document.querySelector('#submit')
var cityList = document.querySelector('#cityList')




var citySearchTerm = document.querySelector("#city-search-term")
var weatherContainerEl = document.querySelector("#weather-container")
var currentConditionsEl = document.querySelector("#current-conditions")
var input = document.querySelector('.input_text');

var cardDeckEl = document.querySelector(".card-deck")
var buttonsEl = document.querySelector("#buttons")

var cityList =[]
var searchTerms = []



//function to be executed upon a form submission browser event
var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var cityname = cityInputEl.value.trim()
    if (cityname) {
        getCurrentCity(cityname);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    };
}

// display  
var displayCity = function (city, searchTerm, fiveDayData) {
    console.log(city);
    console.log(searchTerm);
    console.log(fiveDayData)
    // clear old content
    citySearchTerm.innerHTML = (searchTerm + moment(city.dt, "X").format(' (MM/DD/YYYY)')) + `<img src='http://openweathermap.org/img/wn/${city.weather[0].icon}.png'  />`;

    weatherContainerEl.innerHTML = `
    <div id="current-conditions" class="conditions-list">
   
    <p id="temp">Temp:<span>${city.main.temp}</span></p>
    <p id="wind">Wind:<span>${city.wind.speed}</span></p>
    <p id="Humidity">Humidity:<span>${city.main.humidity}</span></p>
    <p id="uv">UV:<span>${fiveDayData.current.uvi}</span></p>
   </div>
    
    `
        cardDeckEl.innerHTML = "" //need this so it won't repeat
        for (let i = 1; i < fiveDayData.daily.length - 2; i++) {
        cardDeckEl.innerHTML = cardDeckEl.innerHTML + `
        <div class="card text-light p-3">
        <div class="card-block">
        <h4 class="date card-title text-light">
            <span>${moment(fiveDayData.daily[i].dt, 'X').format('MM/DD/YYYY')}</span>
        </h4>
        <img src='http://openweathermap.org/img/wn/${fiveDayData.daily[i].weather[0].icon}.png'  />
        <p id="temp1">Temp:<span>${fiveDayData.daily[i].temp.day}</span></p>
        <p id="wind1">Wind:<span>${fiveDayData.daily[i].wind_speed}</span></p>
        <p id="Humidity1">Humidity:<span>${fiveDayData.daily[i].humidity}</span></p>
        </div>
    </div>
    
    `   
    }         

    // save history search function and storage in localStorage 
        localStorage.setItem("searchTerm", searchTerm);
    
    
        buttonsEl.innerHTML=""
        for (let i = 0; i < searchTerm.length; i++) {
            
        buttonsEl.innerHTML=buttonsEl.innerHTML+ `
        <button data-id="2" type="submit" class="btn d-block btn btn-secondary btn-lg btn-block"><span>${city.name}</span></button>
        `
        }
        
        //pull city list fromlocal storage
        var pullCityList = function() {
        var fromLocalStorage = JSON.parse(localStorage.getItem("searchTerms"));

        if (fromLocalStorage !== null) {
        searchTerm = fromLocalStorage;
        }

    displayCity();
}
    }        


    
    


//fetch apiUrl
var getCurrentCity = function (cityname) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=9525d305aa977583448ee5f241e05b87";
    // make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {

            var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=9525d305aa977583448ee5f241e05b87`

            fetch(fiveDayUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (fiveDayData) {
                    displayCity(data, cityname, fiveDayData);
                })


        });
    });
};


searchFormEl.addEventListener("submit", formSubmitHandler);
