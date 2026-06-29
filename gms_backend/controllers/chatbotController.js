import openai from "../services/openaiService.js";

export const askAI = async (req, res) => {

    try{
        const {message} = req.body;

        // ✅ FIXED: Using correct model name
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Changed from "gpt-4.1-mini" to valid model
            messages: [
                {
                    role: "system",
                    content: `
                    You are an AI Gym Assistant.

                    Answer only gym related questions.

                    You can answer:
                    - Workout plans
                    - Nutrition
                    - Calories
                    - BMI
                    - Exercises
                    - Membership
                    - Gym timings
                    - Personal trainers

                    If user asks unrelated question reply:
                    "Sorry. I answer only Smart Gym questions."
                    `
                },
                {
                    role:"user",
                    content:message
                }
            ]
        });

        res.json({
            success:true,
            reply:completion.choices[0].message.content
        });

    }
    catch(error){
        console.log("OpenAI Error:", error);
        res.status(500).json({
            success:false,
            message:"AI Error",
            error: error.message // Added for better debugging
        });
    }
}