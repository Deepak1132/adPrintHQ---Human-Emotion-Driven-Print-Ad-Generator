
export type AudienceAge = 'Teens' | '20-35' | '35-50' | '50+';
export type AudienceLocation = 'Metro' | 'Non-Metro' | 'Both';
export type GenerationMode = 2 | 4;
export type AspectRatio = '1:1' | '4:5' | '16:9' | 'A4 Portrait' | 'A3 Landscape';
export type VibeTheme = 
  | 'Empathy / Humanity'
  | 'Love & Togetherness'
  | 'Achievement / Victory'
  | 'Transformation / Redemption'
  | 'Nostalgic / Sentimental'
  | 'Natural / Organic'
  | 'Empowerment / Identity'
  | 'Minimal / Silence Power'
  | 'Humor / Wit'
  | 'Journey / Discovery';

export interface AdSpec {
  productImage: string; // base64
  featuresImage?: string; // base64
  brandName: string;
  audienceAge: AudienceAge;
  audienceLocation: AudienceLocation;
  brandFeatures: string;
  generationMode: GenerationMode;
  aspectRatios: AspectRatio[];
  vibeTheme?: VibeTheme;
}

export interface GeneratedAdIdea {
  headline: string;
  subtext: string;
  imagePrompt: string;
}

export interface GeneratedAd extends GeneratedAdIdea {
  imageUrl: string;
  aspectRatio: AspectRatio;
}
