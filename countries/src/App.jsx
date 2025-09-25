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
    console.log(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(value)
      )
    );
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
