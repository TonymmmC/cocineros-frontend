import { useQuery } from '@tanstack/react-query'
import { Clock, Leaf } from 'lucide-react'
import { productoService } from '../api/services'
import Loading from '../components/Loading'
import { getProductImageUrl } from '../utils/images'

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
        <div className="max-w-md mx-auto bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-lg p-6 border-2 border-red-200 dark:border-red-800">
          <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
            Error al cargar productos
          </h3>
          <p className="text-red-600 dark:text-red-300 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const productos = data?.data || []

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Productos Disponibles
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {productos.length} {productos.length === 1 ? 'producto' : 'productos'} encontrados
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>

        {/* Empty State */}
        {productos.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Clock className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No hay productos disponibles
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Vuelve más tarde para ver nuevos productos
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({ producto }) {
  const imagenUrl = getProductImageUrl(producto.primera_imagen)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-6 group cursor-pointer">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        {imagenUrl ? (
          <img
            src={imagenUrl}
            alt={producto.nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<svg class="w-16 h-16 text-primary-300 dark:text-primary-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
            }}
          />
        ) : (
          <Clock className="w-16 h-16 text-primary-300 dark:text-primary-700" />
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
          {producto.nombre}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {producto.descripcion}
        </p>
        
        {/* Price and Time */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Bs. {producto.precio}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{producto.tiempo_preparacion_min} min</span>
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {producto.categoria?.nombre && (
            <span className="badge-primary text-xs">
              {producto.categoria.nombre}
            </span>
          )}
          
          {producto.es_vegetariano && (
            <span className="badge-success text-xs flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Vegetariano
            </span>
          )}
          
          {producto.es_vegano && (
            <span className="badge-success text-xs flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Vegano
            </span>
          )}
          
          {producto.es_sin_gluten && (
            <span className="badge-warning text-xs">
              Sin Gluten
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductosPage