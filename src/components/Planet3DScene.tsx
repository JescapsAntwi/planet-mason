
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Planet3D from './Planet3D';
import ErrorBoundary from './ErrorBoundary';

interface Planet3DSceneProps {
  type: string;
  atmosphere: number;
  temperature: number;
  waterLevel: number;
  gravity: number;
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

// Error fallback component
const ErrorFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
    <div className="text-center">
      <div className="text-4xl mb-2">🪐</div>
      <p className="text-white text-sm">3D View Unavailable</p>
      <p className="text-gray-400 text-xs mt-1">WebGL not supported</p>
    </div>
  </div>
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
    <div className="text-center">
      <div className="animate-spin text-4xl mb-2">🌍</div>
      <p className="text-white text-sm">Loading Planet...</p>
    </div>
  </div>
);

const Planet3DScene = ({ 
  type, 
  atmosphere, 
  temperature, 
  waterLevel,
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
}: Planet3DSceneProps) => {
  // Check WebGL support
  const isWebGLSupported = () => {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!context;
    } catch (e) {
      return false;
    }
  };

  if (!isWebGLSupported()) {
    return <ErrorFallback />;
  }

  return (
    <div className="w-full h-full">
      <ErrorBoundary
        fallback={<ErrorFallback />}
        onError={(error) => console.warn('3D Scene Error:', error)}
      >
        <Canvas
          camera={{ position: [0, 0, 4], fov: 75 }}
          style={{ background: 'transparent' }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            
            <Planet3D
              type={type}
              atmosphere={atmosphere}
              temperature={temperature}
              waterLevel={waterLevel}
              size={0.8}
              hasRings={hasRings}
              ringDensity={ringDensity}
              hasHole={hasHole}
              holeSize={holeSize}
              magneticField={magneticField}
              radiation={radiation}
              moons={moons}
              volcanoActivity={volcanoActivity}
              crystalFormations={crystalFormations}
              cityLights={cityLights}
              cloudCover={cloudCover}
            />
            
            <Stars
              radius={100}
              depth={50}
              count={2000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={1.5}
              maxDistance={12}
              autoRotate={true}
              autoRotateSpeed={0.5}
              enableDamping={true}
              dampingFactor={0.1}
              rotateSpeed={1}
              zoomSpeed={1.2}
              panSpeed={0.8}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              minAzimuthAngle={-Infinity}
              maxAzimuthAngle={Infinity}
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default Planet3DScene;
