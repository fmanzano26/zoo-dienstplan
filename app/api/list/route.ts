import { NextRequest, NextResponse } from 'next/server'
import { getSheetsClient, requireCreds } from '@/lib/google'

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization') || ''
  if (auth !== 'Bearer zoo2025') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { sheetId } = requireCreds()
    const sheets = await getSheetsClient()
    const resp = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'A:E'
    })
    const values = resp.data.values ?? []
    const rows = values.slice(1).map(r => ({
      timestamp: r[0] || '',
      name: r[1] || '',
      position: r[2] || '',
      dates: r[3] || '',
      note: r[4] || ''
    }))
    return NextResponse.json({ rows })
  } catch (e:any) {
    return NextResponse.json({ error: e.message ?? 'Failed to list' }, { status: 500 })
  }
}
