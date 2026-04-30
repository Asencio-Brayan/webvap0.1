import { useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, LogOut, Menu, X } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import { useState } from 'react'

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/productos', icon: Package, label: 'Productos' },
  { to: '/admin/pedidos', icon: ShoppingBag, label: 'Pedidos' },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAdminStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin')
    }
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[260px] shrink-0 border-r border-white/10 bg-[#141414] transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <div>
            <span className="text-xs font-medium tracking-[0.12em] text-white">VAPEQUEST</span>
            <span className="ml-2 text-xs font-medium text-[#7C9A6B]">ADMIN</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-white/60 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4 px-3">
          {navItems.map((item) => {
            const active = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`mb-1 flex h-12 items-center gap-3 rounded-lg px-4 text-sm transition-all ${
                  active
                    ? 'border-l-[3px] border-[#7C9A6B] bg-[#7C9A6B]/10 text-[#7C9A6B]'
                    : 'border-l-[3px] border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}

          <button
            onClick={() => { logout(); navigate('/') }}
            className="flex h-12 w-full items-center gap-3 rounded-lg border-l-[3px] border-transparent px-4 text-sm text-white/70 transition-all hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Salir
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 text-xs text-white/30">v1.0.0</div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-[260px]">
        <div className="flex h-16 items-center border-b border-white/10 bg-[#141414] px-6 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-white/60">
            <Menu className="h-5 w-5" />
          </button>
          <span className="ml-4 text-xs font-medium tracking-[0.12em] text-white">VAPEQUEST</span>
        </div>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
