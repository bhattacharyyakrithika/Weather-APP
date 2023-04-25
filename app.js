const { json } = require("express");
const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var query = req.body.cityName;
    var apiKey = "445cc4c5b472309292176ce9c5ffe83f";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            // console.log(weatherData.name);
            var cityName = weatherData.name;
            var weatherTemp = weatherData.main.temp;
            var weatherDesc = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write('<h1>CITY - ' + cityName + '</h1>');
            res.write('<h2>WEATHER - ' + weatherTemp + '</h2>');
            res.write('<h3>WEATHER DESCRIPTION - The weather is ' + weatherDesc + '</h3>');
            res.write('<img src=' + iconUrl + '>');
            res.send();
        })
    })

});

app.listen(3000, function(){
    console.log("server started on 3000");
});