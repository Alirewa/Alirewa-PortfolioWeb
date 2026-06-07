'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
}

/**
 * Wraps a section with bidirectional scroll animation.
 * Fades + slides in when entering the viewport,
 * and fades + slides out when leaving — both directions.
 */
export default function SectionReveal({ children, className }: SectionRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: '-12% 0px -12% 0px',
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
