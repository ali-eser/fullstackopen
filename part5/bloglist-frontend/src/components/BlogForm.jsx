import { useState } from 'react'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  return (
    <div>
      <h2>add new blog</h2>
      <form onSubmit={props.onSubmit}>
        <div>
          title:<input 
          type="text"
          value={title}
          name="Title"
          onChange={event => setTitle(event.target.value)}/>
        </div>
        <div>
          author:<input 
          type="text"
          value={author}
          name="Author"
          onChange={event => setAuthor(event.target.value)}/>
        </div>
        <div>
          url:<input 
          type="text"
          value={url}
          name="URL"
          onChange={event => setURL(event.target.value)}/>
        </div>
        <br />
        <button type="submit">post blog</button>
      </form>
    </div>
  )
}

export default BlogForm