import { cleanup, render, screen } from '@testing-library/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { beforeEach, describe, expect, it } from 'vitest'
import { store } from '#/src/globalState/store'
import { setUser } from '#/src/globalState/userSlice'
import { SummaryPage } from './SummaryPage'
import { setAcademic } from '#/src/globalState/academicSlice'

const router = createBrowserRouter([{ path: '/', element: <SummaryPage/> }])

describe.concurrent('SummaryPage', () => {
  beforeEach(() => {
    cleanup()
    render(
      <Provider store={store} >
        <RouterProvider router={router} />
      </Provider>
    )
  })

  it('should be a function', () => {
    expect(SummaryPage).toBeTypeOf('function')
  })

  it('should render header', () => {
    screen.getByText('Brand')
    screen.getByText('Lista de estudiantes')
  })

  it.each([
    'Verificar los datos personales',
    'Verificar los datos académicos'
  ])('should render heading "%s"', (props) => {
    screen.getAllByRole('heading')
    screen.getByText(props)
  })

  it('should throw if input "Primer nombre" is empty', async () => {
    store.dispatch(setUser({ firstName: 'Manuel', lastName: 'Londoño', email: 'hbiaser132@gmail.com' }))
    store.dispatch(setAcademic({
      course: 'Programación',
      period: 'Primer Período',
      year: '2022',
      teacher: 'David'
    }))

    await screen.findByDisplayValue('Manuel')
    await screen.findByDisplayValue('Londoño')
    await screen.findByDisplayValue('hbiaser132@gmail.com')

    await screen.findByDisplayValue('Programación')
    await screen.findByDisplayValue('David')
    await screen.findByDisplayValue('Primer Período')
    await screen.findByDisplayValue('2022')
  })

  it('should render button to "Guardar" data', () => {
    screen.getByRole('button')
    screen.getByText('Guardar')
  })
})
