'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Full-viewport orbital rings centered where the HeroOrb appears.
 * position: fixed — extends beyond any overflow:hidden parent.
 * Fades out as the user scrolls past the hero.
 */
export default function OrbRings() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 480], [1, 0])

  const rings = [
    { width: 420, height: 270, tilt: -18, color: 'rgba(99,102,241,0.30)', duration: 22 },
    { width: 590, height: 370, tilt: -8,  color: 'rgba(56,189,248,0.20)', duration: 35 },
    { width: 760, height: 470, tilt: -26, color: 'rgba(167,139,250,0.16)', duration: 50 },
  ]

  return (
    <motion.div
      style={{ opacity, zIndex: 2 }}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Center point: orb lives in the right column ~62% from left, ~42% from top */}
      <div
        className="absolute"
        style={{ left: '62%', top: '42%', transform: 'translate(-50%, -50%)' }}
      >
        {rings.map((ring, i) => (
          /* Outer: apply tilt */
          <div
            key={i}
            className="absolute dark:opacity-60 opacity-20"
            style={{
              width: ring.width,
              height: ring.height,
              left: '50%',
              top: '50%',
              marginLeft: -ring.width / 2,
              marginTop: -ring.height / 2,
              transform: `rotate(${ring.tilt}deg)`,
            }}
          >
            {/* Inner: spin */}
            <motion.div
              style={{ width: '100%', height: '100%', borderRadius: '50%', border: `1px solid ${ring.color}` }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: ring.duration, ease: 'linear' }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
