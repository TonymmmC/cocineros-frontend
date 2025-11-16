/**
 * TIPOS DE COMPONENTES - Props y tipos internos del frontend
 */

import type { Cocinero, Producto } from './api'

// ============================================================================
// NAVEGACIÓN
// ============================================================================

export type PageType = 'home' | 'login' | 'productos' | 'cocineros' | 'cocinero-perfil'

// ============================================================================
// COMPONENTES DE UI
// ============================================================================

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export interface LoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

export interface ImageWithFallbackProps {
  src: string | null
  alt: string
  className?: string
  fallbackIcon?: React.ReactNode
}

// ============================================================================
// COMPONENTES DE LAYOUT
// ============================================================================

export interface NavbarProps {
  onNavigate?: (page: PageType) => void
  currentPage?: PageType
}

export interface MainLayoutProps {
  children: React.ReactNode
  showNavbar?: boolean
}

// ============================================================================
// COMPONENTES DE DOMINIO
// ============================================================================

export interface CocineroCardProps {
  cocinero: Cocinero
  onSelect?: (id: number) => void
}

export interface ProductoCardProps {
  producto: Producto
  onSelect?: (id: number) => void
  showCocinero?: boolean
}

export interface PerfilCocineroProps {
  cocinero: Cocinero
}

// ============================================================================
// FORMS
// ============================================================================

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  password_confirmation: string
  phone?: string
}

// ============================================================================
// CONTEXT
// ============================================================================

export interface AuthContextValue {
  user: import('./api').User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (credentials: LoginFormData) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  register: (userData: RegisterFormData) => Promise<{ success: boolean; error?: string }>
}

export interface ThemeContextValue {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}
