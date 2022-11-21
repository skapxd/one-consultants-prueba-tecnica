import { validate } from 'email-validator'
import { useState, FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../globalState/userSlice'
import { useNavigate } from 'react-router-dom'
import { Header } from '#/src/components/Header'

export const DataPersonalPage = () => {
  const [modal, setModal] = useState({ canShow: false, message: '' })
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: {
      value: '',
      isValid: true
    },
    lastName: {
      value: '',
      isValid: true
    },
    email: {
      value: '',
      isValid: true
    }
  })

  const dispatch = useDispatch()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const inputNamesES: {[x: string]: string} = {
      email: 'Correo electrónico',
      firstName: 'Primer nombre',
      lastName: 'Primer apellido'
    }

    try {
      Object.entries(form).forEach(([key, value]) => {
        if (!value.isValid) throw new Error(`El input ${inputNamesES[key]} no es valido`)
        if (value.value === '') throw new Error(`El input ${inputNamesES[key]} está vacío`)
      })

      dispatch(setUser({
        email: form.email.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value
      }))

      navigate('/academic')
    } catch (error) {
      // @ts-ignore
      console.error('🚀 ~ file: DataPersonalPage.tsx ~ line 52 ~ onSubmit ~ error', error.message)
      // @ts-ignore
      setModal({ canShow: true, message: error.message })
    }
  }

  return (
    <>
      <main className={'container'}>
        <Header/>
        <article>
          <h1>Datos personales</h1>
          <form onSubmit={onSubmit} >
            <div className="grid">
              <label>
                Primer nombre
                <input type="text" placeholder='Primer nombre' aria-invalid={`${!form.firstName.isValid}`} required onChange={(e) => {
                  const { value } = e.target

                  const regExp = /^([A-z]|[Á-ü]){1,20}$/
                  const isValid = regExp.test(value)

                  setForm(e => ({ ...e, firstName: { value, isValid } }))
                }}
                />
              </label>

              <label>
                Primer apellido
                <input type="text" placeholder='Primer apellido' aria-invalid={`${!form.lastName.isValid}`} required onChange={(e) => {
                  const { value } = e.target

                  const regExp = /^([A-z]|[Á-ü]){1,20}$/
                  const isValid = regExp.test(value)

                  setForm(e => ({ ...e, lastName: { value, isValid } }))
                }}
                />
              </label>
            </div>

            <label>
              Correo electrónico
              <input type="text" placeholder='Correo electrónico' aria-invalid={`${!form.email.isValid}`} required onChange={(e) => {
                const { value } = e.target

                const isValid = validate(value)

                setForm(e => ({ ...e, email: { value, isValid } }))
              }}
              />
            </label>

            <button type='submit'>Siguiente</button>
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
