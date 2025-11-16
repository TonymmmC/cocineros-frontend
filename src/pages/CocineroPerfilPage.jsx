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
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { getChefImageUrl, getProductImageUrl } from '../utils/images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => onNavigate('cocineros')}
            variant="ghost"
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a cocineros
          </Button>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error al cargar el perfil: {error.message}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const fotoUrl = getChefImageUrl(cocinero?.foto_perfil);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Botón Volver */}
        <Button
          onClick={() => onNavigate('cocineros')}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a cocineros
        </Button>

        {/* Perfil del Cocinero */}
        {cocinero && (
          <Card className="overflow-hidden mb-8">
            {/* Header con imagen de fondo */}
            <div className="relative h-64 bg-gradient-to-br from-primary/20 to-primary/5">
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
                  <Badge className="bg-green-500 hover:bg-green-600 text-sm">
                    Disponible ahora
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-sm">
                    No disponible
                  </Badge>
                )}
              </div>
            </div>

            {/* Información del Cocinero */}
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">
                    {cocinero.nombre_completo || cocinero.user?.name || 'Cocinero'}
                  </h1>

                  {cocinero.especialidades && cocinero.especialidades.length > 0 && (
                    <p className="text-lg text-primary font-medium mb-4">
                      {Array.isArray(cocinero.especialidades)
                        ? cocinero.especialidades.join(', ')
                        : cocinero.especialidades}
                    </p>
                  )}

                  {cocinero.bio && (
                    <p className="text-muted-foreground mb-6">
                      {cocinero.bio}
                    </p>
                  )}

                  {/* Información de contacto */}
                  <div className="space-y-3 mb-6">
                    {cocinero.user?.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <span>{cocinero.user.email}</span>
                      </div>
                    )}

                    {cocinero.user?.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <span>{cocinero.user.phone}</span>
                      </div>
                    )}

                    {cocinero.direccion && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{cocinero.direccion}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats Card */}
                <Card className="md:w-64 bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold uppercase text-muted-foreground">
                      Estadísticas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cocinero.calificacion_promedio && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <span className="text-muted-foreground">Calificación</span>
                        </div>
                        <span className="text-xl font-bold">
                          {parseFloat(cocinero.calificacion_promedio).toFixed(1)}
                        </span>
                      </div>
                    )}

                    {cocinero.total_pedidos !== undefined && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary" />
                          <span className="text-muted-foreground">Pedidos</span>
                        </div>
                        <span className="text-xl font-bold">
                          {cocinero.total_pedidos}
                        </span>
                      </div>
                    )}

                    {productos && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-5 h-5 text-primary" />
                          <span className="text-muted-foreground">Productos</span>
                        </div>
                        <span className="text-xl font-bold">
                          {productos.length}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Productos del Cocinero */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Productos Disponibles
          </h2>

          {productos && productos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.map((producto) => {
                const imagenUrl = getProductImageUrl(producto.primera_imagen);

                return (
                  <Card
                    key={producto.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Imagen del producto */}
                    <div className="relative h-48 bg-muted">
                      {imagenUrl ? (
                        <img
                          src={imagenUrl}
                          alt={producto.nombre}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg class="w-16 h-16 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}

                      {/* Badge de disponibilidad */}
                      {!producto.disponible && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="destructive">
                            No disponible
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Información del producto */}
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold mb-2">
                        {producto.nombre}
                      </h3>

                      {producto.descripcion && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {producto.descripcion}
                        </p>
                      )}

                      {/* Categoría */}
                      {producto.categoria && (
                        <Badge variant="secondary" className="mb-3">
                          {producto.categoria.nombre}
                        </Badge>
                      )}

                      {/* Precio */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-2xl font-bold text-primary">
                          Bs. {parseFloat(producto.precio).toFixed(2)}
                        </span>

                        {producto.disponible && (
                          <Button>
                            Pedir
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Este cocinero no tiene productos disponibles en este momento
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
