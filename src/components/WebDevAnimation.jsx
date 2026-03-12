import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, RoundedBox, Text, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

const CodeBlock = ({ position, color, label, delay = 0 }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    mesh.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    mesh.current.position.y = position[1] + Math.sin(t * 0.8) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        <RoundedBox args={[2.5, 1.4, 0.15]} radius={0.1} smoothness={4}>
          <meshStandardMaterial 
            color={color} 
            metalness={0.9} 
            roughness={0.1} 
            transparent 
            opacity={0.8}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.22}
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCOjFwsjk3iL33GZPtm396DgFC_cpgg.woff"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </mesh>
    </Float>
  );
};

const MouseTracker = () => {
  const { mouse, camera } = useThree();
  const group = useRef();

  useFrame(() => {
    const targetX = mouse.x * 2;
    const targetY = mouse.y * 2;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);
  });

  return <group ref={group} />;
};

const LaptopScene = () => {
  const group = useRef();
  
  return (
    <group ref={group} scale={1.1}>
      {/* Central "Screen" */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <group rotation={[0, 0, 0]}>
          <RoundedBox args={[6, 4, 0.3]} radius={0.15} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#0f172a"
              speed={1}
              distort={0.05}
              roughness={0.1}
              metalness={1}
              emissive="#2563eb"
              emissiveIntensity={0.1}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.16]}>
            <planeGeometry args={[5.6, 3.6]} />
            <meshBasicMaterial color="#020617" />
          </mesh>
          <Text
            position={[0, 0, 0.18]}
            fontSize={0.3}
            color="#06b6d4"
            maxWidth={5}
            lineHeight={1.4}
            textAlign="center"
          >
            {`import { AI } from 'antigravity';\n\nconst interview = await AI.simulate({\n  role: 'Senior React Dev',\n  difficulty: 'Hard'\n});`}
          </Text>
        </group>
      </Float>

      {/* Floating UI Elements */}
      <CodeBlock position={[-4, 2, 1]} color="#2563eb" label="Components/Button" delay={0} />
      <CodeBlock position={[4, 1.5, 2]} color="#9333ea" label="hooks/useAI" delay={1.5} />
      <CodeBlock position={[-3.5, -2, 1.5]} color="#06b6d4" label="api.v1.mock()" delay={2.5} />
      <CodeBlock position={[4.5, -1.8, 1.2]} color="#3b82f6" label="<Simulator />" delay={3.5} />
      
      {/* Animated Particles */}
      <group>
        {useMemo(() => [...Array(40)].map((_, i) => (
          <Float key={i} speed={Math.random() * 2} rotationIntensity={2} floatIntensity={2}>
            <mesh 
              position={[
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 8
              ]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color={i % 2 === 0 ? "#06b6d4" : "#2563eb"} transparent opacity={0.6} />
            </mesh>
          </Float>
        )), [])}
      </group>
    </group>
  );
};

const WebDevAnimation = () => {
  return (
    <div className="w-full h-[500px] mb-8 relative cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333ea" />
        
        <group>
          <MouseTracker />
          <LaptopScene />
        </group>

        <Environment preset="city" />
        <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        
        <fog attach="fog" args={["#020617", 5, 25]} />
      </Canvas>
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-blue/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default WebDevAnimation;
