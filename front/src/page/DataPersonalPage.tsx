import { validate } from 'email-validator'
import type { FormEvent } from 'react'
import { useState } from 'react'

export const DataPersonalPage = () => {
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className={'container'}>
      <article>
        <h1>Datos personales</h1>
        <form onSubmit={onSubmit} >
          <div className="grid">
            <label>
              Primer nombre
              <input type="text" placeholder='Primer nombre' aria-invalid={form.firstName.isValid ? 'false' : 'true'} required onChange={(e) => {
                const { value } = e.target

                const regExp = /^([A-z]|[Á-ü]){0,20}$/
                const isValid = regExp.test(value)

                setForm(e => ({ ...e, firstName: { value, isValid } }))
              }}
              />
            </label>

            <label>
              Primer apellido
              <input type="text" placeholder='Primer apellido' aria-invalid={form.lastName.isValid ? 'false' : 'true'} required onChange={(e) => {
                const { value } = e.target

                const regExp = /^([A-z]|[Á-ü]){0,20}$/
                const isValid = regExp.test(value)

                setForm(e => ({ ...e, lastName: { value, isValid } }))
              }}
              />
            </label>
          </div>

          <label>
            Correo electrónico
            <input type="text" placeholder='Correo electrónico' aria-invalid={form.email.isValid ? 'false' : 'true'} required onChange={(e) => {
              const { value } = e.target

              const isValid = validate(value)

              setForm(e => ({ ...e, email: { value, isValid } }))
            }}
            />
          </label>

          <button type='submit'>Enviar</button>
        </form>
      </article>
    </div>
  )
}
