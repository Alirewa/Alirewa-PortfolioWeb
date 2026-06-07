'use client'

/**
 * BackgroundShapes — Subtle floating geometric shapes with scroll parallax.
 * Pure CSS shapes (no canvas/WebGL). Visible in dark mode only.
 */

import { motion, useScroll, useTransform } from 'framer-motion'

interface ShapeDef {
  id: number
  type: 'hexagon' | 'triangle' | 'ring' | 'cross'
  size: number
  top: string
  left: string
  opacity: number
  rotateSpeed: number
  parallaxFactor: number
  color: string
  animDelay: string
}

const SHAPES: ShapeDef[] = [
  { id: 1,  type: 'hexagon',  size: 90,  top: '5%',  left: '6%',  opacity: 0.07, rotateSpeed: 1,   parallaxFactor: -0.08, color: 'rgba(99,102,241,0.55)',  animDelay: '0s'   },
  { id: 2,  type: 'ring',     size: 140, top: '12%', left: '85%', opacity: 0.05, rotateSpeed: 0.5, parallaxFactor: -0.05, color: 'rgba(139,92,246,0.45)', animDelay: '2s'   },
  { id: 3,  type: 'triangle', size: 70,  top: '22%', left: '92%', opacity: 0.06, rotateSpeed: 1.5, parallaxFactor: -0.09, color: 'rgba(56,189,248,0.50)',  animDelay: '1s'   },
  { id: 4,  type: 'cross',    size: 60,  top: '35%', left: '3%',  opacity: 0.06, rotateSpeed: 0.8, parallaxFactor:  0.05, color: 'rgba(99,102,241,0.45)',  animDelay: '3s'   },
  { id: 5,  type: 'hexagon',  size: 120, top: '44%', left: '90%', opacity: 0.05, rotateSpeed: 0.6, parallaxFactor:  0.07, color: 'rgba(167,139,250,0.40)', animDelay: '0.5s' },
  { id: 6,  type: 'ring',     size: 80,  top: '56%', left: '8%',  opacity: 0.06, rotateSpeed: 1.2, parallaxFactor:  0.06, color: 'rgba(99,102,241,0.50)',  animDelay: '1.5s' },
  { id: 7,  type: 'triangle', size: 100, top: '64%', left: '78%', opacity: 0.05, rotateSpeed: 0.7, parallaxFactor:  0.05, color: 'rgba(139,92,246,0.40)', animDelay: '4s'   },
  { id: 8,  type: 'cross',    size: 50,  top: '73%', left: '15%', opacity: 0.07, rotateSpeed: 1.1, parallaxFactor: -0.06, color: 'rgba(56,189,248,0.45)',  animDelay: '2.5s' },
  { id: 9,  type: 'hexagon',  size: 75,  top: '82%', left: '88%', opacity: 0.06, rotateSpeed: 0.9, parallaxFactor: -0.05, color: 'rgba(99,102,241,0.42)',  animDelay: '1s'   },
  { id: 10, type: 'ring',     size: 110, top: '91%', left: '4%',  opacity: 0.05, rotateSpeed: 0.4, parallaxFactor: -0.04, color: 'rgba(167,139,250,0.38)', animDelay: '3.5s' },
]

/* ── One shape — hooks at the component level ── */
function ShapeItem({ shape }: { shape: ShapeDef }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 2000], [0, 2000 * shape.parallaxFactor])

  const dur = {
    spin:  `${Math.round(28 / shape.rotateSpeed)}s`,
    float: `${Math.round(8  / shape.rotateSpeed)}s`,
  }

  const baseStyle: React.CSSProperties = {
    width: shape.size,
    height: shape.size,
    opacity: shape.opacity,
  }

  let inner: React.ReactNode

  if (shape.type === 'hexagon') {
    inner = (
      <div
        style={{
          ...baseStyle,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          border: `1.5px solid ${shape.color}`,
          background: 'transparent',
          animation: `spin-slow ${dur.spin} linear infinite`,
          animationDelay: shape.animDelay,
        }}
      />
    )
  } else if (shape.type === 'triangle') {
    inner = (
      <div
        style={{
          ...baseStyle,
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          border: `1.5px solid ${shape.color}`,
          background: 'transparent',
          animation: `spin-slow ${dur.spin} linear infinite reverse`,
          animationDelay: shape.animDelay,
        }}
      />
    )
  } else if (shape.type === 'ring') {
    inner = (
      <div
        style={{
          ...baseStyle,
          borderRadius: '50%',
          border: `1.5px solid ${shape.color}`,
          background: 'transparent',
          animation: `float-y ${dur.float} ease-in-out infinite`,
          animationDelay: shape.animDelay,
        }}
      />
    )
  } else {
    // cross
    inner = (
      <div
        style={{
          ...baseStyle,
          position: 'relative',
          animation: `spin-slow ${Math.round(34 / shape.rotateSpeed)}s linear infinite`,
          animationDelay: shape.animDelay,
        }}
      >
        <div style={{ position: 'absolute', top: '50%', left: '15%', width: '70%', height: 1.5, background: shape.color, transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: '15%', height: '70%', width: 1.5, background: shape.color, transform: 'translateX(-50%)' }} />
      </div>
    )
  }

  return (
    <motion.div
      className="absolute dark:block hidden pointer-events-none"
      style={{ top: shape.top, left: shape.left, y }}
    >
      {inner}
    </motion.div>
  )
}

export default function BackgroundShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {SHAPES.map((shape) => (
        <ShapeItem key={shape.id} shape={shape} />
      ))}
    </div>
  )
}
