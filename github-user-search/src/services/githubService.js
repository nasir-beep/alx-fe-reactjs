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
 * Build search query from form data
 * @param {Object} formData - Search form data
 * @returns {string} - GitHub API query string
 */
const buildSearchQuery = (formData) => {
  const queryParts = [];

  if (formData.username) {
    queryParts.push(formData.username);
  }

  if (formData.location) {
    queryParts.push(`location:"${formData.location}"`);
  }

  if (formData.minRepos) {
    queryParts.push(`repos:>=${formData.minRepos}`);
  }

  if (formData.minFollowers) {
    queryParts.push(`followers:>=${formData.minFollowers}`);
  }

  if (formData.language) {
    queryParts.push(`language:"${formData.language}"`);
  }

  return queryParts.join(' ');
};

/**
 * Search GitHub users with advanced filters
 * @param {Object} formData - Search criteria
 * @param {number} page - Page number for pagination
 * @param {number} perPage - Results per page
 * @returns {Promise<Object>} - Search results with pagination info
 */
const searchUsers = async (formData, page = 1, perPage = 10) => {
  try {
    const query = buildSearchQuery(formData);
    
    if (!query.trim()) {
      return {
        success: true,
        data: {
          items: [],
          total_count: 0,
          incomplete_results: false
        },
        pagination: {
          page,
          perPage,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false
        }
      };
    }

    const sortMap = {
      'best-match': '',
      'followers': 'followers',
      'repositories': 'repositories',
      'joined': 'joined'
    };

    const sort = sortMap[formData.sort] || '';
    const order = formData.order || 'desc';

    let url = `/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
    
    if (sort) {
      url += `&sort=${sort}&order=${order}`;
    }

    const response = await githubApi.get(url);

    const totalCount = response.data.total_count;
    const totalPages = Math.ceil(totalCount / perPage);

    return {
      success: true,
      data: response.data,
      pagination: {
        page,
        perPage,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  } catch (error) {
    console.error('Error searching users:', error);
    
    if (error.response) {
      return {
        success: false,
        error: error.response.data?.message || `Error ${error.response.status}`,
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
 * Fetch detailed user data
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} - User data
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
      return {
        success: false,
        error: error.response.status === 404 
          ? 'User not found' 
          : error.response.data?.message || `Error ${error.response.status}`,
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
  searchUsers,
  fetchUserData,
  fetchUserRepos,
  buildSearchQuery
};

export default githubService;
