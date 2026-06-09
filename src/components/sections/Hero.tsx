'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { TypeAnimation } from 'react-type-animation'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

const HeroOrb = dynamic(() => import('@/components/three/HeroOrb'), {
  ssr: false,
  loading: () => (
    <div className="w-[300px] h-[200px] lg:w-[460px] lg:h-[320px] flex items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ping" style={{ animationDuration: '1.8s' }} />
        <div className="absolute inset-2 rounded-full border border-indigo-400/30 animate-spin" style={{ animationDuration: '3s', borderTopColor: 'transparent' }} />
        <div className="absolute inset-4 rounded-full border border-sky-400/25 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse', borderTopColor: 'transparent' }} />
        <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />
      </div>
    </div>
  ),
})

const TECH_TAGS = ['React.js', 'Next.js', 'TypeScript', 'Tailwind', 'Python', 'Three.js']

export default function Hero() {
  const { lang, isRTL } = useLang()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== 'light'
  const t = content[lang].hero
  const roles = t.roles.flatMap((role) => [role, 2000])

  const scrollToProjects = () =>
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  const scrollDown = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden pt-24 pb-16"
    >
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] dark:bg-indigo-600/10 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] dark:bg-sky-500/8 bg-sky-400/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* ── Main layout ── */}
        <div
          className="flex flex-col-reverse items-center gap-6 lg:flex-row lg:items-center lg:gap-10 xl:gap-12"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >

          {/* ── Column A: Text — 60% on desktop ── */}
          <div
            className={`flex-1 flex flex-col items-center text-center ${
              isRTL ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'
            }`}
            style={{ direction: 'ltr' }}
          >
            {/* Greeting */}
            {!isRTL && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-4"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border dark:border-white/10 border-indigo-200/60 dark:bg-white/5 bg-white/70 text-gray-500">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  {t.greeting}
                </span>
              </motion.div>
            )}

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`font-black mb-4 tracking-tight leading-[1.05] ${
                isRTL
                  ? 'text-4xl sm:text-5xl lg:text-6xl xl:text-6xl'
                  : 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]'
              }`}
            >
              <span className="gradient-text glow-text">{t.name}</span>
            </motion.h1>

            {/* Role — TypeAnimation with mono font */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-gray-600 dark:text-gray-500 text-sm font-mono">{'{'}</span>
              <div className="h-8 md:h-10 flex items-center">
                <TypeAnimation
                  key={lang}
                  sequence={roles as (string | number)[]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-lg md:text-xl font-semibold text-indigo-400 font-mono"
                />
              </div>
              <span className="text-gray-600 dark:text-gray-500 text-sm font-mono">{'}'}</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`text-base md:text-lg dark:text-gray-400 text-gray-500 max-w-[52ch] mb-7 leading-[1.75] ${
                isRTL ? 'text-right' : ''
              }`}
            >
              {t.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`flex flex-wrap items-center gap-3 mb-7 ${
                isRTL ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'
              }`}
            >
              {/* Primary */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToProjects}
                className="relative px-6 py-3 rounded-xl font-semibold text-white text-sm overflow-hidden group cursor-pointer"
                style={{ boxShadow: '0 8px 28px rgba(99, 102, 241, 0.38)' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 transition-all duration-300 group-hover:from-indigo-500 group-hover:to-sky-400" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)' }} />
                <span className="relative flex items-center gap-2">
                  {t.cta}
                  <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${
                    isRTL ? '-scale-x-100 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
                  }`} />
                </span>
              </motion.button>

              {/* Secondary */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToContact}
                className="px-6 py-3 rounded-xl font-semibold text-sm glass border border-indigo-500/30 dark:text-indigo-400 text-indigo-600 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-200 cursor-pointer"
              >
                {t.ctaSecondary}
              </motion.button>

            </motion.div>

            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={`flex flex-wrap gap-2 ${isRTL ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'}`}
            >
              {TECH_TAGS.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.06 }}
                  whileHover={{ scale: 1.08, y: -1 }}
                  className="px-3 py-1.5 text-xs font-mono font-semibold rounded-lg glass-light dark:border-white/10 border-indigo-100/60 dark:text-gray-400 text-gray-500 hover:border-indigo-500/40 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all duration-200 cursor-default border"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ── Column B: 3D Orb — 40% on desktop ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="shrink-0 flex justify-center lg:w-[40%]"
          >
            {/* Glow ring behind orb */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)',
                  filter: 'blur(32px)',
                  transform: 'scale(1.4)',
                }}
              />
              {/* Light-mode backdrop so dark emissive materials remain visible */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none dark:opacity-0 opacity-100"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.10) 45%, transparent 75%)',
                  transform: 'scale(1.6)',
                  filter: 'blur(20px)',
                }}
              />
              <HeroOrb isDark={isDark} />
            </div>
          </motion.div>

        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col items-center gap-2 mt-16"
        >
          <span className="text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase">
            {t.scrollHint}
          </span>
          <motion.button
            onClick={scrollDown}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="flex items-center justify-center w-8 h-8 rounded-full glass border border-white/10 hover:border-indigo-500/30 transition-colors cursor-pointer"
          >
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}
