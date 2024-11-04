import React, { useState, useEffect } from 'react';
import notifaction from '../assets/ph_bell (1).png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';




const Userheader = () => {

  const [userData, setUserData] = useState({});

  const navigate = useNavigate(); 
  // Fetch data user saat komponen dimuat
  useEffect(() => {
   const fetchData = async () => {
       const token = localStorage.getItem('token'); // Mengambil token dari localStorage
       const userDataLocal = localStorage.getItem('user'); // Mengambil data user dari localStorage
 
       if (!token) {
           navigate('/login'); // Jika token tidak ada, arahkan ke login
           return;
       }
 
       if (userDataLocal) {
           // Jika data user ada di localStorage, ambil dari situ
           const user = JSON.parse(userDataLocal);
           setUserData(user); // Set data user dari localStorage
           
       } else {
           // Jika data user tidak ada, lakukan fetch API
           try {
               const response = await axios.get('http://localhost:8000/api/user', {
                   headers: {
                       Authorization: `Bearer ${token}`,
                   },
               });
               setUserData(response.data); // Set data user
               // Simpan data user ke localStorage
               localStorage.setItem('user', JSON.stringify(response.data));
           } catch (error) {
               console.error('Error fetching user data:', error);
               navigate('/login'); // Arahkan ke login jika error
           }
       }
   };
 
   fetchData();
 }, [navigate]);

  return (
    <div>
      <div className='flex justify-between pt-5 px-5'>
        <Link to={`/Profile/Datadiri/${userData.nik}`}className="text-decoration-none text-dark">
          <div className='flex'>
                 <img className='w-[40px] h-[40px] rounded-full' src={userData.image_profile} alt="" />
                <div className='ml-3'>
                    <h1 className=' text-[24px] leading-6 mb-2 font-semibold '> HI, {userData.name} </h1>
                    <p className='text-[#8696BB] text-[15px]'>Selamat Datang di Mijelin</p>
                </div>
          </div>
        </Link>

        <div>
          <img className='w-[40px]' src={notifaction} alt="" />
        </div>
      </div>

       {/* Poin */}
       <div className=" flex mx-5 p-5 mt-5 rounded-xl text-white justify-between  bg-[#2D5D83]">
         
         <div className="p-2 items-start">
           <p>Total poin</p>
           <p className="text-[25px] font-bold">{userData.points}</p>
         </div>
        

         <div className="flex gap-12 max-sm:gap-6">
           <Link to={`/tukar`}>
           <div className="flex flex-col items-center     ">
                 <img
                   className="w-[70px] max-sm:w-[50px] "
                   src="../src/assets/icon (1).png"
                   alt=""
                 />
                 <p className="text-center text-sm">Tukar poin</p>
               </div>

           </Link>
             
             <Link to={`/riwayat`}>
             <div className="flex flex-col items-center">
                 <img
                   className="w-[70px] max-sm:w-[50px]"
                   src="../src/assets/icon (2).png"
                   alt=""
                 />
                 <p className="text-center text-sm">Transaksi</p>
               </div>
             
             </Link>
               
         </div>
       </div>
    </div>
  )
}

export default Userheader