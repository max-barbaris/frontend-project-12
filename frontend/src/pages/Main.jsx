import React from 'react'
import { Container, Row } from 'react-bootstrap'

import Channels from '../components/Channels'
import Chat from '../components/Chat'

const MainPage = () => {
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Chat />
      </Row>
    </Container>
  )
}

export default MainPage
