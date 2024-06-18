import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { store } from './redux/store'
import { Provider } from 'react-redux'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/Login',
      element: <Login/>
    },
    {
      path: '/Register',
      element: <Register/>
    },
  ])

  return (

    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>

  )
}

export default App
