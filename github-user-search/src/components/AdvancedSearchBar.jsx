import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const AdvancedSearchBar = ({ onSearch, isLoading }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    location: '',
    minRepos: '',
    minFollowers: '',
    language: '',
    sort: 'best-match',
    order: 'desc'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username.trim() || formData.location.trim() || formData.minRepos || formData.minFollowers) {
      onSearch(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      username: '',
      location: '',
      minRepos: '',
      minFollowers: '',
      language: '',
      sort: 'best-match',
      order: 'desc'
    });
  };

  const getPlaceholder = () => {
    if (formData.username) return `Search: ${formData.username}`;
    if (formData.location) return `Location: ${formData.location}`;
    if (formData.minRepos) return `Min repos: ${formData.minRepos}`;
    return 'Search GitHub users...';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-github-dark-muted w-5 h-5" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={getPlaceholder()}
              className="input-field pl-10 w-full"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            {isLoading ? 'Searching...' : 'Search'}
          </button>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn-secondary flex items-center gap-2 whitespace-nowrap"
          >
            <Filter className="w-4 h-4" />
            {showAdvanced ? 'Simple' : 'Advanced'}
          </button>
        </div>

        {/* Advanced Search Panel */}
        {showAdvanced && (
          <div className="card p-6 space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-github-dark-text">Advanced Filters</h3>
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-github-dark-muted mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., San Francisco"
                  className="input-field w-full"
                  disabled={isLoading}
                />
              </div>

              {/* Minimum Repositories */}
              <div>
                <label className="block text-sm font-medium text-github-dark-muted mb-1">
                  Min Repositories
                </label>
                <input
                  type="number"
                  name="minRepos"
                  value={formData.minRepos}
                  onChange={handleChange}
                  placeholder="e.g., 10"
                  min="0"
                  className="input-field w-full"
                  disabled={isLoading}
                />
              </div>

              {/* Minimum Followers */}
              <div>
                <label className="block text-sm font-medium text-github-dark-muted mb-1">
                  Min Followers
                </label>
                <input
                  type="number"
                  name="minFollowers"
                  value={formData.minFollowers}
                  onChange={handleChange}
                  placeholder="e.g., 100"
                  min="0"
                  className="input-field w-full"
                  disabled={isLoading}
                />
              </div>

              {/* Programming Language */}
              <div>
                <label className="block text-sm font-medium text-github-dark-muted mb-1">
                  Programming Language
                </label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="e.g., JavaScript"
                  className="input-field w-full"
                  disabled={isLoading}
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-github-dark-muted mb-1">
                  Sort By
                </label>
                <select
                  name="sort"
                  value={formData.sort}
                  onChange={handleChange}
                  className="input-field w-full"
                  disabled={isLoading}
                >
                  <option value="best-match">Best Match</option>
                  <option value="followers">Followers</option>
                  <option value="repositories">Repositories</option>
                  <option value="joined">Joined Date</option>
                </select>
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-github-dark-muted mb-1">
                  Order
                </label>
                <select
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="input-field w-full"
                  disabled={isLoading}
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            {/* Search Tips */}
            <div className="text-sm text-github-dark-muted pt-2 border-t border-github-dark-border">
              <p className="font-medium mb-1">Search Tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use <code className="bg-black/30 px-1 py-0.5 rounded">location:"San Francisco"</code> for exact location matches</li>
                <li>Combine filters for more precise results</li>
                <li>Leave fields empty to search all users</li>
              </ul>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AdvancedSearchBar;
