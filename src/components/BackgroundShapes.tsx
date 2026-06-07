'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

/* ── Floating particles — pure CSS/Framer, no canvas ── */
const PARTICLES = [
  { id: 'p1',  top: '8%',  left: '22%', size: 3,   color: '#6366f1', dur: 7,  delay: 0    },
  { id: 'p2',  top: '15%', left: '68%', size: 2,   color: '#8b5cf6', dur: 9,  delay: 1.2  },
  { id: 'p3',  top: '28%', left: '45%', size: 3.5, color: '#38bdf8', dur: 6,  delay: 2.5  },
  { id: 'p4',  top: '34%', left: '82%', size: 2.5, color: '#a78bfa', dur: 11, delay: 0.8  },
  { id: 'p5',  top: '42%', left: '12%', size: 2,   color: '#6366f1', dur: 8,  delay: 3.1  },
  { id: 'p6',  top: '50%', left: '55%', size: 4,   color: '#818cf8', dur: 7,  delay: 1.7  },
  { id: 'p7',  top: '58%', left: '28%', size: 2,   color: '#38bdf8', dur: 10, delay: 0.4  },
  { id: 'p8',  top: '65%', left: '76%', size: 3,   color: '#8b5cf6', dur: 8,  delay: 2.0  },
  { id: 'p9',  top: '72%', left: '40%', size: 2.5, color: '#6366f1', dur: 6,  delay: 4.2  },
  { id: 'p10', top: '80%', left: '62%', size: 2,   color: '#a78bfa', dur: 9,  delay: 1.5  },
  { id: 'p11', top: '88%', left: '18%', size: 3,   color: '#38bdf8', dur: 7,  delay: 3.6  },
  { id: 'p12', top: '93%', left: '85%', size: 2,   color: '#818cf8', dur: 10, delay: 0.9  },
  { id: 'p13', top: '20%', left: '8%',  size: 2.5, color: '#8b5cf6', dur: 8,  delay: 5.0  },
  { id: 'p14', top: '48%', left: '95%', size: 2,   color: '#6366f1', dur: 11, delay: 2.3  },
  { id: 'p15', top: '75%', left: '5%',  size: 3,   color: '#a78bfa', dur: 7,  delay: 1.1  },
]

/* ── Geometric shapes ── */
interface ShapeDef {
  id: number
  type: 'hexagon' | 'triangle' | 'ring' | 'cross'
  size: number
  top: string
  left: string
  opacity: number
  lightOpacity: number
  rotateSpeed: number
  parallaxFactor: number
  color: string
  animDelay: string
}

