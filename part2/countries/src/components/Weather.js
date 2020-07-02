import React, { useState, useEffect } from "react";
import axios from "axios";
import weatherAPIKey from "../config";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({});

  // Fetch weather data from weatherstack.com
  const weatherHook = () => {
    const params = {
      access_key: weatherAPIKey,
      query: country.capital,
    };
    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        const apiResponse = response.data;
        setWeather(apiResponse.current);
      });
  };
  useEffect(weatherHook, []);

  // To stop errors on first rendering
  if (Object.keys(weather).length === 0 && weather.constructor === Object) {
    return null;
  }
  return (
    <div>
      <h4>{`Weather in ${country.capital}`}</h4>
      <span>
        <strong>temperature: </strong>
      </span>
      <span>{`${weather.temperature} Celsius`}</span>
      <br />
      <img
        src={weather.weather_icons[0]}
        alt="weather icon"
        width="100"
        height="100"
      ></img>
      <br />
      <span>
        <strong>wind: </strong>
      </span>
      <span>{`${weather.wind_speed} mph direction ${weather.wind_dir}`}</span>
    </div>
  );
};

export default Weather;
