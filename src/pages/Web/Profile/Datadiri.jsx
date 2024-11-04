import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navigation from '../../../components/Navigation';

const Datadiri = () => {
    const navigate = useNavigate();
    const { nik } = useParams();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        no_hp: '',
    });

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/user/${nik}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [nik]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/user/${nik}`, {
                method: 'POST', // Menggunakan POST sesuai pengaturan backend
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(userData),
            });
    
            // Tambahkan log untuk respons
            console.log("Response Status:", response.status);
            console.log("Response:", response);
    
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Error Response:", errorResponse);
                throw new Error('Failed to update user data');
            }
    
            const updatedData = await response.json();
            localStorage.setItem('user', JSON.stringify(updatedData.data));
    
            await Swal.fire({
                icon: 'success',
                title: 'Data Diri Berhasil Diperbarui',
                text: 'Anda akan diarahkan kembali ke profil.',
                showConfirmButton: false,
                timer: 1500
            });
    
            navigate('/profile');
    
        } catch (error) {
            console.error("Error updating user data:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Gagal memperbarui data, silakan coba lagi.',
            });
        }
    };

    return (
        <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF] shadow-xl h-full pb-[150px]'>
            <div className='h-[180px] bg-[url("/assets/bg-banner.png")] w-full bg-center bg-cover relative'>
                <div className='text-center flex justify-center items-start pt-3 h-6'>
                    <button onClick={goBack} aria-label="Go back" className='absolute left-0 ml-5'>
                        <img
                            className='w-[40px] h-[40px] bg-white rounded-lg p-1 shadow-sm border'
                            src='/assets/back_arrow.png'
                            alt="Back arrow"
                        />
                    </button>
                    <h1 className='text-[25px] font-semibold text-[#fff]'>Data Diri</h1>
                </div>

                <div className='relative w-[400px] max-sm:w-[300px] px-[20px] top-[60%] left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl z-10'>
                    <div className='absolute -top-[30px] left-1/2 transform -translate-x-1/2 w-[120px] h-[120px] rounded-full border-4 border-white bg-gray-200'>
                        <img className='w-full h-full object-cover rounded-full' src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="Profile Icon" />
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-start items-start mt-[150px]'>
                <form className="w-full mx-auto px-10" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="name"
                            id="floating_name"
                            className="block py-2.5 px-0 w-full font-medium text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-[#8696BB] peer"
                            placeholder=" "
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                        <label
                            htmlFor="floating_name"
                            className="peer-focus:font-semibold absolute text-sm text-[#8696BB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#8696BB] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nama Lengkap
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full font-medium text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-[#8696BB] peer"
                            placeholder=" "
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-semibold absolute text-sm text-[#8696BB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#8696BB] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email Address
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="no_hp"
                            id="floating_phone"
                            className="block py-2.5 px-0 w-full font-medium text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-[#8696BB] peer"
                            placeholder=" "
                            value={userData.no_hp}
                            onChange={handleChange}
                            required
                        />
                        <label
                            htmlFor="floating_phone"
                            className="peer-focus:font-semibold absolute text-sm text-[#8696BB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#8696BB] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            No Handphone
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-5 w-full text-white bg-[#8696BB] hover:bg-[#778a9d] focus:ring-4 focus:outline-none focus:ring-[#778a9d]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Datadiri;
