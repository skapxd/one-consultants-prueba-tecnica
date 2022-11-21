import { createSlice } from '@reduxjs/toolkit'

export interface IUser {
  email: string
  firstName: string
  lastName: string
}

const initialState: IUser = {
  email: '',
  firstName: '',
  lastName: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: {payload: IUser; type: string;}) => action.payload,
    cleanUser: () => initialState
  }
})

export const { cleanUser, setUser } = userSlice.actions

export const userReducer = userSlice.reducer
