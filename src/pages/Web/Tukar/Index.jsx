import React, { useState,useEffect } from 'react'
import minyak from '../../../assets/minyak.png'
import voucer from '../../../assets/voucer.png'
import Navigation from '../../../components/Navigation'
import { Link, useNavigate } from 'react-router-dom'
import useRewardStore from '../../..//components/store/useRewardStore';
import useUserStore from '../../..//components/store/useUserStore';
import bgImage from '../../../assets/bg-banner.png'; // Impor gambar


const Index = () => {

  // const [category, setCategory] = useState('Semua'); // State untuk melacak kategori yang dipilih

  const navigate = useNavigate();
  const { rewards, fetchRewards } = useRewardStore();
  const { userData, fetchUserData } = useUserStore(); // Ambil data dan fungsi fetch dari store
  const nik = localStorage.getItem('nik');

 
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) { // Fetch hanya jika data belum ada
      fetchUserData(nik, navigate);
    }
    fetchRewards(); // Fetch data rewards saat komponen pertama kali dimuat
  }, [userData, fetchUserData, fetchRewards, nik, navigate]);

  const handletodetail = () => {
    navigate('/Tukar/Detail');
  }



 

  
  return (
    <div className='max-w-[550px] justify-center min-h-[100vh] items-center mx-auto bg-[#FFFFFF]  shadow-xl h-[100%] pb-[100px]'>

      <div className='bg-yellow-200 h-[180px]   w-full bg-center bg-cover relative'
      style={{ backgroundImage: `url(${bgImage})` }}>
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
              <p className='text-[30px] font-semibold'>{userData?.points}</p>
            </div>
          </div>
          <div className='w-full p-3 pl-5'>
            <p className='text-[15px] text-[#000000] opacity-50 font-semibold'>Kumpulkan poin dan tukarkan dengan berbagai penawaran menarik!</p>

          </div>
        </div>
      </div>

      {/* card hadiah */}

      <div className='card-hadiah mt-[150px] flex flex-col items-center px-3'>
    

      <div className='overflow-y-auto hide-scrollbar max-h-[400px] w-full'>
  {rewards.map((reward) => (
    <Link to={`/tukar/${reward.id}`} key={reward.id} className='w-full'>
      <div className='card-item flex items-center gap-1 justify-center mt-5 bg-white shadow-md rounded-2xl max-w-max p-2 my-5 mx-auto hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105'>
        <div className='image w-[130px] h-[100px]'>
          <img className='object-cover w-full h-full' src={reward.image} alt={reward.name} />
        </div>

        <div className='desc w-[200px] ml-5'>
          <p className='text-[16px] font-semibold'>{reward.name}</p>
          <p className='text-[14px]'>{reward.desc}</p>
          <p className='text-[15px] font-semibold'>{reward.point_cost} Poin</p>
        </div>
      </div>
    </Link>
  ))}
</div>


     
    </div>

      <Navigation />



    </div>
  )
}

export default Index