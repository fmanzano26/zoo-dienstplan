import { google } from 'googleapis'

export function requireCreds() {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  let key = process.env.GOOGLE_PRIVATE_KEY

  if (!sheetId || !email || !key) {
    throw new Error('Google Service Account credentials are missing')
  }

  // Acepta tanto formato "\n" como multilínea y limpia posibles CR
  key = key.replace(/\\n/g, '\n').replace(/\r/g, '')

  return { sheetId, email, key }
}

export async function getSheetsClient() {
  const { email, key } = requireCreds()
  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}
