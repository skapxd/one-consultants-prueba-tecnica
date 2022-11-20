import { createSlice } from '@reduxjs/toolkit'

export interface IAcademic {
  course: string
  year: string
  period: string
  teacher: string
}

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
