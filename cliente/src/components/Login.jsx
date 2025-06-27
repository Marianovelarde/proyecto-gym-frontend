import React, { useState } from 'react'
import { useUserStore } from '../store/userStore'
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress
} from '@mui/material'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
const login = useUserStore((state) => state.login)
const loading = useUserStore((state) => state.loading)
const error = useUserStore((state) => state.error)
const user = useUserStore((state) => state.user)
  const navigate = useNavigate()

  const handleLogin = async () => {
    await login(username, password)
    if (!error && user) {
      navigate('/home')
    }
  }

  return (
    <Box sx={{ mt: 10, mx: 'auto', width: '300px' }}>
      <Typography variant="h5">Iniciar Sesión</Typography>
      <TextField
        fullWidth
        label="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ my: 2 }}
      />
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleLogin} disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : 'Ingresar'}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  )
}
