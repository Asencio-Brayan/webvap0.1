import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdminStore } from '@/stores/adminStore'

export default function AdminLoginPage() {
  const login = useAdminStore((s) => s.login)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Por favor ingrese correo y contraseña')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const result = await login(email, password)
      if (result && result.success) {
        navigate('/admin/dashboard', { replace: true })
      } else {
        setError(result?.error || 'Error al iniciar sesión')
      }
    } catch (e) {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-5">
      <div
        className="w-full max-w-[420px] rounded-[20px] border border-white/10 bg-[#141414] p-10 md:p-12"
        style={{ animation: 'fadeSlideUp 500ms cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.12em] text-white">
            VAPEQUEST <span className="text-[#7C9A6B]">ADMIN</span>
          </p>
          <h1 className="mt-6 font-display text-2xl text-white md:text-[28px]">
            Panel de Administracion
          </h1>
          <p className="mt-2 text-[15px] text-white/60">
            Acceso exclusivo para administradores
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500 text-center">
              {error}
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="admin@vapequest.pe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7C9A6B]"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3.5 pr-12 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7C9A6B]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#7C9A6B] py-4 text-sm font-medium text-black transition-all hover:bg-[#6B8560] disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Cargando...
              </span>
            ) : (
              'Iniciar Sesion'
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-white/30">
          Autenticacion visual — conectar backend para produccion.
        </p>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-[#7C9A6B] hover:text-[#9AB88A]"
        >
          Volver a la tienda
        </Link>
      </div>

      <style>{`@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}
