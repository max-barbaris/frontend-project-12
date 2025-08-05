import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import Channels from '../components/Channels'
import Chat from '../components/Chat'
import { useGetMessages } from '../features/messages/messagesApi'
import { useGetChannels } from '../features/channels/channelsApi'

const MainPage = () => {
  const { t } = useTranslation()
  const { isLoading: isMessagesLoading } = useGetMessages()
  const { isLoading: isChannelsLoading } = useGetChannels()
  const isLoading = isMessagesLoading || isChannelsLoading

  return (
    <Container className="my-4 overflow-hidden rounded shadow h-100">
      {isLoading
        ? (
            <div className="h-100 d-flex justify-content-center align-items-center">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">{t('global.loading')}</span>
              </Spinner>
            </div>
          )
        : (
            <div className="row h-100 bg-white flex-md-row">
              <Channels />
              <div className="col p-0 h-100">
                <Chat />
              </div>
            </div>
          )}
    </Container>
  )
}

export default MainPage
