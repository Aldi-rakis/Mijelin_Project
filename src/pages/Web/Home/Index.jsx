

import Navigation from '../../../components/Navigation';
// import './App.css'
import React from 'react';
import Userheader from '../../../components/Userheader';
// import Routes from '../../routes/routes';

function Home() {


  return (
    <React.Fragment>
     
      {/* <div className='max-w-[550px] mx-auto bg-[linear-gradient(to_top,_#FFFFFF,_#DEE7F1_50%,_#B0C4DE_100%)] shadow-lg h-[100vh] '> */}
      <div className='max-w-[550px] mx-auto bg-[#FFFFFF] shadow-xl h-auto pb-[100px]'>

        {/* Profile & Notif */}
       <Userheader />

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
        <Navigation />
       

      </div>

      </React.Fragment>

  )
}

export default Home
