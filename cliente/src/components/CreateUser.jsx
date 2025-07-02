import React, { useState } from 'react'
import { TextField, Button, Box, Alert, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useUserStore } from '../store/userStore'

export default function CreateUser() {
  const { createUser, message, error, fetchUsers  } = useUserStore()
  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: '',
    rol: 'cliente'
  })

    const handleSubmit = async () => {
    await createUser(formData)
    await fetchUsers()
    setFormData({ usuario: '', contraseña: '', rol: 'cliente' })
  }

  return (
    <Box component='form' autoComplete='off'>
      <Typography variant="h6">Crear nuevo usuario</Typography>

      <TextField
      autoComplete='off'
        label="Usuario"
        fullWidth
        value={formData.usuario}
        onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
        sx={{ my: 1 }}
      />

      <TextField
      autoComplete='off'
        label="Contraseña"
        fullWidth
        type="password"
        value={formData.contraseña}
        onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
        sx={{ my: 1 }}
      />

      <FormControl autoComplete='off' fullWidth sx={{ my: 1 }}>
        <InputLabel id="rol-label">Rol</InputLabel>
        <Select
          labelId="rol-label"
          value={formData.rol}
          label="Rol"
          onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="entrenador">Entrenador</MenuItem>
          <MenuItem value="cliente">Cliente</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleSubmit}>
        Crear Usuario
      </Button>

      {message && (
        <Alert severity={message.type} sx={{ mt: 2 }}>{message.text}</Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      )}
    </Box>
  )
}