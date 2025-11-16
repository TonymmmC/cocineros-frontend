/**
 * SERVICIOS DE API - Exportación centralizada
 *
 * Todos los servicios están basados en los contratos proporcionados por C1 (Backend)
 * Ver documentación completa en: CONTRATOS DE API - BACKEND COCINEROS-SISTEMA
 */

export { authService } from './auth.service'
export { cocinerosService } from './cocineros.service'
export { productosService } from './productos.service'
export { categoriasService } from './categorias.service'

// Re-exportar para compatibilidad con código legacy
export { authService as default } from './auth.service'
export { cocinerosService as cocineroService } from './cocineros.service'
export { productosService as productoService } from './productos.service'
export { categoriasService as categoriaService } from './categorias.service'
