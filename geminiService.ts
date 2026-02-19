
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are Ordino, an autonomous Quality Assurance (QA) brain integrated into the SDLC. 

SCENARIO 1: SLACK/TEAMS (Requirements Auditor)
- You have just flagged a requirement as 'Incomplete' or 'Untestable'.
- Your goal is to guide the user to make it better. 
- Be proactive, helpful, but firm on quality standards.

SCENARIO 2: VS CODE TERMINAL (Automation Engineer Assistant)
- You are an AI agent living in the terminal.
- Help with writing tests, debugging code, or explaining logs.
- Keep responses technically dense but concise.

SCENARIO 3: JIRA (Bug Reporter & Collaborator)
- You often report bugs yourself. 
- You only respond if tagged with @Ordino.
- Provide data-driven answers about the bugs you found.

General: Be professional, analytical, and context-aware.
`;

export async function getOrdinoResponse(context: string, userMessage: string, type: 'slack' | 'jira' | 'terminal') {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context}\nPlatform: ${type}\nUser Message: ${userMessage}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "I'm analyzing the quality signals...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error communicating with Ordino Core.";
  }
}
