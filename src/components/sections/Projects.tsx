'use client'

import { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { content, projects } from '@/lib/content'
import { useGithubRepos } from '@/lib/useGithubData'

function ProjectIcon({ name, color }: { name: string; color: string }) {
  const Icon = ((Icons as unknown) as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[name] ?? Icons.Code2
  return <Icon className="w-6 h-6" style={{ color }} />
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

function ProjectCard({
  project,
  getStars,
  t,
  lang,
}: {
  project: typeof projects[number]
  getStars: (url: string | null) => number | null
  t: { liveDemo: string; sourceCode: string }
  lang: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="h-full glass-card p-5 flex flex-col transition-all duration-300 cursor-default rounded-[1.25rem]"
      style={{
        borderColor: hovered ? `${project.color}50` : undefined,
        boxShadow: hovered ? `0 0 0 1px ${project.color}28, 0 20px 48px ${project.color}14` : undefined,
        transform: hovered ? 'translateY(-3px)' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: `${project.color}16`,
            border: `1px solid ${project.color}30`,
            boxShadow: hovered ? `0 0 20px ${project.color}28` : 'none',
          }}
        >
          <ProjectIcon name={project.icon} color={project.color} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg glass border border-white/10 text-slate-500 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-500/35 transition-all text-xs font-mono cursor-pointer min-w-[2rem] justify-center"
              title={t.sourceCode}
            >
              <GithubIcon />
              {getStars(project.github) !== null && <span>{getStars(project.github)}</span>}
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-500 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-500/35 transition-all cursor-pointer"
              title={t.liveDemo}
            >
              <Icons.ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Title + description */}
      <div className="flex-1 mb-4">
        <h3
          className="text-base font-bold dark:text-white text-gray-800 mb-1.5 leading-tight transition-colors duration-200"
          style={{ color: hovered ? project.color : undefined }}
        >
          {lang === 'fa' && project.titleFa ? project.titleFa : project.title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed line-clamp-3">
          {lang === 'fa' && project.descriptionFa ? project.descriptionFa : project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] font-mono rounded-md"
            style={{
              background: `${project.color}10`,
              color: project.color,
              border: `1px solid ${project.color}22`,
            }}
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="px-2 py-0.5 text-[10px] font-mono rounded-md dark:bg-white/5 bg-gray-100/80 text-slate-500 dark:text-gray-500 border border-white/10">
            +{project.tags.length - 3}
          </span>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-80px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].projects
  const { repos } = useGithubRepos()

  const [page, setPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(1)
  const [paused, setPaused] = useState(false)

  // Show cardsPerPage cards but advance 1 at a time → more dots
  const totalPages = Math.max(1, projects.length - cardsPerPage + 1)

  const getStars = (githubUrl: string | null): number | null => {
    if (!githubUrl) return null
    const repoName = githubUrl.split('/').pop()
    const repo = repos.find((r) => r.name === repoName)
    return repo ? repo.stargazers_count : null
  }

  // Responsive cards per page — useLayoutEffect to avoid initial flash
  const calcCards = () => {
    if (typeof window === 'undefined') return 1
    const w = window.innerWidth
    if (w >= 1024) return 4
    if (w >= 768) return 3
    return 1
  }
  useLayoutEffect(() => {
    const update = () => setCardsPerPage(calcCards())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Auto-rotate
  const advance = useCallback(() => {
    setPage((p) => (p + 1) % totalPages)
  }, [totalPages])

  useEffect(() => {
    if (paused || !isInView) return
    const iv = setInterval(advance, 3500)
    return () => clearInterval(iv)
  }, [advance, paused, isInView])

  // Reset page when cardsPerPage changes
  useEffect(() => {
    setPage(0)
  }, [cardsPerPage])

  const currentCards = projects.slice(page, page + cardsPerPage)
  const slideDir = isRTL ? -1 : 1

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-16 md:py-24 px-4 sm:px-6"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-indigo-400 mb-2 tracking-[0.18em] uppercase">
            {lang === 'en' ? '// what I built' : '// نمونه‌کارها'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-3 dark:text-white text-gray-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-lg leading-relaxed">{t.subtitle}</p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cards */}
          <div className="w-full py-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${page}-${cardsPerPage}`}
                initial={{ opacity: 0, x: 30 * slideDir }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 * slideDir }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`grid gap-4 min-w-0 ${
                  cardsPerPage === 4 ? 'grid-cols-4' :
                  cardsPerPage === 3 ? 'grid-cols-3' :
                  'grid-cols-1'
                }`}
              >
                {currentCards.map((project) => (
                  <div key={project.id} className="min-w-0 h-full">
                    <ProjectCard
                      project={project}
                      getStars={getStars}
                      t={t}
                      lang={lang}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className="transition-all duration-300 rounded-full cursor-pointer"
                style={{
                  width: i === page ? 22 : 6,
                  height: 6,
                  background: i === page ? '#6366f1' : 'rgba(99,102,241,0.28)',
                }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
