import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
    const getCurrentDateTime = () => {
        const currentDate = new Date();
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
        return currentDate.toLocaleString('en-US', options).replace(/\//g, '-');
      };
      
  return (
    <div>
      {weatherData && (
        <div>
          <p>Today's Weather</p>
          <h1 className='mainTemp'> {weatherData.main.temp}°C</h1>
          <p>H: {weatherData.main.temp_max}°C, L: {weatherData.main.temp_min}°C </p>
            <p> {weatherData.name}  {getCurrentDateTime()}  Humidity: {weatherData.main.humidity}%  {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;