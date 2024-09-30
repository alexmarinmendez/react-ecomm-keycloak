import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './output.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Products from './pages/Products.jsx'
import Cart from './pages/Cart.jsx'
import Success from './pages/Success.jsx'
import { ProductContextProvider } from './context/ProductContext.jsx'
import { UserLoginContextProvider } from './context/UserLoginContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/:category?',
        element: <Products />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/success',
        element: <Success />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserLoginContextProvider>
      <ProductContextProvider>
        <RouterProvider router={router} />
      </ProductContextProvider>
    </UserLoginContextProvider>
  </StrictMode>,
)
