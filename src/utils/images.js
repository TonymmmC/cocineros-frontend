const API_BASE_URL = import.meta.env.VITE_API_URL.replace('/api/v1', '')

export const getImageUrl = (path, defaultImage = null) => {
  if (!path) return defaultImage
  return `${API_BASE_URL}/storage/${path}`
}

export const getChefImageUrl = (path) => {
  const DEFAULT_CHEF_IMAGE = 'https://ui-avatars.com/api/?name=Chef&size=600&background=f59e0b&color=fff&bold=true'
  return getImageUrl(path, DEFAULT_CHEF_IMAGE)
}

export const getProductImageUrl = (path) => {
  return getImageUrl(path, null)
}
