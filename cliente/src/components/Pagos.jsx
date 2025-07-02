import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import axios from 'axios'

export default function VerPagos() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/users/${id}`)
        setUser(res.data.user)
      } catch (err) {
        setError('No se pudo obtener la información del usuario.')
      }
    }
    fetchPagos()
  }, [id])

  if (error) return <Typography color="error">{error}</Typography>
  if (!user) return <Typography>Cargando...</Typography>
  if (!user.entityPagos?.length) return <Typography>No hay pagos registrados para este usuario.</Typography>

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Pagos de {user.usuario}
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Fecha de Pago</TableCell>
              <TableCell>Vencimiento</TableCell>
              <TableCell>Método</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.entityPagos.map((pago) => (
              <TableRow key={pago.idPagos}>
                <TableCell>{pago.idPagos}</TableCell>
                <TableCell>${pago.monto}</TableCell>
                <TableCell>{new Date(pago.fecha_de_pago).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(pago.fecha_de_vencimiento).toLocaleDateString()}</TableCell>
                <TableCell>{pago.metodo_de_pago}</TableCell>
                <TableCell>{pago.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}