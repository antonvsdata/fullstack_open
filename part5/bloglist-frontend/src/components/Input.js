import React from 'react'

const Input = (props) => (
  <div>
    {props.label}
    <input
      type={props.type || 'text'}
      value={props.value}
      name={props.label}
      onChange={({ target }) => props.changer(target.value)}
    />
  </div>
)

export default Input
