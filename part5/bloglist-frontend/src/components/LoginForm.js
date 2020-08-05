import React, { useState } from 'react'
import Input from './Input'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUserLogin = async (event) => {
    event.preventDefault()
    const loginSuccess = await handleLogin(username, password)
    if (loginSuccess) {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={handleUserLogin}>
      <Input label="username" value={username} changer={setUsername} />
      <Input
        label="password"
        value={password}
        changer={setPassword}
        type="password"
      />
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
