'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft, Terminal } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

const CONTENT = {
  en: {
    terminal: [
      '$ cd /requested-page',
      'bash: cd: No such file or directory',
      '$ echo $?',
      '127',
    ],
    home: 'Go Home',
    back: 'Go Back',
  },
  fa: {
    terminal: [
      '$ cd /صفحه-درخواستی',
      'bash: cd: چنین فایلی وجود ندارد',
      '$ echo $?',
      '127',
    ],
    home: 'صفحه اصلی',
    back: 'برگشت',
  },
}

export default function NotFound() {
  const { lang, isRTL } = useLang()
  const t = CONTENT[lang]

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 dark:bg-[#06060a] bg-[#f4f6ff]"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="w-full max-w-xs">

        {/* Terminal code box */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass border dark:border-white/8 border-indigo-100/60 rounded-2xl p-4 mb-5"
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

          {/* Terminal lines */}
          <div className="space-y-0.5 font-mono text-xs">
            {t.terminal.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.1 }}
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
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.1, delay: 0.8 }}
              className="inline-block w-[7px] h-[13px] bg-green-400 align-middle rounded-[1px]"
            />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex gap-3 justify-center"
        >
          <motion.button
            onClick={() => { window.location.href = '/' }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-5 py-2.5 rounded-xl font-semibold text-white text-sm overflow-hidden group cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-sky-500 group-hover:from-indigo-500 group-hover:to-sky-400 transition-all duration-300" />
            <span className="relative flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5" />
              {t.home}
            </span>
          </motion.button>

          <motion.button
            onClick={() => { window.history.back() }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm glass border border-indigo-500/30 dark:text-indigo-400 text-indigo-600 hover:bg-indigo-500/10 transition-all duration-300 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? '-scale-x-100' : ''}`} />
              {t.back}
            </span>
          </motion.button>
        </motion.div>

      </div>
    </div>
  )
}
