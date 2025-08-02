import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChannel, selectCurrentChannelId } from '../../features/channels/channelsSlice'
import { Col, Button } from 'react-bootstrap'
import { PlusSquare } from 'react-bootstrap-icons'
import { useGetChannels } from '../../features/channels/channelsApi'
import Channel from './Channel'

const Channels = () => {
  const dispatch = useDispatch()
  const { data: channels = [] } = useGetChannels()
  const currentChannelId = useSelector(selectCurrentChannelId)
  const handleSelect = channel => () => {
    dispatch(setCurrentChannel(channel))
  }

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          variant="link"
          className="p-0 text-primary btn-group-vertical"
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(channel => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
            handleSelect={handleSelect(channel)}
          />
        ))}
      </ul>
    </Col>
  )
}

export default Channels
