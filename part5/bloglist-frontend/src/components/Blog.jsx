import { useState } from 'react'
import PropTypes from 'prop-types'

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
    handleDelete(blog)
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} by {blog.author} <button onClick={showDetails}>{buttonLabel}</button>
      <br />
      <div id='hidden' style={blogDetailStyle}>
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog