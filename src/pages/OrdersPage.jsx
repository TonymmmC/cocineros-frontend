import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("")
  const { token } = useAuth()
  const { toast } = useToast()

  const fetchOrders = async (estado = "") => {
    setLoading(true)
    try {
      const url = estado
        ? `${import.meta.env.VITE_API_URL}/mis-pedidos?estado=${estado}`
        : `${import.meta.env.VITE_API_URL}/mis-pedidos`

      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })

      if (!response.ok) {
        throw new Error('Error al cargar pedidos')
      }

      const data = await response.json()
      setOrders(data.data || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los pedidos",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    if (!confirm('¿Estás seguro de cancelar este pedido?')) return

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/pedidos/${orderId}/cancelar`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            motivo: "Cancelado por el cliente"
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al cancelar pedido")
      }

      toast({
        title: "Pedido cancelado",
        description: "El pedido ha sido cancelado exitosamente"
      })

      fetchOrders(filter)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders(filter)
    }
  }, [filter, token])

  if (!token) {
    return (
      <div className="container mx-auto py-6">
        <p className="text-center text-muted-foreground">
          Debes iniciar sesión para ver tus pedidos
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Mis Pedidos</h1>

      <Tabs defaultValue="todos" onValueChange={(value) => setFilter(value === "todos" ? "" : value)}>
        <TabsList className="mb-6">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="pendientes">Activos</TabsTrigger>
          <TabsTrigger value="completados">Completados</TabsTrigger>
          <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
        </TabsList>

        <TabsContent value={filter || "todos"}>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No tienes pedidos en esta categoría
            </p>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle className="text-lg">{order.codigo_pedido}</CardTitle>
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
                    <OrderStatusBadge status={order.estado} />
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="font-medium">Cocinero:</p>
                        <p>{order.cocinero?.nombre_completo || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total:</p>
                        <p className="text-lg font-bold">Bs. {Number(order.total).toFixed(2)}</p>
                      </div>
                    </div>

                    {order.detalles && order.detalles.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium mb-2">Productos:</p>
                        <div className="bg-muted p-3 rounded space-y-1">
                          {order.detalles.map((detalle) => (
                            <div key={detalle.id} className="flex justify-between text-sm">
                              <span>
                                {detalle.cantidad}x {detalle.producto?.nombre || 'Producto'}
                              </span>
                              <span className="font-medium">
                                Bs. {Number(detalle.subtotal).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {order.notas_cliente && (
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <p className="text-sm font-medium">Tus notas:</p>
                        <p className="text-sm">{order.notas_cliente}</p>
                      </div>
                    )}

                    {order.puede_cancelar && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-4"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancelar Pedido
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
