import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env';

let ai: GoogleGenAI | null = null;
if (env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
}

export class GeminiService {
  /**
   * Analyze complaint details to detect complex issues
   */
  static async analyzeComplaint(description: string): Promise<string> {
    if (!ai) return 'Gemini API not configured.';
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze this citizen complaint: "${description}". Provide a brief analysis of the core issue.`,
      });
      return response.text || 'Analysis failed.';
    } catch (error) {
      console.error('Gemini analyze error:', error);
      return 'Error analyzing complaint.';
    }
  }

  /**
   * Classify complaint into a predefined category
   */
  static async classifyComplaint(description: string): Promise<string> {
    if (!ai) return 'Others';
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Classify the following complaint into one of these categories: Water Supply, Garbage, Road Damage, Street Lights, Drainage, Air Pollution, Flood, Others. Complaint: "${description}". Return ONLY the category name.`,
      });
      return response.text?.trim() || 'Others';
    } catch (error) {
      console.error('Gemini classify error:', error);
      return 'Others';
    }
  }

  /**
   * Summarize a long complaint description
   */
  static async summarizeComplaint(description: string): Promise<string> {
    if (!ai) return description.substring(0, 100);
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Provide a concise 1-sentence summary of this complaint: "${description}"`,
      });
      return response.text || description.substring(0, 100);
    } catch (error) {
      console.error('Gemini summarize error:', error);
      return description.substring(0, 100);
    }
  }

  /**
   * Generate priority score based on severity and details (1-10)
   */
  static async generatePriority(description: string, severity: string): Promise<number> {
    if (!ai) return severity === 'High' ? 8 : severity === 'Medium' ? 5 : 2;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Assign a priority score from 1 to 10 for this complaint based on urgency. Complaint: "${description}". Severity level provided by user: "${severity}". Return ONLY the integer number.`,
      });
      const score = parseInt(response.text?.trim() || '5', 10);
      return isNaN(score) ? 5 : score;
    } catch (error) {
      console.error('Gemini generatePriority error:', error);
      return 5;
    }
  }
}
