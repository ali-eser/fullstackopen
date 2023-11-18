import { useState } from "react"

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} <button onClick={showDetails}>{buttonLabel}</button>
      <br />
      <div style={blogDetailStyle}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes: {blog.likes} <button>like</button>
        <br />
        {blog.user.name}
      </div>
    </div>  
  )
}

export default Blog