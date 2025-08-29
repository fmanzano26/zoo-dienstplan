
import React from 'react'
import { buildCalendarGrid } from '../lib/date'

export default function Calendar({date, selected, setSelected, weekdayLabels, allowedWeekdays=[3,4,5]}){
  const base = buildCalendarGrid(date);
  const rows = Math.ceil(base.length / 7);
  const totalCells = rows * 7;
  const trailing = totalCells - base.length;
  const grid = [...base];
  for(let i=1; i<=trailing; i++) grid.push({ day:i, spill:true });

  function keyFor(y,m,d){ return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }
  function isAllowed(y,m,d){
    const js = new Date(y,m,d).getDay(); const dow=(js+6)%7; return allowedWeekdays.includes(dow);
  }
  function toggleCell(cell){
    let y=date.getFullYear(), m=date.getMonth(); const spill=typeof cell==='object'&&cell.spill; const d=spill?cell.day:cell;
    if(spill){ m++; if(m>11){m=0;y++;} }
    if(!isAllowed(y,m,d)) return;
    const key=keyFor(y,m,d); const has=selected.includes(key);
    setSelected(has? selected.filter(v=>v!==key) : [...selected,key]);
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 text-center text-white/70 mb-2">
        {weekdayLabels.map((w,i)=>(<div key={i} className="py-1">{w}</div>))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {grid.map((cell,i)=>{
          if(cell===null) return <div key={i}/>;
          const spill=typeof cell==='object'&&cell.spill; const dayNum=spill?cell.day:cell;
          let y=date.getFullYear(), m=date.getMonth(); if(spill){m++; if(m>11){m=0;y++;}}
          const key=keyFor(y,m,dayNum); const active=selected.includes(key); const allowed=isAllowed(y,m,dayNum);
          return (
            <button key={i} onClick={()=>toggleCell(cell)} disabled={!allowed}
              className={`h-10 rounded-xl border transition ${active?'border-neon/80 shadow-neon':'border-white/10'} ${allowed?'hover:border-neon/50':'opacity-40 cursor-not-allowed'} ${spill?'opacity-60':''}`}>
              {dayNum}
            </button>
          )
        })}
      </div>
    </div>
  )
}
