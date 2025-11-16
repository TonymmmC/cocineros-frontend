import { useQuery } from '@tanstack/react-query';
import { cocineroService } from '../api/services';
import Loading from '../components/Loading';
import ErrorDisplay from '../components/ErrorDisplay';
import DebugPanel from '../components/DebugPanel';
import { ChefHat, Star, MapPin, Clock, Award, CheckCircle } from 'lucide-react';
import { getChefImageUrl } from '../utils/images';

export default function CocinerosPage({ onNavigate }) {
  const { data: response, isLoading, error, refetch } = useQuery({
    queryKey: ['cocineros'],
    queryFn: () => cocineroService.getAll({ per_page: 50 }),
  });

  const cocineros = response?.data || [];

  if (isLoading) return <Loading />;

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} context="cocineros" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      {/* Debug Panel - solo visible en desarrollo */}
      <DebugPanel data={{ response, cocineros }} title="Datos de Cocineros" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Nuestros Cocineros
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Descubre los mejores cocineros y sus deliciosos platos
          </p>
        </div>

        {/* Cocineros Grid */}
        {cocineros && cocineros.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cocineros.map((cocinero) => {
              const fotoUrl = getChefImageUrl(cocinero.foto_perfil);

              return (
                <article
                  key={cocinero.id}
                  onClick={() => onNavigate('cocinero-perfil', cocinero.id)}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  {/* Imagen del Cocinero - Contenedor fijo con aspecto ratio */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20">
                    <img
                      src={fotoUrl}
                      alt={cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = getChefImageUrl(null);
                      }}
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Badge de disponibilidad - Mejorado */}
                    <div className="absolute top-3 right-3">
                      {cocinero.esta_disponible ? (
                        <div className="flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Disponible</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-gray-600/90 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                          <Clock className="w-3.5 h-3.5" />
                          <span>No disponible</span>
                        </div>
                      )}
                    </div>

                    {/* Rating Badge - Flotante */}
                    {cocinero.calificacion_promedio > 0 && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {parseFloat(cocinero.calificacion_promedio).toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Información del Cocinero */}
                  <div className="p-5">
                    {/* Nombre y especialidades */}
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                        {cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                      </h3>

                      {cocinero.especialidades && cocinero.especialidades.length > 0 && (
                        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                          <ChefHat className="w-4 h-4 flex-shrink-0" />
                          <p className="text-sm font-medium line-clamp-1">
                            {Array.isArray(cocinero.especialidades)
                              ? cocinero.especialidades.join(' • ')
                              : cocinero.especialidades}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bio */}
                    {cocinero.bio && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                        {cocinero.bio}
                      </p>
                    )}

                    {/* Stats en grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {cocinero.total_pedidos > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Pedidos</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{cocinero.total_pedidos}</p>
                          </div>
                        </div>
                      )}

                      {cocinero.productos_count > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="p-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <ChefHat className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Platos</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{cocinero.productos_count}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Ubicación */}
                    {cocinero.direccion && (
                      <div className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg mb-4">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{cocinero.direccion}</span>
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between text-sm font-semibold text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                        <span>Ver menú completo</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No hay cocineros disponibles en este momento
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
