import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all").then((response) => {
      response.json().then((countries) => {
        setCountries(countries);
      });
    });
  }, []);

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  console.log(countries);

  const matching = countries.filter((country) =>
    country.name.toLocaleLowerCase().match(value)
  );

  return (
    <div>
      <input value={value} onChange={onChange} />
      {matching.length > 10 ? (
        <div>Too many matches. Specify different filter.</div>
      ) : matching.length === 1 ? (
        <div>
          <h2>{matching[0].name}</h2>
          <p>capital {matching[0].capital}</p>
          <p>population {matching[0].population}</p>
          <h3>Languages</h3>
          <ul>
            {matching[0].languages.map((language) => (
              <li key={language.iso639_1}>{language.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        matching.map((country) => (
          <div key={country.alpha3Code}>{country.name}</div>
        ))
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
