import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSelector } from '@reduxjs/toolkit'
import { selectCurrentChannelId } from '../ui/uiSelectors'

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
  tagTypes: ['Channels', 'Messages'],
  endpoints: builder => ({
    addChannel: builder.mutation({
      query: channel => ({
        method: 'POST',
        body: channel,
      }),
    }),
    deleteChannel: builder.mutation({
      query: ({ id }) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages', 'Channels'],
      transformResponse: response => ({ ...response }),
    }),
    updateChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
    }),
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

export const selectChannelsNames = createSelector(
  selectChannelsData,
  channels => channels.map(({ name }) => name),
)

export const selectCurrentChannel = createSelector(
  [selectChannelsData, selectCurrentChannelId],
  (channels, currentChannelId) => channels.find(channel => channel.id === currentChannelId) || null,
)

export const {
  useAddChannelMutation: useAddChannel,
  useDeleteChannelMutation: useDeleteChannel,
  useUpdateChannelMutation: useUpdateChannel,
  useGetChannelsQuery: useGetChannels,
} = channelsApi

export default channelsApi
