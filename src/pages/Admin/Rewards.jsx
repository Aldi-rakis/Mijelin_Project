import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch rewards dari API
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api-mijelin.rakis.my.id/api/rewards');
        const rewardsData = Array.isArray(response.data) ? response.data : response.data.data || [];
        setRewards(rewardsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rewards:', error);
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  // Filter rewards berdasarkan search dan status
  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.nama_reward?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && reward.status === 'aktif') ||
                         (filterStatus === 'inactive' && reward.status !== 'aktif');
    
    return matchesSearch && matchesStatus;
  });

  // Statistik rewards
  const stats = [
    { 
      title: 'Total Rewards', 
      value: rewards.length, 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    { 
      title: 'Rewards Aktif', 
      value: rewards.filter(r => r.status === 'aktif').length, 
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      title: 'Total Points Dibutuhkan', 
      value: rewards.reduce((sum, r) => sum + (r.points_required || 0), 0), 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    { 
      title: 'Kategori Rewards', 
      value: [...new Set(rewards.map(r => r.kategori))].length, 
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'aktif':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'tidak aktif':
      case 'nonaktif':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewDetails = (reward) => {
    setSelectedReward(reward);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditReward = (reward) => {
    setSelectedReward(reward);
    setIsEditing(true);
    setShowModal(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6 min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Memuat data rewards...</p>
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Kelola Rewards</h1>
            <p className="text-gray-600 mt-1">Kelola sistem reward dan poin Mijelin</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 w-fit">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Tambah Reward</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value.toLocaleString()}</p>
              </div>
              <div className="opacity-80">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari rewards berdasarkan nama atau deskripsi..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-32"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="p-6">
              {/* Reward Image */}
              <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {reward.image ? (
                  <img 
                    src={reward.image} 
                    alt={reward.nama_reward}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                )}
              </div>

              {/* Reward Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">{reward.nama_reward}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(reward.status)}`}>
                    {reward.status || 'Tidak Diketahui'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3">{reward.deskripsi}</p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Points Required:</span>
                    <span className="font-semibold text-blue-600">{reward.points_required?.toLocaleString() || 'N/A'}</span>
                  </div>
                  
                  {reward.harga && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Harga:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(reward.harga)}</span>
                    </div>
                  )}
                  
                  {reward.kategori && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Kategori:</span>
                      <span className="text-sm font-medium text-gray-900">{reward.kategori}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={() => handleViewDetails(reward)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleEditReward(reward)}
                    className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRewards.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada rewards ditemukan</h3>
          <p className="mt-1 text-sm text-gray-500">Coba ubah filter pencarian atau tambah rewards baru</p>
        </div>
      )}

      {/* Detail Modal */}
      {showModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedReward.nama_reward}</h2>
                  <p className="text-gray-500 text-sm">Detail Reward</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Informasi Reward</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nama:</span>
                      <span className="font-medium">{selectedReward.nama_reward}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedReward.status)}`}>
                        {selectedReward.status || 'Tidak Diketahui'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Points Required:</span>
                      <span className="font-medium">{selectedReward.points_required?.toLocaleString() || 'N/A'}</span>
                    </div>
                    {selectedReward.harga && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Harga:</span>
                        <span className="font-medium">{formatCurrency(selectedReward.harga)}</span>
                      </div>
                    )}
                    {selectedReward.kategori && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Kategori:</span>
                        <span className="font-medium">{selectedReward.kategori}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Deskripsi</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedReward.deskripsi || 'Tidak ada deskripsi tersedia.'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {isEditing ? (
                  <>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Simpan Perubahan
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Batal Edit
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit Reward
                    </button>
                    <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Hapus Reward
                    </button>
                  </>
                )}
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;
