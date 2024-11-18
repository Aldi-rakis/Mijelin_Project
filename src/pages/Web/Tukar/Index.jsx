import React, { useState } from 'react'
import minyak from '../../../assets/minyak.png'
import voucer from '../../../assets/voucer.png'
import Navigation from '../../../components/Navigation'
import { useNavigate } from 'react-router-dom'

const Index = () => {

  const [category, setCategory] = useState('Semua'); // State untuk melacak kategori yang dipilih

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  const handletodetail = () => {
    navigate('/Tukar/Detail');
  }


    // Data hadiah
    const items = [
      { id: 1, name: 'Minyak Goreng', description: 'Lorem ipsum dolor sit psu psu psum dolor  psu psum dolor  psu psum dolor sit ametsit ame', points: '10.000 poin', image: minyak, category: 'Sembako' },
      { id: 2, name: 'Voucher', description: 'Lorem ipsum dolor sit amet...', points: '10.000 poin', image: voucer, category: 'Voucher' },
      { id: 3, name: 'Voucher', description: 'Lorem ipsum dolor sit amet...', points: '10.000 poin', image: voucer, category: 'Voucher' },
      { id: 4, name: 'Minyak Goreng', description: 'Lorem ipsum dolor sit amet...', points: '10.000 poin', image: minyak, category: 'Sembako' }
      // Tambahkan lebih banyak item jika diperlukan
    ];

    // Fungsi untuk menampilkan item berdasarkan kategori yang dipilih
  const filteredItems = items.filter((item) => {
    if (category === 'Semua') return true; // Tampilkan semua item jika kpsum dolor sitategori adalah 'Semua'
    return item.category === category; // Filter berdasarkan kategori
  });

 

  
  return (
    <div className='max-w-[550px] justify-center min-h-[100vh] items-center mx-auto bg-[#FFFFFF]  shadow-xl h-[100%] pb-[100px]'>

      <div className='bg-yellow-200 h-[180px]  bg-[url("../../src/assets/bg-banner.png")] w-full bg-center bg-cover relative'>
        <div className='text-center flex justify-center items-start pt-3 h-6'>
          <img onClick={goBack} className='w-[40px] left-0 absolute ml-5 h-[40px] bg-white rounded-lg p-1 shadow-sm border' src='../src/assets/back_arrow.png' alt="" />
          <h1 className='text-[25px] font-semibold text-[#fff]'>Tukar</h1>
        </div>

        {/* Card Poin */}
        <div className='card-Poin absolute w-[400px] max-sm:w-[300px] max-md:h-[200px] px-[20px] max-sm:top-[50%]  top-[60%] left-1/2 transform -translate-x-1/2 bg-[#ffffff] shadow-lg rounded-xl border-yellow-200 z-10'>
          <div className='flex items-start justify-start'>
            <div className='w-[70px] my-5 mx-3 '>
            <img className='' src="../src/assets/loyalty.png" alt="" />

            </div>
            <div className='mt-5'>
              <p className='text-[20px]'>Total Poin</p>
              <p className='text-[30px] font-semibold'>6.000</p>
            </div>
          </div>
          <div className='w-full p-3 pl-5'>
            <p className='text-[15px] text-[#000000] opacity-50 font-semibold'>Kumpulkan poin dan tukarkan dengan berbagai penawaran menarik!</p>

          </div>
        </div>
      </div>

      {/* card hadiah */}

      <div className='card-hadiah mt-[150px] flex flex-col items-center px-3'>
      {/* Button untuk memilih kategori */}
      <div className='card-item flex items-center justify-center mb-8'>
        <button onClick={() => setCategory('Semua')} className={`w-[100px] h-[50px] mx-2 ${category === 'Semua' ? 'bg-[#2D5D83] text-white' : 'bg-[#ffffff] text-black'} rounded-2xl font-normal`}>Semua</button>
        <button onClick={() => setCategory('Voucher')} className={`w-[100px] h-[50px] mx-2 ${category === 'Voucher' ? 'bg-[#2D5D83] text-white' : 'bg-[#ffffff] text-black'} rounded-2xl font-normal`}>Voucher</button>
        <button onClick={() => setCategory('Sembako')} className={`w-[100px] h-[50px] mx-2 ${category === 'Sembako' ? 'bg-[#2D5D83] text-white' : 'bg-[#ffffff] text-black'} rounded-2xl font-normal`}>Sembako</button>
      </div>  

      {/* Menampilkan item berdasarkan kategori yang dipilih */}
      <div className='overflow-y-auto hide-scrollbar max-h-[400px] w-full'>
  {filteredItems.map((item) => (
    <div
    onClick={handletodetail}
      key={item.id}
      className='card-item flex items-center gap-1 justify-center mt-5 bg-white shadow-lg rounded-2xl max-w-max p-2 my-5 mx-auto hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105'
    >
      <div className='image w-[130px] h-[100px]'>
        <img className='object-cover w-full h-full' src={item.image} alt={item.name} />
      </div>

      <div className='desc w-[200px] ml-5'>
        <p className='text-[16px] font-semibold'>{item.name}</p>
        <p className='text-[14px]'>{item.description}</p>
        <p className='text-[15px] font-semibold'>{item.points}</p>
      </div>
    </div>
  ))}
</div>


     
    </div>

      <Navigation />



    </div>
  )
}

export default Index