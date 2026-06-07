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
      className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-5"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Ghost number — visible in both light and dark */}
      <span
        className="text-7xl font-black font-mono leading-none select-none tabular-nums tracking-tighter shrink-0 dark:opacity-[0.18] opacity-[0.12]"
        style={{ color }}
      >
        {num}
      </span>

      {/* Double-line divider */}
      <div className="flex-1 flex flex-col gap-1">
        <div
          className="h-px rounded-full"
          style={{
            background: `linear-gradient(${isRTL ? 'to left' : 'to right'}, ${color}90, ${color}30, transparent)`,
          }}
        />
        <div
          className="h-px rounded-full"
          style={{
            background: `linear-gradient(${isRTL ? 'to left' : 'to right'}, ${color}45, transparent)`,
          }}
        />
      </div>

      {/* Color glow dot */}
      <div
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{
          background: color,
          boxShadow: `0 0 6px ${color}, 0 0 14px ${color}60`,
        }}
      />
    </div>
  )
}
