import { useQuery } from '@tanstack/react-query';
import { cocineroService } from '../api/services';
import Loading from '../components/Loading';
import DebugPanel from '../components/DebugPanel';
import { ChefHat, Star, MapPin, Clock } from 'lucide-react';
import { getChefImageUrl } from '../utils/images';

export default function CocinerosPage({ onNavigate }) {
  const { data: response, isLoading, error } = useQuery({
    queryKey: ['cocineros'],
    queryFn: () => cocineroService.getAll({ per_page: 50 }),
  });

  const cocineros = response?.data || [];

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">
              Error al cargar los cocineros: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cocineros.map((cocinero) => {
              const fotoUrl = getChefImageUrl(cocinero.foto_perfil);

              return (
                <div
                  key={cocinero.id}
                  onClick={() => onNavigate('cocinero-perfil', cocinero.id)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  {/* Imagen del Cocinero */}
                  <div className="relative h-48 bg-gradient-to-br from-amber-500 to-orange-600 overflow-hidden">
                    <img
                      src={fotoUrl}
                      alt={cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = getChefImageUrl(null);
                      }}
                    />

                  {/* Badge de disponibilidad */}
                  <div className="absolute top-4 right-4">
                    {cocinero.esta_disponible ? (
                      <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        Disponible
                      </span>
                    ) : (
                      <span className="bg-gray-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        No disponible
                      </span>
                    )}
                  </div>
                </div>

                {/* Información del Cocinero */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                  </h3>

                  {cocinero.especialidades && cocinero.especialidades.length > 0 && (
                    <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-3">
                      {Array.isArray(cocinero.especialidades)
                        ? cocinero.especialidades.join(', ')
                        : cocinero.especialidades}
                    </p>
                  )}

                  {cocinero.bio && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {cocinero.bio}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {cocinero.calificacion_promedio && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {parseFloat(cocinero.calificacion_promedio).toFixed(1)}
                        </span>
                      </div>
                    )}

                    {cocinero.total_pedidos > 0 && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{cocinero.total_pedidos} pedidos</span>
                      </div>
                    )}
                  </div>

                  {cocinero.direccion && (
                    <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{cocinero.direccion}</span>
                    </div>
                  )}

                  {/* Ver productos button */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-amber-600 dark:text-amber-400 font-medium text-sm group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                      Ver productos →
                    </span>
                  </div>
                </div>
              </div>
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
