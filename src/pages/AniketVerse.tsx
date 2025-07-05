
import { useState } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import AstronautModel from '../components/AstronautModel';
import NovaPlanet from '../components/NovaPlanet';
import ErrorBoundary from '../components/ErrorBoundary';

const AniketVerse = () => {
  const [isExploringNova, setIsExploringNova] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleNovaClick = () => {
    setIsExploringNova(true);
    setShowWelcome(false);
  };

  const handleBackToVerse = () => {
    setIsExploringNova(false);
    setShowWelcome(true);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-4 left-4 z-50">
        <Link to="/">
          <Button variant="outline" className="bg-black/50 border-purple-500 text-white hover:bg-purple-500/20">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </nav>

      {/* Welcome Message */}
      {showWelcome && !isExploringNova && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-center">
          <div className="glass-morphism p-8 rounded-2xl border border-purple-500/30">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Welcome to Aniket Verse
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Explore the extraordinary world of NOVA
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Click on the planet NOVA to explore its realistic world
            </p>
            <Button 
              onClick={() => setShowWelcome(false)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Enter the Verse
            </Button>
          </div>
        </div>
      )}

      {/* Back to Verse Button */}
      {isExploringNova && (
        <div className="fixed top-20 left-4 z-50">
          <Button 
            onClick={handleBackToVerse}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Verse
          </Button>
        </div>
      )}

      {/* Instructions when verse is visible */}
      {!showWelcome && !isExploringNova && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="glass-morphism p-4 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-2">Controls</h3>
            <p className="text-sm text-gray-300">🖱️ Drag to rotate</p>
            <p className="text-sm text-gray-300">🔄 Scroll to zoom</p>
            <p className="text-sm text-gray-300">🪐 Click NOVA to explore</p>
          </div>
        </div>
      )}

      {/* 3D Scene */}
      <ErrorBoundary fallback={<div className="text-white text-center mt-20">3D Scene Loading...</div>}>
        <Canvas
          camera={{ 
            position: isExploringNova ? [0, 0, 3] : [0, 2, 8], 
            fov: 75 
          }}
          style={{ width: '100vw', height: '100vh' }}
        >
          <Suspense fallback={null}>
            {/* Enhanced Lighting - Much brighter */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <directionalLight position={[-10, -10, -5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={1.5} color="#4f46e5" />
            <pointLight position={[5, 5, 5]} intensity={1} color="#ec4899" />
            <pointLight position={[0, 10, 0]} intensity={1} color="#ffffff" />
            
            {/* Stars Background */}
            <Stars
              radius={300}
              depth={60}
              count={8000}
              factor={6}
              saturation={0}
              fade
              speed={1}
            />

            {/* Universe Title */}
            {!showWelcome && !isExploringNova && (
              <Text
                position={[0, 5, -3]}
                fontSize={0.8}
                color="#a855f7"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
              >
                ANIKET VERSE
              </Text>
            )}

            {/* Planet Label */}
            {!showWelcome && !isExploringNova && (
              <Text
                position={[0, -2, 0]}
                fontSize={0.3}
                color="#10b981"
                anchorX="center"
                anchorY="middle"
              >
                PLANET NOVA
              </Text>
            )}

            {/* NOVA Planet - Always visible when not in welcome */}
            {!showWelcome && (
              <NovaPlanet 
                position={isExploringNova ? [0, 0, 0] : [0, 0, 0]}
                onClick={handleNovaClick}
                isExploring={isExploringNova}
                scale={isExploringNova ? 2.5 : 1.2}
              />
            )}

            {/* Astronaut with Indian Flag - Only in verse view */}
            {!showWelcome && !isExploringNova && (
              <AstronautModel position={[4, -1, 2]} />
            )}

            {/* Additional decorative planets in verse view */}
            {!showWelcome && !isExploringNova && (
              <>
                <mesh position={[-6, 3, -5]}>
                  <sphereGeometry args={[0.3, 16, 16]} />
                  <meshPhongMaterial color={0xff6b6b} />
                </mesh>
                <mesh position={[6, -2, -8]}>
                  <sphereGeometry args={[0.5, 16, 16]} />
                  <meshPhongMaterial color={0x4ecdc4} />
                </mesh>
                <mesh position={[-4, -3, -6]}>
                  <sphereGeometry args={[0.2, 16, 16]} />
                  <meshPhongMaterial color={0xffe66d} />
                </mesh>
              </>
            )}

            {/* Camera Controls - Enhanced for better exploration */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={isExploringNova ? 1.5 : 3}
              maxDistance={isExploringNova ? 8 : 20}
              autoRotate={!isExploringNova && !showWelcome}
              autoRotateSpeed={0.3}
              enableDamping={true}
              dampingFactor={0.05}
              target={[0, 0, 0]}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              rotateSpeed={0.8}
              zoomSpeed={1.2}
              panSpeed={0.8}
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>

      {/* Planet Info during exploration */}
      {isExploringNova && (
        <div className="fixed bottom-4 left-4 z-50">
          <div className="glass-morphism p-4 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-2">Planet NOVA</h3>
            <p className="text-sm text-gray-300">🌍 A living world with forests, oceans, cities</p>
            <p className="text-sm text-gray-300">🌳 Dense vegetation and wildlife</p>
            <p className="text-sm text-gray-300">🌊 Vast blue oceans</p>
            <p className="text-xs text-gray-400 mt-2">🖱️ Drag to explore • 🔄 Scroll to zoom</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AniketVerse;
