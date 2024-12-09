import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";
import voucher from '../../../assets/voucher.png';
import { toPng } from 'html-to-image'; // Import pustaka html-to-image

const Voucher = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { qrCodeData, item_name } = location.state || {}; // Ambil data QR code dan voucher ID dari state
    const voucherRef = useRef(null); // Referensi untuk elemen yang akan diunduh
    const [qrCodeSize, setQrCodeSize] = useState(100); // Default ukuran QR Code

    useEffect(() => {
        const handleResize = () => {
            if (voucherRef.current) {
                const voucherWidth = voucherRef.current.offsetWidth;
                // Menyesuaikan ukuran QR Code dengan 10% dari lebar gambar
                setQrCodeSize(voucherWidth * 0.1); 
            }
        };

        window.addEventListener('resize', handleResize); // Tambahkan event listener resize
        handleResize(); // Panggil pertama kali untuk menghitung ukuran

        return () => {
            window.removeEventListener('resize', handleResize); // Hapus event listener saat komponen dibersihkan
        };
    }, []);

    if (!qrCodeData) {
        return <div>Error: Data QR Code tidak ditemukan</div>;
    }

    // Fungsi untuk mengunduh gambar
    const handleDownload = () => {
        if (voucherRef.current) {
            toPng(voucherRef.current, { width: 500, height: 300, style: { transform: 'scale(1)', transformOrigin: 'top left' } }) // Atur skala dan dimensi
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'voucher.png'; // Nama file unduhan
                    link.click(); // Mulai unduhan
                })
                .catch((error) => {
                    console.error('Error downloading image:', error);
                });
        }
    };

    return (
        <div className='max-w-[550px] mx-auto justify-between bg-white shadow-xl h-[100vh] pb-[30px] relative'>
            <div className='text-center flex justify-start items-start pt-3 h-6'>
                <img onClick={() => navigate(-1)} // Navigasi kembali
                    className='w-[40px] ml-5 h-[40px] bg-white rounded-lg p-1 shadow-sm border'
                    src='../src/assets/back_arrow.png'
                    alt="Back Arrow"
                />
            </div>
            
            <div className='flex justify-center mt-10 mx-10 text-center'>
                <p className='text-md'>Selamat Anda telah mendapatkan Coupon, Silahkan tukarkan ke gerai terdekat</p>
            </div>

            {/* Wrapper untuk gambar voucher */}
            <div ref={voucherRef}>
                <div className='flex justify-center relative mt-10 mx-10'>
                    {/* Gambar voucher */}
                    <img className='w-[100%] h-[100%] shadow-md' src={voucher} alt="Voucher Background" />

                    <div className="absolute  left-[40px] lg:left-[50px] top-[50%] transform -translate-y-1/2 text-white p-2 rounded">
                        <p className='text-md lg:text-2xl font-bold'>{item_name}</p>
                    </div>

                    {/* QR Code dengan posisi absolute */}
                    <div
                        className="absolute right-[38px] lg:right-[45px] top-[45%] lg:top-[50%] transform -translate-y-1/2 bg-white p-2 rounded"
                        style={{ width: qrCodeSize, height: qrCodeSize }} // Menyesuaikan ukuran QR Code
                    >
                        <QRCode value={qrCodeData} size={qrCodeSize} />
                    </div>
                </div>
            </div>

            <div className='flex flex-col m-auto justify-center mt-20'>
                <button
                    onClick={handleDownload}
                    className='mx-10 bg-green-500 text-xl text-white font-semibold py-4 px-4 rounded-lg hover:bg-green-600 transition duration-300 mb-4'
                >
                    Unduh Voucher
                </button>
                <button
                    onClick={() => navigate('/')}
                    className='mx-10 bg-blue-500 text-xl text-white font-semibold py-4 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
                >
                    Kembali ke Beranda
                </button>
            </div>
        </div>
    );
};

export default Voucher;
