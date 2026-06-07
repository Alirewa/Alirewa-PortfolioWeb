'use client'

import { useRef, useState } from 'react'
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

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { lang, isRTL } = useLang()
  const t = content[lang].projects
  const [showAll, setShowAll] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { repos } = useGithubRepos()

  const displayed = showAll ? projects : projects.filter((p) => p.featured)

  const getStars = (githubUrl: string | null): number | null => {
    if (!githubUrl) return null
    const repoName = githubUrl.split('/').pop()
    const repo = repos.find((r) => r.name === repoName)
    return repo ? repo.stargazers_count : null
  }

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-20 md:py-28 px-4 sm:px-6"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-indigo-400 mb-2 tracking-[0.18em] uppercase">
            {lang === 'en' ? '// what I built' : '// نمونه‌کارها'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-3 dark:text-white text-gray-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-500 text-base max-w-lg leading-relaxed">{t.subtitle}</p>
        </motion.div>

        {/* Bento grid — 1-col mobile, 2-col md+ */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="relative group cursor-default"
              >
                <div
                  className="relative h-full glass-card p-6 flex flex-col overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: hoveredId === project.id ? `${project.color}50` : undefined,
                    boxShadow: hoveredId === project.id
                      ? `0 0 0 1px ${project.color}30, 0 24px 56px ${project.color}15`
                      : undefined,
                    transform: hoveredId === project.id ? 'translateY(-4px)' : undefined,
                    borderRadius: '1.25rem',
                  }}
                >
                  {/* Radial glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[1.25rem]"
                    style={{ background: `radial-gradient(circle at top left, ${project.color}10, transparent 60%)` }}
                  />

                  {/* Top row: icon + links */}
                  <div className="flex items-start justify-between gap-3 mb-5 relative z-10">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: `${project.color}16`,
                        border: `1px solid ${project.color}30`,
                        boxShadow: hoveredId === project.id ? `0 0 24px ${project.color}30` : 'none',
                      }}
                    >
                      <ProjectIcon name={project.icon} color={project.color} />
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 text-gray-500 hover:text-white hover:border-indigo-500/40 transition-all text-xs font-mono cursor-pointer h-9 min-w-[2.25rem] justify-center"
                          title={t.sourceCode}
                        >
                          <GithubIcon />
                          {getStars(project.github) !== null && (
                            <span>{getStars(project.github)}</span>
                          )}
                        </motion.a>
                      )}
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-indigo-500/40 transition-all cursor-pointer"
                          title={t.liveDemo}
                        >
                          <Icons.ExternalLink className="w-3.5 h-3.5" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Title + description */}
                  <div className="flex-1 relative z-10 mb-5">
                    <h3
                      className="text-lg font-bold dark:text-white text-gray-800 mb-2 transition-colors duration-300 leading-tight"
                      style={{ color: hoveredId === project.id ? project.color : undefined }}
                    >
                      {lang === 'fa' && project.titleFa ? project.titleFa : project.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                      {lang === 'fa' && project.descriptionFa ? project.descriptionFa : project.description}
                    </p>
                  </div>

                  {/* Tech tags — max 4 shown */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg transition-colors"
                        style={{
                          background: `${project.color}10`,
                          color: project.color,
                          border: `1px solid ${project.color}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2.5 py-1 text-xs font-mono rounded-lg dark:bg-white/5 bg-gray-100 text-gray-500 border border-white/10">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more / less */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl glass-card border border-indigo-500/25 dark:text-indigo-400 text-indigo-600 hover:bg-indigo-500/8 hover:border-indigo-500/40 transition-all duration-200 font-medium text-sm cursor-pointer"
          >
            {showAll ? t.showLess : t.viewMore}
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icons.ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
