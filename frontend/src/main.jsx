import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
// Temporarily avoid react-query provider due to runtime mismatch on host.
// We'll use manual fetch logic until the dependency issue is resolved.
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#667eea' },
    secondary: { main: '#764ba2' }
  }
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
