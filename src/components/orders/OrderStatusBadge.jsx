import { Badge } from "@/components/ui/badge"

const statusConfig = {
  pendiente: { label: "Pendiente", variant: "secondary", className: "" },
  confirmado: { label: "Confirmado", variant: "default", className: "bg-blue-500" },
  preparando: { label: "Preparando", variant: "default", className: "bg-yellow-500" },
  listo: { label: "Listo", variant: "default", className: "bg-purple-500" },
  en_camino: { label: "En Camino", variant: "default", className: "bg-indigo-500" },
  entregado: { label: "Entregado", variant: "default", className: "bg-green-500" },
  cancelado: { label: "Cancelado", variant: "destructive", className: "" }
}

export function OrderStatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.pendiente

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  )
}
