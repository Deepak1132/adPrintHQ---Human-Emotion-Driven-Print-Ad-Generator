
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { GalleryIcon } from './icons/GalleryIcon';

interface LandingPageProps {
  onStartCreating: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartCreating }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans p-4">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-1/4 w-96 h-96 bg-brand-accent-blue/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-glow"></div>
      <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-brand-accent-gold/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-glow animation-delay-2000"></div>

      <div className="relative z-10 text-center animate-fade-in-slow">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-white mb-4 tracking-tighter">
          Create Print Ads That Feel Human.
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10">
          Ultra-personal visuals & copy powered by emotion, crafted by AI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartCreating}
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 text-lg font-bold text-black bg-brand-accent-gold rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-brand-accent-gold/40"
          >
            <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
            <SparklesIcon className="w-6 h-6 mr-2 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
            Start Creating Free
          </button>
          <button className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 text-lg font-bold text-white bg-white/10 border-2 border-white/20 rounded-full transition-all duration-300 hover:bg-white/20 backdrop-blur-sm">
            <GalleryIcon className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
            Explore Gallery
          </button>
        </div>
      </div>
    </div>
  );
};
