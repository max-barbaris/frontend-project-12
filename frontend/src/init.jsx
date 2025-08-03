import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import messagesApi from './features/messages/messagesApi'
import store from './app/store'
import { io } from 'socket.io-client'

const init = () => {
  const socket = io()

  const listenerNewMessage = (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData(
        'getMessages',
        undefined,
        (draft) => {
          draft.push(payload)
        },
      ),
    )
  }

  socket.on('newMessage', listenerNewMessage)

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default init
