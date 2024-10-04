// src/pages/weather.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '../styles/Weather.module.css'

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Appeler l'API route Next.js locale
  const fetchWeather = async () => {
    try {
      const response = await axios.get('/api/weather', {
        params: {
          location: 'Orléans',
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {weatherData ? (
        <div className={styles.weatherCard}>
          <h1 className={styles.cityName}>{weatherData.location.name}</h1>
          <h2 className={styles.temperature}>{weatherData.current.temp_c}°C</h2>
          <div className={styles.conditionContainer}>
            <Image
              src={`https:${weatherData.current.condition.icon}`}
              alt="Weather icon"
              width={64}
              height={64}
            />
            <p className={styles.condition}>{weatherData.current.condition.text}</p>
          </div>
          <div className={styles.details}>
            <p>Wind: {weatherData.current.wind_kph} kph</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Pressure: {weatherData.current.pressure_mb} mb</p>
          </div>
        </div>
      ) : (
        <p>Unable to fetch weather data.</p>
      )}
    </div>
  );
};

export default WeatherPage;
