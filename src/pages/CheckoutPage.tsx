import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'

const cities = [
  { name: 'Lima' as const, cost: 10 },
  { name: 'Canete' as const, cost: 15 },
  { name: 'Chincha' as const, cost: 18 },
  { name: 'Ica' as const, cost: 20 },
]

const paymentMethods = [
  { value: 'yape', label: 'Yape' },
  { value: 'plin', label: 'Plin' },
  { value: 'transferencia', label: 'Transferencia bancaria' },
  { value: 'contraentrega', label: 'Contraentrega' },
]

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '51950332871'

interface FormErrors {
  [key: string]: string
}

export default function CheckoutPage() {
  const { items, deliveryCity, setDeliveryCity, getSubtotal, getDeliveryCost, getTotal, clearCart } = useCartStore()
  const [errors, setErrors] = useState<FormErrors>({})
  const [form, setForm] = useState({
    fullName: '',
    dni: '',
    phone: '',
    city: deliveryCity,
    district: '',
    address: '',
    reference: '',
    paymentMethod: 'yape',
    ageConfirmed: false,
    comments: '',
  })

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => { const next = { ...prev }; delete next[field]; return next })
    }
  }

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!form.fullName.trim() || form.fullName.length < 2) errs.fullName = 'Nombre completo es requerido'
    if (!form.dni.trim() || form.dni.length < 8) errs.dni = 'DNI debe tener al menos 8 digitos'
    if (!form.phone.trim() || !/^\+?\d{9,12}$/.test(form.phone)) errs.phone = 'Numero de celular invalido'
    if (!form.district.trim()) errs.district = 'Distrito es requerido'
    if (!form.address.trim() || form.address.length < 5) errs.address = 'Direccion completa es requerida'
    if (!form.ageConfirmed) errs.ageConfirmed = 'Debes confirmar que eres mayor de 18 anos'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const generateWhatsAppMessage = (): string => {
    const itemsText = items.map((item, i) =>
      `${i + 1}. ${item.name} x${item.quantity} - S/ ${item.price * item.quantity}`
    ).join('\n')

    return `*NUEVO PEDIDO - VAPEQUEST*%0A%0A` +
      `*Datos del Cliente:*%0A` +
      `Nombre: ${form.fullName}%0A` +
      `DNI: ${form.dni}%0A` +
      `Celular: ${form.phone}%0A%0A` +
      `*Datos de Entrega:*%0A` +
      `Ciudad: ${form.city}%0A` +
      `Distrito: ${form.district}%0A` +
      `Direccion: ${form.address}%0A` +
      `Referencia: ${form.reference || 'N/A'}%0A%0A` +
      `*Productos:*%0A${itemsText}%0A%0A` +
      `*Resumen:*%0A` +
      `Subtotal: S/ ${getSubtotal()}%0A` +
      `Delivery (${form.city}): S/ ${getDeliveryCost()}%0A` +
      `*Total: S/ ${getTotal()}*%0A%0A` +
      `*Pago:* ${form.paymentMethod}%0A%0A` +
      `*Confirmo que soy mayor de 18 anos.*%0A` +
      `La edad sera verificada al momento de la entrega.%0A%0A` +
      `Comentarios: ${form.comments || 'Ninguno'}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const message = generateWhatsAppMessage()
    clearCart()
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-32 text-center md:px-12">
        <h2 className="font-display text-3xl text-white">Tu carrito esta vacio</h2>
        <p className="mt-2 text-white/60">Agrega productos para continuar con tu pedido.</p>
        <Link to="/catalogo" className="mt-6 inline-block rounded-xl bg-[#7C9A6B] px-8 py-3 text-sm font-medium text-black">
          Ver Catalogo
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="bg-[#141414] pt-28 pb-10 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-12">
          <h1 className="font-display text-4xl text-white md:text-5xl">Checkout</h1>
          <p className="mt-2 text-lg text-white/70">Completa tus datos para enviar el pedido</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[55%_45%]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal */}
            <div className="rounded-2xl bg-[#141414] p-6 md:p-8">
              <h3 className="text-lg font-medium text-white">Datos Personales</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <label className="text-sm text-white/70">Nombre completo *</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Tu nombre completo"
                    className={`mt-1.5 w-full rounded-xl border bg-[#1A1A1A] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7C9A6B] focus:ring-1 focus:ring-[#7C9A6B]/20 ${errors.fullName ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="text-sm text-white/70">DNI / Documento *</label>
                  <input
                    type="text"
                    value={form.dni}
                    onChange={(e) => handleChange('dni', e.target.value)}
                    placeholder="Numero de DNI"
                    className={`mt-1.5 w-full rounded-xl border bg-[#1A1A1A] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7C9A6B] ${errors.dni ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {errors.dni && <p className="mt-1 text-xs text-red-400">{errors.dni}</p>}
                  <p className="mt-1 text-xs text-white/40">Sera verificado al momento de la entrega</p>
                </div>
                <div>
                  <label className="text-sm text-white/70">Celular *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+51 999 999 999"
                    className={`mt-1.5 w-full rounded-xl border bg-[#1A1A1A] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7C9A6B] ${errors.phone ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="rounded-2xl bg-[#141414] p-6 md:p-8">
              <h3 className="text-lg font-medium text-white">Datos de Entrega</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <label className="text-sm text-white/70">Ciudad *</label>
                  <select
                    value={form.city}
                    onChange={(e) => {
                      handleChange('city', e.target.value)
                      setDeliveryCity(e.target.value as 'Lima' | 'Canete' | 'Chincha' | 'Ica')
                    }}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm text-white outline-none focus:border-[#7C9A6B]"
                  >
                    {cities.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-white/70">Distrito / Zona *</label>
                  <input
                    type="text"
                    value={form.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    placeholder="Ej: Miraflores, San Isidro..."
                    className={`mt-1.5 w-full rounded-xl border bg-[#1A1A1A] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7C9A6B] ${errors.district ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {errors.district && <p className="mt-1 text-xs text-red-400">{errors.district}</p>}
                </div>
                <div>
                  <label className="text-sm text-white/70">Direccion *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Calle, numero, interior..."
                    className={`mt-1.5 w-full rounded-xl border bg-[#1A1A1A] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7C9A6B] ${errors.address ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
                </div>
                <div>
                  <label className="text-sm text-white/70">Referencia</label>
                  <textarea
                    value={form.reference}
                    onChange={(e) => handleChange('reference', e.target.value)}
                    placeholder="Cerca de..., porton azul, etc."
                    rows={3}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7C9A6B]"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl bg-[#141414] p-6 md:p-8">
              <h3 className="text-lg font-medium text-white">Metodo de Pago</h3>
              <div className="mt-5 space-y-3">
                {paymentMethods.map((method) => (
                  <label key={method.value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 p-4 transition-colors hover:bg-white/[0.02]">
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={form.paymentMethod === method.value}
                      onChange={(e) => handleChange('paymentMethod', e.target.value)}
                      className="h-4 w-4 text-[#7C9A6B] focus:ring-[#7C9A6B]"
                    />
                    <span className="text-sm text-white">{method.label}</span>
                  </label>
                ))}
              </div>
              {form.paymentMethod !== 'contraentrega' && (
                <div className="mt-4 rounded-xl border border-[#D4A853]/20 bg-[#D4A853]/10 p-4">
                  <p className="text-sm text-[#D4A853]">
                    Te enviaremos los datos de pago (numero de Yape/Plin o cuenta bancaria) por WhatsApp al confirmar tu pedido.
                  </p>
                </div>
              )}
            </div>

            {/* Age confirmation */}
            <div className="rounded-2xl bg-[#141414] p-6 md:p-8">
              <h3 className="text-lg font-medium text-white">Confirmacion</h3>
              <div className="mt-5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={form.ageConfirmed}
                    onChange={(e) => handleChange('ageConfirmed', e.target.checked)}
                    className={`mt-0.5 h-4 w-4 rounded text-[#7C9A6B] focus:ring-[#7C9A6B] ${errors.ageConfirmed ? 'border-red-500' : 'border-white/20'}`}
                  />
                  <span className="text-[15px] leading-relaxed text-white">
                    Confirmo que soy mayor de 18 anos y acepto que mi edad sera verificada al momento de la entrega.
                  </span>
                </label>
                {errors.ageConfirmed && <p className="mt-2 text-xs text-red-400">{errors.ageConfirmed}</p>}

                <div className="mt-4">
                  <label className="text-sm text-white/70">Comentarios adicionales</label>
                  <textarea
                    value={form.comments}
                    onChange={(e) => handleChange('comments', e.target.value)}
                    placeholder="Comentarios adicionales sobre tu pedido..."
                    rows={3}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7C9A6B]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#25D366] py-4 text-sm font-medium text-white transition-all hover:bg-[#1DA851] flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar Pedido por WhatsApp
            </button>
          </form>

          {/* Summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-[#141414] p-6 md:p-8">
              <h3 className="text-xl font-medium text-white">Tu Pedido</h3>

              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm text-white">{item.name}</p>
                      <p className="text-xs text-white/50">{item.quantity} x S/ {item.price}</p>
                    </div>
                    <span className="font-mono text-sm text-white">S/ {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="my-5 h-px bg-white/10" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Subtotal</span>
                  <span className="text-white">S/ {getSubtotal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Delivery ({deliveryCity})</span>
                  <span className="text-white">S/ {getDeliveryCost()}</span>
                </div>
              </div>

              <div className="my-4 h-px bg-white/10" />

              <div className="flex justify-between">
                <span className="text-xl font-medium text-white">Total</span>
                <span className="font-mono text-2xl text-[#7C9A6B]">S/ {getTotal()}</span>
              </div>

              <p className="mt-5 text-xs text-white/50">
                Tu pedido sera confirmado via WhatsApp. Delivery estimado segun tu zona seleccionada.
              </p>

              <div className="mt-4 flex items-start gap-2 rounded-lg border border-[#D4A853]/20 bg-[#D4A853]/10 p-3">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4A853]" />
                <p className="text-xs text-[#D4A853]">
                  Recuerda: Debes presentar tu DNI original al recibir el pedido. Solo mayores de 18 anos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
