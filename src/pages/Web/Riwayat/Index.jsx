import React, { useState, useEffect } from 'react';
import Navigation from '../../../components/Navigation';
import img from '../../../assets/back_arrow.png';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import dayjs from 'dayjs';
import 'dayjs/locale/id'; // Import locale Indonesia

const Riwayat = () => {
    const [activeTab, setActiveTab] = useState('setor');
    const [dataSetor, setDataSetor] = useState([]); // State untuk data setor
    const [dataPenukaran, setDataPenukaran] = useState([]); // State untuk data penukaran

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Pastikan token tersimpan di local storage
        const nik = localStorage.getItem('nik'); // Pastikan NIK pengguna juga tersimpan

        // Fungsi untuk mengambil data riwayat setor
        const fetchRiwayatSetor = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/oil-transactions-byNIK?nik=${nik}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Mengubah data API sesuai kebutuhan
                const formattedDataSetor = response.data.transactions.map((item) => ({
                    id: item.id,
                    volume: `${item.weight} Liter`,
                    status: item.points_earned > 0 ? 'Sukses' : 'Proses',
                    points: `${item.points_earned} Poin`,
                    time: item.created_at
                }));
                setDataSetor(formattedDataSetor);
            } catch (error) {
                console.error("Error fetching transaction history:", error);
            }
        };

        // Fungsi untuk mengambil data riwayat penukaran
        const fetchRiwayatPenukaran = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/reward-redemptions/${nik}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Mengubah data API sesuai kebutuhan
                const formattedDataPenukaran = response.data.map((item) => ({
                    id: item.id,
                    name: item.nama_reward, // Pastikan ini sesuai dengan respons API
                    status: item.points_ditukarkan < 0 ? 'Proses' : 'Sukses', // Atau logika sesuai status di API
                    points: `${item.points_ditukarkan} Poin`,
                    time: dayjs(item.waktu).locale('id').format('dddd, D MMMM YYYY HH:mm') // Format waktu
                }));
                setDataPenukaran(formattedDataPenukaran);
            } catch (error) {
                console.error("Error fetching redemption history:", error);
            }
        };

        fetchRiwayatSetor();
        if (activeTab === 'penukaran') {
            fetchRiwayatPenukaran();
        }
    }, [activeTab]); // Tambahkan activeTab sebagai dependensi

    // Fungsi untuk menentukan warna berdasarkan status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Sukses':
                return '#2D5D83'; // Warna sukses
            case 'Batal':
                return '#E74C3C'; // Warna batal
            case 'Proses':
            default:
                return '#FFB300'; // Warna proses (default)
        }
    };

    return (
        <div className='max-w-[550px] mx-auto bg-[#FFFFFF] shadow-xl h-[100vh] pb-[100px]'>
            <div>
                <div className='text-center flex justify-between w-[60%] items-start mt-3'>
                    <img className=' w-[40px]  ml-5 h-[40px] bg-white rounded-lg p-1 shadow-sm border' src={img} alt="" />
                    <h1 className='text-[25px] font-semibold'>Riwayat</h1>
                </div>

                <div className='flex items-center justify-center font-poppins m-auto gap-5 mt-5'>
                    <div
                        onClick={() => setActiveTab('setor')}
                        className={`cursor-pointer ${activeTab === 'setor' ? 'font-semibold' : ''}`}
                    >
                        <p>Setor Mijel</p>
                        {activeTab === 'setor' && <div className='border-b-2 border-[#2D5D83] w-full mt-1' />}
                    </div>
                    <div
                        onClick={() => setActiveTab('penukaran')}
                        className={`cursor-pointer ${activeTab === 'penukaran' ? 'font-semibold' : ''}`}
                    >
                        <p>Penukaran Mijel</p>
                        {activeTab === 'penukaran' && <div className='border-b-2 border-[#2D5D83] w-full mt-1' />}
                    </div>
                </div>

                {/* Riwayat Setor */}
                {activeTab === 'setor' && (
                    <div data-aos="fade-up" className='card-riwayat setor-mijel mt-5 flex flex-col p-5'>
                        {dataSetor.map((item) => (
                            <div
                                key={item.id}
                                className='item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105'
                            >
                                <div className='flex justify-between items-center'>
                                    <p className='text-[15px] font-semibold'>{item.volume}</p>
                                    <p
                                        className={`w-[100px] text-center text-white px-5 rounded-lg font-semibold`}
                                        style={{ backgroundColor: getStatusColor(item.status) }}
                                    >
                                        {item.status}
                                    </p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-[12px] text-[#8696BB]'>{item.points}</p>
                                    <p className='text-[14px] text-[#8696BB] m-2'>{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Riwayat Penukaran */}
                {activeTab === 'penukaran' && (
                    <div data-aos="fade-up" className='card-riwayat penukaran-mijel mt-5 flex flex-col p-5'>
                        {dataPenukaran.map((item) => (
                            <div
                                key={item.id}
                                className='item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105'
                            >
                                <div className='flex justify-between items-center'>
                                    <p className='text-[15px] font-semibold'>{item.name}</p>
                                    <p
                                        className={`w-[100px] text-center text-white px-5 rounded-lg font-semibold`}
                                        style={{ backgroundColor: getStatusColor(item.status) }}
                                    >
                                        {item.status}
                                    </p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-[12px] text-[#8696BB]'>{item.points}</p>
                                    <p className='text-[14px] text-[#8696BB] m-2'>{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Navigation />
        </div>
    );
};

export default Riwayat;
