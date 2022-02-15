import { render } from '@testing-library/react'
import EventList from './eventList'
import React from 'react'

it('renders a list events', () => {
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
  const { container } = render(<EventList events={events} />)
  for (const event of events) {
    expect(container.querySelector(`[data-testid='event-${event.id}']`)).not.toBeNull()
  }
})
