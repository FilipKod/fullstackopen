import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [showBtn, setShowBtn] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const showSingleCountry = (country) => {
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
      </div>
    );
  };

  const toggleButtonShow = (id) => {
    if (showBtn === id) {
      setShowBtn(null);
    } else {
      setShowBtn(id);
    }
  };

  const filteredCountries = () => {
    const filteredData = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value)
    );

    if (!value) return null;

    if (filteredData.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (filteredData.length > 1 && filteredData.length <= 10) {
      return (
        <ul>
          {filteredData.map((el) => {
            const isSelected = showBtn === el.cca2;
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

    if (filteredData.length === 1) {
      const country = filteredData[0];

      return showSingleCountry(country);
    }
  };

  return (
    <>
      <div>
        find countries <input value={value} onChange={valueChangeHandler} />
      </div>
      {filteredCountries()}
    </>
  );
}

export default App;
