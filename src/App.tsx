import React, { useState, useEffect } from 'react';
import fetchWeatherData from './server/services';
import { Forecast, CityWeather } from './interfaces/interfaces';
import './App.css';

const cities = ['Ottawa', 'Moscow', 'Tokyo']

const App: React.FC = () => {
  const [selectedCity, setCity] = useState<string>('');
  const [cityWeather, setCityWeather] = useState<CityWeather[]>([]);

  useEffect(() => {
    async function getCityData() {
      const data = await fetchWeatherData(selectedCity);
      const weatherForecast = [
        ...data.list.map((forecast: Forecast) => ({
          ...forecast,
          date: new Date(forecast.dt * 1000 + data.city.timezone * 1000)
        }))
      ]

      setCityWeather(weatherForecast);
    }

    selectedCity && getCityData();    
  }, [selectedCity]);

  const handleCitySelection = (city: string) => {
    setCity(city);
  }

  return (
    <div className="app">
      <div className="app-main">
        <div>
          {cities.map((city) => {
            return (
              <button key={city} 
                type="button"
                className={city === selectedCity ? 'active' : ''}
                onClick={() => handleCitySelection(city)}>
                  {city.toUpperCase()}
              </button>
            )
          })}
        </div>
          <div className="table">
            {cityWeather.length > 1 &&
            <>
              <div className="todayWeather">
                <span>Today</span>
                <div className="todayDetails">
                  <div>
                      <img
                      src={`https://openweathermap.org/img/wn/${cityWeather[0].weather[0].icon}@2x.png`}
                      alt={cityWeather[0].weather[0].description}
                      />
                  </div>
                  <div className="todayAddData">
                    <h1>
                      {Math.round(cityWeather[0].temp.day)}&deg;
                    </h1>
                    <p>{cityWeather[0].weather[0].main}</p>
                  </div>
                </div>
              </div>
              <div className="rowWeather">
                {cityWeather.slice(1).map((forecast: CityWeather) => {
                  return (
                    <div className="weather-card">
                      <span>{forecast.date.toString().split(" ")[0]}</span>
                      <img
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                        alt={forecast.weather[0].description}
                      />
                      <h3>{Math.round(forecast.temp.day)}&deg;</h3>
                    </div>
                  )
                })}
              </div>
            </>
            }
          </div>
      </div>
    </div>
  );
}

export default App;
