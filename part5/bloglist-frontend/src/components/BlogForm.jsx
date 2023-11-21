import { useState } from 'react'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    props.handlePost({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <div>
      <h2>add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:<input
            type="text"
            value={title}
            name="Title"
            id="title"
            onChange={event => setTitle(event.target.value)}/>
        </div>
        <div>
          author:<input
            type="text"
            value={author}
            name="Author"
            id="author"
            onChange={event => setAuthor(event.target.value)}/>
        </div>
        <div>
          url:<input
            type="text"
            value={url}
            name="URL"
            id="url"
            onChange={event => setURL(event.target.value)}/>
        </div>
        <br />
        <button id="submit" type="submit">post blog</button>
      </form>
    </div>
  )
}

export default BlogForm