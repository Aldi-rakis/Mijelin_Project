

import icon from '../../assets/ph_bell (1).png'
// import './App.css'
import Routes from '../../routes/routes';

function Home() {


  return (
    <>
      <Routes />
      {/* <div className='max-w-[550px] mx-auto bg-[linear-gradient(to_top,_#FFFFFF,_#DEE7F1_50%,_#B0C4DE_100%)] shadow-lg h-[100vh] '> */}
      <div className='max-w-[550px] mx-auto bg-[#FFFFFF] shadow-xl h-auto pb-[100px] '>

        {/* Profile & Notif */}
        <div className='flex justify-between pt-5 px-5'>
          <div className='flex'>
            <img className='w-[40px] h-[40px]' src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="" />
            <div className='ml-3'>
              <h1 className=' text-[24px] '> HI, Alan </h1>
              <p className='text-[#8696BB] text-[15px]'>Selamat Datang di Mijelin</p>
            </div>
          </div>

          <div>
            <img className='w-[40px]' src={icon} alt="" />
          </div>
        </div>

        {/* Poin */}
        <div className=' flex mx-5 p-5 mt-5 rounded-xl text-white justify-between  bg-[#2D5D83]'>

          <div className='p-2 items-start'>
            <p>Total poin</p>
            <p className='text-[25px] font-bold'>36.000</p>
          </div>

          <div className='flex gap-12 max-sm:gap-6'>
          <div className="flex flex-col items-center    ">
              <img className="w-[70px] max-sm:w-[50px] " src="../src/assets/icon (1).png" alt="" />
              <p className="text-center text-sm">Tukar poin</p>
            </div>

            <div className="flex flex-col items-center">
              <img className="w-[70px] max-sm:w-[50px]" src="../src/assets/icon (2).png" alt="" />
              <p className="text-center text-sm">Transaksi</p>
            </div>
          </div> 
        </div>

        {/* jadwal jemput  */}
        <div className='p-5 flex flex-col'>
          <div className='flex justify-between'>
            <p className='text-[20px] '>jadwal jemput</p>
            <p className='text-[#8696BB]'>lihat semua</p>
          </div>

          <div className='flex flex-col w-full p-5 mt-2 rounded-xl justify-center m-auto items-center h-[150px] text-center bg-[#FFFFFF] shadow-lg'>
          <img className='w-[100px]' src="../src/assets/icon jemput.png" alt="" />
            <p className='text-[#8696BB]'>Belum ada jadwal jemput</p>
          </div>    
        </div>

         {/* edukasi   */}
         <div className='p-5 flex flex-col'>
              <div className='flex justify-between'>
                <p className='text-[20px] '>jadwal jemput</p>
                <p className='text-[#8696BB]'>lihat semua</p>
              </div>

              <div className='flex flex-col w-full  mt-2 rounded-xl justify-center m-auto items-center  bg-[#FFFFFF] '>
                <div className='flex bg-white shadow-2xl rounded-lg mt-2'>           
                    <div className='w-[150px] h-[1`px] min-xl:w-[150px] m-2 '>
                    <img className=' rounded-lg bg-cover' src="../src/assets/img_edukasi.png" alt="" />
                    </div>
                

                      <div className='px-3 mt-4 flex flex-col'>
                      <p className='text-[13px]'>Bahaya Minyak Jelantah Bagi Lingkungan</p>
                    
                      <p className='text-[12px] mt-6'> Detik.com <span>  Sep 9, 2022</span></p>                 
                      </div>

                </div>
              </div>  

                  <div className='flex flex-col w-full  mt-2  rounded-xl justify-center m-auto items-center  bg-[#FFFFFF] '>
                <div className='flex bg-white shadow-2xl rounded-lg '>           
                    <div className='w-[150px] h-[1`px] min-xl:w-[150px] m-2 '>
                    <img className=' rounded-lg bg-cover' src="../src/assets/img_edukasi.png" alt="" />
                    </div>
                

                      <div className='px-3 mt-4 flex flex-col'>
                      <p className='text-[13px]'>Bahaya Minyak Jelantah Bagi Lingkungan</p>
                    
                      <p className='text-[12px] mt-6'> Detik.com <span>  Sep 9, 2022</span></p>                 
                      </div>

                </div>
              </div>  

              <div className='flex flex-col w-full mt-2 rounded-xl justify-center m-auto items-center  bg-[#FFFFFF] '>
                <div className='flex bg-white shadow-2xl rounded-lg '>           
                    <div className='w-[150px] h-[1`px] min-xl:w-[150px] m-2 '>
                    <img className=' rounded-lg bg-cover' src="../src/assets/img_edukasi.png" alt="" />
                    </div>
                

                      <div className='px-3 mt-4 flex flex-col'>
                      <p className='text-[13px]'>Bahaya Minyak Jelantah Bagi Lingkungan</p>
                    
                      <p className='text-[12px] mt-6'> Detik.com <span>  Sep 9, 2022</span></p>                 
                      </div>

                </div>
              </div>     
        </div>

        {/* Navigation bar  */}
        <div className='Navigation-bar'>
          <div class="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-1 left-1/2 ">
              <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
                  <button data-tooltip-target="tooltip-home" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-[#25C5DF] group">
                      <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                      </svg>
                      <span class="sr-only">Home</span>
                  </button>
                  <div id="tooltip-home" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                      Home
                      <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <button data-tooltip-target="tooltip-wallet" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-[#25C5DF] group">
                      <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z"/>
                          <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z"/>
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
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
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
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
                      </svg>
                      <span class="sr-only">Settings</span>
                  </button>
                  <div id="tooltip-settings" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                      Settings
                      <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <button data-tooltip-target="tooltip-profile" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-[#25C5DF] group">
                      <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#25C5DF] dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
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

    </>
  )
}

export default Home
