import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [value, setValue] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [actualCountryBtn, setActualCountryBtn] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setAllCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      const lat = country.capitalInfo.latlng[0];
      const lon = country.capitalInfo.latlng[1];
      const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

      axios.get(api_url).then((response) => {
        setWeatherData(response.data);
      });
    }
  }, [filteredCountries]);

  const valueChangeHandler = (event) => {
    const inputVal = event.target.value;
    setValue(inputVal);

    const filteredData = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(inputVal)
    );

    setFilteredCountries(filteredData);
  };

  const showSingleCountry = (country) => {
    console.log(weatherData);

    if (!weatherData) return null;

    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
        <h2>Weather in {country.capital}</h2>
        <div>Temperature {weatherData.main.temp} Celsius</div>
        <img src={weatherIconUrl} alt="weather icon" />
        <div>Wind {weatherData.wind.speed} m/s</div>
      </div>
    );
  };

  const toggleButtonShow = (id) => {
    if (actualCountryBtn === id) {
      setActualCountryBtn(null);
    } else {
      setActualCountryBtn(id);
    }
  };

  const filteredCountriesShow = () => {
    if (!value) return null;

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return (
        <ul>
          {filteredCountries.map((el) => {
            const isSelected = actualCountryBtn === el.cca2;

            return (
              <li key={el.cca2}>
                {el.name.common}{" "}
                <button onClick={() => toggleButtonShow(el.cca2)}>
                  {isSelected ? "hide" : "show"}
                </button>
                {isSelected && showSingleCountry(el)}
              </li>
            );
          })}
        </ul>
      );
    }

    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];

      return showSingleCountry(country);
    }
  };

  return (
    <>
      <div>
        find countries <input value={value} onChange={valueChangeHandler} />
      </div>
      {filteredCountriesShow()}
    </>
  );
}

export default App;
