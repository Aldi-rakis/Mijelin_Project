import React, { useState } from 'react'
import datadiri from '../../../assets/datadiri.png'
import bantuan from '../../../assets/bantuan.png'
import alamat from '../../../assets/alamat.png'
import pengaturan from '../../../assets/pengaturan.png'
import Navigation from '../../../components/Navigation'

const Index = () => {
    return (
        <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF]  shadow-xl h-[100%]  pb-[150px]'>

            <div className='bg-yellow-200 h-[180px]  bg-[url("../../src/assets/bg-banner.png")] w-full bg-center bg-cover relative'>
                <div className='text-center flex justify-center items-start pt-3 h-6'>
                    <a href="">
                    <img className='w-[40px] left-0 absolute ml-5 h-[40px] bg-white rounded-lg p-1 shadow-sm border' src='../src/assets/back_arrow.png' alt="" />

                    </a>
                    <h1 className='text-[25px] font-semibold text-[#fff]'>Tukar</h1>
                </div>

                {/* Card profile */}
                <div className='card-Poin relative w-[400px] max-sm:w-[300px] max-md:h-[150px] px-[20px] max-sm:top-[50%] top-[60%] left-1/2 transform -translate-x-1/2 bg-[#ffffff] shadow-lg rounded-xl border-yellow-200 z-10'>

                            {/* Foto profil bulat di tengah atas */}
                            <div className='absolute -top-[40px] left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] rounded-full border-4 border-white bg-gray-200'>
                                <img className='w-full h-full object-cover rounded-full' src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="Profile Icon" />
                            </div>


                            <div className='w-full p-3 pl-5 justify-center items-center flex pt-[40px]'>
                                <h1 className='text-[24px] font-semibold text-center'>Hi, Alan</h1>
                            </div>

                            <div className='flex justify-between text-center px-10'>
                                <div>
                                    <p className='text-[#8696BB] text-[15px]'>Poinsaya</p>
                                    <p className='text-[20px] font-semibold'>10.000</p>
                                </div>

                                <div>
                                    <p className='text-[#8696BB] text-[15px]'>terkumpul</p>
                                    <p className='text-[20px] font-semibold'>10 L</p>
                                </div>

                            </div>

                </div>
            </div>



            {/* Card profile */}

            <div className='flex flex-col justify-start items-start mt-[150px] mx-5'>

                <div className='flex justify-start items-center gap-5 mt-5 w-full rounded-lg bg-white shadow-sm px-5 py-3'>
                    <img className='w-[40px] h-[40px]' src={datadiri} alt="" />
                    <p className='text-[18px]'>Data diri</p>   
                </div>

                <div className='flex justify-start items-center gap-5 mt-5 w-full rounded-sm bg-white shadow-sm px-5 py-3'>
                 <a className='flex justify-start items-center gap-5' href="">
                 <img className='w-[40px] h-[40px]' src={alamat} alt="" />
                 <p className='text-[18px]'>Alamat Saya</p>   
                 </a>
                    
                </div>

                <div className='flex justify-start items-center gap-5 mt-5 w-full rounded-sm bg-white shadow-sm px-5 py-3'>
                    <img className='w-[40px] h-[40px]' src={bantuan} alt="" />
                    <p className='text-[18px]'>Bantuan</p>   
                </div>

                <div className='flex justify-start items-center gap-5 mt-5 w-full rounded-sm bg-white shadow-sm px-5 py-3'>
                    <img className='w-[40px] h-[40px]' src={pengaturan} alt="" />
                    <p className='text-[18px]'>Pengaturan</p>   
                </div>


            </div>
            
            <div className="flex justify-center items-center mt-5 ">
                <button className='text-black bg-none border-2 px-[50px] py-3 my-5 rounded-xl border-red-500 hover:bg-red-500 hover:text-white '>keluar</button>
            </div>


            <Navigation />



        </div>
    )
}

export default Index