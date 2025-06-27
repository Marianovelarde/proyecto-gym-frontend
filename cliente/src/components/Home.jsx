// components/Home.jsx
import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import { useUserStore } from '../store/userStore'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { user, logout } = useUserStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleGoToAdminPanel = () => {
    navigate('/admin')
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido {user?.usuario}
      </Typography>

      <Button variant="outlined" onClick={handleLogout} sx={{ mr: 2 }}>
        Cerrar sesión
      </Button>

      {/* Solo mostrar el botón si el usuario es admin */}
      {user?.rol === 'admin' && (
        <Button variant="contained" onClick={handleGoToAdminPanel}>
          Ir al Panel de Admin
        </Button>
      )}
    </Box>
  )
}
