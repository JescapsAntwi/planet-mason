
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import StarfieldBackground from "@/components/StarfieldBackground";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { Zap, Circle } from "lucide-react";

const PlanetBuilder = () => {
  const navigate = useNavigate();
  const [planetName, setPlanetName] = useState("");
  const [planetType, setPlanetType] = useState("");
  const [atmosphere, setAtmosphere] = useState([50]);
  const [temperature, setTemperature] = useState([0]);
  const [gravity, setGravity] = useState([100]);
  const [waterLevel, setWaterLevel] = useState([30]);
  
  // New advanced features
  const [hasRings, setHasRings] = useState(false);
  const [ringDensity, setRingDensity] = useState([50]);
  const [hasHole, setHasHole] = useState(false);
  const [holeSize, setHoleSize] = useState([20]);
  const [magneticField, setMagneticField] = useState([30]);
  const [radiation, setRadiation] = useState([10]);
  const [moons, setMoons] = useState([0]);
  const [volcanoActivity, setVolcanoActivity] = useState([0]);
  const [crystalFormations, setCrystalFormations] = useState([0]);
  const [cityLights, setCityLights] = useState(false);
  const [cloudCover, setCloudCover] = useState([40]);

  const handleGenerate = () => {
    const planetData = {
      name: planetName || "Unnamed Planet",
      type: planetType,
      atmosphere: atmosphere[0],
      temperature: temperature[0],
      gravity: gravity[0],
      waterLevel: waterLevel[0],
      hasRings,
      ringDensity: ringDensity[0],
      hasHole,
      holeSize: holeSize[0],
      magneticField: magneticField[0],
      radiation: radiation[0],
      moons: moons[0],
      volcanoActivity: volcanoActivity[0],
      crystalFormations: crystalFormations[0],
      cityLights,
      cloudCover: cloudCover[0],
      generatedAt: new Date().toISOString(),
    };

    localStorage.setItem("currentPlanet", JSON.stringify(planetData));
    navigate("/result");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <Navigation />
      
      <main className="relative z-10 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold gradient-text mb-4">Advanced Planet Builder</h1>
            <p className="text-xl text-muted-foreground">Design realistic worlds with sci-fi features</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Controls Panel */}
            <Card className="glass-morphism p-8 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-primary mb-6 neon-glow">Planet Parameters</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="planet-name" className="text-foreground mb-2 block">Planet Name</Label>
                  <Input
                    id="planet-name"
                    value={planetName}
                    onChange={(e) => setPlanetName(e.target.value)}
                    placeholder="Enter planet name..."
                    className="bg-muted/20 border-primary/30 focus:border-primary neon-border"
                  />
                </div>

                <div>
                  <Label className="text-foreground mb-2 block">Planet Type</Label>
                  <Select value={planetType} onValueChange={setPlanetType}>
                    <SelectTrigger className="bg-muted/20 border-primary/30 focus:border-primary">
                      <SelectValue placeholder="Select planet type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-primary/30">
                      <SelectItem value="terrestrial">🌍 Terrestrial (Earth-like)</SelectItem>
                      <SelectItem value="gas-giant">🪐 Gas Giant (Jupiter-like)</SelectItem>
                      <SelectItem value="ice-giant">❄️ Ice Giant (Neptune-like)</SelectItem>
                      <SelectItem value="ice-world">🧊 Ice World (Europa-like)</SelectItem>
                      <SelectItem value="desert">🏜️ Desert World (Mars-like)</SelectItem>
                      <SelectItem value="ocean">🌊 Ocean World (Kamino-like)</SelectItem>
                      <SelectItem value="volcanic">🌋 Volcanic World (Io-like)</SelectItem>
                      <SelectItem value="crystal">💎 Crystal World</SelectItem>
                      <SelectItem value="metal">⚙️ Metal World</SelectItem>
                      <SelectItem value="plasma">⚡ Plasma World</SelectItem>
                      <SelectItem value="dark">🖤 Dark Matter World</SelectItem>
                      <SelectItem value="hollow">🕳️ Hollow World</SelectItem>
                      <SelectItem value="ring-world">💍 Ring World</SelectItem>
                      <SelectItem value="dyson-sphere">☀️ Dyson Sphere</SelectItem>
                      <SelectItem value="neutron">💫 Neutron Star</SelectItem>
                      <SelectItem value="pulsar">📡 Pulsar</SelectItem>
                      <SelectItem value="binary">👥 Binary Planet</SelectItem>
                      <SelectItem value="rogue">🌌 Rogue Planet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Basic Parameters */}
                <div>
                  <Label className="text-foreground mb-4 block">
                    Atmosphere Density: {atmosphere[0]}%
                  </Label>
                  <Slider
                    value={atmosphere}
                    onValueChange={setAtmosphere}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-foreground mb-4 block">
                    Temperature: {temperature[0]}°C
                  </Label>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    min={-273}
                    max={2000}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-foreground mb-4 block">
                    Gravity: {gravity[0]}% of Earth
                  </Label>
                  <Slider
                    value={gravity}
                    onValueChange={setGravity}
                    min={1}
                    max={500}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-foreground mb-4 block">
                    Water Coverage: {waterLevel[0]}%
                  </Label>
                  <Slider
                    value={waterLevel}
                    onValueChange={setWaterLevel}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Advanced Sci-Fi Features */}
                <div className="border-t border-primary/30 pt-6">
                  <h3 className="text-lg font-bold text-accent mb-4">Advanced Features</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-foreground">Planetary Rings</Label>
                    <Switch checked={hasRings} onCheckedChange={setHasRings} />
                  </div>
                  
                  {hasRings && (
                    <div className="mb-4">
                      <Label className="text-foreground mb-2 block">
                        Ring Density: {ringDensity[0]}%
                      </Label>
                      <Slider
                        value={ringDensity}
                        onValueChange={setRingDensity}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-foreground">Hollow Core</Label>
                    <Switch checked={hasHole} onCheckedChange={setHasHole} />
                  </div>
                  
                  {hasHole && (
                    <div className="mb-4">
                      <Label className="text-foreground mb-2 block">
                        Hole Size: {holeSize[0]}%
                      </Label>
                      <Slider
                        value={holeSize}
                        onValueChange={setHoleSize}
                        min={5}
                        max={80}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  )}

                  <div>
                    <Label className="text-foreground mb-4 block">
                      Cloud Coverage: {cloudCover[0]}%
                    </Label>
                    <Slider
                      value={cloudCover}
                      onValueChange={setCloudCover}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground mb-4 block">
                      Magnetic Field: {magneticField[0]}%
                    </Label>
                    <Slider
                      value={magneticField}
                      onValueChange={setMagneticField}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground mb-4 block">
                      Radiation Level: {radiation[0]}%
                    </Label>
                    <Slider
                      value={radiation}
                      onValueChange={setRadiation}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground mb-4 block">
                      Number of Moons: {moons[0]}
                    </Label>
                    <Slider
                      value={moons}
                      onValueChange={setMoons}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground mb-4 block">
                      Volcanic Activity: {volcanoActivity[0]}%
                    </Label>
                    <Slider
                      value={volcanoActivity}
                      onValueChange={setVolcanoActivity}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground mb-4 block">
                      Crystal Formations: {crystalFormations[0]}%
                    </Label>
                    <Slider
                      value={crystalFormations}
                      onValueChange={setCrystalFormations}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-foreground">City Lights (Civilization)</Label>
                    <Switch checked={cityLights} onCheckedChange={setCityLights} />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full mt-8 bg-gradient-to-r from-primary to-accent text-black font-bold py-4 text-lg animate-glow-pulse"
                disabled={!planetType}
              >
                <Zap className="mr-2 h-5 w-5" />
                Generate Advanced Planet
              </Button>
            </Card>

            {/* Preview Panel */}
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold text-accent mb-6 neon-glow">Live Preview</h2>
              
              <div className="aspect-square bg-gradient-to-br from-muted/20 to-muted/5 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse"></div>
                <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
                  <div className="relative">
                    <Circle className="h-32 w-32 text-primary mx-auto mb-4 animate-spin" style={{ animationDuration: '10s' }} />
                    {hasRings && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border-2 border-accent/50 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {planetName || "Unnamed Planet"}
                  </h3>
                  <p className="text-muted-foreground">
                    {planetType ? planetType.charAt(0).toUpperCase() + planetType.slice(1).replace('-', ' ') : "Select a type"}
                  </p>
                  {hasRings && <p className="text-xs text-accent mt-1">✨ With Rings</p>}
                  {hasHole && <p className="text-xs text-secondary mt-1">🕳️ Hollow Core</p>}
                  {cityLights && <p className="text-xs text-primary mt-1">🌃 Civilized</p>}
                </div>
              </div>

              <div className="mt-6 space-y-3 max-h-64 overflow-y-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Temperature</span>
                  <span className="text-accent">{temperature[0]}°C</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gravity</span>
                  <span className="text-secondary">{gravity[0]}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Atmosphere</span>
                  <span className="text-primary">{atmosphere[0]}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Water</span>
                  <span className="text-primary">{waterLevel[0]}%</span>
                </div>
                {moons[0] > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Moons</span>
                    <span className="text-accent">{moons[0]}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Radiation</span>
                  <span className="text-red-400">{radiation[0]}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Magnetic Field</span>
                  <span className="text-blue-400">{magneticField[0]}%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlanetBuilder;
