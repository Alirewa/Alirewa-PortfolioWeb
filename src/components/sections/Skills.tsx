'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

function CategoryIcon({ name, color }: { name: string; color: string }) {
  const Icon = ((Icons as unknown) as Record<
    string,
    React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  >)[name] ?? Icons.Code2
  return <Icon className="w-4 h-4" style={{ color }} />
}

/* ── Single square skill card — filled, no number ── */
function SkillCard({
  name,
  color,
  delay,
  isInView,
}: {
  name: string
  color: string
  delay: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.88, y: 10 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -2, scale: 1.05 }}
      className="relative flex items-center justify-center text-center px-2 py-3 rounded-xl cursor-default transition-all duration-200 overflow-hidden"
      style={{
        background: `${color}14`,
        border: `1px solid ${color}30`,
        minHeight: '52px',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = `${color}24`
        el.style.boxShadow = `0 4px 18px ${color}28`
        el.style.borderColor = `${color}50`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = `${color}14`
        el.style.boxShadow = ''
        el.style.borderColor = `${color}30`
      }}
    >
      <span
        className="text-xs font-semibold leading-tight"
        style={{ color, direction: 'ltr' }}
      >
        {name}
      </span>
    </motion.div>
  )
}

/* ── Category panel ── */
function CategoryPanel({
  category,
  catIndex,
  isInView,
  lang,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any
  catIndex: number
  isInView: boolean
  lang: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, delay: catIndex * 0.12 }}
      className="relative rounded-2xl overflow-hidden dark:bg-white/[0.02] bg-white/60 border dark:border-white/8 border-gray-200/60"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-4 border-b dark:border-white/6 border-gray-200/50"
        style={{ background: `${category.color}08` }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${category.color}18`, border: `1px solid ${category.color}30` }}
          >
            <CategoryIcon name={category.icon} color={category.color} />
          </div>
          <div>
            <h3 className="text-sm font-bold dark:text-white text-gray-800 leading-tight">
              {category.name}
            </h3>
          </div>
        </div>

        {/* Badge */}
        <span
          className={`shrink-0 text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full whitespace-nowrap ${
            category.isPrimary ? 'ring-1' : ''
          }`}
          style={{
            background: `${category.color}18`,
            color: category.color,
            border: `1px solid ${category.color}35`,
            ...(category.isPrimary ? { ringColor: category.color } : {}),
          }}
        >
          {category.badge}
        </span>
      </div>

      {/* Skill cards grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {category.skills.map((skill: { name: string; level: number }, si: number) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              color={category.color}
              delay={catIndex * 0.08 + si * 0.06}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Honest disclaimer for secondary categories */}
        {!category.isPrimary && category.note && (
          <p
            className="mt-3 text-[11px] italic text-slate-600 dark:text-slate-400 leading-snug"
            style={{ direction: 'ltr' }}
          >
            {lang === 'fa' && category.noteFa ? category.noteFa : category.note}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-80px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].skills

  const primary   = t.categories.filter((c) => c.isPrimary)
  const secondary = t.categories.filter((c) => !c.isPrimary)

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-20 md:py-28 px-4 sm:px-6"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none dark:opacity-15 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Top accent */}
      <div
        className="absolute inset-x-0 top-0 h-px dark:opacity-100 opacity-0"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.20) 30%, rgba(139,92,246,0.20) 70%, transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mb-2 tracking-[0.18em] uppercase">
            {lang === 'en' ? '// what I know' : '// مهارت‌های من'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-3 dark:text-white text-gray-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-lg leading-relaxed">{t.subtitle}</p>
        </motion.div>

        {/* Primary category — full width */}
        <div className="mb-5">
          {primary.map((cat, i) => (
            <CategoryPanel key={cat.name} category={cat} catIndex={i} isInView={isInView} lang={lang} />
          ))}
        </div>

        {/* Secondary categories — 2-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {secondary.map((cat, i) => (
            <CategoryPanel key={cat.name} category={cat} catIndex={i + primary.length} isInView={isInView} lang={lang} />
          ))}
        </div>

      </div>
    </section>
  )
}
