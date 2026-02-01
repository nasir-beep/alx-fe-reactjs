import React, { useState } from 'react';
import { searchUsers, getUserDetails } from '../services/githubService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setUsers([]);
    
    try {
      // Search for multiple users
      const userList = await searchUsers(query);
      
      // Get detailed info for each user
      const detailedUsers = await Promise.all(
        userList.slice(0, 10).map(async (user) => {
          const details = await getUserDetails(user.login);
          return details;
        })
      );
      
      setUsers(detailedUsers);
    } catch (err) {
      setError('Looks like we cant find any users');
      console.error('Error fetching users:', err);
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub users..."
          className="search-input"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {/* Using map to display multiple users */}
      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar_url} alt={user.login} />
            <h3>{user.login}</h3>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
