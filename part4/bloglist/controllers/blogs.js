const blogsRouter = require('express').Router()
const { application } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).send('Blog post with given id not found')
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)
  if (!Object.hasOwn(body, 'title') || !Object.hasOwn(body, 'url')) {
    response.status(400).send()
  } else {
    if (!Object.hasOwn(body, 'likes')) {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0,
        user: body.userId
      })

      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog)
    } else {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.userId
      })
  
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      
      response.status(201).json(savedBlog)
    }   
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  console.log(request.body)
  await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes })
  response.status(204).end()
})

module.exports = blogsRouter