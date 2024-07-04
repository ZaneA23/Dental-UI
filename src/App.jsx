import { useState } from 'react'
import './App.css'
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import DoctorsPage from './pages/DoctorsPage'
import ContactPage from './pages/ContactPage'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import Appointment from './pages/AppointmentPage'
import AppointmentCrudPage from './pages/AppointmentCrudPage'
import PromoPage from './pages/PromoPage';
import NursePage from './pages/NursePage'
import DentistPage from './pages/DentistPage'
import ProcedurePage from './pages/ProcedurePage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage/>
    },
    {
      path: '/Login',
      element: <Login/>
    },
    
    {
      path: '/Home',
      element: <Home/>
    },
    {
      path: '/HomePage',
      element: <HomePage/>
    },

    {
      path: '/Register',
      element: <Register/>
    },
    {
      path: '/About',
      element: <AboutPage/>
    },
    {
      path: '/Services',
      element: <ServicesPage/>
    },
    {
      path: '/Doctors',
      element: <DoctorsPage/>
    },
    {
      path: '/Contact',
      element: <ContactPage/>
    },
    {
      path: '/AppointmentPage',
      element: <Appointment/>
    },
    {
      path: '/AppointmentCrudPage',
      element: <AppointmentCrudPage/>
    },
    {
      path: '/PromoPage',
      element: <PromoPage/>
    },
    {
      path: '/NursePage',
      element: <NursePage/>
    },
    {
      path: '/DentistPage',
      element: <DentistPage/>
    },
    {
      path: '/ProcedurePage',
      element: <ProcedurePage/>
    },


  ])


  return (
    
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  )

}

export default App
