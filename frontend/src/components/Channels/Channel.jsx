import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Channel = ({ channel, isCurrent, handleSelect }) => {
  const variant = isCurrent ? 'secondary' : ''

  return (
    <li className="nav-item w-100">
      <Button
        type="button"
        variant={variant}
        onClick={handleSelect}
        className="w-100 rounded-0 text-start"
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  )
}

Channel.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isCurrent: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
}

export default Channel
