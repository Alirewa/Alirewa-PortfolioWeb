import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import ProfileCard from '@/components/sections/ProfileCard'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import AITools from '@/components/sections/AITools'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'
import CursorGlow from '@/components/CursorGlow'
import AuroraBackground from '@/components/AuroraBackground'
import BackgroundShapes from '@/components/BackgroundShapes'
import OrbRings from '@/components/OrbRings'
import PhaseDivider from '@/components/PhaseDivider'
import SectionReveal from '@/components/SectionReveal'

export default function Home() {
  return (
    <main className="relative min-h-screen dark:bg-[#020208] bg-white transition-colors duration-500">
      <AuroraBackground />
      <BackgroundShapes />
      <OrbRings />
      <CursorGlow />

      <div className="relative z-10">
        <Navbar />
        <Hero />

        <PhaseDivider num="01" color="#6366f1" />
        <SectionReveal>
          <About />
        </SectionReveal>

        <PhaseDivider num="02" color="#818cf8" />
        <SectionReveal>
          <ProfileCard />
        </SectionReveal>

        <PhaseDivider num="03" color="#0ea5e9" />
        <SectionReveal>
          <Skills />
        </SectionReveal>

        <PhaseDivider num="04" color="#8b5cf6" />
        <SectionReveal>
          <Projects />
        </SectionReveal>

        <PhaseDivider num="05" color="#a855f7" />
        <SectionReveal>
          <AITools />
        </SectionReveal>

        <PhaseDivider num="06" color="#10b981" />
        <SectionReveal>
          <Contact />
        </SectionReveal>

        <Footer />
      </div>
    </main>
  )
}
