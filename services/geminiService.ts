
import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { AdSpec, GeneratedAdIdea } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const adIdeaSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      headline: {
        type: Type.STRING,
        description: 'An emotionally powerful, human-centric headline for the print ad. It should be concise and psychologically resonant.',
      },
      subtext: {
        type: Type.STRING,
        description: 'Subtle, persuasive copy that connects with the target audience on a behavioral level. It should feel authentic and ultra-personal.',
      },
      imagePrompt: {
        type: Type.STRING,
        description: 'A detailed, cinematic, and emotionally rich prompt for an image generation model. Describe a scene with human elements, color psychology, and a mood that matches the theme. The visual should feel ultra-real and high-end.',
      },
    },
    required: ["headline", "subtext", "imagePrompt"],
  },
};

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
};

export const generateAdIdeas = async (spec: AdSpec): Promise<GeneratedAdIdea[]> => {
  const model = "gemini-2.5-pro";
  
  const randomTheme = spec.vibeTheme ?? spec.vibeTheme;

  const prompt = `
    You are the world's best storyteller, copywriter, and art director rolled into one. Your task is to create concepts for high-conversion print ads that feel deeply human and emotionally intelligent.

    **Brand & Product Information:**
    - Brand Name: ${spec.brandName}
    - Target Audience Age: ${spec.audienceAge}
    - Target Audience Location: ${spec.audienceLocation}
    - Core Brand Features/Values: ${spec.brandFeatures}

    **Creative Mandate:**
    - **Theme/Vibe:** ${randomTheme}
    - **Goal:** Generate ${spec.generationMode} unique ad concepts. For each concept, provide a headline, subtext, and a detailed image prompt.
    - **Tone:** Cinematic, empathetic, ultra-human, soulful, and modern. Avoid robotic or generic marketing language. Focus on storytelling and emotional connection.
    - **Output:** The response must be a JSON array of objects, strictly following the provided schema.

    Here is the product image and an optional features image for context.
  `;
  
  const imageParts = [fileToGenerativePart(spec.productImage, 'image/jpeg')];
  if(spec.featuresImage) {
    imageParts.push(fileToGenerativePart(spec.featuresImage, 'image/jpeg'));
  }

  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [
        ...imageParts,
        { text: prompt },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: adIdeaSchema,
    }
  });

  const text = response.text.trim();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON:", text);
    throw new Error("The AI failed to generate valid ad concepts. Please try again.");
  }
};


export const generateAdImage = async (prompt: string): Promise<string> => {
    const model = 'gemini-2.5-flash-image';
    const response = await ai.models.generateContent({
        model,
        contents: {
            parts: [{ text: prompt }]
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }

    throw new Error("Image generation failed. No image data received.");
};
