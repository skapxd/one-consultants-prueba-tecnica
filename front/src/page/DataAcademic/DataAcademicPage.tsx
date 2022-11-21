import { Header } from '#/src/components/Header'
import { setAcademic } from '#/src/globalState/academicSlice'
import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const DataAcademic = () => {
  const [modal, setModal] = useState({ canShow: false, message: '' })
  const navigate = useNavigate()

  const [form, setForm] = useState({
    course: {
      isValid: true,
      value: ''
    },
    period: {
      isValid: true,
      value: ''
    },
    year: {
      isValid: true,
      value: ''
    },
    teacher: {
      isValid: true,
      value: ''
    }
  })

  const dispatch = useDispatch()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const inputNamesES: {[x: string]: string} = {
      course: 'Curso',
      period: 'Período',
      year: 'Año',
      teacher: 'Profesor'
    }

    try {
      Object.entries(form).forEach(([key, value]) => {
        if (!value.isValid) throw new Error(`El input ${inputNamesES[key]} no es valido`)
        if (value.value === '') throw new Error(`El input ${inputNamesES[key]} está vacío`)
      })

      dispatch(setAcademic({
        course: form.course.value,
        period: form.period.value,
        year: form.year.value,
        teacher: form.teacher.value
      }))

      navigate('/summary')
    } catch (error) {
      // @ts-ignore
      console.log('🚀 ~ file: DataAcademicPage.tsx ~ line 57 ~ onSubmit ~ error', error.message)
      // @ts-ignore
      setModal({ canShow: true, message: error.message })
    }
  }

  return (
    <>
      <main className="container">
        <Header/>
        <article>

          <h1>Datos académicos</h1>
          <form onSubmit={onSubmit} >

            <div className="grid">
              <label >
                Curso
                <input type="text" placeholder="Curso" aria-invalid={`${!form.course.isValid}`} required onChange={(e) => {
                  const { value } = e.target
                  const regExp = /^(\w|\s|[Á-ü]){1,20}$/
                  const isValid = regExp.test(value)
                  setForm(s => ({ ...s, course: { isValid, value } }))
                }}
                />
              </label>

              <label >
                Profesor
                <input type="text" placeholder="Profesor" aria-invalid={`${!form.teacher.isValid}`} required onChange={(e) => {
                  const { value } = e.target
                  const regExp = /^(\w|\s|[Á-ü]){1,20}$/
                  const isValid = regExp.test(value)
                  setForm(s => ({ ...s, teacher: { isValid, value } }))
                }}
                />
              </label>
            </div>

            <div className="grid">
              <label >
                Año
                <details role="list" id='years'>
                  <summary aria-haspopup="listbox" aria-invalid={'false'}>{ form.year.value || 'Año'}</summary>
                  <ul role="listbox">
                    {['2023', '2022', '2021', '2020'].map(e => {
                      return (
                        <li key={e} onClick={() => {
                          setForm(s => ({ ...s, year: { value: e, isValid: true } }))
                          document.querySelector('#years')?.removeAttribute('open')
                        }}
                        >
                          <a>{e}</a>
                        </li>
                      )
                    })}
                  </ul>
                </details>
              </label>

              <label >
                Período

                <details role="list" id='periods'>
                  <summary aria-haspopup="listbox">{ form.period.value || 'Período'}</summary>
                  <ul role="listbox">
                    {['Primer período', 'Segundo período', 'Tercer período'].map(e => {
                      return (
                        <li key={e} onClick={() => {
                          setForm(s => ({ ...s, period: { value: e, isValid: true } }))
                          document.querySelector('#periods')?.removeAttribute('open')
                        }}
                        >
                          <a>{e}</a>
                        </li>
                      )
                    })}
                  </ul>
                </details>
              </label>

            </div>
            <button type="submit">Siguiente</button>
          </form>
        </article>
      </main>

      <dialog open={modal.canShow} >
        <article>
          <h3>Datos incorrectos</h3>
          <p>{modal.message}</p>
          <footer>
            <button role="button" onClick={() => setModal(e => ({ ...e, canShow: false }))} >Confirm</button>
          </footer>
        </article>
      </dialog>
    </>
  )
}
