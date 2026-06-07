'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Terminal } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

const HeroOrb = dynamic(() => import('@/components/three/HeroOrb'), {
  ssr: false,
  loading: () => <div className="w-[200px] h-[130px]" />,
})

const CONTENT = {
  en: {
    label: '// error: page_not_found',
    title: 'Lost in the void',
    desc: "The page you're looking for doesn't exist or has been moved to another URL.",
    terminal: [
      '$ cd /requested-page',
      "bash: cd: No such file or directory",
      '$ echo $?',
      '127',
    ],
    home: 'Go Home',
    back: 'Go Back',
    footer: '© Alireza Pourgholam — Portfolio',
  },
  fa: {
    label: '// خطا: صفحه_پیدا_نشد',
    title: 'گم شدی در فضا!',
    desc: 'صفحه‌ای که دنبالش می‌گردی وجود نداره یا به آدرس دیگه‌ای منتقل شده.',
    terminal: [
      '$ cd /صفحه-درخواستی',
      'bash: cd: چنین فایلی وجود ندارد',
      '$ echo $?',
      '127',
    ],
    home: 'برگشت به خانه',
    back: 'صفحه قبل',
    footer: '© علیرضا پورغلام — پورتفولیو',
  },
}

export default function NotFound() {
  const { lang, isRTL } = useLang()
  const t = CONTENT[lang]

  const goHome = () => { window.location.href = '/' }
  const goBack = () => { window.history.back() }

  return (
    <div
      className="relative min-h-screen dark:bg-[#06060a] bg-[#f4f6ff] flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* ── Aurora blobs (matches main page) ── */}
      <div className="absolute top-1/4 left-1/3 w-[480px] h-[480px] dark:bg-indigo-600/10 bg-indigo-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 dark:bg-sky-500/8 bg-sky-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 dark:bg-violet-600/8 bg-violet-400/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      {/* ── Noise overlay ── */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 text-center max-w-xl mx-auto w-full">

        {/* ── 3D Orb ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex justify-center mb-0"
        >
          <HeroOrb />
        </motion.div>

        {/* ── mono label ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-xs font-mono text-indigo-400 mb-4 tracking-widest uppercase"
        >
          {t.label}
        </motion.p>

        {/* ── 404 hero number ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          className="mb-3"
        >
          <span
            className="gradient-text glow-text font-black leading-none select-none"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(96px, 20vw, 160px)',
              display: 'block',
            }}
          >
            404
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
          {t.title}
        </motion.h1>

        {/* ── Description ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 dark:text-gray-400 text-base mb-8 leading-relaxed max-w-md mx-auto"
        >
          {t.desc}
        </motion.p>

        {/* ── Terminal block ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass border dark:border-white/8 border-indigo-100/60 rounded-2xl p-4 mb-8 max-w-sm mx-auto overflow-hidden"
          style={{ direction: 'ltr', textAlign: 'left' }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <Terminal className="w-3 h-3 text-gray-500 ml-2" />
            <span className="text-[10px] text-gray-500 font-mono">zsh — 404</span>
          </div>
          {/* Lines */}
          <div className="space-y-0.5 font-mono text-xs">
            {t.terminal.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 + i * 0.12 }}
                className={
                  i === 0 ? 'text-green-400' :
                  i === 1 ? 'text-red-400/90' :
                  i === 2 ? 'text-green-400' :
                             'text-yellow-400'
                }
              >
                {line}
              </motion.p>
            ))}
            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.1, delay: 1.3 }}
              className="inline-block w-[7px] h-[13px] bg-green-400 align-middle rounded-[1px]"
            />
          </div>
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {/* Primary — gradient */}
          <motion.button
            onClick={goHome}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-3 rounded-xl font-semibold text-white text-sm overflow-hidden group cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-sky-500 transition-all duration-300 group-hover:from-indigo-500 group-hover:to-sky-400" />
            <span className="relative flex items-center gap-2">
              <Home className="w-4 h-4" />
              {t.home}
            </span>
          </motion.button>

          {/* Secondary — glass */}
          <motion.button
            onClick={goBack}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl font-semibold text-sm glass border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 transition-all duration-300 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className={`w-4 h-4 ${isRTL ? '-scale-x-100' : ''}`} />
              {t.back}
            </span>
          </motion.button>
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-[11px] text-gray-400/60 font-mono"
        >
          {t.footer}
        </motion.p>

      </div>
    </div>
  )
}
