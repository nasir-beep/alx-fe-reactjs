import axios from "axios";

const githubApi = axios.create({
  baseURL: import.meta.env.VITE_APP_GITHUB_API_URL,
  headers: {
    Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
  },
});

export default githubApi;
