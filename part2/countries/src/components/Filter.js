import React from "react";

const Filter = ({ value, changer }) => {
  return (
    <div>
      <span>find countries </span>
      <input value={value} onChange={changer} />
    </div>
  );
};

export default Filter;
