import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { selectChannelsNames, useUpdateChannel } from '../../features/channels/channelsApi'
import * as yup from 'yup'
import PropTypes from 'prop-types'

const initialValues = {
  name: '',
}

export const RenameForm = ({ handleClose, channel }) => {
  const channelsNames = useSelector(selectChannelsNames)
  const inputRef = useRef(null)
  const [renameChannel] = useUpdateChannel()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const validationSchema = yup.object().shape({
    name: yup.string().trim().required().min(3).max(20).notOneOf(channelsNames),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (formData) => {
      await renameChannel({
        ...formData,
        id: channel.id,
      })
      handleClose()
    },
  })

  const nameError = (formik.dirty && formik.errors.name) || formik.status
  const isSubmitDisabled = !formik.dirty || nameError || formik.isSubmitting

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          className="mb-2"
          disabled={formik.isSubmitting}
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          values={formik.values.name}
          name="name"
          id="name"
          isInvalid={nameError}
        />
        <label className="visually-hidden" htmlFor="name">
          Название канала
        </label>
        <Form.Control.Feedback type="invalid">
          {nameError}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            Отменить
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
            Сохранить
          </Button>
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
