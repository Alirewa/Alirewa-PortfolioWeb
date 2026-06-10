'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Download, ArrowRight, Clock } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].about
  const [showCvNotice, setShowCvNotice] = useState(false)

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 md:py-24 px-4 sm:px-6"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-xs font-mono text-indigo-400 mb-2 tracking-[0.18em] uppercase">
            {lang === 'en' ? '// who I am' : '// درباره من'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 mb-2 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-lg leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Bio paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="space-y-4 mb-10"
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
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          <div className="flex flex-col gap-2">
            <motion.button
              onClick={() => setShowCvNotice(true)}
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
            </motion.button>

            <AnimatePresence>
              {showCvNotice && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-400/30 bg-amber-500/8 text-amber-500 dark:text-amber-400 text-xs"
                >
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'en' ? 'CV coming soon — will be added here shortly.' : 'رزومه به‌زودی اینجا میذارم.'}</span>
                  <button onClick={() => setShowCvNotice(false)} className="mr-auto text-amber-400/60 hover:text-amber-400 cursor-pointer text-base leading-none">×</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all text-sm font-medium group cursor-pointer"
          >
            {lang === 'en' ? 'Get in touch' : 'تماس بگیرید'}
            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
              isRTL ? '-scale-x-100 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
            }`} />
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}
