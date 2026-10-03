import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'  // Tailwind

const container = document.getElementById('root')
if (!container) throw new Error('Root not found')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
