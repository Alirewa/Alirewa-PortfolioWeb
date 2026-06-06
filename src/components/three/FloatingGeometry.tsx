'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingGeometryProps {
  position?: [number, number, number]
  color?: string
  scale?: number
  speed?: number
  distort?: number
  scrollY?: number
}

export function FloatingSphere({
  position = [0, 0, 0],
  color = '#6366f1',
  scale = 1,
  speed = 1,
  distort = 0.4,
  scrollY = 0,
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const offset = Math.random() * Math.PI * 2

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(time * speed + offset) * 0.3
    meshRef.current.rotation.x = time * 0.2 * speed
    meshRef.current.rotation.z = time * 0.1 * speed

    const scrollOffset = scrollY * 0.003
    meshRef.current.position.z = position[2] - scrollOffset * 0.3
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        distort={distort}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

export function FloatingTorus({
  position = [0, 0, 0],
  color = '#0ea5e9',
  scale = 1,
  speed = 1,
  scrollY = 0,
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const offset = Math.random() * Math.PI * 2

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.4 * speed + offset
    meshRef.current.rotation.y = time * 0.2 * speed
    meshRef.current.position.y = position[1] + Math.sin(time * speed * 0.7 + offset) * 0.4

    const scrollOffset = scrollY * 0.003
    meshRef.current.position.z = position[2] - scrollOffset * 0.2
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.35, 32, 64]} />
      <meshStandardMaterial
        color={color}
        roughness={0.05}
        metalness={0.9}
        wireframe={false}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

export function FloatingOctahedron({
  position = [0, 0, 0],
  color = '#a78bfa',
  scale = 1,
  speed = 1,
  scrollY = 0,
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const offset = Math.random() * Math.PI * 2

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.3 * speed
    meshRef.current.rotation.y = time * 0.5 * speed + offset
    meshRef.current.position.y = position[1] + Math.sin(time * speed * 0.9 + offset) * 0.35

    const scrollOffset = scrollY * 0.003
    meshRef.current.position.z = position[2] - scrollOffset * 0.25
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.85}
        wireframe={false}
        transparent
        opacity={0.75}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}
