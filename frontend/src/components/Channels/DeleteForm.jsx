import { Button } from 'react-bootstrap'
import { useDeleteChannel } from '../../features/channels/channelsApi'
import React from 'react'
import PropTypes from 'prop-types'

export const DeleteForm = ({ handleClose, channel }) => {
  const [deleteChannel] = useDeleteChannel()

  const handleDelete = () => {
    deleteChannel(channel)
    handleClose()
  }

  return (
    <>
      <p className="lead">Вы уверены?</p>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2"
          variant="secondary"
          type="button"
          onClick={handleClose}
        >
          Отменить
        </Button>
        <Button variant="danger" type="button" onClick={handleDelete}>
          Удалить
        </Button>
      </div>
    </>
  )
}

DeleteForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  channel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
}

export default DeleteForm
