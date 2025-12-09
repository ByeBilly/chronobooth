import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes an image using Gemini 3 Pro Preview to understand facial features and context.
 */
export const analyzeImage = async (base64Image: string): Promise<string> => {
  try {
    // Clean base64 string if it has the prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: "Analyze this image. Describe the person's physical appearance, facial features, hair, and expression in detail. This will be used to preserve their identity in a generated image."
          }
        ]
      }
    });

    return response.text || "Analysis failed to produce text.";
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};

/**
 * edits the image to transport the user to a different era using Gemini 2.5 Flash Image.
 */
export const generateTimeTravelPhoto = async (
  base64Image: string, 
  eraPrompt: string, 
  customInstruction: string,
  analysisContext?: string
): Promise<string> => {
  try {
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    // Construct a robust prompt
    let prompt = `Edit this image to make it look like a photograph from the following setting: ${eraPrompt}. `;
    
    if (customInstruction) {
      prompt += `Additional instructions: ${customInstruction}. `;
    }

    prompt += `Keep the person's face and identity recognizable but adapt their clothing and the background to match the era perfectly. High quality, photorealistic, cinematic lighting.`;

    if (analysisContext) {
      prompt += ` \n\nReference person details: ${analysisContext}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // "Nano Banana" for image editing
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    // Check for inline data (image) output
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image generated.");
  } catch (error) {
    console.error("Error generating time travel photo:", error);
    throw error;
  }
};
