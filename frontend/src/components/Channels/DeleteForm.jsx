import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { useDeleteChannel } from '../../features/channels/channelsApi'

export const DeleteForm = ({ handleClose, channel }) => {
  const { t } = useTranslation()
  const [deleteChannel] = useDeleteChannel()

  const handleDelete = async () => {
    await deleteChannel(channel)
    handleClose()
  }

  return (
    <>
      <p className="lead">{t('channels.deleteForm.areYouSure')}</p>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2"
          variant="secondary"
          type="button"
          onClick={handleClose}
        >
          {t('global.cancel')}
        </Button>
        <Button variant="danger" type="button" onClick={handleDelete}>
          {t('global.delete')}
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
