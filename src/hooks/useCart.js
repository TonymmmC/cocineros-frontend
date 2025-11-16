import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      cocineroId: null,

      addItem: (item) => {
        const { items, cocineroId } = get()

        // Verificar que todos los productos sean del mismo cocinero
        if (cocineroId && item.producto.cocinero_id !== cocineroId) {
          throw new Error('Solo puedes agregar productos del mismo cocinero')
        }

        const existingIndex = items.findIndex(i => i.producto_id === item.producto_id)

        if (existingIndex >= 0) {
          const newItems = [...items]
          newItems[existingIndex].cantidad += item.cantidad
          set({ items: newItems })
        } else {
          set({
            items: [...items, item],
            cocineroId: item.producto.cocinero_id
          })
        }
      },

      removeItem: (productoId) => {
        const newItems = get().items.filter(i => i.producto_id !== productoId)
        set({
          items: newItems,
          cocineroId: newItems.length > 0 ? get().cocineroId : null
        })
      },

      updateQuantity: (productoId, cantidad) => {
        set({
          items: get().items.map(item =>
            item.producto_id === productoId ? { ...item, cantidad } : item
          )
        })
      },

      updateNotes: (productoId, notas) => {
        set({
          items: get().items.map(item =>
            item.producto_id === productoId ? { ...item, notas } : item
          )
        })
      },

      clearCart: () => set({ items: [], cocineroId: null }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.producto.precio * item.cantidad,
          0
        )
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items, cocineroId: state.cocineroId })
    }
  )
)
