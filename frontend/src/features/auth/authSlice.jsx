import { createSlice, createSelector } from '@reduxjs/toolkit'
import authApi from './authApi'

const initialState = {
  token: '', // JWT токен
  username: '',
  isError: false,
  error: '',
}

const loadAuthStateFromStorage = () => {
  const storedAuthData = localStorage.getItem('hexletchat')

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
      localStorage.removeItem('hexletchat')
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchPending,
      (state) => {
        Object.assign(state, initialState)
      },
    )
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const newState = {
          ...initialState,
          token: payload.token,
          username: payload.username,
        }
        Object.assign(state, newState)
        localStorage.setItem('hexletchat', JSON.stringify(payload))
      },
    )
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        const newState = {
          ...initialState,
          isError: true,
          error: payload?.data?.message ?? 'unknown',
        }
        Object.assign(state, newState)
      },
    )
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

export const selectIsError = createSelector(
  selectAuth,
  authState => authState.isError,
)

export const selectError = createSelector(
  selectAuth,
  authState => authState.error,
)

export const selectIsAuth = createSelector(
  selectToken,
  selectIsError,
  (token, isError) => Boolean(token) && !isError,
)

export const { clearAuth } = authSlice.actions

export default authSlice.reducer
