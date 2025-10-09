import {GoogleGenAI} from "@google/genai";
import {Router} from "express";

export const router = Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Missing GOOGLE_API_KEY environment variable");
}

// Route to handle chat requests
router.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;
    console.log("Received prompt: ", prompt);
    await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: "You are a pirate captain. Answer like a pirate.",
        }
    }).then(response => {
        console.log("AI response: ", response.text);
        res.send(response.text);
    }).catch(error => {
        console.error("Error from AI: ", error);
        res.status(500).json({error: 'Error generating content'});
    });
})

export default router;
