
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { dictionaries } from '../lib/i18n'

export default function Home({lang}){
  const t = dictionaries[lang];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Logo />
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link to="/staff" className="card hover:shadow-neon min-w-[360px]">
          <div className="text-lg">{t.staffBtnTitle}</div>
          <div className="text-white/70 mt-1 whitespace-nowrap">{t.staffBtnSub}</div>
        </Link>
        <Link to="/manager" className="card hover:shadow-neon min-w-[360px]">
          <div className="text-lg">{t.managerBtnTitle}</div>
          <div className="text-white/70 mt-1 whitespace-nowrap">{t.managerBtnSub}</div>
        </Link>
      </div>
      <div className="mt-20 text-xs italic text-white/50">{t.createdBy}</div>
    </div>
  )
}
