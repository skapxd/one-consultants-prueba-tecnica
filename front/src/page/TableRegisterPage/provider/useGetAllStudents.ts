import { CustomSettings } from '#/customSettings'
import { useEffect, useState } from 'react'

export const useGetAllStudentsService = () => {
  let isActiveHook = true

  const [students, setStudents] = useState({
    isLoading: true,
    data: [] as Array<any>
  })

  const getAllStudents = async () => {
    try {
      const url = CustomSettings.getUrlBaseServer('/students')
      const resp = await fetch(url)
      const json = await resp.json()

      if (resp.status >= 400) throw new Error(`Falló la obtención de datos: ${JSON.stringify(json || {}, null, 2)}`)

      if (!isActiveHook) return

      setStudents({ isLoading: false, data: [...json.data] })
    } catch (error) {
      // @ts-ignore
      console.error('🚀 ~ Error Service: TableRegisterPage.spec.tsx ~ line 22 ~ getAllStudents ~ error', error.message)
      setStudents({ isLoading: false, data: [] })
    }
  }

  useEffect(() => {
    return () => {
      isActiveHook = false
    }
  }, [])

  return {
    students,
    getAllStudents
  }
}
