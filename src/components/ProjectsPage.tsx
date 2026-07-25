'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Star, GitFork, ExternalLink, Code2,
  Layers, Globe, Filter, ChevronDown, Clock, ArrowUpDown
} from 'lucide-react'
import * as Icons from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { projects as CURATED, type Project } from '@/lib/content'
import { useGithubRepos, type GithubRepo } from '@/lib/useGithubData'
import Navbar from '@/components/Navbar'

/* ── Language colour map ─────────────────────────────────── */
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572a5',
  CSS: '#563d7c', HTML: '#e34c26', Rust: '#dea584', Go: '#00add8',
  Shell: '#89e051', Vue: '#42b883',
}

/* ── Repos to hide (meta / config / profile repos) ──────── */
const HIDDEN_REPOS = ['MyPersonal-Portfolio-Website', 'V2ray-Configs', 'Alirewa']

/* ── Persian translations for non-curated GitHub repos ───── */
const normalizeKey = (name: string) => name.toLowerCase().replace(/[-_\s]/g, '')

const REPO_FA: Record<string, { titleFa: string; descriptionFa?: string }> = {
  'kishview': {
    titleFa: 'کیش ویو',
    descriptionFa: 'اپلیکیشن وب برای جستجو و کاوش اطلاعات گردشگری جزیره کیش — رستوران‌ها، هتل‌ها و جاذبه‌های دیدنی.',
  },
  'persianuikit': {
    titleFa: 'کیت رابط کاربری فارسی',
    descriptionFa: 'مجموعه کامپوننت‌های رابط کاربری با پشتیبانی کامل از RTL و زبان فارسی برای پروژه‌های وب.',
  },
  'todolist': {
    titleFa: 'لیست کارها',
    descriptionFa: 'اپلیکیشن مدیریت وظایف با قابلیت افزودن، حذف و علامت‌گذاری تسک‌ها.',
  },
  'resumebuilder': {
    titleFa: 'رزومه‌ساز',
    descriptionFa: 'ابزار آنلاین ساخت رزومه حرفه‌ای با قالب‌های آماده و قابلیت خروجی گرفتن.',
  },
  'footballworldcup': {
    titleFa: 'جام جهانی فوتبال',
    descriptionFa: 'وب‌اپلیکیشن نمایش اطلاعات، گروه‌بندی و نتایج بازی‌های جام جهانی فوتبال.',
  },
  'factorbuilder': {
    titleFa: 'فاکتورساز',
    descriptionFa: 'نرم‌افزار صدور فاکتور حرفه‌ای با مدیریت اقلام، محاسبه مالیات و قابلیت چاپ.',
  },
  'cybertoolkit': {
    titleFa: 'جعبه‌ابزار سایبری',
    descriptionFa: 'مجموعه ابزارهای امنیت سایبری برای تست و تحلیل امنیت شبکه.',
  },
  'letterbuilder': {
    titleFa: 'نامه‌ساز',
    descriptionFa: 'ابزار ساخت و طراحی نامه‌های رسمی و اداری با قالب‌های از پیش آماده.',
  },
}

/* ── Merge curated + GitHub repos ───────────────────────── */
function useMergedProjects(githubRepos: GithubRepo[]) {
  return useMemo(() => {
    const curatedMap = new Map(
      CURATED.map((p) => [p.github?.split('/').pop()?.toLowerCase(), p])
    )

    const enriched: Array<{
      id: string | number
      title: string
      titleFa?: string
      description: string
      descriptionFa?: string
      tags: string[]
      color: string
      icon: string
      github: string | null
      live: string | null
      stars: number
      forks: number
      language: string | null
      curated: boolean
      isProduction: boolean
      updatedAt: string | null
    }> = []

    // First: all curated in order
    CURATED.forEach((p) => {
      const repoName = p.github?.split('/').pop()?.toLowerCase()
      const gh = githubRepos.find((r) => r.name.toLowerCase() === repoName)
      enriched.push({
        id: p.id,
        title: p.title,
        titleFa: p.titleFa,
        description: p.description,
        descriptionFa: p.descriptionFa,
        tags: p.tags,
        color: p.color,
        icon: p.icon,
        github: p.github,
        live: p.live ?? gh?.homepage ?? null,
        stars: gh?.stargazers_count ?? 0,
        forks: gh?.forks_count ?? 0,
        language: gh?.language ?? null,
        curated: true,
        isProduction: p.isProduction ?? false,
        updatedAt: gh?.updated_at ?? null,
      })
    })

    // Then: GitHub repos not in curated list
    githubRepos
      .filter((r) => !r.fork && !HIDDEN_REPOS.includes(r.name))
      .filter((r) => !curatedMap.has(r.name.toLowerCase()))
      .forEach((r) => {
        const lang = r.language ?? ''
        const color = LANG_COLORS[lang] ?? '#6366f1'
        const faData = REPO_FA[normalizeKey(r.name)]
        enriched.push({
          id: `gh-${r.id}`,
          title: r.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          titleFa: faData?.titleFa,
          description: r.description ?? 'Open-source project on GitHub.',
          descriptionFa: faData?.descriptionFa,
          tags: r.topics.length ? r.topics : (lang ? [lang] : []),
          color,
          icon: 'Code2',
          github: r.html_url,
          live: r.homepage ?? null,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: lang,
          curated: false,
          isProduction: false,
          updatedAt: r.updated_at,
        })
      })

    return enriched
  }, [githubRepos])
}

