import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

// Add the token dynamically on every request, not baked in at import time
githubApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return config;
});

// Get the content of a single GitHub file
export const getGithubFileContent = async (owner, repo, path) => {
  const response = await githubApi.get(
    `/repos/${owner}/${repo}/contents/${path}`,
  );

  const content = Buffer.from(response.data.content, "base64").toString(
    "utf-8",
  );

  return content;
};

export const getGithubRepository = async (owner, repo) => {
  const response = await githubApi.get(`/repos/${owner}/${repo}`);
  return response.data;
};

export const getAllGithubFiles = async (owner, repo, branch) => {
  const response = await githubApi.get(
    `/repos/${owner}/${repo}/git/trees/${branch}`,
    { params: { recursive: "true" } },
  );
  return response.data.tree.filter((item) => item.type === "blob");
};
