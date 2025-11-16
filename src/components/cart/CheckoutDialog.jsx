import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"

export function CheckoutDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [metodoPago, setMetodoPago] = useState("")
  const [direccionId, setDireccionId] = useState("")
  const [notasCliente, setNotasCliente] = useState("")
  const [costoEntrega, setCostoEntrega] = useState(10)

  const { items, cocineroId, clearCart, getTotal } = useCart()
  const { token } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!metodoPago || !direccionId) {
      toast({
        title: "Error",
        description: "Selecciona método de pago y dirección",
        variant: "destructive"
      })
      return
    }

    if (!token) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para realizar un pedido",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          cocinero_id: cocineroId,
          direccion_id: parseInt(direccionId),
          productos: items.map(item => ({
            producto_id: item.producto_id,
            cantidad: item.cantidad,
            notas: item.notas || null
          })),
          notas_cliente: notasCliente || null,
          metodo_pago: metodoPago,
          costo_entrega: costoEntrega
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al crear pedido")
      }

      toast({
        title: "¡Pedido creado!",
        description: `Código: ${data.data.codigo_pedido}. Total: Bs. ${data.data.total}`,
      })

      clearCart()
      setOpen(false)
      setMetodoPago("")
      setDireccionId("")
      setNotasCliente("")
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const subtotal = getTotal()
  const comision = subtotal * 0.15
  const total = subtotal + comision + costoEntrega

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          Proceder al Pago
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Pedido</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Dirección de Entrega</Label>
            <Select value={direccionId} onValueChange={setDireccionId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona dirección" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Casa - Zona Sur</SelectItem>
                <SelectItem value="2">Oficina - Centro</SelectItem>
                <SelectItem value="3">Otra dirección</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Método de Pago</Label>
            <Select value={metodoPago} onValueChange={setMetodoPago}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="efectivo">Efectivo</SelectItem>
                <SelectItem value="tarjeta">Tarjeta</SelectItem>
                <SelectItem value="transferencia">Transferencia</SelectItem>
                <SelectItem value="qr">QR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Costo de Entrega (Bs.)</Label>
            <Input
              type="number"
              value={costoEntrega}
              onChange={(e) => setCostoEntrega(Number(e.target.value))}
              min="0"
              step="0.50"
            />
          </div>

          <div className="space-y-2">
            <Label>Notas para el cocinero (opcional)</Label>
            <Textarea
              placeholder="Ej: Sin cebolla, entregar en portería..."
              value={notasCliente}
              onChange={(e) => setNotasCliente(e.target.value)}
            />
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Bs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Comisión (15%):</span>
              <span>Bs. {comision.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Entrega:</span>
              <span>Bs. {costoEntrega.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>Bs. {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Procesando..." : `Confirmar Pedido - Bs. ${total.toFixed(2)}`}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
