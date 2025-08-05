import { createSelector } from '@reduxjs/toolkit'

const selectUi = state => state.ui

export const selectCurrentChannelId = createSelector(
  selectUi,
  state => state?.currentChannelId,
)

export const selectDefaultChannelId = createSelector(
  selectUi,
  state => state?.defaultChannelId,
)

export const selectIsUiError = createSelector(
  selectUi,
  state => state.isError,
)

export const selectUiError = createSelector(
  selectUi,
  state => state.error,
)
