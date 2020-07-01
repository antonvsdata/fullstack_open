import React, { useState, useEffect } from "react";
import axios from "axios";
import Contacts from "./Contacts";
import Filter from "./Filter";
import PersonForm from "./PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return null;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPerson));
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  const dataHook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };
  useEffect(dataHook, []);

  // Filter persons, case insensitive match to search string
  const shownPersons =
    searchString === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchString.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter value={searchString} changer={handleSearchChange} />
      </div>
      <h2>Add a new</h2>
      <PersonForm
        submit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Contacts persons={shownPersons} />
    </div>
  );
};

export default App;
