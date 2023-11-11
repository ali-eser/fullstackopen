const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/list', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body

  if (!(username && password)) {
    response.status(401).send('Username or password is missing')
  }

  if (username.length < 3 || password.length < 3) {
    response.status(401).send('Username and password must at least be 3 characters long')
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter