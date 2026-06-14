import { Link } from 'react-router-dom'
import { MapPin, Clock, MessageCircle, Facebook, Mail } from 'lucide-react'

const quickLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/politicas', label: 'Políticas de privacidad' },
  { to: '/politicas', label: 'Términos y condiciones' },
  { to: '/contacto', label: 'Contacto' },
]

const zones = [
  { city: 'Lima' },
  { city: 'Cañete' },
  { city: 'Chincha' },
  { city: 'Ica' },
]

export default function Footer() {
  const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL || ''
  const TIKTOK_URL = import.meta.env.VITE_TIKTOK_URL || ''
  const FACEBOOK_URL = import.meta.env.VITE_FACEBOOK_URL || ''

  return (
    <footer className="bg-[#141414] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-white">AURAVAPES</p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/70">
              Productos seleccionados, entregas coordinadas y atención personalizada.
            </p>
            <span className="mt-4 inline-block rounded-full border border-[#D4A853] px-4 py-1.5 text-xs text-[#D4A853]">
              SOLO MAYORES DE 18
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-medium tracking-[0.08em] text-white/40">NAVEGACIÓN</p>
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
            <p className="text-xs font-medium tracking-[0.08em] text-white/40">ZONAS DE ENTREGA</p>
            <ul className="mt-4 space-y-2.5">
              {zones.map((zone) => (
                <li key={zone.city} className="text-[15px] text-white/70">
                  {zone.city}
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
                +51 903 389 999
              </li>
              <li className="flex items-center gap-2.5 text-[15px] text-white/70">
                <Mail className="h-4 w-4 shrink-0 text-[#7C9A6B]" />
                <a href="mailto:contacto@auravapes.shop" className="hover:text-white transition-colors">
                  contacto@auravapes.shop
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[15px] text-white/70">
                <Clock className="h-4 w-4 shrink-0 text-[#7C9A6B]" />
                Lunes a sábado: 10am — 8pm
              </li>
              <li className="flex items-center gap-2.5 text-[15px] text-white/70">
                <MapPin className="h-4 w-4 shrink-0 text-[#7C9A6B]" />
                Lima, Perú
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="mt-6 flex gap-4">
              {INSTAGRAM_URL && (
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" title="Instagram">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                </a>
              )}
              {TIKTOK_URL && (
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" title="TikTok">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.14-2.89 5.34-1.74 1.19-3.9 1.56-5.92 1.18-2.02-.38-3.7-1.54-4.83-3.23-1.12-1.68-1.42-3.79-.88-5.74.54-1.95 1.83-3.55 3.56-4.46 1.73-.91 3.79-1.07 5.67-.47v4.06c-1.57-.45-3.25-.11-4.57.94-1.31 1.05-1.94 2.72-1.63 4.38.31 1.66 1.53 3.03 3.12 3.54 1.59.51 3.33.15 4.59-.95 1.26-1.1 1.94-2.76 1.8-4.44V.02z" /></svg>
                </a>
              )}
              {FACEBOOK_URL && (
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" title="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-[13px] text-white/40 md:flex-row">
            <p>&copy; 2025 AuraVapes. Todos los derechos reservados.</p>
            <p>Ventas exclusivas para mayores de 18 años.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
