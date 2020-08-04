import React from 'react'
import Input from './Input'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <Input label="username" value={username} changer={setUsername} />
    <Input label="password" value={password} changer={setPassword} />
    <button type="submit">login</button>
  </form>
)

export default LoginForm
