import { useEffect, useRef } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { MathUtils, PMREMGenerator } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import CameraFallback from './CameraFallback';

extend({ RoundedBoxGeometry });

function BodyPart({ size, position, color = '#182733', metalness = 0.5, roughness = 0.4 }) {
  return (
    <mesh position={position}>
      <roundedBoxGeometry args={[...size, 3, 0.06]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
  );
}

function LensRing({ radius, tube = 0.025, z, color = '#56717c', glow = false }) {
  return (
    <mesh position={[0.25, -0.03, z]}>
      <torusGeometry args={[radius, tube, 8, 64]} />
      <meshStandardMaterial color={color} metalness={0.75} roughness={0.22} emissive={glow ? color : '#000000'} emissiveIntensity={glow ? 0.65 : 0} />
    </mesh>
  );
}

function Studio({ onFailure }) {
  const { gl, scene } = useThree();
  useEffect(() => {
    const generator = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const environment = generator.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    generator.dispose();
    const lost = (event) => {
      event.preventDefault();
      onFailure();
    };
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', lost);
    return () => {
      canvas.removeEventListener('webglcontextlost', lost);
      scene.environment = null;
      environment.dispose();
    };
  }, [gl, scene, onFailure]);
  return null;
}

function CameraModel({ motion, active, yaw }) {
  const camera = useRef();
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05);
    if (active) elapsed.current += step;
    const x = 0.15 + (active ? motion.current.y * 0.16 : 0);
    const y = -0.4 + yaw + (active ? motion.current.x * 0.25 : 0);
    const blend = active ? 1 - Math.exp(-step * 7) : 1;
    camera.current.rotation.x = MathUtils.lerp(camera.current.rotation.x, x, blend);
    camera.current.rotation.y = MathUtils.lerp(camera.current.rotation.y, y, blend);
    camera.current.position.y = Math.sin(elapsed.current * 0.8) * 0.075;
  });

  return (
    <group ref={camera} rotation={[0.15, -0.4 + yaw, -0.06]}>
      <BodyPart size={[3.15, 1.85, 0.86]} position={[0, 0, 0]} />
      <BodyPart size={[3.12, 0.34, 0.87]} position={[0, 0.7, 0.01]} color="#405664" metalness={0.8} />
      <BodyPart size={[0.68, 1.52, 0.34]} position={[-1.18, -0.12, 0.46]} color="#0a151e" roughness={0.9} metalness={0.1} />
      {[0, 1, 2, 3, 4, 5].map((i) => <BodyPart key={i} size={[0.035, 1.14, 0.035]} position={[-1.39 + i * 0.08, -0.12, 0.64]} color="#263641" roughness={0.8} />)}
      <BodyPart size={[0.94, 0.43, 0.68]} position={[0.07, 1.04, -0.01]} color="#314752" />
      <BodyPart size={[0.5, 0.18, 0.03]} position={[0.07, 1.05, 0.35]} color="#99c6d2" metalness={0.2} />
      <BodyPart size={[0.46, 0.04, 0.35]} position={[0.07, 1.28, -0.05]} color="#647882" />
      <BodyPart size={[2.3, 0.018, 0.015]} position={[0.36, 0.5, 0.454]} color="#00c5d5" />
      <BodyPart size={[1.82, 1.12, 0.04]} position={[0.2, -0.1, -0.45]} color="#060f18" />
      <BodyPart size={[1.58, 0.88, 0.02]} position={[0.2, -0.1, -0.48]} color="#173448" roughness={0.17} />
      <mesh position={[-1.06, 1.01, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.17, 32]} />
        <meshStandardMaterial color="#607783" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-1.06, 1.12, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.06, 32]} />
        <meshStandardMaterial color="#111d29" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[1.15, 1.02, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.18, 24]} />
        <meshStandardMaterial color="#243e4a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[1.29, 0.69, 0.46]}>
        <sphereGeometry args={[0.045, 12, 8]} />
        <meshStandardMaterial color="#00eeff" emissive="#00eeff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.25, -0.03, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.77, 0.84, 0.8, 64]} />
        <meshStandardMaterial color="#111c26" metalness={0.65} roughness={0.34} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => <LensRing key={i} radius={0.79 - i * 0.005} tube={0.012} z={0.51 + i * 0.064} color="#334953" />)}
      <LensRing radius={0.8} z={0.45} color="#98aab0" />
      <LensRing radius={0.77} z={1.15} color="#00cddd" glow />
      <LensRing radius={0.69} tube={0.07} z={1.21} color="#1b2b37" />
      <mesh position={[0.25, -0.03, 1.215]}>
        <circleGeometry args={[0.65, 64]} />
        <meshPhysicalMaterial color="#133c59" metalness={0.8} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      <LensRing radius={0.5} tube={0.014} z={1.225} color="#34799c" />
      <LensRing radius={0.36} tube={0.016} z={1.23} color="#294663" />
      <mesh position={[0.25, -0.03, 1.235]}>
        <circleGeometry args={[0.27, 8]} />
        <meshStandardMaterial color="#030916" roughness={0.2} metalness={0.3} />
      </mesh>
      <mesh position={[0.25, -0.03, 1.23]} scale={[1, 1, 0.12]}>
        <sphereGeometry args={[0.62, 32, 16]} />
        <meshPhysicalMaterial color="#185174" metalness={0.4} roughness={0.08} clearcoat={1} transparent opacity={0.4} depthWrite={false} />
      </mesh>
      <mesh position={[0.25, -0.03, 1.25]} rotation={[0, 0, 0.7]}>
        <torusGeometry args={[0.55, 0.018, 8, 32, 1.35]} />
        <meshBasicMaterial color="#a0f7ff" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export default function CameraScene({ motion, active, yaw, onFailure, onReady }) {
  return (
    <Canvas camera={{ position: [0, 0.25, 7.8], fov: 36 }} dpr={[1, 1.5]} frameloop={active ? 'always' : 'demand'} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} fallback={<CameraFallback />} onCreated={onReady} style={{ pointerEvents: 'none' }}>
      <Studio onFailure={onFailure} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 5]} intensity={3} color="#e4f6ff" />
      <directionalLight position={[-4, 1, 2]} intensity={3} color="#00ccff" />
      <directionalLight position={[3, 2, -3]} intensity={4} color="#7d9bff" />
      <CameraModel motion={motion} active={active} yaw={yaw} />
    </Canvas>
  );
}
