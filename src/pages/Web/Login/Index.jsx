import React from 'react'
import logowhite from '../../../assets/logo-white.png'
import motor_login from '../../../assets/motor_login.png'
import { Link } from 'react-router-dom'

const Index = () => {
  return (
           <div className='max-w-[550px] mx-auto bg-[linear-gradient(to_top,_#FFFFFF,_#DEE7F1_50%,_#B0C4DE_100%)] shadow-lg h-[100vh] '>

            <div className='flex flex-col justify-between items-center h-100% text-center gap-3 '>
              <img className='w-[200px] h-[100px]' src={logowhite} alt="" />
              <img className='w-[300px]' src={motor_login} alt="" />

              <h1 className='text-[30px] text-start mx-5 font-semibold'>Ubah <span className='text-[#2D5D83]'>Limbah </span> Jadi Barang <span className='text-[#2D5D83]'>Berguna </span>  </h1>

            <Link to={`/login`} className='nodecoration-none w-full'>
            <button className='bg-[#2D5D83] text-xl text-white p-2 w-[90%] mx-5 mt-5 rounded-lg'>Login</button>
            </Link>

            <Link to={`/register`} className='nodecoration-none w-full'>
            <button className='border-2 border-[#2D5D83] text-xl text-black p-2 w-[90%] mx-5 rounded-lg'>Register</button>
            </Link>
              

            </div>

        

    </div>
  )
}

export default Index