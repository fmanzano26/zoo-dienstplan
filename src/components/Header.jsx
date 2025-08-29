
import React from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
export default function Header({lang, setLang}){
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/70 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-neon logoNeonText select-none">Zoo</Link>
        <div className="LanguageSwitch"><LanguageSwitcher lang={lang} setLang={setLang} /></div>
      </div>
    </header>
  )
}
