'use client'

import { motion } from 'framer-motion'
import { Send, Heart } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content } from '@/lib/content'

function GithubSvg({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

function LinkedinSvg({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TelegramSvg({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Github: GithubSvg,
  Linkedin: LinkedinSvg,
  Send: TelegramSvg,
}

export default function Footer() {
  const { lang, isRTL } = useLang()
  const t = content[lang].footer
  const nav = content[lang].nav
  const social = content[lang].contact.social
  const year = new Date().getFullYear()

  const navLinks = [
    { label: nav.home,     href: '#hero' },
    { label: nav.about,    href: '#about' },
    { label: nav.skills,   href: '#skills' },
    { label: nav.projects, href: '#projects' },
    { label: nav.contact,  href: '#contact' },
  ]

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer
      className="relative border-t dark:border-white/5 border-indigo-100/60 pt-10 pb-5 px-4"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Grid — 2 cols on mobile, 3 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {/* Col 1 — Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-2 md:col-span-1"
          >
            <div className="mb-3">
              <div className="gradient-text font-black text-sm tracking-tight leading-none">Alireza Pourgholam</div>
              <div className="text-[10px] text-gray-500 font-medium mt-1">Frontend Developer</div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
              {t.tagline}
            </p>
          </motion.div>

          {/* Col 2 — Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h4 className="text-xs font-semibold dark:text-gray-400 text-gray-600 mb-3 uppercase tracking-widest">
              {t.quickLinks}
            </h4>
            <ul className="space-y-1.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-xs text-gray-500 hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Social */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs font-semibold dark:text-gray-400 text-gray-600 mb-3 uppercase tracking-widest">
              {t.connect}
            </h4>
            <div className="flex flex-col gap-2">
              {social.map((link) => {
                const Icon = SOCIAL_ICONS[link.icon] ?? Send
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-indigo-400 transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-lg dark:bg-white/5 bg-white/70 dark:border-white/10 border-indigo-100 border flex items-center justify-center group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-all">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {link.name}
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t dark:border-white/5 border-indigo-100/40 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {year} Alireza Pourgholam. {t.rights}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>{t.builtWith}</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400 mx-0.5" />
            <span>Next.js · Three.js · Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
