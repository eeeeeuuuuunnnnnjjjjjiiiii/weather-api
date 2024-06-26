import React from 'react'

const WeatherBox = ({ weather }) => {
  console.log("weather?", weather);

  return (
    <div className='weather-box'>
      {weather && weather.main && (
        <>
          <div>{weather.name}</div> 
          <h2>{weather.main.temp}/{(weather.main.temp * 1.8) + 32}</h2>
          <h3>{weather.weather[0].description}</h3>
        </>
      )}
    </div>
  );
};

export default WeatherBox;
