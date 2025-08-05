import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'

import { selectUser } from '../../features/auth/authSlice'
import { selectCurrentChannel } from '../../features/channels/channelsApi'
import { useAddMessage, useGetMessages } from '../../features/messages/messagesApi'
import { initialValues, FIELD_MESSAGE } from '../../features/messages/constants'
import { validationSchema } from '../../features/messages/validation'

const MessageForm = () => {
  const { t } = useTranslation()
  const [addMessage, { isSubmitting }] = useAddMessage()
  const { refetch } = useGetMessages()
  const username = useSelector(selectUser)
  const channel = useSelector(selectCurrentChannel)
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [channel, isSubmitting])

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (formData, { resetForm }) => {
      const message = {
        body: leoProfanity.clean(formData[FIELD_MESSAGE]),
        channelId: channel.id,
        username,
      }
      await addMessage(message)
      await refetch()
      resetForm()
      inputRef.current.focus()
    },
  })

  const isSubmitDisabled = !formik.dirty || !formik.isValid || formik.isSubmitting

  return (
    <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          className="border-0 rounded-end-0"
          ref={inputRef}
          name={FIELD_MESSAGE}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[FIELD_MESSAGE]}
          disabled={formik.isSubmitting}
          aria-label={t('chat.newMessage')}
          placeholder={t('chat.typeYourMessage')}
          isInvalid={formik.touched[FIELD_MESSAGE] && !!formik.errors[FIELD_MESSAGE]}
        />
        <Button variant="group-vertical" type="submit" disabled={isSubmitDisabled}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('global.submit')}</span>
        </Button>
      </InputGroup>
    </Form>
  )
}

export default MessageForm
