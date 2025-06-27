import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useUserStore } from './store/userStore'
import Login from './components/Login'
import Home from './components/Home'
import PanelAdmin from './components/PanelAdmin'

function PrivateRoute({ element, allowedRoles }) {
  const { user } = useUserStore()

  if (!user) return <Navigate to="/" />
  if (allowedRoles && !allowedRoles.includes(user.rol)) return <Navigate to="/home" />
  return element
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute element={<Home />} />
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute element={<PanelAdmin />} allowedRoles={['admin']} />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
