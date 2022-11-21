import { createSlice } from '@reduxjs/toolkit'
import { IAcademic } from '../../../Domain/IAcademic'
export type { IAcademic }

const initialState: IAcademic = {
  course: '',
  year: '',
  period: '',
  teacher: ''
}

const academicSlice = createSlice({
  name: 'academic',
  initialState,
  reducers: {
    setAcademic: (state, action: {payload: IAcademic; type: string;}) => action.payload,
    cleanAcademic: () => initialState
  }
})

export const { cleanAcademic, setAcademic } = academicSlice.actions

export const academicReducer = academicSlice.reducer
