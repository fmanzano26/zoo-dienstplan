
import React, { useEffect, useState } from 'react'
import { dictionaries } from '../lib/i18n'
import { getAll, clearAll } from '../lib/storage'

const PASSWORD = 'zoo2025';

export default function Manager({lang}){
  const t = dictionaries[lang];
  const [authed, setAuthed] = useState(sessionStorage.getItem('mgr_ok')==='1');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const data = getAll();
  useEffect(()=>{ if(authed) sessionStorage.setItem('mgr_ok','1'); }, [authed])

  function tryLogin(){ if(pw===PASSWORD) setAuthed(true); else alert(t.wrongPassword); }

  function exportCsv(){
    if(!data.length){ alert('No data'); return; }
    const cols=['name','role','month','days','comments','submittedAt'];
    const rows=[cols.join(',')].concat(data.map(r=>cols.map(c=>{
      let v=r[c]; if(Array.isArray(v)) v=v.join(' ');
      if(typeof v==='string'){ v=v.replaceAll('"','""'); if(v.includes(',')||v.includes('\n')) v=`"${v}"`; }
      return v;
    }).join(','))).join('\n');
    const blob=new Blob([rows],{type:'text/csv;charset=utf-8;'});
    const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='zoo_availability.csv'; a.click(); URL.revokeObjectURL(url);
  }

  if(!authed){
    return (
      <div className="min-h-screen p-6 max-w-md mx-auto">
        <div className="card">
          <div className="text-lg mb-2">{t.passwordAsk}</div>
          <div className="relative mb-4">
            <input className="input w-full pr-12" type={showPw?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder={t.passwordAsk} />
            <button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-neon">{showPw?'🙈':'👁️'}</button>
          </div>
          <button className="btn w-full" onClick={tryLogin}>OK</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Manager</h1>
      <div className="card overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-white/70">
            <tr>{t.managerCols.map((c,i)=><th key={i} className="py-2 pr-4">{c}</th>)}</tr>
          </thead>
          <tbody>
            {data.map((r,i)=>(
              <tr key={i} className="border-t border-white/10">
                <td className="py-2 pr-4">{r.name}</td>
                <td className="py-2 pr-4">{r.role}</td>
                <td className="py-2 pr-4">{r.month}</td>
                <td className="py-2 pr-4">{Array.isArray(r.days)?r.days.join(' '):''}</td>
                <td className="py-2 pr-4">{r.comments}</td>
                <td className="py-2 pr-4">{new Date(r.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
            {!data.length && <tr><td colSpan="6" className="py-4 text-center text-white/60">No data</td></tr>}
          </tbody>
        </table>
        <div className="flex gap-3 mt-4">
          <button className="btn" onClick={exportCsv}>{t.exportCsv}</button>
          <button className="btn" onClick={()=>{ if(confirm('Clear all?')){ clearAll(); location.reload(); } }}>{t.clearAll}</button>
        </div>
      </div>
    </div>
  )
}
