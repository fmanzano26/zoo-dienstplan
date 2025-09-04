'use client'
import dayjs, { Dayjs } from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import isoWeek from 'dayjs/plugin/isoWeek'
import updateLocale from 'dayjs/plugin/updateLocale'
import { useEffect, useMemo, useState } from 'react'

dayjs.extend(weekday)
dayjs.extend(isoWeek)
dayjs.extend(updateLocale)

const WEEKDAYS = {
  de: ['Mo','Di','Mi','Do','Fr','Sa','So'],
  es: ['Lu','Ma','Mi','Ju','Vi','Sa','Do']
}

const MONTHS = {
  de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
  es: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
}

export type CalendarProps = {
  lang: 'de' | 'es'
  value: string[]
  onChange: (v: string[]) => void
  month?: Dayjs
}

export default function Calendar({ lang, value, onChange, month }: CalendarProps) {
  const [ref, setRef] = useState<Dayjs>(month ?? dayjs())
  useEffect(() => { if (month) setRef(month) }, [month])

  const startOfMonth = ref.startOf('month')
  const endOfMonth = ref.endOf('month')
  const startDate = startOfMonth.startOf('week').add(1, 'day')
  const endDate = endOfMonth.endOf('week').add(1, 'day')

  const days: Dayjs[] = useMemo(() => {
    const arr: Dayjs[] = []; let d = startDate
    while (d.isBefore(endDate)) { arr.push(d); d = d.add(1, 'day') }
    return arr
  }, [startDate, endDate])

  function isSelectable(d: Dayjs) {
    const dow = d.isoWeekday()
    const inMonth = d.month() === ref.month()
    const inFirstWeekNext =
      d.month() === ref.add(1, 'month').month() && d.date() <= 7
    // Permitir Jue/Vie/Sáb del mes visible y, además, la primera semana del mes siguiente
    return (inMonth || inFirstWeekNext) && (dow === 4 || dow === 5 || dow === 6)
  }

  function toggle(d: Dayjs) {
    const key = d.format('YYYY-MM-DD')
    if (!isSelectable(d)) return
    if (value.includes(key)) onChange(value.filter(v => v !== key))
    else onChange([...value, key])
  }

  return (
    <div className="rounded-2xl border border-zoo-border bg-zoo-card p-4 sm:p-6">
      <div className="text-center text-lg font-semibold mb-3">
        {MONTHS[lang][ref.month()]} {ref.year()}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm opacity-80 mb-2">
        {WEEKDAYS[lang].map((l) => <div key={l} className="py-2">{l}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map(d => {
          const key = d.format('YYYY-MM-DD')
          const selected = value.includes(key)
          const selectable = isSelectable(d)
          // Hacer ver en gris si no es seleccionable
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(d)}
              className={[
                "h-12 rounded-xl border text-sm",
                selectable
                  ? (selected
                      ? "bg-zoo-cyan/85 text-black border-transparent"
                      : "bg-white/5 border-white/10 hover:border-white/20")
                  : "bg-white/2.5 border-white/5 opacity-50 cursor-not-allowed",
              ].join(' ')}
            >
              {d.date().toString().padStart(2,'0')}
            </button>
          )
        })}
      </div>
    </div>
  )
}
