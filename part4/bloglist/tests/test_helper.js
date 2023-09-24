const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'CS5O',
    author: 'Harvard University',
    url: 'https://cs50.harvard.edu/x/2023/',
    likes: 50
  },
  {
    title: 'Full Stack Open',
    author: 'University of Helsinki',
    url: 'https://fullstackopen.com/en/',
    likes: 40
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}