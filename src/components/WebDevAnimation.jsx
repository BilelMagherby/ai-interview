import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

const CodeBlock = ({ position, color, label, delay = 0 }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    mesh.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    mesh.current.rotation.y = Math.cos(t * 0.3) * 0.1;
    mesh.current.position.y = position[1] + Math.sin(t * 0.8) * 0.2;
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <RoundedBox args={[2, 1.2, 0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} transparent opacity={0.9} />
        </RoundedBox>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.2}
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCOjFwsjk3iL33GZPtm396DgFC_cpgg.woff"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </mesh>
    </group>
  );
};

const LaptopScene = () => {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.1) * 0.2;
  });

  return (
    <group ref={group} scale={1.2}>
      {/* Base */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#2563eb" transparent opacity={0.05} />
      </mesh>
      
      {/* Central "Screen" */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <RoundedBox args={[4.5, 3, 0.2]} radius={0.1} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#0f172a"
            speed={2}
            distort={0.1}
            roughness={0}
            metalness={1}
            emissive="#2563eb"
            emissiveIntensity={0.2}
          />
        </RoundedBox>
        {/* Screen Content Mockup */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[4.2, 2.7]} />
          <meshBasicMaterial color="#020617" />
        </mesh>
        <Text
          position={[0, 0, 0.12]}
          fontSize={0.25}
          color="#06b6d4"
          maxWidth={3.5}
          lineHeight={1.2}
        >
          const AI = () ={">"} {"{"} {"\n"}  return "Future";{"\n"} {"}"}
        </Text>
      </Float>

      {/* Floating UI Elements */}
      <CodeBlock position={[-3, 1.5, 0.5]} color="#2563eb" label="<div>React</div>" delay={0} />
      <CodeBlock position={[3, 1, 1]} color="#9333ea" label="export default" delay={1.5} />
      <CodeBlock position={[-2.5, -1.2, 1.2]} color="#06b6d4" label="API_CALL()" delay={2.5} />
      <CodeBlock position={[2.8, -1.5, 0.8]} color="#3b82f6" label="<Component />" delay={3.5} />
      
      {/* Decorative Bits */}
      <group>
        {[...Array(20)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 5
            ]}
          >
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const WebDevAnimation = () => {
  return (
    <div className="w-full h-[400px] mb-8 relative">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2563eb" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333ea" />
        <spotLight position={[0, 5, 0]} intensity={1.5} angle={0.6} penumbra={1} castShadow />
        
        <LaptopScene />
        
        <fog attach="fog" args={["#020617", 5, 20]} />
      </Canvas>
      
      {/* Gradient Glow underneath */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-blue/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default WebDevAnimation;
