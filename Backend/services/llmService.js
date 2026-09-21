import ollama from "ollama";

// Send a prompt to our local Ollama model
export const generateAnswer = async (prompt) => {
  try {
    const response = await ollama.chat({
      model: "qwen2.5-coder:7b",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Ollama returns the generated answer
    return response.message.content;
  } catch (error) {
    console.error("LLM error:", error.message);
    throw error;
  }
};
