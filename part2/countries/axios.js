import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const weatherAPI = import.meta.env.VITE_WEATHER_API_KEY;
function getAllCountries() {
  const req = axios.get(`${baseUrl}/all`);
  return req.then((response) => response.data);
}

function getCountry(country) {
  const req = axios.get(`${baseUrl}/name/${country}`);
  return req.then((response) => response.data);
}

function getWeather(city) {
  const req = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPI}`,
  );
  return req.then((response) => response.data);
}
export { getAllCountries, getCountry, getWeather };
