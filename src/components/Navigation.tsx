
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Zap } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/builder", label: "Planet Builder" },
    { path: "/gallery", label: "Gallery" },
    { path: "/about", label: "About" },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Star className="h-8 w-8 text-primary animate-spin-slow" />
              <Zap className="h-4 w-4 text-accent absolute top-1 left-1 animate-pulse" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              AI Planet Builder
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-primary/20 text-primary neon-glow"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link to="/builder">
            <Button className="bg-gradient-to-r from-primary to-accent text-black font-semibold px-6 py-2 rounded-lg animate-pulse-glow">
              Start Building
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
