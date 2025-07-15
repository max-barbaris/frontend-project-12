import { configureStore } from '@reduxjs/toolkit'
import authApi from '../features/auth/authApi'
import authSlice from '../features/auth/authSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store
