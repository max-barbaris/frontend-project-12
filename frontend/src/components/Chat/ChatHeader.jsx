import React from 'react'
import PropTypes from 'prop-types'

const ChatHeader = ({ channel, count }) => (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    <p className="m-0">
      <b>{`# ${channel}`}</b>
    </p>
    <span className="text-muted">{count}</span>
  </div>
)

ChatHeader.propTypes = {
  channel: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
}

export default ChatHeader
