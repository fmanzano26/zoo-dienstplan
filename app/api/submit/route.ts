import { NextRequest, NextResponse } from 'next/server'
import { getSheetsClient, requireCreds } from '@/lib/google'

type Body = {
  name: string
  position: string
  dates: string[]
  note?: string
  lang?: 'de' | 'es'
}

export async function POST(req: NextRequest) {
  const data = await req.json() as Body
  if (!data.name || !data.position || !data.dates || data.dates.length === 0) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const timestamp = new Date().toISOString()
  const row = [timestamp, data.name, data.position, data.dates.join(' | '), data.note ?? '']

  // Try to save to Sheets
  try {
    const { sheetId } = requireCreds()
    const sheets = await getSheetsClient()
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] }
    })

    return NextResponse.json({ ok: true })
  } catch (e:any) {
    return NextResponse.json({ error: e.message ?? 'Failed to save' }, { status: 500 })
  }
}
