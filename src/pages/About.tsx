
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import StarfieldBackground from "@/components/StarfieldBackground";
import Navigation from "@/components/Navigation";
import Planet3DScene from "@/components/Planet3DScene";
import { Link } from "react-router-dom";
import { Star, Zap, Circle, Rocket, Atom, Globe } from "lucide-react";

const About = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [researchForm, setResearchForm] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleResearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Application Submitted!",
      description: "Our research team will review your application and contact you soon.",
    });
    setResearchForm({ name: "", email: "", expertise: "", experience: "" });
  };

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Lead",
      bio: "Former NASA scientist specializing in planetary formation algorithms",
      planetType: "crystal"
    },
    {
      name: "Marcus Rodriguez",
      role: "3D Visualization Engineer", 
      bio: "Award-winning developer with 10+ years in spatial computing",
      planetType: "gas-giant"
    },
    {
      name: "Elena Volkov",
      role: "Astrophysics Consultant",
      bio: "PhD in Astrophysics, expert in planetary atmospheric modeling",
      planetType: "volcanic"
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <Navigation />
      
      <main className="relative z-10 pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section with 3D Planet */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 flex justify-center items-start pt-8">
              <div className="w-96 h-96 opacity-30 animate-float">
                <Planet3DScene
                  type="earth-like"
                  atmosphere={78}
                  temperature={15}
                  waterLevel={71}
                  gravity={100}
                  hasRings={false}
                  moons={1}
                  cityLights={true}
                  cloudCover={60}
                />
              </div>
            </div>
            <div className="relative z-10 bg-black/20 backdrop-blur-sm rounded-3xl p-12">
              <h1 className="text-6xl font-bold gradient-text mb-6 neon-glow">About AI Planet Builder</h1>
              <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
                We're pushing the boundaries of what's possible when artificial intelligence 
                meets planetary science and creative exploration.
              </p>
            </div>
          </div>

          {/* Mission Section with Interactive Elements */}
          <Card className="glass-morphism p-12 mb-12 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-32 h-32 opacity-20">
              <Planet3DScene
                type="hollow"
                atmosphere={45}
                temperature={-100}
                waterLevel={20}
                gravity={60}
                hasHole={true}
                holeSize={35}
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-6 neon-glow">Our Mission</h2>
                <p className="text-xl text-muted-foreground mb-6">
                  To democratize planetary creation through advanced AI, making it possible 
                  for anyone to design and explore unique worlds with scientific accuracy 
                  and creative freedom.
                </p>
                <p className="text-xl text-muted-foreground">
                  We believe that the future of space exploration starts with imagination, 
                  and our AI-powered tools help turn those dreams into scientifically 
                  plausible realities.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 relative animate-pulse">
                    <Planet3DScene
                      type="ringed-giant"
                      atmosphere={95}
                      temperature={-180}
                      waterLevel={0}
                      gravity={250}
                      hasRings={true}
                      ringDensity={85}
                      moons={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Technology Section with 3D Planets */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="glass-morphism p-8 text-center group hover:neon-border transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <Planet3DScene
                  type="volcanic"
                  atmosphere={40}
                  temperature={500}
                  waterLevel={5}
                  gravity={120}
                  volcanoActivity={90}
                />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                  <Zap className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Advanced AI</h3>
                <p className="text-muted-foreground">
                  Our proprietary neural networks analyze millions of planetary data points 
                  to generate scientifically accurate worlds.
                </p>
              </div>
            </Card>

            <Card className="glass-morphism p-8 text-center group hover:neon-border transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <Planet3DScene
                  type="crystal"
                  atmosphere={30}
                  temperature={-50}
                  waterLevel={15}
                  gravity={80}
                  crystalFormations={95}
                  magneticField={70}
                />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                  <Atom className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-accent">Real Physics</h3>
                <p className="text-muted-foreground">
                  Every planet follows real astronomical and geological principles, 
                  ensuring believable and consistent world generation.
                </p>
              </div>
            </Card>

            <Card className="glass-morphism p-8 text-center group hover:neon-border transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <Planet3DScene
                  type="ocean"
                  atmosphere={85}
                  temperature={22}
                  waterLevel={78}
                  gravity={95}
                  moons={2}
                  cloudCover={40}
                />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                  <Globe className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-secondary">Infinite Possibilities</h3>
                <p className="text-muted-foreground">
                  With billions of possible combinations, no two planets are ever the same. 
                  Each creation is truly unique.
                </p>
              </div>
            </Card>
          </div>

          {/* Team Section with 3D Planets */}
          <Card className="glass-morphism p-12 mb-12">
            <h2 className="text-4xl font-bold text-accent mb-8 text-center neon-glow">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="w-32 h-32 mx-auto mb-6 relative group-hover:scale-110 transition-transform duration-300">
                    <Planet3DScene
                      type={member.planetType}
                      atmosphere={Math.random() * 100}
                      temperature={Math.random() * 200 - 100}
                      waterLevel={Math.random() * 80}
                      gravity={Math.random() * 150 + 50}
                      hasRings={member.planetType === "gas-giant"}
                      crystalFormations={member.planetType === "crystal" ? 90 : undefined}
                      volcanoActivity={member.planetType === "volcanic" ? 85 : undefined}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                  <p className="text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Contact and Research Sections */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Us Section */}
            <Card className="glass-morphism p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Planet3DScene
                  type="earth-like"
                  atmosphere={78}
                  temperature={15}
                  waterLevel={71}
                  gravity={100}
                  cityLights={true}
                />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-primary mb-6 neon-glow flex items-center gap-3">
                  <Rocket className="h-8 w-8" />
                  Contact Us
                </h2>
                <p className="text-muted-foreground mb-6">
                  Have questions about our technology? Want to collaborate? We'd love to hear from you!
                </p>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                    className="bg-background/50 border-primary/30"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                    className="bg-background/50 border-primary/30"
                  />
                  <Textarea
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                    className="bg-background/50 border-primary/30 min-h-[100px]"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-accent text-black font-bold"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </Card>

            {/* Join Research Section */}
            <Card className="glass-morphism p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Planet3DScene
                  type="crystal"
                  atmosphere={30}
                  temperature={-50}
                  waterLevel={15}
                  gravity={80}
                  crystalFormations={95}
                />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-secondary mb-6 neon-glow flex items-center gap-3">
                  <Star className="h-8 w-8" />
                  Join Our Research
                </h2>
                <p className="text-muted-foreground mb-6">
                  Be part of the future of planetary science! Join our research team and help shape tomorrow.
                </p>
                <form onSubmit={handleResearchSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={researchForm.name}
                    onChange={(e) => setResearchForm({...researchForm, name: e.target.value})}
                    required
                    className="bg-background/50 border-secondary/30"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={researchForm.email}
                    onChange={(e) => setResearchForm({...researchForm, email: e.target.value})}
                    required
                    className="bg-background/50 border-secondary/30"
                  />
                  <Input
                    placeholder="Your Expertise"
                    value={researchForm.expertise}
                    onChange={(e) => setResearchForm({...researchForm, expertise: e.target.value})}
                    required
                    className="bg-background/50 border-secondary/30"
                  />
                  <Textarea
                    placeholder="Your Experience & Why You Want to Join"
                    value={researchForm.experience}
                    onChange={(e) => setResearchForm({...researchForm, experience: e.target.value})}
                    required
                    className="bg-background/50 border-secondary/30 min-h-[100px]"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-secondary to-accent text-black font-bold"
                  >
                    Apply to Join
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="glass-morphism p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-3 gap-4 h-full">
                <Planet3DScene type="volcanic" atmosphere={40} temperature={500} waterLevel={5} gravity={120} volcanoActivity={90} />
                <Planet3DScene type="gas-giant" atmosphere={95} temperature={-180} waterLevel={0} gravity={250} hasRings={true} />
                <Planet3DScene type="crystal" atmosphere={30} temperature={-50} waterLevel={15} gravity={80} crystalFormations={95} />
              </div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-accent mb-6 neon-glow">Ready to Explore the Universe?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Join thousands of creators building incredible worlds with our AI-powered platform.
                The cosmos awaits your imagination!
              </p>
              <Link to="/builder">
                <Button className="bg-gradient-to-r from-primary to-accent text-black font-bold px-12 py-4 text-xl animate-glow-pulse">
                  <Zap className="mr-3 h-6 w-6" />
                  Start Creating Planets
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
