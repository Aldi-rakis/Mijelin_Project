import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../../components/Navigation";
import img from "../../../assets/back_arrow.png";
import AOS from "aos";
import "aos/dist/aos.css";
import dayjs from "dayjs";
import "dayjs/locale/id";
import useRiwayatStore from "../../../components/store/RiwayatStore";
import LoadingLottie from "../../../components/loadingLottie";

const Riwayat = () => {
  const uuid = localStorage.getItem("uuid");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("setor");
  const token = localStorage.getItem("token");

  const { RiwayatData, isLoading, fetchRiwayatSetor, fetchRiwayatPenukaran } =
    useRiwayatStore();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (token) {
      if (activeTab === "setor" && RiwayatData.setor.length === 0) {
        fetchRiwayatSetor(uuid, token);
      } else if (
        activeTab === "penukaran" && RiwayatData.penukaran.length === 0
      ) {
        const nik = localStorage.getItem("nik");
        fetchRiwayatPenukaran(nik, token);
      }
    }
  }, [activeTab, uuid, token, fetchRiwayatSetor, fetchRiwayatPenukaran]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Sukses":
        return "#2D5D83";
      case "Batal":
        return "#E74C3C";
      case "Proses":
      default:
        return "#FFB300";
    }
  };

  const renderRiwayatContent = (data, type) => {
    // if (isLoading) {
    //   return <LoadingLottie />;
    // }

    if (data.length === 0) {
      return (
        <div className="text-center text-[#8696BB] mt-5">
          {type === "setor" ? "Belum ada data setor." : "Belum ada data penukaran."}
        </div>
      );
    }

    return data.map((item) => (
      <div
        key={item.id}
        className="item-card-riwayat bg-white shadow-lg rounded-lg flex flex-col p-3 mt-2 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
      >
        <div className="flex justify-between items-center">
          <p className="text-[15px] font-semibold">{item.volume || item.name}</p>
          <p
            className="w-[100px] text-center text-white px-5 rounded-lg font-semibold"
            style={{ backgroundColor: getStatusColor(item.status) }}
          >
            {item.status}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[12px] text-[#8696BB]">{item.points}</p>
          <p className="text-[14px] text-[#8696BB] m-2">
            {dayjs(item.time).locale("id").format("dddd, D MMMM YYYY HH:mm")}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-[550px] mx-auto bg-[#FFFFFF] shadow-xl min-h-[100vh] pb-[100px]">
      <div>
        <div className="text-center flex justify-between w-[60%] items-start mt-3">
          <img
            className="w-[40px] ml-5 h-[40px] bg-white rounded-lg p-1 shadow-sm border"
            src={img}
            alt="Back"
          />
          <h1 className="text-[25px] font-semibold">Riwayat</h1>
        </div>

        <div className="flex items-center justify-center font-poppins m-auto gap-5 mt-5">
          <div
            onClick={() => setActiveTab("setor")}
            className={`cursor-pointer ${activeTab === "setor" ? "font-semibold" : ""}`}
          >
            <p>Setor Mijel</p>
            {activeTab === "setor" && (
              <div className="border-b-2 border-[#2D5D83] w-full mt-1" />
            )}
          </div>
          <div
            onClick={() => setActiveTab("penukaran")}
            className={`cursor-pointer ${activeTab === "penukaran" ? "font-semibold" : ""}`}
          >
            <p>Penukaran Mijel</p>
            {activeTab === "penukaran" && (
              <div className="border-b-2 border-[#2D5D83] w-full mt-1" />
            )}
          </div>
        </div>

        {/* Riwayat Setor */}
        {activeTab === "setor" && (
          <div data-aos="fade-up" className="card-riwayat mt-5 flex flex-col p-5">
            {renderRiwayatContent(RiwayatData.setor, "setor")}
          </div>
        )}

        {/* Riwayat Penukaran */}
        {activeTab === "penukaran" && (
          <div data-aos="fade-up" className="card-riwayat mt-5 flex flex-col p-5">
            {renderRiwayatContent(RiwayatData.penukaran, "penukaran")}
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Riwayat;
