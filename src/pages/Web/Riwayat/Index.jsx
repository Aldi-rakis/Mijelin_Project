import React, { useState, useEffect } from 'react';
import Navigation from '../../../components/Navigation';
import img from '../../../assets/back_arrow.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Riwayat = () => {
    const [activeTab, setActiveTab] = useState('setor');

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);


    const dataSetor = [
        {
            id: 1,
            volume: '0.5 Liter', status: 'Proses', points: '0.5 Poin', time: 'Today 12:35',
        },
        {
            id: 2,
            volume: '0.5 Liter', status: 'Proses', points: '0.5 Poin', time: 'Today 12:35',
        },
        {
            id: 3,
            volume: '0.5 Liter',status: 'Sukses', points: '0.5 Poin',  time: 'Today 12:35',
        },
        {
            id: 4, 
            volume: '0.5 Liter', status: 'Batal',points: '0.5 Poin', time: 'Today 12:35',
        },
        {
            id: 5,
            volume: '0.5 Liter',status: 'Batal',points: '0.5 Poin',time: 'Today 12:35',
        },
    ];


    const dataPenukaran = [
        {
          id: 1,
          name: 'Voucher Diskon Lengkong Market', status: 'Proses',points: '-10.000 Poin',time: 'Today 12:35',
        },
        {
          id: 2,
          name: 'Voucher Diskon Lengkong Market', status: 'Sukses', points: '-10.000 Poin', time: 'Today 12:35',
        },
        {
          id: 3,
          name: 'Voucher Diskon Lengkong Market', status: 'Batal', points: '-10.000 Poin', time: 'Today 12:35',
        },
      ];


    // Fungsi untuk menentukan warna berdasarkan status
const getStatusColor = (status) => {
    switch (status) {
      case 'Sukses':
        return '#2D5D83'; // Warna sukses
      case 'Batal':
        return '#E74C3C'; // Warna batal
      case 'Proses':
      default:
        return '#FFB300'; // Warna proses (default)
    }
  };
  

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
                     <div data-aos="fade-up" data-aos-duration="1000" data-aos-offset="200" className='card-riwayat setor-mijel mt-5 flex flex-col p-5'>
                     {dataSetor.map((item) => (
                       <div
                         key={item.id}
                         className='item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105'
                       >
                         <div className='flex justify-between items-center'>
                           <p className='text-[15px] font-semibold'>{item.volume}</p>
                           <p
                             className={`w-[100px] text-center text-white px-5 rounded-lg font-semibold`}
                             style={{ backgroundColor: getStatusColor(item.status) }}
                           >
                             {item.status}
                           </p>
                         </div>
                         <div className='flex justify-between items-center'>
                           <p className='text-[12px] text-[#8696BB]'>{item.points}</p>
                           <p className='text-[14px] text-[#8696BB] m-2'>{item.time}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                )}

                {/* Riwayat Penukaran */}
                {activeTab == 'penukaran' && (
                     <div data-aos="fade-up" data-aos-duration="1000" data-aos-offset="200" className='card-riwayat penukaran-mijel mt-5 flex flex-col p-5'>
                     {dataPenukaran.map((item) => (
                       <div
                         key={item.id}
                         className='item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105'
                       >
                         <div className='flex justify-between items-center'>
                           <p className='text-[15px] font-semibold'>{item.name}</p>
                           <p
                             className={`w-[100px] text-center text-white px-5 rounded-lg font-semibold`}
                             style={{ backgroundColor: getStatusColor(item.status) }}
                           >
                             {item.status}
                           </p>
                         </div>
                         <div className='flex justify-between items-center'>
                           <p className='text-[12px] text-[#8696BB]'>{item.points}</p>
                           <p className='text-[14px] text-[#8696BB] m-2'>{item.time}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                )}
            </div>

            <Navigation />




        </div>


    );
};

export default Riwayat;
