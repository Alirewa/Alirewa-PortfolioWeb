'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

/* Usage intensity (0–100) per tool name */
const USAGE: Record<string, number> = {
  'Claude.ai':   95,
  'Cursor':      88,
  'ChatGPT':     72,
  'Codex':       58,
  'Antigravity': 46,
}

/* ── Animated usage slider ── */
function UsageSlider({
  level,
  color,
  isInView,
  delay,
}: {
  level: number
  color: string
  isInView: boolean
  delay: number
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-gray-500">
          Usage Intensity
        </span>
        <span className="text-[11px] font-mono font-bold" style={{ color }}>
          {level}%
        </span>
      </div>

      {/* Track */}
      <div
        className="relative h-[3px] w-full rounded-full overflow-visible"
        style={{ background: 'rgba(255,255,255,0.07)' }}
      >
        {/* Fill */}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}40 0%, ${color} 100%)`,
            boxShadow: `0 0 8px ${color}50`,
          }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${level}%` } : { width: '0%' }}
          transition={{ duration: 1.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Glowing thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[11px] h-[11px] rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 0 2px rgba(0,0,0,0.6), 0 0 10px ${color}, 0 0 20px ${color}60`,
          }}
          initial={{ left: '0%' }}
          animate={isInView ? { left: `${level}%` } : { left: '0%' }}
          transition={{ duration: 1.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

/* ── Single tool card ── */
function ToolCard({
  tool,
  index,
  isFeatured,
  isInView,
}: {
  tool: { name: string; by: string; color: string; badge: string; description: string }
  index: number
  isFeatured: boolean
  isInView: boolean
}) {
  const usage = USAGE[tool.name] ?? 50
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      className="group relative h-full"
    >
      <div
        className="relative h-full flex flex-col overflow-hidden rounded-2xl transition-all duration-300 cursor-default"
        style={{
          background: `linear-gradient(135deg, ${tool.color}08 0%, rgba(255,255,255,0.03) 100%)`,
          border: `1px solid ${tool.color}22`,
          borderLeft: `3px solid ${tool.color}`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = `${tool.color}55`
          el.style.borderLeftColor = tool.color
          el.style.background = `linear-gradient(135deg, ${tool.color}14 0%, rgba(255,255,255,0.05) 100%)`
          el.style.transform = 'translateY(-4px)'
          el.style.boxShadow = `0 20px 60px ${tool.color}18, 0 0 0 1px ${tool.color}28`
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = `${tool.color}22`
          el.style.borderLeftColor = tool.color
          el.style.background = `linear-gradient(135deg, ${tool.color}08 0%, rgba(255,255,255,0.03) 100%)`
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'none'
        }}
      >
        {/* Radial glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(circle at 20% 20%, ${tool.color}14, transparent 65%)` }}
        />

        {/* Ghost number */}
        <div
          className="absolute top-3 right-4 font-black select-none pointer-events-none leading-none"
          style={{
            fontSize: isFeatured ? '5rem' : '3.5rem',
            color: `${tool.color}10`,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          {num}
        </div>

        <div className={`relative z-10 flex flex-col h-full ${isFeatured ? 'p-7' : 'p-5'}`}>
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3
                className={`font-black leading-tight ${isFeatured ? 'text-2xl' : 'text-xl'}`}
                style={{ color: tool.color }}
              >
                {tool.name}
              </h3>
              <span
                className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-1 rounded-full"
                style={{
                  background: `${tool.color}18`,
                  color: tool.color,
                  border: `1px solid ${tool.color}30`,
                }}
              >
                {tool.badge}
              </span>
            </div>
            <p className="text-[11px] font-mono text-gray-500 tracking-wide">by {tool.by}</p>
          </div>

          {/* Divider */}
          <div className="h-px mb-4" style={{ background: `${tool.color}18` }} />

          {/* Description */}
          <p
            className={`flex-1 leading-relaxed text-gray-400 mb-6 ${
              isFeatured ? 'text-sm' : 'text-[12px]'
            }`}
          >
            {tool.description}
          </p>

          {/* Slider at bottom */}
          <UsageSlider
            level={usage}
            color={tool.color}
            isInView={isInView}
            delay={0.3 + index * 0.12}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function AITools() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].aiTools

  const featured = t.tools[0]
  const rest = t.tools.slice(1)

  return (
    <section
      id="ai-tools"
      ref={ref}
      className="relative py-20 md:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Section-specific background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep base */}
        <div
          className="absolute inset-0 dark:opacity-100 opacity-0"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(10,8,25,0.65) 40%, rgba(10,8,25,0.80) 100%)',
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 dark:opacity-100 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Top/bottom fades */}
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background:
              'linear-gradient(to bottom, rgb(var(--background-start-rgb)), transparent)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              'linear-gradient(to top, rgb(var(--background-end-rgb)), transparent)',
          }}
        />
        {/* Glow accents */}
        <div
          className="absolute top-1/3 left-1/4 w-96 h-64 rounded-full pointer-events-none dark:opacity-100 opacity-0"
          style={{
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-48 rounded-full pointer-events-none dark:opacity-100 opacity-0"
          style={{
            background: 'radial-gradient(ellipse, rgba(168,85,247,0.07) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-purple-400 mb-2 tracking-[0.18em] uppercase">
            {t.label}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 tracking-tight mb-2">
                {t.title}
              </h2>
              <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* AI-first badge */}
            <div className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-purple-500/8 bg-purple-50 border dark:border-purple-500/22 border-purple-200/60 self-start sm:self-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              <span className="text-xs font-semibold text-purple-400">
                {lang === 'en' ? 'AI-first workflow' : 'جریان کار AI-first'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bento grid — featured (col-span-2) + 4 rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured card — spans 2 cols on lg+ */}
          <div className="lg:col-span-2 md:col-span-2">
            <ToolCard
              tool={featured}
              index={0}
              isFeatured
              isInView={isInView}
            />
          </div>

          {/* Rest cards */}
          {rest.map((tool, i) => (
            <ToolCard
              key={tool.name}
              tool={tool}
              index={i + 1}
              isFeatured={false}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