/* ── Relative time helper ─────────────────────────────────── */
function timeAgo(iso: string | null, lang: string): string | null {
  if (!iso) return null
  const diffMs = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days < 1) return lang === 'fa' ? 'امروز' : 'today'
  if (days === 1) return lang === 'fa' ? 'دیروز' : 'yesterday'
  if (days < 30) return lang === 'fa' ? `${days} روز پیش` : `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return lang === 'fa' ? `${months} ماه پیش` : `${months}mo ago`
  const years = Math.floor(months / 12)
  return lang === 'fa' ? `${years} سال پیش` : `${years}y ago`
}

/* ── Icon helper ─────────────────────────────────────────── */
function ProjectIcon({ name, color }: { name: string; color: string }) {
  const Icon = ((Icons as unknown) as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[name] ?? Icons.Code2
  return <Icon className="w-5 h-5" style={{ color }} />
}

/* ── GitHub icon ─────────────────────────────────────────── */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

/* ── Single project card ─────────────────────────────────── */
function ProjectCard({
  project, index, lang, isRTL,
}: {
  project: ReturnType<typeof useMergedProjects>[number]
  index: number
  lang: string
  isRTL: boolean
}) {
  const title = (lang === 'fa' && project.titleFa) ? project.titleFa : project.title
  const desc = (lang === 'fa' && project.descriptionFa) ? project.descriptionFa : project.description
  const target = project.live ?? project.github

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.38, delay: Math.min(index * 0.06, 0.4), ease: [0.25, 0.46, 0.45, 0.94] }}
      layout
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        border: `1px solid var(--glass-border)`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = `0 0 0 1px ${project.color}35, 0 16px 48px ${project.color}18`
        el.style.borderColor = `${project.color}40`
        el.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = ''
        el.style.borderColor = 'var(--glass-border)'
        el.style.transform = ''
      }}
    >
      {/* Color bar top */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}55)` }} />

      <div className="flex flex-col flex-1 p-5" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${project.color}16`, border: `1px solid ${project.color}30` }}
          >
            <ProjectIcon name={project.icon} color={project.color} />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.stars > 0 && (
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-gray-500">
                <Star className="w-3 h-3" />
                {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-gray-500">
                <GitFork className="w-3 h-3" />
                {project.forks}
              </span>
            )}
            {project.isProduction && (
              <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                {lang === 'fa' ? 'پروداکشن' : 'Production'}
              </span>
            )}
            {project.curated && !project.isProduction && (
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}35` }}
              >
                {lang === 'fa' ? 'ویژه' : 'Featured'}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3
            className="text-base font-bold dark:text-white text-gray-900 leading-tight transition-colors duration-200 group-hover:text-[var(--accent)]"
            style={{ '--accent': project.color } as React.CSSProperties}
          >
            {title}
          </h3>
          {project.updatedAt && (
            <span className="flex items-center gap-1 text-[10px] shrink-0 text-slate-400 dark:text-gray-600">
              <Clock className="w-3 h-3" />
              {timeAgo(project.updatedAt, lang)}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs dark:text-gray-400 text-slate-600 leading-relaxed mb-4 flex-1 line-clamp-3">
          {desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-mono rounded-md"
              style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}22` }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-md dark:bg-white/5 bg-gray-100 dark:text-gray-500 text-slate-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${project.color}dd, ${project.color}99)` }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {lang === 'fa' ? 'مشاهده دمو' : 'Live Demo'}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border dark:border-white/10 border-gray-200 dark:text-gray-400 text-slate-600 hover:border-indigo-400/40 hover:text-indigo-500 dark:hover:text-indigo-400 ${project.live ? 'px-3' : 'flex-1'}`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              {!project.live && (lang === 'fa' ? 'سورس کد' : 'Source Code')}
            </a>
          )}
          {!project.live && !project.github && (
            <span className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium dark:text-gray-600 text-slate-400 border dark:border-white/5 border-gray-100">
              <Globe className="w-3.5 h-3.5" />
              {lang === 'fa' ? 'به‌زودی' : 'Coming soon'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main page ───────────────────────────────────────────── */
export default function ProjectsPage() {
  const { lang, isRTL } = useLang()
  const { repos, totalStars, loading } = useGithubRepos()
  const allProjects = useMergedProjects(repos)

  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'recent' | 'stars'>('recent')

  /* Build filter options from all tags */
  const filterOptions = useMemo(() => {
    const counts: Record<string, number> = {}
    allProjects.forEach((p) => p.tags.forEach((t) => { counts[t] = (counts[t] ?? 0) + 1 }))
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag)
  }, [allProjects])

  const filtered = useMemo(() => {
    const base = activeFilter === 'all'
      ? allProjects
      : allProjects.filter((p) => p.tags.some((t) => t === activeFilter))

    return [...base].sort((a, b) => {
      if (sortBy === 'stars') return b.stars - a.stars
      const at = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
      const bt = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
      return bt - at
    })
  }, [allProjects, activeFilter, sortBy])

  const totalCount = allProjects.length
  const featuredCount = allProjects.filter((p) => p.curated).length

  return (
    <div
      className="min-h-screen dark:bg-[#06060a] bg-gray-50"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <Navbar />

      {/* Background blobs */}
      <div className="fixed top-20 left-1/4 w-[500px] h-[500px] dark:bg-indigo-600/8 bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-[400px] h-[400px] dark:bg-sky-500/6 bg-sky-400/4 rounded-full blur-3xl pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-24">

        {/* ── Back link ── */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-0.5 ${isRTL ? 'rotate-180' : ''}`} />
            {lang === 'fa' ? 'بازگشت به خانه' : 'Back to home'}
          </Link>
        </motion.div>

        {/* ── Hero header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-indigo-500 dark:text-indigo-400 mb-3 tracking-[0.18em] uppercase">
            {lang === 'fa' ? '// نمونه‌کارها' : '// all projects'}
          </p>
          <h1 className="text-4xl md:text-5xl font-black dark:text-white text-gray-900 tracking-tight mb-4">
            {lang === 'fa' ? 'پروژه‌های من' : 'My Projects'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl leading-relaxed">
            {lang === 'fa'
              ? 'مجموعه‌ای از پروژه‌هایی که توسعه داده‌ام — از اپلیکیشن‌های وب تا ابزارهای اتوماسیون.'
              : 'A collection of things I built — from web apps to automation tools.'}
          </p>

          {/* Stats chips */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { icon: Layers, value: totalCount, label: lang === 'fa' ? 'پروژه' : 'Projects' },
              { icon: Star, value: totalStars || '—', label: lang === 'fa' ? 'ستاره' : 'Stars' },
              { icon: Code2, value: featuredCount, label: lang === 'fa' ? 'ویژه' : 'Featured' },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold dark:bg-white/5 bg-white/80 dark:border-white/8 border-gray-200/70 border dark:text-gray-300 text-gray-600"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-indigo-500 dark:text-indigo-400">{value}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Filter bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          {/* Mobile toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border dark:border-white/10 border-gray-200 dark:text-gray-400 text-slate-600 cursor-pointer mb-3"
          >
            <Filter className="w-4 h-4" />
            {lang === 'fa' ? 'فیلتر' : 'Filter'}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className={`flex flex-wrap items-center justify-between gap-3 ${showFilters ? 'flex' : 'hidden sm:flex'}`}>
            <div className="flex flex-wrap gap-2">
              {['all', ...filterOptions].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer"
                  style={activeFilter === f ? {
                    background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
                    color: '#fff',
                    boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
                  } : {
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'inherit',
                  }}
                >
                  {f === 'all' ? (lang === 'fa' ? 'همه' : 'All') : f}
                  {f !== 'all' && (
                    <span className="ml-1.5 opacity-50">
                      {allProjects.filter((p) => p.tags.includes(f)).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Sort toggle */}
            <button
              onClick={() => setSortBy((s) => (s === 'recent' ? 'stars' : 'recent'))}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 dark:text-gray-400 text-slate-600"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
              title={lang === 'fa' ? 'تغییر ترتیب' : 'Change sort order'}
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
              {sortBy === 'recent'
                ? (lang === 'fa' ? 'جدیدترین' : 'Most Recent')
                : (lang === 'fa' ? 'پراستاره‌ترین' : 'Most Starred')}
            </button>
          </div>
        </motion.div>

        {/* ── Grid ── */}
        {loading && repos.length === 0 ? (
          /* Skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl h-64 dark:bg-white/[0.03] bg-gray-100/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  lang={lang}
                  isRTL={isRTL}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {filtered.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-slate-500 dark:text-gray-600"
          >
            <Code2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">{lang === 'fa' ? 'پروژه‌ای یافت نشد.' : 'No projects found.'}</p>
          </motion.div>
        )}

        {/* ── Get in touch ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 px-8 py-8 rounded-2xl dark:bg-white/[0.03] bg-white/70 border dark:border-white/8 border-gray-200/60">
            <p className="text-sm text-slate-500 dark:text-gray-500">
              {lang === 'fa' ? 'پروژه‌ای در ذهن دارید؟ با من در تماس باشید.' : 'Have a project in mind? Let\'s work together.'}
            </p>
            <a
              href="mailto:alireza.pourgholam444@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white transition-colors cursor-pointer"
            >
              {lang === 'fa' ? 'تماس با من' : 'Get in touch'}
            </a>
          </div>
        </motion.div>

      </main>
    </div>
  )
}
