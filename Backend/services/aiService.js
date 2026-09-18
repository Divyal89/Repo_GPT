import axios from "axios";

export const generateEmbedding = async (text) => {
  const response = await axios.post("http://localhost:8000/embed", {
    text: text,
  });

  return response.data;
};

export const generateBatchEmbeddings = async (texts) => {
  const response = await axios.post("http://localhost:8000/embed-batch", {
    texts: texts,
  });

  return response.data;
};
