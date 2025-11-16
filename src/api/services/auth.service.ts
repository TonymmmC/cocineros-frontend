/**
 * SERVICIO DE AUTENTICACIÓN
 * Endpoints: POST /login, POST /register, POST /logout, GET /me
 */

import apiClient from '../client'
import { normalizeApiResponse } from '../adapters'
import { API_ENDPOINTS } from '@/config/constants'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  LogoutResponse,
  MeResponse,
} from '@/types'

export const authService = {
  /**
   * POST /v1/login
   * Autentica un usuario y devuelve token + datos de usuario
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.LOGIN,
      credentials
    )
    return normalizeApiResponse(response.data)
  },

  /**
   * POST /v1/register
   * Registra un nuevo usuario (cliente)
   */
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      API_ENDPOINTS.REGISTER,
      userData
    )
    return normalizeApiResponse(response.data)
  },

  /**
   * POST /v1/logout
   * Cierra sesión del usuario actual (requiere auth)
   */
  logout: async (): Promise<LogoutResponse> => {
    const response = await apiClient.post<LogoutResponse>(API_ENDPOINTS.LOGOUT)
    return normalizeApiResponse(response.data)
  },

  /**
   * GET /v1/me
   * Obtiene datos del usuario autenticado (requiere auth)
   */
  me: async (): Promise<MeResponse> => {
    const response = await apiClient.get<MeResponse>(API_ENDPOINTS.ME)
    return normalizeApiResponse(response.data)
  },
}
