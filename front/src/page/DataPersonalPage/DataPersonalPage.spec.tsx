import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { beforeEach, describe, expect, it } from 'vitest'
import { store } from '../../globalState/store'
import { DataPersonalPage } from './DataPersonalPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([{ path: '/', element: <DataPersonalPage /> }])

describe.concurrent('LoginPage', () => {
  beforeEach(() => {
    cleanup()
    render(
      <Provider store={store} >
        <RouterProvider router={router}/>
      </Provider>
    )
  })

  it('should be a function', () => {
    expect(DataPersonalPage).toBeTypeOf('function')
  })

  it('should render heading text "Datos personales"', () => {
    screen.getByRole('heading')
    screen.getByText('Datos personales')
  })

  it.each([
    'Primer nombre',
    'Primer apellido',
    'Correo electrónico'
  ])('should render "%s" input and label ui', (props) => {
    screen.getByLabelText(props)
    screen.getByPlaceholderText(props)
  })

  it('should render button to "Guardar" info', () => {
    screen.getByRole('button')
    screen.getByText('Siguiente')
  })

  it.each(['Primer nombre', 'Primer apellido'])('should feed back invalid if "%s" input is contain number', (props) => {
    const input = screen.getByPlaceholderText(props)
    fireEvent.input(input, { target: { value: '1234567890' } })
    expect(input.getAttribute('aria-invalid')).toBe('true')
  })

  it.each(['Primer nombre', 'Primer apellido'])('should feed back invalid if "%s" input contain special characters', (props) => {
    const input = screen.getByPlaceholderText(props)
    fireEvent.input(input, { target: { value: '@#$%^&*()_+' } })
    expect(input.getAttribute('aria-invalid')).toBe('true')
  })

  it.each([
    '123',
    'abc',
    'abc@',
    'Abc@@',
    'abc@abc',
    'abc@abc@',
    'other formats to validate...'
  ])('should feed back invalid if "Correo electrónico" input format is invalid -> %s', (props) => {
    const input = screen.getByPlaceholderText('Correo electrónico')
    fireEvent.input(input, { target: { value: props } })
    expect(input.getAttribute('aria-invalid')).toBe('true')
  })
})
