import React, { useState } from 'react'
import Input from './Input'

const LoginForm = ({ handleLogin, setErrorMessage }) => {
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

export default LoginForm
