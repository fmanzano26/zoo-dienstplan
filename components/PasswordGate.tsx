'use client'
import { useEffect, useState } from 'react'

export default function PasswordGate({ onUnlock, lang }:{ onUnlock: ()=>void, lang: 'de' | 'es' }) {
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  function submit() {
    if (pw === 'zoo2025') {
      setErr(null)
      onUnlock()
      if (typeof window !== 'undefined') localStorage.setItem('zoo_manager_unlocked','1')
    } else {
      setErr(lang === 'de' ? 'Falsches Passwort.' : 'Contraseña incorrecta.')
    }
  }

  useEffect(()=>{
    if (typeof window !== 'undefined' && localStorage.getItem('zoo_manager_unlocked') === '1') {
      onUnlock()
    }
  }, [onUnlock])

  return (
    <div className="min-h-[70vh] flex items-start justify-center pt-16">
      <div className="w-full max-w-lg rounded-3xl border border-zoo-border/80 bg-zoo-card/80 p-8 shadow-[0_0_0_1px_rgba(103,247,255,0.06)]">
        <label className="mb-3 block text-sm opacity-90">{lang === 'de' ? 'Passwort eingeben' : 'Introduce la contraseña'}</label>
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            value={pw}
            onChange={e=>setPw(e.target.value)}
            onKeyDown={(e)=>{ if(e.key==='Enter') submit() }}
            className="w-full rounded-2xl border border-zoo-border bg-[#0E1526] px-4 py-4 pr-12 focus:outline-none focus:border-zoo-cyan/60 focus:shadow-[0_0_0_3px_rgba(103,247,255,0.15)] transition"
          />
          <button
            type="button"
            onClick={()=>setShow(v=>!v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl px-2 py-1 hover:bg-white/5"
            aria-label={show ? (lang==='de'?'Passwort verbergen':'Ocultar contraseña') : (lang==='de'?'Passwort anzeigen':'Ver contraseña')}
            title={show ? (lang==='de'?'Passwort verbergen':'Ocultar contraseña') : (lang==='de'?'Passwort anzeigen':'Ver contraseña')}
          >
            {/* simple eye icon */}
            {show ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.74-1.76 2-3.47 3.56-4.9M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.89 11 8- .46 1.09-1.12 2.13-1.94 3.06"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        <button onClick={submit} className="mt-5 w-full rounded-2xl bg-zoo-cyan text-black font-semibold px-5 py-3 hover:shadow-neon transition">
          {lang === 'de' ? 'Öffnen' : 'Entrar'}
        </button>
        {err && <p className="pt-3 text-sm text-red-300">{err}</p>}
      </div>
    </div>
  )
}
