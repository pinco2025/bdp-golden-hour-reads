import React, { useEffect, useState } from 'react';

// Scenic wallpaper images from Unsplash
const wallpapers = {
  morning: {
    name: 'Morning',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80', // pastel morning sky
    alt: 'Soft pastel morning sky with light blues and pinks',
  },
  dusk: {
    name: 'Dusk',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80', // warm dusk
    alt: 'Warm orange and purple dusk sky with golden hues',
  },
  night: {
    name: 'Night',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=80', // night sky with stars
    alt: 'Deep blue and purple night sky with subtle stars',
  },
  forest: {
    name: 'Forest',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80', // lush forest
    alt: 'Lush green forest with dappled sunlight',
  },
};

type WallpaperKey = keyof typeof wallpapers;

function getTimeOfDay(): WallpaperKey {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 18) return 'dusk';
  if (hour >= 18 || hour < 5) return 'night';
  return 'forest';
}

export const WallpaperContext = React.createContext<{
  wallpaper: WallpaperKey;
}>({ wallpaper: 'morning' });

export const WallpaperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallpaper, setWallpaper] = useState<WallpaperKey>(getTimeOfDay());

  // Auto-update wallpaper based on time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setWallpaper(getTimeOfDay());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WallpaperContext.Provider value={{ wallpaper }}>
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          position: 'fixed',
          zIndex: 0,
          top: 0,
          left: 0,
          transition: 'background-image 1s cubic-bezier(0.4,0,0.2,1)',
          backgroundImage: `url(${wallpapers[wallpaper].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
        role="img"
        aria-label={wallpapers[wallpaper].alt}
      />
      {children}
    </WallpaperContext.Provider>
  );
};

export function useWallpaper() {
  const ctx = React.useContext(WallpaperContext);
  return ctx;
}
