import { createContext, useContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [config, setConfig] = useState(null)

  const openModal = (data) => {
    setConfig(data)
  }

  const closeModal = () => {
    setConfig(null)
  }

  const value = useMemo(
    () => ({
      config,
      openModal,
      closeModal,
    }),
    [config],
  )

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  )
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useModal = () => useContext(ModalContext)
