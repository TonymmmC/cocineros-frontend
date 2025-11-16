import { useQuery } from '@tanstack/react-query';
import { cocineroService } from '../api/services';
import Loading from '../components/Loading';
import DebugPanel from '../components/DebugPanel';
import { ChefHat, Star, MapPin, Clock, AlertCircle, TrendingUp } from 'lucide-react';
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
                  className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-border/50"
                >
                  {/* Imagen con overlay mejorado */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                    <img
                      src={fotoUrl}
                      alt={cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = getChefImageUrl(null);
                      }}
                    />

                    {/* Badge de disponibilidad mejorado */}
                    <div className="absolute top-4 right-4 z-20">
                      {cocinero.esta_disponible ? (
                        <Badge className="bg-green-500 hover:bg-green-600 shadow-lg backdrop-blur-sm">
                          <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-100"></span>
                          </span>
                          Disponible
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="shadow-lg backdrop-blur-sm bg-black/40 text-white">
                          No disponible
                        </Badge>
                      )}
                    </div>

                    {/* Stats overlay */}
                    {cocinero.calificacion_promedio && (
                      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-bold text-lg">
                          {parseFloat(cocinero.calificacion_promedio).toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content mejorado */}
                  <CardHeader className="space-y-3">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                    </CardTitle>
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
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Bio */}
                    {cocinero.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {cocinero.bio}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      {cocinero.total_pedidos > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="font-medium">{cocinero.total_pedidos} pedidos</span>
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

                    {/* CTA */}
                    <div className="pt-2">
                      <div className="w-full text-center py-2.5 px-4 bg-primary/5 hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-300 font-medium text-sm group-hover:bg-primary group-hover:text-primary-foreground">
                        Ver perfil completo →
                      </div>
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
