
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { CreationStudio } from './components/CreationStudio';
import { AdCard } from './components/AdCard';
import { LoadingAnimation } from './components/LoadingAnimation';
import { Modal } from './components/Modal';
import { generateAdIdeas, generateAdImage } from './services/geminiService';
import type { AdSpec, GeneratedAd } from './types';

type AppState = 'landing' | 'creating' | 'loading' | 'results';

const MAX_FREE_CREATIONS = 5;

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [generatedAds, setGeneratedAds] = useState<GeneratedAd[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [creationCount, setCreationCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('creationCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('creationCount', creationCount.toString());
  }, [creationCount]);

  const handleStartCreating = () => {
    if (creationCount >= MAX_FREE_CREATIONS) {
      setIsLoginModalOpen(true);
    } else {
      setAppState('creating');
    }
  };

  const handleSubmitAdSpec = useCallback(async (spec: AdSpec) => {
    if (creationCount >= MAX_FREE_CREATIONS) {
      setIsLoginModalOpen(true);
      return;
    }

    setAppState('loading');
    setError(null);
    setGeneratedAds([]);

    try {
      const adIdeas = await generateAdIdeas(spec);
      
      const finalAds: GeneratedAd[] = [];

      // Generate one ad for each aspect ratio for each idea
      await Promise.all(adIdeas.map(async (idea) => {
        await Promise.all(spec.aspectRatios.map(async (ratio) => {
          const imagePromptWithRatio = `${idea.imagePrompt}, aspect ratio ${ratio}`;
          const imageData = await generateAdImage(imagePromptWithRatio);
          finalAds.push({
            ...idea,
            imageUrl: `data:image/png;base64,${imageData}`,
            aspectRatio: ratio,
          });
        }));
      }));
      
      setGeneratedAds(finalAds);
      setAppState('results');
      setCreationCount(prev => prev + 1);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAppState('creating');
    }
  }, [creationCount]);

  const renderContent = () => {
    switch (appState) {
      case 'landing':
        return <LandingPage onStartCreating={handleStartCreating} />;
      case 'creating':
        return <CreationStudio onSubmit={handleSubmitAdSpec} isLoading={false} />;
      case 'loading':
        return (
          <>
            <CreationStudio onSubmit={handleSubmitAdSpec} isLoading={true} />
            <LoadingAnimation />
          </>
        );
      case 'results':
        return (
          <div className="container mx-auto px-4 py-28">
            <h2 className="text-4xl font-bold text-center mb-4">Your Cinematic Ads</h2>
            <p className="text-neutral-400 text-center mb-12">Here are the creations from your vision. Click an ad to download.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {generatedAds.map((ad, index) => (
                <AdCard key={index} ad={ad} />
              ))}
            </div>
            <div className="text-center mt-12">
              <button 
                onClick={() => setAppState('creating')}
                className="px-8 py-3 text-lg font-bold text-black bg-brand-accent-gold rounded-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-brand-accent-gold/40"
              >
                Create More
              </button>
            </div>
          </div>
        );
      default:
        return <LandingPage onStartCreating={handleStartCreating} />;
    }
  };
  
  const creationsLeft = MAX_FREE_CREATIONS - creationCount;

  return (
    <div className="bg-brand-dark min-h-screen font-sans">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />
      {appState !== 'landing' && (
        <div className="fixed bottom-4 right-4 bg-black/50 border border-neutral-700 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm z-20">
          {creationsLeft > 0 ? `${creationsLeft} free creation${creationsLeft > 1 ? 's' : ''} left` : 'No free creations left'}
        </div>
      )}
      <main>
        {renderContent()}
      </main>
      {error && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Error: {error}
        </div>
      )}
      <Modal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        title="Join adPrintHQ"
      >
        <p className="mb-6">You've used all your free creations. Please sign up to continue creating unlimited ads.</p>
        <div className="flex flex-col space-y-3">
          <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition">Continue with Google</button>
          <button className="w-full bg-neutral-200 text-black font-semibold py-2.5 rounded-lg hover:bg-neutral-300 transition">Continue with Apple</button>
          <button className="w-full bg-neutral-700 text-white font-semibold py-2.5 rounded-lg hover:bg-neutral-600 transition">Sign up with Email</button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
