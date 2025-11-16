/**
 * SERVICIO DE COCINEROS
 * Endpoints públicos: GET /cocineros, GET /cocineros/{id}, GET /cocineros/{id}/productos
 * Endpoints protegidos: PUT /cocineros/perfil, PATCH /cocineros/toggle-disponibilidad
 */

import apiClient from '../client'
import { normalizeApiResponse, normalizeApiArrayResponse } from '../adapters'
import { API_ENDPOINTS } from '@/config/constants'
import type {
  Cocinero,
  CocinerosResponse,
  CocineroResponse,
  ProductosResponse,
  PaginationParams,
} from '@/types'

export const cocinerosService = {
  /**
   * GET /v1/cocineros
   * Obtiene lista de todos los cocineros
   */
  getAll: async (params?: PaginationParams): Promise<Cocinero[]> => {
    const response = await apiClient.get<CocinerosResponse>(
      API_ENDPOINTS.COCINEROS,
      { params }
    )
    return normalizeApiArrayResponse(response.data)
  },

  /**
   * GET /v1/cocineros/{id}
   * Obtiene detalle de un cocinero específico
   */
  getById: async (id: number): Promise<Cocinero> => {
    const response = await apiClient.get<CocineroResponse>(
      API_ENDPOINTS.COCINERO_BY_ID(id)
    )
    return normalizeApiResponse(response.data)
  },

  /**
   * GET /v1/cocineros/{id}/productos
   * Obtiene productos de un cocinero específico
   */
  getProductos: async (id: number) => {
    const response = await apiClient.get<ProductosResponse>(
      API_ENDPOINTS.COCINERO_PRODUCTOS(id)
    )
    return normalizeApiArrayResponse(response.data)
  },

  /**
   * PUT /v1/cocineros/perfil
   * Actualiza perfil del cocinero autenticado (requiere auth + role: cocinero)
   */
  updatePerfil: async (data: Partial<Cocinero>): Promise<Cocinero> => {
    const response = await apiClient.put<CocineroResponse>(
      API_ENDPOINTS.COCINERO_PERFIL,
      data
    )
    return normalizeApiResponse(response.data)
  },

  /**
   * PATCH /v1/cocineros/toggle-disponibilidad
   * Cambia disponibilidad del cocinero (requiere auth + role: cocinero)
   */
  toggleDisponibilidad: async (): Promise<Cocinero> => {
    const response = await apiClient.patch<CocineroResponse>(
      API_ENDPOINTS.COCINERO_TOGGLE_DISPONIBILIDAD
    )
    return normalizeApiResponse(response.data)
  },
}
