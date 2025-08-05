import { createSlice, createSelector } from '@reduxjs/toolkit'

import authApi from './authApi'

import { STORAGE_APP_NAME } from '../../utils/constants'
import { clearError, extractAuthError, createErrorHandler } from '../../utils/helpers'

const initialState = {
  token: null, // JWT токен
  username: null,
  isError: false,
  error: '',
}

const handleAuthError = createErrorHandler(extractAuthError)

const loadAuthStateFromStorage = () => {
  const storedAuthData = localStorage.getItem(STORAGE_APP_NAME)

  if (!storedAuthData) {
    return initialState
  }

  try {
    const parsedData = JSON.parse(storedAuthData)

    const isValidAuthData = parsedData
      && typeof parsedData.token === 'string'
      && typeof parsedData.username === 'string'

    return isValidAuthData
      ? { ...initialState, ...parsedData }
      : initialState
  }
  catch {
    return initialState
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthStateFromStorage(),
  reducers: {
    clearAuth: () => {
      localStorage.removeItem(STORAGE_APP_NAME)
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchPending, clearError)
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const newState = {
          ...initialState,
          token: payload.token,
          username: payload.username,
        }
        Object.assign(state, newState)
        localStorage.setItem(STORAGE_APP_NAME, JSON.stringify(payload))
      },
    )
    builder.addMatcher(authApi.endpoints.login.matchRejected, handleAuthError)
    builder.addMatcher(authApi.endpoints.signup.matchPending, clearError)
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        const newState = {
          ...initialState,
          token: payload.token,
          username: payload.username,
        }
        Object.assign(state, newState)
        localStorage.setItem(STORAGE_APP_NAME, JSON.stringify(payload))
      },
    )
    builder.addMatcher(authApi.endpoints.signup.matchRejected, handleAuthError)
  },
})

export const selectAuth = state => state.auth

export const selectToken = createSelector(
  selectAuth,
  authState => authState.token,
)

export const selectUser = createSelector(
  selectAuth,
  authState => authState.username,
)

export const selectIsAuthError = createSelector(
  selectAuth,
  authState => authState.isError,
)

export const selectAuthError = createSelector(
  selectAuth,
  authState => authState.error,
)

export const selectIsAuth = createSelector(
  selectToken,
  selectIsAuthError,
  (token, isError) => Boolean(token) && !isError,
)

export const { clearAuth } = authSlice.actions

export default authSlice.reducer
