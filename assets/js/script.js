// new variables to store a reference to the <form>
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#cityname");
var submitBtn = document.querySelector('#submit')



// current weather elements
var citySearchTerm = document.querySelector("#city-search-term")
var weatherContainerEl = document.querySelector("#weather-container")
var currentConditionsEl = document.querySelector("#current-conditions")
var input = document.querySelector('.input_text');
var d = new Date();

var conditions = [icon, temp, wind, humidity, uv];
var icon = document.querySelector("#icon")
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uv = document.querySelector("#uv");




//function to be executed upon a form submission browser event
var formSubmitHandler = function(event) {
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

// display current  CITY 
var displayCity = function(city, searchTerm) {
    console.log(city);
    console.log(searchTerm);
    // clear old content
    citySearchTerm.textContent = (searchTerm + d); 
};
    

// display CURRENT weather conditions
//var displayCurrentWeatherConditions = function (city, conditions){
   


//}

//fetch apiUrl
var getCurrentCity = function(cityname){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityname +"&units=imperial&appid=9525d305aa977583448ee5f241e05b87";
    // make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            displayCity(data, cityname);
            
        });
    });
};





searchFormEl.addEventListener("submit", formSubmitHandler)

//fetch apiUrl for Current Weather conditions
submitBtn.addEventListener('click', function(conditions){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=z'+cityname+'&units=imperial&appid=9525d305aa977583448ee5f241e05b87')
    .then(response => response.json())
    .then(data => {
        var iconValue = data['weather']['icon'];
        var tempValue = data['main']['temp'];
        var windValue = data['wind']['speed'];
        var humidityValue = data['main']['humidity'];

        icon.innerHTML = iconValue;
        temp.innerHTML = tempValue;
        wind.innerHTML = windValue;
        humidity.innerHTML = humidityValue;
});
})