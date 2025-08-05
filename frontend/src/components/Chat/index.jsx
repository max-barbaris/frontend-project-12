import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ChatHeader from './ChatHeader'
import Message from './Message'
import MessageForm from './MessageForm'
import { selectCurrentChannel } from '../../features/channels/channelsApi'
import { selectCurrentMessages } from '../../features/messages/messagesApi'
import { SCROLL_TYPE } from '../../features/messages/constants'

const Chat = () => {
  const channel = useSelector(selectCurrentChannel)
  const messages = useSelector(selectCurrentMessages)
  const pageRef = useRef(null)

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollTo({
        top: pageRef.current.scrollHeight,
        behavior: SCROLL_TYPE,
      })
    }
  }, [channel, messages.length])

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatHeader channel={channel?.name} count={messages.length} />
        <div ref={pageRef} className="chat-messages overflow-auto px-5">
          {messages.map(({ id, username, body }) => (
            <Message key={id} username={username} body={body} />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </div>
  )
}

export default Chat
