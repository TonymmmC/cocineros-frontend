import { useState, useEffect } from 'react'
import { authService } from '../api/services'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
      setIsAuthenticated(true)
    }
    
    setLoading(false)
  }

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)
      
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      setUser(response.user)
      setIsAuthenticated(true)
      
      return { success: true, user: response.user }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión'
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      setUser(response.user)
      setIsAuthenticated(true)
      
      return { success: true, user: response.user }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al registrarse'
      return { success: false, error: message }
    }
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
  }
}