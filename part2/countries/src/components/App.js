import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import Countries from "./Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const dataHook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };
  useEffect(dataHook, []);

  // Filter persons, case insensitive match to search string
  const selectedCountries =
    search === ""
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        );

  const showCountry = (country) => {
    return () => {
      setSearch(country.name);
    };
  };

  return (
    <div>
      <Filter value={search} changer={handleSearchChange} />
      <br />
      <Countries countries={selectedCountries} buttonClick={showCountry} />
    </div>
  );
};

export default App;
