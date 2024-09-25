import React from 'react'

const Navigation = () => {
    return (
        <div>

            {/* Navigation bar  */}
            <div className='Navigation-bar'>
                <div class="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-1 left-1/2 ">
                    <div class="grid h-full max-w-lg grid-cols-5 mx-auto">

                        <button data-tooltip-target="tooltip-home" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-[#25C5DF] group">
                            <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>


                            <span class="sr-only">Home</span>
                        </button>
                        <div id="tooltip-home" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Home
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>

                        <button data-tooltip-target="tooltip-wallet" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-[#25C5DF] group">
                            <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.0475 3.69231V6.38462H12.6864C13.2083 6.38462 13.7185 6.22674 14.1525 5.93091C14.5864 5.63503 14.9247 5.21456 15.1244 4.72258C15.3241 4.23068 15.3764 3.68933 15.2746 3.16708C15.1728 2.64483 14.9214 2.16511 14.5524 1.78856C14.1833 1.41205 13.7131 1.15564 13.2012 1.05174C12.6893 0.947852 12.1587 1.00115 11.6766 1.20495C11.1943 1.4087 10.7822 1.7538 10.4922 2.19652C10.2022 2.63929 10.0475 3.1598 10.0475 3.69231Z" stroke="#8696BB" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                <path d="M10.0478 3.69231V6.38462H7.40894C6.887 6.38462 6.37682 6.22674 5.94284 5.93091C5.5089 5.63503 5.1706 5.21456 4.97093 4.72258C4.77118 4.23068 4.71889 3.68933 4.82072 3.16708C4.92256 2.64483 5.17388 2.16511 5.54296 1.78856C5.912 1.41205 6.3822 1.15564 6.89409 1.05174C7.40603 0.947852 7.93663 1.00115 8.41877 1.20495C8.90099 1.4087 9.31312 1.7538 9.60308 2.19652C9.89305 2.63929 10.0478 3.1598 10.0478 3.69231Z" stroke="#8696BB" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                <path d="M17.5873 6.38452H2.50794C1.67512 6.38452 1 7.0733 1 7.92298V10.2307C1 11.0803 1.67512 11.7691 2.50794 11.7691H17.5873C18.4201 11.7691 19.0952 11.0804 19.0952 10.2307V7.92298C19.0952 7.0733 18.4201 6.38452 17.5873 6.38452Z" stroke="#8696BB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.5871 11.769V18.6921C17.5871 19.3042 17.3488 19.8911 16.9247 20.3239C16.5005 20.7567 15.9252 20.9998 15.3252 20.9998H4.76972C4.16982 20.9998 3.59451 20.7567 3.17027 20.3239C2.74608 19.8911 2.50781 19.3042 2.50781 18.6921V11.769" stroke="#8696BB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.0475 6.38452V20.9999" stroke="#8696BB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span class="sr-only">Wallet</span>
                        </button>
                        <div id="tooltip-wallet" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Wallet
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <div class="flex items-center justify-center">
                            <button data-tooltip-target="tooltip-new" type="button" class="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                                <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                                <span class="sr-only">New item</span>
                            </button>
                        </div>
                        <div id="tooltip-new" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Create new item
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <button data-tooltip-target="tooltip-settings" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-[#25C5DF] group">
                            <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                            </svg>
                            <span class="sr-only">Settings</span>
                        </button>
                        <div id="tooltip-settings" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Settings
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <button data-tooltip-target="tooltip-profile" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-[#25C5DF] group">
                            <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            <span class="sr-only">Profile</span>
                        </button>
                        <div id="tooltip-profile" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Profile
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navigation