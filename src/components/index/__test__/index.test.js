import React from 'react'
import { render, screen } from '@testing-library/react'



describe('App', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('renders users when API call succeeds', async () => {})

  test('renders error when API call fails', async () => {})
})