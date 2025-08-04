 import React, { useEffect, useRef, useState } from "react";
 import "./weather.css";
  

 const Weather =()=>{
 const inputRef = useRef()
 const[weatherData, setWeatherData]= useState(false);
 const Api = async (city) => {
    if(city === ""){
        alert("Enter City Name");
        return;
    }
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        console.log("API KEY:", import.meta.env.VITE_APP_ID);

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setWeatherData({
          humidity:data.main.humidity,
          windSpeed:data.wind.speed,
          temperature:Math.floor(data.main.temp),
          location:data.name,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  
        })
    } catch (error) {
        setWeatherData(false);
        console.error("API fetch error:", error);
    }
};

useEffect(() => {
    Api("London");
}, []);

    return(
        <div className="weather">
            <div className="search-icon"> 
            <input ref={inputRef}type="text" placeholder="Search"  />
            <img src="search.png" alt="search" onClick={()=>Api(inputRef.current.value)}/>
            </div>
            {weatherData?<>
             <img src={weatherData.icon} alt="image" className="weather-icon" />
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="city">{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src="waves_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="" />
                     <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                     </div>
                </div>
                <div className="col">
                     <img src="air_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="" />
                     <div>
                        <p>{weatherData.windSpeed}Km/h</p>
                        <span>Wind Speed</span>
                     </div>
                </div>
            </div>
            </>:<></>}
            
            
        </div>
    )
 }
 export default Weather