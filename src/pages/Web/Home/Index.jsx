import Navigation from "../../../components/Navigation";
// import './App.css'
import React from "react";
import Userheader from "../../../components/Userheader";
// import Routes from '../../routes/routes';
import { Link } from 'react-router-dom'
import Beritahome from "../../../components/Beritahome";

function Home() {
  return (
    <React.Fragment>
      {/* <div className='max-w-[550px] mx-auto bg-[linear-gradient(to_top,_#FFFFFF,_#DEE7F1_50%,_#B0C4DE_100%)] shadow-lg h-[100vh] '> */}
      <div className="max-w-[550px] mx-auto bg-[#FFFFFF] shadow-xl h-auto pb-[100px]">
        {/* Profile & Notif */}
        <Userheader />

       

        {/* jadwal jemput  */}
        <div className="p-5 flex flex-col">
          <div className="flex justify-between">
            <p className="text-[20px] ">jadwal jemput</p>
            <p className="text-[#8696BB]">lihat semua</p>
          </div>

          <div className="flex flex-col w-full p-5 mt-2 rounded-xl justify-center m-auto items-center h-[150px] text-center bg-[#FFFFFF] shadow-lg">
            <img
              className="w-[100px]"
              src="../src/assets/icon jemput.png"
              alt=""
            />
            <p className="text-[#8696BB]">Belum ada jadwal jemput</p>
          </div>
        </div>

        <Beritahome />

      
        <Navigation />
      </div>
    </React.Fragment>
  );
}

export default Home;
