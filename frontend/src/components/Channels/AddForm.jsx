import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { selectChannelsNames, useAddChannel } from '../../features/channels/channelsApi'
import { initialValues, FIELD_NAME } from '../../features/channels/constants'
import { getValidationSchema } from '../../features/channels/validation'

export const AddForm = ({ handleClose }) => {
  const { t } = useTranslation()
  const channelsNames = useSelector(selectChannelsNames)
  const inputRef = useRef(null)
  const [addChannel] = useAddChannel()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema: getValidationSchema(channelsNames),
    onSubmit: async (formData) => {
      await addChannel(formData)
      handleClose()
    },
  })

  const allErrors = {
    ...formik.errors,
    ...(formik.status && { [FIELD_NAME]: formik.status }),
  }
  const isSubmitDisabled = !formik.dirty || formik.isSubmitting

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          className="mb-2"
          disabled={formik.isSubmitting}
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[FIELD_NAME]}
          name={FIELD_NAME}
          id={FIELD_NAME}
          isInvalid={allErrors[FIELD_NAME]}
        />
        <label className="visually-hidden" htmlFor={FIELD_NAME}>
          {t('global.channelName')}
        </label>
        {formik.touched[FIELD_NAME] && allErrors[FIELD_NAME] && (
          <Form.Control.Feedback type="invalid">
            {t(`channels.addForm.error.${allErrors[FIELD_NAME]}`)}
          </Form.Control.Feedback>
        )}
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={formik.isSubmitting}
          >
            {t('global.cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
            {t('global.submit')}
          </Button>
        </div>
      </Form.Group>
    </Form>
  )
}

AddForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
}

export default AddForm
