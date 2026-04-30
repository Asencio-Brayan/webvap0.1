import { useMemo } from 'react'
import { Package, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import { Link } from 'react-router-dom'

const statusColors: Record<string, string> = {
  pendiente: 'bg-[#D4A853]/20 text-[#D4A853]',
  confirmado: 'bg-blue-500/20 text-blue-400',
  en_camino: 'bg-[#7C9A6B]/20 text-[#7C9A6B]',
  entregado: 'bg-green-500/20 text-green-400',
  cancelado: 'bg-red-500/20 text-red-400',
}

const statusLabels: Record<string, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  en_camino: 'En camino',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
}

export default function AdminDashboardPage() {
  const { products, orders, getProductStats } = useAdminStore()
  const stats = useMemo(() => getProductStats(), [getProductStats])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [products])

  const categories = ['desechables', 'recargables', 'liquidos', 'pods', 'accesorios']
  const maxCount = Math.max(...categories.map((c) => categoryCounts[c] || 0), 1)

  return (
    <div>
      <h1 className="font-display text-3xl text-white">Dashboard</h1>
      <p className="mt-1 text-[15px] text-white/50">
        {new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {/* KPI Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Productos', value: stats.total, icon: Package, color: 'text-[#7C9A6B]', sub: `${stats.active} activos` },
          { label: 'Productos Activos', value: stats.active, icon: CheckCircle, color: 'text-green-400', sub: 'En stock' },
          { label: 'Sin Stock', value: stats.outOfStock, icon: AlertCircle, color: 'text-red-400', sub: 'Agotados' },
          { label: 'Pedidos Hoy', value: orders.length, icon: ShoppingBag, color: 'text-[#D4A853]', sub: 'Registrados' },
        ].map((card, i) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/10 bg-[#141414] p-6"
            style={{ animation: `fadeSlideUp 400ms ease-out ${i * 100}ms both` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/50">{card.label}</p>
                <p className="mt-2 font-mono text-3xl text-white">{card.value}</p>
              </div>
              <card.icon className={`h-8 w-8 ${card.color}`} />
            </div>
            <p className="mt-3 text-xs text-white/40">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Pedidos Recientes</h3>
            <Link to="/admin/pedidos" className="text-sm text-[#7C9A6B] hover:text-[#9AB88A]">Ver todos</Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">ID</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">Cliente</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">Total</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">Estado</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-white/5">
                    <td className="py-3 font-mono text-white/70">{order.id}</td>
                    <td className="py-3 text-white">{order.customerName}</td>
                    <td className="py-3 font-mono text-[#7C9A6B]">S/ {order.total}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Products by Category */}
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-6">
          <h3 className="text-lg font-medium text-white">Productos por Categoria</h3>
          <div className="mt-5 space-y-4">
            {categories.map((cat) => {
              const count = categoryCounts[cat] || 0
              const width = (count / maxCount) * 100
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm">
                    <span className="capitalize text-white/70">{cat}</span>
                    <span className="text-white">{count}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#1A1A1A]">
                    <div
                      className="h-full rounded-full bg-[#7C9A6B] transition-all duration-700"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
