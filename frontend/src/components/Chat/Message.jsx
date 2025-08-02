import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
)

Message.propTypes = {
  username: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}

export default Message
