import React, { useState } from 'react'
import Input from './Input'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    const blogAdded = addBlog(newBlog)
    if (blogAdded) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <Input label="title" value={title} changer={setTitle} />
        <Input label="author" value={author} changer={setAuthor} />
        <Input label="url" value={url} changer={setUrl} />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
