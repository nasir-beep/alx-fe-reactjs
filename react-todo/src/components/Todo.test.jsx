import { render, screen } from '@testing-library/react'
import Todo from './Todo'

describe('Todo Component', () => {
  test('renders heading', () => {
    render(<Todo />)
    const heading = screen.getByText(/todo/i)
    expect(heading).toBeInTheDocument()
  })
})
