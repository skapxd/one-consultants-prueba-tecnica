import '@picocss/pico'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './globalState/store'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { ErrorPage } from './page/ErrorPage'
import { DataAcademic } from './page/DataAcademic/DataAcademicPage'
import { DataPersonalPage } from './page/DataPersonalPage/DataPersonalPage'
import { SummaryPage } from './page/SummaryPage/SummaryPage'
import { TableRegisterPage } from './page/TableRegisterPage/TableRegisterPage'

export const pathOfPages = [
  {
    path: '/',
    element: <DataPersonalPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/academic',
    element: <DataAcademic />
  },
  {
    path: '/summary',
    element: <SummaryPage />
  },
  {
    path: '/table-register',
    element: <TableRegisterPage />
  }
]

export const router = createBrowserRouter(pathOfPages)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
)
