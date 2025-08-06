import { Col, Row, Card, Spinner } from 'react-bootstrap'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const AuthForm = ({ children, footer, isLoading = false, isPage = false }) => {
  const containerClass = classNames(
    'h-100',
    {
      'container-fluid': !isPage,
      'container my-4 overflow-hidden rounded shadow': isPage,
    },
  )

  const renderLoader = () => (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner
        animation="border"
        variant="primary"
        role="status"
      >
        <span className="visually-hidden">Загрузка</span>
      </Spinner>
    </div>
  )

  const renderForm = () => (
    <Row className="justify-content-center align-content-center h-100">
      <Col xs="12" xxl="6" md="8">
        <Card className="shadow-sm">
          {children}
          {footer && (
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{footer.text}</span>
                {' '}
                <a href={footer.href}>{footer.action}</a>
              </div>
            </Card.Footer>
          )}
        </Card>
      </Col>
    </Row>
  )

  return (
    <div className={containerClass}>
      {isLoading ? renderLoader() : renderForm()}
    </div>
  )
}

AuthForm.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
    action: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  isPage: PropTypes.bool,
  className: PropTypes.string,
}

export default AuthForm
