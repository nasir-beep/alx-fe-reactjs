import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import githubService from './services/githubService';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastSearched, setLastSearched] = useState('');

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setUserData(null);
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');
    setLastSearched(query);

    try {
      const result = await githubService.fetchUserData(query);
      
      if (result.success) {
        setUserData(result.data);
      } else {
        setUserData(null);
        if (result.status === 404) {
          setError(`User "${query}" not found`);
        } else {
          setError(result.error || 'An error occurred. Please try again.');
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setUserData(null);
      setError('Failed to fetch user data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearError = () => {
    setError('');
    setUserData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <p className="subtitle">Find and explore GitHub profiles</p>
        
        <SearchBar 
          onSearch={handleSearch} 
          isLoading={isLoading}
          error={error}
        />
        
        <div className="search-results">
          <UserProfile 
            user={userData}
            isLoading={isLoading}
            error={error}
          />
        </div>

        <div className="api-info">
          <p>Using GitHub API v3</p>
          <small>
            {import.meta.env.VITE_APP_GITHUB_API_KEY 
              ? 'Authenticated (Higher rate limit)' 
              : 'Unauthenticated (60 requests/hour)'}
          </small>
        </div>
      </header>
    </div>
  );
}

export default App;
