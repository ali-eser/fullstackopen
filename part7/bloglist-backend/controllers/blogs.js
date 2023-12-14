const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).send('Blog post with given id not found')
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!(request.user)) {
    return response.status(401).json({
      error: 'invalid user'
    })
  }
  const user = request.user
  console.log(user)

  if (!Object.hasOwn(body, 'title') || !Object.hasOwn(body, 'url')) {
    response.status(400).send()
  } else {
    if (!Object.hasOwn(body, 'likes')) {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0,
        user: user.id
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
        user: user.id
      })
  
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog)
    }   
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  console.log('user: ', user.id.toString(), 'blog created by: ', blog.user.toString())
  if (user.id === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  return response.status(401).json({
    error: 'invalid token'
  })
})

blogsRouter.delete('/', async (request, response) => {
  await Blog.deleteMany({})
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  console.log(request.body)
  const blog = await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes })
  response.status(201).json(blog)
})

module.exports = blogsRouter