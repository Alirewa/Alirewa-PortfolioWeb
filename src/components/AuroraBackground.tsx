'use client'

/**
 * AuroraBackground — vivid nebula-style blobs + deep space base layer
 * UI/UX Pro Max: Motion-Driven × Glassmorphism
 */

interface Blob {
  w: number
  h: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  bg: string
  blur: number
  anim: string
  opacity?: number
}

const BLOBS: Blob[] = [
  // Indigo — top-left, dominant anchor
  {
    w: 800, h: 650,
    top: '-22%', left: '-16%',
    bg: 'radial-gradient(ellipse at 40% 40%, rgba(99,102,241,0.72) 0%, rgba(79,70,229,0.38) 40%, transparent 70%)',
    blur: 80,
    anim: 'aurora-1 18s ease-in-out infinite',
  },
  // Sky — top-right vivid
  {
    w: 740, h: 580,
    top: '-16%', right: '-18%',
    bg: 'radial-gradient(ellipse at 60% 35%, rgba(56,189,248,0.60) 0%, rgba(14,165,233,0.28) 45%, transparent 70%)',
    blur: 90,
    anim: 'aurora-2 22s ease-in-out infinite',
  },
  // Violet — centre, large diffuse
  {
    w: 700, h: 680,
    top: '20%', left: '18%',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.50) 0%, rgba(139,92,246,0.22) 45%, transparent 70%)',
    blur: 100,
    anim: 'aurora-3 20s ease-in-out infinite',
  },
  // Emerald — bottom centre
  {
    w: 580, h: 460,
    bottom: '2%', left: '32%',
    bg: 'radial-gradient(ellipse at 50% 60%, rgba(52,211,153,0.35) 0%, rgba(16,185,129,0.15) 50%, transparent 70%)',
    blur: 80,
    anim: 'aurora-4 26s ease-in-out infinite',
  },
  // Rose — bottom-right warmth
  {
    w: 560, h: 440,
    bottom: '5%', right: '-10%',
    bg: 'radial-gradient(ellipse at 55% 55%, rgba(244,114,182,0.38) 0%, rgba(236,72,153,0.16) 50%, transparent 70%)',
    blur: 85,
    anim: 'aurora-5 23s ease-in-out infinite',
  },
  // Deep indigo centre nebula — depth layer
  {
    w: 900, h: 600,
    top: '30%', left: '10%',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(79,70,229,0.18) 0%, transparent 60%)',
    blur: 130,
    anim: 'aurora-3 32s ease-in-out infinite reverse',
  },
]

export default function AuroraBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Deep space base — dark radial center */}
      <div
        className="absolute inset-0 dark:opacity-100 opacity-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,27,75,0.55) 0%, transparent 70%)',
        }}
      />

      {/* Aurora blobs */}
      <div className="dark:opacity-55 opacity-25 absolute inset-0">
        {BLOBS.map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: b.w,
              height: b.h,
              top: b.top,
              left: b.left,
              right: b.right,
              bottom: b.bottom,
              background: b.bg,
              filter: `blur(${b.blur}px)`,
              animation: b.anim,
              willChange: 'transform',
              borderRadius: '50%',
            }}
          />
        ))}
      </div>

      {/* Subtle noise texture overlay — dark mode only */}
      <div
        className="absolute inset-0 dark:opacity-[0.028] opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  )
}
