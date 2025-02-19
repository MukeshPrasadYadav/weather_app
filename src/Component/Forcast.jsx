// src/Component/forcast.jsx
import React, { useState, useEffect } from 'react';

const Forcast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b1eba2d4cd44a24dffa3ade96e7c3a12&units=metric`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Filter data to get a single forecast per day (around noon)
      const dailyForecast = data.list.filter((forecastItem) =>
        forecastItem.dt_txt.includes('12:00:00')
      );

      setForecast(dailyForecast);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts or when the city changes
  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 w-fit">
      {city && (
        <h2 className="text-xl font-bold mb-4">
          5 Day Weather Forecast for {city}
        </h2>
      )}
      <ul className="space-y-2 text-center">
        {forecast.map((item, index) => (
          <li key={index} className="p-4  bg-white/20 rounded-lg shadow">
            {/* Display weekday in short format */}
            <p className="font-medium">
              {new Date(item.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </p>
            <p>{item.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forcast;
