import { useQuery } from '@tanstack/react-query';
import { cocineroService } from '../api/services';
import Loading from '../components/Loading';
import {
  Star,
  MapPin,
  Clock,
  ArrowLeft,
  Phone,
  Mail,
  ShoppingBag
} from 'lucide-react';
import { getChefImageUrl, getProductImageUrl } from '../utils/images';

export default function CocineroPerfilPage({ cocineroId, onNavigate }) {
  const { data: cocineroResponse, isLoading: loadingCocinero, error: errorCocinero } = useQuery({
    queryKey: ['cocinero', cocineroId],
    queryFn: () => cocineroService.getById(cocineroId),
    enabled: !!cocineroId,
  });

  const { data: productosResponse, isLoading: loadingProductos, error: errorProductos } = useQuery({
    queryKey: ['cocinero-productos', cocineroId],
    queryFn: () => cocineroService.getProductos(cocineroId),
    enabled: !!cocineroId,
  });

  const cocinero = cocineroResponse?.data || cocineroResponse;
  const productos = productosResponse?.data || [];

  const isLoading = loadingCocinero || loadingProductos;
  const error = errorCocinero || errorProductos;

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('cocineros')}
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a cocineros
          </button>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">
              Error al cargar el perfil: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const fotoUrl = getChefImageUrl(cocinero?.foto_perfil);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón Volver */}
        <button
          onClick={() => onNavigate('cocineros')}
          className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a cocineros
        </button>

        {/* Perfil del Cocinero */}
        {cocinero && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            {/* Header con imagen de fondo */}
            <div className="relative h-64 bg-gradient-to-br from-amber-500 to-orange-600">
              <img
                src={fotoUrl}
                alt={cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = getChefImageUrl(null);
                }}
              />

              {/* Badge de disponibilidad */}
              <div className="absolute top-4 right-4">
                {cocinero.esta_disponible ? (
                  <span className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                    Disponible ahora
                  </span>
                ) : (
                  <span className="bg-gray-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                    No disponible
                  </span>
                )}
              </div>
            </div>

            {/* Información del Cocinero */}
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                  </h1>

                  {cocinero.especialidades && cocinero.especialidades.length > 0 && (
                    <p className="text-lg text-amber-600 dark:text-amber-400 font-medium mb-4">
                      {Array.isArray(cocinero.especialidades)
                        ? cocinero.especialidades.join(', ')
                        : cocinero.especialidades}
                    </p>
                  )}

                  {cocinero.bio && (
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {cocinero.bio}
                    </p>
                  )}

                  {/* Información de contacto */}
                  <div className="space-y-3 mb-6">
                    {cocinero.user?.email && (
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Mail className="w-5 h-5 text-amber-500" />
                        <span>{cocinero.user.email}</span>
                      </div>
                    )}

                    {cocinero.user?.phone && (
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Phone className="w-5 h-5 text-amber-500" />
                        <span>{cocinero.user.phone}</span>
                      </div>
                    )}

                    {cocinero.direccion && (
                      <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <MapPin className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{cocinero.direccion}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 md:w-64">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-4">
                    Estadísticas
                  </h3>
                  <div className="space-y-4">
                    {cocinero.calificacion_promedio && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <span className="text-gray-600 dark:text-gray-400">Calificación</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {parseFloat(cocinero.calificacion_promedio).toFixed(1)}
                        </span>
                      </div>
                    )}

                    {cocinero.total_pedidos !== undefined && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-amber-500" />
                          <span className="text-gray-600 dark:text-gray-400">Pedidos</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {cocinero.total_pedidos}
                        </span>
                      </div>
                    )}

                    {productos && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-5 h-5 text-amber-500" />
                          <span className="text-gray-600 dark:text-gray-400">Productos</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {productos.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Productos del Cocinero */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Productos Disponibles
          </h2>

          {productos && productos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.map((producto) => {
                const imagenUrl = getProductImageUrl(producto.primera_imagen);

                return (
                  <div
                    key={producto.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Imagen del producto */}
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                      {imagenUrl ? (
                        <img
                          src={imagenUrl}
                          alt={producto.nombre}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg class="w-16 h-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-16 h-16 text-gray-400" />
                        </div>
                      )}

                      {/* Badge de disponibilidad */}
                      {!producto.disponible && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                            No disponible
                          </span>
                        </div>
                      )}
                    </div>

                  {/* Información del producto */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {producto.nombre}
                    </h3>

                    {producto.descripcion && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {producto.descripcion}
                      </p>
                    )}

                    {/* Categoría */}
                    {producto.categoria && (
                      <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                        {producto.categoria.nombre}
                      </span>
                    )}

                    {/* Precio */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        Bs. {parseFloat(producto.precio).toFixed(2)}
                      </span>

                      {producto.disponible && (
                        <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                          Pedir
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Este cocinero no tiene productos disponibles en este momento
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
