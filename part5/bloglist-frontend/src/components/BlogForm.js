import React from 'react'
import Input from './Input'

const BlogForm = ({
  addBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <Input label="title" value={title} changer={setTitle} />
      <Input label="author" value={author} changer={setAuthor} />
      <Input label="url" value={url} changer={setUrl} />
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm
