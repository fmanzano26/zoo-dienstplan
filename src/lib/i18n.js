
export const dictionaries = {
  de: {
    staffBtnTitle: "Staff",
    staffBtnSub: "Gib deine Verfügbarkeiten für den nächsten Monat an",
    managerBtnTitle: "Manager",
    managerBtnSub: "Zum Panel mit Übersicht & Export",
    createdBy: "Created by Fran Manzano",
    staffTitle: (m)=> `Verfügbarkeit — ${m}`,
    namePlaceholder: "Name und Nachname",
    rolePlaceholder: "Position / Arbeitsbereich",
    commentsPlaceholder: "Kommentare",
    send: "Verfügbarkeit senden",
    closed: "Frist vorbei, du kannst keine Daten mehr senden.",
    monthNames: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    weekdays: ["M","D","M","D","F","S","S"],
    roleOptions: ["Bar","Garderobe"],
    managerCols: ["Name","Rolle","Monat","Tage","Kommentare","Gesendet"],
    windowNote: "Auswahl und Versand nur vom 1. bis 22. Tag des Monats.",
    passwordAsk: "Passwort",
    wrongPassword: "Falsches Passwort",
    exportCsv: "CSV exportieren",
    clearAll: "Alles löschen"
  },
  es: {
    staffBtnTitle: "Staff",
    staffBtnSub: "Indica tus disponibilidades del próximo mes",
    managerBtnTitle: "Manager",
    managerBtnSub: "Acceso al panel con resumen y exportación",
    createdBy: "Created by Fran Manzano",
    staffTitle: (m)=> `Disponibilidad — ${m}`,
    namePlaceholder: "Nombre y apellido",
    rolePlaceholder: "Posición / Área de trabajo",
    commentsPlaceholder: "Comentarios",
    send: "Enviar disponibilidad",
    closed: "Fuera de plazo, ya no puedes enviar fechas.",
    monthNames: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
    weekdays: ["L","M","X","J","V","S","D"],
    roleOptions: ["Barra","Guardarropa"],
    managerCols: ["Nombre","Puesto","Mes","Días","Comentarios","Enviado"],
    windowNote: "Puedes seleccionar y enviar del día 1 al 22 de cada mes.",
    passwordAsk: "Contraseña",
    wrongPassword: "Contraseña incorrecta",
    exportCsv: "Exportar CSV",
    clearAll: "Borrar todo"
  }
}
export function getLabelMonth(date, dict){ return `${dict.monthNames[date.getMonth()]} ${date.getFullYear()}` }
