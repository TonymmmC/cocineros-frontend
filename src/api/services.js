import apiClient from './client'

// ============= AUTH =============
export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post('/login', credentials)
    return response.data
  },
  
  logout: async () => {
    const response = await apiClient.post('/logout')
    return response.data
  },
  
  register: async (userData) => {
    const response = await apiClient.post('/register', userData)
    return response.data
  },
}

// ============= CATEGORIAS =============
export const categoriaService = {
  getAll: async () => {
    const response = await apiClient.get('/categorias')
    return response.data
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/categorias/${id}`)
    return response.data
  },
}

// ============= PRODUCTOS =============
export const productoService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/productos', { params })
    return response.data
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/productos/${id}`)
    return response.data
  },
  
  search: async (query) => {
    const response = await apiClient.get('/productos/search', { 
      params: { q: query } 
    })
    return response.data
  },
  
  // Para cocineros
  create: async (producto) => {
    const response = await apiClient.post('/productos', producto)
    return response.data
  },
  
  update: async (id, producto) => {
    const response = await apiClient.put(`/productos/${id}`, producto)
    return response.data
  },
  
  delete: async (id) => {
    const response = await apiClient.delete(`/productos/${id}`)
    return response.data
  },
}

// ============= COCINEROS =============
export const cocineroService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/cocineros', { params })
    return response.data
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/cocineros/${id}`)
    return response.data
  },
  
  getProductos: async (id) => {
    const response = await apiClient.get(`/cocineros/${id}/productos`)
    return response.data
  },
}