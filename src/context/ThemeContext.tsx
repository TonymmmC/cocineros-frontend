/**
 * CONTEXT DE TEMA (LIGHT/DARK MODE)
 *
 * Maneja:
 * - Tema claro/oscuro
 * - Persistencia en localStorage
 * - Detección de preferencia del sistema
 * - Sincronización con clase 'dark' en HTML
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ThemeContextValue } from '@/types/components'

// ============================================================================
// CONSTANTS
// ============================================================================

const THEME_STORAGE_KEY = 'theme'
type Theme = 'light' | 'dark'

// ============================================================================
// CONTEXT
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

// ============================================================================
// PROVIDER
// ============================================================================

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // 1. Intentar obtener tema guardado
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    // 2. Detectar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  // ==========================================================================
  // APLICAR TEMA AL DOM
  // ==========================================================================

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Persistir en localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  // ==========================================================================
  // ESCUCHAR CAMBIOS EN PREFERENCIA DEL SISTEMA
  // ==========================================================================

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      // Solo actualizar si no hay tema guardado explícitamente por el usuario
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      if (!savedTheme) {
        setThemeState(e.matches ? 'dark' : 'light')
      }
    }

    // Navegadores modernos
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    // Fallback para navegadores antiguos
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  // ==========================================================================
  // MÉTODOS
  // ==========================================================================

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
  }, [])

  // ==========================================================================
  // CONTEXT VALUE
  // ==========================================================================

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// ============================================================================
// HOOK PERSONALIZADO
// ============================================================================

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider')
  }

  return context
}
