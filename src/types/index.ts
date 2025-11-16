/**
 * TIPOS CENTRALIZADOS - Exporta todos los tipos del proyecto
 */

// API Types
export type {
  // Auth
  User,
  UserRole,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  LogoutResponse,
  MeResponse,

  // Cocineros
  Cocinero,
  CocineroUser,
  CocinerosResponse,
  CocineroResponse,

  // Categorías
  Categoria,
  CategoriasResponse,
  CategoriaResponse,

  // Productos
  Producto,
  ProductoCocinero,
  ProductoCategoria,
  ProductosResponse,
  ProductoResponse,
  CreateProductoRequest,
  UpdateProductoRequest,

  // Errors
  ApiError,
  ApiErrorResponse,

  // Helpers
  ApiResponse,
  PaginationParams,
  SearchParams,
  PaginationMeta,
  PaginatedResponse,
} from './api'

// Component Types
export type {
  // Navigation
  PageType,

  // UI Components
  ButtonProps,
  LoadingProps,
  ImageWithFallbackProps,

  // Layout
  NavbarProps,
  MainLayoutProps,

  // Domain Components
  CocineroCardProps,
  ProductoCardProps,
  PerfilCocineroProps,

  // Forms
  LoginFormData,
  RegisterFormData,

  // Context
  AuthContextValue,
  ThemeContextValue,
} from './components'
