import { useState } from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, handleDelete, user }) => {
  const [visibility, setVisibility] = useState('none')
  const [showRemove, setShowRemove] = useState('none')
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

  const removeVisibility = {
    display: showRemove
  }

  useEffect(() => {
    if (user) {
      if (user.username === blog.user.username) {
        setShowRemove('block')
      }
    }
  }, [])
  

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
      {blog.title} by {blog.author} <button id='view-button' onClick={showDetails}>{buttonLabel}</button>
      <br />
      <div id='hidden' style={blogDetailStyle}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes: {blog.likes} <button id='like-button' onClick={updateLikes}>like</button>
        <br />
        {blog.user.name}
        <br />
        <button style={removeVisibility} id='remove-blog-button' onClick={removeBlog}>remove blog</button>
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