'use client'

import { Heart } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

export default function Footer() {
  const { lang, isRTL } = useLang()

  return (
    <footer
      className="relative py-8 px-4 text-center border-t dark:border-white/[0.06] border-gray-200/60"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Top fade line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(99,102,241,0.18) 30%, rgba(139,92,246,0.18) 70%, transparent)',
        }}
      />

      {lang === 'fa' ? (
        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
          <span>ساخته شده با</span>
          <Heart className="inline w-3.5 h-3.5 text-rose-400 fill-rose-400 shrink-0" />
          <span>توسط</span>
          <a
            href="https://github.com/Alirewa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
          >
            @Alirewa
          </a>
          <span className="opacity-40 mx-1">·</span>
          <a
            href="https://github.com/Alirewa/Alirewa-portfolio-website"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-400 transition-colors"
          >
            پروژه متن‌باز
          </a>
        </p>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
          <span>Made with</span>
          <Heart className="inline w-3.5 h-3.5 text-rose-400 fill-rose-400 shrink-0" />
          <span>by</span>
          <a
            href="https://github.com/Alirewa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
          >
            @Alirewa
          </a>
          <span className="opacity-40 mx-1">·</span>
          <a
            href="https://github.com/Alirewa/Alirewa-portfolio-website"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-400 transition-colors"
          >
            Open Source
          </a>
        </p>
      )}
    </footer>
  )
}
