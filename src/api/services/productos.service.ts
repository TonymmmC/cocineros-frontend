/**
 * SERVICIO DE PRODUCTOS
 * Endpoints públicos: GET /productos, GET /productos/{id}, GET /productos/search, GET /productos/categoria/{id}
 * Endpoints protegidos: POST /productos, PUT /productos/{id}, DELETE /productos/{id}, PATCH /productos/{id}/toggle-disponibilidad
 */

import apiClient from '../client'
import { normalizeApiResponse, normalizeApiArrayResponse } from '../adapters'
import { API_ENDPOINTS } from '@/config/constants'
import type {
  Producto,
  ProductosResponse,
  ProductoResponse,
  CreateProductoRequest,
  UpdateProductoRequest,
  PaginationParams,
  SearchParams,
} from '@/types'

export const productosService = {
  /**
   * GET /v1/productos
   * Obtiene lista de todos los productos
   */
  getAll: async (params?: PaginationParams): Promise<Producto[]> => {
    const response = await apiClient.get<ProductosResponse>(
      API_ENDPOINTS.PRODUCTOS,
      { params }
    )
    return normalizeApiArrayResponse(response.data)
  },

  /**
   * GET /v1/productos/{id}
   * Obtiene detalle de un producto específico
   */
  getById: async (id: number): Promise<Producto> => {
    const response = await apiClient.get<ProductoResponse>(
      API_ENDPOINTS.PRODUCTO_BY_ID(id)
    )
    return normalizeApiResponse(response.data)
  },

  /**
   * GET /v1/productos/search?q={query}
   * Busca productos por nombre/descripción
   */
  search: async (query: string): Promise<Producto[]> => {
    const params: SearchParams = { q: query }
    const response = await apiClient.get<ProductosResponse>(
      API_ENDPOINTS.PRODUCTOS_SEARCH,
      { params }
    )
    return normalizeApiArrayResponse(response.data)
  },

  /**
   * GET /v1/productos/categoria/{categoriaId}
   * Obtiene productos filtrados por categoría
   */
  getByCategoria: async (categoriaId: number): Promise<Producto[]> => {
    const response = await apiClient.get<ProductosResponse>(
      API_ENDPOINTS.PRODUCTOS_BY_CATEGORIA(categoriaId)
    )
    return normalizeApiArrayResponse(response.data)
  },

  /**
   * POST /v1/productos
   * Crea un nuevo producto (requiere auth + role: cocinero)
   */
  create: async (data: CreateProductoRequest): Promise<Producto> => {
    const response = await apiClient.post<ProductoResponse>(
      API_ENDPOINTS.PRODUCTOS,
      data
    )
    return normalizeApiResponse(response.data)
  },

  /**
   * PUT /v1/productos/{id}
   * Actualiza un producto existente (requiere auth + role: cocinero)
   */
  update: async (id: number, data: UpdateProductoRequest): Promise<Producto> => {
    const response = await apiClient.put<ProductoResponse>(
      API_ENDPOINTS.PRODUCTO_BY_ID(id),
      data
    )
    return normalizeApiResponse(response.data)
  },

  /**
   * DELETE /v1/productos/{id}
   * Elimina un producto (requiere auth + role: cocinero)
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.PRODUCTO_BY_ID(id))
  },

  /**
   * PATCH /v1/productos/{id}/toggle-disponibilidad
   * Cambia disponibilidad del producto (requiere auth + role: cocinero)
   */
  toggleDisponibilidad: async (id: number): Promise<Producto> => {
    const response = await apiClient.patch<ProductoResponse>(
      API_ENDPOINTS.PRODUCTO_TOGGLE_DISPONIBILIDAD(id)
    )
    return normalizeApiResponse(response.data)
  },
}
