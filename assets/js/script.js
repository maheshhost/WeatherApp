// loading gif
function loadingGif(booleanValue) {
  let a = booleanValue;
  if(a) {
    document.getElementById('figure').classList.add('figdisplay');
    document.getElementById('figure').classList.remove('dnone');
  } else {
    document.getElementById('figure').classList.add('dnone');
    document.getElementById('figure').classList.remove('figdisplay');
  }
}
// loading gif
// background color
function backgroundColor(temp) {
  document.getElementById('datacontainer').classList.remove('snow');
  document.getElementById('datacontainer').classList.remove('sunny');

  if (temp <= 0) {
    document.getElementById('datacontainer').classList.add('snow');
  } else if (temp >= 25) {
    document.getElementById('datacontainer').classList.add('sunny');
  }
}
// background color
// display data
function displayData(data) {
  let d, time, cityname, temp, temperature, pressure, humidity, mintemp, maxtemp, wind, lat, lon;

  d = new Date();
  console.log(data);
  temp = ((data.main.temp - 32) / 1.8).toFixed(2);
  backgroundColor(temp);

  time = document.getElementById('time').innerHTML = d.getHours() + ":" + d.getMinutes();
  cityname = document.getElementById('cityname').innerHTML = data.name + " (" + data.sys.country + ")";
  temperature = document.getElementById('temperature').innerHTML = temp + "&#176;";
  pressure = document.getElementById('pressure').innerHTML = data.main.pressure;
  humidity = document.getElementById('humidity').innerHTML = data.main.humidity;
  mintemp = document.getElementById('mintemp').innerHTML = data.main.temp_min + " ";
  maxtemp = document.getElementById('maxtemp').innerHTML = data.main.temp_max;
  wind = document.getElementById('wind').innerHTML = data.wind.speed;
  lat = document.getElementById('lat').innerHTML = "latitiude:- " + data.coord.lat;
  lon = document.getElementById('lon').innerHTML = "longitude:- " + data.coord.lon;
  document.getElementById('figure').classList.remove('figdisplay');
  document.getElementById('figure').classList.add('dnone');
}
// display data
// display when clicked
function dataHide() {
  document.getElementById('datacontainer').classList.add('datanone');
  document.getElementById('datacontainer').classList.remove('display__data');
  document.getElementById('weatherinput').value = "";
  document.getElementById('weatherinput').focus();
}

function dataUnHide() {
  document.getElementById('datacontainer').classList.add('display__data');
  document.getElementById('datacontainer').classList.remove('datanone');
}
// display when clicked
// xhr request
function weatherApiCall(query) {
  let xhr = new XMLHttpRequest();
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=32584f9b2071e046e42b2270153015b3`

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.response);

      dataUnHide();
      displayData(data);
    } else {
      console.log("data loading wait....");
    }

    if (xhr.readyState === 4 && xhr.status === 404) {
      dataHide();
      alert("city Not found");
      loadingGif(false);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}
// xhr requests

// weathercall
function weatherCall(e) {
  e.preventDefault();

  let value = document.getElementById('weatherinput').value;
  if (!value) {
    alert("no name provided");
  } else {
    loadingGif(true);
    weatherApiCall(value);
  }
}
// weathercall
document.getElementById('btnsubmit').addEventListener('click', weatherCall, false);
document.getElementById('close').addEventListener('click', dataHide, false);
