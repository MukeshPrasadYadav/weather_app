// src/Component/Dashbord.jsx
import React, { useEffect, useState } from 'react';
import Header from './Header';
import TimeCard from './TimeCard';
import axios from 'axios';
import Forcast from './Forcast';

function Dashbord() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('jodhpur'); 
  const [info, setInfo] = useState('');
  const [location, setLocation] = useState({ lat: null, lon: null });

  const currentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
    });
  };

  // Fetch weather using latitude and longitude
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=b1eba2d4cd44a24dffa3ade96e7c3a12&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('fetchWeather -> error', error);
      }
    };

    if (location.lat && location.lon) {
      fetchWeather();
    }
  }, [location]);

  // Reverse geocoding to get the city name from coordinates
  useEffect(() => {
    const getCityName = async () => {
      try {
        const API_KEY = '5e34e75024014c04a1991870856c50c8';
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${location.lat}+${location.lon}&key=${API_KEY}`
        );
        const cityName =
          response.data.results[0].components.city ||
          response.data.results[0].components.town ||
          response.data.results[0].components.village;
        setCity(cityName);
      } catch (error) {
        console.error("Error fetching city name:", error);
      }
    };

    if (location.lat && location.lon) {
      getCityName();
    }
  }, [location.lat, location.lon]);

  // Fetch weather using the city name
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b1eba2d4cd44a24dffa3ade96e7c3a12&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('fetchWeather -> error', error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(info);
    document.getElementById('inputForm').reset();
    setInfo('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
      document.getElementById('inputForm').reset();
    }
  };

  // Function to get the background image based on weather condition
  const getWeatherImage = (condition) => {
    const cond = condition.toLowerCase();
    if (cond.includes('clear')) return require('../assets/images/clear.jpg');
    if (cond.includes('cloud')) return require('../assets/images/cloudy.jpg');
    if (cond.includes('rain')) return require('../assets/images/rain.jpg');
    if (cond.includes('snow')) return require('../assets/images/snow.jpg');
    if (cond.includes('thunderstorm')) return require('../assets/images/thunderstrom.jpg');
    return require('../assets/images/default.jpg');
  };

  return (
    <div className="relative flex flex-col items-center text-white w-full min-h-screen gap-6">
      {/* Background Image */}
      {weather && weather.list && weather.list[0] && (
        <img
          src={getWeatherImage(weather.list[0].weather[0].description)}
          alt={weather.list[0].weather[0].description}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Header */}
      <div className="relative z-10 w-full">
        <Header />
      </div>

      {/* Search & Current Location */}
      <div className="relative z-10 flex flex-col sm:flex-row w-full justify-around items-center gap-4 px-4">
        <form id="inputForm" onSubmit={handleSubmit} className="flex w-full sm:w-auto bg-white/10 rounded-md overflow-hidden">
          <input
            className="w-4/5 text-center outline-none p-2 bg-white/10"
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter city"
          />
          <button type="submit" className="w-fit  bg-green-500 p-2">Search</button>
        </form>

        <button className="bg-blue-500 p-2 rounded-md shadow-md" onClick={currentLocation}>
          Current Location
        </button>
      </div>

      {/* Weather and Highlights Section */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-around gap-6 w-full px-6">
        {/* Weather Info */}
        <div className="flex flex-col items-center w-full lg:w-3/5">
          {weather && <h1 className="text-5xl font-bold p-2 text-center">{weather.city.name}</h1>}
          <TimeCard />
          <div className="bg-white/30 p-4 rounded-md shadow-md w-full text-center">
            {weather && weather.list && weather.list[0] && (
              <>
                <h1 className="text-3xl font-bold">Highlights</h1>
                <p className="text-2xl">{weather.list[0].weather[0].description}</p>

                {/* Weather Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {[
                    { label: "Wind Speed", value: `${weather.list[0].wind.speed} km/h` },
                    { label: "Min Temp", value: `${weather.list[0].main.temp_min}°C` },
                    { label: "Max Temp", value: `${weather.list[0].main.temp_max}°C` },
                    { label: "Humidity", value: `${weather.list[0].main.humidity}%` },
                    { label: "Pressure", value: `${weather.list[0].main.pressure} hPa` },
                    { label: "Visibility", value: `${weather.list[0].visibility} m` },
                    { label: "Sunrise", value: new Date(weather.city.sunrise * 1000).toLocaleTimeString() },
                    { label: "Sunset", value: new Date(weather.city.sunset * 1000).toLocaleTimeString() }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/30 p-4 rounded-md shadow-md text-center">
                      <p className="font-bold">{item.label}</p>
                      <p>{item.value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Forecast Section */}
        <div className="w-full lg:w-2/5 md:justify-center flex flex-col items-center">
          {weather && <Forcast city={weather.city.name} />}
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
