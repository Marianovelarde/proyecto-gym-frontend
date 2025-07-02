import React, { useEffect, useState } from 'react'
import {
  Typography,
  Button,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog
} from '@mui/material'
import { useUserStore } from '../store/userStore'
import CreateUser from './CreateUser'
import {useNavigate} from 'react-router-dom'

export default function AdminPanel() {
  const {  fetchUsers, users } = useUserStore()
  const [openCreateUser, setOpenCreateUser] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    
    fetchUsers()
  }, [])

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Panel de Administrador</Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setOpenCreateUser(true)}>
          Dar de alta usuario
        </Button>
      </Box>

      <Dialog open={openCreateUser} onClose={() => setOpenCreateUser(false)}>
        <Box sx={{ p: 3, width: 400 }}>
          <CreateUser />
        </Box>
      </Dialog>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Usuarios registrados</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Activado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.idUser}>
                <TableCell>{user.usuario}</TableCell>
                <TableCell>{user.rol}</TableCell>
                <TableCell>{user.actived ? 'Sí' : 'No'}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">Activar/Desactivar</Button>
                  <Button  onClick={() => navigate(`/pagos/${user.idUser}`)} size="small" variant="text" sx={{ ml: 1 }}>Ver Pagos</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
