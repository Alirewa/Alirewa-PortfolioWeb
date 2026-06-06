'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

const HeroOrb = dynamic(() => import('@/components/three/HeroOrb'), {
  ssr: false,
  loading: () => <div className="w-36 h-36 md:w-44 md:h-44 mx-auto mb-4" />,
})

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
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Local gradient orbs (supplement the aurora) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 dark:bg-indigo-600/15 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 dark:bg-sky-500/12 bg-sky-400/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* 3D code bracket above name */}
        <HeroOrb />

        {/* Greeting — EN only; FA just shows the name */}
        {!isRTL && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-400 mb-3 font-light"
          >
            {t.greeting}
          </motion.p>
        )}

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
        >
          <span className="gradient-text glow-text">{t.name}</span>
        </motion.h1>

        {/* Role animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="text-gray-500 text-sm font-mono">{'{'}</span>
          <div className="h-8 md:h-10">
            <TypeAnimation
              key={lang}
              sequence={roles as (string | number)[]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-xl md:text-2xl font-semibold text-indigo-400 font-mono"
            />
          </div>
          <span className="text-gray-500 text-sm font-mono">{'}'}</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            className="relative px-5 py-2.5 rounded-xl font-semibold text-white text-sm overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-sky-500 transition-all duration-300 group-hover:from-indigo-500 group-hover:to-sky-400" />
            <span className="relative flex items-center gap-1.5">
              {t.cta}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm glass border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 transition-all duration-300 dark:text-indigo-300 text-gray-700 dark:border-indigo-400/30"
          >
            {t.ctaSecondary}
          </motion.button>
        </motion.div>

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-green-500/25 bg-green-500/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm font-medium text-green-400">
              {t.available}
            </span>
          </div>
        </motion.div>

        {/* Tech stack pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {['React.js', 'Next.js', 'TypeScript', 'Tailwind', 'Python', 'Three.js'].map((tech, i) => (
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2"
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
