'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Orbiting accent light ── */
function OrbitLight() {
  const ref = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.set(
      Math.cos(t * 0.55) * 2.8,
      Math.sin(t * 0.40) * 2.0,
      2.0 + Math.sin(t * 0.30) * 0.6,
    )
  })
  return <pointLight ref={ref} color="#c084fc" intensity={14} distance={7} />
}

/* ── </> Bracket ── */
function BracketGroup() {
  const groupRef    = useRef<THREE.Group>(null)
  const leftTopRef  = useRef<THREE.Mesh>(null)
  const leftBotRef  = useRef<THREE.Mesh>(null)
  const slashRef    = useRef<THREE.Mesh>(null)
  const rightTopRef = useRef<THREE.Mesh>(null)
  const rightBotRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    groupRef.current.rotation.y += delta * 0.50
    groupRef.current.rotation.x = Math.sin(t * 0.26) * 0.10

    const pulse = 3.0 + Math.sin(t * 1.4) * 0.7

    const glow = (ref: React.RefObject<THREE.Mesh | null>, v: number) => {
      if (!ref.current) return
      ;(ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = v
    }
    glow(leftTopRef,  pulse)
    glow(leftBotRef,  pulse)
    glow(slashRef,    pulse + 0.8)
    glow(rightTopRef, pulse - 0.3)
    glow(rightBotRef, pulse - 0.3)
  })

  const W   = 0.13
  const D   = 0.35
  const L   = 0.56
  const SH  = 0.88
  const ANG = Math.PI / 5
  const OFF = 0.74
  const mat = { roughness: 0.06, metalness: 0.65 } as const

  return (
    <group ref={groupRef}>
      {/* ── < (indigo) ── */}
      <mesh ref={leftTopRef} position={[-OFF, 0.23, 0]} rotation={[0, 0, ANG]}>
        <boxGeometry args={[L, W, D]} />
        <meshStandardMaterial color="#7c7fff" emissive="#6366f1" emissiveIntensity={3.0} {...mat} />
      </mesh>
      <mesh ref={leftBotRef} position={[-OFF, -0.23, 0]} rotation={[0, 0, -ANG]}>
        <boxGeometry args={[L, W, D]} />
        <meshStandardMaterial color="#7c7fff" emissive="#6366f1" emissiveIntensity={3.0} {...mat} />
      </mesh>

      {/* ── / (sky) ── */}
      <mesh ref={slashRef} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 11]}>
        <boxGeometry args={[W, SH, D]} />
        <meshStandardMaterial color="#5ecfff" emissive="#0ea5e9" emissiveIntensity={3.8} {...mat} />
      </mesh>

      {/* ── > (purple) ── */}
      <mesh ref={rightTopRef} position={[OFF, 0.23, 0]} rotation={[0, 0, -ANG]}>
        <boxGeometry args={[L, W, D]} />
        <meshStandardMaterial color="#b89ffc" emissive="#8b5cf6" emissiveIntensity={2.8} {...mat} />
      </mesh>
      <mesh ref={rightBotRef} position={[OFF, -0.23, 0]} rotation={[0, 0, ANG]}>
        <boxGeometry args={[L, W, D]} />
        <meshStandardMaterial color="#b89ffc" emissive="#8b5cf6" emissiveIntensity={2.8} {...mat} />
      </mesh>

      {/* Core nucleus */}
      <mesh position={[0, 0, -0.12]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#4f46e5"
          emissiveIntensity={6.0}
          transparent
          opacity={0.50}
        />
      </mesh>
    </group>
  )
}

export default function HeroOrb({ isDark = true }: { isDark?: boolean }) {
  const [ready, setReady] = useState(false)

  return (
    <div
      className="mx-auto mb-2 pointer-events-none select-none w-[300px] h-[200px] lg:w-[460px] lg:h-[320px] transition-opacity duration-700"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.0], fov: 44 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
        dpr={1}
        performance={{ min: 0.5 }}
        onCreated={() => setReady(true)}
      >
        <ambientLight intensity={isDark ? 0.28 : 0.12} />
        <pointLight position={[0, 0, 3.5]} color="#ffffff" intensity={isDark ? 5 : 2} />
        <pointLight position={[2.5, 3, 2.5]} color="#818cf8" intensity={isDark ? 22 : 30} />
        <pointLight position={[-2, -2, 2]} color="#38bdf8" intensity={isDark ? 14 : 48} />
        <pointLight position={[0, 1, -2]} color="#a78bfa" intensity={isDark ? 8 : 22} />
        <pointLight position={[1.5, -1.5, 1.5]} color="#0ea5e9" intensity={isDark ? 9 : 40} distance={6} />
        <OrbitLight />
        <BracketGroup />
      </Canvas>
    </div>
  )
}
