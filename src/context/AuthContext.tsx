/**
 * CONTEXT DE AUTENTICACIÓN
 *
 * Maneja:
 * - Estado global de autenticación
 * - Login/Logout/Register
 * - Persistencia de token y usuario
 * - Escucha eventos de sesión expirada (401)
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from '@/api/services'
import { tokenStorage, userStorage } from '@/api/client'
import { extractErrorMessage } from '@/api/adapters'
import type { User, LoginRequest, RegisterRequest } from '@/types'
import type { AuthContextValue } from '@/types/components'

// ============================================================================
// CONTEXT
// ============================================================================

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// ============================================================================
// PROVIDER
// ============================================================================

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // ==========================================================================
  // INICIALIZACIÓN - Restaurar sesión desde storage
  // ==========================================================================

  useEffect(() => {
    const initAuth = () => {
      try {
        const storedToken = tokenStorage.get()
        const storedUser = userStorage.get()

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setToken(storedToken)
          setUser(parsedUser)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('[Auth] Error al restaurar sesión:', error)
        // Si hay error al parsear, limpiamos
        clearAuth()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  // ==========================================================================
  // ESCUCHAR EVENTOS DE SESIÓN EXPIRADA (401)
  // ==========================================================================

  useEffect(() => {
    const handleUnauthorized = () => {
      console.warn('[Auth] Sesión expirada - Limpiando autenticación')
      clearAuth()
      // Aquí podrías mostrar un toast/notificación al usuario
    }

    window.addEventListener('auth:unauthorized', handleUnauthorized)

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized)
    }
  }, [])

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  const clearAuth = useCallback(() => {
    tokenStorage.remove()
    userStorage.remove()
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const saveAuth = useCallback((authToken: string, authUser: User) => {
    tokenStorage.set(authToken)
    userStorage.set(JSON.stringify(authUser))
    setToken(authToken)
    setUser(authUser)
    setIsAuthenticated(true)
  }, [])

  // ==========================================================================
  // LOGIN
  // ==========================================================================

  const login = useCallback(
    async (credentials: LoginRequest): Promise<{ success: boolean; error?: string }> => {
      try {
        const response = await authService.login(credentials)

        // Guardar token y usuario
        saveAuth(response.token, response.user)

        return { success: true }
      } catch (error) {
        const errorMessage = extractErrorMessage(error)
        console.error('[Auth] Error en login:', errorMessage)
        return { success: false, error: errorMessage }
      }
    },
    [saveAuth]
  )

  // ==========================================================================
  // REGISTER
  // ==========================================================================

  const register = useCallback(
    async (userData: RegisterRequest): Promise<{ success: boolean; error?: string }> => {
      try {
        const response = await authService.register(userData)

        // Guardar token y usuario
        saveAuth(response.token, response.user)

        return { success: true }
      } catch (error) {
        const errorMessage = extractErrorMessage(error)
        console.error('[Auth] Error en registro:', errorMessage)
        return { success: false, error: errorMessage }
      }
    },
    [saveAuth]
  )

  // ==========================================================================
  // LOGOUT
  // ==========================================================================

  const logout = useCallback(async (): Promise<void> => {
    try {
      // Intentar cerrar sesión en el backend
      await authService.logout()
    } catch (error) {
      console.error('[Auth] Error al cerrar sesión en backend:', error)
      // Continuamos con el logout local aunque falle el backend
    } finally {
      // Siempre limpiar localmente
      clearAuth()
    }
  }, [clearAuth])

  // ==========================================================================
  // CONTEXT VALUE
  // ==========================================================================

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ============================================================================
// HOOK PERSONALIZADO
// ============================================================================

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }

  return context
}
