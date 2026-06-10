'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
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

function SkillCard({
  name,
  color,
  delay,
  isInView,
  isPrimary,
}: {
  name: string
  color: string
  delay: number
  isInView: boolean
  isPrimary: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.88, y: 10 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -2, scale: 1.04 }}
      className="relative flex items-center justify-center text-center px-2 py-3 rounded-xl cursor-default transition-all duration-200"
      style={{
        background: `${color}${isPrimary ? '18' : '0e'}`,
        border: `1px solid ${color}${isPrimary ? '38' : '22'}`,
        minHeight: isPrimary ? '54px' : '46px',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = `${color}28`
        el.style.boxShadow = `0 4px 16px ${color}30`
        el.style.borderColor = `${color}55`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = `${color}${isPrimary ? '18' : '0e'}`
        el.style.boxShadow = ''
        el.style.borderColor = `${color}${isPrimary ? '38' : '22'}`
      }}
    >
      <span
        className={`leading-tight ${isPrimary ? 'text-xs font-semibold' : 'text-[11px] font-medium opacity-80'}`}
        style={{ color, direction: 'ltr' }}
      >
        {name}
      </span>
    </motion.div>
  )
}

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
  const isPrimary = category.isPrimary

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, delay: catIndex * 0.12 }}
      className={`relative rounded-2xl overflow-hidden border h-full ${
        isPrimary
          ? 'dark:bg-amber-500/[0.05] bg-amber-50/70 dark:border-amber-400/25 border-amber-200/60'
          : 'dark:bg-white/[0.018] bg-white/55 dark:border-white/7 border-gray-200/55 opacity-85'
      }`}
      style={isPrimary ? {
        boxShadow: '0 0 52px rgba(245,158,11,0.14), 0 8px 32px rgba(0,0,0,0.10)',
      } : undefined}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-4 border-b"
        style={{
          background: `${category.color}${isPrimary ? '12' : '07'}`,
          borderColor: `${category.color}${isPrimary ? '28' : '14'}`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: `${category.color}${isPrimary ? '22' : '14'}`,
              border: `1px solid ${category.color}35`,
            }}
          >
            <CategoryIcon name={category.icon} color={category.color} />
          </div>
          <h3 className={`font-bold dark:text-white text-gray-800 leading-tight ${isPrimary ? 'text-base' : 'text-sm'}`}>
            {category.name}
          </h3>
        </div>

        <span
          className="shrink-0 text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{
            background: `${category.color}${isPrimary ? '20' : '12'}`,
            color: isPrimary ? category.color : `${category.color}bb`,
            border: `1px solid ${category.color}${isPrimary ? '40' : '25'}`,
          }}
        >
          {category.badge}
        </span>
      </div>

      {/* Skill grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {category.skills.map((skill: { name: string; level: number }, si: number) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              color={category.color}
              delay={catIndex * 0.08 + si * 0.06}
              isInView={isInView}
              isPrimary={isPrimary}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-80px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].skills

  const [showSecondary, setShowSecondary] = useState(false)

  const primary   = t.categories.filter((c) => c.isPrimary)
  const secondary = t.categories.filter((c) => !c.isPrimary)
  // Row 1: DevOps, Frontend, Backend — Row 2: WordPress, Graphic Design
  const [devops, backend, wordpress, graphicDesign] = secondary

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-16 md:py-24 px-4 sm:px-6"
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

        {/* Row 1: DevOps | Frontend (golden) | Backend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start mb-5">
          <div className="order-2 md:order-1">
            {devops && <CategoryPanel category={devops} catIndex={1} isInView={isInView} lang={lang} />}
          </div>
          <div className="order-1 md:order-2">
            {primary[0] && <CategoryPanel category={primary[0]} catIndex={0} isInView={isInView} lang={lang} />}
          </div>
          <div className="order-3">
            {backend && <CategoryPanel category={backend} catIndex={2} isInView={isInView} lang={lang} />}
          </div>
        </div>

        {/* Toggle button for secondary skills */}
        <AnimatePresence>
          {!showSecondary && (
            <motion.div
              key="show-btn"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center mt-5"
            >
              <button
                onClick={() => setShowSecondary(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-dashed border-indigo-400/40 dark:text-indigo-400 text-indigo-600 hover:border-indigo-400/70 hover:bg-indigo-500/5 transition-all duration-200 cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
                {lang === 'en' ? 'Show All Skills & Experience' : 'مشاهده همه مهارت‌ها و تجربه‌ها'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row 2: WordPress | Graphic Design — lighter treatment */}
        <AnimatePresence>
          {showSecondary && (
            <motion.div
              key="secondary-row"
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto opacity-80 mt-5">
                {wordpress && <CategoryPanel category={wordpress} catIndex={3} isInView={isInView} lang={lang} />}
                {graphicDesign && <CategoryPanel category={graphicDesign} catIndex={4} isInView={isInView} lang={lang} />}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowSecondary(false)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'Show Less' : 'بستن'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
