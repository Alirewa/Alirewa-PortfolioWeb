'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Code2, Download, ArrowRight, Star, Users,
  Atom, Globe, FileCode2, Wind, Box, Zap,
  Terminal, GitBranch, Container,
} from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'
import { useGithubProfile, useGithubRepos } from '@/lib/useGithubData'

/* ── 3×3 tech badge grid ── */
const TECH_GRID = [
  { name: 'React',    Icon: Atom,      color: '#61dafb' },
  { name: 'Next.js',  Icon: Globe,     color: '#94a3b8' },
  { name: 'TypeScript', Icon: FileCode2, color: '#3b82f6' },
  { name: 'Tailwind', Icon: Wind,      color: '#06b6d4' },
  { name: 'Three.js', Icon: Box,       color: '#049ef4' },
  { name: 'Framer',   Icon: Zap,       color: '#d946ef' },
  { name: 'Python',   Icon: Terminal,  color: '#fbbf24' },
  { name: 'Git',      Icon: GitBranch, color: '#f97316' },
  { name: 'Docker',   Icon: Container, color: '#60a5fa' },
]

/* ── Lines for the code card ── */
const CODE_LINES = [
  { num: 1,  tokens: [{ t: 'const',             c: 'text-emerald-400' }, { t: ' ',               c: '' }, { t: 'dev',               c: 'text-sky-300'    }, { t: ' = {',           c: 'text-gray-500'   }] },
  { num: 2,  tokens: [{ t: '  name',            c: 'text-violet-400'  }, { t: ': ',              c: 'text-gray-500' }, { t: '"Alireza Pourgholam"', c: 'text-amber-300'  }, { t: ',',             c: 'text-gray-500'   }] },
  { num: 3,  tokens: [{ t: '  role',            c: 'text-violet-400'  }, { t: ': ',              c: 'text-gray-500' }, { t: '"Frontend Dev"',      c: 'text-amber-300'  }, { t: ',',             c: 'text-gray-500'   }] },
  { num: 4,  tokens: [{ t: '  stack',           c: 'text-violet-400'  }, { t: ': [',             c: 'text-gray-500' }, { t: '"React"',             c: 'text-green-300'  }, { t: ', ',            c: 'text-gray-500'   }, { t: '"Next.js"', c: 'text-green-300' }, { t: ', ', c: 'text-gray-500' }, { t: '"TS"', c: 'text-green-300' }, { t: '],', c: 'text-gray-500' }] },
  { num: 5,  tokens: [{ t: '  location',        c: 'text-violet-400'  }, { t: ': ',              c: 'text-gray-500' }, { t: '"Kish Island, IR"',   c: 'text-amber-300'  }, { t: ',',             c: 'text-gray-500'   }] },
  { num: 6,  tokens: [{ t: '  available',       c: 'text-violet-400'  }, { t: ': ',              c: 'text-gray-500' }, { t: 'true',               c: 'text-emerald-400'}] },
  { num: 7,  tokens: [{ t: '}',                 c: 'text-gray-500'    }] },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
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
      id="about"
      ref={ref}
      className="relative py-10 md:py-14 px-4 sm:px-6"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-7"
        >
          <p className="text-xs font-mono text-indigo-400 mb-2 tracking-[0.18em] uppercase">
            {lang === 'en' ? '// who I am' : '// درباره من'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 mb-2 tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-500 text-base max-w-lg leading-relaxed">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

          {/* ── Left: Visual column ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-2 lg:order-1 space-y-4"
          >

            {/* ── Tech badge 3×3 grid ── */}
            <div className="grid grid-cols-3 gap-2" style={{ direction: 'ltr' }}>
              {TECH_GRID.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-default transition-all duration-200"
                  style={{
                    background: `${tech.color}0e`,
                    border: `1px solid ${tech.color}28`,
                    boxShadow: `0 0 10px ${tech.color}14`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${tech.color}30`
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${tech.color}55`
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px ${tech.color}14`
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${tech.color}28`
                  }}
                >
                  <tech.Icon className="w-3.5 h-3.5 shrink-0" style={{ color: tech.color }} />
                  <span className="text-xs font-semibold whitespace-nowrap" style={{ color: tech.color }}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* ── Code card ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
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
                  <div key={line.num} className="flex gap-4 group">
                    {/* Line number */}
                    <span className="select-none text-gray-600 w-3 shrink-0 text-right">
                      {line.num}
                    </span>
                    {/* Code tokens */}
                    <span>
                      {line.tokens.map((token, ti) => (
                        <span key={ti} className={token.c}>
                          {token.t}
                        </span>
                      ))}
                      {/* Blinking cursor on last line */}
                      {line.num === 7 && (
                        <span className="animate-blink-cursor ml-0.5 text-indigo-400 font-normal">
                          ▋
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* GitHub live badges */}
            {ghBadges.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap items-center gap-2"
              >
                {ghBadges.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl glass-light border dark:border-white/10 border-indigo-100/60 text-xs"
                  >
                    <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="font-black dark:text-gray-200 text-gray-800 tabular-nums gradient-text">{value ?? '—'}</span>
                    <span className="text-gray-500">{label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ── Right: Text column ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2 space-y-3"
          >
            <p className="dark:text-gray-300 text-gray-600 leading-relaxed text-base text-justify">{t.bio1}</p>
            <p className="dark:text-gray-300 text-gray-600 leading-relaxed text-base text-justify">{t.bio2}</p>
            <p className="dark:text-gray-300 text-gray-600 leading-relaxed text-base text-justify">{t.bio3}</p>

            {/* Stat cards */}
            <div className="flex gap-3 pt-1 flex-wrap">
              {t.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex-1 min-w-[88px] glass-card text-center px-3 py-4 hover:border-indigo-500/35 cursor-default"
                  style={{ borderRadius: '1rem' }}
                >
                  <div className="text-xl font-black gradient-text whitespace-nowrap leading-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <motion.a
                href={process.env.NEXT_PUBLIC_CV_URL || '/cv.pdf'}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer relative overflow-hidden group"
                style={{ boxShadow: '0 6px 22px rgba(99, 102, 241, 0.30)' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-sky-500 transition-all duration-300 group-hover:from-indigo-500 group-hover:to-sky-400" />
                <span className="relative flex items-center gap-2 text-white">
                  <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                  {t.downloadCv}
                </span>
              </motion.a>

              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-all text-sm font-medium group cursor-pointer"
              >
                {lang === 'en' ? 'Get in touch' : 'تماس بگیرید'}
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                  isRTL ? '-scale-x-100 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                }`} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
