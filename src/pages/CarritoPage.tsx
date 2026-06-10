import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Minus, Plus, X, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'

const cities = [
  { name: 'Lima', label: 'Lima' },
  { name: 'Canete', label: 'Cañete' },
  { name: 'Chincha', label: 'Chincha' },
  { name: 'Ica', label: 'Ica' },
  { name: 'Otras ciudades', label: 'Otras ciudades (envío por agencia)' },
]

export default function CarritoPage() {
  const navigate = useNavigate()
  const { items, updateQuantity, removeItem, deliveryCity, setDeliveryCity, getSubtotal, getTotal, clearCart } = useCartStore()
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  return (
    <>
      {/* Header */}
      <div className="bg-[#141414] pt-28 pb-10 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-12">
          <h1 className="font-display text-4xl text-white md:text-5xl">Tu Carrito</h1>
          <p className="mt-2 text-lg text-white/70">{items.length} productos</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <ShoppingBag className="h-20 w-20 text-white/20" />
            <h2 className="mt-6 font-display text-3xl text-white">Tu carrito esta vacio</h2>
            <p className="mt-2 text-lg text-white/50">Agrega productos desde nuestro catalogo para comenzar tu pedido.</p>
            <Link
              to="/catalogo"
              className="mt-6 rounded-xl bg-[#7C9A6B] px-8 py-4 text-sm font-medium text-black transition-all hover:bg-[#6B8560]"
            >
              Ver Catalogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[65%_35%]">
            {/* Items */}
            <div>
              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl bg-[#141414] p-5 md:gap-6 md:p-6"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-24 shrink-0 rounded-xl object-cover md:h-[90px] md:w-[120px]"
                    />
                    <div className="flex flex-1 flex-col justify-between md:flex-row md:items-center md:gap-6">
                      <div className="flex-1">
                        <p className="text-base font-medium text-white md:text-lg">{item.name}</p>
                        <p className="mt-1 text-xs text-white/50 md:text-sm">
                          {item.flavor}{item.nicotine ? ` · ${item.nicotine}` : ''}
                        </p>
                        <p className="mt-1 font-mono text-sm text-[#7C9A6B]">S/ {item.price}</p>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-4 md:mt-0">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A1A1A] text-white/70 hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A1A1A] text-white/70 hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="font-mono text-sm text-white md:text-base">
                            S/ {item.price * item.quantity}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-white/30 transition-colors hover:text-red-400"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/catalogo"
                className="mt-6 inline-flex items-center gap-2 text-sm text-[#7C9A6B] hover:text-[#9AB88A]"
              >
                <ArrowLeft className="h-4 w-4" />
                Seguir comprando
              </Link>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl bg-[#141414] p-6 md:p-8">
                <h3 className="text-xl font-medium text-white">Resumen del Pedido</h3>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-[15px]">
                    <span className="text-white/70">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="text-white">S/ {getSubtotal()}</span>
                  </div>

                  <div className="flex items-center justify-between text-[15px]">
                    <span className="text-white/70">Zona de entrega</span>
                    <select
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value as 'Lima' | 'Canete' | 'Chincha' | 'Ica' | 'Otras ciudades')}
                      className="rounded-lg bg-[#1A1A1A] border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    >
                      {cities.map((c) => (
                        <option key={c.name} value={c.name}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="my-6 h-px bg-white/10" />

                <div className="flex justify-between">
                  <span className="text-xl font-medium text-white">Total</span>
                  <span className="font-mono text-2xl text-[#7C9A6B]">S/ {getTotal()}</span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="mt-6 w-full rounded-xl bg-[#7C9A6B] py-4 text-sm font-medium text-black transition-all hover:bg-[#6B8560]"
                >
                  Continuar al Checkout
                </button>

                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="mt-4 w-full text-center text-xs text-red-400/70 hover:text-red-400"
                >
                  Limpiar Carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clear confirmation modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5">
          <div className="w-full max-w-sm rounded-2xl bg-[#141414] p-6 text-center">
            <h3 className="text-xl font-medium text-white">Vaciar carrito</h3>
            <p className="mt-2 text-sm text-white/60">Estas seguro de eliminar todos los productos?</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 rounded-xl border border-white/10 py-3 text-sm text-white transition-colors hover:bg-white/5"
              >
                Cancelar
              </button>
              <button
                onClick={() => { clearCart(); setShowClearConfirm(false) }}
                className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-medium text-white transition-colors hover:bg-red-600"
              >
                Vaciar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
