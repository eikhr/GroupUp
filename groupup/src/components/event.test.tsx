import { render } from '@testing-library/react'
import Event from './event'
import React from 'react'

const event = { title: 'testevent', id: 1, description: 'Whatever' }
it('renders with event details', () => {
  const { container } = render(<Event data={event} />)
  expect(container.querySelector("[data-testid='title']")?.textContent).toBe(event.title)
  expect(container.querySelector("[data-testid='description']")?.textContent).toBe(
    event.description
  )
})
