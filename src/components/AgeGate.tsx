import { useEffect, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'

export default function AgeGate() {
  const { isAgeVerified, verifyAge } = useUIStore()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isAgeVerified) {
      const timer = setTimeout(() => setVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isAgeVerified])

  if (isAgeVerified || !visible) return null

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      style={{ background: 'rgba(10, 10, 10, 0.97)' }}
    >
      <div
        className="mx-5 w-full max-w-[520px] rounded-[20px] p-10 text-center"
        style={{
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.1)',
          animation: 'fadeSlideUp 500ms ease-out forwards',
        }}
      >
        <ShieldCheck className="mx-auto h-12 w-12 text-[#7C9A6B]" />
        <h2 className="font-display mt-6 text-3xl text-white md:text-4xl">
          Verificacion de Edad
        </h2>
        <p className="mt-4 text-lg text-white/70">
          Este sitio contiene productos con nicotina destinados exclusivamente a adultos.
        </p>
        <button
          onClick={verifyAge}
          className="mt-8 w-full rounded-xl bg-[#7C9A6B] py-4 text-sm font-medium tracking-wide text-black transition-all hover:bg-[#6B8560] hover:scale-[1.02] active:scale-[0.98]"
        >
          SOY MAYOR DE 18 ANOS
        </button>
        <button
          onClick={() => window.location.href = 'https://www.google.com/search?q=adiccion+nicotina+ayuda'}
          className="mt-3 w-full rounded-xl border border-white/10 bg-transparent py-3.5 text-sm font-medium tracking-wide text-white transition-all hover:bg-white/5"
        >
          Soy menor de 18 anos
        </button>
        <p className="mt-6 text-xs text-white/40">
          Al ingresar confirmas que eres mayor de edad y aceptas nuestros terminos y condiciones.
        </p>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
