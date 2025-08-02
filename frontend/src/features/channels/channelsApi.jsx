import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSelector } from '@reduxjs/toolkit'
import { selectCurrentChannelId } from './channelsSlice'

const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['Channels'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
  }),
})

const selectChannels = channelsApi.endpoints.getChannels.select()

const selectChannelsData = createSelector(
  selectChannels,
  channelsState => channelsState.data ?? [],
)

export const selectCurrentChannel = createSelector(
  [selectChannelsData, selectCurrentChannelId],
  (channels, currentChannelId) => channels.find(channel => channel.id === currentChannelId) || null,
)

export const {
  useGetChannelsQuery: useGetChannels,
} = channelsApi

export default channelsApi
