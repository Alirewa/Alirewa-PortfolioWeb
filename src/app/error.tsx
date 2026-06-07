'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'

// error.tsx cannot use context (renders outside layout on crashes),
// so we keep this page self-contained and always in English.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Runtime Error]', error)
  }, [error])

  return (
    <div className="relative min-h-screen dark:bg-[#06060a] bg-[#f4f6ff] flex flex-col items-center justify-center px-4 overflow-hidden">

      {/* ── Aurora blobs ── */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 dark:bg-red-600/8 bg-red-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 dark:bg-orange-500/6 bg-orange-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 text-center max-w-xl mx-auto w-full">

        {/* ── Animated icon ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse scale-150" />
            <div className="w-20 h-20 rounded-full glass border border-red-500/30 flex items-center justify-center">
              <AlertTriangle className="w-9 h-9 text-red-400" />
            </div>
          </div>
        </motion.div>

        {/* ── Label ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-mono text-red-400 mb-4 tracking-widest uppercase"
        >
          // error: runtime_exception
        </motion.p>

        {/* ── Hero number ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-3"
        >
          <span
            className="font-black leading-none select-none"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(80px, 16vw, 130px)',
              display: 'block',
              background: 'linear-gradient(135deg, #ef4444 0%, #f97316 50%, #ef4444 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              animation: 'gradient 4s ease infinite',
            }}
          >
            500
          </span>
        </motion.div>

        {/* ── Title ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-800 mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Something went wrong
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 dark:text-gray-400 text-base mb-8 leading-relaxed max-w-md mx-auto"
        >
          An unexpected runtime error occurred. You can try to recover — or return to the homepage.
        </motion.p>

        {/* ── Error message (dev-friendly) ── */}
        {error?.message && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass border dark:border-red-500/15 border-red-200/60 rounded-2xl p-4 mb-8 max-w-sm mx-auto overflow-hidden"
            style={{ direction: 'ltr', textAlign: 'left' }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="text-[10px] text-gray-500 font-mono ml-2">error.log</span>
            </div>
            <p className="font-mono text-xs text-red-400/90 break-words leading-relaxed">
              <span className="text-red-500">Error: </span>
              {error.message}
            </p>
            {error.digest && (
              <p className="font-mono text-[10px] text-gray-500 mt-1">
                digest: {error.digest}
              </p>
            )}
          </motion.div>
        )}

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {/* Try again */}
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-3 rounded-xl font-semibold text-white text-sm overflow-hidden group cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-300 group-hover:from-red-500 group-hover:to-orange-400" />
            <span className="relative flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </span>
          </motion.button>

          {/* Go home */}
          <motion.button
            onClick={() => { window.location.href = '/' }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl font-semibold text-sm glass border border-red-500/25 text-red-400 hover:bg-red-500/10 transition-all duration-300 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </span>
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-[11px] text-gray-400/60 font-mono"
        >
          © Alireza Pourgholam — Portfolio
        </motion.p>

      </div>
    </div>
  )
}
