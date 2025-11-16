# Sistema de Gestión de Pedidos - Cocineros Frontend

## Descripción

Sistema completo de pedidos implementado con **shadcn/ui** que permite a los clientes crear pedidos y a los cocineros gestionarlos en tiempo real.

## Componentes Implementados

### 1. Carrito de Compras (CartSheet)
- **Ubicación**: `src/components/cart/CartSheet.jsx`
- **Características**:
  - Sheet lateral que muestra items del carrito
  - Control de cantidad (+/-)
  - Eliminación de productos
  - Cálculo automático de totales
  - Persistencia en localStorage con Zustand
  - Restricción: solo productos del mismo cocinero

### 2. Checkout Dialog (CheckoutDialog)
- **Ubicación**: `src/components/cart/CheckoutDialog.jsx`
- **Características**:
  - Selección de dirección de entrega
  - Selección de método de pago (efectivo, tarjeta, transferencia, QR)
  - Campo para notas al cocinero
  - Configuración de costo de entrega
  - Resumen de totales (subtotal + comisión 15% + entrega)
  - Notificaciones con toast

### 3. Historial de Pedidos (OrdersPage)
- **Ubicación**: `src/pages/OrdersPage.jsx`
- **Ruta**: `/mis-pedidos`
- **Características**:
  - Tabs para filtrar: Todos, Activos, Completados, Cancelados
  - Vista de detalles de cada pedido
  - Badges de estado con colores
  - Opción de cancelar pedidos (si aplica)
  - Auto-refresh cada 30 segundos

### 4. Panel del Cocinero (ChefDashboard)
- **Ubicación**: `src/pages/ChefDashboard.jsx`
- **Ruta**: `/chef-dashboard`
- **Características**:
  - Vista de todos los pedidos recibidos
  - Información del cliente (nombre, teléfono)
  - Dirección de entrega con referencia
  - Detalle de productos y notas
  - Cambio de estado del pedido
  - Estados disponibles: pendiente → confirmado → preparando → listo → en_camino → entregado
  - Indicador de pedidos activos
  - Auto-refresh cada 30 segundos

### 5. Estados del Pedido (OrderStatusBadge)
- **Ubicación**: `src/components/orders/OrderStatusBadge.jsx`
- **Estados con colores**:
  - Pendiente: gris
  - Confirmado: azul
  - Preparando: amarillo
  - Listo: morado
  - En Camino: índigo
  - Entregado: verde
  - Cancelado: rojo

## Hooks Implementados

### useCart
- **Ubicación**: `src/hooks/useCart.js`
- **Funciones**:
  - `addItem(item)`: Agregar producto al carrito
  - `removeItem(productoId)`: Eliminar producto
  - `updateQuantity(productoId, cantidad)`: Actualizar cantidad
  - `updateNotes(productoId, notas)`: Agregar notas al producto
  - `clearCart()`: Vaciar carrito
  - `getTotal()`: Calcular total

### useAuth
- **Ubicación**: `src/hooks/useAuth.js`
- **Retorna**:
  - `token`: Token de autenticación
  - `user`: Datos del usuario
  - `isAuthenticated`: Estado de autenticación
  - `isCliente`: Si es cliente
  - `isCocinero`: Si es cocinero

## Integración con Backend

### Endpoints Utilizados

#### 1. POST /v1/pedidos
Crear nuevo pedido

```javascript
{
  "cocinero_id": 1,
  "direccion_id": 1,
  "productos": [
    {
      "producto_id": 1,
      "cantidad": 2,
      "notas": "Sin cebolla"
    }
  ],
  "notas_cliente": "Entregar en portería",
  "metodo_pago": "efectivo",
  "costo_entrega": 10
}
```

#### 2. GET /v1/mis-pedidos
Obtener pedidos del cliente
- Query params: `?estado=pendientes|completados|cancelados`

#### 3. GET /v1/pedidos-recibidos
Obtener pedidos recibidos (solo cocineros)

#### 4. PATCH /v1/pedidos/{id}/estado
Cambiar estado del pedido (solo cocineros)

```javascript
{
  "estado": "confirmado"
}
```

#### 5. PATCH /v1/pedidos/{id}/cancelar
Cancelar pedido (solo clientes)

```javascript
{
  "motivo": "Cambié de opinión"
}
```

## Componentes shadcn/ui Creados

Los siguientes componentes fueron implementados manualmente:
- ✅ Sheet - Para el carrito lateral
- ✅ Dialog - Para modales de checkout
- ✅ Select - Para selección de opciones
- ✅ Textarea - Para notas
- ✅ Separator - Para separadores visuales
- ✅ Tabs - Para filtros de pedidos
- ✅ Toast - Para notificaciones
- ✅ Badge - Para estados
- ✅ Card - Para tarjetas de pedidos
- ✅ Button - Para acciones
- ✅ Input - Para campos de texto
- ✅ Label - Para etiquetas

