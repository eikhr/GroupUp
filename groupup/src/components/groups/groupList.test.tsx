import { render } from '@testing-library/react'
import GroupList from './groupList'
import React from 'react'
import mockFetch from '../../utils/mockFetch'
import awaitAsync from '../../utils/awaitAsync'

it('renders a list groups', async () => {
  const groups = [
    {
      id: 1,
      name: 'myFirstGroup',
      description: 'Something',
      interests: ['horses'],
      contactEmail: 'email@email.mail',
      events: { title: 'myEvent', description: 'desc', interests: [] },
    },
    {
      id: 2,
      name: 'second',
      description: 'Something',
      interests: ['horses'],
      contactEmail: 'email@email.mail',
      events: { title: 'sec', description: 'desc', interests: [] },
    },
    {
      id: 3,
      name: 'third',
      description: 'Something',
      interests: ['horses'],
      contactEmail: 'email@email.mail',
      events: { title: 'myEvent', description: 'desc', interests: [] },
    },
    {
      id: 4,
      name: 'fourth',
      description: 'Something',
      interests: ['horses'],
      contactEmail: 'email@email.mail',
      events: { title: 'myEvent', description: 'desc', interests: [] },
    },
    {
      id: 5,
      name: 'fifth',
      description: 'Something',
      interests: ['horses'],
      contactEmail: 'email@email.mail',
      events: { title: 'myEvent', description: 'desc', interests: [] },
    },
    {
      id: 6,
      name: 'sixth',
      description: 'Something',
      interests: ['horses'],
      contactEmail: 'email@email.mail',
      events: { title: 'myEvent', description: 'desc', interests: [] },
    },
    {
      id: 7,
      name: 'seventh',
      description: 'Something',
      interests: ['horses'],
      contactEmail: 'email@email.mail',
      events: { title: 'myEvent', description: 'desc', interests: [] },
    },
    {
      id: 8,
      name: 'eighth',
      description: 'Something',
      interests: ['horses'],
      contactEmail: 'email@email.mail',
      events: { title: 'myEvent', description: 'desc', interests: [] },
    },
    {
      id: 9,
      name: 'ninth',
      description: 'Something',
      interests: ['horses'],
      contactEmail: 'email@email.mail',
      events: { title: 'myEvent', description: 'desc', interests: [] },
    },
    {
      id: 10,
      name: 'tenth',
      description: 'Something',
      interests: ['horses'],
      contactEmail: 'email@email.mail',
      events: { title: 'myEvent', description: 'desc', interests: [] },
    },
  ]
  mockFetch(200, groups)

  const container = render(<GroupList />).container

  expect(container.querySelector("[data-testid='loading-text']")).not.toBeNull()

  await awaitAsync()

  for (const group of groups) {
    expect(container.querySelector(`[data-testid='group-${group.id}']`)).not.toBeNull()
  }
})

it('shows error on error', async () => {
  mockFetch(500, {})

  const container = render(<GroupList />).container

  expect(container.querySelector("[data-testid='loading-text']")).not.toBeNull()

  await awaitAsync()

  expect(container.querySelector(`[data-testid='error']`)).not.toBeNull()
})
