import React from 'react'

const Input = ({ user, setUser }) => (
  <div>
    {user.name} logged in
    <button
      type="button"
      onClick={() => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogUser')
      }}
    >
      logout
    </button>
  </div>
)

export default Input
