import { Routes, Route } from 'react-router-dom'
import AgeGate from '@/components/AgeGate'
import AgeBanner from '@/components/AgeBanner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import ScrollToTop from '@/components/ScrollToTop'
import HomePage from '@/pages/HomePage'
import CatalogoPage from '@/pages/CatalogoPage'
import ProductoDetailPage from '@/pages/ProductoDetailPage'
import CarritoPage from '@/pages/CarritoPage'
import CheckoutPage from '@/pages/CheckoutPage'
import PoliticasPage from '@/pages/PoliticasPage'
import ContactoPage from '@/pages/ContactoPage'
import AdminLoginPage from '@/pages/admin/AdminLoginPage'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import AdminProductosPage from '@/pages/admin/AdminProductosPage'
import AdminPedidosPage from '@/pages/admin/AdminPedidosPage'
import AdminLayout from '@/components/admin/AdminLayout'

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AgeGate />
      <AgeBanner />
      <Navbar />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
      <Route path="/catalogo" element={<AppLayout><CatalogoPage /></AppLayout>} />
      <Route path="/producto/:id" element={<AppLayout><ProductoDetailPage /></AppLayout>} />
      <Route path="/carrito" element={<AppLayout><CarritoPage /></AppLayout>} />
      <Route path="/checkout" element={<AppLayout><CheckoutPage /></AppLayout>} />
      <Route path="/politicas" element={<AppLayout><PoliticasPage /></AppLayout>} />
      <Route path="/contacto" element={<AppLayout><ContactoPage /></AppLayout>} />

      <Route path="/admin" element={<AdminLoginPage />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/productos" element={<AdminProductosPage />} />
        <Route path="/admin/pedidos" element={<AdminPedidosPage />} />
      </Route>
    </Routes>
  )
}
