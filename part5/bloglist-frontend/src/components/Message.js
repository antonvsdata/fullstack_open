import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message, color }) => {
  if (message === null) {
    return null
  }

  const msgStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return <div style={msgStyle}>{message}</div>
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default Message
