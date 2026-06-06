'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  scrollY?: number
}

export default function ParticleField({ count = 3000, scrollY = 0 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorOptions = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#0ea5e9'),
      new THREE.Color('#818cf8'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#a78bfa'),
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return [positions, colors]
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    meshRef.current.rotation.y = time * 0.03
    meshRef.current.rotation.x = Math.sin(time * 0.02) * 0.1

    const scrollOffset = scrollY * 0.002
    meshRef.current.position.y = -scrollOffset
    meshRef.current.position.z = scrollOffset * 0.5
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]}    attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
