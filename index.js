let weather = {
  apiKey: "4253ae682bded8fe54667e18d996e279",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) =>{
        this.name = data.name
        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat + 
          "&lon=" +
          data.coord.lon +
          "&appid=" +
          weather.apiKey +
          "&units=imperial"
        )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data)
          this.displayWeather(data.current)
          this.futureWeather(data.daily)
          //for (i=0; i<8; i++)
        })
      });
  },
  displayWeather: function (data) {
    const { temp, humidity, uvi , wind_speed } = data;
    const { icon, description } = data.weather[0];
    var uvindexElement = document.querySelector(".uvi")
    document.querySelector(".city").innerText = "Weather in " + this.name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + wind_speed + " m/h";
    document.querySelector(".weather").classList.remove("loading");
    uvindexElement.innerText = "UV Index: " + uvi
    if(uvi<3) {
      uvindexElement.style.backgroundColor = "green"      
    }
    else if(uvi<6) {
      uvindexElement.style.backgroundColor = "blue" 
    }
    else if(uvi<8) {
      uvindexElement.style.backgroundColor = "orange" 
    }
    else{
      uvindexElement.style.backgroundColor = "red" 
    }
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + this.name + "')";
  },
  futureWeather: function (data) {
    let container = document.getElementById('container')
    container.innerHTML = "";
    for(i=0; i<8; i++){
      const dt = data[i].dt;
      const icon = data[i].weather[0].icon

    const cardEl = document.createElement('div')
    const dateEl = document.createElement('div')
    const iconEl = document.createElement('img')
    const temp = document.createElement('div')
    const wind = document.createElement('div')
    const humidity = document.createElement('div')
    dateEl.textContent = new Date(dt);
    iconEl.setAttribute('src', "https://openweathermap.org/img/wn/" + icon + '.png')
    temp.textContent = "Temp: " + data[i].temp.day;
    wind.textContent = "Wind Speed: " + data[i].wind_speed;
    humidity.textContent = "Humidity: " + data[i].humidity;
    console.log(data)
    
    
    container.append(cardEl)
    cardEl.append(dateEl, iconEl, temp, wind, humidity)

    //after you create all of the elements and give them properties ie text then we need to append them to the html **do this before the end of each loop**
    }
    
  },
  search: function () {
    var searchText = document.querySelector(".search-bar")
    this.fetchWeather(searchText.value);
    var storedCities = JSON.parse(localStorage.getItem("searchedCities")) || []
    console.log(storedCities)
    storedCities.push(searchText.value)
    console.log(storedCities)
    localStorage.setItem("searchedCities", JSON.stringify(storedCities))
    this.displayButtons()
  },
  displayButtons: function () {
    var storedCities = JSON.parse(localStorage.getItem("searchedCities")) || []
    for(i=0; i<storedCities.length; i++){
      var btn = document.createElement('button')
      btn.innerText = storedCities[i]
      document.querySelector('.searchedCities').appendChild(btn)
    }
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
});
weather.displayButtons()
// everytime i search for a city i get the current and future weather for that city
// take a value and return the API of that city
// use the values that are returned from the API

