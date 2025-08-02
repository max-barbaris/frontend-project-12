import React, { useEffect, useRef } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { selectUser } from '../../features/auth/authSlice'
import { selectCurrentChannel } from '../../features/channels/channelsApi'
import { useAddMessage } from '../../features/messages/messagesApi'

const initialValues = {
  body: '',
}

const validationSchema = yup.object().shape({
  body: yup.string().trim().required('requiredField'),
})
const MessageForm = () => {
  const [addMessage] = useAddMessage()
  const username = useSelector(selectUser)
  const channel = useSelector(selectCurrentChannel)
  const inputRef = useRef(null)

  // При смене канала курсор ставится на поле ввода.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [channel])

  const formik = useFormik({
    initialValues,
    validationSchema,
    validationOnBlur: false,
    onSubmit: async (formData) => {
      const message = {
        body: formData.body,
        channelId: channel.id,
        username,
      }
      await addMessage(message)
      formik.resetForm()
      formik.setSubmitting(false) // Снимаем состояние "отправки"
      inputRef.current.focus()
    },
  })

  const isInvalid = !formik.dirty || !formik.isValid

  return (
    <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          className="border-0 rounded-end-0"
          ref={inputRef}
          name="body"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          disabled={formik.isSubmitting}
          placeholder="Введите сообщение"
        />
        <Button variant="group-vertical" type="submit" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  )
}

export default MessageForm
