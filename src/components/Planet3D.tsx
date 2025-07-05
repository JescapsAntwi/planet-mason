
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Planet3DProps {
  type: string;
  atmosphere: number;
  temperature: number;
  waterLevel: number;
  size?: number;
  hasRings?: boolean;
  ringDensity?: number;
  hasHole?: boolean;
  holeSize?: number;
  magneticField?: number;
  radiation?: number;
  moons?: number;
  volcanoActivity?: number;
  crystalFormations?: number;
  cityLights?: boolean;
  cloudCover?: number;
}

const Planet3D = ({ 
  type, 
  atmosphere, 
  temperature, 
  waterLevel, 
  size = 1,
  hasRings = false,
  ringDensity = 50,
  hasHole = false,
  holeSize = 20,
  magneticField = 30,
  radiation = 10,
  moons = 0,
  volcanoActivity = 0,
  crystalFormations = 0,
  cityLights = false,
  cloudCover = 40
}: Planet3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const moonRefs = useRef<THREE.Mesh[]>([]);

  // Enhanced planet colors based on type and properties
  const planetColors = useMemo(() => {
    const baseColors = {
      terrestrial: new THREE.Color(0.2, 0.5, 0.3),
      'gas-giant': new THREE.Color(0.8, 0.6, 0.3),
      'ice-giant': new THREE.Color(0.4, 0.6, 0.9),
      'ice-world': new THREE.Color(0.8, 0.9, 1.0),
      desert: new THREE.Color(0.8, 0.5, 0.2),
      ocean: new THREE.Color(0.1, 0.4, 0.8),
      volcanic: new THREE.Color(0.9, 0.3, 0.1),
      crystal: new THREE.Color(0.8, 0.4, 0.9),
      metal: new THREE.Color(0.6, 0.6, 0.7),
      plasma: new THREE.Color(1.0, 0.3, 0.8),
      dark: new THREE.Color(0.1, 0.0, 0.2),
      hollow: new THREE.Color(0.5, 0.3, 0.7),
      'ring-world': new THREE.Color(0.7, 0.7, 0.8),
      'dyson-sphere': new THREE.Color(0.9, 0.8, 0.3),
      neutron: new THREE.Color(0.9, 0.9, 1.0),
      pulsar: new THREE.Color(0.3, 0.9, 1.0),
      binary: new THREE.Color(0.6, 0.4, 0.8),
      rogue: new THREE.Color(0.2, 0.2, 0.3),
    };

    let baseColor = baseColors[type as keyof typeof baseColors] || new THREE.Color(0.5, 0.5, 0.5);
    
    // Modify colors based on properties
    if (waterLevel > 50) {
      baseColor = baseColor.lerp(new THREE.Color(0.1, 0.4, 0.8), waterLevel / 200);
    }
    
    if (temperature > 500) {
      baseColor = baseColor.lerp(new THREE.Color(1.0, 0.4, 0.1), Math.min((temperature - 500) / 1000, 0.8));
    } else if (temperature < -100) {
      baseColor = baseColor.lerp(new THREE.Color(0.7, 0.8, 1.0), Math.min((-temperature - 100) / 200, 0.6));
    }

    if (volcanoActivity > 30) {
      baseColor = baseColor.lerp(new THREE.Color(1.0, 0.2, 0.0), volcanoActivity / 200);
    }

    if (crystalFormations > 40) {
      baseColor = baseColor.lerp(new THREE.Color(0.8, 0.4, 0.9), crystalFormations / 200);
    }

    return baseColor;
  }, [type, waterLevel, temperature, volcanoActivity, crystalFormations]);

  // Create enhanced planet geometry
  const planetGeometry = useMemo(() => {
    if (hasHole) {
      // Create a torus for hollow planets
      const outerRadius = size;
      const innerRadius = (holeSize / 100) * size * 0.5;
      return new THREE.TorusGeometry(outerRadius * 0.7, outerRadius - innerRadius, 16, 32);
    }
    return new THREE.SphereGeometry(size, 64, 64);
  }, [size, hasHole, holeSize]);

  // Enhanced planet material
  const planetMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial({
      color: planetColors,
      shininess: waterLevel > 30 ? 100 : type === 'crystal' ? 200 : 30,
      specular: waterLevel > 30 ? new THREE.Color(0.4, 0.4, 0.8) : 
               type === 'crystal' ? new THREE.Color(0.9, 0.5, 0.9) :
               type === 'metal' ? new THREE.Color(0.8, 0.8, 0.8) :
               new THREE.Color(0.2, 0.2, 0.2),
      emissive: radiation > 50 ? new THREE.Color(0.1, 0.3, 0.1) : 
               type === 'plasma' ? new THREE.Color(0.2, 0.0, 0.2) :
               cityLights ? new THREE.Color(0.05, 0.05, 0.02) :
               new THREE.Color(0, 0, 0),
    });

    // Add procedural textures
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Create detailed surface patterns
        const imageData = context.createImageData(512, 512);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const x = (i / 4) % 512;
          const y = Math.floor((i / 4) / 512);
          
          // Base noise
          const noise1 = Math.sin(x * 0.02) * Math.cos(y * 0.02) * 0.5 + 0.5;
          const noise2 = Math.sin(x * 0.05 + y * 0.03) * 0.3 + 0.7;
          const noise3 = Math.random() * 0.2 + 0.8;
          
          let r = planetColors.r * 255;
          let g = planetColors.g * 255;
          let b = planetColors.b * 255;
          
          // Apply type-specific patterns
          if (type === 'volcanic' || volcanoActivity > 30) {
            const lava = Math.sin(x * 0.1) * Math.sin(y * 0.1);
            if (lava > 0.3) {
              r = Math.min(255, r + 100);
              g = Math.max(0, g - 50);
              b = Math.max(0, b - 80);
            }
          }
          
          if (type === 'crystal' || crystalFormations > 40) {
            const crystal = (Math.sin(x * 0.2) + Math.cos(y * 0.2)) * 0.5;
            if (crystal > 0.2) {
              r = Math.min(255, r + 50);
              g = Math.min(255, g + 30);
              b = Math.min(255, b + 70);
            }
          }
          
          if (cityLights && Math.random() < 0.005) {
            r = Math.min(255, r + 100);
            g = Math.min(255, g + 80);
            b = Math.min(255, b + 40);
          }
          
          const combined = noise1 * noise2 * noise3;
          data[i] = Math.floor(r * combined);
          data[i + 1] = Math.floor(g * combined);
          data[i + 2] = Math.floor(b * combined);
          data[i + 3] = 255;
        }
        
        context.putImageData(imageData, 0, 0);
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        material.map = texture;
      }
    } catch (error) {
      console.warn('Failed to create planet texture:', error);
    }
    
    return material;
  }, [planetColors, waterLevel, type, radiation, cityLights, volcanoActivity, crystalFormations]);

  // Create rings geometry and material
  const ringsGeometry = useMemo(() => {
    if (!hasRings) return null;
    return new THREE.RingGeometry(size * 1.2, size * 2.0, 64);
  }, [hasRings, size]);

  const ringsMaterial = useMemo(() => {
    if (!hasRings) return null;
    
    // Create ring texture
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    if (context) {
      const gradient = context.createRadialGradient(128, 128, 50, 128, 128, 128);
      gradient.addColorStop(0, `rgba(200, 150, 100, ${ringDensity / 200})`);
      gradient.addColorStop(0.5, `rgba(150, 120, 80, ${ringDensity / 150})`);
      gradient.addColorStop(1, `rgba(100, 80, 60, ${ringDensity / 300})`);
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, 256, 256);
      
      // Add ring gaps
      for (let i = 0; i < 8; i++) {
        const radius = 30 + i * 12;
        context.beginPath();
        context.arc(128, 128, radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(0, 0, 0, ${0.3 + Math.random() * 0.4})`;
        context.lineWidth = Math.random() * 3 + 1;
        context.stroke();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
      opacity: ringDensity / 100 * 0.8,
    });
  }, [hasRings, ringDensity]);

  // Enhanced atmosphere
  const atmosphereGeometry = useMemo(() => 
    atmosphere >= 10 ? new THREE.SphereGeometry(size * 1.05, 32, 32) : null, 
    [atmosphere, size]
  );
  
  const atmosphereMaterial = useMemo(() => {
    if (atmosphere < 10) return null;
    
    let atmosphereColor = new THREE.Color(0.3, 0.6, 1.0);
    
    if (type === 'volcanic') atmosphereColor = new THREE.Color(0.8, 0.4, 0.2);
    if (type === 'plasma') atmosphereColor = new THREE.Color(0.8, 0.2, 0.8);
    if (radiation > 50) atmosphereColor = new THREE.Color(0.4, 0.8, 0.4);
    
    return new THREE.MeshBasicMaterial({
      color: atmosphereColor,
      transparent: true,
      opacity: Math.min(atmosphere / 100 * 0.4, 0.4),
      side: THREE.BackSide,
    });
  }, [atmosphere, type, radiation]);

  // Magnetic field glow effect
  const glowGeometry = useMemo(() => 
    magneticField > 20 ? new THREE.SphereGeometry(size * 1.3, 32, 32) : null,
    [magneticField, size]
  );

  const glowMaterial = useMemo(() => {
    if (magneticField < 20) return null;
    
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.2, 0.4, 0.8),
      transparent: true,
      opacity: magneticField / 100 * 0.1,
      side: THREE.BackSide,
    });
  }, [magneticField]);

  // Create moons
  const moonGeometries = useMemo(() => {
    const geometries = [];
    for (let i = 0; i < moons; i++) {
      geometries.push(new THREE.SphereGeometry(size * (0.1 + Math.random() * 0.1), 16, 16));
    }
    return geometries;
  }, [moons, size]);

  const moonMaterials = useMemo(() => {
    const materials = [];
    for (let i = 0; i < moons; i++) {
      materials.push(new THREE.MeshPhongMaterial({
        color: new THREE.Color(0.6 + Math.random() * 0.3, 0.6 + Math.random() * 0.3, 0.6 + Math.random() * 0.3),
      }));
    }
    return materials;
  }, [moons]);

  // Animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.2;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= delta * 0.1;
    }
    
    // Animate moons
    moonRefs.current.forEach((moonRef, index) => {
      if (moonRef) {
        const angle = state.clock.elapsedTime * (0.5 + index * 0.2);
        const distance = size * (2 + index * 0.5);
        moonRef.position.x = Math.cos(angle) * distance;
        moonRef.position.z = Math.sin(angle) * distance;
        moonRef.position.y = Math.sin(angle * 2) * 0.3;
        moonRef.rotation.y += delta * (1 + index * 0.3);
      }
    });
  });

  return (
    <group>
      {/* Planet surface */}
      <mesh ref={meshRef} geometry={planetGeometry} material={planetMaterial} />
      
      {/* Atmosphere */}
      {atmosphereGeometry && atmosphereMaterial && (
        <mesh
          ref={atmosphereRef}
          geometry={atmosphereGeometry}
          material={atmosphereMaterial}
        />
      )}
      
      {/* Planetary rings */}
      {ringsGeometry && ringsMaterial && (
        <mesh
          ref={ringsRef}
          geometry={ringsGeometry}
          material={ringsMaterial}
          rotation={[Math.PI / 2, 0, 0]}
        />
      )}
      
      {/* Magnetic field glow */}
      {glowGeometry && glowMaterial && (
        <mesh
          ref={glowRef}
          geometry={glowGeometry}
          material={glowMaterial}
        />
      )}
      
      {/* Moons */}
      {moonGeometries.map((geometry, index) => (
        <mesh
          key={index}
          ref={(ref) => {
            if (ref) moonRefs.current[index] = ref;
          }}
          geometry={geometry}
          material={moonMaterials[index]}
        />
      ))}
      
      {/* Enhanced lighting */}
      <pointLight 
        position={[10, 10, 10]} 
        intensity={0.6} 
        color={radiation > 50 ? '#00ff00' : '#ffffff'} 
      />
      <ambientLight intensity={0.2} />
      
      {/* Special effects for exotic planets */}
      {type === 'pulsar' && (
        <pointLight 
          position={[0, 0, 0]} 
          intensity={2} 
          color="#00ffff"
          distance={20}
        />
      )}
      
      {(type === 'plasma' || radiation > 70) && (
        <pointLight 
          position={[0, 0, 0]} 
          intensity={1.5} 
          color="#ff00ff"
          distance={15}
        />
      )}
    </group>
  );
};

export default Planet3D;
