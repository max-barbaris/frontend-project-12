import { AUTH_ERRORS, UI_ERRORS } from './constants'

export const extractAuthError = status => AUTH_ERRORS[status]

export const extractUiError = (status) => {
  if (extractAuthError(status)) return undefined

  return UI_ERRORS[status] || UI_ERRORS.Unknown
}

export const clearError = (state) => {
  Object.assign(state, {
    error: '',
    isError: false,
    redirectToLogin: false,
  })
}

export const createErrorHandler = extractor => (state, { payload }) => {
  const status = payload?.status

  if (status === 401) {
    clearError(state)
    state.redirectToLogin = true
    return
  }

  const error = extractor(status)

  if (!error) {
    clearError(state)
    return
  }

  state.error = error
  state.isError = true
  state.redirectToLogin = false
}
