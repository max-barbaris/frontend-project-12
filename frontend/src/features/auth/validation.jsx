import * as yup from 'yup'

import { FIELD_CONFIRM_PASSWORD, FIELD_PASSWORD, FIELD_USERNAME } from './constants'

export const loginValidationSchema = yup.object().shape({
  [FIELD_USERNAME]: yup.string().trim().required('requiredField'),
  [FIELD_PASSWORD]: yup.string().trim().required('requiredField'),
})

export const signupValidationSchema = yup.object().shape({
  [FIELD_USERNAME]: yup
    .string()
    .trim()
    .required('requiredField')
    .min(3, 'usernameLength')
    .max(20, 'usernameLength'),
  [FIELD_PASSWORD]: yup
    .string()
    .trim()
    .required('requiredField')
    .min(6, 'passwordLength'),
  [FIELD_CONFIRM_PASSWORD]: yup
    .string()
    .required('requiredField')
    .oneOf([yup.ref('password'), null], 'passwordsMustMatch'),
})
