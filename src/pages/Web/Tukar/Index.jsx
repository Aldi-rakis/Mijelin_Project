import React from 'react'
import minyak from '../../../assets/minyak.png'
import voucer from '../../../assets/voucer.png'
import Navigation from '../../../components/Navigation'


const Index = () => {
  return (
    <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF]  shadow-xl h-[100%] pb-[100px]'>

      <div className='bg-yellow-200 h-[180px] fixed bg-[url("../../src/assets/bg-banner.png")] w-full bg-center bg-cover relative'>
        <div className='text-center flex justify-center items-start pt-3 h-6'>
          <img className='w-[40px] left-0 absolute ml-5 h-[40px] bg-white rounded-lg p-1 shadow-sm border' src='../src/assets/back_arrow.png' alt="" />
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
  <div className='card-item flex items-center justify-center mb-8'>
    <button className='w-[100px] h-[50px] mx-2 bg-[#2D5D83] text-white rounded-2xl font-normal'>Semua</button>
    <button className='w-[100px] h-[50px] mx-2 bg-[#ffffff] text-black border rounded-2xl font-normal'>Voucher</button>
    <button className='w-[100px] h-[50px] mx-2 bg-[#ffffff] text-black border rounded-2xl font-normal'>Sembako</button>
  </div>  

  <div className='overflow-y-auto hide-scrollbar  max-h-[400px] w-full'>
    <div className='card-item flex items-center gap-5 justify-center mt-5 bg-white shadow-lg rounded-2xl max-w-max p-2 my-5 mx-10'>
      <div className='image w-[250px]'>
        <img className='object-cover' src={minyak} alt="minyak" />
      </div>

      <div className='desc'>
        <p className='text-[16px] font-semibold'>Minyak Goreng</p>
        <p className='text-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, assumenda!</p>
        <p className='text-[15px] font-semibold'>10.000 poin</p>
      </div>
    </div>

    <div className='card-item flex items-center gap-5 justify-center mt-5 bg-white shadow-lg rounded-2xl max-w-max p-2 my-5 mx-10'>
      <div className='image w-[250px]'>
        <img className='object-cover' src={minyak} alt="minyak" />
      </div>

      <div className='desc'>
        <p className='text-[16px] font-semibold'>Minyak Goreng</p>
        <p className='text-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, assumenda!</p>
        <p className='text-[15px] font-semibold'>10.000 poin</p>
      </div>
    </div>


    <div className='card-item flex items-center gap-5 justify-center mt-5 bg-white shadow-lg rounded-2xl max-w-max p-2 my-5 mx-10'>
      <div className='image w-[250px]'>
        <img className='object-cover' src={voucer} alt="voucer" />
      </div>

      <div className='desc'>
        <p className='text-[16px] font-semibold'>Voucher</p>
        <p className='text-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, assumenda!</p>
        <p className='text-[15px] font-semibold'>10.000 poin</p>
      </div>
    </div>

    <div className='card-item flex items-center gap-5 justify-center mt-5 bg-white shadow-lg rounded-2xl max-w-max p-2 my-5 mx-10'>
      <div className='image w-[250px]'>
        <img className='object-cover' src={voucer} alt="voucer" />
      </div>

      <div className='desc'>
        <p className='text-[16px] font-semibold'>Voucher</p>
        <p className='text-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, assumenda!</p>
        <p className='text-[15px] font-semibold'>10.000 poin</p>
      </div>
    </div>

    <div className='card-item flex items-center gap-5 justify-center mt-5 bg-white shadow-lg rounded-2xl max-w-max p-2 my-5 mx-10'>
      <div className='image w-[250px]'>
        <img className='object-cover' src={voucer} alt="voucer" />
      </div>

      <div className='desc'>
        <p className='text-[16px] font-semibold'>Voucher</p>
        <p className='text-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, assumenda!</p>
        <p className='text-[15px] font-semibold'>10.000 poin</p>
      </div>
    </div>

    {/* Tambahkan lebih banyak card-item di sini */}
  
  </div>
  
    
</div>


      <Navigation />



    </div>
  )
}

export default Index