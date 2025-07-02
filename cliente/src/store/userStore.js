// store/userStore.js
import { create } from 'zustand'
import axios from 'axios'

// Función segura para obtener el usuario desde localStorage
const getStoredUser = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('authUser')
      return stored ? JSON.parse(stored) : null
    } catch (e) {
      console.error('Error al parsear localStorage:', e)
      return null
    }
  }
  return null
}

export const useUserStore = create((set, get) => ({
  user: getStoredUser(),
  loading: false,
  error: null,
  pagos: [],
  message: null,
  users: [],

  fetchUserById: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`)
      set({ user: response.data.user, loading: false })
    } catch (error) {
      set({ error: 'No se pudo cargar el usuario', loading: false })
    }
  },

  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get('http://localhost:3001/users/')
      set({ users: res.data.getUser || [], loading: false })
    } catch (error) {
      set({ error: 'Error al cargar los usuarios', loading: false })
    }
  },

  login: async (username, password) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get('http://localhost:3001/users/')
      const foundUser = res.data.getUser.find(
        (u) => u.usuario === username && u.contraseña === password
      )
      if (foundUser) {
        localStorage.setItem('authUser', JSON.stringify(foundUser)) // Guardar sesión
        set({ user: foundUser, loading: false })
      } else {
        set({ error: 'Usuario no encontrado', loading: false })
      }
    } catch (error) {
      set({ error: 'Error al conectar con el servidor', loading: false })
    }
  },

  logout: () => {
    localStorage.removeItem('authUser') // Borrar sesión
    set({ user: null })
  },

  fetchPagos: async (id) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get(`http://localhost:3001/pagos/${id}`)
      set({ pagos: res.data, loading: false })
    } catch (error) {
      set({ error: 'No se pudieron obtener los pagos', loading: false })
    }
  },

  createUser: async (newUser) => {
    set({ loading: true, error: null, message: null })
    try {
      await axios.post('http://localhost:3001/users/signup', newUser)
      set({ message: { type: 'success', text: 'Usuario creado correctamente' }, loading: false })
    } catch (error) {
      set({ error: 'Error al crear usuario', loading: false })
    }
  }
}))
