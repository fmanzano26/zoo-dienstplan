'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [lang, setLang] = useState<'de' | 'es'>('de')

  useEffect(() => {
    const q = params.get('lang') as 'de' | 'es' | null
    const saved = (typeof window !== 'undefined' && localStorage.getItem('lang')) as 'de' | 'es' | null
    setLang(q ?? saved ?? 'de')
  }, [params])

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value as 'de' | 'es'
    setLang(v)
    if (typeof window !== 'undefined') localStorage.setItem('lang', v)
    const search = new URLSearchParams(params.toString())
    search.set('lang', v)
    router.push(`${pathname}?${search.toString()}`)
  }

  return (
    <select value={lang} onChange={onChange} className="rounded-lg border border-zoo-border bg-zoo-card px-3 py-2 text-sm text-zoo-text">
      <option value="de">DE</option>
      <option value="es">ES</option>
    </select>
  )
}
