import { AlertTriangle, X } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'

export default function AgeBanner() {
  const { ageBannerDismissed, dismissAgeBanner } = useUIStore()

  if (ageBannerDismissed) return null

  return (
    <div className="sticky top-0 z-[70] border-b border-[#D4A853]/20 bg-[#D4A853]/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-12">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-[#D4A853]" />
          <p className="text-xs text-[#D4A853] md:text-sm">
            VENTA EXCLUSIVA PARA MAYORES DE 18 ANOS. La edad sera verificada al momento de la entrega.
          </p>
        </div>
        <button
          onClick={dismissAgeBanner}
          className="ml-3 shrink-0 text-[#D4A853] transition-opacity hover:opacity-70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
