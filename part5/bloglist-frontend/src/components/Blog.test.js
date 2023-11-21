import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog component', () => {
  const blog = {
    title: 'example blog',
    author: 'University of Helsinki',
    url: 'fullstackopen.com',
    user: {
      name: 'Superuser'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const title = screen.getByText('example blog by University of Helsinki')
  const hidden = container.querySelector('#hidden')

  expect(title).toBeDefined()
  expect(hidden).toHaveStyle('display: none')
})