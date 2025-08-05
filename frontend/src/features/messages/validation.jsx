import * as yup from 'yup'

import { FIELD_MESSAGE } from './constants'

export const validationSchema = yup.object().shape({
  [FIELD_MESSAGE]: yup
    .string()
    .trim()
    .required('Message is required'),
})
