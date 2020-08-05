import React, { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const foundBlogs = await blogService.getAll()
      setBlogs(foundBlogs.sort((a, b) => b.likes - a.likes))
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const cur_user = JSON.parse(loggedUserJSON)
      setUser(cur_user)
      blogService.setToken(cur_user.token)
    }
  }, [])

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      returnedBlog.user = JSON.parse(
        window.localStorage.getItem('loggedBlogUser')
      )
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      return true
    } catch (exception) {
      setErrorMessage('not able to add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      return false
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const cur_user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(cur_user))
      blogService.setToken(cur_user.token)
      setUser(cur_user)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const likeBlog = async (blog) => {
    await blogService.like(blog)
    setBlogs(
      blogs
        .map((b) => {
          if (b.id === blog.id) {
            b.likes += 1
          }
          return b
        })
        .sort((a, b) => b.likes - a.likes)
    )
  }

  const removeBlog = async (blog) => {
    const permission = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (permission) {
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h2>Login</h2>

      <Message message={errorMessage} color={'red'} />
      <Message message={message} color={'green'} />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <div>
          <User user={user} setUser={setUser} />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default App
