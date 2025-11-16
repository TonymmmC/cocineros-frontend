import { useQuery } from '@tanstack/react-query';
import { cocineroService } from '../api/services';
import Loading from '../components/Loading';
import DebugPanel from '../components/DebugPanel';
import { ChefHat, Star, MapPin, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { getChefImageUrl } from '../utils/images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen py-12 bg-gradient-to-b from-background to-muted/20">
      <DebugPanel data={{ response, cocineros }} title="Datos de Cocineros" />

      <div className="container mx-auto px-4">
        {/* Header mejorado */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Nuestros Cocineros
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubre talento culinario excepcional cerca de ti
          </p>
        </div>

        {/* Grid mejorado */}
        {cocineros && cocineros.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cocineros.map((cocinero) => {
              const fotoUrl = getChefImageUrl(cocinero.foto_perfil);

              return (
                <Card
                  key={cocinero.id}
                  onClick={() => onNavigate('cocinero-perfil', cocinero.id)}
                  className="group cursor-pointer transition-all duration-200 hover:shadow-lg"
                >
                  <CardContent className="p-4">
                    {/* Imagen con padding y bordes redondeados */}
                    <div className="relative mb-4">
                      <img
                        src={fotoUrl}
                        alt={cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = getChefImageUrl(null);
                        }}
                      />

                      {/* Badge de disponibilidad simple */}
                      <div className="absolute top-3 right-3">
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

                      {/* Rating badge */}
                      {cocinero.calificacion_promedio && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold">
                            {parseFloat(cocinero.calificacion_promedio).toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">
                        {cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                      </h3>

                      {cocinero.especialidades && cocinero.especialidades.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(cocinero.especialidades)
                            ? cocinero.especialidades
                            : cocinero.especialidades.split(',')).slice(0, 3).map((esp, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {esp.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {cocinero.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {cocinero.bio}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        {cocinero.total_pedidos > 0 && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span>{cocinero.total_pedidos} pedidos</span>
                          </div>
                        )}

                        {cocinero.direccion && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1 max-w-[120px]">
                              {cocinero.direccion.split(',')[0]}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      <Button variant="outline" className="w-full mt-2">
                        Ver perfil completo
                      </Button>
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
