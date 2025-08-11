import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    // State untuk mengelola nilai input
    const [formData, setFormData] = useState({
        name: '',
        nik: '',
        no_hp: '',
        password: '',
        confirm_password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    // Fungsi untuk menangani perubahan di setiap input
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };


    // Cek jika pengguna sudah memiliki token saat komponen pertama kali dirender
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Jika token ada, arahkan ke halaman utama
            navigate('/');
        }
    }, [navigate]);

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi sebelum mengirim data ke API
        if (formData.password.length < 5) {
            alert('Password harus memiliki minimal 5 karakter!');
            return;
        }

        if (formData.password !== formData.confirm_password) {
            alert('Password dan konfirmasi password tidak sama!');
            return;
        }

        try {
            const response = await fetch('https://api-mijelin.rakis.my.id/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    nik: formData.nik,
                    no_hp: formData.no_hp,
                    password: formData.password,
                    confirm_password: formData.confirm_password
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Asumsi bahwa API mengembalikan token saat registrasi berhasil
                const token = data.token;

                // Simpan token di local storage atau session storage
                localStorage.setItem('token', token);

                // Tampilkan pop-up sukses registrasi
                alert('Akun Anda berhasil terdaftar!');

                // Arahkan ke halaman home setelah berhasil login
                navigate('/');
            } else {
                // Jika response tidak berhasil
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                alert('Registrasi gagal. Silakan cek kembali data Anda.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Terjadi kesalahan saat registrasi. Silakan coba lagi nanti.');
        }
    };

    // Fungsi untuk toggle visibilitas password
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    // Fungsi untuk navigasi ke halaman login
    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF] shadow-xl h-[100vh] pb-[150px] flex flex-col'>
            <div className='h-[180px] w-full bg-center bg-cover relative'>
                <div className='text-center flex justify-center items-center pt-3 h-12 relative'>
                    <button onClick={() => navigate(-1)} aria-label="Go back" className='absolute left-0 ml-5'>
                        <img
                            className='w-[40px] h-[40px] bg-white rounded-lg p-1 shadow-sm border'
                            src='../src/assets/back_arrow.png'
                            alt="Back arrow"
                        />
                    </button>
                </div>

                <div className='mt-[20px] px-5'>
                    <h1 className='text-[35px] font-semibold text-[#000]'>Halo! Yuk daftar untuk memulai</h1>

                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                        <div className="mb-5 mt-5">
                            <input
                                type="text"
                                id="name"
                                className="bg-gray-50 border py-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nama Lengkap"
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <input
                                type="text"
                                id="nik"
                                className="bg-gray-50 border py-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={formData.nik}
                                onChange={handleChange}
                                placeholder="NIK"
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <input
                                type="text"
                                id="no_hp"
                                className="bg-gray-50 border py-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={formData.no_hp}
                                onChange={handleChange}
                                placeholder="No. Handphone"
                                required
                            />
                        </div>

                        <div className="mb-5 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="bg-gray-50 py-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Masukkan password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <div className="mb-2 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirm_password"
                                className="bg-gray-50 py-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                placeholder="Ulangi password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="mt-2 text-white bg-[#2D5D83] hover:bg-[#254b6a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-5 text-center"
                        >
                            Register
                        </button>
                    </form>
                </div>

                <p className="text-gray-700 mt-2 text-center">
                    Sudah punya akun?{' '}
                    <span
                        onClick={navigateToLogin}
                        className="text-[#2D5D83] cursor-pointer hover:underline"
                    >
                        Login Sekarang..
                    </span>
                </p>
            </div>

            <div className="mt-auto mb-5 text-center">
                
            </div>
        </div>
    );
};

export default Register;
