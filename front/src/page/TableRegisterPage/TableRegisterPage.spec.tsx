import { cleanup, render, screen } from '@testing-library/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { TableRegisterPage } from './TableRegisterPage'

const router = createBrowserRouter([{ path: '/', element: <TableRegisterPage/> }])

describe.concurrent('TableRegisterPage', () => {
  beforeEach(() => {
    cleanup()
    render(<RouterProvider router={router} />)
  })

  it('should be a function', () => {
    expect(TableRegisterPage).toBeTypeOf('function')
  })

  it('should render header', () => {
    screen.getByText('Brand')
    // screen.getByText('Lista de estudiantes')
  })

  it.each([
    'Correo electrónico',
    'Primer nombre',
    'Primer apellido',
    'Curso',
    'Año',
    'Profesor',
    'Período'
  ])('should render heading "%s" in table', (props) => {
    screen.getByText(props)
  })

  // it('should render multiple rows', async () => {
  //   const rows = await screen.findAllByTestId('row')
  //   expect(rows.length).toBeGreaterThan(1)
  // })
})
