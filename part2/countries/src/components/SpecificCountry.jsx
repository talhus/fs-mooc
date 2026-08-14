import { useState, useEffect } from "react";
import { getWeather } from "../../axios";

const SpecificCountry = ({ data }) => {
  const [weather, setWeather] = useState();

  const capital = data?.capital?.[0];
  const handleWeather = () => {
    if (capital) {
      getWeather(capital).then((data) => setWeather(data));
    }
  };
  useEffect(() => {
    handleWeather();
  }, [capital]);

  return (
    <div>
      <h1>{data.name.common}</h1>
      <p>Capital: {data.capital[0]}</p>
      <p>Area: {data.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(data.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={data.flags.png} alt="" />
      <h2>Weather in {data.capital[0]}</h2>
      <p>Temperature: {weather?.main?.temp}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
        alt={weather?.weather?.[0]?.description}
      />
      <p>Wind: {weather?.wind?.speed} m/s</p>
    </div>
  );
};

export default SpecificCountry;
