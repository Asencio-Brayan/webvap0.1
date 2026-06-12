import { MessageCircle, Clock, MapPin, Mail, Facebook } from 'lucide-react'

const zones = [
  { city: 'Lima', type: 'Entrega coordinada', detail: 'Punto de encuentro seguro' },
  { city: 'Cañete', type: 'Entrega coordinada', detail: 'Punto de encuentro seguro' },
  { city: 'Chincha', type: 'Entrega coordinada', detail: 'Punto de encuentro seguro' },
  { city: 'Ica', type: 'Entrega coordinada', detail: 'Punto de encuentro seguro' },
  { city: 'Otras ciudades', type: 'Envío por agencia', detail: 'Costo coordinado según destino' },
]

export default function ContactoPage() {
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '51903389999'
  const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL || ''
  const TIKTOK_URL = import.meta.env.VITE_TIKTOK_URL || ''
  const FACEBOOK_URL = import.meta.env.VITE_FACEBOOK_URL || ''

  return (
    <>
      <div className="bg-[#141414] pt-28 pb-10 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-12">
          <h1 className="font-display text-4xl text-white md:text-5xl">Contacto</h1>
          <p className="mt-2 text-lg text-white/70">Estamos aqui para ayudarte con tu pedido</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact methods */}
          <div className="rounded-2xl bg-[#141414] p-8">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-medium text-white transition-all hover:bg-[#1DA851]"
            >
              <MessageCircle className="h-5 w-5" />
              Escribenos por WhatsApp
            </a>

            {/* Social Media Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Instagram */}
              <a
                href={INSTAGRAM_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 rounded-xl border border-transparent bg-gradient-to-r from-[#833AB4]/20 via-[#E1306C]/20 to-[#F77737]/20 py-3 text-sm font-medium text-white transition-all ${INSTAGRAM_URL ? 'hover:from-[#833AB4]/30 hover:via-[#E1306C]/30 hover:to-[#F77737]/30 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                style={{ borderImage: 'linear-gradient(to right, #833AB4, #E1306C, #F77737) 1' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>

              {/* TikTok */}
              <a
                href={TIKTOK_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 rounded-xl bg-black/40 border border-white/10 py-3 text-sm font-medium text-white transition-all ${TIKTOK_URL ? 'hover:bg-black/60 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.14-2.89 5.34-1.74 1.19-3.9 1.56-5.92 1.18-2.02-.38-3.7-1.54-4.83-3.23-1.12-1.68-1.42-3.79-.88-5.74.54-1.95 1.83-3.55 3.56-4.46 1.73-.91 3.79-1.07 5.67-.47v4.06c-1.57-.45-3.25-.11-4.57.94-1.31 1.05-1.94 2.72-1.63 4.38.31 1.66 1.53 3.03 3.12 3.54 1.59.51 3.33.15 4.59-.95 1.26-1.1 1.94-2.76 1.8-4.44V.02z" />
                </svg>
                TikTok
              </a>

              {/* Facebook */}
              <a
                href={FACEBOOK_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 rounded-xl bg-[#1877F2]/20 border border-[#1877F2]/30 py-3 text-sm font-medium text-white transition-all ${FACEBOOK_URL ? 'hover:bg-[#1877F2]/30 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              >
                <Facebook className="h-4 w-4 text-[#1877F2]" />
                Facebook
              </a>
            </div>

            <div className="my-6 h-px bg-white/10" />

            {/* Info */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-[#7C9A6B]" />
                <div>
                  <p className="text-[15px] text-white">Lunes a Sabado: 10:00 AM - 8:00 PM</p>
                  <p className="text-sm text-white/50">Domingo: Cerrado</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#7C9A6B] mt-0.5" />
                <div>
                  <a href="mailto:contacto@auravapes.shop" className="text-[15px] text-white hover:text-white/80 transition-colors">
                    contacto@auravapes.shop
                  </a>
                  <p className="text-sm text-white/50 mt-0.5">Atención general</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#7C9A6B] mt-0.5" />
                <div>
                  <a href="mailto:ventas@auravapes.shop" className="text-[15px] text-white hover:text-white/80 transition-colors">
                    ventas@auravapes.shop
                  </a>
                  <p className="text-sm text-white/50 mt-0.5">Pedidos y consultas de productos</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#7C9A6B] mt-0.5" />
                <div>
                  <a href="mailto:soporte@auravapes.shop" className="text-[15px] text-white hover:text-white/80 transition-colors">
                    soporte@auravapes.shop
                  </a>
                  <p className="text-sm text-white/50 mt-0.5">Ayuda y soporte al cliente</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#7C9A6B]" />
                <p className="text-[15px] text-white">Lima, Peru</p>
              </div>
            </div>

            <p className="mt-6 text-xs text-white/40">
              Respondemos en menos de 30 minutos durante horario de atencion.
            </p>
          </div>

          {/* Delivery zones */}
          <div>
            <h2 className="font-display text-3xl text-white">Ciudades con Cobertura</h2>
            <div className="mt-6 space-y-3">
              {zones.map((zone) => (
                <div
                  key={zone.city}
                  className="flex items-center gap-4 rounded-xl bg-[#141414] p-5"
                >
                  <MapPin className="h-6 w-6 shrink-0 text-[#7C9A6B]" />
                  <div className="flex-1">
                    <p className="text-lg font-medium text-white">{zone.city}</p>
                    <ul className="mt-1 space-y-1 text-sm text-white/50 list-inside list-disc">
                      <li>{zone.type}</li>
                      <li>{zone.detail}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-white/50">
              Nos comunicaremos contigo por WhatsApp para coordinar la entrega o el envío de tu pedido.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
