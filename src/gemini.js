import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function run(prompt) {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3-flash-preview",
      input: prompt,
      system_instruction:
        "You are AURA AI, a friendly, intelligent virtual assistant built by Kanika Khurana. Help users with coding, learning, productivity, and general questions. Explain things in simple language in 2-3 lines.",
      generation_config: {
        temperature: 1,
        max_output_tokens: 2048,
      },
    });

    return (
      interaction.output_text ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("AURA AI error:", error);
    throw new Error(
      "Unable to get an AI response. Please try again."
    );
  }
}
