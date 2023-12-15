import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { defineNotification } from "../reducers/notificationReducer";

const BlogForm = (props) => {
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };

    dispatch(createBlog(newBlog))
    dispatch(defineNotification(`you added ${newBlog.title} by ${newBlog.author}`, 5))

    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';
  };

  return (
    <div>
      <h2>add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            id="title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            id="author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="URL"
            id="url"
          />
        </div>
        <br />
        <button id="submit" type="submit">
          post blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
