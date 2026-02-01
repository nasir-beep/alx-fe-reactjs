import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService'; // Correct import

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    setUserData(null);
    
    try {
      // Use fetchUserData function from githubService
      const data = await fetchUserData(username); // This is the correct usage
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>GitHub User Search</h1>
      
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="results-container">
        {loading && (
          <div className="loading-message">
            Loading...
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {userData && !loading && !error && (
          <div className="user-card">
            <img 
              src={userData.avatar_url} 
              alt={`${userData.login}'s avatar`}
              width="150"
              height="150"
            />
            <h2>{userData.name || userData.login}</h2>
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View GitHub Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
