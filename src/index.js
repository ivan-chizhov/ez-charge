import React from 'react'
import ReactDOMClient from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

import './index.css'
import '@fontsource-variable/roboto-flex/standard.css'
import 'material-icons/iconfont/material-icons.css'

const container = document.getElementById('app')

const root = ReactDOMClient.createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('ServiceWorker registration failed: ', registrationError)
      })
  })
}
