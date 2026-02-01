import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

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
      const data = await fetchUserData(username);
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
            <div className="user-avatar">
              <img 
                src={userData.avatar_url} 
                alt={`${userData.login}'s avatar`}
                width="150"
                height="150"
              />
            </div>
            
            <div className="user-info">
              <h2>{userData.name || userData.login}</h2>
              
              {userData.bio && (
                <p className="user-bio">{userData.bio}</p>
              )}
              
              {/* Display user location */}
              {userData.location && (
                <p className="user-location">
                  <strong>📍 Location:</strong> {userData.location}
                </p>
              )}
              
              <div className="user-stats">
                <div className="stat">
                  <strong>Followers:</strong> {userData.followers}
                </div>
                <div className="stat">
                  <strong>Following:</strong> {userData.following}
                </div>
                <div className="stat">
                  <strong>Public Repos:</strong> {userData.public_repos}
                </div>
              </div>
              
              <div className="user-links">
                <a 
                  href={userData.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  View GitHub Profile
                </a>
                
                {userData.blog && (
                  <a 
                    href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-link"
                  >
                    Personal Website
                  </a>
                )}
              </div>
              
              {/* Additional user info using map for demonstration */}
              <div className="additional-info">
                {[
                  { label: 'Company', value: userData.company },
                  { label: 'Twitter', value: userData.twitter_username },
                  { label: 'Created', value: new Date(userData.created_at).toLocaleDateString() }
                ].map((info, index) => (
                  info.value && (
                    <p key={index} className="info-item">
                      <strong>{info.label}:</strong> {info.value}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
