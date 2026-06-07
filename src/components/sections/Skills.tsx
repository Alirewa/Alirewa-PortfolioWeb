'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

function CategoryIcon({ name, color }: { name: string; color: string }) {
  const Icon = ((Icons as unknown) as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[name] ?? Icons.Code2
  return <Icon className="w-5 h-5" style={{ color }} />
}

interface SkillBarProps {
  name: string
  level: number
  color: string
  delay: number
  isInView: boolean
}

function SkillBar({ name, level, color, delay, isInView }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center gap-2">
        {/* Skill name stays LTR even in FA mode (English tech names) */}
        <span
          className="text-sm font-medium dark:text-gray-300 text-gray-600 font-mono"
          style={{ direction: 'ltr', display: 'inline-block' }}
        >
          {name}
        </span>
        <span className="text-xs font-bold text-indigo-400 font-mono shrink-0">{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
            transformOrigin: 'left',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full" />
        </motion.div>
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
      className="relative py-20 px-4"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-px h-96 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute top-1/2 right-0 w-px h-96 bg-gradient-to-b from-transparent via-sky-500/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-indigo-400 mb-2 tracking-widest uppercase">
            {lang === 'en' ? '// what I know' : '// مهارت‌های من'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-3 dark:text-white text-gray-900">
            {t.title}
          </h2>
          <p className="text-gray-500 text-base max-w-lg">{t.subtitle}</p>
        </motion.div>

        {/* Skills — slider on mobile, grid on lg+ */}
        <div className="relative mb-12">
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
          >
            {t.categories.map((category, catIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
                className="snap-start shrink-0 w-[min(340px,82vw)] lg:w-auto dark:bg-white/5 bg-white/80 backdrop-blur-xl dark:border-white/8 border-indigo-100/70 border rounded-2xl p-6 hover:border-indigo-500/25 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${category.color}18`, border: `1px solid ${category.color}28` }}
                  >
                    <CategoryIcon name={category.icon} color={category.color} />
                  </div>
                  <h3 className="text-lg font-bold dark:text-white text-gray-800">{category.name}</h3>
                </div>

                <div className="space-y-4" style={{ direction: 'ltr' }}>
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={category.color}
                      delay={catIndex * 0.15 + skillIndex * 0.08}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Scroll-continue shadow — dark */}
          <div className="absolute right-0 top-0 bottom-4 w-28 pointer-events-none lg:hidden hidden dark:block"
            style={{ background: 'linear-gradient(to left, rgba(6,6,10,1) 0%, rgba(6,6,10,0) 100%)' }} />
          {/* Scroll-continue shadow — light */}
          <div className="absolute right-0 top-0 bottom-4 w-28 pointer-events-none lg:hidden dark:hidden"
            style={{ background: 'linear-gradient(to left, rgba(244,246,255,1) 0%, rgba(244,246,255,0) 100%)' }} />
          <p className="text-center text-xs text-gray-400 mt-3 lg:hidden">swipe →</p>
        </div>

        {/* Tech bubble cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 mb-6 font-mono">
            {lang === 'en' ? '// also comfortable with' : '// همچنین آشنا با'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Figma', 'Docker', 'Redis', 'MongoDB', 'Supabase', 'Vercel', 'VS Code', 'Linux', 'Webpack', 'ESLint'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.04 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 text-sm font-medium rounded-xl glass border border-white/10 text-gray-500 dark:text-gray-400 hover:border-indigo-500/30 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all cursor-default"
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
