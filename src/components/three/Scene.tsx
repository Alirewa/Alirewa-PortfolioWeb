'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import NarrativeScene from './NarrativeScene'

interface SceneProps {
  scrollProgress?: number
}

export default function Scene({ scrollProgress = 0 }: SceneProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none dark:opacity-60 opacity-35"
      style={{ zIndex: 0, filter: 'blur(1px)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <NarrativeScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
