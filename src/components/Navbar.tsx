'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Home, User, Cpu, FolderKanban, Mail } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { lang, toggleLang, isRTL } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const t = content[lang].nav

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: t.home,     href: '#hero',     Icon: Home },
    { label: t.about,    href: '#about',    Icon: User },
    { label: t.skills,   href: '#skills',   Icon: Cpu },
    { label: t.projects, href: '#projects', Icon: FolderKanban },
    { label: t.contact,  href: '#contact',  Icon: Mail },
  ]

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!mounted) return null

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass dark:bg-black/60 bg-white/80 shadow-lg shadow-indigo-500/5 py-3'
            : 'py-5 bg-transparent'
        }`}
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo — name + role */}
          <motion.button
            onClick={() => scrollTo('#hero')}
            className="flex flex-col leading-none text-start group"
            whileHover={{ scale: 1.03 }}
          >
            <span className="gradient-text font-black text-sm tracking-tight">
              {lang === 'fa' ? 'علیرضا پورغلام' : 'Alireza Pourgholam'}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-500 font-medium mt-0.5 group-hover:text-indigo-400 transition-colors">
              {lang === 'fa' ? 'توسعه‌دهنده وب' : 'Frontend Developer'}
            </span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, href, Icon }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-500/8 transition-all group"
              >
                <Icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                {label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Lang toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLang}
              className="px-3 h-9 rounded-xl glass dark:bg-white/5 bg-black/5 text-xs font-bold text-indigo-500 hover:bg-indigo-500/10 transition-colors border border-indigo-500/20"
            >
              {lang === 'en' ? 'FA' : 'EN'}
            </motion.button>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-xl glass dark:bg-white/5 bg-black/5 flex items-center justify-center hover:bg-indigo-500/10 transition-colors border border-indigo-500/20"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-xl glass dark:bg-white/5 bg-black/5 flex items-center justify-center border border-indigo-500/20 text-gray-600 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-3 right-3 z-40 glass dark:bg-[#0f0f1a]/95 bg-white/95 rounded-2xl p-5 shadow-xl border border-indigo-500/20 md:hidden"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            <div className="flex flex-col gap-0.5">
              {navItems.map(({ label, href, Icon }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(href)}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-500/8 transition-all"
                >
                  <span className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  </span>
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
