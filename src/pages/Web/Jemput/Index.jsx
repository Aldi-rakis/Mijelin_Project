import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Datepicker } from "flowbite-react";

const Index = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(""); // State for selected time
    const navigate = useNavigate();

    const handleDateChange = (date) => {
        setSelectedDate(date); // Updated to handle date directly
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value); // Update the selected time
    };

    const goBack = () => {
      navigate('/') // -1 means go back to the previous page
    };

    return (
        <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF] shadow-xl h-[100vh] pb-[150px]'>

            <div className='h-[180px] w-full bg-center bg-cover relative'>
                <div className='text-center flex justify-center items-center pt-3 h-12 relative'>
                <button onClick={goBack} aria-label="Go back" className='absolute left-0 ml-5'>
                        <img
                            className='w-[40px] h-[40px] bg-white rounded-lg p-1 shadow-sm border'
                            src='../src/assets/back_arrow.png'
                            alt="Back arrow"
                        />
                    </button>
                    <h1 className='text-[25px] font-semibold text-[#000]'>
                        Jemput
                    </h1>
                </div>
                <div className='flex flex-col mt-[15px]'>
                    <div onClick={() => navigate('/profile/alamat')} className='card flex flex-col justify-start items-start mx-5 p-5 rounded-xl text-black bg-[#F8F8FF] border-[#4169E1] border-[1px] hover:shadow-lg'>

                        <div className='flex gap-3'>
                            <p className='text-[20px] max-md:text-[15px] font-semibold'>Allan Hollan</p>
                            <span className='text-[20px] max-md:text-[15px]'>|</span>
                            <p className='text-[20px] max-md:text-[15px]   text-[#000000] '> 08123456789</p>
                            <p className='text-[20px] max-md:text-[15px] absolute right-12'>icon</p>
                        </div>

                        <p className='text-[15px] mt-3'>Jl. Komplek Permata Buah Batu No. B18, Desa Lengkong, Kec. Bojongsoang, Kab. Bandung, Jawa Barat, 40287</p>
                    </div>
                </div>
            </div>

            <div className='card flex flex-col mt-12 justify-start px-5 items-start rounded-xl text-black w-full'>
                <p>Atur waktu penjemputan</p>

                <div className='flex w-full'>
                    <Datepicker
                        className='mt-3 w-full h-[20px] text-lg '
                        style={{ lineHeight: "2rem" }}
                        onChange={handleDateChange}
                    />
                </div>

                <div className='flex flex-col w-full mt-12'>

                    <select
                        id='time-select'
                        value={selectedTime}
                        onChange={handleTimeChange}
                        className='border border-gray-300 rounded-lg p-2 text-lg'
                    >
                        <option value="" className='text-sm'>-- Pilih waktu --</option>
                        <option value="09-10" className='text-sm'>09:00 - 10:00</option>
                        <option value="10-12" className='text-sm'>10:00 - 12:00 </option>
                        <option value="12-13" className='text-sm'>12:00 - 13:00</option>
                    </select>
                </div>
                <div className='flex flex-col w-full mt-12'>
                    <textarea
                        className='border border-gray-300 shadow-md rounded-lg p-2 text-sm h-[200px] text-black'
                        name="message"
                        id=""
                        defaultValue="CATATAN" // Use defaultValue instead of children
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bottom-1 mt-5 text-white bg-[#2D5D83] hover:bg-[#254b6a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Jemput
                </button>


            </div>
        </div>
    );
}

export default Index;
