// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const loadIndigitall = () => {
  const script = document.createElement('script')
  script.src = '/indigitall/sdk.min.js'
  script.async = true
  script.onload = () => {
    console.log('Indigitall SDK loaded')

    window.onNewUserRegistered = (device) => {
      console.log('New device registered:', device)
    }

    window.onIndigitallInitialized = (permissions, device) => {
      console.log('Push Permission:', permissions.push)
      console.log('Location Permission:', permissions.location)
      console.log('Device Info:', device)
    }

    window.onLocationUpdated = (location) => {
      console.log('Location updated:', location)
    }

    window.onError = (error) => {
      console.error('Indigitall Error:', error)
    }

    window.requestPushPermission = (permission) => {
      console.log('Push permission requested:', permission)
    }

    window.requestLocationPermission = (permission) => {
      console.log('Location permission requested:', permission)
    }

    window.indigitall.init({
      appKey: 'your-app-key', // replace with your real key
      urlDeviceApi: 'https://am1.device-api.indigitall.com/v1',
      workerPath: '/indigitall/worker.min.js',
      requestLocation: true,
      onInitialized: window.onIndigitallInitialized,
      onNewUserRegistered: window.onNewUserRegistered,
      onLocationUpdated: window.onLocationUpdated,
      onError: window.onError,
      requestPushPermission: window.requestPushPermission,
      requestLocationPermission: window.requestLocationPermission,
    })
  }

  document.body.appendChild(script)
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      console.log('Service Worker registered')
      loadIndigitall()
    }).catch(console.error)
  })
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
