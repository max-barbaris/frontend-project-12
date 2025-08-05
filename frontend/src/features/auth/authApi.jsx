import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ROUTES from '../../navigation/apiRoutes'

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: ROUTES.BASE }),
  endpoints: builder => ({
    login: builder.mutation({
      query: loginDetails => ({
        url: ROUTES.LOGIN,
        method: 'POST',
        body: loginDetails,
      }),
    }),
    signup: builder.mutation({
      query: signupDetails => ({
        url: ROUTES.SIGNUP,
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
