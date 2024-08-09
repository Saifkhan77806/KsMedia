import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { Authprovider } from '../store/auth.jsx'

createRoot(document.getElementById('root')).render(
  <Authprovider>
  <Router>
  <StrictMode>
    <App />
  </StrictMode>,
  </Router>
  </Authprovider>
    
)
