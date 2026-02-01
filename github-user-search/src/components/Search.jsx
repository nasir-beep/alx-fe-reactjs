import { useState, useEffect } from 'react';
import { Search as SearchIcon, MapPin, BookOpen, Users, Star, Link as LinkIcon } from 'lucide-react';
import githubService from '../services/githubService';

const Search = () => {
  const [searchData, setSearchData] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: '',
    followers: '',
    sort: 'best-match',
    order: 'desc'
  });
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchType, setSearchType] = useState('basic'); // 'basic' or 'advanced'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const buildQuery = () => {
    let query = '';
    
    if (searchData.username) {
      query += `${searchData.username} in:login`;
    }
    
    if (searchData.location) {
      query += ` location:"${searchData.location}"`;
    }
    
    if (searchData.minRepos) {
      query += ` repos:>=${searchData.minRepos}`;
    }
    
    if (searchData.language) {
      query += ` language:"${searchData.language}"`;
    }
    
    if (searchData.followers) {
      query += ` followers:>=${searchData.followers}`;
    }
    
    return query.trim();
  };

  const handleSearch = async (e, newPage = 1) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const query = buildQuery();
      
      if (!query && searchType === 'advanced') {
        setError('Please enter at least one search criteria');
        setLoading(false);
        return;
      }
      
      const result = await githubService.advancedSearchUsers(
        query || searchData.username, 
        newPage,
        searchData.sort,
        searchData.order
      );
      
      if (result.success) {
        if (newPage === 1) {
          setUsers(result.data.items || []);
        } else {
          setUsers(prev => [...prev, ...(result.data.items || [])]);
        }
        setTotalCount(result.data.total_count || 0);
        setHasMore((result.data.items?.length || 0) === 30); // GitHub returns max 30 per page
        setPage(newPage);
      } else {
        setError(result.error || 'An error occurred while searching');
        setUsers([]);
      }
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    handleSearch(null, page + 1);
  };

  const clearSearch = () => {
    setSearchData({
      username: '',
      location: '',
      minRepos: '',
      language: '',
      followers: '',
      sort: 'best-match',
      order: 'desc'
    });
    setUsers([]);
    setError('');
    setPage(1);
    setHasMore(false);
    setTotalCount(0);
  };

  const toggleSearchType = () => {
    setSearchType(prev => prev === 'basic' ? 'advanced' : 'basic');
    clearSearch();
  };

  // Sample popular searches
  const popularSearches = [
    { username: 'torvalds', label: 'Linus Torvalds' },
    { username: 'gaearon', label: 'Dan Abramov' },
    { username: 'mojombo', label: 'Tom Preston-Werner' },
    { location: 'San Francisco', label: 'SF Developers' },
    { minRepos: '100', label: 'Active Developers' },
  ];

  const handlePopularSearch = (search) => {
    setSearchData(prev => ({
      ...prev,
      ...search
    }));
    // Trigger search after a short delay
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSearch(fakeEvent);
    }, 100);
  };

  // Function to render user cards using map
  const renderUserCards = () => {
    if (users.length === 0) return null;
    
    return users.map((user, index) => (
      <div 
        key={`${user.id}-${index}`} 
        className="bg-white rounded-xl shadow-lg p-6 user-card-hover animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex items-start space-x-4">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-16 h-16 rounded-full border-2 border-blue-100"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {user.login}
            </h3>
            {user.name && (
              <p className="text-gray-600">{user.name}</p>
            )}
            
            <div className="mt-4 space-y-2">
              {user.location && (
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  {user.location}
                </div>
              )}
              
              {user.public_repos !== undefined && (
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {user.public_repos.toLocaleString()} repositories
                </div>
              )}
              
              {user.followers !== undefined && (
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  {user.followers.toLocaleString()} followers
                </div>
              )}
              
              {user.following !== undefined && (
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  {user.following.toLocaleString()} following
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-all"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                View Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  // Function to render popular search buttons using map
  const renderPopularSearches = () => {
    return popularSearches.map((search, index) => (
      <button
        key={index}
        onClick={() => handlePopularSearch(search)}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-all hover:scale-105"
      >
        {search.label}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            GitHub User Search
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover developers by username, location, repositories, and more
          </p>
        </header>

        {/* Search Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-1 inline-flex">
            <button
              onClick={() => setSearchType('basic')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                searchType === 'basic'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Basic Search
            </button>
            <button
              onClick={() => setSearchType('advanced')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                searchType === 'advanced'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Advanced Search
            </button>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 animate-fade-in">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Basic Search */}
            {searchType === 'basic' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="username"
                      value={searchData.username}
                      onChange={handleInputChange}
                      placeholder="Enter GitHub username..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Advanced Search */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <SearchIcon className="inline w-4 h-4 mr-2" />
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={searchData.username}
                      onChange={handleInputChange}
                      placeholder="ex: octocat"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={searchData.location}
                      onChange={handleInputChange}
                      placeholder="ex: San Francisco"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <BookOpen className="inline w-4 h-4 mr-2" />
                      Minimum Repositories
                    </label>
                    <input
                      type="number"
                      name="minRepos"
                      value={searchData.minRepos}
                      onChange={handleInputChange}
                      placeholder="ex: 10"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Programming Language
                    </label>
                    <input
                      type="text"
                      name="language"
                      value={searchData.language}
                      onChange={handleInputChange}
                      placeholder="ex: JavaScript"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline w-4 h-4 mr-2" />
                      Minimum Followers
                    </label>
                    <input
                      type="number"
                      name="followers"
                      value={searchData.followers}
                      onChange={handleInputChange}
                      placeholder="ex: 100"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                      </label>
                      <select
                        name="sort"
                        value={searchData.sort}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        <option value="best-match">Best Match</option>
                        <option value="followers">Followers</option>
                        <option value="repositories">Repositories</option>
                        <option value="joined">Joined Date</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order
                      </label>
                      <select
                        name="order"
                        value={searchData.order}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 mr-3"></div>
                    Searching...
                  </span>
                ) : (
                  'Search Users'
                )}
              </button>
              
              <button
                type="button"
                onClick={clearSearch}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Clear
              </button>
              
              {searchType === 'advanced' && (
                <div className="flex-1 min-w-[300px] bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Current Query:</strong> {buildQuery() || 'No filters applied'}
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Try these popular searches:
            </h3>
            <div className="flex flex-wrap gap-2">
              {renderPopularSearches()}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">
                  Looks like we can't find the user
                </h3>
                <p className="mt-2 text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        {(users.length > 0 || loading) && (
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
              </h2>
              {totalCount > 0 && (
                <p className="text-gray-600 mt-1">
                  Found {totalCount.toLocaleString()} user{totalCount !== 1 ? 's' : ''}
                  {searchType === 'advanced' && (
                    <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {buildQuery()}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && page === 1 && (
          <div className="flex justify-center items-center py-20">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          </div>
        )}

        {/* Results Grid - Using map function */}
        {!loading && users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {renderUserCards()}
          </div>
        )}

        {/* No Results */}
        {!loading && users.length === 0 && totalCount === 0 && !error && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <SearchIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or explore popular searches above.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="text-center mb-12">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-white border-2 border-blue-600 text-blue-600 py-3 px-8 rounded-lg font-semibold hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              Load More Users
            </button>
          </div>
        )}

        {/* Loading More State */}
        {loading && page > 1 && (
          <div className="text-center py-8">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8 inline-block mr-3"></div>
            <span className="text-gray-600">Loading more users...</span>
          </div>
        )}

        {/* Footer Stats */}
        {users.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {totalCount.toLocaleString()}
                </div>
                <div className="text-gray-600">Total Users</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {users.length}
                </div>
                <div className="text-gray-600">Displayed</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {page}
                </div>
                <div className="text-gray-600">Current Page</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">
                  {hasMore ? 'Yes' : 'No'}
                </div>
                <div className="text-gray-600">More Results</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
