import { configureStore } from '@reduxjs/toolkit'
import authApi from '../features/auth/authApi'
import authSlice from '../features/auth/authSlice'
import channelsApi from '../features/channels/channelsApi'
import channelsSlice from '../features/channels/channelsSLice'
const store = configureStore({
  reducer: {
    auth: authSlice,
    channels: channelsSlice,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(channelsApi.middleware),
})

export default store
