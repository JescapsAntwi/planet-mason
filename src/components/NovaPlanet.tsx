
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NovaPlanetProps {
  position: [number, number, number];
  onClick: () => void;
  isExploring: boolean;
  scale: number;
}

const NovaPlanet = ({ position, onClick, isExploring, scale }: NovaPlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const treesRef = useRef<THREE.Group>(null);
  const waterRef = useRef<THREE.Mesh>(null);
  const cityLightsRef = useRef<THREE.Points>(null);

  // Enhanced Planet surface material with more realistic Earth-like textures
  const planetMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Create more detailed Earth-like continents and oceans
      const imageData = context.createImageData(2048, 1024);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % 2048;
        const y = Math.floor((i / 4) / 2048);
        
        // Generate more complex landmasses and oceans with multiple noise layers
        const noise1 = Math.sin(x * 0.008) * Math.cos(y * 0.015);
        const noise2 = Math.sin(x * 0.003 + y * 0.004) * 0.7;
        const noise3 = Math.sin(x * 0.02 + y * 0.03) * 0.3;
        const landNoise = noise1 + noise2 + noise3;
        
        if (landNoise > 0.2) {
          // Land - varied greens and browns
          const greenVariation = Math.random() * 0.4 + 0.3;
          const brownVariation = Math.random() * 0.2;
          data[i] = Math.floor(34 + greenVariation * 120 + brownVariation * 60);     // R
          data[i + 1] = Math.floor(139 + greenVariation * 100);                     // G
          data[i + 2] = Math.floor(34 + greenVariation * 60);                       // B
        } else {
          // Ocean - varied blues
          const blueVariation = Math.random() * 0.3 + 0.4;
          data[i] = Math.floor(15 * blueVariation);                                 // R
          data[i + 1] = Math.floor(25 + blueVariation * 80);                        // G
          data[i + 2] = Math.floor(112 + blueVariation * 120);                      // B
        }
        data[i + 3] = 255; // Alpha
      }
      
      context.putImageData(imageData, 0, 0);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    
    return new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 60,
      specular: new THREE.Color(0.1, 0.1, 0.6),
    });
  }, []);

  // Enhanced Cloud layer with more realistic patterns
  const cloudMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    if (context) {
      const imageData = context.createImageData(1024, 512);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % 1024;
        const y = Math.floor((i / 4) / 1024);
        
        const cloudNoise = Math.sin(x * 0.015) * Math.cos(y * 0.025) + 
                          Math.sin(x * 0.03) * Math.cos(y * 0.02) * 0.7 +
                          Math.sin(x * 0.08) * Math.cos(y * 0.06) * 0.3;
        
        if (cloudNoise > 0.1) {
          const opacity = Math.min((cloudNoise - 0.1) * 1.5, 1) * 255;
          data[i] = 255;     // R
          data[i + 1] = 255; // G
          data[i + 2] = 255; // B
          data[i + 3] = opacity * 0.9; // Alpha
        } else {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
          data[i + 3] = 0;
        }
      }
      
      context.putImageData(imageData, 0, 0);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7,
    });
  }, []);

  // Enhanced City lights for night side
  const cityLightsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    // Add more realistic city lights distribution
    for (let i = 0; i < 500; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 1.005;
      
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      
      positions.push(x, y, z);
      
      // Varied city light colors
      const colorVariation = Math.random();
      if (colorVariation > 0.7) {
        colors.push(1, 1, 0.8); // Warm white
      } else if (colorVariation > 0.4) {
        colors.push(1, 0.8, 0.4); // Orange
      } else {
        colors.push(0.8, 0.9, 1); // Cool white
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    return geometry;
  }, []);

  // Enhanced Trees/Forest patches with more variety
  const createTrees = useMemo(() => {
    const trees = [];
    for (let i = 0; i < 100; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 1.015;
      
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      
      const size = Math.random() * 0.02 + 0.01;
      const color = Math.random() > 0.5 ? 0x228B22 : 0x006400;
      
      trees.push([x, y, z, size, color]);
    }
    return trees;
  }, []);

  // Animation with more realistic rotation
  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.08;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Main Planet with enhanced material */}
      <mesh
        ref={planetRef}
        onClick={onClick}
        material={planetMaterial}
      >
        <sphereGeometry args={[1, 128, 64]} />
      </mesh>

      {/* Enhanced Atmosphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.08, 64, 32]} />
        <meshBasicMaterial
          color={0x87CEEB}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Enhanced Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.04, 64, 32]} />
        <primitive object={cloudMaterial} />
      </mesh>

      {/* Trees/Forests - More detailed when exploring */}
      {isExploring && (
        <group ref={treesRef}>
          {createTrees.map((treeData, index) => (
            <mesh key={index} position={[treeData[0], treeData[1], treeData[2]]}>
              <sphereGeometry args={[treeData[3], 12, 12]} />
              <meshBasicMaterial color={treeData[4]} />
            </mesh>
          ))}
        </group>
      )}

      {/* Enhanced City Lights */}
      <points ref={cityLightsRef} geometry={cityLightsGeometry}>
        <pointsMaterial
          size={0.008}
          vertexColors
          transparent
          opacity={0.9}
        />
      </points>

      {/* Ocean reflections - Enhanced for realism */}
      <mesh>
        <sphereGeometry args={[1.002, 64, 32]} />
        <meshBasicMaterial
          color={0x006994}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Additional surface details when exploring */}
      {isExploring && (
        <>
          {/* Mountain ranges */}
          {Array.from({ length: 20 }).map((_, index) => {
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            const radius = 1.02;
            
            const x = radius * Math.sin(theta) * Math.cos(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(theta);
            
            return (
              <mesh key={`mountain-${index}`} position={[x, y, z]}>
                <coneGeometry args={[0.015, 0.06, 8]} />
                <meshBasicMaterial color={0x8B4513} />
              </mesh>
            );
          })}
          
          {/* Rivers/Lakes */}
          {Array.from({ length: 15 }).map((_, index) => {
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            const radius = 1.008;
            
            const x = radius * Math.sin(theta) * Math.cos(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(theta);
            
            return (
              <mesh key={`water-${index}`} position={[x, y, z]}>
                <sphereGeometry args={[0.025, 12, 12]} />
                <meshBasicMaterial color={0x0077BE} transparent opacity={0.8} />
              </mesh>
            );
          })}
        </>
      )}
    </group>
  );
};

export default NovaPlanet;
