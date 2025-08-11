import { useState } from "react";
import Layoutadmin from "../../layouts/Admin";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('7');
  
  // Mock data untuk chart dan statistik
  const statsData = {
    totalUsers: 1247,
    totalNews: 24,
    totalViews: 12543,
    totalRewards: 89,
    userGrowth: 12.5,
    newsGrowth: 8.3,
    viewsGrowth: 15.7,
    rewardsGrowth: 5.2
  };

  const recentActivities = [
    { id: 1, user: "John Doe", action: "Membuat berita baru", time: "2 menit yang lalu", type: "create" },
    { id: 2, user: "Jane Smith", action: "Mengedit artikel", time: "15 menit yang lalu", type: "edit" },
    { id: 3, user: "Admin", action: "Menghapus komentar spam", time: "1 jam yang lalu", type: "delete" },
    { id: 4, user: "Editor", action: "Mempublish artikel", time: "2 jam yang lalu", type: "publish" }
  ];

  const topNews = [
    { title: "Tips Menghemat BBM", views: 2543, trend: "up" },
    { title: "Manfaat Daur Ulang Minyak", views: 1876, trend: "up" },
    { title: "Program Reward Terbaru", views: 1654, trend: "down" },
    { title: "Teknologi Ramah Lingkungan", views: 1432, trend: "up" }
  ];

  return (
    <div className="">
      <Layoutadmin>
        <div className="w-full min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="bg-white shadow-sm border-b">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600 mt-1">Selamat datang kembali! Berikut adalah ringkasan aktivitas Anda.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <select 
                    value={dateRange} 
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="7">7 Hari Terakhir</option>
                    <option value="30">30 Hari Terakhir</option>
                    <option value="90">3 Bulan Terakhir</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{statsData.totalUsers.toLocaleString()}</p>
                    <p className={`text-sm mt-2 flex items-center ${statsData.userGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <svg className={`w-4 h-4 mr-1 ${statsData.userGrowth > 0 ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      {Math.abs(statsData.userGrowth)}% dari minggu lalu
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Berita</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{statsData.totalNews}</p>
                    <p className={`text-sm mt-2 flex items-center ${statsData.newsGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <svg className={`w-4 h-4 mr-1 ${statsData.newsGrowth > 0 ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      {Math.abs(statsData.newsGrowth)}% dari minggu lalu
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v6m0 0l-3-3m3 3l3-3" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{statsData.totalViews.toLocaleString()}</p>
                    <p className={`text-sm mt-2 flex items-center ${statsData.viewsGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <svg className={`w-4 h-4 mr-1 ${statsData.viewsGrowth > 0 ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      {Math.abs(statsData.viewsGrowth)}% dari minggu lalu
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Rewards</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{statsData.totalRewards}</p>
                    <p className={`text-sm mt-2 flex items-center ${statsData.rewardsGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <svg className={`w-4 h-4 mr-1 ${statsData.rewardsGrowth > 0 ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      {Math.abs(statsData.rewardsGrowth)}% dari minggu lalu
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts and Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Traffic Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Traffic Overview</h3>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Website</span>
                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Mobile</span>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-gray-500">Chart akan ditampilkan di sini</p>
                  </div>
                </div>
              </div>

              {/* Top News */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Berita Trending</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Lihat Semua</button>
                </div>
                <div className="space-y-4">
                  {topNews.map((news, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{news.title}</p>
                          <p className="text-gray-500 text-xs">{news.views.toLocaleString()} views</p>
                        </div>
                      </div>
                      <div className={`p-1 rounded-full ${news.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                        <svg className={`w-4 h-4 ${news.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Lihat Semua</button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'create' ? 'bg-green-100' :
                        activity.type === 'edit' ? 'bg-blue-100' :
                        activity.type === 'delete' ? 'bg-red-100' :
                        'bg-purple-100'
                      }`}>
                        {activity.type === 'create' && (
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                        {activity.type === 'edit' && (
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        )}
                        {activity.type === 'delete' && (
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                        {activity.type === 'publish' && (
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layoutadmin>
    </div>
  );
};

export default Dashboard;
