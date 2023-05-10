const searchForm = document.querySelector("#searchForm");
const searchButton = document.querySelector("#searchButton");
let searchBarText = document.querySelector("#searchBarText");
let weatherDisplay = document.querySelector(".weatherDisplay");
let cityList = document.querySelector(".cityList");
let searchedCities = [];


function weatherSearch(event)  {
    event.preventDefault();
     weatherDisplay.innerHTML="";
     const searchedCity = searchBarText.value.trim();
     const apiKey = "aceaffbceb5818a9f962e488e2feb092";

     if (searchedCity){
      const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=imperial`
    fetch(currentWeather).then(function (response) {
        if (response.ok) {
          response.json().then(function(data) {
            console.log(data);
            currentConditions(data);
            
          });
      }
      });
      const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=imperial`
    fetch(forecast).then(function (response){
      if(response.ok){
        response.json().then(function (data) {
          fiveDay(data)
        });
      }
    });

    searchedCities.push(searchedCity)
    searchBarText.value = "";
    cityStorage();
    renderPast();
    
    
     } else {
      window.alert("Please enter a city name");
      return;
     }

};

function cityStorage() {
    localStorage.setItem("Previous City", JSON.stringify(searchedCities));
  }
  
  function renderPast() {
    cityList.innerHTML = ""; 
    for (let i = 0; i < searchedCities.length; i++){
    const city = searchedCities[i];
    const button = document.createElement("button");
    button.textContent = city.toUpperCase();
    button.classList = "btn btn-primary";
    button.id = "newButton";
    cityList.appendChild(button);  
    } 
  }
  
  function currentConditions(data) {
    let todaysDate = "Right now"
    let newDiv = document.createElement("div");
    let currentHeader = document.createElement("h2");
    let listConditions = document.createElement("ul");
    let temp = document.createElement("li");
    let humidity = document.createElement("li");
    let windSpeed = document.createElement("li");
    let weatherIconImg = document.createElement('img');
    let iconURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  
    weatherIconImg.setAttribute("src", iconURL);
    weatherIconImg.setAttribute("id", "IconImg");
    newDiv.className = "item";
    newDiv.id = "currentWeather";
  
    newDiv.appendChild(currentHeader);
    newDiv.appendChild(listConditions);
    newDiv.appendChild(temp);
    newDiv.appendChild(humidity);
    newDiv.appendChild(windSpeed);
    todanewDivDiv.appendChild(weatherIconImg);
    weatherDisplay.appendChild(newDiv);
  
    currentHeader.textContent = todaysDate;
    temp.textContent = " Temp: " + data.main.temp + " ℉";
    humidity.textContent = " Humidty: " + data.main.humidity;
    windSpeed.textContent = " Wind speed: " + data.wind.speed;
  }; 
  
  function fiveDay(data) {
    const futureCast = data.list;
    for (let i = 1; i < futureCast.length; i += 8) {
      const forecastDivs = document.createElement('div');
      forecastDivs.classList = "item Day";
      let day = dayjs(futureCast[i].dt_txt).format('M/DD/YYYY');
      let weatherIcon = futureCast[i].weather[0].icon;
  
      forecastDivs.innerHTML = `<h2>${day}</h2>
        <ul>
        <li>Temp: ${futureCast[i].main.temp} ℉ </li>
        <li> Humidity: ${futureCast[i].main.humidity}</li>
        <li> Wind Speed: ${futureCast[i].wind.speed}</li>
        <img src= http://openweathermap.org/img/w/${weatherIcon}.png>
        </ul>`
      weatherDisplay.appendChild(forecastDivs);
  
    };
  };
  
  function pastSearch(event) {
  weatherDisplay.innerHTML= "";
  const searchedCity = event.target.innerHTML;
  const apiKey = "8160474e6f23dd64a3ea9a9e05d2989d";
  
  if (searchedCity){
   const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=imperial`
  fetch(currentWeather).then(function (response) {
     if (response.ok) {
       response.json().then(function(data) {
         console.log(data);
         currentConditions(data);
         
       });
   }
   });
   const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=imperial`
  fetch(forecast).then(function (response){
   if(response.ok){
     response.json().then(function (data) {
       fiveDay(data)
     });
   }
  });
  
  }};
  
  function init() {
    let savedCities = JSON.parse(localStorage.getItem("Previous City"));
    if (savedCities !== null) {
      searchedCities = savedCities;
    } 
    renderPast();
  };
  
  
  searchForm.addEventListener("click", weatherSearch);
  
  cityList.addEventListener("click", pastSearch);
  
  init(); 