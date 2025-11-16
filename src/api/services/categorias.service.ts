/**
 * SERVICIO DE CATEGORÍAS
 * Endpoints públicos: GET /categorias, GET /categorias/{id}
 */

import apiClient from '../client'
import { normalizeApiResponse, normalizeApiArrayResponse } from '../adapters'
import { API_ENDPOINTS } from '@/config/constants'
import type {
  Categoria,
  CategoriasResponse,
  CategoriaResponse,
} from '@/types'

export const categoriasService = {
  /**
   * GET /v1/categorias
   * Obtiene lista de todas las categorías
   */
  getAll: async (): Promise<Categoria[]> => {
    const response = await apiClient.get<CategoriasResponse>(
      API_ENDPOINTS.CATEGORIAS
    )
    return normalizeApiArrayResponse(response.data)
  },

  /**
   * GET /v1/categorias/{id}
   * Obtiene detalle de una categoría específica
   */
  getById: async (id: number): Promise<Categoria> => {
    const response = await apiClient.get<CategoriaResponse>(
      API_ENDPOINTS.CATEGORIA_BY_ID(id)
    )
    return normalizeApiResponse(response.data)
  },
}
