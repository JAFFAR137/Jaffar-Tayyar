
import { GoogleGenAI } from "@google/genai";
import { ProjectState } from "../types";

// Fix: Use process.env.API_KEY directly for initialization as per @google/genai guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProjectAudit = async (state: ProjectState) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Audit this project based on PMBOK 8.0 focus areas 3.1 and 5.2.
      Project: ${state.projectName}
      Owner: ${state.owner}
      Milestones: ${JSON.stringify(state.milestones)}
      Stakeholders: ${JSON.stringify(state.stakeholders)}
      
      Identify if schedule delays correlate with stakeholder engagement levels. 
      Provide 3 actionable bullet points for Jaffar Tayyar.`,
      config: {
        systemInstruction: "You are a world-class PMO Auditor specializing in PMBOK 8th Edition. Be professional, concise, and focused on the 'Check and Balance' between schedule (3.1) and stakeholders (5.2).",
      }
    });

    // Fix: Correctly access the .text property of GenerateContentResponse (not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini Audit Error:", error);
    return "Audit currently unavailable. Ensure API key is configured.";
  }
};
