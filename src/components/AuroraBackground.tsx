'use client'

/**
 * AuroraBackground
 *
 * CSS-only animated gradient blobs with real blur filter.
 * This produces genuine glassmorphism depth without WebGL overhead.
 * The blobs are opaque radial gradients that fade to transparent —
 * where they overlap, colours mix naturally.
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
}

const BLOBS: Blob[] = [
  // Indigo — top-left anchor
  {
    w: 680, h: 560,
    top: '-16%', left: '-14%',
    bg: 'radial-gradient(ellipse, rgba(99,102,241,0.52) 0%, transparent 65%)',
    blur: 90,
    anim: 'aurora-1 18s ease-in-out infinite',
  },
  // Sky — top-right anchor
  {
    w: 660, h: 520,
    top: '-10%', right: '-16%',
    bg: 'radial-gradient(ellipse, rgba(56,189,248,0.40) 0%, transparent 65%)',
    blur: 100,
    anim: 'aurora-2 23s ease-in-out infinite',
  },
  // Purple — centre
  {
    w: 600, h: 580,
    top: '28%', left: '16%',
    bg: 'radial-gradient(ellipse, rgba(167,139,250,0.34) 0%, transparent 65%)',
    blur: 90,
    anim: 'aurora-3 20s ease-in-out infinite',
  },
  // Emerald — bottom
  {
    w: 520, h: 400,
    bottom: '2%', left: '38%',
    bg: 'radial-gradient(ellipse, rgba(52,211,153,0.22) 0%, transparent 65%)',
    blur: 80,
    anim: 'aurora-4 27s ease-in-out infinite',
  },
]

export default function AuroraBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden dark:opacity-100 opacity-40"
      style={{ zIndex: 0 }}
    >
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
  )
}
