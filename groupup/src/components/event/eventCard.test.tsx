import { render } from '@testing-library/react'
import EventCard from './eventCard'
import React from 'react'
import moment from 'moment'

it('renders with event details', () => {
  const event = {
    title: 'testevent',
    id: 1,
    description: 'Whatever',
    groups: [
      { name: 'groupName', description: 'describing', interests: [], email: 'email' },
    ],
  }
  const { container } = render(<EventCard data={event} />)
  expect(container.querySelector("[data-testid='title']")?.textContent).toBe(event.title)
  expect(container.querySelector("[data-testid='description']")?.textContent).toBe(
    event.description
  )
  expect(container.querySelector("[data-testid='time']")).toBeNull()
})

it('renders with time', () => {
  const event = {
    title: 'testevent',
    id: 1,
    description: 'Whatever',
    time: '1999-06-26T12:32:43Z',
    groups: [
      { name: 'groupName', description: 'describing', interests: [], email: 'email' },
    ],
  }
  const { container } = render(<EventCard data={event} />)
  expect(container.querySelector("[data-testid='time']")?.textContent).toBe(
    moment(event.time).format('LLLL')
  )
})
