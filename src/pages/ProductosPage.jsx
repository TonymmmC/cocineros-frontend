import { useQuery } from '@tanstack/react-query'
import { Clock, Leaf, ChefHat, Timer, Users, Star, CheckCircle2 } from 'lucide-react'
import { productoService } from '../api/services'
import Loading from '../components/Loading'
import ErrorDisplay from '../components/ErrorDisplay'
import { getProductImageUrl } from '../utils/images'

function ProductosPage() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['productos'],
    queryFn: () => productoService.getAll(),
  })

  if (isLoading) {
    return <Loading message="Cargando productos deliciosos..." />
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} context="productos" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    <article className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
      {/* Imagen del Producto - Contenedor con aspect ratio */}
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10">
        {imagenUrl ? (
          <img
            src={imagenUrl}
            alt={producto.nombre}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg class="w-20 h-20 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ChefHat className="w-20 h-20 text-gray-300 dark:text-gray-600" />
          </div>
        )}

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badge de disponibilidad */}
        {!producto.disponible && (
          <div className="absolute top-3 right-3">
            <div className="bg-red-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              No disponible
            </div>
          </div>
        )}

        {/* Stock Badge */}
        {producto.stock_disponible <= 5 && producto.stock_disponible > 0 && (
          <div className="absolute top-3 left-3">
            <div className="bg-amber-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              ¡Últimas {producto.stock_disponible}!
            </div>
          </div>
        )}
      </div>

      {/* Información del Producto */}
      <div className="p-4">
        {/* Nombre y Categoría */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {producto.nombre}
          </h3>

          {producto.categoria?.nombre && (
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <ChefHat className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{producto.categoria.nombre}</span>
            </div>
          )}
        </div>

        {/* Descripción */}
        {producto.descripcion && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
            {producto.descripcion}
          </p>
        )}

        {/* Stats en grid compacto */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="p-1 bg-blue-50 dark:bg-blue-900/20 rounded">
              <Timer className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <span>{producto.tiempo_preparacion_min} min</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="p-1 bg-purple-50 dark:bg-purple-900/20 rounded">
              <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <span>{producto.porciones} {producto.porciones === 1 ? 'porción' : 'porciones'}</span>
          </div>
        </div>

        {/* Badges especiales */}
        {(producto.es_vegetariano || producto.es_vegano || producto.es_sin_gluten) && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {producto.es_vegetariano && (
              <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium px-2 py-1 rounded-full">
                <Leaf className="w-3 h-3" />
                <span>Vegetariano</span>
              </div>
            )}

            {producto.es_vegano && (
              <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium px-2 py-1 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>Vegano</span>
              </div>
            )}

            {producto.es_sin_gluten && (
              <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-medium px-2 py-1 rounded-full">
                Sin Gluten
              </div>
            )}
          </div>
        )}

        {/* Cocinero info */}
        {producto.cocinero?.nombre && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg mb-3">
            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <ChefHat className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">Chef</p>
              <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{producto.cocinero.nombre}</p>
            </div>
          </div>
        )}

        {/* Precio y CTA */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Precio</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {producto.precio_formateado || `Bs. ${producto.precio}`}
              </p>
            </div>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-md hover:shadow-lg">
              Pedir
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductosPage