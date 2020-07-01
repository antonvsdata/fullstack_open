import React from "react";

const Contact = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Contacts = ({ persons }) => {
  return persons.map((person) => <Contact key={person.name} person={person} />);
};

export default Contacts;
