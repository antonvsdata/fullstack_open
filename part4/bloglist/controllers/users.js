const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.hasOwnProperty('username') || !body.hasOwnProperty('password')) {
    response.status(400).json({ error: 'username and password required' })
  }
  if (body.username.length < 3 || body.password.length < 3) {
    response.status(400).json({
      error: 'username and password should contain at least 3 characters',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })
  response.json(users.map((u) => u.toJSON()))
})

module.exports = userRouter
