import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Cylinder, Box, MeshDistortMaterial, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface HabitatProps {
  type: 'sphere' | 'torus' | 'cylinder';
}

const SpaceHabitat = ({ type }: HabitatProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const habitatColor = type === 'sphere' ? '#4a9eff' : type === 'torus' ? '#a855f7' : '#60a5fa';

  return (
    <group>
      {type === 'sphere' && (
        <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={habitatColor}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      )}

      {type === 'torus' && (
        <Torus ref={meshRef} args={[2, 0.6, 32, 100]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={habitatColor}
            roughness={0.2}
            metalness={0.8}
            emissive={habitatColor}
            emissiveIntensity={0.2}
          />
        </Torus>
      )}

      {type === 'cylinder' && (
        <Cylinder ref={meshRef} args={[1.5, 1.5, 3, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={habitatColor}
            roughness={0.2}
            metalness={0.8}
            emissive={habitatColor}
            emissiveIntensity={0.2}
          />
        </Cylinder>
      )}

      {/* Solar Panels */}
      {type !== 'torus' && (
        <>
          <Box args={[4, 0.05, 1.5]} position={[0, 0, 3]}>
            <meshStandardMaterial color="#1e40af" metalness={0.9} roughness={0.1} />
          </Box>
          <Box args={[4, 0.05, 1.5]} position={[0, 0, -3]}>
            <meshStandardMaterial color="#1e40af" metalness={0.9} roughness={0.1} />
          </Box>
        </>
      )}

      {/* Windows/Lights */}
      <pointLight position={[0, 0, 0]} intensity={1} color="#4a9eff" />
    </group>
  );
};

interface HabitatModel3DProps {
  habitatType?: 'sphere' | 'torus' | 'cylinder';
}

const HabitatModel3D = ({ habitatType = 'sphere' }: HabitatModel3DProps) => {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-primary/20 glow-box">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['#0a0f1e']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a9eff" />
        
        {/* Environment and effects */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />
        
        {/* The habitat model */}
        <SpaceHabitat type={habitatType} />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default HabitatModel3D;
