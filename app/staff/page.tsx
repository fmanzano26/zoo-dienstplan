'use client'
import { useState } from 'react'
import Calendar from '@/components/Calendar'
import { positions, t } from '@/lib/i18n'

type Submission = { name: string; position: string; dates: string[]; note?: string; lang: 'de' | 'es' }

export default function StaffPage({ searchParams }:{
  searchParams: { [key:string]: string | string[] | undefined }
}) {
  const lang = (searchParams?.lang === 'es' ? 'es' : 'de') as 'de' | 'es'
  const tr = t(lang)

  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [dates, setDates] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  async function submit() {
    setMsg(null)
    if (!name.trim() || !position.trim() || dates.length === 0) { setMsg(tr.required_err); return }
    setSending(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), position, dates, note: note.trim() || undefined, lang })
      })
      const j = await res.json()
      if (!res.ok) throw new Error(j.error || 'fail')
      setMsg(tr.submit_ok); setDates([]); setNote('')
    } catch (e:any) {
      const m = (e.message || '').toLowerCase()
      setMsg(m.includes('credentials') ? tr.cred_missing : `${tr.submit_fail} (${e.message})`)
    } finally { setSending(false) }
  }

  return (
    <div className="mx-auto max-w-3xl pt-10">
      <div className="rounded-2xl border border-zoo-border bg-zoo-card p-6 sm:p-8 space-y-6">
        {/* NAME */}
        <div>
          <label className="mb-2 block text-sm opacity-90">{tr.name_label}</label>
          <input
            value={name}
            onChange={e=>setName(e.target.value)}
            className="w-full input-glow"
          />
        </div>

        {/* POSITION */}
        <div>
          <label className="mb-2 block text-sm opacity-90">{tr.position_label}</label>
          <select
            value={position}
            onChange={e=>setPosition(e.target.value)}
            className="w-full appearance-none input-glow"
          >
            <option value="" disabled>{lang === 'de' ? 'Bitte wählen' : 'Seleccione'}</option>
            {positions(lang).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* CALENDAR */}
        <Calendar lang={lang} value={dates} onChange={setDates} />

        {/* NOTE */}
        <div>
          <label className="mb-2 block text-sm opacity-90">{tr.note_label}</label>
          <textarea
            value={note}
            onChange={e=>setNote(e.target.value)}
            rows={4}
            className="w-full input-glow"
          />
        </div>

        {/* ACTIONS */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={submit}
            disabled={sending}
            className="rounded-2xl bg-zoo-cyan text-black font-semibold px-6 py-3 hover:shadow-neon disabled:opacity-60"
          >
            {sending ? (lang === 'de' ? 'Senden…' : 'Enviando…') : tr.submit}
          </button>
        </div>

        {msg && <p className="pt-1 text-sm text-red-300">{msg}</p>}
      </div>
    </div>
  )
}
