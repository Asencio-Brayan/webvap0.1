import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const tabs = [
  { id: 'privacidad', label: 'Privacidad' },
  { id: 'terminos', label: 'Terminos' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'cambios', label: 'Cambios' },
  { id: 'edad', label: 'Edad' },
]

const content: Record<string, { title: string; body: React.ReactNode }> = {
  privacidad: {
    title: 'Politica de Privacidad',
    body: (
      <>
        <p>VapeQuest Peru recopila datos personales (nombre, DNI, direccion, telefono) unicamente para procesar pedidos y coordinar entregas.</p>
        <h4 className="mt-6 text-lg font-medium text-white">Uso de la informacion</h4>
        <p className="mt-2">No compartimos informacion con terceros excepto repartidores de delivery. Los datos se almacenan de forma segura y se eliminan tras 12 meses de inactividad.</p>
        <h4 className="mt-6 text-lg font-medium text-white">Derechos del usuario</h4>
        <p className="mt-2">El usuario puede solicitar la eliminacion de sus datos en cualquier momento contactandonos por WhatsApp o correo electronico.</p>
        <h4 className="mt-6 text-lg font-medium text-white">Cookies</h4>
        <p className="mt-2">Utilizamos cookies esenciales para el funcionamiento del carrito de compras. No utilizamos cookies de rastreo de terceros.</p>
      </>
    ),
  },
  terminos: {
    title: 'Terminos y Condiciones',
    body: (
      <>
        <p>Al usar este sitio, confirmas ser mayor de 18 anos. Todos los productos son para uso personal. No se permite la reventa.</p>
        <h4 className="mt-6 text-lg font-medium text-white">Precios y disponibilidad</h4>
        <p className="mt-2">Los precios pueden cambiar sin previo aviso. La disponibilidad de productos esta sujeta a stock existente.</p>
        <h4 className="mt-6 text-lg font-medium text-white">Responsabilidad</h4>
        <p className="mt-2">VapeQuest Peru no se hace responsable por el uso indebido de los productos. La nicotina es una sustancia adictiva. Consulta a un profesional de salud antes de usar.</p>
        <h4 className="mt-6 text-lg font-medium text-white">Propiedad intelectual</h4>
        <p className="mt-2">Todos los contenidos de este sitio son propiedad de VapeQuest Peru. Queda prohibida su reproduccion sin autorizacion.</p>
      </>
    ),
  },
  delivery: {
    title: 'Politica de Delivery',
    body: (
      <>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 text-left text-white/60">Zona</th>
                <th className="py-3 text-left text-white/60">Costo</th>
                <th className="py-3 text-left text-white/60">Tiempo estimado</th>
              </tr>
            </thead>
            <tbody>
              {[
                { zone: 'Lima', cost: 'S/ 10', time: '2-4 horas' },
                { zone: 'Canete', cost: 'S/ 15', time: '4-6 horas' },
                { zone: 'Chincha', cost: 'S/ 18', time: '6-8 horas' },
                { zone: 'Ica', cost: 'S/ 20', time: '8-12 horas' },
              ].map((row) => (
                <tr key={row.zone} className="border-b border-white/5">
                  <td className="py-3 text-white">{row.zone}</td>
                  <td className="py-3 text-[#7C9A6B]">{row.cost}</td>
                  <td className="py-3 text-white/70">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h4 className="mt-6 text-lg font-medium text-white">Horario de entrega</h4>
        <p className="mt-2">Lunes a Sabado, 10:00 AM - 8:00 PM. No realizamos entregas los domingos ni feriados.</p>
        <h4 className="mt-6 text-lg font-medium text-white">Verificacion de edad</h4>
        <p className="mt-2">La edad del comprador sera verificada al momento de la entrega con DNI original. Si no se puede verificar la edad, el pedido sera cancelado sin reembolso del delivery.</p>
      </>
    ),
  },
  cambios: {
    title: 'Cambios y Devoluciones',
    body: (
      <>
        <p>Solo aceptamos devoluciones de productos con defecto de fabricacion.</p>
        <h4 className="mt-6 text-lg font-medium text-white">Condiciones</h4>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>El plazo para solicitar cambios es de 7 dias calendario desde la entrega.</li>
          <li>El producto debe estar sin usar, con empaque original sellado.</li>
          <li>No se aceptan devoluciones de liquidos abiertos o dispositivos usados por higiene.</li>
        </ul>
        <h4 className="mt-6 text-lg font-medium text-white">Proceso</h4>
        <p className="mt-2">Contactanos por WhatsApp para iniciar un proceso de cambio. Te indicaremos los pasos a seguir segun el tipo de producto.</p>
      </>
    ),
  },
  edad: {
    title: 'Aviso de Venta para Mayores de 18',
    body: (
      <>
        <div className="rounded-xl border border-[#D4A853]/30 bg-[#D4A853]/10 p-6">
          <p className="text-lg font-medium text-[#D4A853]">Venta exclusiva para mayores de 18 anos.</p>
        </div>
        <h4 className="mt-6 text-lg font-medium text-white">Verificacion</h4>
        <p className="mt-2">Se verifica la edad al momento de la entrega con documento de identidad original. Si el comprador no puede demostrar ser mayor de edad, el pedido sera cancelado.</p>
        <h4 className="mt-6 text-lg font-medium text-white">Contenido del sitio</h4>
        <p className="mt-2">Este sitio web no esta dirigido a menores de edad. No utilizamos diseno, colores o lenguaje atractivo para menores.</p>
        <h4 className="mt-6 text-lg font-medium text-white">Advertencia sanitaria</h4>
        <p className="mt-2">Los productos con nicotina son adictivos. No fumar es la opcion mas saludable. Si no eres fumador, no inicies.</p>
      </>
    ),
  },
}

export default function PoliticasPage() {
  const [activeTab, setActiveTab] = useState('privacidad')
  const [openAccordion, setOpenAccordion] = useState<string | null>('privacidad')

  return (
    <>
      <div className="bg-[#141414] pt-28 pb-10 md:pt-32">
        <div className="mx-auto max-w-4xl px-5 md:px-12">
          <h1 className="font-display text-4xl text-white md:text-5xl">Politicas</h1>
          <p className="mt-2 text-lg text-white/70">Informacion importante sobre nuestros servicios</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-16 md:px-12">
        {/* Desktop tabs */}
        <div className="hidden overflow-x-auto border-b border-white/10 md:block">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[#7C9A6B] text-white'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop content */}
        <div className="hidden pt-8 md:block">
          <h2 className="font-display text-3xl text-white">{content[activeTab].title}</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-[1.8] text-white/70">
            {content[activeTab].body}
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="space-y-3 md:hidden">
          {tabs.map((tab) => (
            <div key={tab.id} className="rounded-xl border border-white/10 bg-[#141414]">
              <button
                onClick={() => setOpenAccordion(openAccordion === tab.id ? null : tab.id)}
                className="flex w-full items-center justify-between p-5"
              >
                <span className="font-medium text-white">{tab.label}</span>
                <ChevronDown className={`h-5 w-5 text-white/50 transition-transform ${openAccordion === tab.id ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === tab.id && (
                <div className="border-t border-white/10 px-5 pb-5 pt-4">
                  <div className="space-y-4 text-[15px] leading-[1.8] text-white/70">
                    {content[tab.id].body}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
