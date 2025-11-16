import { useQuery } from '@tanstack/react-query';
import { cocineroService } from '../api/services';
import Loading from '../components/Loading';
import DebugPanel from '../components/DebugPanel';
import { ChefHat, Star, MapPin, Clock, AlertCircle } from 'lucide-react';
import { getChefImageUrl } from '../utils/images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CocinerosPage({ onNavigate }) {
  const { data: response, isLoading, error } = useQuery({
    queryKey: ['cocineros'],
    queryFn: () => cocineroService.getAll({ per_page: 50 }),
  });

  const cocineros = response?.data || [];

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error al cargar los cocineros: {error.message}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      {/* Debug Panel - solo visible en desarrollo */}
      <DebugPanel data={{ response, cocineros }} title="Datos de Cocineros" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Nuestros Cocineros
          </h1>
          <p className="text-muted-foreground text-lg">
            Descubre los mejores cocineros y sus deliciosos platos
          </p>
        </div>

        {/* Cocineros Grid */}
        {cocineros && cocineros.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cocineros.map((cocinero) => {
              const fotoUrl = getChefImageUrl(cocinero.foto_perfil);

              return (
                <Card
                  key={cocinero.id}
                  onClick={() => onNavigate('cocinero-perfil', cocinero.id)}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  {/* Imagen del Cocinero */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
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
                        <Badge className="bg-green-500 hover:bg-green-600">
                          Disponible
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          No disponible
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Información del Cocinero */}
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                    </CardTitle>
                    {cocinero.especialidades && cocinero.especialidades.length > 0 && (
                      <CardDescription className="font-medium">
                        {Array.isArray(cocinero.especialidades)
                          ? cocinero.especialidades.join(', ')
                          : cocinero.especialidades}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {cocinero.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {cocinero.bio}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      {cocinero.calificacion_promedio && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">
                            {parseFloat(cocinero.calificacion_promedio).toFixed(1)}
                          </span>
                        </div>
                      )}

                      {cocinero.total_pedidos > 0 && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{cocinero.total_pedidos} pedidos</span>
                        </div>
                      )}
                    </div>

                    {cocinero.direccion && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{cocinero.direccion}</span>
                      </div>
                    )}

                    {/* Ver productos link */}
                    <div className="pt-4 border-t">
                      <span className="text-sm font-medium text-primary group-hover:underline">
                        Ver productos →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              No hay cocineros disponibles en este momento
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
