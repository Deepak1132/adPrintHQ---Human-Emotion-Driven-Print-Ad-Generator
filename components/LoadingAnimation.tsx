
import React from 'react';

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-brand-dark bg-opacity-90 backdrop-blur-lg flex flex-col items-center justify-center z-50 animate-fade-in">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 bg-brand-accent-gold/50 rounded-full animate-pulse-slow"></div>
        <div className="w-16 h-16 bg-brand-accent-gold rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-brand-dark animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
      <p className="mt-8 text-lg text-neutral-300 italic">
        "Designs that speak to the soul take time."
      </p>
    </div>
  );
};
