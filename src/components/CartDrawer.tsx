import { useEffect } from 'react'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '@/stores/cartStore'
import { useUIStore } from '@/stores/uiStore'

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore()
  const { items, updateQuantity, removeItem, deliveryCity, setDeliveryCity, getSubtotal, getTotal, clearCart } = useCartStore()

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isCartOpen])

  const cities = [
    { name: 'Lima' as const, cost: 10 },
    { name: 'Canete' as const, cost: 15 },
    { name: 'Chincha' as const, cost: 18 },
    { name: 'Ica' as const, cost: 20 },
  ]

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[40] bg-black/60 transition-opacity duration-200"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-[420px] flex-col bg-[#0A0A0A] transition-transform duration-300 ease-out"
        style={{ transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-medium text-white">Tu Carrito</h3>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#7C9A6B] px-2 text-xs font-semibold text-white">
              {items.length}
            </span>
          </div>
          <button onClick={closeCart} className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6">
            <ShoppingBag className="h-12 w-12 text-white/30" />
            <p className="mt-4 text-lg text-white">Tu carrito esta vacio</p>
            <p className="mt-2 text-sm text-white/50">Agrega productos para comenzar tu pedido</p>
            <Link
              to="/catalogo"
              onClick={closeCart}
              className="mt-6 rounded-xl border border-[#7C9A6B] px-6 py-3 text-sm font-medium text-[#7C9A6B] transition-colors hover:bg-[#7C9A6B]/10"
            >
              Ver Catalogo
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4 border-b border-white/10 pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-white/50">{item.flavor}{item.nicotine ? ` · ${item.nicotine}` : ''}</p>
                      <p className="mt-1 font-mono text-sm text-[#7C9A6B]">S/ {item.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-white/40 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded bg-[#1A1A1A] text-white/70 hover:text-white"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded bg-[#1A1A1A] text-white/70 hover:text-white"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Subtotal</span>
                  <span className="text-white">S/ {getSubtotal()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Entrega</span>
                  <select
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value as 'Lima' | 'Canete' | 'Chincha' | 'Ica')}
                    className="rounded-lg bg-[#1A1A1A] px-3 py-1.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#7C9A6B]"
                  >
                    {cities.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} — S/ {c.cost}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3">
                  <span className="text-lg font-medium text-white">Total</span>
                  <span className="font-mono text-xl text-[#7C9A6B]">S/ {getTotal()}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="mt-5 block w-full rounded-xl bg-[#7C9A6B] py-4 text-center text-sm font-medium text-black transition-all hover:bg-[#6B8560]"
              >
                Continuar al Checkout
              </Link>
              <button
                onClick={clearCart}
                className="mt-3 w-full text-center text-xs text-red-400/70 hover:text-red-400"
              >
                Limpiar Carrito
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
