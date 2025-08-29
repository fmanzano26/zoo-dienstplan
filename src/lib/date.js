
export function startOfMonth(d){ return new Date(d.getFullYear(), d.getMonth(), 1) }
export function endOfMonth(d){ return new Date(d.getFullYear(), d.getMonth()+1, 0) }
export function daysInMonth(d){ return endOfMonth(d).getDate() }
export function isAfterDeadline(today){ return today.getDate() > 22; } // after 22 = closed
export function buildCalendarGrid(date){
  const first = startOfMonth(date);
  const last = endOfMonth(date);
  const days = last.getDate();
  const startWeekday = (first.getDay()+6)%7; // Monday=0
  const grid = [];
  for(let i=0;i<startWeekday;i++) grid.push(null);
  for(let d=1; d<=days; d++) grid.push(d);
  return grid;
}
