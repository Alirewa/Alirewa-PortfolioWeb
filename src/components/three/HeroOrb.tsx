'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Orbiting light for dynamic highlights that sell the 3D depth
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
  return <pointLight ref={ref} color="#c084fc" intensity={10} distance={7} />
}

// Particle halo orbiting the </>
function ParticleHalo() {
  const ref = useRef<THREE.Points>(null)

  const { positions, speeds, radii } = useMemo(() => {
    const count = 32
    const positions = new Float32Array(count * 3)
    const speeds: number[] = []
    const radii: number[] = []

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 1.5 + Math.random() * 0.45
      const y = (Math.random() - 0.5) * 0.5
      positions[i * 3]     = Math.cos(angle) * r
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = Math.sin(angle) * r * 0.35
      speeds.push(0.16 + Math.random() * 0.12)
      radii.push(r)
    }
    return { positions, speeds, radii }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < speeds.length; i++) {
      const angle = (i / speeds.length) * Math.PI * 2 + t * speeds[i]
      const r = radii[i]
      pos[i * 3]     = Math.cos(angle) * r
      pos[i * 3 + 2] = Math.sin(angle) * r * 0.35
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        color="#818cf8"
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// The </> bracket — thick bars + glow ring = clear 3D emblem
function BracketGroup() {
  const groupRef  = useRef<THREE.Group>(null)
  const leftTopRef  = useRef<THREE.Mesh>(null)
  const leftBotRef  = useRef<THREE.Mesh>(null)
  const slashRef    = useRef<THREE.Mesh>(null)
  const rightTopRef = useRef<THREE.Mesh>(null)
  const rightBotRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    // Continuous 360° Y rotation — full spin reveals depth on all sides
    groupRef.current.rotation.y = t * 0.65
    // Gentle X tilt bobbing for extra 3D depth feel
    groupRef.current.rotation.x = Math.sin(t * 0.28) * 0.14

    // Pulse emissive intensity
    const pulse = 2.4 + Math.sin(t * 1.5) * 0.9

    const glow = (ref: React.RefObject<THREE.Mesh | null>, v: number) => {
      if (!ref.current) return
      ;(ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = v
    }
    glow(leftTopRef,  pulse)
    glow(leftBotRef,  pulse)
    glow(slashRef,    pulse + 0.5)
    glow(rightTopRef, pulse - 0.2)
    glow(rightBotRef, pulse - 0.2)
  })

  // Geometry constants — D (depth) is the key to 3D appearance
  const W   = 0.11   // bar face thickness
  const D   = 0.30   // bar depth  ← thick! visible when rotating
  const L   = 0.52   // arm length
  const SH  = 0.82   // slash height
  const ANG = Math.PI / 5   // ~36°
  const OFF = 0.70           // horizontal offset for < and >

  const mat = { roughness: 0.08, metalness: 0.55 } as const

  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.40}>
      <group ref={groupRef}>
        <ParticleHalo />

        {/* ── < (indigo) ── */}
        <mesh ref={leftTopRef} position={[-OFF, 0.22, 0]} rotation={[0, 0, ANG]}>
          <boxGeometry args={[L, W, D]} />
          <meshStandardMaterial color="#7c7fff" emissive="#6366f1" emissiveIntensity={2.4} {...mat} />
        </mesh>
        <mesh ref={leftBotRef} position={[-OFF, -0.22, 0]} rotation={[0, 0, -ANG]}>
          <boxGeometry args={[L, W, D]} />
          <meshStandardMaterial color="#7c7fff" emissive="#6366f1" emissiveIntensity={2.4} {...mat} />
        </mesh>

        {/* ── / (sky) ── */}
        <mesh ref={slashRef} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 11]}>
          <boxGeometry args={[W, SH, D]} />
          <meshStandardMaterial color="#5ecfff" emissive="#0ea5e9" emissiveIntensity={3.0} {...mat} />
        </mesh>

        {/* ── > (purple) ── */}
        <mesh ref={rightTopRef} position={[OFF, 0.22, 0]} rotation={[0, 0, -ANG]}>
          <boxGeometry args={[L, W, D]} />
          <meshStandardMaterial color="#b89ffc" emissive="#8b5cf6" emissiveIntensity={2.2} {...mat} />
        </mesh>
        <mesh ref={rightBotRef} position={[OFF, -0.22, 0]} rotation={[0, 0, ANG]}>
          <boxGeometry args={[L, W, D]} />
          <meshStandardMaterial color="#b89ffc" emissive="#8b5cf6" emissiveIntensity={2.2} {...mat} />
        </mesh>

        {/* Core glow nucleus */}
        <mesh position={[0, 0, -0.15]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#6366f1" emissive="#4f46e5" emissiveIntensity={4.0} transparent opacity={0.50} />
        </mesh>
      </group>
    </Float>
  )
}

export default function HeroOrb() {
  return (
    <div
      className="mx-auto mb-2 pointer-events-none select-none"
      style={{ width: '280px', height: '160px' }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Ambient for base visibility */}
        <ambientLight intensity={0.30} />
        {/* Front fill — bright */}
        <pointLight position={[0, 0, 3.5]} color="#ffffff" intensity={4} />
        {/* Top-left key light */}
        <pointLight position={[2.5, 3, 2.5]} color="#818cf8" intensity={18} />
        {/* Bottom-right fill */}
        <pointLight position={[-2, -2, 2]} color="#38bdf8" intensity={10} />
        {/* Back rim — creates depth silhouette */}
        <pointLight position={[0, 1, -2]} color="#a78bfa" intensity={6} />
        {/* Orbiting color accent */}
        <OrbitLight />
        <BracketGroup />
      </Canvas>
    </div>
  )
}
