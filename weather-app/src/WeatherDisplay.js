// src/components/WeatherDisplay.js
import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  return (
    <div>
      <h2>Weather Information</h2>
      {weatherData && (
        <div>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;