'use client'

import { useLang } from '@/lib/LangContext'

interface PhaseDividerProps {
  num: string
  color?: string
}

export default function PhaseDivider({ num, color = '#6366f1' }: PhaseDividerProps) {
  const { isRTL } = useLang()
  return (
    <div
      className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-4"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <span
        className="text-5xl font-black font-mono leading-none select-none tabular-nums"
        style={{ color: `${color}15` }}
      >
        {num}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, ${color}30, transparent)` }}
      />
    </div>
  )
}
