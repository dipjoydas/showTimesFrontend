import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/Auth_context.jsx'
import { LocationProvider } from './context/Location_context.jsx'
import { AnimatePresence } from 'framer-motion'
import { Route, Router, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <LocationProvider>
        <App/>
        {/* <Router>
          <Routes>
            <Route path='/*' element={ <App />}></Route>
          </Routes>
        </Router> */}
     
      

      </LocationProvider>

    </AuthProvider>
  
  </React.StrictMode>,
)
