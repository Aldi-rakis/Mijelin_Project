import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import backarrow from '../../../assets/back_arrow.png';
import useUserStore from '../../../components/store/useUserStore';

const Datadiri = () => {
    const navigate = useNavigate();
    const { nik } = useParams(); // Get the nik from the URL params
    const inputref = useRef(null);

    // Access Zustand store
    const { userData, isLoading, fetchUserData, updateUserData } = useUserStore();
    const [image, setImage] = useState('');

    // Local state for form data
    const [formData, setFormData] = useState({
        name: '',
        no_hp: '',
        alamat: '',
        image_profile: null,
    });

    const goBack = () => navigate(-1);

    // Handle input change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [id]: value }));
    };

    // Handle image file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({ ...prevState, image_profile: file }));
        setImage(e.target.files[0]);
    };
    const handleImageClick = () => inputref.current.click();

    // Only fetch data if userData is null or nik changes
    useEffect(() => {
        if (!userData || userData.nik !== nik) {
            fetchUserData(nik);
        } else {
            setFormData({
                name: userData.name,
                no_hp: userData.no_hp,
                alamat: userData.alamat,
                image_profile: userData.image_profile,
            });
        }
    }, [userData, nik, fetchUserData]);

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('no_hp', formData.no_hp);
        formDataToSend.append('alamat', formData.alamat);0

        if (formData.image_profile instanceof File) {
            formDataToSend.append('image_profile', formData.image_profile);
        }

        try {
            const response = await fetch(`https://backend-laravel.mijelin.my.id/api/user/${nik}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {


                const updatedData = await response.json();
                if (updatedData.message === 'User updated successfully') {
                    updateUserData(updatedData.data);
                }
                console.log(updatedData.data);

                localStorage.setItem('user', JSON.stringify(updatedData.data));
                Swal.fire({
                    icon: 'success',
                    title: 'Data Berhasil Diubah',
                    text: 'Alamat Anda telah berhasil diperbarui.',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => navigate('/profile'));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengubah Data',
                    text: 'Terjadi kesalahan saat memperbarui data. Coba lagi nanti.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan',
                text: 'Gagal memperbarui data. Periksa koneksi Anda.',
            });
        }
    };

    if (isLoading) {
        return <div className="text-center mt-10">Loading data...</div>;
    }

    return (
        <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF] shadow-xl h-[100vh] pb-[150px]'>
            <div className='h-[180px] w-full bg-center bg-cover relative'>
                <div className='text-center flex justify-center items-center pt-3 h-12 relative'>
                    <button onClick={goBack} aria-label="Go back" className='absolute left-0 ml-5'>
                        <img
                            className='w-[40px] h-[40px] bg-white rounded-lg p-1 shadow-sm border'
                            src={backarrow}
                            alt="Back arrow"
                        />
                    </button>
                    <h1 className='text-[25px] font-semibold text-[#000]'>
                        DataDiri
                    </h1>
                </div>

                <div onClick={handleImageClick} className='flex justify-center items-center mt-5'>
                    {image ? (
                        <img className='w-[100px] h-[100px] rounded-full object-cover' src={URL.createObjectURL(image)} alt="" />
                    ) : (
                        <img className='w-[100px] h-[100px] rounded-full' src={formData.image_profile} alt="" />
                    )}
                    <input
                        type="file"
                        id="image"
                        ref={inputref}
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>

                <div className='mt-[20px] px-5'>
                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                        {/* Nama Field */}
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nama
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* No Handphone Field */}
                        <div className="mb-5">
                            <label htmlFor="no_hp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                No. Handphone
                            </label>
                            <input
                                type="tel"
                                id="no_hp"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={formData.no_hp}
                                onChange={handleChange}
                                placeholder="081234567890"
                                required
                            />
                        </div>

                        {/* Alamat Field */}
                        <div className="mb-5">
                            <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Alamat
                            </label>
                            <textarea
                                id="alamat"
                                rows="3"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={formData.alamat}
                                onChange={handleChange}
                                placeholder="Alamat lengkap Anda"
                                required
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bottom-1 mt-5 text-white bg-[#2D5D83] hover:bg-[#254b6a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-5 text-center"
                        >
                            Ubah Data Diri
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Datadiri
