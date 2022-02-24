import { render } from '@testing-library/react'
import CoverPage from './coverPage'
import React from 'react'

it('shows the GroupUp title', () => {
  const { container } = render(<CoverPage />)
  expect(container.querySelector("[data-testid='title']")?.textContent).toBe('GroupUp')
})
