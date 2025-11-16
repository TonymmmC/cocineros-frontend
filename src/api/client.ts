/**
 * CLIENTE HTTP - Axios configurado para Backend C1
 *
 * Configuración:
 * - Base URL: http://localhost:8000/api/v1
 * - Autenticación: Bearer Token (Laravel Sanctum)
 * - Interceptores: Request (token) + Response (errores)
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG, AUTH_CONFIG } from '@/config/constants'

// ============================================================================
// STORAGE HELPERS
// ============================================================================

const storage = AUTH_CONFIG.STORAGE_TYPE === 'localStorage' ? localStorage : sessionStorage

export const tokenStorage = {
  get: (): string | null => storage.getItem(AUTH_CONFIG.TOKEN_KEY),
  set: (token: string): void => storage.setItem(AUTH_CONFIG.TOKEN_KEY, token),
  remove: (): void => storage.removeItem(AUTH_CONFIG.TOKEN_KEY),
}

export const userStorage = {
  get: (): string | null => storage.getItem(AUTH_CONFIG.USER_KEY),
  set: (user: string): void => storage.setItem(AUTH_CONFIG.USER_KEY, user),
  remove: (): void => storage.removeItem(AUTH_CONFIG.USER_KEY),
}

// ============================================================================
// AXIOS CLIENT
// ============================================================================

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Cambia a true si C1 requiere cookies
})

// ============================================================================
// REQUEST INTERCEPTOR - Agrega Bearer Token
// ============================================================================

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.get()

    if (token && config.headers) {
      // Laravel Sanctum espera: Authorization: Bearer {token}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error)
    return Promise.reject(error)
  }
)

// ============================================================================
// RESPONSE INTERCEPTOR - Maneja errores (especialmente 401)
// ============================================================================

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status

    // Error 401: No autenticado
    if (status === 401) {
      console.warn('[API] Error 401 - Usuario no autenticado')

      // Limpiar tokens
      tokenStorage.remove()
      userStorage.remove()

      // Emitir evento personalizado para que AuthContext lo maneje
      // Esto es mejor que window.location.href porque respeta el routing de SPA
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))

      // Nota: No redirigimos aquí directamente para evitar interferir con el routing
      // El AuthContext escuchará este evento y manejará la redirección
    }

    // Error 403: No autorizado (sin permisos)
    if (status === 403) {
      console.warn('[API] Error 403 - Sin permisos para esta acción')
    }

    // Error 404: Recurso no encontrado
    if (status === 404) {
      console.warn('[API] Error 404 - Recurso no encontrado')
    }

    // Error 422: Validación fallida
    if (status === 422) {
      console.warn('[API] Error 422 - Error de validación', error.response?.data)
    }

    // Error 500: Error del servidor
    if (status === 500) {
      console.error('[API] Error 500 - Error interno del servidor')
    }

    return Promise.reject(error)
  }
)

// ============================================================================
// EXPORT
// ============================================================================

export default apiClient
