import React from 'react'

const Userheader = () => {
  return (
    <div>
         <div className='flex justify-between pt-5 px-5'>
          <div className='flex'>
            <img className='w-[40px] h-[40px]' src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="" />
            <div className='ml-3'>
              <h1 className=' text-[24px] '> HI, Alan </h1>
              <p className='text-[#8696BB] text-[15px]'>Selamat Datang di Mijelin</p>
            </div>
          </div>

          <div>
            <img className='w-[40px]' src="../assets/ph_bell (1).png" alt="" />
          </div>
        </div>
    </div>
  )
}

export default Userheader