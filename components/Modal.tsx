
import React, { useEffect } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl w-full max-w-md m-4 p-8 text-center transform transition-all duration-300 scale-95 opacity-0 animate-fade-in"
        style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-brand-accent-gold/20 border border-brand-accent-gold/50 rounded-full">
            <SparklesIcon className="w-6 h-6 text-brand-accent-gold" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <div className="text-neutral-400">{children}</div>
      </div>
    </div>
  );
};
