import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './Router/Router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-11/12 mx-auto font-urbanist'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
