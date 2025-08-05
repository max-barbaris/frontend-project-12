import { configureStore } from '@reduxjs/toolkit'

import authApi from '../features/auth/authApi'
import authSlice from '../features/auth/authSlice'
import channelsApi from '../features/channels/channelsApi'
import uiSlice from '../features/ui/uiSlice'
import messagesApi from '../features/messages/messagesApi'

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),
})

export default store
