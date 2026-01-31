import axios from 'axios';

// Create axios instance with custom configuration
const githubApi = axios.create({
  baseURL: import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Add GitHub token if available
const githubToken = import.meta.env.VITE_APP_GITHUB_API_KEY;
if (githubToken) {
  githubApi.defaults.headers.common['Authorization'] = `token ${githubToken}`;
}

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} - User data object
 */
const fetchUserData = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.status === 404 
          ? 'User not found' 
          : error.response.data?.message || 'An error occurred',
        status: error.response.status
      };
    } else if (error.request) {
      // Request made but no response
      return {
        success: false,
        error: 'No response from server. Please check your connection.',
        status: null
      };
    } else {
      // Error in setting up request
      return {
        success: false,
        error: 'Failed to make request',
        status: null
      };
    }
  }
};

/**
 * Search for GitHub users
 * @param {string} query - Search query
 * @returns {Promise<Object>} - Search results
 */
const searchUsers = async (query) => {
  try {
    const response = await githubApi.get(`/search/users?q=${query}&per_page=10`);
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    console.error('Error searching users:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'An error occurred while searching',
      status: error.response?.status
    };
  }
};

/**
 * Fetch user repositories
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} - User repositories
 */
const fetchUserRepos = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}/repos?sort=updated&per_page=5`);
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    console.error('Error fetching user repos:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'An error occurred while fetching repositories',
      status: error.response?.status
    };
  }
};

const githubService = {
  fetchUserData,
  searchUsers,
  fetchUserRepos
};

export default githubService;
