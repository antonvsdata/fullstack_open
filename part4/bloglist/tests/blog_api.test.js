const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogsArray)
})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs is returned', async () => {
  const blogsRes = await helper.blogsInDb()
  expect(blogsRes).toHaveLength(helper.blogsArray.length)
})

test('identifier field is named "id"', async () => {
  const blogs = await helper.blogsInDb()
  const blog = blogs[0]
  expect(blog.id).toBeDefined()
  expect(blog._id).not.toBeDefined()
})

test('new blog is added successfully', async () => {
  const newBlog = {
    title: 'Online R trainings',
    author: 'eoda GmbH',
    url: 'https://www.r-bloggers.com/online-r-trainings/',
    likes: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogsArray.length + 1)

  const titles = blogsAtEnd.map((blog) => blog.title)
  expect(titles).toContain(newBlog.title)
})

test('new blog with undefined likes get likes: 0', async () => {
  const newBlog = {
    title: 'Online R trainings',
    author: 'eoda GmbH',
    url: 'https://www.r-bloggers.com/online-r-trainings/',
  }
  await api.post('/api/blogs').send(newBlog)

  const addedDoc = await helper.blogsInDb({ title: newBlog.title })
  expect(addedDoc[0].likes).toBe(0)
})

test('title and url are required', async () => {
  const newBlogs = [
    {
      author: 'eoda GmbH',
    },
    {
      author: 'eoda GmbH',
      url: 'https://www.r-bloggers.com/online-r-trainings/',
    },
    {
      title: 'Online R trainings',
      author: 'eoda GmbH',
    },
  ]
  for (let newBlog of newBlogs) {
    await api.post('/api/blogs').send(newBlog).expect(400)
  }
})

test('blog can be deleted', async () => {
  const blogs = await helper.blogsInDb()
  const idrm = blogs[0].id

  await api.delete(`/api/blogs/${idrm}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogsArray.length - 1)

  const ids = blogsAtEnd.map((blog) => blog.id)
  expect(ids).not.toContain(idrm)
})

test('blog can be deleted', async () => {
  const blogs = await helper.blogsInDb()
  const idup = blogs[0].id

  await api
    .put(`/api/blogs/${idup}`)
    .send({ title: "It's over 9000!", likes: 9001 })

  const updatedBlog = await helper.blogsInDb({ _id: idup })
  expect(updatedBlog[0].title).toBe("It's over 9000!")
  expect(updatedBlog[0].likes).toBe(9001)
})

afterAll(() => {
  mongoose.connection.close()
})
