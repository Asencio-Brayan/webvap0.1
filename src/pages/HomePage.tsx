import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Search, ShoppingCart, MessageCircle, AlertTriangle } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { productRepository } from '@/repositories/productRepository'
import type { Product } from '@/types/product'

/* ─── Floating Particles ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 20}s`,
    duration: `${15 + Math.random() * 15}s`,
    size: 1 + Math.random() * 1.5,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: p.left,
            bottom: '-5px',
            width: p.size,
            height: p.size,
            opacity: 0.2,
            animation: `float-up ${p.duration} linear ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* ─── Hero Section ─── */
function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero-background.jpg)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)' }}
      />
      <FloatingParticles />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-20 md:px-12">
        <div
          className="flex items-center gap-2 transition-all duration-700"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(30px)', transitionDelay: '0ms' }}
        >
          <MapPin className="h-4 w-4 text-[#7C9A6B]" />
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#7C9A6B]">
            Cobertura de entrega
          </span>
        </div>

        <h1
          className="mt-6 font-display text-4xl leading-[1.05] text-white md:text-6xl lg:text-[64px]"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(30px)', transition: 'all 800ms cubic-bezier(0.22, 1, 0.36, 1) 100ms' }}
        >
          Descubre tu próximo<br />vape favorito
        </h1>

        <p
          className="mt-6 max-w-[560px] text-lg leading-relaxed text-white/70"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(30px)', transition: 'all 800ms cubic-bezier(0.22, 1, 0.36, 1) 200ms' }}
        >
          Productos seleccionados, entregas coordinadas y atención personalizada en Lima, Cañete, Chincha e Ica.
        </p>

        <div
          className="mt-8 flex flex-wrap gap-4"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(30px)', transition: 'all 800ms cubic-bezier(0.22, 1, 0.36, 1) 300ms' }}
        >
          <Link
            to="/catalogo"
            className="rounded-xl bg-[#7C9A6B] px-8 py-4 text-sm font-medium text-black transition-all hover:bg-[#6B8560] hover:scale-[1.02]"
          >
            Ver Catálogo
          </Link>
          <Link
            to="/checkout"
            className="rounded-xl border border-white/20 bg-transparent px-8 py-4 text-sm font-medium text-white transition-all hover:bg-white/5 hover:border-white/30"
          >
            Coordinar Compra
          </Link>
        </div>


      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="relative h-10 w-px bg-white/40">
          <div className="scroll-dot absolute h-1.5 w-1.5 -translate-x-[3px] rounded-full bg-white" />
        </div>
      </div>
    </section>
  )
}

