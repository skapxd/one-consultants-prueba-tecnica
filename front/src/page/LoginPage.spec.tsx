import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'

const Test = () => {
  return <h1>Hola Mundo</h1>
}

describe.concurrent('LoginPage', () => {
  it('should render', () => {
    render(<Test />)
    screen.getByRole('heading')
  })
})
