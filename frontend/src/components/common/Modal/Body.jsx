import React from 'react'
import { ModalBody } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const Body = ({ component, handleClose, modalProps = {} }) => {
  const Component = component

  return (
    <ModalBody>
      <Component handleClose={handleClose} {...modalProps} />
    </ModalBody>
  )
}

Body.propTypes = {
  component: PropTypes.elementType.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalProps: PropTypes.object,
}

export default Body
