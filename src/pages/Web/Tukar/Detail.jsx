import React, { useState, useEffect } from 'react';
import minyak from '../../../assets/minyak.png';
import axios from 'axios';  // Import axios untuk melakukan panggilan API
import { useNavigate, useParams } from 'react-router-dom';

const Detailtukar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [rewardDetail, setRewardDetail] = useState(null); // State untuk menyimpan detail reward
    const [loading, setLoading] = useState(true); // State untuk loading indicator
    const { id } = useParams(); // Mengambil parameter id dari URL
    const navigate = useNavigate(); // Hook untuk navigasi
    const nik = localStorage.getItem('nik');

    // Panggilan API untuk mendapatkan detail reward
    useEffect(() => {
        const fetchRewardDetail = async () => {
            try {
                const response = await axios.get(`http://backend-laravel.mijelin.my.id/api/rewards/${id}`);
                setRewardDetail(response.data); // Menyimpan data reward ke state
                setLoading(false); // Set loading false setelah data berhasil didapatkan
            } catch (error) {
                console.error('Error fetching reward detail:', error);
                setLoading(false); // Set loading false jika ada error
            }
        };

        fetchRewardDetail();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Tampilkan loading sementara data masih diambil
    }

    // Fungsi untuk menangani klik tombol "Tukar"
    const handleTukar = async () => {
        try {
            // Panggil API untuk menukar reward dan menghasilkan voucher
            const response = await axios.post('http://backend-laravel.mijelin.my.id/api/reward-redemptions', {
                reward_id: rewardDetail.id,
                nik: nik,
            });

            // Cek response data
            if (response.data.message === "Reward berhasil ditukarkan") {
                console.log(response.data);
                const qrCodeData = response.data.voucher.voucher_code;
                const item_name = response.data.voucher.item_name;
                // console.log(qrCodeData);
              
                // Ambil data QR code dari respons

                // Navigasi ke halaman voucher dengan membawa data QR code
                navigate(`/voucher`, { state: { qrCodeData, item_name} });
            } else {
                // Tangani kondisi jika poin tidak cukup
                if (response.data.message === "Maaf Poin Anda tidak cukup") {
                    alert("Poin Anda tidak cukup untuk menukar reward ini.");
                } else {
                    alert(response.data.message || 'Gagal menukar reward, coba lagi.');
                }
            }
        } catch (error) {
            console.error('Error exchanging reward:', error);

            // Tampilkan pesan error dari server jika tersedia
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Terjadi kesalahan, coba lagi.');
            }
        }
    };


    return (
        <div className='max-w-[550px] mx-auto bg-white shadow-xl h-[100vh] pb-[30px]'>
            <div className='text-center flex justify-start items-start pt-3 h-6'>
                <img onClick={() => navigate(-1)} // Menggunakan navigate untuk kembali
                    className='w-[40px] ml-5 h-[40px] bg-white rounded-lg p-1 shadow-sm border'
                    src='../src/assets/back_arrow.png'
                    alt="Back Arrow"
                />
            </div>

            <div className='flex justify-center items-center pt-5'>
                <img className='w-[200px]' src={minyak} alt="Minyak Goreng" />
            </div>

            <div className='flex flex-col justify-start items-start mt-20 px-5 gap-y-3'>
                <h3 className='text-[24px] font-semibold text-center'>{rewardDetail?.name}</h3>
                <p className='text-[#8696BB] text-[15px]'>{rewardDetail?.desc}</p>
                <p className='font-bold text-[25px] opacity-65'>{rewardDetail?.point_cost} Poin</p>
            </div>

            <div className='flex flex-col w-full justify-center mt-12'>
                <p className='text-[16px] mb-4 font-semibold text-start mx-4'> Poin : {rewardDetail?.points}</p>
                <button
                    onClick={handleTukar}
                    className='w-[90%] mx-auto bg-blue-500 text-xl text-white font-semibold py-4 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
                >
                    Tukar
                </button>
            </div>
        </div>
    );
};

export default Detailtukar;
