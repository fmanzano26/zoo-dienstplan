
const KEY='zoo_availability_v1';
export const getAll=()=>{ try{return JSON.parse(localStorage.getItem(KEY))||[]}catch{return[]} }
export const saveSubmission=(e)=>{ const all=getAll(); all.push(e); localStorage.setItem(KEY, JSON.stringify(all)); }
export const clearAll=()=> localStorage.removeItem(KEY);
