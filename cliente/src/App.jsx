import { useState } from 'react'
import Login from './components/Login'
import { Container, Typography } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useUserStore } from './store/userStore'
import Home from './components/Home'
import PanelAdmin from './components/PanelAdmin'
import Pagos from './components/Pagos'

function PrivateRoute({ children, allowedRoles }) {
  const { user } = useUserStore()
  if (!user) return <Navigate to="/" />
  if (allowedRoles && !allowedRoles.includes(user.rol)) return <Navigate to="/home" />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <PanelAdmin />
            </PrivateRoute>
          }
        />
        
<Route
  path="/pagos/:id"
  element={
    <PrivateRoute allowedRoles={["admin"]}>
      <Pagos />
    </PrivateRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
