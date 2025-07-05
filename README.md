# AI Planet Builder 🌌✨

Learn more about the planets in our solar system and build your own AI-powered planet builder! 🚀

## Tech Stack

**Core Framework**  
⚡️ [Vite](https://vitejs.dev/) - Blazing fast frontend tooling  
🦕 [TypeScript](https://www.typescriptlang.org/) - Type-safe development  
⚛️ [React](https://react.dev/) - Interactive UI components  

**UI & Styling**  
🎨 [shadcn-ui](https://ui.shadcn.com/) - Beautifully designed components  
🌪️ [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework  

## Key Features

### Real-Time Planet Generation

```tsx
// Example component using your stack
import { PlanetCanvas } from '@/components/planet-canvas';
import { usePlanetGenerator } from '@/hooks/use-planet-gen';

export function PlanetBuilder() {
  const { planet, generateNew } = usePlanetGenerator();
  
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <PlanetCanvas terrain={planet.terrain} />
      <button 
        onClick={generateNew}
        className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg"
      >
        Generate New World
      </button>
    </div>
  );
}
