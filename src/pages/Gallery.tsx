
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StarfieldBackground from "@/components/StarfieldBackground";
import Navigation from "@/components/Navigation";
import Planet3DScene from "@/components/Planet3DScene";
import { Link } from "react-router-dom";
import { Star, Zap, Eye, X } from "lucide-react";

interface SavedPlanet {
  id: string;
  name: string;
  type: string;
  atmosphere: number;
  temperature: number;
  gravity: number;
  waterLevel: number;
  generatedAt: string;
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

const Gallery = () => {
  const [savedPlanets, setSavedPlanets] = useState<SavedPlanet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<SavedPlanet | null>(null);

  useEffect(() => {
    const planets = JSON.parse(localStorage.getItem("savedPlanets") || "[]");
    setSavedPlanets(planets);
  }, []);

  const samplePlanets: SavedPlanet[] = [
    {
      id: "sample1",
      name: "Aqua Prima",
      type: "ocean",
      atmosphere: 85,
      temperature: 22,
      gravity: 95,
      waterLevel: 78,
      hasRings: false,
      moons: 2,
      cloudCover: 60,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample2",
      name: "Crimson Forge",
      type: "volcanic",
      atmosphere: 45,
      temperature: 450,
      gravity: 120,
      waterLevel: 5,
      hasRings: true,
      ringDensity: 70,
      volcanoActivity: 85,
      radiation: 30,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample3",
      name: "Zephyr Giant",
      type: "gas-giant",
      atmosphere: 95,
      temperature: -150,
      gravity: 280,
      waterLevel: 0,
      hasRings: true,
      ringDensity: 90,
      moons: 4,
      magneticField: 85,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample4",
      name: "Crystal Nexus",
      type: "crystal",
      atmosphere: 30,
      temperature: -50,
      gravity: 80,
      waterLevel: 15,
      crystalFormations: 95,
      magneticField: 70,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample5",
      name: "Hollow Echo",
      type: "hollow",
      atmosphere: 60,
      temperature: 100,
      gravity: 40,
      waterLevel: 25,
      hasHole: true,
      holeSize: 40,
      moons: 1,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample6",
      name: "Frost Titan",
      type: "ice-giant",
      atmosphere: 75,
      temperature: -200,
      gravity: 180,
      waterLevel: 90,
      hasRings: true,
      ringDensity: 60,
      moons: 6,
      magneticField: 60,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample7",
      name: "Desert Crown",
      type: "desert",
      atmosphere: 25,
      temperature: 180,
      gravity: 85,
      waterLevel: 2,
      hasRings: false,
      moons: 0,
      radiation: 45,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample8",
      name: "Plasma Storm",
      type: "plasma",
      atmosphere: 90,
      temperature: 800,
      gravity: 150,
      waterLevel: 0,
      hasRings: false,
      radiation: 95,
      magneticField: 90,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample9",
      name: "Metal Core",
      type: "metal",
      atmosphere: 15,
      temperature: -80,
      gravity: 200,
      waterLevel: 5,
      hasRings: true,
      ringDensity: 40,
      magneticField: 95,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample10",
      name: "Binary Dance",
      type: "binary",
      atmosphere: 65,
      temperature: 50,
      gravity: 110,
      waterLevel: 45,
      hasRings: true,
      ringDensity: 80,
      moons: 3,
      magneticField: 50,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample11",
      name: "Neutron Pulse",
      type: "neutron",
      atmosphere: 0,
      temperature: 1000000,
      gravity: 1000,
      waterLevel: 0,
      hasRings: false,
      radiation: 100,
      magneticField: 100,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample12",
      name: "City Lights",
      type: "terrestrial",
      atmosphere: 80,
      temperature: 25,
      gravity: 100,
      waterLevel: 60,
      hasRings: false,
      moons: 1,
      cityLights: true,
      cloudCover: 45,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample13",
      name: "Rogue Wanderer",
      type: "rogue",
      atmosphere: 5,
      temperature: -250,
      gravity: 60,
      waterLevel: 80,
      hasRings: false,
      moons: 0,
      radiation: 15,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample14",
      name: "Ring World Alpha",
      type: "ring-world",
      atmosphere: 70,
      temperature: 20,
      gravity: 95,
      waterLevel: 40,
      hasRings: true,
      ringDensity: 100,
      moons: 0,
      cityLights: true,
      generatedAt: new Date().toISOString(),
    },
    {
      id: "sample15",
      name: "Dark Matter",
      type: "dark",
      atmosphere: 20,
      temperature: -300,
      gravity: 300,
      waterLevel: 0,
      hasRings: false,
      moons: 2,
      radiation: 80,
      magneticField: 40,
      generatedAt: new Date().toISOString(),
    },
  ];

  const allPlanets = [...savedPlanets, ...samplePlanets];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <Navigation />
      
      <main className="relative z-10 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold gradient-text mb-4">3D Galactic Observatory</h1>
            <p className="text-xl text-muted-foreground">Explore realistic 3D worlds from across the universe</p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <div className="text-sm text-primary">
                🌌 {allPlanets.length} Worlds Discovered
              </div>
              <div className="text-sm text-accent">
                ⭐ {savedPlanets.length} Personal Creations
              </div>
            </div>
          </div>

          {allPlanets.length === 0 ? (
            <Card className="glass-morphism p-12 text-center">
              <Star className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-muted-foreground mb-4">No planets yet</h2>
              <p className="text-muted-foreground mb-6">
                Be the first to create and share a planet with the community!
              </p>
              <Link to="/builder">
                <Button className="bg-gradient-to-r from-primary to-accent text-black font-bold px-6 py-3">
                  <Zap className="mr-2 h-5 w-5" />
                  Create Your First Planet
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allPlanets.map((planet, index) => (
                <Card 
                  key={planet.id} 
                  className="glass-morphism p-4 group hover:neon-border transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-muted/20 to-muted/5 rounded-xl relative overflow-hidden mb-4">
                    <Planet3DScene
                      type={planet.type}
                      atmosphere={planet.atmosphere}
                      temperature={planet.temperature}
                      gravity={planet.gravity}
                      waterLevel={planet.waterLevel}
                      hasRings={planet.hasRings}
                      ringDensity={planet.ringDensity}
                      hasHole={planet.hasHole}
                      holeSize={planet.holeSize}
                      magneticField={planet.magneticField}
                      radiation={planet.radiation}
                      moons={planet.moons}
                      volcanoActivity={planet.volcanoActivity}
                      crystalFormations={planet.crystalFormations}
                      cityLights={planet.cityLights}
                      cloudCover={planet.cloudCover}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <p className="text-white text-xs font-medium">Click Explore for full 3D view</p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-primary mb-1 group-hover:neon-glow transition-all">
                    {planet.name}
                  </h3>
                  <p className="text-xs text-accent capitalize mb-2">
                    {planet.type.replace('-', ' ')} Planet
                    {planet.hasRings && " • Ringed"}
                    {planet.hasHole && " • Hollow"}
                    {planet.moons > 0 && ` • ${planet.moons} Moon${planet.moons > 1 ? 's' : ''}`}
                  </p>
                  
                  <div className="space-y-1 text-xs mb-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temp</span>
                      <span className="text-accent">{planet.temperature}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Water</span>
                      <span className="text-primary">{planet.waterLevel}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Atmosphere</span>
                      <span className="text-secondary">{planet.atmosphere}%</span>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-primary/30 text-primary hover:bg-primary/10 transition-all"
                        onClick={() => setSelectedPlanet(planet)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Explore in 3D
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full h-[80vh] glass-morphism border-primary/30">
                      <DialogHeader>
                        <DialogTitle className="text-2xl gradient-text flex items-center gap-2">
                          <Star className="h-6 w-6" />
                          {selectedPlanet?.name}
                        </DialogTitle>
                      </DialogHeader>
                      
                      {selectedPlanet && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                          <div className="lg:col-span-2 bg-gradient-to-br from-muted/10 to-muted/5 rounded-xl overflow-hidden">
                            <Planet3DScene
                              type={selectedPlanet.type}
                              atmosphere={selectedPlanet.atmosphere}
                              temperature={selectedPlanet.temperature}
                              gravity={selectedPlanet.gravity}
                              waterLevel={selectedPlanet.waterLevel}
                              hasRings={selectedPlanet.hasRings}
                              ringDensity={selectedPlanet.ringDensity}
                              hasHole={selectedPlanet.hasHole}
                              holeSize={selectedPlanet.holeSize}
                              magneticField={selectedPlanet.magneticField}
                              radiation={selectedPlanet.radiation}
                              moons={selectedPlanet.moons}
                              volcanoActivity={selectedPlanet.volcanoActivity}
                              crystalFormations={selectedPlanet.crystalFormations}
                              cityLights={selectedPlanet.cityLights}
                              cloudCover={selectedPlanet.cloudCover}
                            />
                          </div>
                          
                          <div className="space-y-4">
                            <div className="glass-morphism p-4 rounded-lg">
                              <h4 className="text-lg font-bold text-primary mb-3">Planet Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Type:</span>
                                  <span className="text-accent capitalize">{selectedPlanet.type.replace('-', ' ')}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Temperature:</span>
                                  <span className="text-accent">{selectedPlanet.temperature}°C</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Water Level:</span>
                                  <span className="text-primary">{selectedPlanet.waterLevel}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Atmosphere:</span>
                                  <span className="text-secondary">{selectedPlanet.atmosphere}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Gravity:</span>
                                  <span className="text-secondary">{selectedPlanet.gravity}%</span>
                                </div>
                                {selectedPlanet.moons > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Moons:</span>
                                    <span className="text-accent">{selectedPlanet.moons}</span>
                                  </div>
                                )}
                                {selectedPlanet.hasRings && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Ring Density:</span>
                                    <span className="text-accent">{selectedPlanet.ringDensity}%</span>
                                  </div>
                                )}
                                {selectedPlanet.radiation > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Radiation:</span>
                                    <span className="text-destructive">{selectedPlanet.radiation}%</span>
                                  </div>
                                )}
                                {selectedPlanet.magneticField > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Magnetic Field:</span>
                                    <span className="text-primary">{selectedPlanet.magneticField}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="glass-morphism p-4 rounded-lg">
                              <h4 className="text-lg font-bold text-primary mb-3">Controls</h4>
                              <div className="space-y-2 text-sm text-muted-foreground">
                                <div>🖱️ <strong>Click & Drag:</strong> Rotate planet</div>
                                <div>🎯 <strong>Scroll:</strong> Zoom in/out</div>
                                <div>⚡ <strong>Auto-rotate:</strong> Enabled</div>
                                <div>🌍 <strong>Full 360°:</strong> Complete exploration</div>
                              </div>
                            </div>
                            
                            {(selectedPlanet.cityLights || selectedPlanet.volcanoActivity > 30 || selectedPlanet.crystalFormations > 40) && (
                              <div className="glass-morphism p-4 rounded-lg">
                                <h4 className="text-lg font-bold text-primary mb-3">Special Features</h4>
                                <div className="space-y-1 text-sm">
                                  {selectedPlanet.cityLights && (
                                    <div className="text-yellow-400">✨ City Lights Visible</div>
                                  )}
                                  {selectedPlanet.volcanoActivity > 30 && (
                                    <div className="text-red-400">🌋 Active Volcanism</div>
                                  )}
                                  {selectedPlanet.crystalFormations > 40 && (
                                    <div className="text-purple-400">💎 Crystal Formations</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">Create Your Own Universe</h2>
              <p className="text-muted-foreground">Join thousands of explorers building the ultimate galactic database</p>
            </div>
            <Link to="/builder">
              <Button className="bg-gradient-to-r from-primary to-accent text-black font-bold px-8 py-4 text-lg animate-glow-pulse">
                <Zap className="mr-2 h-5 w-5" />
                Launch Planet Builder
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
