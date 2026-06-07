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
  return <Icon className="w-4.5 h-4.5" style={{ color }} />
}

/* ── Clean gradient slider ── */
interface SkillSliderProps {
  name: string
  level: number
  color: string
  delay: number
  isInView: boolean
}

function SkillSlider({ name, level, color, delay, isInView }: SkillSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center gap-3">
        <span
          className="text-sm font-medium dark:text-gray-300 text-gray-600 font-mono"
          style={{ direction: 'ltr', display: 'inline-block' }}
        >
          {name}
        </span>
        <motion.span
          className="text-[11px] font-bold font-mono shrink-0 tabular-nums"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Track */}
      <div
        className="relative h-[3px] w-full rounded-full"
        style={{ background: 'rgba(255,255,255,0.07)' }}
      >
        {/* Fill */}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}45 0%, ${color}bb 60%, ${color} 100%)`,
          }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${level}%` } : { width: '0%' }}
          transition={{ duration: 1.3, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 35%, #fff, ${color})`,
            boxShadow: `0 0 0 2px rgba(0,0,0,0.5), 0 0 8px ${color}, 0 0 18px ${color}50`,
          }}
          initial={{ left: '0%' }}
          animate={isInView ? { left: `${level}%` } : { left: '0%' }}
          transition={{ duration: 1.3, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].skills

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-20 md:py-28 px-4 sm:px-6"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Subtle grid background */}
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
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px dark:opacity-100 opacity-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.20) 30%, rgba(139,92,246,0.20) 70%, transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-indigo-400 mb-2 tracking-[0.18em] uppercase">
            {lang === 'en' ? '// what I know' : '// مهارت‌های من'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-3 dark:text-white text-gray-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-500 text-base max-w-lg leading-relaxed">{t.subtitle}</p>
        </motion.div>

        {/* Two-column grid — no card wrappers, clean flat layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10 mb-12">
          {t.categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: `${category.color}16`,
                    border: `1px solid ${category.color}28`,
                  }}
                >
                  <CategoryIcon name={category.icon} color={category.color} />
                </div>
                <h3 className="text-base font-bold dark:text-white text-gray-800">
                  {category.name}
                </h3>
              </div>

              {/* Color-matched divider */}
              <div
                className="h-px mb-6"
                style={{ background: `linear-gradient(90deg, ${category.color}40, transparent)` }}
              />

              {/* Skill sliders — LTR regardless of page direction */}
              <div className="space-y-5" style={{ direction: 'ltr' }}>
                {category.skills.map((skill, skillIndex) => (
                  <SkillSlider
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                    delay={catIndex * 0.10 + skillIndex * 0.07}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech bubble cloud — full-width below both columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500 mb-4 font-mono tracking-widest uppercase">
            {lang === 'en' ? '// also comfortable with' : '// همچنین آشنا با'}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Figma', 'Docker', 'Redis', 'MongoDB', 'Supabase', 'Vercel', 'VS Code', 'Linux', 'Webpack', 'ESLint'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.04 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-3 py-1.5 text-sm font-medium rounded-full dark:bg-white/5 bg-white/70 border dark:border-white/10 border-indigo-100/60 text-gray-500 dark:text-gray-400 hover:border-indigo-500/35 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
