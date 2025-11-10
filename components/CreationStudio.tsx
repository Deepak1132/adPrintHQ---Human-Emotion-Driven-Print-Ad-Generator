
import React, { useState, useCallback } from 'react';
import type { AdSpec, GenerationMode, AudienceAge, AudienceLocation, AspectRatio, VibeTheme } from '../types';
import { AUDIENCE_AGES, AUDIENCE_LOCATIONS, ASPECT_RATIOS, VIBE_THEMES } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';
import { UploadIcon } from './icons/UploadIcon';

interface CreationStudioProps {
  onSubmit: (spec: AdSpec) => void;
  isLoading: boolean;
}

const FileInput: React.FC<{ label: string; onFileSelect: (base64: string) => void; required: boolean; filePreview: string | null; }> = ({ label, onFileSelect, required, filePreview }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileSelect( (e.target?.result as string).split(',')[1] );
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => { e.preventDefault(); setIsDragging(false); };
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => { e.preventDefault(); };
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-300 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
      <label
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`relative flex justify-center items-center w-full h-40 px-4 transition-colors duration-300 border-2 border-dashed rounded-lg cursor-pointer ${isDragging ? 'border-brand-accent-gold bg-brand-accent-gold/10' : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'}`}
      >
        {filePreview ? (
            <img src={`data:image/jpeg;base64,${filePreview}`} className="max-h-full max-w-full object-contain rounded-md" alt="Preview"/>
        ) : (
          <div className="text-center text-neutral-500">
            <UploadIcon className="mx-auto h-8 w-8" />
            <p className="mt-2 text-sm">Drag & drop or <span className="font-semibold text-brand-accent-gold">browse</span></p>
          </div>
        )}
        <input type="file" className="hidden" onChange={(e) => handleFile(e.target.files ? e.target.files[0] : null)} accept="image/png, image/jpeg" />
      </label>
    </div>
  );
};

