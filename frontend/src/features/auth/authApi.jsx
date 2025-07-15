import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api/v1/login' }),
  endpoints: builder => ({
    login: builder.mutation({
      query: loginDetails => ({
        method: 'POST',
        body: loginDetails,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
export default authApi
