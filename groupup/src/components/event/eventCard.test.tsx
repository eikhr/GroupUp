import { render } from '@testing-library/react'
import EventCard from './eventCard'
import React from 'react'
import moment from 'moment'
import 'moment/locale/nb'
import IEvent from '../../models/event'

it('renders with event details', () => {
  const event: IEvent = {
    title: 'testevent',
    id: 1,
    description: 'Whatever',
    groupsMatched: [
      {
        name: 'groupName',
        description: 'describing',
        interests: [],
        contactEmail: 'email',
      },
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
  const event: IEvent = {
    title: 'testevent',
    id: 1,
    description: 'Whatever',
    date: '1999-06-26T12:32:43Z',
    groupsMatched: [
      {
        name: 'groupName',
        description: 'describing',
        interests: [],
        contactEmail: 'email',
      },
    ],
  }
  moment.locale('nb')

  const { container } = render(<EventCard data={event} />)
  expect(container.querySelector("[data-testid='time']")?.textContent).toBe(
    moment(event.date).calendar({ sameElse: 'dddd Do MMMM [kl.] HH:mm' })
  )
})
