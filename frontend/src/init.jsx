import { io } from 'socket.io-client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

import resources from './locales/index'
import store from './app/store'
import App from './App'
import rollbarConfig from './configs/rollbarConfig'

import { setCurrentChannel } from './features/ui/uiSlice'
import channelsApi from './features/channels/channelsApi'
import messagesApi from './features/messages/messagesApi'

import { ModalProvider } from './components/common/Modal/ModalContext'
import BaseModal from './components/common/Modal'

const init = async () => {
  const socket = io()

  leoProfanity.loadDictionary()
  leoProfanity.add(leoProfanity.getDictionary('ru'))

  const i18n = i18next.createInstance()
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  })

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
      <I18nextProvider>
        <BrowserRouter>
          <RollbarProvider config={rollbarConfig}>
            <ErrorBoundary>
              <ModalProvider>
                <App />
                <BaseModal />
              </ModalProvider>
            </ErrorBoundary>
          </RollbarProvider>
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  )
}

export default init
