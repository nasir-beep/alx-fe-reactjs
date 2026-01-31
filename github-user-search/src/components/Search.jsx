import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, isLoading, error }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    // Clear error when user starts typing
    if (error) {
      onSearch(''); // This will trigger error clearing in parent
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter GitHub username..."
            className="search-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {error && (
          <div className="error-message">
            <p>Looks like we can't find the user "{query}"</p>
            <small>Please check the username and try again</small>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
