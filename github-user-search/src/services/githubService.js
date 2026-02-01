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
 * Build GitHub search query from multiple criteria
 * @param {Object} criteria - Search criteria object
 * @returns {string} - Formatted GitHub search query
 */
const buildSearchQuery = (criteria) => {
  const queryParts = [];
  
  // Handle username search
  if (criteria.username && criteria.username.trim()) {
    queryParts.push(`${criteria.username} in:login`);
  }
  
  // Handle location search
  if (criteria.location && criteria.location.trim()) {
    queryParts.push(`location:"${criteria.location}"`);
  }
  
  // Handle minimum repositories (minRepos)
  if (criteria.minRepos && criteria.minRepos.trim()) {
    queryParts.push(`repos:>=${criteria.minRepos}`);
  }
  
  // Handle programming language
  if (criteria.language && criteria.language.trim()) {
    queryParts.push(`language:"${criteria.language}"`);
  }
  
  // Handle minimum followers
  if (criteria.followers && criteria.followers.trim()) {
    queryParts.push(`followers:>=${criteria.followers}`);
  }
  
  // Join all query parts with space
  return queryParts.join(' ');
};

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
 * @param {Object} searchCriteria - Object containing search criteria
 * @param {number} page - Page number
 * @param {string} sort - Sort field
 * @param {string} order - Sort order
 * @param {number} perPage - Results per page
 * @returns {Promise<Object>} - Search results
 */
const advancedSearchUsers = async (searchCriteria, page = 1, sort = 'best-match', order = 'desc', perPage = 30) => {
  try {
    // Build the search query from criteria
    const query = buildSearchQuery(searchCriteria);
    
    if (!query || query.trim() === '') {
      return {
        success: false,
        error: 'Please enter at least one search criteria',
        status: 400
      };
    }

    console.log('Searching with criteria:', searchCriteria);
    console.log('Generated query:', query);
    
    // Build the GitHub API URL with the search query
    let url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
    
    // Add sort and order if not default
    if (sort !== 'best-match') {
      url += `&sort=${sort}&order=${order}`;
    }
    
    console.log('GitHub API URL:', url);
    
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
      
      // Handle specific GitHub API errors
      if (error.response.status === 422) {
        return {
          success: false,
          error: 'Invalid search criteria. Please check your search parameters.',
          status: 422
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
 * Search for GitHub users with simple query
 * @param {string} query - Search query
 * @returns {Promise<Object>} - Search results
 */
const searchUsers = async (query) => {
  try {
    const response = await githubApi.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`);
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
 * Search users by specific criteria (wrapper for backward compatibility)
 * @param {Object} criteria - Search criteria including minRepos, location, etc.
 * @returns {Promise<Object>} - Search results
 */
const searchUsersByCriteria = async (criteria) => {
  // Example criteria object:
  // {
  //   username: 'octocat',
  //   location: 'San Francisco',
  //   minRepos: '10',
  //   language: 'JavaScript',
  //   followers: '100'
  // }
  
  return await advancedSearchUsers(criteria, 1, 'best-match', 'desc', 10);
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

// Example GitHub API search queries:
// https://api.github.com/search/users?q=location:"San Francisco"+repos:>=100
// https://api.github.com/search/users?q=repos:>=50+followers:>=1000
// https://api.github.com/search/users?q=octocat+in:login
// https://api.github.com/search/users?q=language:"JavaScript"+location:"New York"

const githubService = {
  fetchUserData,
  searchUsers,
  advancedSearchUsers,
  searchUsersByCriteria,
  fetchUserRepos,
  buildSearchQuery  // Export for testing or debugging
};

export default githubService;
