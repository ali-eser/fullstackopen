const blogsRouter = require('express').Router()
const { application } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).send('Person with given id not found')
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!Object.hasOwn(body, 'title')) {
    response.status(400).send()
  } else {
    if (!Object.hasOwn(body, 'likes')) {
      body.likes = 0
      const blog = new Blog(body)

      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }
    const blog = new Blog(body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter