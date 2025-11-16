import { useQuery } from '@tanstack/react-query'
import { Clock, Leaf, AlertCircle } from 'lucide-react'
import { productoService } from '../api/services'
import Loading from '../components/Loading'
import { getProductImageUrl } from '../utils/images'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

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
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error al cargar productos</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Reintentar
          </Button>
        </Alert>
      </div>
    )
  }

  const productos = data?.data || []

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Productos Disponibles
          </h1>
          <p className="text-muted-foreground text-lg">
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-4">
              <Clock className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No hay productos disponibles
            </h3>
            <p className="text-muted-foreground">
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
    <Card className="cursor-pointer transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-4">
        {/* Image con padding y bordes redondeados */}
        <div className="relative mb-4">
          <div className="w-full h-48 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center rounded-lg overflow-hidden">
            {imagenUrl ? (
              <img
                src={imagenUrl}
                alt={producto.nombre}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<svg class="w-16 h-16 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
                }}
              />
            ) : (
              <Clock className="w-16 h-16 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1">
              {producto.nombre}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {producto.descripcion}
            </p>
          </div>

          {/* Price and Time */}
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-2xl font-bold text-primary">
              Bs. {producto.precio}
            </span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{producto.tiempo_preparacion_min} min</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {producto.categoria?.nombre && (
              <Badge variant="default">
                {producto.categoria.nombre}
              </Badge>
            )}

            {producto.es_vegetariano && (
              <Badge variant="secondary" className="gap-1">
                <Leaf className="w-3 h-3" />
                Vegetariano
              </Badge>
            )}

            {producto.es_vegano && (
              <Badge variant="secondary" className="gap-1">
                <Leaf className="w-3 h-3" />
                Vegano
              </Badge>
            )}

            {producto.es_sin_gluten && (
              <Badge variant="outline">
                Sin Gluten
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductosPage
