import React from 'react'
import Navigation from '../../../components/Navigation'

const Datadiri = () => {
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
                    <div className='absolute -top-[30px] left-1/2 transform -translate-x-1/2 w-[120px] h-[120px] rounded-full border-4 border-white bg-gray-200'>
                        <img className='w-full h-full object-cover rounded-full' src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="Profile Icon" />
                    </div>

                </div>
            </div>



            {/* Card profile */}

            {/* <div className='flex flex-col justify-start items-start mt-[150px] mx-5'>

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


            </div> */}

            <div className='flex flex-col justify-start items-start mt-[150px]'>


                <form className="w-full mx-auto px-10">
                    {/* <!-- Nama Lengkap --> */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="floating_name"
                            id="floating_name"
                            className="block py-2.5 px-0 w-full font-medium text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#8696BB] focus:outline-none focus:ring-0 focus:border-[#8696BB] peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_name"
                            className="peer-focus:font-semibold absolute text-sm text-[#8696BB] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#8696BB] peer-focus:dark:text-[#8696BB] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nama Lengkap
                        </label>
                    </div>

                    {/* <!-- Email --> */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="floating_email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full font-medium text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#8696BB] focus:outline-none focus:ring-0 focus:border-[#8696BB] peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-semibold absolute text-sm text-[#8696BB] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#8696BB] peer-focus:dark:text-[#8696BB] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email Address
                        </label>
                    </div>

                    {/* <!-- NIK --> */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="floating_nik"
                            id="floating_nik"
                            className="block py-2.5 px-0 w-full font-medium text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#8696BB] focus:outline-none focus:ring-0 focus:border-[#8696BB] peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_nik"
                            className="peer-focus:font-semibold absolute text-sm text-[#8696BB] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#8696BB] peer-focus:dark:text-[#8696BB] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            NIK
                        </label>
                    </div>

                    {/* <!-- No Handphone --> */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="floating_phone"
                            id="floating_phone"
                            className="block py-2.5 px-0 w-full font-medium text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#8696BB] focus:outline-none focus:ring-0 focus:border-[#8696BB] peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_phone"
                            className="peer-focus:font-semibold absolute text-sm text-[#8696BB] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#8696BB] peer-focus:dark:text-[#8696BB] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            No Handphone
                        </label>
                    </div>

                    {/* <!-- Submit Button --> */}
                    <button
                        type="submit"
                        className="bottom-1 text-white bg-[#2D5D83] hover:bg-[#254b6a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Ubah Data Diri
                    </button>
                </form>


            </div>


            



        </div>
    )
}

export default Datadiri