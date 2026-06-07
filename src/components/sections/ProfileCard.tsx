'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Code2, Star, Users,
  Atom, Globe, FileCode2, Wind, Box, Zap,
  Terminal, GitBranch, Container,
} from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'
import { useGithubProfile, useGithubRepos } from '@/lib/useGithubData'

/* ── 3×3 tech badge grid ── */
const TECH_GRID = [
  { name: 'React',      Icon: Atom,      color: '#61dafb' },
  { name: 'Next.js',    Icon: Globe,     color: '#94a3b8' },
  { name: 'TypeScript', Icon: FileCode2, color: '#3b82f6' },
  { name: 'Tailwind',   Icon: Wind,      color: '#06b6d4' },
  { name: 'Three.js',   Icon: Box,       color: '#049ef4' },
  { name: 'Framer',     Icon: Zap,       color: '#d946ef' },
  { name: 'Python',     Icon: Terminal,  color: '#fbbf24' },
  { name: 'Git',        Icon: GitBranch, color: '#f97316' },
  { name: 'Docker',     Icon: Container, color: '#60a5fa' },
]

/* ── Lines for the code card ── */
const CODE_LINES = [
  { num: 1,  tokens: [{ t: 'const',              c: 'text-emerald-400' }, { t: ' dev',              c: 'text-sky-300'    }, { t: ' = {',           c: 'text-gray-500'   }] },
  { num: 2,  tokens: [{ t: '  name',             c: 'text-violet-400'  }, { t: ': ',               c: 'text-gray-500' }, { t: '"Alireza Pourgholam"', c: 'text-amber-300'  }, { t: ',', c: 'text-gray-500' }] },
  { num: 3,  tokens: [{ t: '  role',             c: 'text-violet-400'  }, { t: ': ',               c: 'text-gray-500' }, { t: '"Frontend Dev"',       c: 'text-amber-300'  }, { t: ',', c: 'text-gray-500' }] },
  { num: 4,  tokens: [{ t: '  stack',            c: 'text-violet-400'  }, { t: ': [',              c: 'text-gray-500' }, { t: '"React"',              c: 'text-green-300'  }, { t: ', ', c: 'text-gray-500' }, { t: '"Next.js"', c: 'text-green-300' }, { t: ', ', c: 'text-gray-500' }, { t: '"TS"', c: 'text-green-300' }, { t: '],', c: 'text-gray-500' }] },
  { num: 5,  tokens: [{ t: '  location',         c: 'text-violet-400'  }, { t: ': ',               c: 'text-gray-500' }, { t: '"Kish Island, IR"',    c: 'text-amber-300'  }, { t: ',', c: 'text-gray-500' }] },
  { num: 6,  tokens: [{ t: '  available',        c: 'text-violet-400'  }, { t: ': ',               c: 'text-gray-500' }, { t: 'true',                c: 'text-emerald-400'}] },
  { num: 7,  tokens: [{ t: '}',                  c: 'text-gray-500'    }] },
]

export default function ProfileCard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-80px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].about

  const { profile } = useGithubProfile()
  const { totalStars } = useGithubRepos()

  const ghBadges = profile
    ? [
        { icon: Users, value: profile.followers,    label: lang === 'en' ? 'Followers' : 'فالوور' },
        { icon: Code2, value: profile.public_repos, label: lang === 'en' ? 'Repos'     : 'ریپو'   },
        { icon: Star,  value: totalStars,            label: lang === 'en' ? 'Stars'     : 'ستاره'  },
      ]
    : []

  return (
    <section
      id="profile"
      ref={ref}
      className="relative py-16 md:py-20 px-4 sm:px-6"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs font-mono text-indigo-400 mb-2 tracking-[0.18em] uppercase">
            {lang === 'en' ? '// my profile' : '// پروفایل من'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 tracking-tight">
            {lang === 'en' ? 'At a Glance' : 'یک نگاه کلی'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Left: Code card + GitHub badges ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? 40 : -40 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4"
          >
            {/* Code card */}
            <div
              className="dark:bg-[#0a0a12] bg-white/95 rounded-2xl overflow-hidden border dark:border-white/8 border-indigo-100/60"
              style={{ direction: 'ltr', textAlign: 'left' }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 dark:bg-white/[0.03] bg-gray-50/80 border-b dark:border-white/6 border-gray-200/60">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="ml-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md dark:bg-indigo-500/10 bg-indigo-100/60 border dark:border-indigo-500/20 border-indigo-200/60">
                  <Code2 className="w-2.5 h-2.5 text-indigo-400" />
                  <span className="text-[10px] font-medium text-indigo-400 font-mono">profile.ts</span>
                </div>
              </div>

              {/* Code body */}
              <div className="p-4 font-mono text-xs leading-relaxed">
                {CODE_LINES.map((line) => (
                  <div key={line.num} className="flex gap-4">
                    <span className="select-none text-gray-600 dark:text-gray-600 w-3 shrink-0 text-right">
                      {line.num}
                    </span>
                    <span>
                      {line.tokens.map((token, ti) => (
                        <span key={ti} className={token.c}>{token.t}</span>
                      ))}
                      {line.num === 7 && (
                        <span className="animate-blink-cursor ml-0.5 text-indigo-400 font-normal">▋</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub live badges */}
            {ghBadges.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-2"
              >
                {ghBadges.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl dark:bg-white/5 bg-white/80 border dark:border-white/10 border-indigo-100/60 text-xs"
                  >
                    <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="font-black dark:text-gray-200 text-gray-800 tabular-nums gradient-text">
                      {value ?? '—'}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">{label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ── Right: Stat cards + Tech grid ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? -40 : 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Stat cards */}
            <div className="flex gap-3 flex-wrap">
              {t.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex-1 min-w-[88px] glass-card text-center px-3 py-4 hover:border-indigo-500/35 cursor-default"
                  style={{ borderRadius: '1rem' }}
                >
                  <div className="text-xl font-black gradient-text whitespace-nowrap leading-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 3×3 tech badge grid */}
            <div className="grid grid-cols-3 gap-2" style={{ direction: 'ltr' }}>
              {TECH_GRID.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-default transition-all duration-200"
                  style={{
                    background: `${tech.color}0e`,
                    border: `1px solid ${tech.color}28`,
                    boxShadow: `0 0 10px ${tech.color}14`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = `0 4px 20px ${tech.color}30`
                    el.style.borderColor = `${tech.color}55`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = `0 0 10px ${tech.color}14`
                    el.style.borderColor = `${tech.color}28`
                  }}
                >
                  <tech.Icon className="w-3.5 h-3.5 shrink-0" style={{ color: tech.color }} />
                  <span className="text-xs font-semibold whitespace-nowrap" style={{ color: tech.color }}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
