import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge"
import { Loader2, Phone, MapPin, Clock } from "lucide-react"

const nextStates = {
  pendiente: ["confirmado", "cancelado"],
  confirmado: ["preparando", "cancelado"],
  preparando: ["listo", "cancelado"],
  listo: ["en_camino", "entregado", "cancelado"],
  en_camino: ["entregado", "cancelado"]
}

const stateLabels = {
  confirmado: "Confirmar",
  preparando: "Preparando",
  listo: "Listo",
  en_camino: "En Camino",
  entregado: "Entregar",
  cancelado: "Cancelar"
}

export default function ChefDashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, isCocinero } = useAuth()
  const { toast } = useToast()

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/pedidos-recibidos`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        }
      )

      if (!response.ok) {
        throw new Error('Error al cargar pedidos')
      }

      const data = await response.json()
      setOrders(data.data || [])
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los pedidos",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const changeStatus = async (orderId, newStatus, codigoPedido) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/pedidos/${orderId}/estado`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ estado: newStatus })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al cambiar estado")
      }

      toast({
        title: "Estado actualizado",
        description: `Pedido ${codigoPedido} ahora está ${newStatus}`
      })

      fetchOrders()
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    if (token && isCocinero) {
      fetchOrders()
      // Refrescar cada 30 segundos
      const interval = setInterval(fetchOrders, 30000)
      return () => clearInterval(interval)
    }
  }, [token, isCocinero])

  if (!token) {
    return (
      <div className="container mx-auto py-6">
        <p className="text-center text-muted-foreground">
          Debes iniciar sesión para ver el panel de cocinero
        </p>
      </div>
    )
  }

  if (!isCocinero) {
    return (
      <div className="container mx-auto py-6">
        <p className="text-center text-muted-foreground">
          Esta sección es solo para cocineros
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Cocinero</h1>
        <Button onClick={fetchOrders} variant="outline" size="sm">
          Actualizar
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No tienes pedidos pendientes
        </p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card
              key={order.id}
              className={order.esta_activo ? "border-orange-500 border-2" : ""}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{order.codigo_pedido}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleString('es-BO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {order.esta_activo && (
                      <Badge variant="default" className="bg-orange-500">
                        Activo
                      </Badge>
                    )}
                    <OrderStatusBadge status={order.estado} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Cliente:</p>
                      <p>{order.cliente?.nombre_completo || 'N/A'}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.cliente?.user?.phone || 'Sin teléfono'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Dirección:</p>
                      <p className="text-sm">{order.direccion?.direccion_completa || 'N/A'}</p>
                      {order.direccion?.referencia && (
                        <p className="text-xs text-muted-foreground">
                          Ref: {order.direccion.referencia}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">Total:</p>
                    <p className="text-2xl font-bold">Bs. {Number(order.total).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.metodo_pago}
                    </p>
                    {order.tiempo_estimado_min && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{order.tiempo_estimado_min} min</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-medium mb-2">Productos:</p>
                  <div className="bg-muted p-3 rounded">
                    {order.detalles?.map((d) => (
                      <div key={d.id} className="flex justify-between py-2 border-b last:border-0">
                        <div className="flex-1">
                          <span className="font-medium">
                            {d.cantidad}x {d.producto?.nombre || 'Producto'}
                          </span>
                          {d.notas && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Nota: {d.notas}
                            </p>
                          )}
                        </div>
                        <span className="font-medium ml-4">
                          Bs. {Number(d.subtotal).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.notas_cliente && (
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <p className="font-medium">Nota del cliente:</p>
                    <p>{order.notas_cliente}</p>
                  </div>
                )}

                {order.esta_activo && nextStates[order.estado] && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {nextStates[order.estado].map((status) => (
                      <Button
                        key={status}
                        variant={status === "cancelado" ? "destructive" : "default"}
                        onClick={() => changeStatus(order.id, status, order.codigo_pedido)}
                      >
                        {status === "cancelado" ? "Cancelar" : `Marcar como ${stateLabels[status]}`}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
