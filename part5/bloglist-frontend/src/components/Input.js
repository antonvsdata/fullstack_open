import React from 'react'

const Input = ({ label, value, changer }) => (
  <div>
    {label}
    <input
      type="text"
      value={value}
      name={label}
      onChange={({ target }) => changer(target.value)}
    />
  </div>
)

export default Input
