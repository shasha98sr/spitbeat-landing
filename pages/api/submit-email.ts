import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type Data = {
  success: boolean
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const email = req.body.email

      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' })
      }

      // In a real-world scenario, you'd want to validate the email format here

      const filePath = path.join(process.cwd(), 'data', 'emails.json')
      let emails = []

      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        emails = JSON.parse(fileContent)
      }

      if (emails.includes(email)) {
        return res.status(400).json({ success: false, message: 'Email already registered' })
      }

      emails.push(email)
      fs.writeFileSync(filePath, JSON.stringify(emails, null, 2))

      res.status(200).json({ success: true, message: 'Email submitted successfully' })
    } catch (error) {
      console.error('Error submitting email:', error)
      res.status(500).json({ success: false, message: 'Error submitting email' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` })
  }
}

