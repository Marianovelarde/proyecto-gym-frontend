import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"


export default function AdminPanel() {

  const navigate = useNavigate()

  const handleReturn = () => {
    navigate('/home')
  }
  return (
    <div>
      <Typography variant="h4">Panel de Administrador</Typography>
      <Button variant="contained" onClick={handleReturn}>Volver</Button>
      {/* Aquí podrías colocar componentes para crear usuarios y ver pagos */}
    </div>
  )
}