import React from "react";
import Weather from "./Weather";

const CountryList = ({ country, buttonClick }) => {
  return (
    <div>
      <span>{country.name} </span>
      <button onClick={buttonClick(country)}>show</button>
    </div>
  );
};

const LangList = ({ languages }) => {
  return languages.map((lang) => <li key={lang.name}>{lang.name}</li>);
};

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        <LangList languages={country.languages} />
      </ul>
      <img
        src={country.flag}
        alt={`flag of ${country.name}`}
        width="150"
        height="100"
      ></img>
      <Weather country={country} />
    </div>
  );
};

const Countries = ({ countries, buttonClick }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 0) {
    return <p>No countries match the search</p>;
  } else if (countries.length > 1) {
    return countries.map((country) => (
      <CountryList
        key={country.name}
        country={country}
        buttonClick={buttonClick}
      />
    ));
  } else {
    return <CountryInfo country={countries[0]} />;
  }
};

export default Countries;
