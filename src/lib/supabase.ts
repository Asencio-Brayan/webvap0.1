import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log("--- SUPABASE DIAGNÓSTICO ---")
console.log("VITE_SUPABASE_URL =", supabaseUrl)
console.log("VITE_SUPABASE_ANON_KEY exists =", !!supabaseAnonKey)
console.log("----------------------------")

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = "Faltan las variables de entorno de Supabase. Asegúrate de configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env o en Vercel.";
  console.error(errorMsg);
  throw new Error(errorMsg);
}

if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  const errorMsg = `La URL de Supabase proporcionada es inválida: "${supabaseUrl}". Debe comenzar con http:// o https://`;
  console.error(errorMsg);
  throw new Error(errorMsg);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
