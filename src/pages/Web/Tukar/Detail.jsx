import React, { useState } from 'react';
import minyak from '../../../assets/minyak.png';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

const Detailtukar = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // -1 berarti kembali ke halaman sebelumnya
    };

    const handleSubmit = () => {
        if (selectedDate) {
            const formattedDate = selectedDate.format('DD MMMM YYYY'); // Format tanggal
            alert(`Tanggal pengiriman yang dipilih: ${formattedDate}`);
            // Di sini Anda bisa menambahkan logika untuk mengirimkan tanggal ke server
        } else {
            alert('Silakan pilih tanggal!');
        }
    };

    return (
        <div className='max-w-[550px] mx-auto bg-white shadow-xl h-[100vh] pb-[30px]'>
            <div className='text-center flex justify-start items-start pt-3 h-6'>
                <img onClick={goBack}
                    className='w-[40px] ml-5 h-[40px] bg-white rounded-lg p-1 shadow-sm border'
                    src='../src/assets/back_arrow.png'
                    alt="Back Arrow"
                />
            </div>

            <div className='flex justify-center items-center pt-5'>
                <img className='w-[200px]' src={minyak} alt="Minyak Goreng" />
            </div>

            <div className='flex flex-col justify-start items-start pt-5 px-5 gap-y-3'>
                <h3 className='text-[24px] font-semibold text-center'>Minyak Goreng 1 Liter</h3>
                <p className='text-[#8696BB] text-[15px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ipsum?</p>
                <p className='font-bold text-[25px] opacity-65'>20.000 Poin</p>
            </div>

            <div className='flex flex-col justify-start items-start pt-5 px-5'>
                <p className='text-[16px] mb-2 font-semibold text-center'>Atur Waktu Pengiriman</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Pilih Tanggal"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)} // Mengatur nilai tanggal yang dipilih
                        renderInput={(params) => (
                            <div className='mt-4 w-full'>
                                <input {...params} className='p-2 border bg-slate-900 border-gray-300 rounded-lg w-full' />
                            </div>
                        )}
                    />
                </LocalizationProvider>
            </div>

            <div className='flex flex-col w-full justify-center mt-12'>
                <p className='text-[16px] mb-2 font-semibold text-start mx-4'> Poin : 36.000</p>
                <button
                    onClick={handleSubmit}
                    className='w-[90%] mx-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
                >
                    Kirim
                </button>
            </div>
        </div>
    );
};

export default Detailtukar;
