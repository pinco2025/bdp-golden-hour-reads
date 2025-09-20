import React from 'react';
import { WallpaperProvider } from '../components/wallpaper/WallpaperProvider';
// import { WallpaperSwitcher } from '../components/wallpaper/WallpaperSwitcher';
import Header from '../components/Header';

// ...existing code...

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <WallpaperProvider>
  {/* WallpaperSwitcher removed: cycling is now automatic */}
    <Header />
    <div className="relative min-h-screen flex flex-col bg-transparent pt-16 md:pt-20">
      {children}
    </div>
  </WallpaperProvider>
);

export default Layout;
