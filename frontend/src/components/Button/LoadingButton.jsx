import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const LoadingButton = ({
  children,
  className,
  onClick,
  isLoading,
  variant = 'primary',
  type = 'button',
  disabled,
}) => (
  <Button
    className={classNames(className)}
    onClick={onClick}
    disabled={disabled || isLoading}
    variant={variant}
    type={type}
  >
    {children}
    {isLoading && (
      <div className="position-absolute d-inline-block end-0 pe-3">
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </div>
    )}
  </Button>
)

LoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
}

export default LoadingButton
