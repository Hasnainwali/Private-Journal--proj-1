import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './screens/Signup.jsx';
import Login from './screens/Login.jsx';
import Home from './screens/Home.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import PublicRoutes from './components/PublicRoutes.jsx';
import Popup from './components/Popup.jsx';
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
     <Toaster
  toastOptions={{
    success: {
      style: { background: "#16a34a", color: "#fff" },
    },
    error: {
      style: { background: "#dc2626", color: "#fff" },
    },
  }}
/>


      <BrowserRouter>
        <Routes>

          {/* Public routes */}
          <Route element={<PublicRoutes />}>

            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

          </Route>

          <Route path='/popup' element={< Popup/>} />


          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path='/home' element={<Home />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App