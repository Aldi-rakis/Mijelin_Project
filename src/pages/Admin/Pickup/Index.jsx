import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layoutadmin from "../../../layouts/Admin";
import Swal from 'sweetalert2';
const PickupManagement = () => {
  const [activeTab, setActiveTab] = useState('schedules');
  const [schedules, setSchedules] = useState([]);
  const [userPickups, setUserPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    
  const [formData, setFormData] = useState({
    pickup_date: '',
    time_slot: ''
  });

  // Fetch pickup schedules
  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api-mijelin.rakis.my.id/api/pickup-schedules');
      if (response.status === 200) {
        setSchedules(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user pickups
  const fetchUserPickups = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api-mijelin.rakis.my.id/api/user-pickups');
      if (response.data.status === 'success') {
        setUserPickups(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user pickups:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new pickup schedule
  const createSchedule = async () => {
    try {
      setLoading(true);
      formData.pickup_date = new Date(formData.pickup_date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'); // Format date to DD-MM-YYYY
      const response = await axios.post('https://api-mijelin.rakis.my.id/api/pickup-schedules', formData);
      console.log(response);
      if (response.data.success === true) {
        fetchSchedules();
        setShowCreateModal(false);
        Swal.fire({
          icon: 'success',
          title: 'Schedule Created',
          text: 'The pickup schedule has been successfully created!',
          confirmButtonColor: '#3B82F6'
        });
        setFormData({ pickup_date: '', time_slot: '' });
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
    fetchUserPickups();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updatePickupStatus = async (pickupId, status) => {
    try {
      setLoading(true);
      const response = await axios.put(`https://api-mijelin.rakis.my.id/api/user-pickups/${pickupId}`, { status });
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          text: 'The pickup status has been successfully updated!',
          confirmButtonColor: '#3B82F6'
        });

        setShowDetailModal(false);

        fetchUserPickups();
        // refresh halaman componen pickup dan agar berubah statusnya
        
      }
    } catch (error) {
      console.error('Error updating pickup status:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    console.log('Status:', status);
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Canceled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'In_progress	':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPickupStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Canceled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <> <Layoutadmin>
         <div className="p-4 lg:p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col gap-4">
          <div className='flex flex-row items-center justify-between'>

            <div>
                 <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Manajemen Pickup</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Kelola jadwal pickup dan monitor aktivitas pickup user</p>


            </div>

             <div className="h-10 ">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-3  rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 text-sm sm:text-base"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Tambah Jadwal</span>
              <span className="sm:hidden">Tambah</span>
            </button>
          </div>
           
            
          </div>
         
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-blue-100 text-xs sm:text-sm font-medium truncate">Total Jadwal</p>
              <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{schedules.length}</p>
            </div>
            <div className="opacity-80 ml-2">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m6 0a2 2 0 011 1v10a2 2 0 01-1 1H3a2 2 0 01-1-1V8a2 2 0 011-1h14z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-green-100 text-xs sm:text-sm font-medium truncate">Pickup Aktif</p>
              <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{userPickups.length}</p>
            </div>
            <div className="opacity-80 ml-2">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-purple-100 text-xs sm:text-sm font-medium truncate">Completed</p>
              <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{userPickups.filter(p => p.status === 'completed').length}</p>
            </div>
            <div className="opacity-80 ml-2">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-orange-100 text-xs sm:text-sm font-medium truncate">Pending</p>
              <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{userPickups.filter(p => p.status === 'pending').length}</p>
            </div>
            <div className="opacity-80 ml-2">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto px-4 sm:px-6">
            <button
              onClick={() => setActiveTab('schedules')}
              className={`py-3 sm:py-4 px-3 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'schedules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m6 0a2 2 0 011 1v10a2 2 0 01-1 1H3a2 2 0 01-1-1V8a2 2 0 011-1h14z" />
                </svg>
                <span className="text-xs sm:text-sm">Jadwal Pickup</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('pickups')}
              className={`py-3 sm:py-4 px-3 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ml-6 sm:ml-8 ${
                activeTab === 'pickups'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="text-xs sm:text-sm">Data User Pickup</span>
              </div>
            </button>
          </nav>
        </div>

            <div className="p-4 sm:p-6">
              {activeTab === 'schedules' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Daftar Jadwal Pickup</h3>
                  {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                  ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">#{schedule.id}</h4>
                      <p className="text-sm text-gray-600">{schedule.pickup_date}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(schedule.status)}`}>
                      {schedule.status}
                    </span>
                      </div>
                      <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="truncate">{schedule.time_slot}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m6 0a2 2 0 011 1v10a2 2 0 01-1 1H3a2 2 0 01-1-1V8a2 2 0 011-1h14z" />
                      </svg>
                      <span className="truncate">{schedule.day_of_week}</span>
                    </div>
                      </div>
                      <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700 transition-colors">
                      Hapus
                    </button>
                      </div>
                    </div>
                  ))}
                </div>
                  )}
                </div>
              )}

              {activeTab === 'pickups' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Data User Pickup</h3>
                  {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                  ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jadwal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userPickups.map((pickup) => (
                      <tr key={pickup.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                          className="h-10 w-10 rounded-full border-2 border-gray-200" 
                          src={pickup.image || 'https://api-mijelin.rakis.my.id/storage/image_profile/default.jpg'} 
                          alt={pickup.user_name}
                            />
                            <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{pickup.user_name}</div>
                          <div className="text-sm text-gray-500">ID: {pickup.user_id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {pickup.pickup_date} <br /> {pickup.time_slot} WIB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPickupStatusColor(pickup.status)}`}>
                            {pickup.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pickup.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                          onClick={() => {
                            setSelectedPickup(pickup);
                            setSelectedStatus(pickup.status);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                            >
                          Detail
                            </button>
                            <button className="text-green-600 hover:text-green-900">Konfirmasi</button>
                          </div>
                        </td>
                      </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="lg:hidden space-y-4">
                    {userPickups.map((pickup) => (
                      <div key={pickup.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-start space-x-3 mb-3">
                          <img 
                            className="h-12 w-12 rounded-full border-2 border-gray-200 flex-shrink-0" 
                            src={pickup.image || 'https://api-mijelin.rakis.my.id/storage/image_profile/default.jpg'} 
                            alt={pickup.user_name}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 truncate">{pickup.user_name}</h4>
                                <p className="text-xs text-gray-500">ID: {pickup.user_id}</p>
                              </div>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ml-2 flex-shrink-0 ${getPickupStatusColor(pickup.status)}`}>
                                {pickup.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m6 0a2 2 0 011 1v10a2 2 0 01-1 1H3a2 2 0 01-1-1V8a2 2 0 011-1h14z" />
                            </svg>
                            <span className="text-gray-600">
                              {pickup.pickup_date} - {pickup.time_slot} WIB
                            </span>
                          </div>
                          
                          <div className="flex items-start">
                            <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-gray-600 text-xs leading-relaxed">{pickup.address}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                          <button 
                            onClick={() => {
                              setSelectedPickup(pickup);
                              setSelectedStatus(pickup.status);
                              setShowDetailModal(true);
                            }}
                            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors text-center"
                          >
                            Detail
                          </button>
                          <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors text-center">
                            Konfirmasi
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
                  )}
                </div>
              )}
            </div>
              </div>

              {/* Pickup Detail Modal */}
              {showDetailModal && selectedPickup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Detail Pickup</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                  </div>
                  
                  <div className="space-y-4">
                <div className="flex items-center">
                  <img 
                    className="h-16 w-16 rounded-full border-2 border-gray-200 flex-shrink-0" 
                    src={selectedPickup.image || 'https://api-mijelin.rakis.my.id/storage/image_profile/default.jpg'} 
                    alt={selectedPickup.user_name}
                  />
                  <div className="ml-4 flex-1 min-w-0">
                    <h4 className="text-lg font-medium text-gray-900 truncate">{selectedPickup.user_name}</h4>
                    <p className="text-sm text-gray-500">User ID: {selectedPickup.user_id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Tanggal Pickup</p>
                    <p className="text-sm font-medium">{selectedPickup.pickup_date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Waktu</p>
                    <p className="text-sm font-medium">{selectedPickup.time_slot} WIB</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Alamat</p>
                  <p className="text-sm font-medium break-words">{selectedPickup.address}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Status</p>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="scheduled">Sudah dijadwalkan</option>
                    <option value="in_progress">Kurir sedang menuju lokasi</option>
                    <option value="completed">Proses pickup selesai</option>
                    <option value="canceled">Dibatalkan</option>
                  </select>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-center"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => updatePickupStatus(selectedPickup.id, selectedStatus)}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-center"
                  >
                    {loading ? 'Menyimpan...' : 'Update Status'}
                  </button>
                </div>
                  </div>
                </div>
              </div>
            </div>
              )}

              {/* Create Schedule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Tambah Jadwal Pickup</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); createSchedule(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Pickup
                  </label>
                  <input
                    type="date"
                    name="pickup_date"
                    value={formData.pickup_date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slot Waktu
                  </label>
                  <input
                    type="text"
                    name="time_slot"
                    value={formData.time_slot}
                    onChange={handleInputChange}
                    placeholder="Contoh: 09:00-11:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-center"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-center"
                  >
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
        
        </Layoutadmin>  </>
   
  );
};

export default PickupManagement;
