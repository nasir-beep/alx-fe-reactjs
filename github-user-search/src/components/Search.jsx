import { useState } from 'react';
import './Search.css';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserData = async (username) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Looks like we cant find the user');
        }
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      setUserData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchUserData(username);
    }
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
    // Clear error when user starts typing again
    if (error) {
      setError('');
    }
  };

  return (
    <div className="search-container">
      <h1>GitHub User Search</h1>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={handleChange}
            placeholder="Enter GitHub username..."
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !username.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Conditional rendering based on state */}
      {loading && (
        <div className="message loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="message error">
          <div className="error-icon">❌</div>
          <h3>{error}</h3>
          <p>Please check the username and try again</p>
        </div>
      )}

      {userData && !loading && !error && (
        <div className="user-card">
          <div className="user-header">
            <img 
              src={userData.avatar_url} 
              alt={`${userData.login}'s avatar`}
              className="user-avatar"
            />
            <div className="user-info">
              <h2>{userData.name || userData.login}</h2>
              <p className="username">@{userData.login}</p>
              {userData.bio && <p className="bio">{userData.bio}</p>}
            </div>
          </div>

          <div className="user-stats">
            <div className="stat">
              <span className="stat-number">{userData.public_repos}</span>
              <span className="stat-label">Repositories</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userData.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userData.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>

          <div className="user-details">
            {userData.location && (
              <div className="detail">
                <span>📍 {userData.location}</span>
              </div>
            )}
            {userData.company && (
              <div className="detail">
                <span>🏢 {userData.company}</span>
              </div>
            )}
          </div>

          <div className="profile-link">
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
            >
              View Full Profile on GitHub →
            </a>
          </div>
        </div>
      )}

      {!userData && !loading && !error && (
        <div className="message info">
          <div className="info-icon">🔍</div>
          <h3>Search for a GitHub User</h3>
          <p>Enter a username above to get started</p>
        </div>
      )}
    </div>
  );
};

export default Search;
