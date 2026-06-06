'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

export default function AITools() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].aiTools

  return (
    <section
      id="ai-tools"
      ref={ref}
      className="relative py-14 px-4"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-xs font-mono text-purple-400 mb-2 tracking-widest uppercase">
            {t.label}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900">
                {t.title}
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mt-2 leading-relaxed">
                {t.subtitle}
              </p>
            </div>
            {/* "AI-first" badge */}
            <div className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full dark:bg-purple-500/10 bg-purple-50 border dark:border-purple-500/25 border-purple-200/60">
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

        {/* Cards — horizontal slider */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
          >
            {t.tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                className="snap-start shrink-0 w-[min(200px,62vw)] sm:w-48 flex flex-col"
              >
                <div
                  className="flex-1 rounded-2xl p-4 flex flex-col gap-3 border transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: `${tool.color}08`,
                    borderColor: `${tool.color}22`,
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${tool.color}50`
                    ;(e.currentTarget as HTMLElement).style.background = `${tool.color}12`
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${tool.color}22`
                    ;(e.currentTarget as HTMLElement).style.background = `${tool.color}08`
                  }}
                >
                  {/* Top: name + company */}
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span
                        className="text-sm font-black leading-tight"
                        style={{ color: tool.color }}
                      >
                        {tool.name}
                      </span>
                      {/* Badge */}
                      <span
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 leading-tight"
                        style={{ background: `${tool.color}18`, color: tool.color, border: `1px solid ${tool.color}30` }}
                      >
                        {tool.badge}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">{tool.by}</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px" style={{ background: `${tool.color}20` }} />

                  {/* Description */}
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                    {tool.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll-continue shadows */}
          <div className="absolute right-0 top-0 bottom-3 w-12 pointer-events-none hidden dark:block"
            style={{ background: 'linear-gradient(to left, #06060a 0%, transparent 100%)' }} />
          <div className="absolute right-0 top-0 bottom-3 w-12 pointer-events-none dark:hidden"
            style={{ background: 'linear-gradient(to left, #f4f6ff 0%, transparent 100%)' }} />
        </div>
      </div>
    </section>
  )
}
