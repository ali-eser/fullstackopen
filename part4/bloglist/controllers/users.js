const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/list', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body

  const isUser = await User.findOne({ username: username })
  
  if (!(username && password)) {
    return response.status(401).send('Username or password is missing')
  } else if (isUser) {
    return response.status(401).send('Username already taken')
  } else if (username.length < 3 || password.length < 3) {
    return response.status(401).send('Username and password must at least be 3 characters long')
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter