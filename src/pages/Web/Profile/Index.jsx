import React, { useState, useEffect } from 'react';
import datadiri from '../../../assets/datadiri.png';
import bantuan from '../../../assets/bantuan.png';
import alamat from '../../../assets/alamat.png';
import pengaturan from '../../../assets/pengaturan.png';
import Navigation from '../../../components/Navigation';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const [minyak, setMinyak] = useState(0);

    // Fetch data user saat komponen dimuat
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token'); // Mengambil token dari localStorage
            const userDataLocal = localStorage.getItem('user'); // Mengambil data user dari localStorage

            if (!token) {
                navigate('/login'); // Jika token tidak ada, arahkan ke login
                return;
            }

            if (userDataLocal) {
                // Jika data user ada di localStorage, ambil dari situ
                const user = JSON.parse(userDataLocal);
                setUserData(user); // Set data user dari localStorage
                
                setMinyak(user.points * 1); // Hitung minyak dari points
            } else {
                // Jika data user tidak ada, lakukan fetch API
                try {
                    const response = await axios.get('http://localhost:8000/api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserData(response.data); // Set data user
                    setMinyak(response.data.points * 1); // Hitung minyak dari points
                    // Simpan data user ke localStorage
                    localStorage.setItem('user', JSON.stringify(response.data));
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    navigate('/login'); // Arahkan ke login jika error
                }
            }
        };

        fetchData();
    }, [navigate]);

    const goBack = () => {
        navigate(-1); // -1 berarti kembali ke halaman sebelumnya
    };

    // Fungsi untuk log out
    const handleLogout = () => {
        // Menghapus token dan data user dari localStorage
        localStorage.removeItem('token'); // Hapus token
        localStorage.removeItem('user'); // Hapus data user saat logout
        localStorage.removeItem('nik'); // Hapus data nik saat logout
        // Redirect ke halaman login
        navigate('/login');
    };

    return (
        <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF] shadow-xl h-[100%] pb-[150px]'>
            <div className='bg-yellow-200 h-[180px] bg-[url("../../src/assets/bg-banner.png")] w-full bg-center bg-cover relative'>
                <div className='text-center flex justify-center items-start pt-3 h-6'>
                    <button onClick={goBack} aria-label="Go back" className='absolute left-0 ml-5'>
                        <img
                            className='w-[40px] h-[40px] bg-white rounded-lg p-1 shadow-sm border'
                            src='../src/assets/back_arrow.png'
                            alt="Back arrow"
                        />
                    </button>
                    <h1 className='text-[25px] font-semibold text-[#fff]'>Profil</h1>
                </div>

                <div className='card-Poin relative w-[400px] max-sm:w-[300px] max-md:h-[150px] px-[20px] max-sm:top-[50%] top-[60%] left-1/2 transform -translate-x-1/2 bg-[#ffffff] shadow-lg rounded-xl border-yellow-200 z-10'>
                    <div className='absolute -top-[40px] left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] rounded-full border-4 border-white bg-gray-200'>
                        <img className='w-full h-full object-cover rounded-full' src={userData.image_profile} alt="Profile Icon" />
                    </div>

                    <div className='w-full p-3 pl-5 justify-center items-center flex pt-[40px]'>
                        <h1 className='text-[16px] font-semibold text-center'>Hi, {userData.name || 'User'}</h1>
                    </div>

                    <div className='flex justify-between text-center md:py-5 px-10'>
                        <div>
                            <p className='text-[#8696BB] text-[15px]'>Poin saya</p>
                            <p className='text-[20px] font-semibold'>{userData.points || '0'}</p>
                        </div>

                        <div>
                            <p className='text-[#8696BB] text-[15px]'>terkumpul</p>
                            <p className='text-[20px] font-semibold'>{minyak || '0'} L</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-start items-start mt-[150px] mx-5'>
                <Link to={`/Profile/Datadiri/${userData.nik}`} className='text-decoration-none w-full'>
                    <div className='flex justify-start items-center gap-5 mt-5 w-full rounded-lg bg-white shadow-sm px-5 py-3 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105'>
                        <img className='w-[40px] h-[40px]' src={datadiri} alt="Data Diri" />
                        <p className='text-[18px]'>Data diri</p>
                    </div>
                </Link>

                <Link to={`/Profile/alamat/${userData.nik}`} className='text-decoration-none w-full'>
                    <div className='flex justify-start items-center gap-5 mt-5 w-full rounded-sm bg-white shadow-sm px-5 py-3 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105'>
                        <img className='w-[40px] h-[40px]' src={alamat} alt="Alamat" />
                        <p className='text-[18px]'>Alamat Saya</p>
                    </div>
                </Link>

                <div className='flex justify-start items-center gap-5 mt-5 w-full rounded-sm bg-white shadow-sm px-5 py-3'>
                    <img className='w-[40px] h-[40px]' src={bantuan} alt="Bantuan" />
                    <p className='text-[18px]'>Bantuan</p>
                </div>

                <div className='flex justify-start items-center gap-5 mt-5 w-full rounded-sm bg-white shadow-sm px-5 py-3'>
                    <img className='w-[40px] h-[40px]' src={pengaturan} alt="Pengaturan" />
                    <p className='text-[18px]'>Pengaturan</p>
                </div>
            </div>

            <div className="flex justify-center items-center mt-5 ">
                <button className='text-black bg-none border-2 px-[50px] py-3 my-5 rounded-xl border-red-500 hover:bg-red-500 hover:text-white ' onClick={handleLogout}>keluar</button>
            </div>

            <Navigation />
        </div>
    );
}

export default Index;
