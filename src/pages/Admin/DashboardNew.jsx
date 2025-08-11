import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalNews: 0,
    totalTransactions: 0,
    totalRewards: 0,
    totalPoints: 0
  });
  
  const [recentNews, setRecentNews] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Fetch data dari API Mijelin
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Parallel fetch untuk semua data
        const [newsResponse, rewardsResponse] = await Promise.all([
          axios.get('https://api-mijelin.rakis.my.id/api/news'),
          axios.get('https://api-mijelin.rakis.my.id/api/rewards')
        ]);

        // Process News Data
        const newsData = Array.isArray(newsResponse.data) ? newsResponse.data : newsResponse.data.data || [];
        const sortedNews = newsData
          .sort((a, b) => new Date(b.date || b.created_at) - new Date(a.date || a.created_at))
          .slice(0, 5);

        // Process Rewards Data  
        const rewardsData = Array.isArray(rewardsResponse.data) ? rewardsResponse.data : rewardsResponse.data.data || [];

        // Update stats
        setStatsData({
          totalUsers: 1247, // Placeholder - tidak ada endpoint user count
          totalNews: newsData.length,
          totalTransactions: 856, // Placeholder - akan diupdate jika ada endpoint
          totalRewards: rewardsData.length,
          totalPoints: 45280 // Placeholder - total points yang diedarkan
        });

        setRecentNews(sortedNews);
        
        // Mock recent activities berdasarkan data yang ada
        setRecentActivities([
          { 
            id: 1, 
            user: "John Doe", 
            action: "Menyetor minyak jelantah 2.5kg", 
            time: "2 menit yang lalu", 
            type: "transaction",
            points: "+250 poin"
          },
          { 
            id: 2, 
            user: "Jane Smith", 
            action: "Menukar poin dengan " + (rewardsData[0]?.nama_reward || "voucher"), 
            time: "15 menit yang lalu", 
            type: "reward",
            points: "-500 poin"
          },
          { 
            id: 3, 
            user: "Admin", 
            action: "Menambah berita: " + (newsData[0]?.title || "Tips Daur Ulang"), 
            time: "1 jam yang lalu", 
            type: "news"
          },
          { 
            id: 4, 
            user: "Budi Santoso", 
            action: "Registrasi akun baru", 
            time: "2 jam yang lalu", 
            type: "user"
          },
          { 
            id: 5, 
            user: "Siti Nurhaliza", 
            action: "Menyetor minyak jelantah 1.2kg", 
            time: "3 jam yang lalu", 
            type: "transaction",
            points: "+120 poin"
          }
        ]);

        // Mock chart data untuk trend 7 hari terakhir
        setChartData([
          { day: 'Sen', users: 12, transactions: 8, news: 2 },
          { day: 'Sel', users: 18, transactions: 12, news: 1 },
          { day: 'Rab', users: 25, transactions: 15, news: 3 },
          { day: 'Kam', users: 22, transactions: 18, news: 1 },
          { day: 'Jum', users: 35, transactions: 22, news: 4 },
          { day: 'Sab', users: 28, transactions: 16, news: 2 },
          { day: 'Min', users: 15, transactions: 10, news: 1 }
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper function untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Helper function untuk mendapatkan icon activity
  const getActivityIcon = (type) => {
    switch(type) {
      case 'transaction':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        );
      case 'reward':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
        );
      case 'news':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
          </div>
        );
      case 'user':
        return (
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6 min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Memuat data dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard Mijelin</h1>
            <p className="text-gray-600 mt-1">Selamat datang di panel admin Mijelin. Pantau aktivitas dan statistik platform.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* Total Users */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold mt-2">{statsData.totalUsers.toLocaleString()}</p>
              <p className="text-blue-100 text-xs mt-2">+12% bulan ini</p>
            </div>
            <div className="opacity-80">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Berita */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Berita</p>
              <p className="text-2xl font-bold mt-2">{statsData.totalNews}</p>
              <p className="text-green-100 text-xs mt-2">+8% bulan ini</p>
            </div>
            <div className="opacity-80">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Transaksi */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Transaksi Minyak</p>
              <p className="text-2xl font-bold mt-2">{statsData.totalTransactions}</p>
              <p className="text-purple-100 text-xs mt-2">+25% bulan ini</p>
            </div>
            <div className="opacity-80">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Rewards */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Rewards</p>
              <p className="text-2xl font-bold mt-2">{statsData.totalRewards}</p>
              <p className="text-orange-100 text-xs mt-2">+5% bulan ini</p>
            </div>
            <div className="opacity-80">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Points */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Total Points</p>
              <p className="text-2xl font-bold mt-2">{statsData.totalPoints.toLocaleString()}</p>
              <p className="text-pink-100 text-xs mt-2">+18% bulan ini</p>
            </div>
            <div className="opacity-80">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                {getActivityIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  {activity.points && (
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                      activity.points.includes('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.points}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Statistik Cepat</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">User Aktif Hari Ini</p>
                  <p className="text-xs text-gray-600">Online sekarang</p>
                </div>
              </div>
              <span className="text-lg font-bold text-blue-600">284</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Transaksi Hari Ini</p>
                  <p className="text-xs text-gray-600">Minyak disetor</p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600">47</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Points Ditukarkan</p>
                  <p className="text-xs text-gray-600">Hari ini</p>
                </div>
              </div>
              <span className="text-lg font-bold text-purple-600">1,420</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Berita Dibaca</p>
                  <p className="text-xs text-gray-600">Hari ini</p>
                </div>
              </div>
              <span className="text-lg font-bold text-orange-600">356</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid - News & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Berita Terbaru</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Kelola Berita
            </button>
          </div>
          
          <div className="space-y-4">
            {recentNews.length > 0 ? (
              recentNews.map((news, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <img 
                    src={news.image || 'https://via.placeholder.com/60x60/059669/FFFFFF?text=N'} 
                    alt={news.title}
                    className="w-15 h-15 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{news.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{formatDate(news.date || news.created_at)}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Published
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada berita</h3>
                <p className="mt-1 text-sm text-gray-500">Belum ada berita yang tersedia.</p>
              </div>
            )}
          </div>
        </div>

        {/* Simple Chart Representation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Trend 7 Hari Terakhir</h2>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>7 Hari</option>
              <option>30 Hari</option>
              <option>3 Bulan</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-8 text-xs font-medium text-gray-600">{data.day}</div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(data.users / 35) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-8">{data.users}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mx-auto mb-1"></div>
              <p className="text-xs text-gray-600">Users</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mx-auto mb-1"></div>
              <p className="text-xs text-gray-600">Transaksi</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-purple-600 rounded-full mx-auto mb-1"></div>
              <p className="text-xs text-gray-600">Berita</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
