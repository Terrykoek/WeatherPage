// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    onSearch(city);
    setCity('');
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div>
      <input type="text" value={city} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;