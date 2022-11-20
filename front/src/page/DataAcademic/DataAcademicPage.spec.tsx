import { beforeEach, describe, expect, it } from 'vitest'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { store } from '#/src/globalState/store'
import { Provider } from 'react-redux'
import { DataAcademic } from './DataAcademicPage'

const router = createBrowserRouter([{ path: '/', element: <DataAcademic /> }])

describe.concurrent('DataAcademic', () => {
  beforeEach(() => {
    cleanup()
    render(
      <Provider store={store} >
        <RouterProvider router={router} />
      </Provider>
    )
  })

  it('should be a function', () => {
    expect(DataAcademic).toBeTypeOf('function')
  })

  it('should render heading "Datos académicos"', () => {
    screen.getByRole('heading')
    screen.getByText('Datos académicos')
  })

  it.each([
    'Curso',
    'Profesor'
  ])('should render (%s) input and label ui', (props) => {
    screen.getByLabelText(props)
    screen.getByPlaceholderText(props)
  })

  it('should render button to "Guardar" info', () => {
    screen.getByRole('button')
    screen.getByText('Siguiente')
  })

  it.each([
    'Curso',
    'Profesor'
  ])('should feed back invalid if "%s" input format contain special characters', (props) => {
    const input = screen.getByPlaceholderText(props)
    fireEvent.input(input, { target: { value: '@#$%^&*()_+' } })
    expect(input.getAttribute('aria-invalid')).toBe('true')
  })
})
