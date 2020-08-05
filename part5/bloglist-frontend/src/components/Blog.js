import React, { useState } from 'react'

const DeleteButton = ({ blog, removeBlog }) => {
  let allow_delete = false
  const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  if (loggedUserJSON) {
    const cur_user = JSON.parse(loggedUserJSON)

    if (cur_user.id === blog.user.id) {
      allow_delete = true
    }
  }
  return allow_delete ? (
    <button onClick={() => removeBlog(blog)}>delete</button>
  ) : null
}

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [full, setFull] = useState(false)

  const toggleFull = () => {
    setFull(!full)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleFull}>{full ? 'hide' : 'view'}</button>
      {full ? (
        <div>
          <p>{blog.url}</p>
          likes {blog.likes}
          <button onClick={() => likeBlog(blog)}>like</button>
          <p>{blog.user.name || 'unnamed user'}</p>
          <DeleteButton blog={blog} removeBlog={removeBlog} />
        </div>
      ) : null}
    </div>
  )
}

export default Blog
