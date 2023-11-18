import { useState } from "react"

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [visibility, setVisibility] = useState('none')
  const [buttonLabel, setLabel] = useState('view')

  const blogStyle = {
    border: '2px solid',
    borderColor: 'orangered',
    marginTop: '5px',
    marginBottom: '5px',
    padding: '4px'
  }

  const blogDetailStyle = {
    display: visibility
  }

  const showDetails = () => {
    if (visibility === 'none') {
      setVisibility('block')
      setLabel('hide')
    } else {
      setVisibility('none')
      setLabel('view')
    }
  }

  const updateLikes = (event) => {
    event.preventDefault()
    handleLikes(blog)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to remove?')) {
      handleDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} <button onClick={showDetails}>{buttonLabel}</button>
      <br />
      <div style={blogDetailStyle}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes: {blog.likes} <button onClick={updateLikes}>like</button>
        <br />
        {blog.user.name}
        <br />
        <button onClick={removeBlog}>remove blog</button>
      </div>
    </div>  
  )
}

export default Blog