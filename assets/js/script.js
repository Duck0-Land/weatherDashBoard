//vairiables
var personalKey = "361c6a6d2ca17dff9e6e6c600d7e1a7a";
var fiveDayforecast = "https://api.openweathermap.org/data/2.5/onecall?";
var citiesStorageArray = [];

var citySearch = $("#citySearch");
var citiesSearched = $("#citiesSearchedLi");
//weather info
var getCityWeather = function (cityName) {
var apiUrl = dailyWeatherApiStarts + cityName + "&" + personalKey;
fetch(apiUrl).then(function (search) {
    if (search.ok) {
    return search.json().then(function (search) {
        $("#cityName").html(search.name);
        //current date
        var unixTime = search.dt;
        var date = moment.unix(unixTime).format("MM/DD/YY");
        $("#currentdate").html(date);
        //weather image
        var weatherIncoUrl =
          "http://openweathermap.org/img/wn/" +
          search.weather[0].icon +
          "@2x.png";
        $("#weatherIconToday").attr("src", weatherIncoUrl);
        $("#tempToday").html(search.main.temp + " \u00B0F");
        $("#humidityToday").html(search.main.humidity + " %");
        $("#windSpeedToday").html(search.wind.speed + " MPH");
        var lat = search.coord.lat;
        var lon = search.coord.lon;
        getUVIndex(lat, lon);
        getForecast(lat, lon);
      });
    } else {
      alert("Please provide a valid city name.");
    }
  });
};