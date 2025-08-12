import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useUserStore from '../../../components/store/useUserStore';
import arrow from '../../../assets/back_arrow.png';

const Index = () => {
    const [pickupSchedules, setPickupSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const { userData, isLoading, fetchUserData } = useUserStore();
    const nik = localStorage.getItem('nik');

    useEffect(() => {
        if (!userData || userData.nik !== nik) {
            fetchUserData(nik);
        }
    }, [nik, fetchUserData]);

    useEffect(() => {
        const fetchPickupSchedules = async () => {
            try {
                const response = await fetch('https://api-mijelin.rakis.my.id/api/pickup-schedules');
                const result = await response.json();
                console.log('Pickup schedules:', result);
                if (result.data) {
                    const availableSchedules = result.data.filter(schedule => schedule.status === 'available');
                    setPickupSchedules(availableSchedules);
                }
            } catch (error) {
                console.error('Error fetching pickup schedules:', error);
            }
        };
        fetchPickupSchedules();
    }, []);

    const handleScheduleChange = (e) => {
        setSelectedSchedule(e.target.value);
    };

    const handlePickup = async () => {
        if (!selectedSchedule) {
            Swal.fire({
                icon: 'warning',
                title: 'Pilih Jadwal',
                text: 'Silakan pilih jadwal penjemputan terlebih dahulu!',
                confirmButtonColor: '#3B82F6'
            });
            return;
        }

        if (!userData?.id) {
            Swal.fire({
                icon: 'error',
                title: 'Data Tidak Valid',
                text: 'Data pengguna tidak ditemukan. Silakan login ulang.',
                confirmButtonColor: '#3B82F6'
            });
            return;
        }

        setIsSubmitting(true);

        const payload = {
            user_id: userData.id,
            schedule_id: parseInt(selectedSchedule),
            address: userData.alamat,
            detail: notes.trim() || null,
        };

        try {
            const response = await fetch('https://api-mijelin.rakis.my.id/api/user-pickups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log('Pickup response:', result);

            if (response.ok) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Penjemputan berhasil dijadwalkan! Tim kami akan menghubungi Anda.',
                    confirmButtonColor: '#3B82F6'
                });
                
                setSelectedSchedule('');
                setNotes('');
                navigate('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: result.message || 'Terjadi kesalahan saat menjadwalkan penjemputan.',
                    confirmButtonColor: '#3B82F6'
                });
            }
        } catch (error) {
            console.error('Error scheduling pickup:', error);
            Swal.fire({
                icon: 'error',
                title: 'Koneksi Bermasalah',
                text: 'Tidak dapat menghubungi server. Periksa koneksi internet Anda.',
                confirmButtonColor: '#3B82F6'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const goBack = () => {
        navigate('/');
    };

    return (
        <div className='max-w-[550px] justify-center items-center mx-auto bg-gradient-to-b from-blue-50 to-white shadow-xl min-h-screen'>
            {/* Header Section */}
            <div className='relative bg-gradient-to-r from-blue-600 to-indigo-700 h-[200px] w-full rounded-b-3xl'>
                <div className='absolute inset-0 bg-black bg-opacity-10 rounded-b-3xl'></div>
                <div className='relative z-10 text-center flex justify-center items-center pt-4 h-16'>
                    <button onClick={goBack} aria-label="Go back" className='absolute left-5 top-4'>
                        <div className='w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white border-opacity-20'>
                            <img
                                className='w-full h-full'
                                src={arrow}
                                alt="Back arrow"
                            />
                        </div>
                    </button>
                    <div className='text-center'>
                        <h1 className='text-2xl font-bold text-white'>Layanan Jemput</h1>
                        <p className='text-blue-100 text-sm mt-1'>Jadwalkan penjemputan minyak jelantah Anda</p>
                    </div>
                </div>

                {/* User Info Card */}
                <div className='absolute bottom-0 left-5 right-5 transform translate-y-1/2'>
                    <div className='bg-white rounded-2xl p-5 shadow-xl border border-gray-100'>
                        {isLoading ? (
                            <div className='flex items-center justify-center py-4'>
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                <span className='ml-3 text-gray-600'>Loading data pengguna...</span>
                            </div>
                        ) : userData ? (
                            <>
                                <div className='flex items-center gap-3 mb-3'>
                                    <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className='flex-1'>
                                        <h3 className='font-semibold text-gray-900 text-lg'>{userData.name}</h3>
                                        <p className='text-blue-600 text-sm font-medium'>{userData.no_hp}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/profile/alamat/${userData.nik}`)}
                                        className='p-2 text-gray-400 hover:text-blue-600 transition-colors'
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className='flex items-start gap-2'>
                                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p className='text-gray-600 text-sm leading-relaxed'>{userData.alamat}</p>
                                </div>
                            </>
                        ) : (
                            <div className='text-center py-4'>
                                <p className='text-red-500'>Data pengguna tidak tersedia</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className='pt-20 px-5 pb-8'>
                {/* Schedule Selection */}
                <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center'>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className='font-semibold text-gray-900'>Pilih Jadwal Penjemputan</h3>
                            <p className='text-gray-500 text-sm'>Tentukan waktu yang sesuai untuk Anda</p>
                        </div>
                    </div>
                    
                    <div className='relative'>
                        <select
                            id='schedule-select'
                            value={selectedSchedule}
                            onChange={handleScheduleChange}
                            className='w-full border-2 border-gray-200 rounded-xl p-4 text-gray-700 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 appearance-none cursor-pointer'
                        >
                            <option value="">-- Pilih jadwal penjemputan --</option>
                            {pickupSchedules.map(schedule => (
                                <option key={schedule.id} value={schedule.id}>
                                    {`${schedule.day_of_week} - ${schedule.pickup_date} | ${schedule.time_slot}`}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {pickupSchedules.length === 0 && (
                        <div className='mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200'>
                            <div className='flex items-center gap-2'>
                                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                <p className='text-yellow-800 text-sm'>Belum ada jadwal penjemputan tersedia saat ini.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Notes Section */}
                <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center'>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className='font-semibold text-gray-900'>Catatan Tambahan</h3>
                            <p className='text-gray-500 text-sm'>Informasi khusus untuk tim penjemputan</p>
                        </div>
                    </div>
                    
                    <textarea
                        className='w-full border-2 border-gray-200 rounded-xl p-4 text-gray-700 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 resize-none'
                        rows="4"
                        placeholder="Contoh: Rumah nomor 25, cat hijau, ada pagar besi..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                {/* Action Button */}
                <button
                    onClick={handlePickup}
                    disabled={!selectedSchedule || isSubmitting}
                    className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg ${
                        selectedSchedule && !isSubmitting
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white transform hover:-translate-y-1 hover:shadow-xl' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {isSubmitting ? (
                        <div className='flex items-center justify-center gap-2'>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Memproses...
                        </div>
                    ) : selectedSchedule ? (
                        <div className='flex items-center justify-center gap-2'>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Konfirmasi Penjemputan
                        </div>
                    ) : (
                        'Pilih Jadwal Terlebih Dahulu'
                    )}
                </button>

                {/* Info Section */}
                <div className='mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200'>
                    <div className='flex items-start gap-3'>
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className='font-medium text-blue-900 mb-1'>Informasi Penting</h4>
                            <ul className='text-blue-800 text-sm space-y-1'>
                                <li>• Pastikan minyak jelantah sudah dalam wadah tertutup</li>
                                <li>• Tim akan menghubungi Anda 15 menit sebelum penjemputan</li>
                                <li>• Penjemputan gratis untuk minimal 1 liter minyak jelantah</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
