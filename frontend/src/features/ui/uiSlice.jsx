import { createSlice } from '@reduxjs/toolkit'

import authApi from '../auth/authApi'
import channelsApi from '../channels/channelsApi'
import messagesApi from '../messages/messagesApi'

import { DEFAULT_CHANNEL_ID } from '../../utils/constants'
import { clearError, extractUiError, createErrorHandler } from '../../utils/helpers'

const initialState = {
  currentChannelId: DEFAULT_CHANNEL_ID,
  defaultChannelId: DEFAULT_CHANNEL_ID,
  error: '',
  isError: false,
  redirectToLogin: false,
}

const handleUiError = createErrorHandler(extractUiError)

const getRejectedMatchers = api =>
  Object.values(api.endpoints).map(endpoint => endpoint.matchRejected)

const setErrorEndpoints = [
  ...getRejectedMatchers(authApi),
  ...getRejectedMatchers(channelsApi),
  ...getRejectedMatchers(messagesApi),
]

const getPendingMatchers = api =>
  Object.values(api.endpoints).map(endpoint => endpoint.matchPending)

const clearErrorEndpoints = [
  ...getPendingMatchers(authApi),
  ...getPendingMatchers(channelsApi),
  ...getPendingMatchers(messagesApi),
]

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload.id
    },
    clearError,
    resetRedirect(state) {
      state.redirectToLogin = false
    },
  },
  extraReducers: (builder) => {
    clearErrorEndpoints.forEach((endpoint) => {
      builder.addMatcher(endpoint, clearError)
    })

    setErrorEndpoints.forEach((endpoint) => {
      builder.addMatcher(endpoint, handleUiError)
    })

    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, { payload }) => {
        state.currentChannelId = payload.id
        state.isError = false
        state.error = ''
        state.redirectToLogin = false
      },
    )

    builder.addMatcher(
      channelsApi.endpoints.deleteChannel.matchFulfilled,
      (state, { payload }) => {
        state.isError = false
        state.error = ''
        state.redirectToLogin = false
        if (state.currentChannelId === payload.id) {
          state.currentChannelId = state.defaultChannelId
        }
      },
    )
  },
})

export const { setCurrentChannel, resetRedirect } = uiSlice.actions

export default uiSlice.reducer
