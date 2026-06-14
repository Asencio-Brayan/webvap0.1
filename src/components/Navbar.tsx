import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { useUIStore } from '@/stores/uiStore'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const location = useLocation()
  const itemCount = useCartStore((s) => s.getItemCount())
  const { openCart, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    closeMobileMenu()
  }, [location.pathname, closeMobileMenu])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <nav
        className="fixed top-[41px] z-[80] w-full transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-12">
          <button
            className="text-white/70 md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 text-xs font-medium tracking-[0.12em] text-white md:static md:translate-x-0"
          >
            AURAVAPES
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-[15px] transition-opacity ${
                  isActive(link.to) ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#7C9A6B]" />
                )}
              </Link>
            ))}
          </div>

          <button
            onClick={openCart}
            className="relative text-white/70 transition-colors hover:text-white"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#7C9A6B] text-[11px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A] pt-28 md:hidden">
          <div className="flex flex-col items-center gap-8 p-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-2xl font-display ${
                  isActive(link.to) ? 'text-[#7C9A6B]' : 'text-white/70'
                }`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
