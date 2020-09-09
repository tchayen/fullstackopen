import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Preview = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h3>Languages</h3>
    <ul>
      {country.languages.map((language) => (
        <li key={language.iso639_1}>{language.name}</li>
      ))}
    </ul>
  </div>
);

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
    country.name.toLocaleLowerCase().match(value.toLocaleLowerCase())
  );

  return (
    <div>
      <input value={value} onChange={onChange} />
      {matching.length > 10 ? (
        <div>Too many matches. Specify different filter.</div>
      ) : matching.length === 1 ? (
        <Preview country={matching[0]} />
      ) : (
        matching.map((country) => (
          <div key={country.alpha3Code}>
            {country.name}{" "}
            <button onClick={() => setValue(country.name)}>show</button>
          </div>
        ))
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
