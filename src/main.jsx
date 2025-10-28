import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './Router/Router.jsx';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-base-200 font-urbanist'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>,
)
