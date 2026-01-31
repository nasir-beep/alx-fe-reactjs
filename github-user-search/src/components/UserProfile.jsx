import './UserProfile.css';

const UserProfile = ({ user, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading user information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3>Search for a GitHub user</h3>
        <p>Enter a username above to get started</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img 
          src={user.avatar_url} 
          alt={`${user.login}'s avatar`} 
          className="avatar"
        />
        <div className="profile-info">
          <h2>{user.name || user.login}</h2>
          <p className="username">@{user.login}</p>
          {user.bio && <p className="bio">{user.bio}</p>}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <span className="stat-value">{user.public_repos.toLocaleString()}</span>
          <span className="stat-label">Repositories</span>
        </div>
        <div className="stat">
          <span className="stat-value">{user.followers.toLocaleString()}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-value">{user.following.toLocaleString()}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      <div className="profile-details">
        {user.location && (
          <div className="detail">
            <span className="detail-label">📍</span>
            <span>{user.location}</span>
          </div>
        )}
        {user.company && (
          <div className="detail">
            <span className="detail-label">🏢</span>
            <span>{user.company}</span>
          </div>
        )}
        {user.blog && (
          <div className="detail">
            <span className="detail-label">🔗</span>
            <a href={user.blog} target="_blank" rel="noopener noreferrer">
              {user.blog}
            </a>
          </div>
        )}
        {user.twitter_username && (
          <div className="detail">
            <span className="detail-label">🐦</span>
            <a 
              href={`https://twitter.com/${user.twitter_username}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              @{user.twitter_username}
            </a>
          </div>
        )}
      </div>

      <div className="profile-actions">
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-button"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default UserProfile;
