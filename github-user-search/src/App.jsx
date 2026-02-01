import { useState } from 'react';
import AdvancedSearchBar from './components/AdvancedSearchBar';
import UserResults from './components/UserResults';
import githubService from './services/githubService';
import { Github, Sparkles } from 'lucide-react';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalPages: 0,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  const handleSearch = async (formData, page = 1) => {
    if (!formData.username && !formData.location && !formData.minRepos && !formData.minFollowers) {
      setSearchResults([]);
      setError('');
      setPagination(prev => ({ ...prev, totalCount: 0, totalPages: 0 }));
      return;
    }

    setIsLoading(true);
    setError('');
    setSearchQuery(formData);

    try {
      const result = await githubService.searchUsers(formData, page, pagination.perPage);
      
      if (result.success) {
        setSearchResults(result.data.items || []);
        setPagination(result.pagination);
      } else {
        setSearchResults([]);
        setError(result.error || 'An error occurred while searching.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setError('Failed to search users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (searchQuery) {
      handleSearch(searchQuery, page);
    }
  };

  const recentSearches = [
    { label: 'JavaScript Developers', query: { language: 'JavaScript', minRepos: '10' } },
    { label: 'San Francisco', query: { location: 'San Francisco' } },
    { label: 'Popular Users', query: { minFollowers: '1000', sort: 'followers' } },
  ];

  return (
    <div className="min-h-screen bg-github-dark">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="w-12 h-12 text-github-dark-text" />
            <div className="text-left">
              <h1 className="text-4xl font-bold text-github-dark-text">
                GitHub User Search
              </h1>
              <p className="text-github-dark-muted text-lg">
                Advanced search with filters and pagination
              </p>
            </div>
          </div>
          <p className="text-github-dark-muted max-w-2xl mx-auto">
            Search through millions of GitHub users with advanced filters including location, 
            repositories count, followers, and programming languages.
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-10">
          <AdvancedSearchBar 
            onSearch={handleSearch} 
            isLoading={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
            <p className="text-red-400 font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Recent Searches */}
        {searchResults.length === 0 && !isLoading && !error && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-github-blue" />
              <h3 className="text-lg font-semibold text-github-dark-text">Try these searches:</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search.query)}
                  className="px-4 py-2 bg-github-dark-surface border border-github-dark-border rounded-md 
                           text-github-dark-text hover:border-github-blue transition-colors duration-200
                           text-sm"
                >
                  {search.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="mb-8">
          <UserResults
            users={searchResults}
            pagination={pagination}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-github-dark-border text-center">
          <div className="text-github-dark-muted text-sm">
            <p className="mb-2">
              Using GitHub API v3 • 
              {import.meta.env.VITE_APP_GITHUB_API_KEY 
                ? ' Authenticated (5000 requests/hour)' 
                : ' Unauthenticated (10 requests/minute)'}
            </p>
            <p>
              Built with React, Tailwind CSS, and GitHub API • 
              <a 
                href="https://docs.github.com/en/rest/search/search" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-github-blue hover:underline ml-1"
              >
                API Documentation
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
