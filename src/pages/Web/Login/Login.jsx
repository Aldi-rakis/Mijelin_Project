import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
const Login = () => {
    const navigate = useNavigate();

    // State untuk mengelola nilai input
    const [formData, setFormData] = useState({
        nik: '',
        password: '',
    });

    // State untuk mengelola visibilitas password
    const [showPassword, setShowPassword] = useState(false);

    // Cek jika pengguna sudah memiliki token saat komponen pertama kali dirender
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Jika token ada, arahkan ke halaman utama
            navigate('/');
        }
    }, [navigate]);

    // Fungsi untuk menangani perubahan di setiap input
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://backend-laravel.mijelin.my.id/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nik: formData.nik,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const user = data.user;

                // Menyimpan data user ke localStorage
                localStorage.setItem('user', JSON.stringify(data.user));

                // Simpan token di local storage
                localStorage.setItem('token', token);
                localStorage.setItem('uuid', user.uuid);
                localStorage.setItem('nik', user.nik);

                Swal.fire({
                    position: "top- center",
                    icon: "success",
                    title: "Login Berhasil",
                    showConfirmButton: false,
                    timer: 1500
                  });

                // Arahkan ke halaman home setelah berhasil login
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                Swal.fire({
                    position: "top- center",
                    icon: "failed",
                    title: "Login Gagal",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Terjadi kesalahan saat login. Silakan coba lagi nanti.');
        }
    };

    // Fungsi untuk toggle show/hide password
    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF] shadow-xl h-[100vh] pb-[150px] flex flex-col'>
            <div className='mt-[20px] px-5'>
                <h1 className='text-[35px] font-semibold text-[#000]'>Selamat Datang! Silakan Login</h1>

                <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <input
                            type="text"
                            id="nik"
                            className="bg-gray-50 border py-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.nik}
                            onChange={handleChange}
                            placeholder="masukan NIK anda"
                            required
                        />
                    </div>

                    <div className="mb-5 relative">
                        <input
                            type={showPassword ? 'text' : 'password'}  // Mengubah tipe input berdasarkan state
                            id="password"
                            className="bg-gray-50 border py-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Masukkan password"
                            required
                        />
                        <span
                            className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? 'Hide' : 'Show'}  {/* Tampilkan teks 'Show' atau 'Hide' */}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="mt-2 text-white bg-[#2D5D83] hover:bg-[#254b6a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-5 text-center"
                    >
                        Login
                    </button>
                </form>
            </div>

            <p className="text-gray-700 mt-2 text-center">
                Belum punya akun?{' '}
                <span
                    onClick={() => navigate('/register')}
                    className="text-[#2D5D83] cursor-pointer hover:underline"
                >
                    Daftar Sekarang..
                </span>
            </p>
        </div>
    );
};

export default Login;
