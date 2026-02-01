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
          ? 'Looks like we cant find the user' 
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
 * Advanced search for GitHub users with multiple criteria
 * @param {string} query - Search query with filters
 * @param {number} page - Page number
 * @param {string} sort - Sort field
 * @param {string} order - Sort order
 * @param {number} perPage - Results per page
 * @returns {Promise<Object>} - Search results
 */
const advancedSearchUsers = async (query, page = 1, sort = 'best-match', order = 'desc', perPage = 30) => {
  try {
    if (!query) {
      return {
        success: false,
        error: 'Search query is required',
        status: 400
      };
    }

    // Build the search URL
    let url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
    
    // Add sort and order if not default
    if (sort !== 'best-match') {
      url += `&sort=${sort}&order=${order}`;
    }
    
    console.log('Searching with URL:', url);
    
    const response = await githubApi.get(url);
    
    // If we have results, fetch additional details for each user
    if (response.data.items && response.data.items.length > 0) {
      const usersWithDetails = await Promise.all(
        response.data.items.map(async (user) => {
          try {
            const userDetails = await githubApi.get(`/users/${user.login}`);
            return {
              ...user,
              ...userDetails.data
            };
          } catch (error) {
            console.warn(`Could not fetch details for user: ${user.login}`);
            return user;
          }
        })
      );
      
      return {
        success: true,
        data: {
          ...response.data,
          items: usersWithDetails
        },
        status: response.status
      };
    }
    
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    console.error('Error searching users:', error);
    
    if (error.response) {
      // Handle rate limiting
      if (error.response.status === 403 && error.response.headers['x-ratelimit-remaining'] === '0') {
        const resetTime = new Date(error.response.headers['x-ratelimit-reset'] * 1000);
        return {
          success: false,
          error: `Rate limit exceeded. Try again after ${resetTime.toLocaleTimeString()}`,
          status: 403
        };
      }
      
      return {
        success: false,
        error: error.response.data?.message || 'An error occurred while searching',
        status: error.response.status
      };
    } else if (error.request) {
      return {
        success: false,
        error: 'No response from server. Please check your connection.',
        status: null
      };
    } else {
      return {
        success: false,
        error: 'Failed to make request',
        status: null
      };
    }
  }
};

/**
 * Search for GitHub users (legacy function)
 * @param {string} query - Search query
 * @returns {Promise<Object>} - Search results
 */
const searchUsers = async (query) => {
  try {
    const response = await githubApi.get(`https://api.github.com/search/users?q=${query}&per_page=10`);
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
  advancedSearchUsers,
  fetchUserRepos
};

export default githubService;
