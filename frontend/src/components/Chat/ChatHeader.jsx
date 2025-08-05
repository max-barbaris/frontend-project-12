import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const ChatHeader = ({ channel = '', count }) => {
  const { t } = useTranslation()

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      {channel && (
        <p className="m-0">
          <b>{`# ${channel}`}</b>
        </p>
      )}
      <span className="text-muted">{`${count} ${t('chat.messagesCount', { count })}`}</span>
    </div>
  )
}

ChatHeader.propTypes = {
  channel: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
}

export default ChatHeader
