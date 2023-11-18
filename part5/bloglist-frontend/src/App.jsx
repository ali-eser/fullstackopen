import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => (b.likes - a.likes)) )
    )
  }, [blogs])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`${user.username} logged in successfully!`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.log(user.username, 'logged in')
    } catch (exception) {
      console.log('Invalid credentials')
      setNotification('wrong username or password!')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setNotification(`${user.username} logged out successfully!`)
    setTimeout(() => {
      setNotification(null)
    }, 5000);
  }

  const handlePost = async newBlog => {
    try {
      const blog = await blogService.addBlog(newBlog)
      blogService.getOne(blog.id).then(blog =>
        setBlogs(blogs.concat(blog))
      )
      setNotification(`${blog.title} by ${blog.author} successfully added!`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.log(blog.title, 'by', blog.author, 'successfully added')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLikes = async item => {
    try {
      item.likes = item.likes + 1
      const blog = await blogService.updateLikes(item)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification}

      {!user && <Toggleable buttonLabel={'Login'}>
        <LoginForm 
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin} 
        />
      </Toggleable> }

      {user && <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <br />
          <Toggleable buttonLabel={'add new blog'}>
            <BlogForm handlePost={handlePost} />
          </Toggleable>
        </div>
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} />
      )}
    </div>
  )
}

export default App