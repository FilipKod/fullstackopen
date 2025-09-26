import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

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
          {filteredData.map((el) => (
            <li key={String(el.idd.root + el.idd.suffixes.join(""))}>
              {el.name.common}
            </li>
          ))}
        </ul>
      );
    }

    if (filteredData.length === 1) {
      const country = filteredData[0];

      // console.log(country);
      // country.flags.png
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
