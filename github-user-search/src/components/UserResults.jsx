import { useState, useEffect } from 'react';
import { User, MapPin, GitBranch, Users, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import githubService from '../services/githubService';

const UserCard = ({ user }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const result = await githubService.fetchUserData(user.login);
      if (result.success) {
        setUserDetails(result.data);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [user.login]);

  return (
    <div className="card p-4 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-16 h-16 rounded-full border-2 border-github-blue"
        />

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg text-github-dark-text truncate">
                {user.login}
              </h3>
              {userDetails?.name && (
                <p className="text-github-dark-muted text-sm">{userDetails.name}</p>
              )}
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-1 text-sm p-2"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {userDetails?.bio && (
            <p className="text-github-dark-muted text-sm mt-2 line-clamp-2">
              {userDetails.bio}
            </p>
          )}

          {/* Stats & Details */}
          <div className="flex flex-wrap gap-3 mt-3">
            {loading ? (
              <div className="shimmer h-6 w-24 rounded"></div>
            ) : (
              <>
                {userDetails?.public_repos !== undefined && (
                  <div className="flex items-center gap-1 text-sm text-github-dark-muted">
                    <GitBranch className="w-4 h-4" />
                    <span>{userDetails.public_repos} repos</span>
                  </div>
                )}
                {userDetails?.followers !== undefined && (
                  <div className="flex items-center gap-1 text-sm text-github-dark-muted">
                    <Users className="w-4 h-4" />
                    <span>{userDetails.followers} followers</span>
                  </div>
                )}
                {userDetails?.location && (
                  <div className="flex items-center gap-1 text-sm text-github-dark-muted">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate max-w-[120px]">{userDetails.location}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserResults = ({ users, pagination, onPageChange, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-4">
            <div className="flex items-start gap-4">
              <div className="shimmer w-16 h-16 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="shimmer h-6 w-32 rounded"></div>
                <div className="shimmer h-4 w-48 rounded"></div>
                <div className="flex gap-4">
                  <div className="shimmer h-4 w-20 rounded"></div>
                  <div className="shimmer h-4 w-20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="w-16 h-16 text-github-dark-muted mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-github-dark-text mb-2">
          No users found
        </h3>
        <p className="text-github-dark-muted">
          Try adjusting your search criteria to find more results
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-github-dark-muted">
          Found <span className="font-semibold text-github-dark-text">{pagination.totalCount}</span> users
        </p>
        {pagination.totalPages > 1 && (
          <p className="text-github-dark-muted">
            Page <span className="font-semibold text-github-dark-text">{pagination.page}</span> of{' '}
            <span className="font-semibold text-github-dark-text">{pagination.totalPages}</span>
          </p>
        )}
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={!pagination.hasPrevPage}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum;
              if (pagination.totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`min-w-[40px] px-3 py-2 rounded-md ${
                    pagination.page === pageNum
                      ? 'bg-github-blue text-white'
                      : 'btn-secondary'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={!pagination.hasNextPage}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserResults;
