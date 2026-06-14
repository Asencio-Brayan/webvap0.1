import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/types/product'
import { useCartStore } from '@/stores/cartStore'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      flavor: product.flavor,
      nicotine: product.nicotine ? `${product.nicotine}mg` : undefined,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={`Vape ${product.brand} ${product.name} en Perú`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[#7C9A6B]/20 px-3 py-1 text-xs font-medium text-[#7C9A6B]">
            DESTACADO
          </span>
        )}
        <span
          className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            product.stock > 0 ? 'bg-black/50 text-green-400' : 'bg-black/50 text-red-400'
          }`}
        >
          {product.stock > 0 ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              En stock
            </>
          ) : (
            'Agotado'
          )}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-white/40">{product.brand}</p>
        <h3 className="mt-1 text-base font-medium text-white line-clamp-2">{product.name}</h3>
        <p className="mt-1 text-xs text-white/50">{product.flavor}</p>
        {product.nicotine && (
          <p className="mt-0.5 text-xs text-white/50">Nicotina: {product.nicotine}mg</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-lg text-[#7C9A6B]">S/ {product.price}</span>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
              added
                ? 'bg-green-500/20 text-green-400'
                : 'bg-[#1A1A1A] text-[#7C9A6B] hover:bg-[#7C9A6B]/20'
            } ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {added ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}
