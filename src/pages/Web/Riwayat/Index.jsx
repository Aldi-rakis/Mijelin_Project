import React, { useState } from 'react';
import Navigation from '../../../components/Navigation';
import img from '../../../assets/back_arrow.png';

const Riwayat = () => {
    const [activeTab, setActiveTab] = useState('setor');

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
                    {activeTab == 'setor' && <div className='border-b-2 border-[#2D5D83] w-full mt-1' />}
                </div>
                <div 
                    onClick={() => setActiveTab('penukaran')} 
                    className={`cursor-pointer ${activeTab === 'penukaran' ? 'font-semibold' : ''}`}
                >
                    <p>Penukaran Mijel</p>
                    {activeTab == 'penukaran' && <div className='border-b-2 border-[#2D5D83] w-full mt-1' />}
                </div>
            </div>
            {/* Riwayat Setor */}
            {activeTab == 'setor' && (
                <div className='card-riwayat setor-mijel mt-5 flex flex-col p-5'>
                    {/** Card Setor - bisa diisi dengan map jika ada banyak data */}
                    <div className='item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2'>
                        <div className='flex justify-between items-center'>
                            <p className='text-[15px] font-semibold'>0.5 Liter</p>
                            <p className='bg-[#FFB300] w-[100px] text-center text-white px-5 rounded-lg font-semibold'>Proses</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-[12px] text-[#8696BB]'>0.5 Poin</p>
                            <p className='text-[14px] text-[#8696BB] m-2'>Today 12:35</p>
                        </div>
                    </div>

                    <div className='item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2'>
                        <div className='flex justify-between items-center'>
                            <p className='text-[15px] font-semibold'>0.5 Liter</p>
                            <p className='bg-[#FFB300] w-[100px] text-center text-white px-5 rounded-lg font-semibold'>Proses</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-[12px] text-[#8696BB]'>0.5 Poin</p>
                            <p className='text-[14px] text-[#8696BB] m-2'>Today 12:35</p>
                        </div>
                    </div>

                    <div className='item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2'>
                        <div className='flex justify-between items-center'>
                            <p className='text-[15px] font-semibold'>0.5 Liter</p>
                            <p className='bg-[#2D5D83] w-[100px] text-center text-white px-5 rounded-lg font-semibold'>Sukses</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-[12px] text-[#8696BB]'>0.5 Poin</p>
                            <p className='text-[14px] text-[#8696BB] m-2'>Today 12:35</p>
                        </div>
                    </div>

                    <div className='item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2'>
                    <div className='flex justify-between items-center'>
                        <p className='text-[15px] font-semibold'>0.5 Liter</p>
                        <p className='bg-[#E74C3C] w-[100px] text-center text-white px-5 rounded-lg font-semibold'>Batal</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-[12px] text-[#8696BB]'>0.5 Poin</p>
                        <p className='text-[14px] text-[#8696BB] m-2'>Today 12:35</p>
                    </div>
                </div>

                <div className='item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2'>
                    <div className='flex justify-between items-center'>
                        <p className='text-[15px] font-semibold'>0.5 Liter</p>
                        <p className='bg-[#E74C3C] w-[100px] text-center text-white px-5 rounded-lg font-semibold'>Batal</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-[12px] text-[#8696BB]'>0.5 Poin</p>
                        <p className='text-[14px] text-[#8696BB] m-2'>Today 12:35</p>
                    </div>
                </div>

                </div>
            )}

            {/* Riwayat Penukaran */}
            {activeTab == 'penukaran' && (
                <div className='card-riwayat penukaran-mijel mt-5 flex flex-col p-5'>
                    {/** Card Penukaran - bisa diisi dengan map jika ada banyak data */}
                    <div className='item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2'>
                        <div className='flex justify-between items-center'>
                            <p className='text-[15px] font-semibold'>Voucher Diskon Lengkong Market</p>
                            <p className='bg-[#FFB300] w-[100px] text-center text-white px-5 rounded-lg font-semibold'>Proses</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-[12px] text-[#8696BB]'>-10.000 Poin</p>
                            <p className='text-[14px] text-[#8696BB] m-2'>Today 12:35</p>
                        </div>
                    </div>

                    {/* Tambahkan lebih banyak kartu penukaran di sini */}

                    <div className='item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2'>
                        <div className='flex justify-between items-center'>
                            <p className='text-[15px] font-semibold'>Voucher Diskon Lengkong Market</p>
                            <p className='bg-[#FFB300] w-[100px] text-center text-white px-5 rounded-lg font-semibold'>Proses</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-[12px] text-[#8696BB]'>-10.000 Poin</p>
                            <p className='text-[14px] text-[#8696BB] m-2'>Today 12:35</p>
                        </div>
                    </div>
                </div>
            )}
            </div>
            
            <Navigation />
            
           
            
         
        </div>

        
    );
};

export default Riwayat;
