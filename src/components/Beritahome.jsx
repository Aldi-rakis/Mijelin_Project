import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useBeritaStore from '../components/store/useNewsStore'; // Import store Zustand
import LoadingLottie from './loadingLottie';

const Beritahome = () => {
  const { berita, isLoading, fetchBerita } = useBeritaStore();

  useEffect(() => {
    if (!berita || Object.keys(berita).length === 0) { // Fetch hanya jika data belum ada
      fetchBerita();
    } // Panggil fungsi untuk mengambil data berita
  }, [fetchBerita]);

  if (isLoading) {
    return <div>
      
<LoadingLottie />

    </div>; // Placeholder saat loading
  }

  // Mengambil hanya 5 berita terbaru
  const beritaTerbaru = berita.slice(0, 5);

  return (
    <div>
      {/* Seksi Edukasi */}
      <div className="p-5 flex flex-col min-h-[200px]">
        <div className="flex justify-between">
          <p className="text-[20px]">Edukasi</p>
          <Link to="/berita">
            <p className="text-[#8696BB]">lihat semua</p>
          </Link>
        </div>

        <div className="flex flex-col px-3 pb-10 ">
          {beritaTerbaru.map((item) => (
            <Link to={`/berita/${item.id}`} key={item.id} className="no-underline"> {/* Memastikan Link mengelilingi konten */}
              <div className="card flex flex-row px-2 mt-2 shadow-md rounded-md py-2">
                <div className="w-2/4">
                  <img
                    className="rounded-lg bg-cover w-[200px] h-[120px] object-cover"
                    src={item.image || "../src/assets/img_edukasi.png"} // Gunakan gambar dari API jika ada
                    alt={item.title || "Gambar edukasi"}
                  />
                </div>
                <div className="w-3/4 mx-5 flex flex-col justify-between">
                  <div>
                    <p className="text-[15px] font-medium">{item.title}</p>
                    <hr className="border-2 border-black" />
                    <p
                      className="description line-clamp-3 text-[12px] mt-1 font-normal text-justify"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></p>
                  </div>
                  <div className="mt-4">
                    <p className="text-[12px] font-medium">
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
