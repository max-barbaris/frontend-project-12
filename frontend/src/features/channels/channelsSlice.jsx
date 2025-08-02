import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
  defaultChannelId: '1',
  currentChannelId: '1',
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload.id
    },
  },
})

export const { setCurrentChannel } = channelsSlice.actions

const selectChannels = state => state.channels

export const selectCurrentChannelId = createSelector(
  selectChannels,
  state => state?.currentChannelId,
)

export default channelsSlice.reducer
