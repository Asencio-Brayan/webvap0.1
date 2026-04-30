import { useState, useMemo, useEffect } from 'react'
import { Plus, Search, Pencil, Trash2, X, Image as ImageIcon, AlertTriangle, Info } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import type { Product, ProductCategory } from '@/types/product'

const categoryOptions: ProductCategory[] = ['desechables', 'recargables', 'pods', 'liquidos', 'accesorios']

const emptyForm: Omit<Product, 'id'> = {
  name: '',
  brand: '',
  category: 'desechables',
  price: 0,
  flavor: '',
  nicotine: undefined,
  stock: 0,
  featured: false,
  image: '/images/product-1.jpg',
  description: '',
  specs: {},
  images: [],
}

export default function AdminProductosPage() {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductFeatured, loadProducts } = useAdminStore()
  
  useEffect(() => {
    loadProducts()
  }, [loadProducts])
  
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showDelete, setShowDelete] = useState<Product | null>(null)
  const [form, setForm] = useState<Omit<Product, 'id'>>({ ...emptyForm })
  const [imageError, setImageError] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      )
    }
    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter)
    }
    return result
  }, [products, search, categoryFilter])

  const openCreate = () => {
    setEditingProduct(null)
    setForm({ ...emptyForm })
    setImageError(false)
    setShowModal(true)
  }

  const openEdit = (product: Product) => {
    setEditingProduct(product)
    setForm({ ...product })
    setImageError(false)
    setShowModal(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      updateProduct(editingProduct.id, form)
    } else {
      addProduct(form)
    }
    setShowModal(false)
  }

  const handleDelete = () => {
    if (showDelete) {
      deleteProduct(showDelete.id)
      setShowDelete(null)
    }
  }

  const updateFormField = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-white">Productos</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-[#7C9A6B] px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-[#6B8560]"
        >
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </button>
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#141414] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7C9A6B]"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#141414] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
        >
          <option value="">Todas las categorias</option>
          {categoryOptions.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-[#141414]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1A1A1A]">
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">Imagen</th>
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">Nombre</th>
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">Categoria</th>
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">Precio</th>
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">Stock</th>
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/40">Destacado</th>
              <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-white/40">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                <td className="px-5 py-4">
                  <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                </td>
                <td className="px-5 py-4">
                  <p className="text-white">{product.name}</p>
                  <p className="text-xs text-white/40">{product.brand}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-[#7C9A6B]/15 px-3 py-1 text-xs text-[#7C9A6B] capitalize">
                    {product.category}
                  </span>
                </td>
                <td className="px-5 py-4 font-mono text-white">S/ {product.price}</td>
                <td className="px-5 py-4">
                  <span className={product.stock === 0 ? 'text-red-400' : product.stock < 10 ? 'text-[#D4A853]' : 'text-white'}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => toggleProductFeatured(product.id)}
                    className={`h-5 w-9 rounded-full transition-colors ${product.featured ? 'bg-[#7C9A6B]' : 'bg-white/20'}`}
                  >
                    <div className={`h-4 w-4 rounded-full bg-white transition-transform ${product.featured ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(product)} className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => setShowDelete(product)} className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-white/40">No se encontraron productos</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 py-8">
          <div className="max-h-[90vh] w-full max-w-[640px] overflow-y-auto rounded-2xl bg-[#141414] border border-white/10">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#141414] p-6">
              <h3 className="text-xl font-medium text-white">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              <div>
                <p className="text-sm font-medium text-white">Informacion Basica</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs text-white/50">Nombre *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateFormField('name', e.target.value)}
                      required
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50">Marca *</label>
                    <input
                      type="text"
                      value={form.brand}
                      onChange={(e) => updateFormField('brand', e.target.value)}
                      required
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50">Categoria *</label>
                    <select
                      value={form.category}
                      onChange={(e) => updateFormField('category', e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B] capitalize"
                    >
                      {categoryOptions.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/50">Descripcion</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => updateFormField('description', e.target.value)}
                      rows={4}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-white">Precio y Stock</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50">Precio *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => updateFormField('price', Number(e.target.value))}
                      required
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50">Stock *</label>
                    <input
                      type="number"
                      min="0"
                      value={form.stock}
                      onChange={(e) => updateFormField('stock', Number(e.target.value))}
                      required
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => updateFormField('featured', e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 text-[#7C9A6B]"
                  />
                  <label className="text-sm text-white/70">Producto destacado</label>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-white">Detalles</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs text-white/50">Sabor</label>
                    <input
                      type="text"
                      value={form.flavor}
                      onChange={(e) => updateFormField('flavor', e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50">Nicotina (mg)</label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.nicotine || ''}
                      onChange={(e) => updateFormField('nicotine', e.target.value ? Number(e.target.value) : undefined)}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="text-xs text-white/50">Imagen URL (Supabase Storage o externa)</label>
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) => {
                        updateFormField('image', e.target.value)
                        setImageError(false)
                      }}
                      placeholder="https://tu-proyecto.supabase.co/storage/v1/object/public/..."
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C9A6B]"
                    />
                    
                    {/* Image Preview & Info */}
                    <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                      <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#1A1A1A] h-32 w-32">
                        {form.image && !imageError ? (
                          <img
                            src={form.image}
                            alt="Vista previa"
                            className="h-full w-full object-cover"
                            onError={() => setImageError(true)}
                          />
                        ) : (
                          <div className="flex flex-col items-center text-white/20">
                            <ImageIcon className="h-8 w-8 mb-2" />
                            <span className="text-[10px] uppercase tracking-wider">Sin imagen</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-3">
                        {(!form.image || imageError) && (
                          <div className="flex items-start gap-2 rounded-lg bg-[#D4A853]/10 p-3 text-sm text-[#D4A853]">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                            <p>
                              {!form.image 
                                ? 'No has ingresado ninguna URL para la imagen del producto.' 
                                : 'La URL ingresada no parece ser una imagen valida o no es publica.'}
                            </p>
                          </div>
                        )}
                        
                        <div className="rounded-lg border border-white/5 bg-white/5 p-3 text-xs text-white/60">
                          <div className="flex items-center gap-2 mb-2 font-medium text-white/80">
                            <Info className="h-4 w-4" /> Recomendaciones:
                          </div>
                          <ul className="list-inside list-disc space-y-1 ml-1">
                            <li>Medida recomendada: <strong>1200 x 1200 px</strong></li>
                            <li>Formato recomendado: <strong>JPG, PNG o WEBP</strong></li>
                            <li>Peso maximo recomendado: <strong>3 MB</strong></li>
                            <li>Usa imagen cuadrada, producto centrado y fondo limpio.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 flex gap-3 border-t border-white/10 bg-[#141414] pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-white/10 py-3 text-sm text-white transition-colors hover:bg-white/5"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#7C9A6B] py-3 text-sm font-medium text-black transition-all hover:bg-[#6B8560]"
                >
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5">
          <div className="w-full max-w-sm rounded-2xl bg-[#141414] border border-white/10 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
              <Trash2 className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">Eliminar Producto</h3>
            <p className="mt-2 text-sm text-white/60">
              Estas seguro de eliminar <strong className="text-white">{showDelete.name}</strong>? Esta accion no se puede deshacer.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowDelete(null)}
                className="flex-1 rounded-xl border border-white/10 py-3 text-sm text-white transition-colors hover:bg-white/5"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-medium text-white transition-colors hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
