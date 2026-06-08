'use client'

import { useEffect } from 'react'

// global-error.tsx wraps the entire root layout — no Providers/context available.
// Must include <html> and <body>, and be fully self-contained.

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
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#06060a',
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          padding: '1rem',
        }}
      >
        <div style={{ width: '100%', maxWidth: '320px' }}>

          {/* Terminal box */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '20px',
            }}
          >
            {/* Window chrome */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(239,68,68,0.7)' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(234,179,8,0.7)' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(34,197,94,0.7)' }} />
              <span style={{ fontSize: '10px', color: '#6b7280', marginLeft: '8px' }}>zsh — critical error</span>
            </div>

            {/* Terminal lines */}
            <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
              <p style={{ color: '#4ade80', margin: 0 }}>$ node app.js</p>
              <p style={{ color: 'rgba(248,113,113,0.9)', margin: 0 }}>[Fatal] Critical layout error</p>
              <p style={{ color: '#4ade80', margin: 0 }}>$ echo $?</p>
              <p style={{ color: '#facc15', margin: 0 }}>1</p>
              {error?.digest && (
                <p style={{ color: '#6b7280', fontSize: '10px', margin: '4px 0 0' }}>
                  digest: {error.digest}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={reset}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '14px',
                background: 'linear-gradient(to right, #e11d48, #f97316)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Try Again
            </button>

            <button
              onClick={() => { window.location.href = '/' }}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '14px',
                background: 'rgba(255,255,255,0.05)',
                color: '#818cf8',
                border: '1px solid rgba(99,102,241,0.3)',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Go Home
            </button>
          </div>

        </div>
      </body>
    </html>
  )
}
