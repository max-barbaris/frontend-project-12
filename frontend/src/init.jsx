import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import messagesApi from './features/messages/messagesApi'
import channelsApi from './features/channels/channelsApi'
import { setCurrentChannel } from './features/channels/channelsSlice'
import store from './app/store'
import { io } from 'socket.io-client'
import { ModalProvider } from './components/common/Modal/ModalContext'
import BaseModal from './components/common/Modal'

const init = () => {
  const socket = io()

  const listenerNewChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannels) => {
          draftChannels.push(payload)
        },
      ),
    )
  }
  const listenerDeleteChannel = (payload) => {
    const state = store.getState()
    if (state.channels.currentChannelId === payload.id) {
      store.dispatch(setCurrentChannel(state.channels.defaultChannelId))
    }

    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannels) => {
          return draftChannels.filter(({ id }) => id !== payload.id)
        },
      ),
    )
  }

  const listenerRenameChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannels) => {
          const channel = draftChannels.find(item => item.id === payload.id)
          if (channel) {
            channel.name = payload.name
          }
        },
      ),
    )
  }

  const listenerNewMessage = (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData(
        'getMessages',
        undefined,
        (draftMessages) => {
          draftMessages.push(payload)
        },
      ),
    )
  }

  socket.on('newChannel', listenerNewChannel)
  socket.on('deleteChannel', listenerDeleteChannel)
  socket.on('renameChannel', listenerRenameChannel)
  socket.on('newMessage', listenerNewMessage)

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ModalProvider>
          <App />
          <BaseModal />
        </ModalProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default init
