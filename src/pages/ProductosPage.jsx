import { useQuery } from '@tanstack/react-query'
import { productoService } from '../api/services'
import Loading from '../components/Loading'

function ProductosPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['productos'],
    queryFn: () => productoService.getAll(),
  })

  if (isLoading) {
    return <Loading message="Cargando productos deliciosos..." />
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto card bg-red-50 border-2 border-red-200">
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            Error al cargar productos
          </h3>
          <p className="text-red-600">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 btn-primary"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const productos = data?.data || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Productos Disponibles</h1>
        <p className="text-gray-600">
          {productos.length} productos encontrados
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="card hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{producto.nombre}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{producto.descripcion}</p>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-primary-600">
                Bs. {producto.precio}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <span>⏱️</span>
                {producto.tiempo_preparacion_min} min
              </span>
            </div>
            
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded">
                {producto.categoria?.nombre || 'Sin categoría'}
              </span>
              {producto.es_vegetariano && (
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                  🌱 Vegetariano
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {productos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No hay productos disponibles</p>
        </div>
      )}
    </div>
  )
}

export default ProductosPage