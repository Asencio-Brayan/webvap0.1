import { Link } from 'react-router-dom'
import { MapPin, Clock, MessageCircle } from 'lucide-react'

const quickLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catalogo' },
  { to: '/politicas', label: 'Politicas de Privacidad' },
  { to: '/politicas', label: 'Terminos y Condiciones' },
  { to: '/contacto', label: 'Contacto' },
]

const zones = [
  { city: 'Lima', price: 'S/ 10' },
  { city: 'Canete', price: 'S/ 15' },
  { city: 'Chincha', price: 'S/ 18' },
  { city: 'Ica', price: 'S/ 20' },
]

export default function Footer() {
  return (
    <footer className="bg-[#141414] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-white">VAPEQUEST</p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/70">
              Delivery premium de productos de vapeo en Lima, Canete, Chincha e Ica.
            </p>
            <span className="mt-4 inline-block rounded-full border border-[#D4A853] px-4 py-1.5 text-xs text-[#D4A853]">
              SOLO MAYORES DE 18
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-medium tracking-[0.08em] text-white/40">NAVEGACION</p>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[15px] text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Zones */}
          <div>
            <p className="text-xs font-medium tracking-[0.08em] text-white/40">ZONAS DE REPARTO</p>
            <ul className="mt-4 space-y-2.5">
              {zones.map((zone) => (
                <li key={zone.city} className="text-[15px] text-white/70">
                  {zone.city} — <span className="text-[#7C9A6B]">{zone.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium tracking-[0.08em] text-white/40">CONTACTO</p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2.5 text-[15px] text-white/70">
                <MessageCircle className="h-4 w-4 shrink-0 text-[#7C9A6B]" />
                +51 999 999 999
              </li>
              <li className="flex items-center gap-2.5 text-[15px] text-white/70">
                <Clock className="h-4 w-4 shrink-0 text-[#7C9A6B]" />
                Lunes a Sabado: 10am — 8pm
              </li>
              <li className="flex items-center gap-2.5 text-[15px] text-white/70">
                <MapPin className="h-4 w-4 shrink-0 text-[#7C9A6B]" />
                Lima, Peru
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-[13px] text-white/40 md:flex-row">
            <p>&copy; 2025 VapeQuest Peru. Todos los derechos reservados.</p>
            <p>Ventas exclusivas para mayores de 18 anos.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
