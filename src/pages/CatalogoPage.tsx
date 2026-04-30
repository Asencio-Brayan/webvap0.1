import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { productRepository } from '@/repositories/productRepository'
import type { Product, ProductCategory } from '@/types/product'

const categories: ProductCategory[] = ['desechables', 'recargables', 'pods', 'liquidos', 'accesorios']
const sortOptions = [
  { value: 'bestseller', label: 'Mas vendidos' },
  { value: 'newest', label: 'Nuevos' },
  { value: 'price_asc', label: 'Precio: bajo a alto' },
  { value: 'price_desc', label: 'Precio: alto a bajo' },
]

export default function CatalogoPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Filter states
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
    searchParams.get('cat')?.split(',') as ProductCategory[] || []
  )
  const [minPrice, setMinPrice] = useState(searchParams.get('min') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max') || '')
  const [inStockOnly, setInStockOnly] = useState(searchParams.get('stock') === '1')
  const [sort, setSort] = useState(searchParams.get('sort') || 'bestseller')

  // Load products
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const all = await productRepository.getProducts()
      setProducts(all)
      setLoading(false)
    }
    load()
  }, [])

  // Update URL params
  const updateParams = useCallback(() => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (selectedCategories.length) params.set('cat', selectedCategories.join(','))
    if (minPrice) params.set('min', minPrice)
    if (maxPrice) params.set('max', maxPrice)
    if (inStockOnly) params.set('stock', '1')
    if (sort !== 'bestseller') params.set('sort', sort)
    setSearchParams(params)
  }, [search, selectedCategories, minPrice, maxPrice, inStockOnly, sort, setSearchParams])

  useEffect(() => {
    updateParams()
  }, [updateParams])

  // Filter products client-side
  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.flavor.toLowerCase().includes(q)
      )
    }

    if (selectedCategories.length) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    if (minPrice) result = result.filter((p) => p.price >= Number(minPrice))
    if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice))
    if (inStockOnly) result = result.filter((p) => p.stock > 0)

    switch (sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => b.id - a.id)
        break
      case 'bestseller':
        result.sort((a, b) => b.stock - a.stock)
        break
    }

    return result
  }, [products, search, selectedCategories, minPrice, maxPrice, inStockOnly, sort])

  const toggleCategory = (cat: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategories([])
    setMinPrice('')
    setMaxPrice('')
    setInStockOnly(false)
    setSort('bestseller')
  }

  const activeFiltersCount = selectedCategories.length + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0) + (inStockOnly ? 1 : 0)

  // Filter Sidebar Content
  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categoria */}
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/40">CATEGORIA</p>
        <div className="mt-3 space-y-2.5">
          {categories.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded border-white/20 bg-[#1A1A1A] text-[#7C9A6B] focus:ring-[#7C9A6B]"
              />
              <span className="text-[15px] capitalize text-white/80">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/40">PRECIO</p>
        <div className="mt-3 flex gap-3">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-24 rounded-lg border border-white/10 bg-[#1A1A1A] px-3 py-2 text-sm text-white outline-none focus:border-[#7C9A6B]"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-24 rounded-lg border border-white/10 bg-[#1A1A1A] px-3 py-2 text-sm text-white outline-none focus:border-[#7C9A6B]"
          />
        </div>
      </div>

      {/* Disponibilidad */}
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/40">DISPONIBILIDAD</p>
        <div className="mt-3 space-y-2.5">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-[#1A1A1A] text-[#7C9A6B] focus:ring-[#7C9A6B]"
            />
            <span className="text-[15px] text-white/80">En stock</span>
          </label>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full rounded-xl border border-white/10 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
      >
        Limpiar filtros
      </button>
    </div>
  )

  return (
    <>
      {/* Header */}
      <div className="bg-[#141414] pt-28 pb-10 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-12">
          <h1 className="font-display text-4xl text-white md:text-5xl">Catalogo</h1>
          <p className="mt-2 text-lg text-white/70">Explora nuestra seleccion premium de productos de vapeo</p>

          {/* Search */}
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Buscar por nombre, marca o sabor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/10 bg-[#1A1A1A] pl-11 pr-10 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#7C9A6B] focus:ring-1 focus:ring-[#7C9A6B]/20"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-[260px] shrink-0 lg:block">
            <FilterContent />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-white/50">{filtered.length} productos encontrados</p>

              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#141414] px-4 py-2 text-sm text-white lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C9A6B] text-xs text-black">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none rounded-lg border border-white/10 bg-[#141414] py-2 pl-4 pr-10 text-sm text-white outline-none focus:border-[#7C9A6B]"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-[380px] animate-pulse rounded-2xl bg-[#141414]" />
                ))}
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {filtered.length === 0 && !loading && (
              <div className="mt-16 text-center">
                <p className="text-xl text-white/60">No se encontraron productos</p>
                <p className="mt-2 text-sm text-white/40">Intenta con otros terminos o filtros</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-xl bg-[#7C9A6B] px-6 py-3 text-sm font-medium text-black"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Panel */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileFiltersOpen(false)} />
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-[20px] bg-[#141414] p-6"
            style={{ animation: 'slideUp 300ms ease-out' }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Filtros</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-white/60">
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterContent />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full rounded-xl bg-[#7C9A6B] py-3 text-sm font-medium text-black"
            >
              Aplicar filtros
            </button>
          </div>
          <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
        </div>
      )}
    </>
  )
}
