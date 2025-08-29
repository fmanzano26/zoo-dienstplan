import React, { useMemo, useState } from 'react'
import { dictionaries, getLabelMonth } from '../lib/i18n'
import { isAfterDeadline } from '../lib/date'
import Calendar from '../components/Calendar'
import { saveSubmission } from '../lib/storage'

export default function Staff({ lang }) {
  const t = dictionaries[lang]
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [comments, setComments] = useState('')
  const current = useMemo(() => new Date(), [])
  const [selected, setSelected] = useState([])
  const [showError, setShowError] = useState(false)

  const monthLabel = getLabelMonth(current, t)
  const closed = isAfterDeadline(new Date())

  function submit() {
    if (closed) { setShowError(true); return }
    const entry = {
      name,
      role,
      comments,
      month: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`,
      days: selected.sort(),
      submittedAt: new Date().toISOString()
    }
    saveSubmission(entry)
    alert(lang === 'de' ? 'Gesendet! Danke.' : '¡Enviado! Gracias.')
    setSelected([])
    setComments('')
    setShowError(false)
  }

  return (
    <div className="min-h-[100svh] overflow-auto p-6 pb-[calc(7rem+env(safe-area-inset-bottom))] max-w-3xl mx-auto">
      {/* Usamos 100svh + overflow-auto + safe-area para un scroll suave en iOS */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{t.staffTitle(monthLabel)}</h1>

      <div className="card mb-24">
        <input
          className="input mb-4"
          placeholder={t.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="input mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">{t.rolePlaceholder}</option>
          {t.roleOptions.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <div className="mb-4">
          <div className="text-center text-2xl font-semibold my-4">{monthLabel}</div>
          <Calendar
            date={current}
            selected={selected}
            setSelected={setSelected}
            weekdayLabels={t.weekdays}
            allowedWeekdays={[3, 4, 5]} // Jueves/Viernes/Sábado
          />
        </div>

        <textarea
          className="input mb-4 h-24 resize-none"
          placeholder={t.commentsPlaceholder}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />

        {/* Nota sutil con icono calendario */}
        <div className="text-white/40 mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>{t.windowNote}</span>
        </div>

        <button className="btn w-full py-4 text-lg" onClick={submit}>
          {t.send}
        </button>

        {closed && showError && (
          <div className="mt-3 text-red-400">{t.closed}</div>
        )}
      </div>

      {/* Espaciador invisible para que el último botón no quede pegado al borde */}
      <div className="h-24" aria-hidden="true" />
    </div>
  )
}

