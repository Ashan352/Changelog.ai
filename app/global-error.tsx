'use client'

import { AlertOctagon, RotateCcw, Home, Sparkle } from "lucide-react"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#121610] flex items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden" style={{ fontFamily: 'monospace' }}>
        
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[85vh] bg-[#0d0f0b] rounded-[2.5rem] border border-[#2a2e1f]/60 shadow-2xl overflow-hidden relative z-10">
          
          {/* Left Side: Content */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden z-10">
            <div className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: 'linear-gradient(to right, rgba(18,22,16,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,22,16,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="mb-12 lg:mb-20">
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '1.5rem', color: '#91c96b' }}>Changelog.ai</span>
            </div>

            <div className="space-y-6 max-w-md relative z-20">
              <p style={{ fontFamily: 'monospace', fontSize: '0.6875rem', color: '#91c96b', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold' }}>
                Critical Error
              </p>
              
              <h1 style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', color: '#f0f2e9', lineHeight: '1.1' }}>
                The system has<br />encountered a<br /><span style={{ color: '#9ca88d' }}>fatal error.</span>
              </h1>
              
              <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#6b7261', lineHeight: '1.7', paddingBottom: '1.5rem', paddingTop: '0.5rem' }}>
                A catastrophic runtime fault occurred. The layout itself has failed. Please reset the process or return to the homepage.
                {error?.digest && (
                  <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.5 }}>Digest: {error.digest}</span>
                )}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={reset}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', height: '3.5rem', padding: '0 2rem', borderRadius: '9999px', background: '#91c96b', color: '#0d0f0b', fontFamily: 'monospace', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', border: 'none', cursor: 'pointer', width: 'fit-content' }}
                >
                  <RotateCcw size={16} />
                  Restart Process
                </button>
                <a
                  href="/"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', height: '3.5rem', padding: '0 2rem', borderRadius: '9999px', background: '#1a1e14', color: '#f0f2e9', fontFamily: 'monospace', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', border: '1px solid #2a2e1f', textDecoration: 'none', width: 'fit-content' }}
                >
                  <Home size={16} />
                  Emergency Exit
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Graphic */}
          <div style={{ flex: 1, backgroundColor: '#0f1109', borderLeft: '1px solid rgba(42,46,31,0.5)', position: 'relative', overflow: 'hidden', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 4rem' }}>
            
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80%', height: '80%', background: 'rgba(145,201,107,0.04)', filter: 'blur(120px)', borderRadius: '50%', animation: 'pulse 2s infinite', zIndex: 0 }} />

            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', maxWidth: '500px' }}>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: 'clamp(10rem, 20vw, 17.5rem)', color: 'rgba(145,201,107,0.9)', lineHeight: 1, userSelect: 'none', textShadow: '0 25px 60px rgba(145,201,107,0.15)' }}>
                500
              </span>
              
              <div style={{ position: 'absolute', left: '-2rem', top: '20%', background: '#0d0f0b', border: '1px solid #2a2e1f', borderRadius: '2rem', padding: '1.25rem', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', transform: 'rotate(-8deg)', animation: 'bounce 6s ease-in-out infinite' }}>
                <AlertOctagon size={32} color="#91c96b" />
                <span style={{ fontFamily: 'monospace', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7261', fontWeight: 'bold' }}>Fatal Error</span>
              </div>

              <div style={{ position: 'absolute', right: '-2rem', top: '10%', background: '#1a1e14', border: '1px solid #2a2e1f', borderRadius: '9999px', padding: '0.625rem 1.25rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: '0.625rem', transform: 'rotate(6deg)', animation: 'bounce 5s ease-in-out infinite 0.5s' }}>
                <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse 1s infinite' }} />
                <span style={{ fontFamily: 'monospace', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f0f2e9', fontWeight: 'bold' }}>Critical</span>
              </div>

              <div style={{ position: 'absolute', right: '10%', bottom: '-1rem', color: '#91c96b', animation: 'spin 12s linear infinite' }}>
                <Sparkle size={64} fill="#91c96b" style={{ opacity: 0.8 }} />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
