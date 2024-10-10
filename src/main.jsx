import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import VerMAis from './components/VerMais/Vermais'
import ImoveisAdmin from './components/Admin/ImoveisAdimin'
import Home from './components/Views/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
     {
       path: '/vermais/:id',
       element: <VerMAis />
     },
     {
      path: '/criar',
      element: <ImoveisAdmin />
    }

    ],
  },
])


createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
 ,
)
