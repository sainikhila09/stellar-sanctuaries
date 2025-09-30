import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Cylinder, Box, MeshDistortMaterial, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface HabitatGeometryProps {
  shape: 'dome' | 'cylinder' | 'torus';
  radius: number;
  heightLength: number;
}

const HabitatGeometry = ({ shape, radius, heightLength }: HabitatGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const getColor = () => {
    switch (shape) {
      case 'dome': return '#4a9eff';
      case 'torus': return '#a855f7';
      case 'cylinder': return '#60a5fa';
      default: return '#4a9eff';
    }
  };

  return (
    <group>
      {shape === 'dome' && (
        <Sphere ref={meshRef} args={[radius, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={getColor()}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      )}

      {shape === 'torus' && (
        <Torus ref={meshRef} args={[radius, radius * 0.3, 32, 100]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={getColor()}
            roughness={0.2}
            metalness={0.8}
            emissive={getColor()}
            emissiveIntensity={0.2}
          />
        </Torus>
      )}

      {shape === 'cylinder' && (
        <Cylinder ref={meshRef} args={[radius, radius, heightLength, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={getColor()}
            roughness={0.2}
            metalness={0.8}
            emissive={getColor()}
            emissiveIntensity={0.2}
          />
        </Cylinder>
      )}

      {/* Solar Panels */}
      {shape !== 'torus' && (
        <>
          <Box args={[radius * 2, 0.05, radius * 0.75]} position={[0, 0, radius + 1]}>
            <meshStandardMaterial color="#1e40af" metalness={0.9} roughness={0.1} />
          </Box>
          <Box args={[radius * 2, 0.05, radius * 0.75]} position={[0, 0, -(radius + 1)]}>
            <meshStandardMaterial color="#1e40af" metalness={0.9} roughness={0.1} />
          </Box>
        </>
      )}

      {/* Lights */}
      <pointLight position={[0, 0, 0]} intensity={1} color="#4a9eff" />
    </group>
  );
};

interface HabitatDesignerCanvasProps {
  shape: 'dome' | 'cylinder' | 'torus';
  radius: number;
  heightLength: number;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

const HabitatDesignerCanvas = ({ shape, radius, heightLength, zoom, onZoomChange }: HabitatDesignerCanvasProps) => {
  const controlsRef = useRef<any>(null);

  return (
    <Canvas camera={{ position: [0, 0, 8 / zoom], fov: 50 }}>
      <color attach="background" args={['#0a0f1e']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a9eff" />
      
      {/* Environment and effects */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />
      
      {/* The habitat model */}
      <HabitatGeometry shape={shape} radius={radius} heightLength={heightLength} />
      
      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={20}
        autoRotate={false}
      />
    </Canvas>
  );
};

export default HabitatDesignerCanvas;
