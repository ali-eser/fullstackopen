import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defineNotification } from "./reducers/notificationReducer";
import { initializeBlogs, like, remove } from "./reducers/blogReducer";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const notification = useSelector(({ notification }) => notification)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(({ blogs }) => {
    blogs = [...blogs]
    return blogs.sort((a,b) => (b.likes - a.likes))
  })

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(defineNotification(`${user.username} logged in successfully!`, 5))
      console.log(user.username, "logged in");
    } catch (exception) {
      console.log("Invalid credentials");
      dispatch(defineNotification('wrong username or password', 5))
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
    dispatch(defineNotification(`${user.username} logged out successfully!`, 5));
  };

  const handleLikes = async blog => {
    try {
      blog = {...blog}
      blog.likes = blog.likes + 1
      dispatch(like(blog))
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleDelete = async (blog) => {
    if (user.username === blog.user.username) {
      if (window.confirm(`Remove blog "${blog.title} by ${blog.author}"?`)) {
        try {
          dispatch(remove(blog))
        } catch (exception) {
          console.log(exception);
        }
      }
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <div class="notification">{notification}</div>

      {!user && (
        <Toggleable buttonLabel={"Login"}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Toggleable>
      )}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button id="logout-button" onClick={handleLogout}>
            logout
          </button>
          <br />
          <Toggleable buttonLabel={"add new blog"}>
            <BlogForm />
          </Toggleable>
        </div>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={handleLikes}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
