'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function CheckoutButton({ plan }: { plan: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button 
      onClick={handleCheckout}
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-mono text-xs font-bold transition-all bg-accent text-bg hover:bg-accent/90 shadow-[0_0_20px_rgba(232,255,71,0.2)] disabled:opacity-80 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
      ) : (
        "Upgrade to Pro"
      )}
    </button>
  )
}
