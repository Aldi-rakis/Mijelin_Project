import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import icontengah from '../assets/motorbike.png';
import riwayat from '../assets/riwayat.png';
import riwayatHover from '../assets/riwayat-hover.png';
import home from '../assets/home.png';
import homeHover from '../assets/home-hover.png';
import tukar from '../assets/tukar.png';
import tukarHover from '../assets/tukar-hover.png';
import profile from '../assets/profile.png';
import profileHover from '../assets/profile-hover.png';


const Navigation = () => {
    const navigate = useNavigate();

    const handletoRiwayat = () => {

        navigate('/riwayat'); // navigate to riwayat
    };

    const handleToHome = () => {
        navigate('/'); // navigate to home
    };

    const handleToTukar = () => {
        navigate('/Tukar'); // navigate to Tukar
    };

    const handleToProfile = () => {
        navigate('/profile'); // navigate to profile
    };

    const handleToJemput = () => {
        navigate('/jemput'); // navigate to profile
    };


    const [isRiwayatHovered, setIsRiwayatHovered] = useState(false);
    const [isHomeHovered, setIsHomeHovered] = useState(false);
    const [isTukarHovered, setIsTukarHovered] = useState(false);
    const [isProfileHovered, setIsProfileHovered] = useState(false);

    return (
        <div className='Navigation-bar'>
            <div className="fixed z-50 h-16 max-w-[550px] justify-center items-center mx-auto shadow-xl -translate-x-1/2 bg-white border border-gray-200 w-[100%] rounded-md  bottom-0 left-1/2">
                <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                    <button
                        onClick={handleToHome}
                        data-tooltip-target="tooltip-home"
                        type="button"
                        className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 -group"
                    >
                        <img
                            className="w-6 h-6 transition duration-300"
                            src={isHomeHovered ? homeHover : home} // Gambar akan berubah saat hover
                            alt="Home"
                            onMouseEnter={() => setIsHomeHovered(true)} // Set hover untuk home
                            onMouseLeave={() => setIsHomeHovered(false)} // Kembali ke gambar default
                        />
                        <span className="sr-only">Home</span>
                    </button>

                    <button
                        onClick={handleToTukar}
                        data-tooltip-target="tooltip-Tukar"
                        type="button"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
                    >
                        <img
                            className="w-6 h-6 transition duration-300"
                            src={isTukarHovered ? tukarHover : tukar} // Gambar akan berubah saat hover
                            alt="Tukar"
                            onMouseEnter={() => setIsTukarHovered(true)} // Set hover untuk Tukar
                            onMouseLeave={() => setIsTukarHovered(false)} // Kembali ke gambar default
                        />

                        <span className="sr-only">Tukar</span>
                    </button>

                    <div className="relative flex items-center justify-center">
                        <div className="absolute  w-20 h-20 -top-10  bg-gradient-to-r from-[#26CBFF] to-[#6980FD]  rounded-full border-4 ">

                            
                        </div>

                        <Link to="/jemput" className='text-decoration-none justify-center flex'>
                        <img onClick={handleToJemput} className='absolute -top-6 z-10 inline-flex items-center justify-center w-12 h-12 font-medium  focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800' src={icontengah} alt="" />

                        </Link>
                       
                       
                        {/* <button
                data-tooltip-target="tooltip-new"
                type="button"
                className="absolute -top-5 z-10 inline-flex items-center justify-center w-12 h-12 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
                <svg
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                >
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
                <span className="sr-only">New item</span>
            </button> */}
                    </div>

                    <button
                        onClick={handletoRiwayat}
                        data-tooltip-target="tooltip-settings"
                        type="button"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
                    >

                        <img
                            className="w-6 h-6 transition duration-300"
                            src={isRiwayatHovered ? riwayatHover : riwayat} // Gambar akan berubah saat hover
                            alt="Riwayat"
                            onMouseEnter={() => setIsRiwayatHovered(true)} // Set hover untuk riwayat
                            onMouseLeave={() => setIsRiwayatHovered(false)} // Kembali ke gambar default
                        />

                        {/* <svg
                            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                        </svg> */}
                        <span className="sr-only">Settings</span>
                    </button>

                    <button
                        onClick={handleToProfile}
                        data-tooltip-target="tooltip-profile"
                        type="button"
                        className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 group"
                    >

                        <img
                            className="w-6 h-6 transition duration-300"
                            src={isProfileHovered ? profileHover : profile} // Gambar akan berubah saat hover
                            alt="Profile"
                            onMouseEnter={() => setIsProfileHovered(true)} // Set hover untuk profile
                            onMouseLeave={() => setIsProfileHovered(false)} // Kembali ke gambar default
                        />
                        <span className="sr-only">Profile</span>
                    </button>
                </div>
            </div>


        </div>
    );
};

export default Navigation;
