import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './components/Auth/auth-context'

import App from './App'
import './index.css'
import { ModalContextProvider } from './components/UI/Modals/modal-context'

ReactDOM.createRoot(document.getElementById('root')).render(
   
        <ModalContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </ModalContextProvider>
 
)


