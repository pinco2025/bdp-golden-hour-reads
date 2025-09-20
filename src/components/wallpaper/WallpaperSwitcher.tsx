import React from 'react';
import { useWallpaper } from './WallpaperProvider';

const WALLPAPER_LABELS: Record<string, string> = {
  morning: 'Morning',
  dusk: 'Dusk',
  night: 'Night',
  forest: 'Forest',
};

export const WallpaperSwitcher: React.FC = () => {
  const { wallpaper, setWallpaper } = useWallpaper();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/70 backdrop-blur-md rounded-full shadow-lg px-4 py-2 border border-gray-200">
      {Object.entries(WALLPAPER_LABELS).map(([key, label]) => (
        <button
          key={key}
          aria-label={`Switch to ${label} wallpaper`}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60 ${
            wallpaper === key
              ? 'bg-primary text-white shadow'
              : 'bg-transparent text-gray-700 hover:bg-primary/10'
          }`}
          onClick={() => setWallpaper(key as any)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
