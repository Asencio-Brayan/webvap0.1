import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, Truck, Package, AlertTriangle, Minus, Plus, Heart } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { productRepository } from '@/repositories/productRepository'
import { useCartStore } from '@/stores/cartStore'
import type { Product } from '@/types/product'

export default function ProductoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      if (!id) return
      const p = await productRepository.getProductById(Number(id))
      if (!p) { navigate('/catalogo'); return }
      setProduct(p)
      setQuantity(1)

      const all = await productRepository.getProductsByCategory(p.category)
      setRelated(all.filter((r) => r.id !== p.id).slice(0, 4))
      setLoading(false)
    }
    load()
  }, [id, navigate])

  if (loading || !product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7C9A6B] border-t-transparent" />
      </div>
    )
  }

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      flavor: product.flavor,
      nicotine: product.nicotine ? `${product.nicotine}mg` : undefined,
    })
    // Update quantity if more than 1
    if (quantity > 1) {
      const cartStore = useCartStore.getState()
      cartStore.updateQuantity(product.id, quantity)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const categoryLabels: Record<string, string> = {
    desechables: 'Desechables',
    recargables: 'Recargables',
    pods: 'Pods',
    liquidos: 'Liquidos',
    accesorios: 'Accesorios',
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#141414] pt-28 pb-4 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-12">
          <div className="flex items-center gap-2 text-[13px] text-white/40">
            <Link to="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link to="/catalogo" className="hover:text-white">Catalogo</Link>
            <span>/</span>
            <Link to={`/catalogo?cat=${product.category}`} className="capitalize hover:text-white">{categoryLabels[product.category]}</Link>
            <span>/</span>
            <span className="text-white/60">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[55%_45%]">
          {/* Image */}
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#141414]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/40">{product.brand}</p>
            <h1 className="mt-2 font-display text-3xl text-white md:text-4xl">{product.name}</h1>
            <span className="mt-3 inline-block rounded-full bg-[#7C9A6B]/20 px-3 py-1 text-xs font-medium text-[#7C9A6B]">
              {categoryLabels[product.category]}
            </span>
            <p className="mt-4 font-mono text-2xl text-[#7C9A6B]">S/ {product.price}</p>

            {product.stock > 0 ? (
              <p className="mt-2 text-sm text-green-400">En stock — {product.stock} unidades disponibles</p>
            ) : (
              <p className="mt-2 text-sm text-red-400">Agotado</p>
            )}

            <p className="mt-5 text-[15px] leading-relaxed text-white/70">{product.description}</p>

            {/* Specs */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/40">Sabor</p>
                <p className="mt-1 text-sm text-white">{product.flavor}</p>
              </div>
              {product.nicotine !== undefined && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">Nicotina</p>
                  <p className="mt-1 text-sm text-white">{product.nicotine}mg</p>
                </div>
              )}
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">{key}</p>
                  <p className="mt-1 text-sm text-white">{value}</p>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm text-white/70">Cantidad:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A1A1A] text-white/70 hover:text-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A1A1A] text-white/70 hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className={`flex-1 rounded-xl py-4 text-sm font-medium transition-all ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-[#7C9A6B] text-black hover:bg-[#6B8560]'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {added ? 'Agregado!' : 'Agregar al Carrito'}
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-colors hover:bg-white/5 hover:text-white">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-5">
              {[
                { icon: ShieldCheck, text: 'Mayores de 18' },
                { icon: Truck, text: 'Delivery a tu zona' },
                { icon: Package, text: 'Producto sellado' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/50">
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{text}</span>
                </div>
              ))}
            </div>

            {/* Age warning */}
            <div className="mt-6 flex items-start gap-2 rounded-lg border border-[#D4A853]/20 bg-[#D4A853]/10 p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" />
              <p className="text-xs text-[#D4A853]">
                Este producto contiene nicotina. Venta exclusiva para mayores de 18 anos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="bg-[#141414] py-16">
          <div className="mx-auto max-w-7xl px-5 md:px-12">
            <h2 className="font-display text-3xl text-white">Productos Relacionados</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
