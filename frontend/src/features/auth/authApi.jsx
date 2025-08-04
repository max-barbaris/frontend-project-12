import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api/v1' }),
  endpoints: builder => ({
    login: builder.mutation({
      query: loginDetails => ({
        url: 'login',
        method: 'POST',
        body: loginDetails,
      }),
    }),
    signup: builder.mutation({
      query: signupDetails => ({
        url: 'signup',
        method: 'POST',
        body: signupDetails,
      }),
    }),
  }),
})

export const {
  useLoginMutation: useLogin,
  useSignupMutation: useSignup,
} = authApi

export default authApi
