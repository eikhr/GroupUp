import { render } from '@testing-library/react'
import EventList from './eventList'
import React from 'react'
import mockFetch from '../../utils/mockFetch'
import awaitAsync from '../../utils/awaitAsync'

it('renders a list events', async () => {
  const events = [
    { title: 'testevent', id: 1, description: 'Whatever' },
    { title: 'testevent', id: 2, description: 'Whatever' },
    { title: 'testevent', id: 3, description: 'Whatever' },
    { title: 'testevent', id: 4, description: 'Whatever' },
    { title: 'testevent', id: 5, description: 'Whatever' },
    { title: 'testevent', id: 6, description: 'Whatever' },
    { title: 'testevent', id: 7, description: 'Whatever' },
    { title: 'testevent', id: 8, description: 'Whatever' },
    { title: 'testevent', id: 9, description: 'Whatever' },
    { title: 'testevent', id: 10, description: 'Whatever' },
  ]
  mockFetch(200, events)

  const container = render(<EventList />).container

  expect(container.querySelector("[data-testid='loading-text']")).not.toBeNull()

  await awaitAsync()

  for (const event of events) {
    expect(container.querySelector(`[data-testid='event-${event.id}']`)).not.toBeNull()
  }
})

it('shows error on error', async () => {
  mockFetch(500, {})

  const container = render(<EventList />).container

  expect(container.querySelector("[data-testid='loading-text']")).not.toBeNull()

  await awaitAsync()

  expect(container.querySelector(`[data-testid='error']`)).not.toBeNull()
})