## Navegación

El sistema agrega automáticamente las siguientes rutas al navbar según el rol del usuario:

### Para Clientes (isCliente = true)
- **Icono de carrito**: Visible en el navbar (desktop y mobile)
- **"Mis Pedidos"**: Acceso al historial de pedidos

### Para Cocineros (isCocinero = true)
- **"Panel Cocinero"**: Acceso al dashboard de gestión

## Autenticación

Para probar el sistema, simula la autenticación guardando en localStorage:

```javascript
// Cliente
localStorage.setItem('auth_token', 'tu_token_aqui')
localStorage.setItem('auth_user', JSON.stringify({
  id: 1,
  nombre: 'Juan Cliente',
  rol: 'cliente'
}))

// Cocinero
localStorage.setItem('auth_token', 'tu_token_aqui')
localStorage.setItem('auth_user', JSON.stringify({
  id: 2,
  nombre: 'María Cocinera',
  rol: 'cocinero'
}))
```

## Flujo Completo de Pedido

### Como Cliente:
1. Navegar por productos/cocineros
2. Agregar productos al carrito (mismo cocinero)
3. Abrir el carrito desde el icono en navbar
4. Revisar productos y cantidades
5. Click en "Proceder al Pago"
6. Seleccionar dirección, método de pago, agregar notas
7. Confirmar pedido
8. Ver pedido en "Mis Pedidos"
9. Posibilidad de cancelar si está permitido

### Como Cocinero:
1. Acceder a "Panel Cocinero"
2. Ver pedidos recibidos en tiempo real
3. Ver detalles: cliente, productos, dirección, notas
4. Cambiar estado del pedido según progreso:
   - Confirmar pedido
   - Marcar como preparando
   - Marcar como listo
   - Marcar en camino
   - Confirmar entrega
5. Panel se actualiza automáticamente cada 30 segundos

## Variables de Entorno

Asegúrate de tener configurado:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

## Testing

### Usuarios de Prueba
- **Cliente**: juan@cliente.com / password
- **Cocinero**: maria@cocineros.com / password

### Escenarios de Prueba

1. **Carrito básico**:
   - Agregar productos
   - Modificar cantidades
   - Eliminar items
   - Verificar persistencia

2. **Restricción de cocinero**:
   - Intentar agregar productos de diferentes cocineros
   - Debe mostrar error

3. **Crear pedido**:
   - Completar checkout
   - Verificar notificación de éxito
   - Verificar que el carrito se vacía

4. **Historial**:
   - Ver pedidos en diferentes estados
   - Filtrar por tabs
   - Cancelar pedido si aplica

5. **Panel cocinero**:
   - Ver pedidos nuevos
   - Cambiar estados
   - Verificar que el cliente ve cambios en tiempo real

## Características de UX

- ✅ **Responsive**: Funciona en desktop y mobile
- ✅ **Dark mode**: Compatible con tema oscuro
- ✅ **Loading states**: Spinners durante carga
- ✅ **Error handling**: Mensajes de error claros
- ✅ **Toast notifications**: Feedback visual de acciones
- ✅ **Auto-refresh**: Actualización automática de pedidos
- ✅ **Persistencia**: Carrito guardado en localStorage
- ✅ **Validaciones**: Campos requeridos, restricciones de negocio

## Próximas Mejoras

- [ ] Agregar botón "Agregar al carrito" en ProductosPage
- [ ] Agregar botón "Agregar al carrito" en CocineroPerfilPage
- [ ] WebSocket para actualizaciones en tiempo real
- [ ] Notificaciones push para cocineros
- [ ] Timeline visual del estado del pedido
- [ ] Estimación de tiempo de entrega dinámica
- [ ] Historial de chat cliente-cocinero
- [ ] Calificación del pedido después de entrega
- [ ] Filtros avanzados en historial
- [ ] Exportar pedidos a PDF

## Estructura de Archivos

```
src/
├── components/
│   ├── cart/
│   │   ├── CartSheet.jsx           ✅
│   │   └── CheckoutDialog.jsx      ✅
│   ├── orders/
│   │   └── OrderStatusBadge.jsx    ✅
│   └── ui/                          ✅ (shadcn components)
├── hooks/
│   ├── useCart.js                   ✅
│   └── useAuth.js                   ✅
├── pages/
│   ├── OrdersPage.jsx               ✅
│   └── ChefDashboard.jsx            ✅
└── App.jsx                          ✅ (rutas integradas)
```

## Soporte

Para reportar bugs o solicitar features, contacta al equipo de desarrollo.

---

**Implementado con ❤️ usando shadcn/ui y Zustand**
