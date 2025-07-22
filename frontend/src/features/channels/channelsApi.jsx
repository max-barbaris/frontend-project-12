import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export const {
  useGetChannelsQuery: useGetChannels,
} = channelsApi

export default channelsApi
