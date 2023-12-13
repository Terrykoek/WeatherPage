// src/App.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import './App.css'; 
import searchButton from './searchButton.png';
import deleteButton from './deleteButton.png';

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
    return currentDate.toLocaleString('en-US', options);
  };

  const handleSearch = (city) => {

    // Update search history
    setSearchHistory([city, ...searchHistory.slice(0, 4)]); // Limit to 5 items

    // Fetch weather data for the searched city
    getWeatherData(city);
    console.log('@@@@@@@@@@@@@@', weatherData);

  };

  const handleDelete = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className='app-container'>
        <div className="weather-container">
          {weatherData ? (
            <>
              <WeatherDisplay weatherData={weatherData} />
              <div className='search-history-box'>
                <h1>Search History</h1>
                <ul>
                  {searchHistory.map((city, index) => (
                    <li key={index} className="search-history-item">
                      <div className="search-history-item-content">
                        <span>{city} </span>
                        <span style={{ marginLeft: 'auto' }}>
                          {getCurrentDateTime()}
                        </span>
                        <div className="search-history-actions">
                          <span
                            style={{ cursor: 'pointer', marginRight: '-10px' }}
                            onClick={() => handleSearch(city)}
                          >
                            <img src={searchButton} alt="Search" />
                          </span>
                          <span
                            style={{ cursor: 'pointer', marginLeft: 'auto' }}
                            onClick={() => handleDelete(index)}
                          >
                            <img src={deleteButton} alt="Delete" />
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            weatherData === null && <div className="not-found-box">
              <p>Not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default App;