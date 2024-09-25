import React from 'react';
import { useNavigate } from "react-router-dom";

const Navigation = () => {
    const navigate = useNavigate();

    const handletoRiwayat = () => {
        navigate('/riwayat'); // navigate to riwayat
    };

    const handleToHome = () => {
        navigate('/'); // navigate to home
    };

    const handleToWallet = () => {
        navigate('/wallet'); // navigate to wallet
    };

    const handleToProfile = () => {
        navigate('/profile'); // navigate to profile
    };

    return (
        <div className='Navigation-bar'>
            <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-1 left-1/2">
                <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                    <button 
                        onClick={handleToHome}
                        data-tooltip-target="tooltip-home" 
                        type="button" 
                        className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-[#25C5DF] group"
                    >
                        <svg 
                            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white" 
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                        >
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        <span className="sr-only">Home</span>
                    </button>
                    <button 
                        onClick={handleToWallet}
                        data-tooltip-target="tooltip-wallet" 
                        type="button" 
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-[#25C5DF] group"
                    >
                        <svg 
                            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white" 
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                        >
                            <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
                            <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
                        </svg>
                        <span className="sr-only">Wallet</span>
                    </button>
                    <div className="flex items-center justify-center">
                        <button 
                            data-tooltip-target="tooltip-new" 
                            type="button" 
                            className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
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
                        </button>
                    </div>
                    <button 
                        onClick={handletoRiwayat} 
                        data-tooltip-target="tooltip-settings" 
                        type="button" 
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-[#25C5DF] group"
                    >
                        <svg 
                            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white" 
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 20 20"
                        >
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                        </svg>
                        <span className="sr-only">Settings</span>
                    </button>
                    <button 
                        onClick={handleToProfile} 
                        data-tooltip-target="tooltip-profile" 
                        type="button" 
                        className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-[#25C5DF] group"
                    >
                        <svg 
                            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white" 
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <span className="sr-only">Profile</span>
                    </button>
                </div>
            </div>
           
        </div>
    );
};

export default Navigation;
