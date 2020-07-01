import React from "react";

const Filter = ({ value, change }) => {
  return (
    <div>
      <span>filter shown with </span>
      <input value={value} onChange={change} />
    </div>
  );
};

export default Filter;
