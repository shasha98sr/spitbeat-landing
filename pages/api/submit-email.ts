  import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

type Data = {
  success: boolean
  message: string
}

// Initialize the sheet with auth
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
  ],
}));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const email = req.body.email

      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' })
      }

      console.log('Loading spreadsheet...')
      // Load the sheet
      await doc.loadInfo()
      const sheet = doc.sheetsByIndex[0]

      // Get the current row count
      const rows = await sheet.getRows({ limit: 1 }).catch(() => [])
      
      // If no rows exist (including header), set up the headers
      if (rows.length === 0) {
        console.log('Setting up header row...')
        await sheet.setHeaderRow(['email', 'timestamp'])
      }

      // Reload the rows after setting headers
      const allRows = await sheet.getRows()
      
      console.log('Checking for existing email...')
      // Check if email already exists
      const emailExists = allRows.some(row => {
        const rowEmail = row.get('email')
        return rowEmail === email
      })
      
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email already registered' })
      }

      console.log('Adding new row to spreadsheet...')
      // Add the new row
      await sheet.addRow({
        email,
        timestamp: new Date().toISOString()
      })

      console.log('Email successfully added to spreadsheet')
      res.status(200).json({ success: true, message: 'Email submitted successfully' })
    } catch (error) {
      console.error('Detailed error:', error)
      console.error('Google Sheet ID:', process.env.GOOGLE_SHEET_ID)
      console.error('Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
      res.status(500).json({ success: false, message: 'Error submitting email' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` })
  }
}
