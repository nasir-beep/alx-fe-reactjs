import { Users, GitBranch, MapPin, Globe, TrendingUp } from 'lucide-react';

const StatsDisplay = ({ stats }) => {
  const statItems = [
    {
      icon: Users,
      label: 'Total Users',
      value: stats?.totalCount || 0,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      icon: GitBranch,
      label: 'Avg. Repos',
      value: stats?.avgRepos ? Math.round(stats.avgRepos) : 'N/A',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      icon: MapPin,
      label: 'Top Location',
      value: stats?.topLocation || 'Global',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      icon: TrendingUp,
      label: 'Active Users',
      value: stats?.activeUsers || 'N/A',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="card p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${item.bgColor}`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div>
              <p className="text-sm text-github-dark-muted">{item.label}</p>
              <p className="text-xl font-semibold text-github-dark-text">
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsDisplay;
