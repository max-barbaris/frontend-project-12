import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Col, Button } from 'react-bootstrap'
import { PlusSquare } from 'react-bootstrap-icons'

import { selectCurrentChannelId } from '../../features/ui/uiSelectors'
import { setCurrentChannel } from '../../features/ui/uiSlice'
import { useGetChannels } from '../../features/channels/channelsApi'
import { useModal } from '../common/Modal/ModalContext'

import Channel from './Channel'
import AddForm from './AddForm'
import RenameForm from './RenameForm'
import DeleteForm from './DeleteForm'

const Channels = () => {
  const { t } = useTranslation()
  const { openModal } = useModal()
  const dispatch = useDispatch()
  const { data: channels = [] } = useGetChannels()
  const currentChannelId = useSelector(selectCurrentChannelId)

  const handleSelect = channel => () => {
    dispatch(setCurrentChannel(channel))
  }

  const handleAdd = () => {
    const config = {
      header: {
        title: t('channels.addForm.addChannel'),
      },
      body: {
        component: AddForm,
      },
    }
    openModal(config)
  }

  const handleDelete = channel => () => {
    const config = {
      header: {
        title: t('channels.deleteForm.deleteChannel'),
      },
      body: {
        component: DeleteForm,
        modalProps: { channel },
      },
    }
    openModal(config)
  }

  const handleRename = channel => () => {
    const config = {
      header: {
        title: t('channels.renameForm.renameChannel'),
      },
      body: {
        component: RenameForm,
        modalProps: { channel },
      },
    }
    openModal(config)
  }

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <p className="fw-bold mb-0">{t('channels.channels')}</p>
        <Button
          onClick={handleAdd}
          variant="group-vertical"
          className="p-0 text-primary"
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">{`+ ${t('channels.addChannel')}`}</span>
        </Button>
      </div>

      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(channel => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
            handleSelect={handleSelect(channel)}
            handleDelete={handleDelete(channel)}
            handleRename={handleRename(channel)}
          />
        ))}
      </ul>
    </Col>
  )
}

export default Channels
