import { configureStore } from '@reduxjs/toolkit'
import { academicReducer } from './academicSlice'
import { userReducer } from './userSlice'

const rootReducer = ({
  user: userReducer,
  academic: academicReducer
})

export const store = configureStore({ reducer: rootReducer })
