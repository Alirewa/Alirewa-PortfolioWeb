'use client'

/**
 * NarrativeScene — "Drift Orbs"
 *
 * Glassmorphism-inspired depth composition:
 * Large semi-transparent spheres drift slowly at different Z depths.
 * Where orbs overlap, additive blending mixes colours — creating the
 * soft colour-gradient quality of frosted glass layers.
 *
 * Minimal motion, maximum depth. No spinning gyroscopes.
 */

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x))

// ─── Camera ───────────────────────────────────────────────────────────────────
function CameraController({ sp }: { sp: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  useFrame(() => {
    const s = sp.current
    camera.position.z = lerp(camera.position.z, 10 - s * 2.5, 0.018)
    camera.position.y = lerp(camera.position.y, -s * 0.6, 0.018)
    ;(camera as THREE.PerspectiveCamera).fov = lerp(
      (camera as THREE.PerspectiveCamera).fov, 50 + s * 4, 0.022,
    )
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    camera.lookAt(0, camera.position.y * 0.1, 0)
  })
  return null
}

// ─── Drift Orb ────────────────────────────────────────────────────────────────
interface OrbDef {
  radius: number
  color: string
  opacity: number
  basePos: [number, number, number]
  driftAmp: [number, number]
  driftFreq: [number, number]
  phase: number
}

const ORBS: OrbDef[] = [
  {
    radius: 5.0, color: '#6366f1', opacity: 0.10,
    basePos: [-3.0, 1.5, -4],
    driftAmp: [1.1, 0.7], driftFreq: [0.07, 0.09], phase: 0,
  },
  {
    radius: 6.8, color: '#38bdf8', opacity: 0.07,
    basePos: [4.5, -2.5, -8],
    driftAmp: [0.8, 1.0], driftFreq: [0.06, 0.08], phase: 1.6,
  },
  {
    radius: 4.2, color: '#a78bfa', opacity: 0.09,
    basePos: [0.5, 3.0, -2.5],
    driftAmp: [0.9, 0.5], driftFreq: [0.10, 0.06], phase: 3.1,
  },
  {
    radius: 3.8, color: '#34d399', opacity: 0.055,
    basePos: [-5.0, -2.0, -6],
    driftAmp: [0.6, 0.8], driftFreq: [0.05, 0.11], phase: 4.7,
  },
]

function DriftOrb({ def, sp }: { def: OrbDef; sp: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null)
  const geo = useMemo(() => new THREE.SphereGeometry(def.radius, 28, 20), [def.radius])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const s = sp.current

    ref.current.position.x = def.basePos[0] + Math.sin(t * def.driftFreq[0] + def.phase) * def.driftAmp[0]
    ref.current.position.y = def.basePos[1] + Math.cos(t * def.driftFreq[1] + def.phase) * def.driftAmp[1]
    // z converges slightly with scroll
    ref.current.position.z = lerp(ref.current.position.z, def.basePos[2] + s * 1.5, 0.016)

    // Very slow self-rotation for subtle surface shading variation
    ref.current.rotation.y = t * 0.018 + def.phase
    ref.current.rotation.x = t * 0.012

    // Gentle breath
    const breathe = Math.sin(t * 0.28 + def.phase) * 0.025
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = clamp(def.opacity + breathe, 0.015, 0.18)
  })

  return (
    <mesh ref={ref} geometry={geo} position={def.basePos as THREE.Vector3Tuple}>
      <meshBasicMaterial
        color={def.color}
        transparent
        opacity={def.opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

// ─── Accent ring (subtle, slow) ───────────────────────────────────────────────
interface RingDef {
  radius: number
  tube: number
  color: string
  opacity: number
  pos: [number, number, number]
  initRot: [number, number, number]
  vel: [number, number, number]
}

const RINGS: RingDef[] = [
  {
    radius: 4.8, tube: 0.014, color: '#818cf8', opacity: 0.22,
    pos: [0, 0, 0], initRot: [0.4, 0, 0.3], vel: [0.008, 0.012, 0.004],
  },
  {
    radius: 7.2, tube: 0.010, color: '#38bdf8', opacity: 0.12,
    pos: [0, 0, -3], initRot: [0, 0.7, 0.2], vel: [-0.005, -0.009, 0.006],
  },
]

function AccentRing({ def, sp }: { def: RingDef; sp: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null)
  const geo = useMemo(() => new THREE.TorusGeometry(def.radius, def.tube, 8, 110), [def.radius, def.tube])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.x = def.initRot[0] + t * def.vel[0]
    ref.current.rotation.y = def.initRot[1] + t * def.vel[1]
    ref.current.rotation.z = def.initRot[2] + t * def.vel[2]

    const breathe = Math.sin(t * 0.35 + def.pos[2]) * 0.08
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = clamp(def.opacity + breathe, 0.04, 0.35)

    // Converge with scroll
    const s = clamp(sp.current * 0.4, 0, 0.4)
    ref.current.scale.setScalar(lerp(ref.current.scale.x, 1 - s * 0.15, 0.025))
  })

  return (
    <mesh ref={ref} geometry={geo} position={def.pos as THREE.Vector3Tuple}>
      <meshBasicMaterial
        color={def.color}
        transparent
        opacity={def.opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── Wire accent ──────────────────────────────────────────────────────────────
function WireAccent() {
  const ref = useRef<THREE.LineSegments>(null)
  const geo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1, 1)), [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * 0.04
    ref.current.rotation.y = t * 0.06
    ref.current.rotation.z = t * 0.022
  })

  return (
    <lineSegments ref={ref} geometry={geo} position={[3, 0.5, -2.5]} scale={1.8}>
      <lineBasicMaterial color="#818cf8" transparent opacity={0.07} blending={THREE.AdditiveBlending} />
    </lineSegments>
  )
}

// ─── Sparse ambient particles ─────────────────────────────────────────────────
function AmbientDrift() {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const COUNT = 180
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const palette = [
      new THREE.Color('#818cf8'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#34d399'),
    ]
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.006
    ref.current.rotation.x = Math.sin(t * 0.004) * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function NarrativeScene({ scrollProgress }: { scrollProgress: number }) {
  const sp = useRef(scrollProgress)
  sp.current = scrollProgress

  return (
    <>
      <ambientLight intensity={0.08} />
      <CameraController sp={sp} />
      {ORBS.map((def, i) => <DriftOrb key={i} def={def} sp={sp} />)}
      {RINGS.map((def, i) => <AccentRing key={i} def={def} sp={sp} />)}
      <WireAccent />
      <AmbientDrift />
    </>
  )
}
