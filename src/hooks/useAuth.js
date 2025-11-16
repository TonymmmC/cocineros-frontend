// Hook para autenticación - por ahora retorna valores simulados
// Esto debe conectarse con el sistema de autenticación real del proyecto

export const useAuth = () => {
  // Por ahora simulamos que hay un token en localStorage
  const token = localStorage.getItem('auth_token') || null
  const user = JSON.parse(localStorage.getItem('auth_user') || 'null')

  return {
    token,
    user,
    isAuthenticated: !!token,
    isCliente: user?.rol === 'cliente',
    isCocinero: user?.rol === 'cocinero'
  }
}
