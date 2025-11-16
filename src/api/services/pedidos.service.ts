/**
 * SERVICIO DE PEDIDOS
 * Endpoints nuevos agregados por C1:
 * - POST /pedidos - Crear pedido (cliente)
 * - GET /mis-pedidos - Ver mis pedidos (cliente)
 * - GET /pedidos-recibidos - Ver pedidos recibidos (cocinero)
 * - GET /pedidos/{id} - Ver detalle de pedido
 * - PATCH /pedidos/{id}/estado - Cambiar estado (cocinero)
 * - PATCH /pedidos/{id}/cancelar - Cancelar pedido (cliente)
 */

import apiClient from '../client'
import { normalizeApiResponse, normalizeApiArrayResponse } from '../adapters'
import { API_ENDPOINTS } from '@/config/constants'
import type {
  Pedido,
  PedidosResponse,
  PedidoResponse,
  CreatePedidoRequest,
  UpdateEstadoPedidoRequest,
} from '@/types'

export const pedidosService = {
  /**
   * POST /v1/pedidos
   * Crear un nuevo pedido (requiere auth + role: cliente)
   */
  create: async (data: CreatePedidoRequest): Promise<Pedido> => {
    const response = await apiClient.post<PedidoResponse>(
      API_ENDPOINTS.PEDIDOS,
      data
    )
    return normalizeApiResponse(response.data)
  },

  /**
   * GET /v1/mis-pedidos
   * Obtener mis pedidos como cliente (requiere auth + role: cliente)
   */
  getMisPedidos: async (): Promise<Pedido[]> => {
    const response = await apiClient.get<PedidosResponse>(
      API_ENDPOINTS.MIS_PEDIDOS
    )
    return normalizeApiArrayResponse(response.data)
  },

  /**
   * GET /v1/pedidos-recibidos
   * Obtener pedidos recibidos como cocinero (requiere auth + role: cocinero)
   */
  getPedidosRecibidos: async (): Promise<Pedido[]> => {
    const response = await apiClient.get<PedidosResponse>(
      API_ENDPOINTS.PEDIDOS_RECIBIDOS
    )
    return normalizeApiArrayResponse(response.data)
  },

  /**
   * GET /v1/pedidos/{id}
   * Obtener detalle de un pedido específico (requiere auth)
   */
  getById: async (id: number): Promise<Pedido> => {
    const response = await apiClient.get<PedidoResponse>(
      API_ENDPOINTS.PEDIDO_BY_ID(id)
    )
    return normalizeApiResponse(response.data)
  },

  /**
   * PATCH /v1/pedidos/{id}/estado
   * Cambiar estado de un pedido (requiere auth + role: cocinero)
   */
  cambiarEstado: async (id: number, data: UpdateEstadoPedidoRequest): Promise<Pedido> => {
    const response = await apiClient.patch<PedidoResponse>(
      API_ENDPOINTS.PEDIDO_CAMBIAR_ESTADO(id),
      data
    )
    return normalizeApiResponse(response.data)
  },

  /**
   * PATCH /v1/pedidos/{id}/cancelar
   * Cancelar un pedido (requiere auth + role: cliente, solo si puede_cancelar = true)
   */
  cancelar: async (id: number): Promise<Pedido> => {
    const response = await apiClient.patch<PedidoResponse>(
      API_ENDPOINTS.PEDIDO_CANCELAR(id)
    )
    return normalizeApiResponse(response.data)
  },
}
