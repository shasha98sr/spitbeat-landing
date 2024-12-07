  import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres'

type Data = {
  success: boolean
  message: string
}

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

      // Insert the email into the database
      try {
        await sql`
          INSERT INTO subscribers (email)
          VALUES (${email})
        `
        res.status(200).json({ success: true, message: 'Email submitted successfully' })
      } catch (error: any) {
        // Check for unique constraint violation
        if (error.code === '23505') {
          return res.status(400).json({ success: false, message: 'Email already registered' })
        }
        throw error
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      res.status(500).json({ success: false, message: 'Error submitting email' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` })
  }
}
