import { render } from '@testing-library/react'
import EventList from './eventList'
import React from 'react'
import { act } from 'react-dom/test-utils'

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
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(events),
    } as any)
  )

  const container = render(<EventList />).container
  expect(container.querySelector("[data-testid='loadingtext']")).not.toBeNull()
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
  })

  for (const event of events) {
    expect(container.querySelector(`[data-testid='event-${event.id}']`)).not.toBeNull()
  }
})
