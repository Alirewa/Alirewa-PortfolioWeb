'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Home, User, Cpu, FolderKanban, Mail } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'contact']

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { lang, toggleLang, isRTL } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const t = content[lang].nav

  useEffect(() => {
    setMounted(true)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const navItems = [
    { label: t.home,     href: '#hero',     id: 'hero',     Icon: Home },
    { label: t.about,    href: '#about',    id: 'about',    Icon: User },
    { label: t.skills,   href: '#skills',   id: 'skills',   Icon: Cpu },
    { label: t.projects, href: '#projects', id: 'projects', Icon: FolderKanban },
    { label: t.contact,  href: '#contact',  id: 'contact',  Icon: Mail },
  ]

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!mounted) return null

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
      >
        <nav
          className="w-full max-w-5xl rounded-2xl glass-card border border-gray-200/60 dark:border-white/10 px-3 py-2 flex items-center justify-between gap-2"
          style={{
            direction: isRTL ? 'rtl' : 'ltr',
            background: theme === 'dark' ? 'rgba(6,6,10,0.78)' : 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }}
        >
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('#hero')}
            className="flex flex-col leading-none text-start group shrink-0 cursor-pointer px-1 py-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="gradient-text font-black text-sm tracking-tight">
              {lang === 'fa' ? 'علیرضا پورغلام' : 'Alireza'}
            </span>
            <span className="text-[9px] text-gray-600 dark:text-gray-400 font-medium mt-0.5 group-hover:text-indigo-400 transition-colors duration-200">
              {lang === 'fa' ? 'توسعه‌دهنده' : 'Frontend Dev'}
            </span>
          </motion.button>

          {/* Desktop nav items */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {navItems.map(({ label, href, id, Icon }) => {
              const isActive = activeSection === id
              return (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-indigo-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-indigo-400'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-indigo-500/12 border border-indigo-500/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{label}</span>
                </button>
              )
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Lang toggle */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggleLang}
              className="px-2.5 h-8 rounded-xl text-[11px] font-bold text-indigo-400 border border-indigo-500/25 hover:bg-indigo-500/12 hover:border-indigo-500/40 transition-all duration-200 cursor-pointer"
            >
              {lang === 'en' ? 'FA' : 'EN'}
            </motion.button>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 rounded-xl border border-gray-200/60 dark:border-white/10 flex items-center justify-center hover:bg-white/8 hover:border-white/20 transition-all duration-200 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-yellow-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
              )}
            </motion.button>

            {/* Mobile menu */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-8 h-8 rounded-xl border border-gray-200/60 dark:border-white/10 flex items-center justify-center hover:bg-white/8 transition-all duration-200 text-gray-600 dark:text-gray-400 cursor-pointer"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-3.5 h-3.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.div>

      {/* ── Mobile drawer — slides from top ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[72px] inset-x-4 z-50 rounded-2xl p-4 shadow-2xl md:hidden"
              style={{
                direction: isRTL ? 'rtl' : 'ltr',
                background: theme === 'dark' ? 'rgba(10,10,18,0.97)' : 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(99, 102, 241, 0.18)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
              }}
            >
              <div className="flex flex-col gap-1">
                {navItems.map(({ label, href, id, Icon }, i) => {
                  const isActive = activeSection === id
                  return (
                    <motion.button
                      key={href}
                      initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.18 }}
                      onClick={() => scrollTo(href)}
                      className={`flex items-center gap-3 py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer w-full ${
                        isActive
                          ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20'
                          : 'text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/8'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isActive ? 'bg-indigo-500/20' : 'bg-white/5'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <span>{label}</span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
