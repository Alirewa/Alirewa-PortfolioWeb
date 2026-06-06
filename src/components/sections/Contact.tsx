'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, CheckCircle, Send, Loader2, Phone } from 'lucide-react'
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

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Github: GithubSvg,
  Linkedin: LinkedinSvg,
  Send: TelegramSvg,
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].contact

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ?? ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString(), source: 'portfolio' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const infoItems: Array<{
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
    href?: string
    ltr?: boolean
    compact?: boolean
  }> = [
    {
      icon: Phone,
      label: lang === 'en' ? 'Phone' : 'تلفن',
      value: t.info.phone,
      href: 'tel:+989113101767',
      ltr: true,
    },
    {
      icon: Mail,
      label: lang === 'en' ? 'Email' : 'ایمیل',
      value: t.info.email,
      href: `mailto:${t.info.email}`,
      ltr: true,
      compact: true,
    },
    {
      icon: MapPin,
      label: lang === 'en' ? 'Location' : 'آدرس',
      value: t.info.location,
    },
    {
      icon: CheckCircle,
      label: lang === 'en' ? 'Status' : 'وضعیت',
      value: t.info.availability,
    },
  ]

  const inputBase =
    'w-full px-4 py-3 rounded-xl border text-sm dark:bg-white/5 bg-white/80 dark:text-gray-200 text-gray-800 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none transition-all dark:border-white/10 border-indigo-200/60 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15'

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 px-4"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-indigo-400 mb-2 tracking-widest uppercase">
            {lang === 'en' ? '// get in touch' : '// در تماس باش'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-3 dark:text-white text-gray-900">
            {t.title}
          </h2>
          <p className="text-gray-500 text-base max-w-lg">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Info + Social */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-3"
          >
            {infoItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-3 p-4 dark:bg-white/5 bg-white/70 dark:border-white/10 border-indigo-100/80 border rounded-2xl hover:border-indigo-500/30 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-500/20 transition-colors">
                  <item.icon className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-500 font-medium mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={`${item.compact ? 'text-xs' : 'text-sm'} font-medium dark:text-gray-200 text-gray-700 hover:text-indigo-500 transition-colors break-all`}
                      style={item.ltr ? { direction: 'ltr', display: 'inline-block' } : undefined}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm dark:text-gray-200 text-gray-700 leading-snug">{item.value}</div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="pt-2"
            >
              <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-widest">
                {lang === 'en' ? 'Find me on' : 'پیدام کن'}
              </p>
              <div className="flex gap-3">
                {t.social.map((link) => {
                  const Icon = ICON_MAP[link.icon] ?? Send
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-11 h-11 rounded-2xl dark:bg-white/5 bg-white/70 dark:border-white/10 border-indigo-100 border flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
                      title={link.name}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="dark:bg-white/5 bg-white/70 dark:border-white/10 border-indigo-100/80 border rounded-3xl p-6 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">{t.form.name}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.form.name}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">{t.form.email}</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t.form.email}
                    className={inputBase}
                    style={{ direction: 'ltr' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{t.form.message}</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.form.message}
                  className={`${inputBase} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-2xl font-semibold text-white relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-sky-500 group-hover:from-indigo-500 group-hover:to-sky-400 transition-all duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  {status === 'sending' && <Loader2 className="w-4 h-4 animate-spin" />}
                  {status === 'success' && <CheckCircle className="w-4 h-4" />}
                  {status === 'idle' && <Send className="w-4 h-4" />}
                  {status === 'idle' && t.form.send}
                  {status === 'sending' && t.form.sending}
                  {status === 'success' && t.form.success}
                  {status === 'error' && t.form.error}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
