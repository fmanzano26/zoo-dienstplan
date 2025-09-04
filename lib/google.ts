import { google } from 'googleapis'

export function requireCreds() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!email || !key || !sheetId) {
    throw new Error('Google Service Account credentials are missing')
  }
  return { email, key: key.replace(/\\n/g, '\n'), sheetId }
}

export async function getSheetsClient() {
  const { email, key } = requireCreds()
  const auth = new google.auth.JWT(email, undefined as any, key, ['https://www.googleapis.com/auth/spreadsheets'])
  const sheets = google.sheets({ version: 'v4', auth })
  return sheets
}
