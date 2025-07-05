import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StarfieldBackground from "@/components/StarfieldBackground";
import Navigation from "@/components/Navigation";
import Planet3DScene from "@/components/Planet3DScene";
import { Link, useNavigate } from "react-router-dom";
import { Circle, Star, Zap } from "lucide-react";

interface PlanetData {
  name: string;
  type: string;
  atmosphere: number;
  temperature: number;
  gravity: number;
  waterLevel: number;
  hasRings: boolean;
  ringDensity: number;
  hasHole: boolean;
  holeSize: number;
  magneticField: number;
  radiation: number;
  moons: number;
  volcanoActivity: number;
  crystalFormations: number;
  cityLights: boolean;
  cloudCover: number;
  generatedAt: string;
}

const AIResult = () => {
  const navigate = useNavigate();
  const [planetData, setPlanetData] = useState<PlanetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPlanet = localStorage.getItem("currentPlanet");
    if (storedPlanet) {
      setPlanetData(JSON.parse(storedPlanet));
    } else {
      navigate("/builder");
    }

    // Simulate AI processing time
    setTimeout(() => setLoading(false), 2000);
  }, [navigate]);

  const savePlanet = () => {
    if (!planetData) return;
    
    const savedPlanets = JSON.parse(localStorage.getItem("savedPlanets") || "[]");
    const planetWithId = { ...planetData, id: Date.now().toString() };
    savedPlanets.push(planetWithId);
    localStorage.setItem("savedPlanets", JSON.stringify(savedPlanets));
    
    navigate("/gallery");
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <StarfieldBackground />
        <Navigation />
        
        <main className="relative z-10 pt-24 flex items-center justify-center min-h-[80vh]">
          <Card className="glass-morphism p-12 text-center">
            <div className="animate-spin mb-6">
              <Circle className="h-16 w-16 text-primary mx-auto" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">AI Processing...</h2>
            <p className="text-muted-foreground">Generating your unique planet</p>
          </Card>
        </main>
      </div>
    );
  }

  if (!planetData) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <Navigation />
      
      <main className="relative z-10 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold gradient-text mb-4 animate-fade-in">
              Advanced Planet Generated!
            </h1>
            <p className="text-xl text-muted-foreground">Your sci-fi world is ready to explore</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 3D Planet Visualization */}
            <Card className="glass-morphism p-8">
              <h3 className="text-2xl font-bold text-primary mb-6 neon-glow">3D Planet View</h3>
              <div className="aspect-square bg-gradient-to-br from-muted/20 to-muted/5 rounded-2xl relative overflow-hidden">
                <Planet3DScene
                  type={planetData.type}
                  atmosphere={planetData.atmosphere}
                  temperature={planetData.temperature}
                  gravity={planetData.gravity}
                  waterLevel={planetData.waterLevel}
                  hasRings={planetData.hasRings}
                  ringDensity={planetData.ringDensity}
                  hasHole={planetData.hasHole}
                  holeSize={planetData.holeSize}
                  magneticField={planetData.magneticField}
                  radiation={planetData.radiation}
                  moons={planetData.moons}
                  volcanoActivity={planetData.volcanoActivity}
                  crystalFormations={planetData.crystalFormations}
                  cityLights={planetData.cityLights}
                  cloudCover={planetData.cloudCover}
                />
                
                {/* Interactive hint */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-sm text-primary/80 bg-black/50 rounded-lg p-2">
                    Click and drag to rotate • Scroll to zoom
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <h2 className="text-3xl font-bold text-primary neon-glow mb-2">
                  {planetData.name}
                </h2>
                <p className="text-lg text-accent capitalize">
                  {planetData.type.replace('-', ' ')} Planet
                </p>
                <div className="flex justify-center gap-4 mt-2 text-sm">
                  {planetData.hasRings && <span className="text-accent">🪐 Ringed</span>}
                  {planetData.hasHole && <span className="text-secondary">🕳️ Hollow</span>}
                  {planetData.cityLights && <span className="text-primary">🌃 Civilized</span>}
                  {planetData.moons > 0 && <span className="text-blue-400">🌙 {planetData.moons} Moon{planetData.moons > 1 ? 's' : ''}</span>}
                </div>
              </div>
            </Card>

            {/* Enhanced Planet Details */}
            <Card className="glass-morphism p-8">
              <h3 className="text-2xl font-bold text-accent mb-6 neon-glow">Advanced Analysis</h3>
              
              <div className="space-y-6 max-h-96 overflow-y-auto">
                <div className="border border-primary/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-primary mb-2">Atmospheric Conditions</h4>
                  <div className="flex justify-between mb-2">
                    <span>Density</span>
                    <span className="text-primary">{planetData.atmosphere}%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${planetData.atmosphere}%` }}
                    ></div>
                  </div>
                </div>

                <div className="border border-accent/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-accent mb-2">Environmental Factors</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Temperature</div>
                      <div className="text-xl font-bold text-accent">{planetData.temperature}°C</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Gravity</div>
                      <div className="text-xl font-bold text-secondary">{planetData.gravity}%</div>
                    </div>
                  </div>
                </div>

                <div className="border border-secondary/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-secondary mb-2">Surface Features</h4>
                  <div className="flex justify-between mb-2">
                    <span>Water Coverage</span>
                    <span className="text-secondary">{planetData.waterLevel}%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${planetData.waterLevel}%` }}
                    ></div>
                  </div>
                </div>

                {(planetData.magneticField > 0 || planetData.radiation > 0) && (
                  <div className="border border-blue-400/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Energy Fields</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Magnetic Field</div>
                        <div className="text-xl font-bold text-blue-400">{planetData.magneticField}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Radiation</div>
                        <div className="text-xl font-bold text-red-400">{planetData.radiation}%</div>
                      </div>
                    </div>
                  </div>
                )}

                {(planetData.volcanoActivity > 0 || planetData.crystalFormations > 0) && (
                  <div className="border border-purple-400/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">Geological Features</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Volcanic Activity</div>
                        <div className="text-xl font-bold text-orange-400">{planetData.volcanoActivity}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Crystal Formations</div>
                        <div className="text-xl font-bold text-purple-400">{planetData.crystalFormations}%</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-primary mb-2">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    This {planetData.type.replace('-', ' ')} world 
                    {planetData.hasRings ? " features magnificent planetary rings," : ""}
                    {planetData.hasHole ? " has a unique hollow structure," : ""}
                    {planetData.moons > 0 ? ` is orbited by ${planetData.moons} moon${planetData.moons > 1 ? 's' : ''},` : ""}
                    {planetData.cityLights ? " shows signs of advanced civilization," : ""}
                    {planetData.radiation > 50 ? " emits dangerous radiation levels," : ""}
                    {planetData.magneticField > 70 ? " has an extremely strong magnetic field," : ""}
                    making it a {planetData.temperature > 200 ? "scorching" : planetData.temperature < -100 ? "frigid" : "temperate"} world 
                    with {planetData.gravity < 50 ? "low gravity ideal for floating cities" : 
                         planetData.gravity > 200 ? "crushing gravity requiring specialized habitats" : 
                         "Earth-like gravity suitable for colonization"}.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  onClick={savePlanet}
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-black font-bold py-3 animate-glow-pulse"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Save to Gallery
                </Button>
                <Link to="/builder" className="flex-1">
                  <Button variant="outline" className="w-full border-primary text-primary py-3 hover:bg-primary/10">
                    <Zap className="mr-2 h-5 w-5" />
                    Create Another
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIResult;
