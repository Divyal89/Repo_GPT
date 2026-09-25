// import axios from "axios";

// // Send a prompt to our local Ollama model
// export const generateAnswer = async (prompt) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:11434/api/generate",
//       {
//         model: "qwen2.5-coder:7b",
//         prompt: prompt,
//         stream: false,
//       }
//     );

//     // Ollama returns the generated text
//     return response.data.response;
//   } catch (error) {
//     console.error(
//       "LLM error:",
//       error.response?.data || error.message
//     );

//     throw error;
//   }
// };

import axios from "axios";

// Send a prompt to our local Ollama model
export const generateAnswer = async (prompt) => {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "qwen2.5-coder:7b",
      prompt: prompt,
      stream: false,
    });

    // Ollama returns the generated text
    return response.data.response;
  } catch (error) {
    console.error("LLM error:", error.response?.data || error.message);

    throw error;
  }
};
