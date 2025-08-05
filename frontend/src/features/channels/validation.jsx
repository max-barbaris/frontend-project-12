import * as yup from 'yup'

export const getValidationSchema = channels => (
  yup.object().shape({
    name: yup
      .string()
      .required('requiredField')
      .min(3, 'length')
      .max(20, 'length')
      .notOneOf(channels, 'mustBeUnique')
      .test(
        'no-leading-or-trailing-spaces',
        'removeLeadSpaces',
        value => value === value?.trim(),
      ),
  })
)
