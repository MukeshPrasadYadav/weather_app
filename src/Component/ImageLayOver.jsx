// src/Component/ImageLayOver.jsx
import React from 'react';
import PropTypes from 'prop-types';

function ImageLayOver({ weather, temperature,max_temp,min_temp }) {
  const getWeatherImage = (weather) => {
    switch (weather.toLowerCase()) {
      case 'clear sky':
        return require('../assets/images/clear.jpg');
      case 'cloudy':
        return require('../assets/images/cloudy.jpg');
      case 'rain':
        return require('../assets/images/rain.jpg');
      case 'snow':
        return require('../assets/images/snow.jpg');
      case 'thunderstorm':
        return require('../assets/images/thunderstrom.jpg');
      default:
        return require('../assets/images/clear.jpg');
    }
  };

  return (
    <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg">
      {/* Image using src attribute */}
      <img
        src={getWeatherImage(weather)}
        alt={weather}
        className="w-full h-full object-cover"
      />
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
        <h2 className="text-white text-2xl font-bold mb-2">{weather}</h2>
        <p className="text-white text-2xl font-bold">{temperature}°C</p>
      </div>
    </div>
  );
}

ImageLayOver.propTypes = {
  weather: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
};

export default ImageLayOver;
