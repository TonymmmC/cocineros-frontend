/**
 * ADAPTADORES DE API - Normaliza respuestas del backend
 *
 * Según los contratos de C1, las respuestas vienen envueltas en { data: T }
 * Estos adaptadores extraen los datos de manera consistente.
 */

import type { ApiResponse } from '@/types'

/**
 * Normaliza respuestas de API que pueden venir como { data: T } o directamente como T
 */
export function normalizeApiResponse<T>(response: ApiResponse<T>): T {
  // Si la respuesta tiene una propiedad 'data', la extraemos
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data
  }

  // Si no, asumimos que la respuesta ya es del tipo esperado
  return response as T
}

/**
 * Normaliza arrays de datos de API
 */
export function normalizeApiArrayResponse<T>(response: ApiResponse<T[]>): T[] {
  const normalized = normalizeApiResponse(response)

  // Aseguramos que siempre sea un array
  if (!Array.isArray(normalized)) {
    console.warn('[API Adapter] Expected array but got:', normalized)
    return []
  }

  return normalized
}

/**
 * Extrae mensaje de error de la respuesta de la API
 */
export function extractErrorMessage(error: any): string {
  // Error con respuesta del servidor
  if (error?.response?.data) {
    const data = error.response.data

    // Mensaje directo
    if (data.message) {
      return data.message
    }

    // Errores de validación (Laravel)
    if (data.errors && typeof data.errors === 'object') {
      const firstErrorKey = Object.keys(data.errors)[0]
      const firstError = data.errors[firstErrorKey]

      if (Array.isArray(firstError) && firstError.length > 0) {
        return firstError[0]
      }
    }
  }

  // Error de red
  if (error?.message === 'Network Error') {
    return 'Error de conexión. Verifica tu internet.'
  }

  // Timeout
  if (error?.code === 'ECONNABORTED') {
    return 'La petición tardó demasiado. Intenta de nuevo.'
  }

  // Error genérico
  return error?.message || 'Ocurrió un error inesperado'
}

/**
 * Maneja errores de autenticación
 */
export function isAuthError(error: any): boolean {
  return error?.response?.status === 401
}

/**
 * Maneja errores de validación
 */
export function isValidationError(error: any): boolean {
  return error?.response?.status === 422
}

/**
 * Maneja errores de permisos
 */
export function isForbiddenError(error: any): boolean {
  return error?.response?.status === 403
}

/**
 * Maneja errores de recurso no encontrado
 */
export function isNotFoundError(error: any): boolean {
  return error?.response?.status === 404
}

/**
 * Obtiene el código de estado HTTP del error
 */
export function getErrorStatusCode(error: any): number | null {
  return error?.response?.status || null
}
