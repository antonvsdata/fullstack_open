const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { TestScheduler } = require('jest')

const api = supertest(app)

test.only('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})
