import React, { useState }from 'react';
import Navbar from "./layout/navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import About from "./layout/About"
import FormField from "./layout/Form"

//api call api.openweathermap.org/data/2.5/weather?q={city name},{state},{country code}&appid={your api key}
const api = {
  'key':'6da82f453f47007bc5dca0b7a6901167',
  'call': 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {


    if (evt.key === "Enter") {
      console.log(`${api.call}weather?q=${query},karnataka,ind&units=metric&APPID=${api.key}`)
      fetch(`${api.call}weather?q=${query},karnataka,ind&units=metric&APPID=${api.key}`)
        .then(res =>res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(weather);
        });
    
      }
      console.log(query)
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  return (
    <React.Fragment>                    
      
      <Navbar>
      </Navbar>
      
      <Router>
        <Switch>
          <Route exact path = "/About" component={About}/>
          <div className={(typeof weather.main != "undefined") ? ((weather.weather.main === "Drizzle") ? 'app warm' : ((weather.main.temp > 16)? 'app drizzle': 'app warm')) : 'app'}>
            
            <main>
              <FormField text ="City" placeholder = "Enter your City" >
              </FormField>
              <FormField text ="State" placeholder = "Enter your state" >
              </FormField>
              {/* <div className="search-box">
                <input 
                  type="text"
                  className="search-bar"
                  placeholder="Search..."
                  onChange={(e)=> setQuery(e.target.value)}
                  value={query}
                  onKeyPress={search}
                />


              </div> */}
              
              
              {(typeof weather.main != "undefined") ? (
              
              <div>
                <div className="location-box">
                  <div className="location">{weather.name}, {weather.sys.country}</div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                
                <div className="weather-box">
                  <div className="temp">
                    {Math.round(weather.main.temp)}°c
                  </div>
                  <div className="weather">{weather.weather[0].main}</div>
                </div>
              </div>
              ) : ('')}      
            </main>    
          </div>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
