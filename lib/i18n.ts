
export type Lang = 'de' | 'es'

export const t = (lang: Lang) => ({
  home_title: 'Zoo Club',
  staff_card_title: 'Staff',
  staff_card_desc: lang === 'de'
    ? 'Gib deine Verfügbarkeiten für den nächsten Monat an'
    : 'Indica tus disponibilidades para el próximo mes',
  manager_card_title: 'Manager',
  manager_card_desc: lang === 'de'
    ? 'Zum Panel mit Übersicht & Export'
    : 'Panel con vista general y exportación',
  created_by: lang === 'de' ? 'Created by Fran Manzano' : 'Creado por Fran Manzano',

  // Staff form
  name_label: lang === 'de' ? 'Name *' : 'Nombre *',
  position_label: lang === 'de' ? 'Position *' : 'Puesto *',
  note_label: lang === 'de' ? 'Notiz (optional)' : 'Nota (opcional)',
  submit: lang === 'de' ? 'Senden' : 'Enviar',
  required_err: lang === 'de'
    ? 'Bitte fülle alle Pflichtfelder aus.'
    : 'Por favor completa los campos obligatorios.',
  submit_ok: lang === 'de' ? 'Verfügbarkeit gesendet.' : 'Disponibilidad enviada.',
  submit_fail: lang === 'de' ? 'Fehler beim Senden.' : 'Error al enviar.',
  cred_missing: lang === 'de'
    ? 'Google Service Account Anmeldedaten fehlen.'
    : 'Google Service Account credentials are missing.',

  // Ventana de envío (1–22)
  window_closed: lang === 'de'
    ? 'Außerhalb des Zeitfensters: Einsendungen sind nur vom 1. bis 22. jedes Monats möglich. Bitte versuche es ab dem 1. des nächsten Monats erneut.'
    : 'Fuera de fecha: solo se puede enviar del 1 al 22 de cada mes. Vuelve a partir del día 1 del próximo mes.',
  window_notice: lang === 'de'
    ? 'Hinweis: Einsendungen sind nur vom 1.–22. des Monats möglich.'
    : 'Aviso: los envíos solo están permitidos del día 1 al 22 de cada mes.',
  
  // Manager
  enter_pass: lang === 'de' ? 'Passwort eingeben' : 'Introduce la contraseña',
  unlock: lang === 'de' ? 'Öffnen' : 'Entrar',
  wrong_pass: lang === 'de' ? 'Falsches Passwort.' : 'Contraseña incorrecta.',
  manager_title: lang === 'de' ? 'Einsendungen' : 'Envíos',
  export_csv: lang === 'de' ? 'Export CSV' : 'Exportar CSV',
})

// SOLO dos opciones: Bar y Guardarropa/Garderobe
export const positions = (lang: Lang) =>
  lang === 'de' ? ['Bar', 'Garderobe'] : ['Bar', 'Guardarropa']
