/**
 * TIPOS DE API - Basados en contratos de C1 (Backend Laravel)
 * URL Base: http://localhost:8000/api/v1
 * Autenticación: Laravel Sanctum (Bearer Token)
 */

// ============================================================================
// AUTENTICACIÓN
// ============================================================================

export type UserRole = 'superadmin' | 'admin' | 'cocinero' | 'cliente'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  phone: string | null
  is_verified: boolean
  is_active?: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  user: User
  token: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
  phone?: string | null
}

export interface RegisterResponse {
  message: string
  user: User
  token: string
}

export interface LogoutResponse {
  message: string
}

export interface MeResponse {
  user: User
}

// ============================================================================
// COCINEROS
// ============================================================================

export interface CocineroUser {
  id: number
  name: string
  email: string
  phone: string | null
}

export interface Cocinero {
  id: number
  user_id: number
  nombre_completo: string
  ci: string
  foto_perfil: string | null
  bio: string | null
  especialidades: string[]
  certificaciones: string[]
  direccion: string | null
  latitud: number | null
  longitud: number | null
  radio_entrega_km: number
  esta_disponible: boolean
  calificacion_promedio: number
  total_pedidos: number
  productos_count?: number
  user: CocineroUser
  created_at: string
  updated_at: string
}

export interface CocinerosResponse {
  data: Cocinero[]
}

export interface CocineroResponse {
  data: Cocinero
}

// ============================================================================
// CATEGORÍAS
// ============================================================================

export interface Categoria {
  id: number
  nombre: string
  descripcion?: string | null
  icono?: string | null
  created_at: string
  updated_at: string
}

export interface CategoriasResponse {
  data: Categoria[]
}

export interface CategoriaResponse {
  data: Categoria
}

// ============================================================================
// PRODUCTOS
// ============================================================================

export interface ProductoCocinero {
  id: number
  nombre: string
  email: string
}

export interface ProductoCategoria {
  id: number
  nombre: string
}

export interface Producto {
  id: number
  nombre: string
  descripcion: string | null
  precio: number
  precio_formateado: string
  tiempo_preparacion_min: number
  porciones: number
  stock_disponible: number
  imagenes: string[]
  primera_imagen: string | null
  ingredientes: string[]
  alergenos: string[]
  es_vegetariano: boolean
  es_vegano: boolean
  es_sin_gluten: boolean
  disponible: boolean
  vistas: number
  categoria: ProductoCategoria
  cocinero: ProductoCocinero
  created_at: string
  updated_at: string
}

export interface ProductosResponse {
  data: Producto[]
}

export interface ProductoResponse {
  data: Producto
}

export interface CreateProductoRequest {
  nombre: string
  descripcion?: string
  precio: number
  tiempo_preparacion_min: number
  porciones: number
  stock_disponible: number
  imagenes?: string[]
  ingredientes?: string[]
  alergenos?: string[]
  es_vegetariano?: boolean
  es_vegano?: boolean
  es_sin_gluten?: boolean
  disponible?: boolean
  categoria_id: number
}

export interface UpdateProductoRequest extends Partial<CreateProductoRequest> {}

// ============================================================================
// ERRORES
// ============================================================================

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}

export interface ApiErrorResponse {
  response: {
    data: ApiError
    status: number
  }
}

// ============================================================================
// HELPERS DE TIPO
// ============================================================================

/**
 * Helper para respuestas de API que pueden venir envueltas en { data: T } o directamente como T
 */
export type ApiResponse<T> = T | { data: T }

/**
 * Parámetros comunes de paginación (si C1 los implementa en el futuro)
 */
export interface PaginationParams {
  page?: number
  per_page?: number
}

/**
 * Parámetros de búsqueda
 */
export interface SearchParams {
  q: string
}

/**
 * Metadata de paginación (para futuro)
 */
export interface PaginationMeta {
  current_page: number
  from: number
  to: number
  per_page: number
  last_page: number
  total: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta?: PaginationMeta
  links?: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
}