export const CreationStudio: React.FC<CreationStudioProps> = ({ onSubmit, isLoading }) => {
    const [productImage, setProductImage] = useState<string | null>(null);
    const [featuresImage, setFeaturesImage] = useState<string | null>(null);
    const [brandName, setBrandName] = useState('');
    const [audienceAge, setAudienceAge] = useState<AudienceAge>('20-35');
    const [audienceLocation, setAudienceLocation] = useState<AudienceLocation>('Both');
    const [brandFeatures, setBrandFeatures] = useState('');
    const [generationMode, setGenerationMode] = useState<GenerationMode>(2);
    const [aspectRatios, setAspectRatios] = useState<AspectRatio[]>(['1:1']);
    const [vibeTheme, setVibeTheme] = useState<VibeTheme | undefined>(undefined);

    const toggleAspectRatio = (ratio: AspectRatio) => {
        setAspectRatios(prev => 
            prev.includes(ratio) ? prev.filter(r => r !== ratio) : [...prev, ratio]
        );
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!productImage || !brandName || !brandFeatures || aspectRatios.length === 0) {
            alert('Please fill all required fields.');
            return;
        }
        onSubmit({
            productImage,
            featuresImage: featuresImage || undefined,
            brandName,
            audienceAge,
            audienceLocation,
            brandFeatures,
            generationMode,
            aspectRatios,
            vibeTheme,
        });
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex justify-center items-start p-4 pt-24 sm:p-6 sm:pt-28">
            <div className="w-full max-w-4xl mx-auto">
                <form onSubmit={handleFormSubmit} className="space-y-12 animate-fade-in">
                    
                    {/* Step 1: Uploads */}
                    <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-xl">
                        <h2 className="text-2xl font-bold text-white mb-1">Upload Your Assets</h2>
                        <p className="text-neutral-400 mb-6">Provide the visual context for your brand.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FileInput label="Product Image" onFileSelect={setProductImage} required={true} filePreview={productImage} />
                            <FileInput label="Product Features Image (Optional)" onFileSelect={setFeaturesImage} required={false} filePreview={featuresImage} />
                        </div>
                    </div>

                    {/* Step 2: Inputs */}
                    <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-xl">
                         <h2 className="text-2xl font-bold text-white mb-1">Define Your Brand</h2>
                        <p className="text-neutral-400 mb-6">Help the AI understand your voice and audience.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="brandName" className="block text-sm font-medium text-neutral-300 mb-2">Brand Name <span className="text-red-500">*</span></label>
                                <input id="brandName" value={brandName} onChange={(e) => setBrandName(e.target.value)} required className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-accent-gold focus:border-brand-accent-gold transition" />
                            </div>
                            <div>
                                <label htmlFor="audienceAge" className="block text-sm font-medium text-neutral-300 mb-2">Audience Age Group</label>
                                <select id="audienceAge" value={audienceAge} onChange={(e) => setAudienceAge(e.target.value as AudienceAge)} className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-accent-gold focus:border-brand-accent-gold transition">
                                    {AUDIENCE_AGES.map(age => <option key={age} value={age}>{age}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-neutral-300 mb-2">Audience Location</label>
                                <div className="flex space-x-4">
                                    {AUDIENCE_LOCATIONS.map(loc => (
                                        <label key={loc} className="flex items-center space-x-2 text-neutral-300 cursor-pointer">
                                            <input type="radio" name="location" value={loc} checked={audienceLocation === loc} onChange={() => setAudienceLocation(loc)} className="form-radio bg-neutral-700 border-neutral-600 text-brand-accent-gold focus:ring-brand-accent-gold"/>
                                            <span>{loc}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="brandFeatures" className="block text-sm font-medium text-neutral-300 mb-2">Brand Features / Core Values <span className="text-red-500">*</span></label>
                                <textarea id="brandFeatures" value={brandFeatures} onChange={(e) => setBrandFeatures(e.target.value)} required rows={4} className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-accent-gold focus:border-brand-accent-gold transition" placeholder="e.g., Sustainable materials, handcrafted with love, empowers creativity..."></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Style */}
                    <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-xl">
                        <h2 className="text-2xl font-bold text-white mb-1">Select Your Style</h2>
                        <p className="text-neutral-400 mb-6">Choose the format and emotional direction.</p>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">Ad Generation Mode</label>
                                <div className="flex space-x-4">
                                    <button type="button" onClick={() => setGenerationMode(2)} className={`px-4 py-2 rounded-md transition ${generationMode === 2 ? 'bg-brand-accent-gold text-black font-semibold' : 'bg-neutral-800 text-white'}`}>Generate 2 Images</button>
                                    <button type="button" onClick={() => setGenerationMode(4)} className={`px-4 py-2 rounded-md transition ${generationMode === 4 ? 'bg-brand-accent-gold text-black font-semibold' : 'bg-neutral-800 text-white'}`}>Generate 4 Images</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">Aspect Ratios <span className="text-red-500">*</span></label>
                                <div className="flex flex-wrap gap-2">
                                    {ASPECT_RATIOS.map(ratio => (
                                        <button key={ratio} type="button" onClick={() => toggleAspectRatio(ratio)} className={`px-3 py-1.5 text-sm rounded-full transition ${aspectRatios.includes(ratio) ? 'bg-brand-accent-blue text-white font-medium' : 'bg-neutral-800 border border-neutral-700 text-neutral-300'}`}>
                                            {ratio}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="vibeTheme" className="block text-sm font-medium text-neutral-300 mb-2">Vibe / Theme (Optional)</label>
                                <select id="vibeTheme" value={vibeTheme || ''} onChange={(e) => setVibeTheme(e.target.value as VibeTheme || undefined)} className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-accent-gold focus:border-brand-accent-gold transition">
                                    <option value="">Let AI choose randomly</option>
                                    {VIBE_THEMES.map(theme => <option key={theme} value={theme}>{theme}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Generate */}
                    <div className="flex justify-center pt-4">
                        <button type="submit" disabled={isLoading} className="group relative inline-flex items-center justify-center w-full max-w-xs px-8 py-4 text-lg font-bold text-black bg-brand-accent-gold rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-brand-accent-gold/40 disabled:bg-neutral-600 disabled:cursor-not-allowed disabled:shadow-none">
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
                                    <SparklesIcon className="w-6 h-6 mr-2 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                                    Generate Ads
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
