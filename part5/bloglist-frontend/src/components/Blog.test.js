import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('renders blog component', async () => {
  const blog = {
    title: 'example blog',
    author: 'University of Helsinki',
    url: 'fullstackopen.com',
    user: {
      name: 'Superuser'
    }
  }

  const mockHandler = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<Blog blog={blog} handleLikes={mockHandler} />)

  const viewButton = container.querySelector('#view-button')
  const likeButton = container.querySelector('#like-button')

  const title = screen.getByText('example blog by University of Helsinki')
  const hidden = container.querySelector('#hidden')

  expect(title).toBeDefined()
  expect(hidden).toHaveStyle('display: none')

  await user.click(viewButton)

  expect(hidden).toHaveStyle('display: block')

  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('creates new blog', async () => {
  const createBlog = jest.fn()

  const { container } = render(<BlogForm handlePost={createBlog} />)

  const submitButton = container.querySelector('#submit')

  await userEvent.type(container.querySelector('#title'), 'full stack open')
  await userEvent.type(container.querySelector('#author'), 'university of helsinki')
  await userEvent.type(container.querySelector('#url'), 'fullstackopen.com')
  await userEvent.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('full stack open')
  expect(createBlog.mock.calls[0][0].author).toBe('university of helsinki')
  expect(createBlog.mock.calls[0][0].url).toBe('fullstackopen.com')
})