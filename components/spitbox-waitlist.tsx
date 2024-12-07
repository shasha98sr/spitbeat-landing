'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Share2, Zap, Music } from 'lucide-react'

export default function SpitboxWaitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setEmail('')
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mic className="h-8 w-8 text-green-500" />
          <span className="text-2xl font-bold tracking-tighter">Spitbeat</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
            <li><a href="#signup" className="hover:text-green-400 transition-colors">Join Waitlist</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center leading-tight">
            Your beats,<br />
            your stage,<br />
            <span className="text-green-500">no limits.</span>
          </h1>
          <p className="text-xl mb-8 text-center text-gray-400">
            Spitbeat is like Twitter, but for beatboxers. Drop your routines, share your sound, and skip the noise.
          </p>
        
          <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Share2, title: "Drop Your Routines", description: "Upload and share your latest beatbox creations effortlessly." },
              { icon: Zap, title: "Real-time Collaboration", description: "Connect and jam with fellow beatboxers in live sessions." },
              { icon: Music, title: "Discover New Sounds", description: "Explore a vibrant community of diverse beatbox styles and artists." }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-green-500 transition-colors">
                <feature.icon className="h-12 w-12 mb-4 mx-auto text-green-500" />
                <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 p-6 bg-gray-900 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-center">Why Join Spitbeat?</h3>
            <ul className="list-disc list-inside text-gray-400">
              <li>Be the first to access our revolutionary beatboxing platform</li>
              <li>Exclusive beta tester perks and features</li>
              <li>Direct input into shaping the future of Spitbeat</li>
              <li>Early bird discounts on premium features</li>
            </ul>
          </div>

          <div id="signup" className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg border border-gray-800">
            <h2 className="text-3xl font-bold mb-4 text-center">Join the Waitlist</h2>
            <p className="mb-6 text-center text-gray-400">Be the first to experience Spitbeat. Sign up for exclusive early access!</p>
            {submitted ? (
              <div className="bg-green-500 text-black p-4 rounded-lg text-center font-bold">
                Thanks for signing up! We'll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black border-gray-700 text-white placeholder-gray-500"
                />
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <Button type="submit" className="bg-green-500 hover:bg-green-600 text-black font-bold">
                  Join Waitlist
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 mt-16">
        <p>&copy; 2024 Spitbeat. All rights reserved.</p>
      </footer>
    </div>
  )
}