const SHAPES: ShapeDef[] = [
  { id: 1,  type: 'hexagon',  size: 88,  top: '5%',  left: '6%',  opacity: 0.14, lightOpacity: 0.06, rotateSpeed: 1,   parallaxFactor: -0.08, color: 'rgba(99,102,241,0.80)',  animDelay: '0s'   },
  { id: 2,  type: 'ring',     size: 145, top: '11%', left: '84%', opacity: 0.11, lightOpacity: 0.05, rotateSpeed: 0.5, parallaxFactor: -0.05, color: 'rgba(139,92,246,0.65)', animDelay: '2s'   },
  { id: 3,  type: 'triangle', size: 68,  top: '22%', left: '92%', opacity: 0.12, lightOpacity: 0.05, rotateSpeed: 1.5, parallaxFactor: -0.09, color: 'rgba(56,189,248,0.70)',  animDelay: '1s'   },
  { id: 4,  type: 'cross',    size: 58,  top: '35%', left: '3%',  opacity: 0.13, lightOpacity: 0.06, rotateSpeed: 0.8, parallaxFactor:  0.05, color: 'rgba(99,102,241,0.65)',  animDelay: '3s'   },
  { id: 5,  type: 'hexagon',  size: 118, top: '44%', left: '90%', opacity: 0.10, lightOpacity: 0.04, rotateSpeed: 0.6, parallaxFactor:  0.07, color: 'rgba(167,139,250,0.60)', animDelay: '0.5s' },
  { id: 6,  type: 'ring',     size: 78,  top: '56%', left: '8%',  opacity: 0.12, lightOpacity: 0.05, rotateSpeed: 1.2, parallaxFactor:  0.06, color: 'rgba(99,102,241,0.70)',  animDelay: '1.5s' },
  { id: 7,  type: 'triangle', size: 98,  top: '64%', left: '78%', opacity: 0.10, lightOpacity: 0.04, rotateSpeed: 0.7, parallaxFactor:  0.05, color: 'rgba(139,92,246,0.58)', animDelay: '4s'   },
  { id: 8,  type: 'cross',    size: 50,  top: '73%', left: '15%', opacity: 0.13, lightOpacity: 0.05, rotateSpeed: 1.1, parallaxFactor: -0.06, color: 'rgba(56,189,248,0.65)',  animDelay: '2.5s' },
  { id: 9,  type: 'hexagon',  size: 72,  top: '82%', left: '88%', opacity: 0.11, lightOpacity: 0.05, rotateSpeed: 0.9, parallaxFactor: -0.05, color: 'rgba(99,102,241,0.62)',  animDelay: '1s'   },
  { id: 10, type: 'ring',     size: 108, top: '91%', left: '4%',  opacity: 0.09, lightOpacity: 0.04, rotateSpeed: 0.4, parallaxFactor: -0.04, color: 'rgba(167,139,250,0.55)', animDelay: '3.5s' },
]

function ShapeItem({ shape }: { shape: ShapeDef }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 2000], [0, 2000 * shape.parallaxFactor])

  const spin  = `${Math.round(28 / shape.rotateSpeed)}s`
  const float = `${Math.round(9  / shape.rotateSpeed)}s`

  const base: React.CSSProperties = { width: shape.size, height: shape.size, background: 'transparent' }

  let inner: React.ReactNode
  if (shape.type === 'hexagon') {
    inner = <div style={{ ...base, clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', border: `1.5px solid ${shape.color}`, animation: `spin-slow ${spin} linear infinite`, animationDelay: shape.animDelay }} />
  } else if (shape.type === 'triangle') {
    inner = <div style={{ ...base, clipPath: 'polygon(50% 0%,100% 100%,0% 100%)', border: `1.5px solid ${shape.color}`, animation: `spin-slow ${spin} linear infinite reverse`, animationDelay: shape.animDelay }} />
  } else if (shape.type === 'ring') {
    inner = <div style={{ ...base, borderRadius: '50%', border: `1.5px solid ${shape.color}`, animation: `float-y ${float} ease-in-out infinite`, animationDelay: shape.animDelay }} />
  } else {
    inner = (
      <div style={{ ...base, position: 'relative', animation: `spin-slow ${Math.round(34 / shape.rotateSpeed)}s linear infinite`, animationDelay: shape.animDelay }}>
        <div style={{ position: 'absolute', top: '50%', left: '15%', width: '70%', height: 1.5, background: shape.color, transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: '15%', height: '70%', width: 1.5, background: shape.color, transform: 'translateX(-50%)' }} />
      </div>
    )
  }

  return (
    <motion.div className="absolute pointer-events-none" style={{ top: shape.top, left: shape.left, y }}>
      <div className="dark:block hidden" style={{ opacity: shape.opacity }}>{inner}</div>
      <div className="dark:hidden block"   style={{ opacity: shape.lightOpacity }}>{inner}</div>
    </motion.div>
  )
}

export default function BackgroundShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>

      {/* Floating glowing particles — opacity+transform only for GPU perf */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            filter: `blur(${p.size * 0.5}px)`,
          }}
          animate={{
            y: [0, -16, 0],
            opacity: [0.45, 0.85, 0.45],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Geometric shapes */}
      {SHAPES.map((shape) => (
        <ShapeItem key={shape.id} shape={shape} />
      ))}
    </div>
  )
}
