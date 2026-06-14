import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { MessageCircle, ShoppingCart, ShieldCheck, Truck, Package, ChevronRight } from 'lucide-react'
import { locations } from '@/data/locations'

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>()
  const locationData = slug ? locations[slug] : null

  useEffect(() => {
    if (locationData) {
      document.title = locationData.metaTitle
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', locationData.metaDescription)
    }
  }, [locationData])

  if (!locationData) return <Navigate to="/catalogo" replace />

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#141414] pt-28 pb-4 md:pt-32 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-5 md:px-12">
          <div className="flex items-center gap-2 text-[13px] text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/60">Vapes en {locationData.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-5 md:px-12 border-b border-white/5 bg-[#141414]">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl text-white md:text-6xl mb-6">{locationData.h1}</h1>
          <p className="text-xl text-[#7C9A6B] font-medium mb-4">{locationData.introduction}</p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {locationData.localText}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/catalogo" className="flex items-center gap-2 rounded-xl bg-[#7C9A6B] px-8 py-4 text-sm font-medium text-black transition-all hover:bg-[#6B8560]">
              <ShoppingCart className="h-4 w-4" /> Ver Catálogo
            </Link>
            <a href="https://wa.me/51999999999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-[#25D366] bg-[#25D366]/10 px-8 py-4 text-sm font-medium text-[#25D366] transition-all hover:bg-[#25D366]/20">
              <MessageCircle className="h-4 w-4" /> Asesoría por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-[#0A0A0A] border-b border-white/5">
        <div className="mx-auto max-w-6xl px-5 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] rounded-2xl border border-white/5">
              <Package className="h-10 w-10 text-[#7C9A6B] mb-4" />
              <h3 className="text-white font-medium mb-2">Productos Originales</h3>
              <p className="text-sm text-white/50">Dispositivos 100% auténticos</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] rounded-2xl border border-white/5">
              <MessageCircle className="h-10 w-10 text-[#25D366] mb-4" />
              <h3 className="text-white font-medium mb-2">Atención por WhatsApp</h3>
              <p className="text-sm text-white/50">Respuesta rápida a consultas</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] rounded-2xl border border-white/5">
              <Truck className="h-10 w-10 text-[#7C9A6B] mb-4" />
              <h3 className="text-white font-medium mb-2">Entregas Coordinadas</h3>
              <p className="text-sm text-white/50">Puntos seguros en {locationData.name}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] rounded-2xl border border-[#D4A853]/20">
              <ShieldCheck className="h-10 w-10 text-[#D4A853] mb-4" />
              <h3 className="text-white font-medium mb-2">+18 Años</h3>
              <p className="text-sm text-[#D4A853]/80">Venta exclusiva a mayores</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Internal Links Section */}
      <section className="py-16 bg-[#141414] border-b border-white/5">
        <div className="mx-auto max-w-4xl px-5 md:px-12 text-center">
          <h2 className="text-2xl font-display text-white mb-6">Explora nuestro catálogo en {locationData.name}</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Descubre nuestra amplia variedad de productos de vapeo disponibles para entrega. Navega por nuestras categorías principales:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/catalogo" className="flex-1 p-6 bg-[#1A1A1A] border border-white/10 rounded-xl hover:border-[#7C9A6B] transition-colors group">
              <h3 className="text-lg font-medium text-white group-hover:text-[#7C9A6B] transition-colors">Catálogo Completo</h3>
              <p className="text-sm text-white/50 mt-2">Ver todos nuestros productos</p>
            </Link>
            <Link to="/catalogo?cat=desechables" className="flex-1 p-6 bg-[#1A1A1A] border border-white/10 rounded-xl hover:border-[#7C9A6B] transition-colors group">
              <h3 className="text-lg font-medium text-white group-hover:text-[#7C9A6B] transition-colors">Vapes Desechables</h3>
              <p className="text-sm text-white/50 mt-2">Equipos listos para usar</p>
            </Link>
            <Link to="/catalogo?cat=pods" className="flex-1 p-6 bg-[#1A1A1A] border border-white/10 rounded-xl hover:border-[#7C9A6B] transition-colors group">
              <h3 className="text-lg font-medium text-white group-hover:text-[#7C9A6B] transition-colors">Pods y Recargables</h3>
              <p className="text-sm text-white/50 mt-2">Dispositivos de uso continuo</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 border-b border-white/5 bg-[#0A0A0A]">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <h2 className="text-2xl font-display text-white mb-8">Nuestras Marcas Destacadas</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Smok', 'Snowplus', 'RELX', 'Vookbar'].map(brand => (
              <span key={brand} className="px-6 py-3 bg-[#1A1A1A] border border-white/10 rounded-full text-white/80 font-medium tracking-wide">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Localizado */}
      <section className="py-16 bg-[#141414]">
        <div className="mx-auto max-w-4xl px-5 md:px-12">
          <h2 className="text-3xl font-display text-white mb-10 text-center">Preguntas Frecuentes en {locationData.name}</h2>
          <div className="space-y-4">
            {locationData.faqs.map((faq, i) => (
              <div key={i} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
