
import { GoogleGenAI } from "@google/genai";
import { GenerationParams } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generatePrompts(params: GenerationParams): Promise<string> {
  const model = 'gemini-2.5-flash';
  
  const promptParts: (string | { inlineData: { mimeType: string; data: string } })[] = [];

  let textPrompt = `You are a creative assistant for generating video prompts. Based on the following script and style guidelines, generate a series of descriptive prompts for an AI image/video generator.

**Task:**
Generate ${params.scenes} distinct prompts. Each prompt should be detailed, descriptive, and suitable for an AI video generator. The prompts should follow the provided script's narrative and incorporate all the specified style elements. Output should be a numbered list of prompts.

**Script/Content:**
${params.script || "A short story about a futuristic city at night."}

**Topic/Niche:**
${params.niche || "Not specified."}

**Visual Style:**
- Aspect Ratio: ${params.aspectRatio}
- Keywords: ${params.styleKeywords}
`;

  if (params.styleImage) {
    textPrompt += "- A reference image is provided for style inspiration.\n";
    promptParts.push(textPrompt);
    promptParts.push({
      inlineData: {
        mimeType: params.styleImage.mimeType,
        data: params.styleImage.base64,
      },
    });
  } else {
    promptParts.push(textPrompt);
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: promptParts },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error generating content: ${error.message}`;
    }
    return "An unknown error occurred while contacting the Gemini API.";
  }
}
