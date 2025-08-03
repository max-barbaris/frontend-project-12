import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import init from './init'

const run = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'))
  const app = await init()
  root.render(<React.StrictMode>{app}</React.StrictMode>)
}

run()
