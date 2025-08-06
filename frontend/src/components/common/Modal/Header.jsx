import { ModalHeader, ModalTitle, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const Header = ({ title, handleClose }) => (
  <ModalHeader>
    <ModalTitle>{title}</ModalTitle>
    <Button
      variant="close"
      type="button"
      onClick={handleClose}
      aria-label="Close"
      data-bs-dismiss="modal"
    />
  </ModalHeader>
)

Header.propTypes = {
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default Header
