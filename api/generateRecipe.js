import { GoogleGenAI } from "@google/genai";

// eslint-disable-next-line no-undef
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. If the majority of the given ingrediens are vague or not actually an ingredient, just return a response that you couldn't make a recipe from the given set of ingredients. Format your response in markdown to make it easier to render to a web page
`

export default async function handler(req, res) {
    try {
        const { ingredientsList } = req.body;

        const ingredients = ingredientsList.join(", ");
        const finalPrompt = `${SYSTEM_PROMPT}. User: I have ${ingredients}. Please give me a recipe you'd recommend I make!`

        console.log(finalPrompt);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: finalPrompt
        });

        return res.status(200).json({ recipe: response.text });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message })
    }
}