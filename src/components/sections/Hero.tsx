'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

const HeroOrb = dynamic(() => import('@/components/three/HeroOrb'), {
  ssr: false,
  loading: () => <div style={{ width: '280px', height: '160px' }} />,
})

const TECH_TAGS = ['React.js', 'Next.js', 'TypeScript', 'Tailwind', 'Python', 'Three.js']

export default function Hero() {
  const { lang, isRTL } = useLang()
  const t = content[lang].hero

  const roles = t.roles.flatMap((role) => [role, 2000])

  const scrollToProjects = () =>
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20"
    >
      {/* Ambient gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 dark:bg-indigo-600/15 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 dark:bg-sky-500/12 bg-sky-400/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* ── Main layout: stack on mobile, 2-col on lg+ ── */}
        {/* direction:ltr forces the column order (orb left, text right) on desktop.
            Each child sets its own direction for text alignment. */}
        <div
          className="flex flex-col items-center lg:flex-row lg:items-center lg:gap-10 xl:gap-16"
          style={{ direction: 'ltr' }}
        >

          {/* ── Column A: 3D Orb — 30% on desktop ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="lg:w-[30%] shrink-0 flex justify-center mb-2 lg:mb-0"
          >
            <HeroOrb />
          </motion.div>

          {/* ── Column B: Text content — 70% on desktop ── */}
          <div
            className={`flex-1 flex flex-col items-center text-center ${
              isRTL ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'
            }`}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >

            {/* Greeting — EN only */}
            {!isRTL && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-400 mb-2 font-light"
              >
                {t.greeting}
              </motion.p>
            )}

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 tracking-tight"
            >
              <span className="gradient-text glow-text">{t.name}</span>
            </motion.h1>

            {/* Role TypeAnimation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="text-gray-500 text-sm font-mono">{'{'}</span>
              <div className="h-8 md:h-10">
                <TypeAnimation
                  key={lang}
                  sequence={roles as (string | number)[]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-lg md:text-2xl font-semibold text-indigo-400 font-mono"
                />
              </div>
              <span className="text-gray-500 text-sm font-mono">{'}'}</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base text-gray-500 dark:text-gray-400 max-w-lg mb-8 leading-relaxed"
            >
              {t.tagline}
            </motion.p>

            {/* ── CTAs + Available badge — single row ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
                className="relative px-5 py-2.5 rounded-xl font-semibold text-white text-sm overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-sky-500 transition-all duration-300 group-hover:from-indigo-500 group-hover:to-sky-400" />
                <span className="relative flex items-center gap-1.5">
                  {t.cta}
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isRTL ? '-scale-x-100 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
                    }`}
                  />
                </span>
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm glass border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 transition-all duration-300"
              >
                {t.ctaSecondary}
              </motion.button>

              {/* Open-to-work badge — inline */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/25 bg-green-500/5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-medium text-green-400 whitespace-nowrap">{t.available}</span>
              </div>
            </motion.div>

            {/* Skill tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className={`flex flex-wrap gap-2 justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`}
            >
              {TECH_TAGS.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className="px-3 py-1 text-xs font-mono font-medium rounded-lg glass border border-white/10 text-gray-400 hover:border-indigo-500/30 hover:text-indigo-400 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

          </div>
        </div>

        {/* ── Scroll indicator — always centered ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2 mt-14 lg:mt-16"
        >
          <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">
            {t.scrollHint}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-gray-500/30 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-indigo-500 rounded-full" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
