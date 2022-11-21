import { Header } from '#/src/components/Header'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { postSaveDataService } from './provider/postSaveData.service'

import { useNavigate } from 'react-router-dom'

export const SummaryPage = () => {
  // @ts-ignore
  const { user, academic } = useSelector(s => s)
  const navigate = useNavigate()
  const [modal, setModal] = useState({ canShow: false, message: '', title: '' })

  const onSaveData = async () => {
    try {
      await postSaveDataService({ academic, user })

      setModal({
        canShow: true,
        title: 'Guardado exitoso',
        message: 'Los datos se guardaron exitosamente, será redirigido a la lista de estudiantes'
      })
    } catch (error) {
      setModal({
        canShow: true,
        title: 'Datos incorrectos',
        // @ts-ignore
        message: error.message
      })
      // @ts-ignore
      console.error('🚀 ~ Error Service: SummaryPage.tsx ~ line 12 ~ onSaveData ~ error', error.message)
    }
  }

  return (
    <>
      <div className='container' style={{ marginBottom: '100px' }}>
        <Header />

        <article>
          <h1>Verificar los datos personales</h1>
          <div className="grid">
            <label>
              Primer nombre
              <input type="text" placeholder='Primer nombre' readOnly value={user.firstName}/>
            </label>

            <label>
              Primer apellido
              <input type="text" placeholder='Primer apellido' readOnly value={user.lastName}/>
            </label>
          </div>

          <label>
            Correo electrónico
            <input type="text" placeholder='Correo electrónico' readOnly value={user.email}/>
          </label>

        </article>

        <article>
          <h1>Verificar los datos académicos</h1>

          <div className="grid">
            <label >
              Curso
              <input type="text" placeholder="Curso" readOnly value={academic.course}/>
            </label>

            <label >
              Profesor
              <input type="text" placeholder="Profesor" readOnly value={academic.teacher}/>
            </label>
          </div>

          <div className="grid">
            <label >
              Año
              <input type="text" placeholder="Profesor" readOnly value={academic.year}/>
            </label>

            <label >
              Período
              <input type="text" placeholder="Profesor" readOnly value={academic.period}/>
            </label>

          </div>
        </article>
        <button onClick={onSaveData}>Guardar</button>
      </div>

      <dialog open={modal.canShow}>
        <article>
          <h3>{modal.title}</h3>
          <p>{modal.message}</p>
          <footer>
            <button role="button" onClick={() => {
              setModal(e => ({ ...e, canShow: false }))
              if (modal.title === 'Guardado exitoso') navigate('/table-register')
            }}
            >
              Aceptar
            </button>
          </footer>
        </article>
      </dialog>
    </>
  )
}
