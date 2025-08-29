
import React from 'react'
export default function LanguageSwitcher({lang,setLang}){
  return (
    <button className="rounded-xl px-4 py-2 text-sm flex items-center gap-2 bg-panel border border-white/10 hover:border-neon/50 transition"
      onClick={()=>setLang(lang==='de'?'es':'de')}>
      <span>{lang==='de'?'DE':'ES'}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  )
}
