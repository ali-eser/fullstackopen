import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs"
import blogs from "../services/blogs";

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs (state, action) {
      return action.payload
    },
    likeBlog (state, action) {
      const id = action.payload
      const blogToLike = state.find(a => a.id === id)
      const updatedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state.map(blog => blog.id !== id ? blog : updatedBlog)
    },
    addBlog (state, action) {
      return state.concat(action.payload)
    },
    deleteBlog (state, action) {
      const copyState = [...state]
      const id = action.payload
      const blogToDelete = copyState.find(blog => blog.id === id)
      const index = copyState.indexOf(blogToDelete)
      if (index > -1)
      copyState.splice(index, 1)
      return copyState
    }
  }
})

export const { setBlogs, likeBlog, addBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const like = object => {
  return async dispatch => {
    await blogService.updateLikes(object)
    dispatch(likeBlog(object.id))
  }
}

export const createBlog = object => {
  return async dispatch => {
    const postedBlog = await blogService.addBlog(object)
    const newBlogWithID = await blogService.getOne(postedBlog.id)
    dispatch(addBlog(newBlogWithID))
  }
}

export const remove = object => {
  return async dispatch => {
    const id = object.id
    await blogService.removeBlog(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer