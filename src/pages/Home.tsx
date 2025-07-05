
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StarfieldBackground from "@/components/StarfieldBackground";
import Navigation from "@/components/Navigation";
import { Zap, Star, Circle, Rocket } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <Navigation />
      
      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text animate-float">
              BUILD WORLDS
            </h1>
            <h2 className="text-3xl md:text-4xl mb-8 text-primary neon-glow">
              WITH AI POWER
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Harness the power of artificial intelligence to create stunning, 
              unique planets with custom atmospheres, terrains, and ecosystems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/builder">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-black font-bold px-8 py-4 text-lg animate-glow-pulse">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Creating
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="outline" size="lg" className="border-primary text-primary px-8 py-4 text-lg hover:bg-primary/10">
                  <Star className="mr-2 h-5 w-5" />
                  Explore Gallery
                </Button>
              </Link>
              <Link to="/aniket-verse">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold px-8 py-4 text-lg animate-pulse border-2 border-purple-400">
                  <Rocket className="mr-2 h-5 w-5" />
                  Aniket Verse
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-morphism p-8 text-center group hover:neon-border transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">AI Generation</h3>
              <p className="text-muted-foreground">
                Advanced AI algorithms create unique planetary features, 
                atmospheres, and landscapes based on your specifications.
              </p>
            </Card>

            <Card className="glass-morphism p-8 text-center group hover:neon-border transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <Circle className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-accent">3D Visualization</h3>
              <p className="text-muted-foreground">
                See your planets come to life with stunning 3D renderings 
                and interactive exploration capabilities.
              </p>
            </Card>

            <Card className="glass-morphism p-8 text-center group hover:neon-border transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-secondary">Share & Discover</h3>
              <p className="text-muted-foreground">
                Share your creations with the community and discover 
                amazing worlds created by other planet builders.
              </p>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="glass-morphism rounded-2xl p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2 neon-glow">10K+</div>
                <div className="text-muted-foreground">Planets Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2 neon-glow">5K+</div>
                <div className="text-muted-foreground">Active Builders</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2 neon-glow">50M+</div>
                <div className="text-muted-foreground">AI Calculations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2 neon-glow">99.9%</div>
                <div className="text-muted-foreground">Unique Results</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
