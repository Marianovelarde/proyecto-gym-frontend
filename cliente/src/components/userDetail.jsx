import React, { useEffect } from 'react'
import { useUserStore } from '../store/userStore'
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  Divider
} from '@mui/material'

export default function UserDetails({ userId }) {
  const { user, fetchUserById, loading, error } = useUserStore()

  useEffect(() => {
    fetchUserById(userId)
  }, [userId])

  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">{error}</Typography>
  if (!user) return null

  return (
    <Box sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">Usuario: {user.usuario}</Typography>
          <Typography variant="subtitle1">Rol: {user.rol}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Pagos:</Typography>
          <List>
            {user.entityPagos && user.entityPagos.length > 0 ? (
              user.entityPagos.map((pago) => (
                <ListItem key={pago.idPagos}>
                  <Typography>
                    Monto: ${pago.monto} | Método: {pago.metodo_de_pago} | Estado: {pago.estado} <br />
                    Fecha de Pago: {new Date(pago.fecha_de_pago).toLocaleDateString()} - Vencimiento: {new Date(pago.fecha_de_vencimiento).toLocaleDateString()}
                  </Typography>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Typography>No hay pagos registrados.</Typography>
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}
