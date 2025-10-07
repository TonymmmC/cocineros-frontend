import { useState } from 'react'
import { authService } from '../api/services'
import Button from '../components/Button'

function ApiTestPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const testLogin = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await authService.login({
        email: 'admin@cocineros.com',
        password: 'password'
      })
      setResult(response)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Test de Conexión API
          </h1>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Backend URL:
              </p>
              <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm">
                {import.meta.env.VITE_API_URL || 'No configurado'}
              </code>
            </div>

            <Button
              onClick={testLogin}
              disabled={loading}
              variant="primary"
            >
              {loading ? 'Probando...' : 'Probar Login'}
            </Button>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
                  Error:
                </p>
                <pre className="text-xs text-red-600 dark:text-red-300 whitespace-pre-wrap">
                  {error}
                </pre>
              </div>
            )}

            {result && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
                  Éxito - Respuesta del servidor:
                </p>
                <pre className="text-xs text-green-600 dark:text-green-300 whitespace-pre-wrap overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiTestPage

// REFACTOR SUGGESTIONS:
// 1. Agregar más tests (productos, categorías, etc)
// 2. Mostrar headers de la petición
// 3. Agregar botón para copiar el token generado