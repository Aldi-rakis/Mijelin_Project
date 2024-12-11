import { useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import { useNavigate, Link } from 'react-router-dom'

import useBeritaStore from '../../../components/store/useNewsStore'; // Import store Zustand

const Index = () => {
  const { berita, isLoading, fetchBerita } = useBeritaStore();


  useEffect(() => {
    if (!berita || Object.keys(berita).length === 0) { // Fetch hanya jika data belum ada
      fetchBerita();
    } // Panggil fungsi untuk mengambil data berita
  }, [fetchBerita]);

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder saat loading
  }

  return (
    <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF] shadow-xl h-100% pb-[150px]'>
      <h1 className='text-[25px] font-semibold text-[#fff] text-center mt-2 bg-cyan-400 max-w-max m-auto px-2 rounded-md'>Edukasi</h1>

      <div className='flex flex-col px-3 pb-10'>
        {berita.map((item) => (

          <Link to={`/berita/${item.id}`} key={item.id} className="no-underline"> {/* Memastikan Link mengelilingi konten */}

            <div className='card flex flex-row px-2 mt-2 shadow-md rounded-md py-2'>


              <div className='w-2/4'>
                <img
                  className="rounded-lg bg-cover w-full h-[200px] object-cover"
                  src={item.image}
                  alt=""
                />

              </div>
              <div className='w-3/4 mx-5 flex flex-col justify-between'> {/* Menggunakan flex-col untuk menyusun elemen secara vertikal */}
                <div>
                  <p className="text-[15px] font-medium ">
                    Bahaya Minyak Jelantah Bagi Lingkungan
                  </p>
                  <hr className='border-2 border-black ' />

                  <p className='description line-clamp-3  text-[12px] mt-1 font-normal text-justify'>
                    descriptionbaaak Lorem, ipsum dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam commodi, quod deserunt ut placeat dolorem esse ex incidunt excepturi.lorem 100 Lorem ipsum dolor sit amet consectetur adipisicing elit. In, maxime!
                  </p>
                </div>

                <div className="mt-4"> {/* Memberikan margin atas pada div ini agar ada jarak yang jelas */}
                  <p className="text-[12px] font-medium">
                    Detik.com <span className="text-[#9397A0]">Sep 9, 2022</span>
                  </p>
                </div>
              </div>


            </div>
          </Link>

        ))

        }




      </div>



      <Navigation />

    </div>
  )
}

export default Index