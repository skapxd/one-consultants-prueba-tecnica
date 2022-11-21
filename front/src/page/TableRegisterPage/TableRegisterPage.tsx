import { Header } from '#/src/components/Header'
import { useEffect } from 'react'
import { useGetAllStudentsService } from './provider/useGetAllStudents'

export const TableRegisterPage = () => {
  const { getAllStudents, students } = useGetAllStudentsService()

  // const students = []

  useEffect(() => {
    getAllStudents()
  }, [])

  if (students.length === 0) return <h1>loading</h1>

  return (
    <div className='container'>
      <Header />

      <article>

        <h1>Lista de estudiantes</h1>
        <figure>
          <table role='grid'>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Primer nombre</th>
                <th scope="col">Primer apellido</th>
                <th scope="col">Correo electrónico</th>
                <th scope="col">Curso</th>
                <th scope="col">Año</th>
                <th scope="col">Período</th>
                <th scope="col">Profesor</th>
              </tr>
            </thead>
            <tbody>
              {students.map((e, i) => {
                return (
                  <tr key={i}>
                    <th scope="row" data-testid='row' >{i + 1}</th>
                    <td>{e.firstName}</td>
                    <td>{e.lastName}</td>
                    <td>{e.email}</td>
                    <td>{e.course}</td>
                    <td>{e.year}</td>
                    <td>{e.period}</td>
                    <td>{e.teacher}</td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        </figure>
      </article>

    </div>
  )
}
