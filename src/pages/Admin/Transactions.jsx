import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Mock data karena belum ada endpoint transaksi
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        
        // Simulasi API call - ganti dengan endpoint yang sebenarnya
        const mockTransactions = [
          {
            id: 1,
            user_name: "John Doe",
            user_nik: "3201234567890123",
            weight: 2500, // dalam gram
            points_earned: 250,
            status: "sukses",
            location: "Jakarta Selatan",
            pickup_date: "2024-01-15T10:30:00Z",
            verified_by: "Admin 1",
            created_at: "2024-01-15T08:00:00Z"
          },
          {
            id: 2,
            user_name: "Jane Smith",
            user_nik: "3201234567890124",
            weight: 1200,
            points_earned: 120,
            status: "proses",
            location: "Jakarta Pusat",
            pickup_date: "2024-01-16T14:00:00Z",
            verified_by: null,
            created_at: "2024-01-16T09:30:00Z"
          },
          {
            id: 3,
            user_name: "Budi Santoso",
            user_nik: "3201234567890125",
            weight: 3200,
            points_earned: 320,
            status: "sukses",
            location: "Jakarta Barat",
            pickup_date: "2024-01-14T11:15:00Z",
            verified_by: "Admin 2",
            created_at: "2024-01-14T07:45:00Z"
          },
          {
            id: 4,
            user_name: "Siti Nurhaliza",
            user_nik: "3201234567890126",
            weight: 800,
            points_earned: 0,
            status: "pending",
            location: "Jakarta Timur",
            pickup_date: "2024-01-17T16:00:00Z",
            verified_by: null,
            created_at: "2024-01-17T10:00:00Z"
          },
          {
            id: 5,
            user_name: "Ahmad Rahman",
            user_nik: "3201234567890127",
            weight: 1800,
            points_earned: 180,
            status: "sukses",
            location: "Jakarta Utara",
            pickup_date: "2024-01-13T13:45:00Z",
            verified_by: "Admin 1",
            created_at: "2024-01-13T11:20:00Z"
          }
        ];
        
        setTransactions(mockTransactions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.user_nik?.includes(searchTerm) ||
                         transaction.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    const matchesDate = dateFilter === 'all' || (() => {
      const transactionDate = new Date(transaction.created_at);
      const now = new Date();
      const diffTime = now - transactionDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch(dateFilter) {
        case 'today': return diffDays <= 1;
        case 'week': return diffDays <= 7;
        case 'month': return diffDays <= 30;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Statistik transactions
  const stats = [
    { 
      title: 'Total Transaksi', 
      value: transactions.length, 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      title: 'Transaksi Sukses', 
      value: transactions.filter(t => t.status === 'sukses').length, 
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      title: 'Total Minyak (kg)', 
      value: (transactions.reduce((sum, t) => sum + t.weight, 0) / 1000).toFixed(1), 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      title: 'Total Points', 
      value: transactions.reduce((sum, t) => sum + t.points_earned, 0), 
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'sukses':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'proses':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ditolak':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatWeight = (weight) => {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(1)} kg`;
    }
    return `${weight} gram`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = (transactionId, newStatus) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, status: newStatus, verified_by: newStatus === 'sukses' ? 'Admin' : null }
        : transaction
    ));
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6 min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Memuat data transaksi...</p>
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Transaksi Minyak Jelantah</h1>
            <p className="text-gray-600 mt-1">Kelola transaksi penyetoran minyak jelantah dari user</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 w-fit">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Export Data</span>
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
                <p className="text-3xl font-bold mt-2">{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</p>
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
                placeholder="Cari berdasarkan nama, NIK, atau lokasi..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-32"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="proses">Proses</option>
              <option value="sukses">Sukses</option>
              <option value="ditolak">Ditolak</option>
            </select>

            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-32"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">Semua Tanggal</option>
              <option value="today">Hari Ini</option>
              <option value="week">7 Hari Terakhir</option>
              <option value="month">30 Hari Terakhir</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table/Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berat Minyak</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.user_name}</div>
                      <div className="text-sm text-gray-500">{transaction.user_nik}</div>
                      <div className="text-sm text-gray-500">{transaction.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{formatWeight(transaction.weight)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-blue-600">+{transaction.points_earned} poin</div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={transaction.status}
                      onChange={(e) => handleStatusUpdate(transaction.id, e.target.value)}
                      className={`text-xs font-medium rounded-full border px-3 py-1 ${getStatusColor(transaction.status)} focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="pending">Pending</option>
                      <option value="proses">Proses</option>
                      <option value="sukses">Sukses</option>
                      <option value="ditolak">Ditolak</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(transaction.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewDetails(transaction)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{transaction.user_name}</h3>
                  <p className="text-xs text-gray-500">{transaction.user_nik}</p>
                  <p className="text-xs text-gray-500">{transaction.location}</p>
                </div>
                <button
                  onClick={() => handleViewDetails(transaction)}
                  className="text-blue-600 text-xs font-medium ml-2"
                >
                  Detail
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Berat:</span>
                  <span className="text-xs font-medium">{formatWeight(transaction.weight)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Points:</span>
                  <span className="text-xs font-medium text-blue-600">+{transaction.points_earned}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Status:</span>
                  <select
                    value={transaction.status}
                    onChange={(e) => handleStatusUpdate(transaction.id, e.target.value)}
                    className={`text-xs font-medium rounded-full border px-2 py-1 ${getStatusColor(transaction.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="proses">Proses</option>
                    <option value="sukses">Sukses</option>
                    <option value="ditolak">Ditolak</option>
                  </select>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Tanggal:</span>
                  <span className="text-xs">{formatDate(transaction.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada transaksi ditemukan</h3>
            <p className="mt-1 text-sm text-gray-500">Coba ubah filter pencarian</p>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      {showModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Detail Transaksi #{selectedTransaction.id}</h2>
                  <p className="text-gray-500 text-sm">{selectedTransaction.user_name}</p>
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
                  <h3 className="font-medium text-gray-900 mb-3">Informasi User</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nama:</span>
                      <span className="font-medium">{selectedTransaction.user_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">NIK:</span>
                      <span className="font-medium">{selectedTransaction.user_nik}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Lokasi:</span>
                      <span className="font-medium">{selectedTransaction.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Detail Transaksi</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Berat Minyak:</span>
                      <span className="font-medium">{formatWeight(selectedTransaction.weight)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Points Earned:</span>
                      <span className="font-medium text-blue-600">+{selectedTransaction.points_earned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedTransaction.status)}`}>
                        {selectedTransaction.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tanggal Pickup:</span>
                      <span className="font-medium">{formatDate(selectedTransaction.pickup_date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Dibuat:</span>
                      <span className="font-medium">{formatDate(selectedTransaction.created_at)}</span>
                    </div>
                    {selectedTransaction.verified_by && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Diverifikasi:</span>
                        <span className="font-medium">{selectedTransaction.verified_by}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Approve
                </button>
                <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Reject
                </button>
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

export default Transactions;
