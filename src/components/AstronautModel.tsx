
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AstronautModelProps {
  position: [number, number, number];
}

const AstronautModel = ({ position }: AstronautModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const flagRef = useRef<THREE.Mesh>(null);

  // Astronaut body parts
  const helmetMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 });
  const suitMaterial = new THREE.MeshPhongMaterial({ color: 0xe0e0e0 });
  const visorMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x000080, 
    transparent: true, 
    opacity: 0.8,
    shininess: 200 
  });

  // Indian flag material
  const flagMaterial = new THREE.MeshBasicMaterial({
    map: createIndianFlagTexture(),
    side: THREE.DoubleSide,
  });

  function createIndianFlagTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 86;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Saffron
      context.fillStyle = '#FF9933';
      context.fillRect(0, 0, 128, 28);
      
      // White
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 28, 128, 30);
      
      // Green
      context.fillStyle = '#138808';
      context.fillRect(0, 58, 128, 28);
      
      // Blue chakra (simplified circle)
      context.fillStyle = '#000080';
      context.beginPath();
      context.arc(64, 43, 10, 0, Math.PI * 2);
      context.fill();
      
      // Chakra spokes (simplified)
      context.strokeStyle = '#000080';
      context.lineWidth = 1;
      for (let i = 0; i < 24; i++) {
        const angle = (i * Math.PI * 2) / 24;
        context.beginPath();
        context.moveTo(64 + Math.cos(angle) * 6, 43 + Math.sin(angle) * 6);
        context.lineTo(64 + Math.cos(angle) * 10, 43 + Math.sin(angle) * 10);
        context.stroke();
      }
    }
    
    return new THREE.CanvasTexture(canvas);
  }

  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    if (flagRef.current) {
      flagRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Helmet */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <primitive object={helmetMaterial} />
      </mesh>
      
      {/* Visor */}
      <mesh position={[0, 0.45, 0.2]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <primitive object={visorMaterial} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.8, 8]} />
        <primitive object={suitMaterial} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.4, 0.1, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
        <primitive object={suitMaterial} />
      </mesh>
      <mesh position={[0.4, 0.1, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
        <primitive object={suitMaterial} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.15, -0.7, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.8, 8]} />
        <primitive object={suitMaterial} />
      </mesh>
      <mesh position={[0.15, -0.7, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.8, 8]} />
        <primitive object={suitMaterial} />
      </mesh>

      {/* Flag pole */}
      <mesh position={[0.7, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 1.5, 8]} />
        <meshBasicMaterial color={0x888888} />
      </mesh>

      {/* Indian Flag */}
      <mesh ref={flagRef} position={[0.9, 0.4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.4, 0.27]} />
        <primitive object={flagMaterial} />
      </mesh>

      {/* Jetpack exhaust effect */}
      <mesh position={[0, -0.6, -0.3]}>
        <coneGeometry args={[0.05, 0.2, 8]} />
        <meshBasicMaterial color={0x00ffff} transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

export default AstronautModel;
