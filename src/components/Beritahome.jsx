import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Beritahome = () => {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/news/'); // Ganti dengan URL API yang sesuai
        const result = await response.json();

        // Jika data API dalam bentuk array di root
        const beritaArray = Array.isArray(result) ? result : result.data;

        // Mengurutkan berdasarkan tanggal terbaru, pastikan `date` adalah nama field tanggal di data
        const sortedBerita = beritaArray.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Ambil 5 berita terbaru
        setBerita(sortedBerita.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Seksi Edukasi */}
      <div className="p-5 flex flex-col">
        <div className="flex justify-between">
          <p className="text-[20px]">Edukasi</p>
          <Link to="/berita">
            <p className="text-[#8696BB]">lihat semua</p>
          </Link>
        </div>

        <div className="flex flex-col px-3 pb-10">
          {berita.map((item) => (
            <Link to={`/berita/${item.id}`} key={item.id} className="no-underline"> {/* Memastikan Link mengelilingi konten */}
              <div className="card flex flex-row px-2 mt-2 shadow-md rounded-md py-2">
                <div className="w-2/4">
                  <img
                    className="rounded-lg bg-cover w-[200px] h-[150px] object-cover"
                    src={item.image || "../src/assets/img_edukasi.png"} // Gunakan gambar dari API jika ada
                    alt={item.title || "Gambar edukasi"}
                  />
                </div>
                <div className="w-3/4 mx-5 flex flex-col justify-between">
                  <div>
                    <p className="text-[15px] font-medium">{item.title}</p>
                    <hr className="border-2 border-black" />
                    <p className="description line-clamp-3 text-[12px] mt-1 font-normal text-justify" dangerouslySetInnerHTML={{ __html: item.content }}>
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-[12px] font-medium" >
                      {item.source || "Mijelin,"} <span className="text-[#9397A0]">{item.date || "Tanggal tidak tersedia"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Beritahome;
