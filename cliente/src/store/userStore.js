import { create } from 'zustand'
import axios from 'axios'

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUserById: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`)
      set({ user: response.data.user, loading: false })
      console.log(response.data);
      
    } 
    catch (error) {
      set({ error: 'No se pudo cargar el usuario', loading: false })
    }
  },
    login: async (usuario, contraseña) => {
    set({ loading: true, error: null })
    try {
    const res = await axios.get('http://localhost:3001/users/')
const users = res.data.getUser || [] // Ajustá según cómo responde tu API
const foundUser = users.find(
        (u) => u.usuario === usuario && u.contraseña === contraseña
      )
   
      
      if (foundUser) {
        set({ user: foundUser, loading: false })
      } else {
        set({ error: 'Usuario no encontrado', loading: false })
      }
    } catch (error) {
      console.log(error);
      
      set({ error: 'Error al conectar con el servidor', loading: false })
    }
  },

  logout: () => set({ user: null })
}))

