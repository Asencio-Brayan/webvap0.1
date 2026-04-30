import { MessageCircle, Clock, MapPin, Mail } from 'lucide-react'

const zones = [
  { city: 'Lima', price: 10, eta: '2-4 horas' },
  { city: 'Canete', price: 15, eta: '4-6 horas' },
  { city: 'Chincha', price: 18, eta: '6-8 horas' },
  { city: 'Ica', price: 20, eta: '8-12 horas' },
]

export default function ContactoPage() {
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
              href={`https://wa.me/51999999999`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-medium text-white transition-all hover:bg-[#1DA851]"
            >
              <MessageCircle className="h-5 w-5" />
              Escribenos por WhatsApp
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/vapequest.pe"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-3 rounded-xl border border-transparent bg-gradient-to-r from-[#833AB4]/20 via-[#E1306C]/20 to-[#F77737]/20 py-4 text-sm font-medium text-white transition-all hover:from-[#833AB4]/30 hover:via-[#E1306C]/30 hover:to-[#F77737]/30"
              style={{ borderImage: 'linear-gradient(to right, #833AB4, #E1306C, #F77737) 1' }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              @vapequest.pe
            </a>

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
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#7C9A6B]" />
                <p className="text-[15px] text-white">info@vapequest.pe</p>
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
            <h2 className="font-display text-3xl text-white">Zonas de Reparto</h2>
            <div className="mt-6 space-y-3">
              {zones.map((zone) => (
                <div
                  key={zone.city}
                  className="flex items-center gap-4 rounded-xl bg-[#141414] p-5"
                >
                  <MapPin className="h-6 w-6 shrink-0 text-[#7C9A6B]" />
                  <div className="flex-1">
                    <p className="text-lg font-medium text-white">{zone.city}</p>
                    <p className="text-sm text-white/50">Entrega: {zone.eta}</p>
                  </div>
                  <span className="font-mono text-lg text-[#7C9A6B]">S/ {zone.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-white/50">
              El delivery se coordina via WhatsApp tras confirmar tu pedido.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
