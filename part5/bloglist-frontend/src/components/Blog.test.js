import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
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

  const { container } = render(<Blog blog={blog} />)

  const viewButton = container.querySelector('#view-button')

  const title = screen.getByText('example blog by University of Helsinki')
  const hidden = container.querySelector('#hidden')

  expect(title).toBeDefined()
  expect(hidden).toHaveStyle('display: none')

  await user.click(viewButton)

  expect(hidden).toHaveStyle('display: block')
})