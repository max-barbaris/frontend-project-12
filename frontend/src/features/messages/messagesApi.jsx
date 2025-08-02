import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSelector } from '@reduxjs/toolkit'
import { selectCurrentChannelId } from '../channels/channelsSlice'

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Messages'],
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: message => ({
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
})

const selectMessages = messagesApi.endpoints.getMessages.select()

const selectMessagesData = createSelector(
  selectMessages,
  messagesState => messagesState.data ?? [],
)

export const selectCurrentMessages = createSelector(
  [selectMessagesData, selectCurrentChannelId],
  (messages, currentChannelId) => {
    return messages.filter(({ channelId }) => channelId === currentChannelId)
  },
)

export const {
  useGetMessagesQuery: useGetMessages,
  useAddMessageMutation: useAddMessage,
} = messagesApi

export default messagesApi
