
import React from 'react';
import type { GeneratedAd } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface AdCardProps {
  ad: GeneratedAd;
}

const aspectRatioClasses: Record<string, string> = {
    '1:1': 'aspect-square',
    '4:5': 'aspect-[4/5]',
    '16:9': 'aspect-video',
    'A4 Portrait': 'aspect-[1/1.414]',
    'A3 Landscape': 'aspect-[1.414/1]',
};

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = ad.imageUrl;
    link.download = `${ad.headline.replace(/\s+/g, '_').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  return (
    <div className="bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group transform transition-transform duration-500 hover:scale-105 animate-fade-in">
        <div className={`relative w-full ${aspectRatioClasses[ad.aspectRatio] || 'aspect-square'} overflow-hidden`}>
            <img src={ad.imageUrl} alt={ad.headline} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">{ad.headline}</h3>
                <p className="mt-2 text-base text-neutral-200 drop-shadow-md">{ad.subtext}</p>
            </div>
            <button
                onClick={handleDownload}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-brand-accent-gold hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                title="Download Ad"
            >
                <DownloadIcon className="w-5 h-5" />
            </button>
        </div>
    </div>
  );
};
