import { useState, useMemo } from 'react'
import { ChevronDown, Eye, X } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import type { Order, OrderStatus } from '@/types/order'

const statusConfig: Record<OrderStatus, { label: string; className: string; dot: string }> = {
  pendiente: { label: 'Pendiente', className: 'bg-[#D4A853]/20 text-[#D4A853]', dot: 'bg-[#D4A853]' },
  confirmado: { label: 'Confirmado', className: 'bg-blue-500/20 text-blue-400', dot: 'bg-blue-400' },
  en_camino: { label: 'En camino', className: 'bg-[#7C9A6B]/20 text-[#7C9A6B]', dot: 'bg-[#7C9A6B]' },
  entregado: { label: 'Entregado', className: 'bg-green-500/20 text-green-400', dot: 'bg-green-400' },
  cancelado: { label: 'Cancelado', className: 'bg-red-500/20 text-red-400', dot: 'bg-red-400' },
}

const allStatuses: (OrderStatus | 'all')[] = ['all', 'pendiente', 'confirmado', 'en_camino', 'entregado', 'cancelado']

export default function AdminPedidosPage() {
  const { orders, updateOrderStatus } = useAdminStore()
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

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

  return (
    <div>
      <h1 className="font-display text-3xl text-white">Pedidos</h1>
      <p className="mt-1 text-[15px] text-white/50">Gestion de pedidos de clientes</p>

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
            <p className="text-white/40">No hay pedidos en esta categoria</p>
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
                  <p className="text-white"><span className="text-white/50">Direccion:</span> {selectedOrder.address}</p>
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
                        <p className="text-xs text-white/50">{item.quantity} x S/ {item.price}</p>
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
                  <span className="text-white/50">Delivery</span>
                  <span className="text-white">S/ {selectedOrder.deliveryCost}</span>
                </div>
                <div className="flex justify-between text-lg font-medium">
                  <span className="text-white">Total</span>
                  <span className="font-mono text-[#7C9A6B]">S/ {selectedOrder.total}</span>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-white/50">Metodo de pago: <span className="text-white capitalize">{selectedOrder.paymentMethod}</span></p>
                <p className="mt-1 text-white/50">
                  Mayor de 18 confirmado: <span className="text-green-400">Si</span>
                </p>
                {selectedOrder.comments && (
                  <p className="mt-1 text-white/50">Comentarios: <span className="text-white">{selectedOrder.comments}</span></p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
