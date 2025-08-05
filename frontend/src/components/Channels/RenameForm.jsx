import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'

import LoadingButton from '../Button/LoadingButton'

import { selectChannelsNames, useUpdateChannel } from '../../features/channels/channelsApi'
import { FIELD_NAME } from '../../features/channels/constants'
import { getValidationSchema } from '../../features/channels/validation'

export const RenameForm = ({ handleClose, channel }) => {
  const { t } = useTranslation()
  const channelsNames = useSelector(selectChannelsNames)
  const filteredChannelsNames = channelsNames.filter(name => name !== channel.name)
  const inputRef = useRef(null)
  const [renameChannel, { isLoading }] = useUpdateChannel()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      [FIELD_NAME]: channel.name,
    },
    validationSchema: getValidationSchema(filteredChannelsNames),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (formData) => {
      const schema = getValidationSchema(filteredChannelsNames)
      const newChannelData = { [FIELD_NAME]: leoProfanity.clean(formData[FIELD_NAME]) }
      await schema.validate(newChannelData)
      await renameChannel({
        ...schema.cast(newChannelData),
        id: channel.id,
      })
      toast.success(t(`channels.channelRenamedSuccessfully`))
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
        {allErrors[FIELD_NAME] && (
          <Form.Control.Feedback type="invalid">
            {t(`channels.renameForm.error.${allErrors[FIELD_NAME]}`)}
          </Form.Control.Feedback>
        )}
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            disabled={formik.isSubmitting}
            onClick={handleClose}
          >
            {t('global.cancel')}
          </Button>
          <LoadingButton
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isSubmitDisabled}
          >
            {t('global.submit')}
          </LoadingButton>
        </div>
      </Form.Group>
    </Form>
  )
}

RenameForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  channel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
}

export default RenameForm
