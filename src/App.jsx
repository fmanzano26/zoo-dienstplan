
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Staff from './pages/Staff'
import Manager from './pages/Manager'
import Header from './components/Header'

export default function App(){
  const [lang, setLang] = useState('de');
  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/staff" element={<Staff lang={lang} />} />
          <Route path="/manager" element={<Manager lang={lang} />} />
        </Routes>
      </div>
    </>
  )
}
