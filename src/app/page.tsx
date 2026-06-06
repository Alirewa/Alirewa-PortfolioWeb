'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import AITools from '@/components/sections/AITools'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'
import CursorGlow from '@/components/CursorGlow'
import AuroraBackground from '@/components/AuroraBackground'
import { useLang } from '@/lib/LangContext'

interface PhaseDividerProps {
  num: string
  color?: string
}

function PhaseDivider({ num, color = '#6366f1' }: PhaseDividerProps) {
  const { isRTL } = useLang()
  return (
    <div
      className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-4"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <span
        className="text-5xl font-black font-mono leading-none select-none tabular-nums"
        style={{ color: `${color}15` }}
      >
        {num}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, ${color}30, transparent)` }}
      />
    </div>
  )
}

export default function Home() {
  return (
    <main className="relative min-h-screen dark:bg-[#06060a] bg-[#f4f6ff] transition-colors duration-500">
      <AuroraBackground />
      <CursorGlow />

      <div className="relative z-10">
        <Navbar />
        <Hero />

        <PhaseDivider num="01" color="#6366f1" />
        <About />

        <PhaseDivider num="02" color="#0ea5e9" />
        <Skills />

        <PhaseDivider num="03" color="#8b5cf6" />
        <Projects />

        <PhaseDivider num="04" color="#a855f7" />
        <AITools />

        <PhaseDivider num="05" color="#10b981" />
        <Contact />

        <Footer />
      </div>
    </main>
  )
}
