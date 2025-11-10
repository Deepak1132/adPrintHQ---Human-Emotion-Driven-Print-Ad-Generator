
import React from 'react';
import { UserIcon } from './icons/UserIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface HeaderProps {
    onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
    return (
        <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <SparklesIcon className="w-6 h-6 text-brand-accent-gold" />
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tighter">adPrintHQ</h1>
                </div>
                <div className="hidden sm:block text-center">
                    <p className="text-sm text-neutral-400 italic">Emotion in Every Pixel. Connection in Every Word.</p>
                </div>
                <button 
                    onClick={onLoginClick}
                    className="flex items-center space-x-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm"
                >
                    <UserIcon className="w-5 h-5 text-neutral-300" />
                    <span className="text-sm font-medium text-white">Login</span>
                </button>
            </div>
        </header>
    );
};
