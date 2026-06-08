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
        <SectionReveal><About /></SectionReveal>
        <SectionReveal><ProfileCard /></SectionReveal>
        <SectionReveal><Skills /></SectionReveal>
        <SectionReveal><Projects /></SectionReveal>
        <SectionReveal><AITools /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
        <Footer />
      </div>
    </main>
  )
}
