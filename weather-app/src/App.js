// src/App.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import background from './bg-dark.png'

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Fetch weather data for the first city in the search history
    if (searchHistory.length > 0) {
      const lastSearchedCity = searchHistory[0];
      getWeatherData(lastSearchedCity);
    }
  }, [searchHistory]);

  const getWeatherData = (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6b48c660263afbf53c9e3b9297b58b16`;


    // Use fetch for AJAX
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setWeatherData(data))
      .catch((error) => {
        console.error('Error fetching weather data:', error)
        setWeatherData(null); // Clear weather data on error
      }
      );
  };

  const handleSearch = (city) => {
    // Update search history
    setSearchHistory([city, ...searchHistory.slice(0, 4)]); // Limit to 5 items

    // Fetch weather data for the searched city
    getWeatherData(city);
  };

  const handleDelete = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
  };

  return (
    <div style={{ height: '100vh', backgroundImage: `url(${background})`, backgroundSize: 'cover'}}>      
    <SearchBar onSearch={handleSearch} />
      <WeatherDisplay weatherData={weatherData} />
      <h3>Search History</h3>
      <ul>
      {searchHistory.map((city, index) => (
          <li key={index}>
            {city}
            {}
            <span
              style={{ cursor: 'pointer', marginLeft: '8px' }}
              onClick={() => handleSearch(city)}
            >
              🔍
            </span>
            <span
              style={{ cursor: 'pointer', marginLeft: '8px' }}
              onClick={() => handleDelete(index)}
            >
              🗑️
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;