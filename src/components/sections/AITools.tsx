'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

export default function AITools() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-60px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].aiTools

  return (
    <section
      id="ai-tools"
      ref={ref}
      className="relative py-12 md:py-16 px-4 sm:px-6"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none dark:opacity-10 opacity-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.20) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto relative">

        {/* Compact header row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-4 mb-6"
        >
          <div className="flex items-center gap-3">
            {/* AI-first pulse indicator */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
            </span>
            <p className="text-xs font-mono text-purple-400 tracking-[0.18em] uppercase">
              {t.label}
            </p>
          </div>

          <h2 className="text-xl md:text-2xl font-black dark:text-white text-gray-900 tracking-tight">
            {t.title}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed hidden sm:block">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Tool pills — horizontal wrap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2.5"
        >
          {t.tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -2, scale: 1.04 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full cursor-default transition-all duration-200 dark:bg-white/[0.04] bg-white/80 border dark:border-white/10 border-gray-200/60"
              style={{
                borderLeftColor: tool.color,
                borderLeftWidth: '2px',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = `0 4px 18px ${tool.color}22`
                el.style.borderColor = `${tool.color}50`
                el.style.borderLeftColor = tool.color
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = ''
                el.style.borderColor = ''
                el.style.borderLeftColor = tool.color
              }}
            >
              {/* Color dot */}
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: tool.color, boxShadow: `0 0 6px ${tool.color}80` }}
              />
              {/* Tool name */}
              <span className="text-sm font-semibold dark:text-gray-200 text-gray-700">
                {tool.name}
              </span>
              {/* Provider */}
              <span className="text-[11px] text-slate-500 dark:text-slate-500 hidden sm:inline">
                by {tool.by}
              </span>
              {/* Badge */}
              <span
                className="text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                style={{
                  background: `${tool.color}18`,
                  color: tool.color,
                  border: `1px solid ${tool.color}30`,
                }}
              >
                {tool.badge}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
