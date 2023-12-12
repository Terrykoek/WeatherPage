import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  return (
    <div>
      {weatherData && (
        <div>
          <p>Today's Weather</p>
          <h1 className='mainTemp'> {weatherData.main.temp}°C</h1>
          <p>H: {weatherData.main.temp_max}°C, L: {weatherData.main.temp_min}°C </p>
            <p> {weatherData.name} Humidity: {weatherData.main.humidity}%  {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;