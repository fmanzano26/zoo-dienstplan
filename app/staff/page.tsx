'use client'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import Calendar from '@/components/Calendar'
import { positions, t } from '@/lib/i18n'

type Submission = { name: string; position: string; dates: string[]; note?: string; lang: 'de' | 'es' }

export default function StaffPage({ searchParams }:{
  searchParams: { [key:string]: string | string[] | undefined }
}) {
  const lang = (searchParams?.lang === 'es' ? 'es' : 'de') as 'de' | 'es'
  const tr = t(lang)

  // Ventana de envío: 1–22 del mes actual
  const today = dayjs()
  const submissionOpen = useMemo(() => today.date() <= 22, [today])

  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [dates, setDates] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  async function submit() {
    setMsg(null)
    if (!submissionOpen) { setMsg(tr.window_closed); return }
    if (!name.trim() || !position.trim() || dates.length === 0) {
      setMsg(tr.required_err); return
    }
    setSending(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), position, dates, note: note.trim() || undefined, lang } as Submission)
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

        {/* AVISO entre “Puesto” y el calendario – sin borde, icono a color */}
        <div
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm mt-1
            ${submissionOpen ? 'bg-white/4' : 'bg-yellow-400/12'}`}
        >
          {/* Icono calendario con degradado (neon cyan/menta) */}
          <svg
            width="22" height="22" viewBox="0 0 24 24"
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="calgrad-staff" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#67F7FF"/>
                <stop offset="100%" stopColor="#7CF2D8"/>
              </linearGradient>
            </defs>
            {/* cuerpo */}
            <rect x="3" y="4" width="18" height="17" rx="4" fill="url(#calgrad-staff)" opacity="0.18"/>
            {/* barra superior */}
            <rect x="3" y="4" width="18" height="4" rx="2" fill="url(#calgrad-staff)"/>
            {/* anillas */}
            <rect x="7" y="2" width="2.5" height="4" rx="1.25" fill="url(#calgrad-staff)"/>
            <rect x="14.5" y="2" width="2.5" height="4" rx="1.25" fill="url(#calgrad-staff)"/>
            {/* línea división */}
            <rect x="3" y="9.5" width="18" height="1.2" fill="url(#calgrad-staff)" opacity="0.9"/>
            {/* “días” */}
            <circle cx="8" cy="14.5" r="1.3" fill="url(#calgrad-staff)"/>
            <circle cx="12" cy="14.5" r="1.3" fill="url(#calgrad-staff)"/>
            <circle cx="16" cy="14.5" r="1.3" fill="url(#calgrad-staff)"/>
          </svg>

          <p className="opacity-90">{submissionOpen ? tr.window_notice : tr.window_closed}</p>
        </div>

        {/* CALENDARIO: SIEMPRE PRÓXIMO MES (y permite 1ª semana del siguiente) */}
        <Calendar
          lang={lang}
          value={dates}
          onChange={setDates}
          month={dayjs().add(1, 'month')}
        />

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
            disabled={sending || !submissionOpen}
            title={!submissionOpen ? (lang === 'de' ? 'Nur 1.–22. verfügbar' : 'Disponible del 1 al 22') : undefined}
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
