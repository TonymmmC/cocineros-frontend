/**
 * CONFIGURACIÓN Y CONSTANTES DEL PROYECTO
 */

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1',
  TIMEOUT: 30000, // 30 segundos
  RETRY_ATTEMPTS: 1,
} as const

// ============================================================================
// AUTH CONFIGURATION
// ============================================================================

export const AUTH_CONFIG = {
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'user',
  STORAGE_TYPE: (import.meta.env.VITE_AUTH_STORAGE || 'localStorage') as 'localStorage' | 'sessionStorage',
} as const

// ============================================================================
// ROUTES
// ============================================================================

export const ROUTES = {
  HOME: 'home',
  LOGIN: 'login',
  REGISTER: 'register',
  PRODUCTOS: 'productos',
  COCINEROS: 'cocineros',
  COCINERO_PERFIL: 'cocinero-perfil',
  MI_PERFIL: 'mi-perfil',
} as const

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  ME: '/me',

  // Cocineros
  COCINEROS: '/cocineros',
  COCINERO_BY_ID: (id: number) => `/cocineros/${id}`,
  COCINERO_PRODUCTOS: (id: number) => `/cocineros/${id}/productos`,
  COCINERO_PERFIL: '/cocineros/perfil',
  COCINERO_TOGGLE_DISPONIBILIDAD: '/cocineros/toggle-disponibilidad',

  // Productos
  PRODUCTOS: '/productos',
  PRODUCTO_BY_ID: (id: number) => `/productos/${id}`,
  PRODUCTOS_SEARCH: '/productos/search',
  PRODUCTOS_BY_CATEGORIA: (categoriaId: number) => `/productos/categoria/${categoriaId}`,
  PRODUCTO_TOGGLE_DISPONIBILIDAD: (id: number) => `/productos/${id}/toggle-disponibilidad`,

  // Categorías
  CATEGORIAS: '/categorias',
  CATEGORIA_BY_ID: (id: number) => `/categorias/${id}`,
} as const

// ============================================================================
// QUERY KEYS (para React Query)
// ============================================================================

export const QUERY_KEYS = {
  // Auth
  ME: ['me'] as const,

  // Cocineros
  COCINEROS: ['cocineros'] as const,
  COCINERO: (id: number) => ['cocinero', id] as const,
  COCINERO_PRODUCTOS: (id: number) => ['cocinero', id, 'productos'] as const,

  // Productos
  PRODUCTOS: ['productos'] as const,
  PRODUCTO: (id: number) => ['producto', id] as const,
  PRODUCTOS_SEARCH: (query: string) => ['productos', 'search', query] as const,
  PRODUCTOS_CATEGORIA: (categoriaId: number) => ['productos', 'categoria', categoriaId] as const,

  // Categorías
  CATEGORIAS: ['categorias'] as const,
  CATEGORIA: (id: number) => ['categoria', id] as const,
} as const

// ============================================================================
// UI CONSTANTS
// ============================================================================

export const UI_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 50,
  DEBOUNCE_DELAY: 300, // ms para búsqueda
  TOAST_DURATION: 3000, // ms
  IMAGE_PLACEHOLDER: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="rgba(0,0,0,0.5)" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ESin imagen%3C/text%3E%3C/svg%3E',
} as const

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MAX_LENGTH: 255,
  PHONE_MAX_LENGTH: 20,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  UNAUTHORIZED: 'No tienes autorización para esta acción.',
  NOT_FOUND: 'Recurso no encontrado.',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde.',
  VALIDATION_ERROR: 'Verifica los datos ingresados.',
  UNKNOWN_ERROR: 'Ocurrió un error inesperado.',
} as const

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  LOGOUT_SUCCESS: 'Sesión cerrada exitosamente',
  REGISTER_SUCCESS: 'Registro exitoso',
  UPDATE_SUCCESS: 'Actualización exitosa',
  CREATE_SUCCESS: 'Creado exitosamente',
  DELETE_SUCCESS: 'Eliminado exitosamente',
} as const
