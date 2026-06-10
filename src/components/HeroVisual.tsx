'use client'

import { motion } from 'framer-motion'

const DOTS = [
  { ring: 0, angle: 30,  color: '#818cf8', size: 7  },
  { ring: 0, angle: 150, color: '#38bdf8', size: 5  },
  { ring: 0, angle: 270, color: '#c084fc', size: 6  },
  { ring: 1, angle: 60,  color: '#34d399', size: 5  },
  { ring: 1, angle: 200, color: '#f59e0b', size: 7  },
  { ring: 1, angle: 320, color: '#818cf8', size: 5  },
  { ring: 2, angle: 10,  color: '#38bdf8', size: 6  },
  { ring: 2, angle: 130, color: '#c084fc', size: 5  },
  { ring: 2, angle: 250, color: '#f43f5e', size: 6  },
]

const RINGS = [
  { rx: 72, rz: 0,   dur: 9,  dir: 1  },
  { rx: 72, rz: 55,  dur: 13, dir: -1 },
  { rx: 18, rz: -38, dur: 17, dir: 1  },
]

function RingWithDots({ rx, rz, dur, dir, ringIndex, size }: {
  rx: number; rz: number; dur: number; dir: number; ringIndex: number; size: number
}) {
  const dots = DOTS.filter(d => d.ring === ringIndex)
  const r = size / 2   // radius of ellipse in px (half of container)

  return (
    <div
      className="absolute inset-0 rounded-full border border-indigo-400/20"
      style={{
        transform: `rotateX(${rx}deg) rotateZ(${rz}deg)`,
        animation: `orbit${ringIndex} ${dur}s linear infinite ${dir < 0 ? 'reverse' : ''}`,
      }}
    >
      {dots.map((dot, i) => {
        const rad = (dot.angle * Math.PI) / 180
        const x = r * Math.cos(rad)
        const y = r * Math.sin(rad)
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: dot.size,
              height: dot.size,
              background: dot.color,
              boxShadow: `0 0 ${dot.size * 2}px ${dot.color}cc`,
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          />
        )
      })}
    </div>
  )
}

export default function HeroVisual() {
  const size = 280   // container px

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative flex items-center justify-center select-none pointer-events-none"
      style={{ width: size, height: size }}
    >
      {/* CSS keyframes injected inline */}
      <style>{`
        @keyframes orbit0 { from { transform: rotateX(72deg) rotateZ(0deg)   rotateY(0deg); } to { transform: rotateX(72deg) rotateZ(0deg)   rotateY(360deg); } }
        @keyframes orbit1 { from { transform: rotateX(72deg) rotateZ(55deg)  rotateY(0deg); } to { transform: rotateX(72deg) rotateZ(55deg)  rotateY(360deg); } }
        @keyframes orbit2 { from { transform: rotateX(18deg) rotateZ(-38deg) rotateY(0deg); } to { transform: rotateX(18deg) rotateZ(-38deg) rotateY(360deg); } }
        @keyframes pulse-core { 0%,100% { transform: scale(1);   opacity: 0.9; } 50% { transform: scale(1.12); opacity: 1; } }
      `}</style>

      {/* 3D perspective container */}
      <div
        className="absolute inset-0"
        style={{ perspective: '600px', perspectiveOrigin: '50% 50%' }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {RINGS.map((ring, i) => (
            <RingWithDots
              key={i}
              {...ring}
              ringIndex={i}
              size={size}
            />
          ))}
        </div>
      </div>

      {/* Outer glow halo */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 0.72,
          height: size * 0.72,
          background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(56,189,248,0.08) 55%, transparent 75%)',
          filter: 'blur(18px)',
        }}
      />

      {/* Center sphere */}
      <div
        className="relative z-10 rounded-full"
        style={{
          width: 72,
          height: 72,
          background: 'radial-gradient(circle at 38% 32%, #818cf8 0%, #6366f1 40%, #1e1b4b 100%)',
          boxShadow: '0 0 32px rgba(99,102,241,0.55), 0 0 64px rgba(99,102,241,0.22), inset 0 1px 1px rgba(255,255,255,0.25)',
          animation: 'pulse-core 3.5s ease-in-out infinite',
        }}
      >
        {/* Specular highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: 22,
            height: 14,
            top: 10,
            left: 12,
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 100%)',
          }}
        />
      </div>
    </motion.div>
  )
}
