import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'

const Channel = ({ channel, isCurrent, handleSelect, handleDelete, handleRename }) => {
  const variant = isCurrent ? 'secondary' : ''
  const isRemovable = channel.removable

  return (
    <li className="nav-item w-100">
      {isRemovable
        ? (
            <Dropdown className="d-flex" as={ButtonGroup}>
              <Button
                type="button"
                variant={variant}
                onClick={handleSelect}
                className="w-100 rounded-0 text-start btn text-truncate"
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              <Dropdown.Toggle
                split
                className="flex-grow-0 rounded-0"
                variant={variant}
              >
                <span className="visually-hidden">Управление каналом</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDelete}>Удалить</Dropdown.Item>
                <Dropdown.Item onClick={handleRename}>Переименовать</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        : (
            <Button
              type="button"
              variant={variant}
              onClick={handleSelect}
              className="w-100 rounded-0 text-start"
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          )}
    </li>
  )
}

Channel.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    removable: PropTypes.bool.isRequired,
  }).isRequired,
  isCurrent: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRename: PropTypes.func.isRequired,
}

export default Channel
