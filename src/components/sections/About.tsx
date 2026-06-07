'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Download, ArrowRight, Star, Users } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'
import { useGithubProfile, useGithubRepos } from '@/lib/useGithubData'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].about

  const { profile } = useGithubProfile()
  const { totalStars } = useGithubRepos()

  // Live GitHub badges (shown only when data is available)
  const ghBadges = profile
    ? [
        { icon: Users, value: profile.followers, label: lang === 'en' ? 'Followers' : 'فالوور' },
        { icon: Code2, value: profile.public_repos, label: lang === 'en' ? 'Repos' : 'ریپو' },
        { icon: Star, value: totalStars, label: lang === 'en' ? 'Stars' : 'ستاره' },
      ]
    : []

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 px-4"
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
          <p className="text-xs font-mono text-indigo-400 mb-1 tracking-widest uppercase">
            {lang === 'en' ? '// who I am' : '// درباره من'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 mb-2">
            {t.title}
          </h2>
          <p className="text-gray-500 text-base max-w-lg">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* ── Left: Visual column ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-2 lg:order-1"
          >
            {/* Tech skill cloud */}
            {(() => {
              const TECH: Array<{ name: string; size: string; weight: string; color: string; x: number; y: number; dur: number; delay: number }> = [
                { name: 'React.js',    size: 'text-sm',     weight: 'font-black',    color: '#61dafb', x: 44, y: 10, dur: 3.2, delay: 0   },
                { name: 'Next.js',     size: 'text-sm',     weight: 'font-black',    color: '#94a3b8', x: 8,  y: 28, dur: 2.8, delay: 0.4 },
                { name: 'TypeScript',  size: 'text-sm',     weight: 'font-bold',     color: '#3b82f6', x: 66, y: 42, dur: 3.6, delay: 0.8 },
                { name: 'Tailwind',    size: 'text-xs',     weight: 'font-semibold', color: '#06b6d4', x: 14, y: 58, dur: 3.0, delay: 1.2 },
                { name: 'Three.js',    size: 'text-xs',     weight: 'font-semibold', color: '#049ef4', x: 72, y: 22, dur: 2.5, delay: 1.0 },
                { name: 'Python',      size: 'text-xs',     weight: 'font-semibold', color: '#fbbf24', x: 52, y: 78, dur: 2.6, delay: 1.6 },
                { name: 'Framer',      size: 'text-[10px]', weight: 'font-medium',   color: '#d946ef', x: 24, y: 16, dur: 2.9, delay: 1.8 },
                { name: 'Git',         size: 'text-[10px]', weight: 'font-medium',   color: '#f97316', x: 26, y: 82, dur: 3.4, delay: 2.0 },
                { name: 'Docker',      size: 'text-[10px]', weight: 'font-medium',   color: '#60a5fa', x: 80, y: 62, dur: 2.4, delay: 2.4 },
              ]
              return (
                <div
                  className="relative w-full max-w-[260px] mx-auto mb-4 lg:mb-5"
                  style={{ height: '230px' }}
                >
                  {/* Decorative rings */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/15" />
                  <div className="absolute inset-8 rounded-full border border-sky-500/10" />
                  {/* Center glow + icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600/20 to-sky-500/15 blur-xl" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Code2 className="w-9 h-9 dark:text-indigo-300/30 text-indigo-500/20" />
                  </div>
                  {/* Tech labels */}
                  {TECH.map((t) => (
                    <motion.div
                      key={t.name}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: t.dur, delay: t.delay, ease: 'easeInOut' }}
                      className="absolute"
                      style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      <span
                        className={`${t.size} ${t.weight} px-2 py-0.5 rounded-lg whitespace-nowrap`}
                        style={{
                          color: t.color,
                          background: `${t.color}14`,
                          border: `1px solid ${t.color}28`,
                        }}
                      >
                        {t.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )
            })()}

            {/* Code card — always LTR, hidden on desktop to reduce clutter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="lg:hidden dark:bg-[#0d0d14] bg-white/90 border dark:border-white/8 border-indigo-100 rounded-2xl p-4 font-mono text-sm overflow-hidden"
              style={{ direction: 'ltr', textAlign: 'left' }}
            >
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-gray-500">profile.ts</span>
              </div>
              <div className="space-y-0.5 text-xs leading-relaxed overflow-x-auto">
                <p><span className="text-purple-400">const</span> <span className="text-sky-300">dev</span> <span className="text-gray-500">=</span> {'{'}</p>
                <p className="pl-4"><span className="text-indigo-300">name</span>: <span className="text-green-300">&quot;Alireza Pourgholam&quot;</span>,</p>
                <p className="pl-4"><span className="text-indigo-300">role</span>: <span className="text-green-300">&quot;Frontend Developer&quot;</span>,</p>
                <p className="pl-4"><span className="text-indigo-300">stack</span>: [<span className="text-orange-300">&quot;React&quot;</span>, <span className="text-orange-300">&quot;Next.js&quot;</span>, <span className="text-orange-300">&quot;TS&quot;</span>],</p>
                <p className="pl-4"><span className="text-indigo-300">open</span>: <span className="text-yellow-300">true</span></p>
                <p>{'}'}</p>
              </div>
            </motion.div>

            {/* Desktop: compact code identity badge (replaces card on lg+) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-xl dark:bg-white/5 bg-white/80 border dark:border-white/8 border-indigo-100/60"
              style={{ direction: 'ltr' }}
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400/70" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                <div className="w-2 h-2 rounded-full bg-green-400/70" />
              </div>
              <span className="font-mono text-xs text-gray-500">profile.ts</span>
              <span className="ml-auto font-mono text-xs">
                <span className="text-purple-400">const</span>
                <span className="text-sky-300"> dev</span>
                <span className="text-gray-500"> = </span>
                <span className="text-green-300">&quot;Alireza Pourgholam&quot;</span>
              </span>
            </motion.div>

            {/* Live GitHub stats row */}
            {ghBadges.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-3 mt-4"
              >
                {ghBadges.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-white/5 bg-white/70 dark:border-white/10 border-indigo-100/60 border text-xs"
                  >
                    <Icon className="w-3 h-3 text-indigo-400 shrink-0" />
                    <span className="font-bold dark:text-gray-200 text-gray-700 tabular-nums">{value}</span>
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
            className="order-1 lg:order-2 space-y-5"
          >
            <p className="dark:text-gray-300 text-gray-600 leading-relaxed text-base text-justify">
              {t.bio1}
            </p>
            <p className="dark:text-gray-300 text-gray-600 leading-relaxed text-base text-justify">
              {t.bio2}
            </p>
            <p className="dark:text-gray-300 text-gray-600 leading-relaxed text-base text-justify">
              {t.bio3}
            </p>

            {/* Stats */}
            <div className="flex gap-2 pt-2 flex-wrap">
              {t.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.45 + i * 0.1 }}
                  className="flex-1 min-w-[80px] dark:bg-white/5 bg-white/80 dark:border-white/10 border-indigo-100/70 border rounded-xl px-2.5 py-2 text-center hover:border-indigo-500/30 transition-colors"
                >
                  <div className="text-base font-black gradient-text whitespace-nowrap leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5 font-medium leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-1">
              <motion.a
                href={process.env.NEXT_PUBLIC_CV_URL || '/cv.pdf'}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl dark:bg-white/5 bg-white/80 dark:border-indigo-500/30 border-indigo-400/40 border text-indigo-400 hover:bg-indigo-500/10 transition-all font-medium text-sm group"
              >
                <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                {t.downloadCv}
              </motion.a>
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-all text-sm group"
              >
                {lang === 'en' ? 'Get in touch' : 'تماس بگیرید'}
                <ArrowRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isRTL ? '-scale-x-100 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
