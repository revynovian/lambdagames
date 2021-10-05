import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/slices/user'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})