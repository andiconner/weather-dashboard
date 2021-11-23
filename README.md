# weather-dashboard

# Project Description
Create a weather website to outlook for multiple cities weather and 5-day forecast.

# Requirements
1. city "search input" => current and future weather conditions for this city are add to the search history.
Users enter a city and results will show on the "current weather" session and "5-day Forcast"

When we submit the form, we get the value from the <input> element via the cityInputEl DOM variable and store the value in its own variable called cityname.
If there is in fact a value to cityname, we pass that data to getCurrentCity() as an argument. Then, to clear the form, we clear out the <input> element's value.

2. DISPLAY RESPONSE DATA ON PAGE => current weather conditions => city name, date, icon, temperature, humidity, wind speed and UV index

We have to capture a user interaction, form an HTTP request from that interaction, and display the response data on the page. Study the response data so that we can identify the properties we want to use.

Create a new function called "displayCurrentWeather"

3. weather conditions presented with colors => favorable, moderate or severe.

4. futute weather conditions for 5 days => presented with date, icon, temp, wind speed and humidity

5. click on a city in the search history => current and future conditions for that city