/* ─── Trust Indicators Section ─── */
function TrustIndicatorsSection() {
  return (
    <section className="bg-[#141414] py-12 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            'Entregas coordinadas en Lima, Cañete, Chincha e Ica',
            'Atención personalizada por WhatsApp',
            'Productos seleccionados de calidad premium',
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7C9A6B]/20">
                <svg className="h-4 w-4 text-[#7C9A6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <p className="text-sm font-medium text-white/80">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Zonas Section ─── */
const zones = [
  { city: 'Lima' },
  { city: 'Canete' },
  { city: 'Chincha' },
  { city: 'Ica' },
]

function ZonasSection() {
  return (
    <section className="bg-[#0A0A0A] py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <h2 className="font-display text-3xl text-white md:text-5xl">Zonas de Entrega</h2>
        <p className="mt-2 text-lg text-white/70">Entregamos en estas zonas de la costa central</p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {zones.map((zone, i) => (
            <div
              key={zone.city}
              className="rounded-2xl border border-white/10 bg-[#141414] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              style={{
                animation: `fadeSlideUp 600ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 100}ms both`,
              }}
            >
              <MapPin className="h-8 w-8 text-[#7C9A6B]" />
              <h3 className="mt-4 text-xl font-medium text-white">{zone.city}</h3>
              <p className="mt-2 text-sm text-[#7C9A6B]">Entrega coordinada</p>
              <p className="mt-1 text-sm text-white/70">Punto de encuentro seguro</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="font-display text-2xl text-white md:text-3xl text-center">¿Cómo funciona la entrega?</h3>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: 1, title: 'Realiza tu pedido.' },
              { num: 2, title: 'Confirmamos disponibilidad por WhatsApp.' },
              { num: 3, title: 'Coordinamos un punto de encuentro seguro.' },
              { num: 4, title: 'Recibes tu producto.' },
            ].map((step, i) => (
               <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#141414] border border-white/5">
                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7C9A6B]/20 text-[#7C9A6B] font-bold mb-4">{step.num}</div>
                 <p className="text-[15px] text-white/80">{step.title}</p>
               </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-xl bg-[#141414] border border-white/10 p-6 text-center">
          <p className="text-[15px] text-white/70">Para otras ciudades realizamos envíos mediante agencias de transporte autorizadas.</p>
        </div>
      </div>
    </section>
  )
}

/* ─── Featured Products Section ─── */
function FeaturedSection() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    productRepository.getFeaturedProducts().then(setProducts)
  }, [])

  return (
    <section className="bg-[#141414] py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl text-white md:text-5xl">Productos Destacados</h2>
          <Link to="/catalogo" className="flex items-center gap-1 text-sm text-[#7C9A6B] transition-colors hover:text-[#9AB88A]">
            Ver Todo <span className="text-lg">&rarr;</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Como Comprar Section ─── */
const steps = [
  { num: 1, icon: Search, title: 'Elige tus productos', desc: 'Navega nuestro catalogo y selecciona tus vapes favoritos' },
  { num: 2, icon: ShoppingCart, title: 'Agrega al carrito', desc: 'Revisa tu seleccion y elige la cantidad deseada' },
  { num: 3, icon: MapPin, title: 'Selecciona tu zona', desc: 'Indica tu ciudad para la cobertura de entrega' },
  { num: 4, icon: MessageCircle, title: 'Recibe tu pedido', desc: 'Confirma por WhatsApp y coordinaremos el punto de encuentro' },
]

function ComoComprarSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#0A0A0A] py-16 md:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <h2 className="text-center font-display text-3xl text-white md:text-5xl">Como Comprar</h2>
        <p className="mt-2 text-center text-lg text-white/70">Tu pedido en 4 simples pasos</p>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex flex-col items-center text-center transition-all duration-600"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div className="gentle-pulse flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-[#7C9A6B]">
                <span className="text-xs font-medium">{step.num}</span>
              </div>
              <step.icon className="mt-5 h-8 w-8 text-white" />
              <h3 className="mt-4 text-xl font-medium text-white">{step.title}</h3>
              <p className="mt-2 max-w-[260px] text-[15px] leading-relaxed text-white/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Health Warning Section ─── */
function WarningSection() {
  return (
    <section className="bg-[#C45B5B]/[0.08] px-5 py-12 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 md:flex-row">
        <AlertTriangle className="h-10 w-10 shrink-0 text-[#C45B5B]" />
        <div>
          <h3 className="text-xl font-medium text-[#C45B5B]">Advertencia de Salud</h3>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-white/70">
            Los productos con nicotina son adictivos y pueden ser perjudiciales para la salud. Estan destinados exclusivamente a adultos mayores de 18 anos. No fumar es la opcion mas saludable. Si no eres fumador, no inicies. Mantener fuera del alcance de ninos y adolescentes.
          </p>
          <p className="mt-3 text-sm text-[#C45B5B]">
            Venta exclusiva para mayores de 18 anos. La edad sera verificada al momento de la entrega.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Main Home Page ─── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustIndicatorsSection />
      <ZonasSection />
      <FeaturedSection />
      <ComoComprarSection />
      <WarningSection />
    </>
  )
}
