import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input 
          type="text" 
          value={username}
          name="Username" 
          onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password
          <input 
          type="text"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={handlePost}>
      <div>
        title:<input 
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        author:<input 
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        url:<input 
        type="text"
        value={url}
        name="URL"
        onChange={({ target }) => setURL(target.value)}/>
      </div>
      <br />
      <button type="submit">post blog</button>
    </form>
  )

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
      console.log(user.username, 'logged in')
    } catch (exception) {
      console.log('Invalid credentials')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handlePost = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.addBlog({ title, author, url })
      setTitle('')
      setAuthor('')
      setURL('')
      console.log(blog.title, 'by', blog.author, 'successfully added')
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <div>
            <h2>add new blog</h2>
            {blogForm()}
          </div>
          
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App