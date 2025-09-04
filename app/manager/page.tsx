'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PasswordGate from '@/components/PasswordGate'
import { t } from '@/lib/i18n'

type Row = { timestamp: string; name: string; position: string; dates: string; note?: string }

export default function ManagerPage({ searchParams }:{
  searchParams: { [key:string]: string | string[] | undefined }
}) {
  const lang = (searchParams?.lang === 'es' ? 'es' : 'de') as 'de' | 'es'
  const tr = t(lang)
  const [unlocked, setUnlocked] = useState(false)
  const [rows, setRows] = useState<Row[]>([])
  const router = useRouter()

  // Limpia el "login" cuando se abandona la página (seguridad)
  useEffect(() => {
    if (!unlocked) return
    const fetchRows = async () => {
      const res = await fetch('/api/list', { headers: { Authorization: 'Bearer zoo2025' } })
      const j = await res.json()
      if (res.ok) setRows(j.rows)
    }
    fetchRows()

    // cleanup -> al salir, borrar el token local
    return () => { if (typeof window !== 'undefined') localStorage.removeItem('zoo_manager_unlocked') }
  }, [unlocked])

  function exportCSV() {
    const header = ['timestamp','name','position','dates','note']
    const lines = [header.join(',')].concat(rows.map(r => [r.timestamp,r.name,r.position,r.dates,r.note??''].map(v=>`"${(v||'').replace(/"/g,'""')}"`).join(',')))
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a')
    a.href = url; a.download = 'zoo-submissions.csv'; a.click(); URL.revokeObjectURL(url)
  }

  function goBackAndLogout() {
    if (typeof window !== 'undefined') localStorage.removeItem('zoo_manager_unlocked')
    router.push(`/?lang=${lang}`)
  }

  if (!unlocked)
    return <PasswordGate onUnlock={() => setUnlocked(true)} lang={lang} />

  return (
    <div className="pt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={goBackAndLogout}
            className="rounded-xl border border-zoo-border bg-zoo-card px-4 py-2 hover:border-white/30"
            title={lang === 'de' ? 'Zurück' : 'Atrás'}
          >
            {lang === 'de' ? 'Zurück' : 'Atrás'}
          </button>
          <h2 className="text-xl font-semibold">{tr.manager_title}</h2>
        </div>
        <button onClick={exportCSV} className="rounded-xl bg-zoo-cyan text-black font-semibold px-4 py-2 hover:shadow-neon">
          {tr.export_csv}
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zoo-border">
        <table className="min-w-full bg-zoo-card">
          <thead className="text-left text-sm opacity-80">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">{lang === 'de' ? 'Position' : 'Puesto'}</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3">{lang === 'de' ? 'Notiz' : 'Nota'}</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((r,i)=>(
              <tr key={i} className="border-t border-zoo-border/60">
                <td className="px-4 py-3">{r.timestamp}</td>
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.position}</td>
                <td className="px-4 py-3">{r.dates}</td>
                <td className="px-4 py-3">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
