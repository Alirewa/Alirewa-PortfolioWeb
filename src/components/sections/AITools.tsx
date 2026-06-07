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

  const primaryTool = t.tools.find((tool) => tool.name === 'Claude.ai')
  const rest        = t.tools.filter((tool) => tool.name !== 'Claude.ai')

  return (
    <section
      id="ai-tools"
      ref={ref}
      className="relative py-10 md:py-14 px-4 sm:px-6"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="max-w-6xl mx-auto relative">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-baseline gap-3 mb-5"
        >
          <span className="text-xs font-mono text-purple-400 tracking-[0.18em] uppercase">
            {t.label}
          </span>
          <h2 className="text-lg md:text-xl font-black dark:text-white text-gray-900 tracking-tight">
            {t.title}
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-xl leading-relaxed"
        >
          {t.subtitle}
        </motion.p>

        {/* Tools row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-wrap gap-2.5 items-center"
        >
          {/* Primary tool — featured */}
          {primaryTool && (
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-base cursor-default relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${primaryTool.color}22, ${primaryTool.color}10)`,
                border: `1.5px solid ${primaryTool.color}60`,
                boxShadow: `0 0 20px ${primaryTool.color}28, 0 4px 14px ${primaryTool.color}18`,
                color: primaryTool.color,
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: primaryTool.color, boxShadow: `0 0 8px ${primaryTool.color}` }}
              />
              {primaryTool.name}
              <span
                className="text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full"
                style={{
                  background: `${primaryTool.color}22`,
                  border: `1px solid ${primaryTool.color}40`,
                  color: primaryTool.color,
                }}
              >
                {primaryTool.badge}
              </span>
            </div>
          )}

          {/* Other tools */}
          {rest.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
              whileHover={{ y: -2, scale: 1.04 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-default transition-all duration-200 dark:bg-white/[0.04] bg-white/80 border dark:border-white/10 border-gray-200/70 text-sm font-semibold dark:text-gray-300 text-gray-600"
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = `${tool.color}50`
                el.style.color = tool.color
                el.style.boxShadow = `0 4px 16px ${tool.color}20`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = ''
                el.style.color = ''
                el.style.boxShadow = ''
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: tool.color }}
              />
              {tool.name}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
