import { useState, useMemo, useEffect } from 'react'
import { ChevronDown, Eye, X, Plus, Trash2 } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import type { Order, OrderStatus, OrderItem } from '@/types/order'

const statusConfig: Record<OrderStatus, { label: string; className: string; dot: string }> = {
  pendiente: { label: 'Pendiente', className: 'bg-[#D4A853]/20 text-[#D4A853]', dot: 'bg-[#D4A853]' },
  confirmado: { label: 'Confirmado', className: 'bg-blue-500/20 text-blue-400', dot: 'bg-blue-400' },
  en_camino: { label: 'En camino', className: 'bg-[#7C9A6B]/20 text-[#7C9A6B]', dot: 'bg-[#7C9A6B]' },
  entregado: { label: 'Entregado', className: 'bg-green-500/20 text-green-400', dot: 'bg-green-400' },
  cancelado: { label: 'Cancelado', className: 'bg-red-500/20 text-red-400', dot: 'bg-red-400' },
}

const allStatuses: (OrderStatus | 'all')[] = ['all', 'pendiente', 'confirmado', 'en_camino', 'entregado', 'cancelado']

const CITIES = ['Lima', 'Cañete', 'Chincha', 'Ica', 'Otras ciudades']

export default function AdminPedidosPage() {
  const { orders, products, updateOrderStatus, loadOrders, loadProducts, createOrder } = useAdminStore()

  useEffect(() => {
    loadOrders()
    loadProducts()
  }, [loadOrders, loadProducts])

  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // New Order Modal State
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    dni: '',
    phone: '',
    city: 'Lima',
    district: '',
    address: '',
    reference: '',
    paymentMethod: 'Yape',
    comments: '',
    ageConfirmed: false,
    items: [] as OrderItem[],
  })
  const [selectedProductId, setSelectedProductId] = useState('')
  const [productQuantity, setProductQuantity] = useState(1)

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return orders
    return orders.filter((o) => o.status === statusFilter)
  }, [orders, statusFilter])

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length }
    orders.forEach((o) => { counts[o.status] = (counts[o.status] || 0) + 1 })
    return counts
  }, [orders])

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status)
    setOpenDropdown(null)
  }

  // Calculations
  const subtotal = form.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryCost = 0
  const total = subtotal + deliveryCost

  const handleAddProduct = () => {
    const product = products.find(p => p.id === parseInt(selectedProductId))
    if (!product) return
    if (productQuantity < 1) return

    if (productQuantity > product.stock) {
      alert(`Cantidad excede el stock disponible (${product.stock})`)
    }

    const existing = form.items.find(i => i.productId === product.id)
    if (existing) {
      setForm(prev => ({
        ...prev,
        items: prev.items.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + productQuantity } : i)
      }))
    } else {
      setForm(prev => ({
        ...prev,
        items: [...prev.items, {
          productId: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          quantity: productQuantity,
          flavor: product.flavor || '',
          nicotine: product.nicotine ? String(product.nicotine) : undefined,
          image: product.image
        }]
      }))
    }
    
    setSelectedProductId('')
    setProductQuantity(1)
  }

  const removeProduct = (productId: number) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter(i => i.productId !== productId)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.items.length === 0) {
      alert('Debes agregar al menos un producto al pedido')
      return
    }
    
    if (!form.ageConfirmed) {
      alert('Debes confirmar que el cliente es mayor de edad')
      return
    }
    
    const payload = {
      ...form,
      subtotal,
      deliveryCost,
      total
    }
    
    const success = await createOrder(payload)
    if (success) {
      setShowCreateModal(false)
      setForm({
        fullName: '',
        dni: '',
        phone: '',
        city: 'Lima',
        district: '',
        address: '',
        reference: '',
        paymentMethod: 'Yape',
        comments: '',
        ageConfirmed: false,
        items: [],
      })
      // Reload orders to ensure state is fresh
      loadOrders()
    } else {
      alert('Error al crear el pedido. Revisa los datos o tu conexión.')
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-white">Pedidos</h1>
          <p className="mt-1 text-[15px] text-white/50">Gestión de pedidos de clientes</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#7C9A6B] px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-[#6B8560]"
        >
          <Plus className="h-4 w-4" />
          Nuevo Pedido
        </button>
      </div>

      {/* Status filter pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {allStatuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
              statusFilter === status
                ? 'border border-white/20 text-white'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {status !== 'all' && <span className={`h-2 w-2 rounded-full ${statusConfig[status as OrderStatus].dot}`} />}
            {status === 'all' ? 'Todos' : statusConfig[status as OrderStatus].label}
            <span className="text-white/40">({statusCounts[status] || 0})</span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#141414]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1A1A1A]">
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">ID</th>
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">Cliente</th>
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">Ciudad</th>
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">Total</th>
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">Estado</th>
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">Fecha</th>
              <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-white/40">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                <td className="px-5 py-4 font-mono text-white/70">{order.id}</td>
                <td className="px-5 py-4 text-white">{order.customerName}</td>
                <td className="px-5 py-4 text-white/70">{order.city}</td>
                <td className="px-5 py-4 font-mono text-[#7C9A6B]">S/ {order.total}</td>
                <td className="px-5 py-4">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === order.id ? null : order.id)}
                      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${statusConfig[order.status].className}`}
                    >
                      {statusConfig[order.status].label}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    {openDropdown === order.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                        <div className="absolute left-0 top-full z-50 mt-1 w-40 rounded-xl border border-white/10 bg-[#1A1A1A] py-1 shadow-xl">
                          {(Object.keys(statusConfig) as OrderStatus[]).map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(order.id, status)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              <span className={`h-2 w-2 rounded-full ${statusConfig[status].dot}`} />
                              {statusConfig[status].label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-white/50">
                  {order.createdAt.toLocaleDateString('es-PE')}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-white/40">No hay pedidos en esta categoría</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 py-8">
          <div className="max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-2xl bg-[#141414] border border-white/10">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#141414] p-6">
              <div>
                <h3 className="text-xl font-medium text-white">Pedido {selectedOrder.id}</h3>
                <p className="mt-1 text-sm text-white/50">
                  {selectedOrder.createdAt.toLocaleDateString('es-PE', { dateStyle: 'full' })}
                </p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusConfig[selectedOrder.status].className}`}>
                {statusConfig[selectedOrder.status].label}
              </span>

              {/* Customer */}
              <div className="rounded-xl bg-[#1A1A1A] p-5">
                <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Cliente</h4>
                <div className="mt-3 space-y-2 text-sm">
                  <p className="text-white"><span className="text-white/50">Nombre:</span> {selectedOrder.customerName}</p>
                  <p className="text-white"><span className="text-white/50">DNI:</span> {selectedOrder.dni}</p>
                  <p className="text-white"><span className="text-white/50">Celular:</span> {selectedOrder.phone}</p>
                </div>
              </div>

              {/* Delivery */}
              <div className="rounded-xl bg-[#1A1A1A] p-5">
                <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Entrega</h4>
                <div className="mt-3 space-y-2 text-sm">
                  <p className="text-white"><span className="text-white/50">Ciudad:</span> {selectedOrder.city}</p>
                  <p className="text-white"><span className="text-white/50">Distrito:</span> {selectedOrder.district}</p>
                  <p className="text-white"><span className="text-white/50">Dirección:</span> {selectedOrder.address}</p>
                  {selectedOrder.reference && (
                    <p className="text-white"><span className="text-white/50">Referencia:</span> {selectedOrder.reference}</p>
                  )}
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Productos</h4>
                <div className="mt-3 space-y-3">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm text-white">{item.name}</p>
                        <p className="text-xs text-white/50">
                          {item.flavor ? `Sabor: ${item.flavor} | ` : ''}{item.quantity} x S/ {item.price}
                        </p>
                      </div>
                      <span className="font-mono text-sm text-white">S/ {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-white">S/ {selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Método de entrega</span>
                  <span className="text-white">{selectedOrder.city === 'Otras ciudades' ? 'Coordinado' : 'Gratis'}</span>
                </div>
                <div className="flex justify-between text-lg font-medium">
                  <span className="text-white">Total</span>
                  <span className="font-mono text-[#7C9A6B]">S/ {selectedOrder.total}</span>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-white/50">Método de pago: <span className="text-white capitalize">{selectedOrder.paymentMethod}</span></p>
                <p className="mt-1 text-white/50">
                  Mayor de 18 confirmado: <span className="text-green-400">Sí</span>
                </p>
                {selectedOrder.comments && (
                  <p className="mt-1 text-white/50">Comentarios: <span className="text-white">{selectedOrder.comments}</span></p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Manual Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 py-8">
          <div className="max-h-[90vh] w-full max-w-[800px] overflow-y-auto rounded-2xl bg-[#141414] border border-white/10">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#141414] p-6">
              <h3 className="text-xl font-medium text-white">Nuevo Pedido Manual</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Customer Info */}
              <div>
                <h4 className="text-sm font-medium text-white mb-4">Datos del Cliente</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50">Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50">DNI / Documento</label>
                    <input
                      type="text"
                      value={form.dni}
                      onChange={e => setForm(f => ({ ...f, dni: e.target.value }))}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50">Celular *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div>
                <h4 className="text-sm font-medium text-white mb-4">Datos de Entrega</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50">Ciudad *</label>
                    <select
                      value={form.city}
                      onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    >
                      {CITIES.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/50">Distrito / Zona *</label>
                    <input
                      type="text"
                      required
                      value={form.district}
                      onChange={e => setForm(f => ({ ...f, district: e.target.value }))}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="text-xs text-white/50">Dirección exacta *</label>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="text-xs text-white/50">Referencia</label>
                    <input
                      type="text"
                      value={form.reference}
                      onChange={e => setForm(f => ({ ...f, reference: e.target.value }))}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-sm font-medium text-white mb-4">Productos del Pedido</h4>
                
                <div className="rounded-xl border border-white/10 p-4 mb-4 bg-white/5">
                  <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                      <label className="text-xs text-white/50">Buscar Producto</label>
                      <select
                        value={selectedProductId}
                        onChange={e => setSelectedProductId(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                      >
                        <option value="">Seleccionar producto...</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} - S/ {p.price} (Stock: {p.stock})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-24">
                      <label className="text-xs text-white/50">Cantidad</label>
                      <input
                        type="number"
                        min="1"
                        value={productQuantity}
                        onChange={e => setProductQuantity(Number(e.target.value))}
                        className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddProduct}
                      disabled={!selectedProductId}
                      className="h-[42px] px-4 rounded-lg bg-[#7C9A6B] text-black text-sm font-medium hover:bg-[#6B8560] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Agregar
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {form.items.map(item => (
                    <div key={item.productId} className="flex items-center gap-4 bg-[#1A1A1A] p-3 rounded-xl border border-white/5">
                      <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">{item.name}</p>
                        <p className="text-xs text-white/50">
                          {item.flavor ? `Sabor: ${item.flavor} | ` : ''}{item.quantity} x S/ {item.price}
                        </p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="text-sm font-mono text-[#7C9A6B]">S/ {item.price * item.quantity}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProduct(item.productId)}
                        className="p-2 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {form.items.length === 0 && (
                    <p className="text-sm text-white/30 text-center py-4">No hay productos agregados</p>
                  )}
                </div>
              </div>

              {/* Order Summary & Payment */}
              <div>
                <h4 className="text-sm font-medium text-white mb-4">Resumen y Pago</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-white/50">Método de pago *</label>
                      <select
                        value={form.paymentMethod}
                        onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
                        className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                      >
                        <option value="Yape">Yape</option>
                        <option value="Plin">Plin</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Contraentrega">Contraentrega</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-white/50">Comentarios (Opcional)</label>
                      <textarea
                        value={form.comments}
                        onChange={e => setForm(f => ({ ...f, comments: e.target.value }))}
                        rows={2}
                        className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={form.ageConfirmed}
                        onChange={e => setForm(f => ({ ...f, ageConfirmed: e.target.checked }))}
                        className="w-4 h-4 rounded border-white/20 bg-transparent text-[#7C9A6B] focus:ring-[#7C9A6B] focus:ring-offset-0"
                      />
                      <label className="text-sm text-white/80">Confirmo que el cliente es mayor de 18 años *</label>
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/5 h-fit">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/50">Subtotal</span>
                        <span className="text-white font-mono">S/ {subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Método de entrega ({form.city})</span>
                        <span className="text-[#7C9A6B] text-right">{form.city === 'Otras ciudades' ? 'Coordinado' : 'Gratis'}</span>
                      </div>
                      <div className="h-px bg-white/10 my-2" />
                      <div className="flex justify-between text-lg font-medium">
                        <span className="text-white">Total</span>
                        <span className="text-[#7C9A6B] font-mono">S/ {total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="sticky bottom-0 bg-[#141414] pt-4 pb-2 border-t border-white/10 flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#7C9A6B] text-sm font-medium text-black hover:bg-[#6B8560] transition-colors"
                >
                  Guardar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
