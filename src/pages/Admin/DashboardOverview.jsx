import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layoutadmin from '../../layouts/Admin';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const DashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api-mijelin.rakis.my.id/api/dashboard/overview');
        
        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          setError('Failed to fetch dashboard data');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Error connecting to server');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper function untuk format number
  const formatNumber = (num) => {
    const number = parseInt(num) || 0;
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toLocaleString();
  };

  // Helper function untuk format weight
  const formatWeight = (weight) => {
    const w = parseInt(weight) || 0;
    if (w >= 1000) {
      return (w / 1000).toFixed(1) + 'kg';
    }
    return w + 'g';
  };

  // Custom tooltip untuk charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Colors untuk charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Dashboard</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { overview, recent_activity, monthly_trends } = dashboardData;

  // Prepare data untuk charts
  const pieData = [
    { name: 'Users', value: overview.total_users, color: '#3B82F6' },
    { name: 'Transactions', value: overview.total_oil_transactions, color: '#10B981' },
    { name: 'Redemptions', value: overview.total_redemptions, color: '#F59E0B' },
    { name: 'News', value: overview.total_news, color: '#EF4444' },
    { name: 'Rewards', value: overview.total_rewards, color: '#8B5CF6' }
  ];

  // Stat cards configuration
  const statCards = [
    {
      title: 'Total Users',
      value: overview.total_users,
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: recent_activity.new_users_this_week,
      changeLabel: 'this week'
    },
    {
      title: 'Oil Transactions',
      value: overview.total_oil_transactions,
      icon: '🛢️',
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      change: recent_activity.oil_transactions_this_week,
      changeLabel: 'this week'
    },
    {
      title: 'Total Minyak Terkumpul',
      value: formatWeight(overview.total_oil_weight),
      icon: '⚖️',
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      subtitle: 'Total collected'
    },
    {
      title: 'Points Earned',
      value: formatNumber(overview.total_points_earned),
      icon: '🎯',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      subtitle: 'By all users'
    },
    {
      title: 'Points Spent',
      value: formatNumber(overview.total_points_spent),
      icon: '💸',
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      subtitle: 'Total redemptions'
    },
    {
      title: 'Redemptions',
      value: overview.total_redemptions,
      icon: '🎁',
      color: 'from-indigo-500 to-indigo-600',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: recent_activity.redemptions_this_week,
      changeLabel: 'this week'
    },
    {
      title: 'News Articles',
      value: overview.total_news,
      icon: '📰',
      color: 'from-teal-500 to-teal-600',
      textColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      subtitle: 'Published'
    },
    {
      title: 'Available Rewards',
      value: overview.total_rewards,
      icon: '🏆',
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      subtitle: 'Active rewards'
    }
  ];

  return (
    <>
    <Layoutadmin>
 <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Analisis komprehensif platform Mijelin</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString('id-ID')}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              {stat.change !== undefined && (
                <div className={`text-sm ${stat.change > 0 ? 'text-green-600' : 'text-gray-500'} flex items-center`}>
                  {stat.change > 0 && '+'}
                  {stat.change} {stat.changeLabel}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
              <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              {stat.subtitle && (
                <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Trends Line Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
            <p className="text-sm text-gray-600">Trend aktivitas bulanan platform</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthly_trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} name="Users" />
              <Line type="monotone" dataKey="oil_transactions" stroke="#10B981" strokeWidth={3} name="Transactions" />
              <Line type="monotone" dataKey="redemptions" stroke="#F59E0B" strokeWidth={3} name="Redemptions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Overview Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Platform Overview</h3>
            <p className="text-sm text-gray-600">Distribusi data platform</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Oil Weight Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Oil Weight Collection Trends</h3>
          <p className="text-sm text-gray-600">Tren pengumpulan minyak jelantah per bulan</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthly_trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              content={<CustomTooltip />}
              formatter={(value) => [`${formatWeight(value)}`, 'Oil Weight']} 
            />
            <Legend />
            <Bar dataKey="oil_weight" fill="#10B981" radius={[4, 4, 0, 0]} name="Oil Weight" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">This Week's Activity</h3>
          <p className="text-sm text-gray-600">Ringkasan aktivitas minggu ini</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{recent_activity.new_users_this_week}</div>
            <div className="text-sm text-gray-600 mt-1">New Users</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{recent_activity.oil_transactions_this_week}</div>
            <div className="text-sm text-gray-600 mt-1">Oil Transactions</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600">{recent_activity.redemptions_this_week}</div>
            <div className="text-sm text-gray-600 mt-1">Redemptions</div>
          </div>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Platform Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{((overview.total_points_earned / overview.total_users) || 0).toFixed(0)}</div>
            <div className="text-blue-100 text-sm">Avg Points per User</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{((overview.total_oil_weight / overview.total_oil_transactions) || 0).toFixed(0)}g</div>
            <div className="text-blue-100 text-sm">Avg Oil per Transaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{((overview.total_redemptions / overview.total_users) * 100 || 0).toFixed(1)}%</div>
            <div className="text-blue-100 text-sm">User Engagement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{((overview.total_points_spent / overview.total_points_earned) * 100 || 0).toFixed(1)}%</div>
            <div className="text-blue-100 text-sm">Points Utilization</div>
          </div>
        </div>
      </div>
    </div>
    </Layoutadmin>
    </>
   
  );
};

export default DashboardOverview;
