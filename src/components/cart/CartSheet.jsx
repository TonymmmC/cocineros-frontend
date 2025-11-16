import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { CheckoutDialog } from "./CheckoutDialog"

export function CartSheet() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Tu Carrito ({items.length} items)</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 py-4 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Tu carrito está vacío
            </p>
          ) : (
            items.map((item) => (
              <div key={item.producto_id} className="flex gap-3 p-3 border rounded-lg">
                <img
                  src={item.producto.primera_imagen || '/placeholder.png'}
                  alt={item.producto.nombre}
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => {
                    e.target.src = '/placeholder.png'
                  }}
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.producto.nombre}</h4>
                  <p className="text-sm text-muted-foreground">
                    Bs. {Number(item.producto.precio).toFixed(2)} c/u
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.producto_id, Math.max(1, item.cantidad - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.cantidad}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.producto_id, item.cantidad + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive ml-auto"
                      onClick={() => removeItem(item.producto_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm font-medium mt-1">
                    Subtotal: Bs. {(Number(item.producto.precio) * item.cantidad).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-3 mt-auto">
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>Bs. {getTotal().toFixed(2)}</span>
            </div>
            <CheckoutDialog />
            <Button variant="outline" onClick={clearCart}>
              Vaciar Carrito
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
