import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial, PresentationControls, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 200 }) => {
  const mesh = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(100);
      const y = THREE.MathUtils.randFloatSpread(100);
      const z = THREE.MathUtils.randFloatSpread(100);
      const s = THREE.MathUtils.randFloat(0.1, 1);
      temp.push({ x, y, z, s, speed: THREE.MathUtils.randFloat(0.02, 0.1) });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      const { x, y, z, s, speed } = p;
      dummy.position.set(
        x + Math.sin(t * speed) * 5,
        y + Math.cos(t * speed) * 5,
        z + Math.sin(t * speed) * 5
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(t * speed, t * speed, t * speed);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <octahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2} />
    </instancedMesh>
  );
};

const FloatingCentralShape = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
      >
        <Sphere args={[2, 64, 64]} scale={1.5}>
          <MeshDistortMaterial
            color="#2563eb"
            speed={4}
            distort={0.4}
            radius={1}
            roughness={0}
            metalness={1}
            emissive="#2563eb"
            emissiveIntensity={0.5}
          />
        </Sphere>
        
        {/* Orbiting Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4, 0.05, 16, 100]} />
          <meshStandardMaterial color="#9333ea" emissive="#9333ea" emissiveIntensity={2} />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2} />
        </mesh>
      </PresentationControls>
    </Float>
  );
};

const ThreeCanvas = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617]">
      {/* Dynamic scanline overlay - purely CSS but background dependent */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} color="#9333ea" intensity={1} />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <ParticleField count={250} />
        <FloatingCentralShape />
        
        <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={20} blur={2.4} far={4.5} />
      </Canvas>
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full -z-1 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-blue/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-primary-purple/20 blur-[150px] rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default ThreeCanvas;
