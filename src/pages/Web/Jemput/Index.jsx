import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useUserStore from '../../../components/store/useUserStore';

const Index = () => {
    const [pickupSchedules, setPickupSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState('');
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
                const response = await fetch('http://localhost:8000/api/pickup-schedules');
                const result = await response.json();
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
            Swal.fire('Error', 'Pilih jadwal penjemputan terlebih dahulu!', 'error');
            return;
        }

        const payload = {
            user_id: userData.id,
            schedule_id: selectedSchedule,
            address: userData.alamat,
        };

        try {
            const response = await fetch('http://localhost:8000/api/user-pickups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                Swal.fire('Sukses', 'Penjemputan berhasil dijadwalkan!', 'success');
                setSelectedSchedule('');
                navigate('/');
            } else {
                const errorData = await response.json();
                Swal.fire('Error', errorData.message || 'Terjadi kesalahan!', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Tidak dapat menghubungi server!', 'error');
        }
    };

    const goBack = () => {
        navigate('/');
    };

    return (
        <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF] shadow-xl h-[100vh] pb-[150px]'>
            <div className='h-[180px] w-full bg-center bg-cover relative'>
                <div className='text-center flex justify-center items-center pt-3 h-12 relative'>
                    <button onClick={goBack} aria-label="Go back" className='absolute left-0 ml-5'>
                        <img
                            className='w-[40px] h-[40px] bg-white rounded-lg p-1 shadow-sm border'
                            src='../src/assets/back_arrow.png'
                            alt="Back arrow"
                        />
                    </button>
                    <h1 className='text-[25px] font-semibold text-[#000]'>Jemput</h1>
                </div>

                <div className='flex flex-col mt-[15px]'>
                    <div onClick={() => navigate(`/profile/alamat/${userData.nik}`)} className='card flex flex-col justify-start items-start mx-5 p-5 rounded-xl text-black bg-[#F8F8FF] border-[#4169E1] border-[1px] hover:shadow-lg'>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : userData ? (
                            <>
                                <div className='flex gap-3'>
                                    <p className='text-[20px] max-md:text-[15px] font-semibold'>{userData.name}</p>
                                    <span className='text-[20px] max-md:text-[15px]'>|</span>
                                    <p className='text-[20px] max-md:text-[15px] text-[#000000]'>{userData.phone}</p>
                                </div>
                                <p className='text-[15px] mt-3'>{userData.alamat}</p>
                            </>
                        ) : (
                            <p>User data not available</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='card flex flex-col mt-12 justify-start px-5 items-start rounded-xl text-black w-full'>
                <p>Atur waktu penjemputan</p>
                <div className='flex flex-col w-full mt-3'>
                    <select
                        id='schedule-select'
                        value={selectedSchedule}
                        onChange={handleScheduleChange}
                        className='border border-gray-300 rounded-lg p-2 text-lg w-full'
                    >
                        <option value="">-- Pilih jadwal penjemputan --</option>
                        {pickupSchedules.map(schedule => (
                            <option key={schedule.id} value={schedule.id}>
                                {`${schedule.day_of_week} - ${schedule.pickup_date} JAM : ${schedule.time_slot}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col w-full mt-12'>
                    <textarea
                        className='border border-gray-300 shadow-md rounded-lg p-2 text-sm h-[200px] text-black'
                        name="message"
                        defaultValue="CATATAN"
                    />
                </div>
                <button
                    onClick={handlePickup}
                    className="bottom-1 mt-5 text-white bg-[#2D5D83] hover:bg-[#254b6a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-5 text-center"
                >
                    Jemput
                </button>
            </div>
        </div>
    );
};

export default Index;
