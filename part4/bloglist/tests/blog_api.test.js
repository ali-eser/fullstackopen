const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')
    
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(note => note.save())
    await Promise.all(promiseArray)
  })
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'Full Stack Open'
    )
  }, 100000)

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'CS50 AI',
      author: 'Harvard University',
      url: 'https://cs50.harvard.edu/ai/2023/',
      likes: 50
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(r => r.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('CS50 AI')

  }, 100000)

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Harvard University',
      url: 'https://cs50.harvard.edu/ai/2023/',
      likes: 50
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToRequest = blogsAtStart[0]
    
    const response = await api
      .get(`/api/blogs/${blogToRequest.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(blogToRequest)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const blogs = blogsAtEnd.map(r => r.title)
    expect(blogs).not.toContain(blogToDelete.title)
  })

  test('blog posts have properties named id', async () => {
    const blogs = await helper.blogsInDb()
    for (let i = 0; i < blogs.length; i++) {
      expect(blogs[i].id).toBeDefined()
    }
  })
  
  test('blog posts with no likes property default to 0 likes', async () => {
    const newBlog = {
      title: 'CS50 AI',
      author: 'Harvard University',
      url: 'https://cs50.harvard.edu/ai/2023/'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogs = await helper.blogsInDb()
    expect(blogs[blogs.length - 1].likes).toEqual(0)
  })

  test('blog posts with no title or url properties are declined', async () => {
    const newBlog = {
      author: 'Harvard University',
      likes: 50
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  }, 100000)
})

