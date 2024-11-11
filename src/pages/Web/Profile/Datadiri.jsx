import React, { useState,useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import backarrow from '../../../assets/back_arrow.png';

const Datadiri = () => {
    const navigate = useNavigate();
    const { nik } = useParams(); // Get the nik from the URL params
    const inputref = useRef(null);
    const [image, setImage] = useState('');

    // State untuk mengelola nilai input dan status loading
    const [formData, setFormData] = useState({
        name: '',
        no_hp: '',
        alamat: '',
        image_profile: null, // State for the image file
    });
    const [isLoading, setIsLoading] = useState(true);

    const goBack = () => {
        navigate(-1); // -1 berarti kembali ke halaman sebelumnya
    };

    // Fungsi untuk menangani perubahan di setiap input
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Fungsi untuk menangani perubahan pada input file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            image_profile: file,
        }));
        setImage(e.target.files[0]); // Ambil file yang diupload
    };
    const handleImageClick = () => {
        inputref.current.click();
    };

    // Fetching data alamat dari backend saat komponen pertama kali di-mount
    useEffect(() => {
        const fetchAlamatData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/user/${nik}`); // Endpoint to get user data

                if (response.ok) {
                    const data = await response.json();
                    // setImage(data.image_profile);
                    setFormData({
                        name: data.name,
                        no_hp: data.no_hp,
                        alamat: data.alamat,
                        image_profile: data.image_profile, // Reset image_profile when fetching data
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Mengambil Data',
                        text: 'Tidak dapat mengambil data alamat. Coba lagi nanti.',
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Gagal mengambil data alamat. Periksa koneksi Anda.',
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlamatData();
    }, [nik]);

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('no_hp', formData.no_hp);
        formDataToSend.append('alamat', formData.alamat);

        // Hanya tambahkan image_profile jika ada file yang dipilih
        if (formData.image_profile instanceof File) {
            formDataToSend.append('image_profile', formData.image_profile);
        }

        // Log the contents of formData to check the values being sent
        for (let [key, value] of formDataToSend.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await fetch(`http://localhost:8000/api/user/${nik}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formDataToSend, // Kirim FormData
            });

            if (response.ok) {
                const updatedData = await response.json();
                console.log("User data updated successfully:", updatedData);

                // Update localStorage with the new user data
                localStorage.setItem('user', JSON.stringify(updatedData.data));
                Swal.fire({
                    icon: 'success',
                    title: 'Data Berhasil Diubah',
                    text: 'Alamat Anda telah berhasil diperbarui.',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    // Arahkan ke halaman profil setelah SweetAlert ditutup
                    navigate('/profile');
                });
            } else {
                console.error('Response error:', response.status, response.statusText);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengubah Data',
                    text: 'Terjadi kesalahan saat memperbarui data. Coba lagi nanti.',
                });
            }
        } catch (error) {
            console.error('Fetch error:', error);
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
                    { image ? <img className='w-[100px] h-[100px] rounded-full  ' src={URL.createObjectURL(image)} alt="" /> : image ? <img className='w-[100px] h-[100px] rounded-full  ' src={image} alt="" /> : <img className='w-[100px] h-[100px] rounded-full  ' src={formData.image_profile} alt="" />}
                    {/* <img className='w-[100px] h-[100px] rounded-full  ' src={image} alt="" /> */}
                    <input type="file"
                                id="image"
                                ref={inputref}
                                accept="image/png, image/jpeg" onChange={handleFileChange} style={{ display: 'none' }}  />
                        
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={formData.alamat}
                                onChange={handleChange}
                                placeholder="Jl. Komplek Permata Buah Batu No. B18, Lengkong, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat, 40287"
                                required
                            ></textarea>
                        </div>

                        {/* Image Profile Field
                        <div className="mb-5">
                            <label htmlFor="image_profile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Upload Foto Profil
                            </label>
                            <input
                                type="file"
                                id="image_profile"
                                accept="image/*" // Only accept image files
                                onChange={handleFileChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div> */}

                       
                            

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bottom-1 mt-5 text-white bg-[#2D5D83] hover:bg-[#254b6a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Ubah Data Diri
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Datadiri;
