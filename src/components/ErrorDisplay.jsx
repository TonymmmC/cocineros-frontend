/**
 * COMPONENTE DE ERROR MEJORADO
 * Muestra errores de API de manera más informativa
 */

import { AlertCircle, WifiOff, Server, ShieldAlert, RefreshCw } from 'lucide-react'

export default function ErrorDisplay({ error, onRetry, context = 'datos' }) {
  const getErrorInfo = () => {
    // Network Error - Backend no está corriendo
    if (error?.message === 'Network Error' || error?.code === 'ERR_NETWORK') {
      return {
        icon: WifiOff,
        title: 'Backend no disponible',
        message: 'No se puede conectar con el servidor',
        details: [
          'El servidor Laravel no está corriendo en el puerto 8000',
          'Verifica que el backend esté activo',
          'Comando: php artisan serve --host=127.0.0.1 --port=8000',
        ],
        color: 'red',
        canRetry: true,
      }
    }

    // Error 401 - No autenticado
    if (error?.response?.status === 401) {
      return {
        icon: ShieldAlert,
        title: 'Sesión expirada',
        message: 'Tu sesión ha caducado',
        details: ['Por favor, inicia sesión nuevamente'],
        color: 'amber',
        canRetry: false,
      }
    }

    // Error 403 - No autorizado
    if (error?.response?.status === 403) {
      return {
        icon: ShieldAlert,
        title: 'Acceso denegado',
        message: 'No tienes permisos para acceder a este recurso',
        details: ['Contacta al administrador si crees que esto es un error'],
        color: 'red',
        canRetry: false,
      }
    }

    // Error 404 - No encontrado
    if (error?.response?.status === 404) {
      return {
        icon: AlertCircle,
        title: 'Recurso no encontrado',
        message: 'El recurso solicitado no existe',
        details: [error?.response?.data?.message || 'Verifica que la URL sea correcta'],
        color: 'amber',
        canRetry: false,
      }
    }

    // Error 422 - Validación
    if (error?.response?.status === 422) {
      const errors = error?.response?.data?.errors
      const errorMessages = errors
        ? Object.values(errors).flat()
        : ['Datos inválidos']

      return {
        icon: AlertCircle,
        title: 'Error de validación',
        message: 'Los datos enviados no son válidos',
        details: errorMessages,
        color: 'amber',
        canRetry: false,
      }
    }

    // Error 500 - Error del servidor
    if (error?.response?.status === 500) {
      return {
        icon: Server,
        title: 'Error del servidor',
        message: 'Ocurrió un error en el backend',
        details: [
          error?.response?.data?.message || 'Error interno del servidor',
          'Revisa los logs de Laravel para más detalles',
        ],
        color: 'red',
        canRetry: true,
      }
    }

    // Error CORS
    if (error?.message?.includes('CORS') || error?.code === 'ERR_CORS') {
      return {
        icon: ShieldAlert,
        title: 'Error de CORS',
        message: 'El servidor rechazó la petición por CORS',
        details: [
          'Verifica la configuración de CORS en Laravel',
          'Archivo: config/cors.php',
          'Debe permitir: http://localhost:5173',
        ],
        color: 'red',
        canRetry: true,
      }
    }

    // Error genérico
    return {
      icon: AlertCircle,
      title: 'Error inesperado',
      message: error?.message || 'Ocurrió un error desconocido',
      details: [
        'Tipo: ' + (error?.code || 'desconocido'),
        'Endpoint: ' + (error?.config?.url || 'desconocido'),
      ],
      color: 'red',
      canRetry: true,
    }
  }

  const info = getErrorInfo()
  const Icon = info.icon

  const colorClasses = {
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      title: 'text-red-900 dark:text-red-200',
      text: 'text-red-800 dark:text-red-300',
      button: 'bg-red-600 hover:bg-red-700 text-white',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      icon: 'text-amber-600 dark:text-amber-400',
      title: 'text-amber-900 dark:text-amber-200',
      text: 'text-amber-800 dark:text-amber-300',
      button: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
  }

  const colors = colorClasses[info.color]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 space-y-4`}>
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Icon className={`w-8 h-8 ${colors.icon}`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold ${colors.title} mb-1`}>
                {info.title}
              </h3>
              <p className={`text-sm ${colors.text} font-medium`}>
                {info.message}
              </p>
            </div>
          </div>

          {/* Details */}
          {info.details && info.details.length > 0 && (
            <div className={`pl-12 space-y-1 ${colors.text} text-sm`}>
              {info.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pl-12">
            {info.canRetry && onRetry && (
              <button
                onClick={onRetry}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${colors.button}`}
              >
                <RefreshCw className="w-4 h-4" />
                Reintentar
              </button>
            )}

            {/* Debug Info (solo en desarrollo) */}
            {import.meta.env.DEV && (
              <details className={`text-xs ${colors.text}`}>
                <summary className="cursor-pointer hover:underline">
                  Debug Info
                </summary>
                <pre className="mt-2 p-2 bg-black/10 dark:bg-white/10 rounded overflow-auto max-h-40">
                  {JSON.stringify(
                    {
                      message: error?.message,
                      code: error?.code,
                      status: error?.response?.status,
                      url: error?.config?.url,
                      method: error?.config?.method,
                    },
                    null,
                    2
                  )}
                </pre>
              </details>
            )}
          </div>
        </div>

        {/* Context Info */}
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Error al cargar {context}
        </div>
      </div>
    </div>
  )
}
