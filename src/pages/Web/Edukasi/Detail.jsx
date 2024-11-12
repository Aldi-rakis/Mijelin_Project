import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import minyak from '../../../assets/img_edukasi.png';
import '../Edukasi/detail.css';

const Detail = () => {
  const { id } = useParams(); // Mendapatkan id dari URL
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState(null); // Menyimpan data berita

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Mengambil data dari API berdasarkan id
    axios.get(` http://localhost:8000/api/news/${id}`)
      .then((response) => {
        setNewsData(response.data); // Menyimpan data dari respons API
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  if (!newsData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF] shadow-xl h-[100vh] pb-[100px]'>
      <div className='relative w-full bg-center bg-cover'>
        <div className='absolute top-2 w-full text-center flex justify-center items-start h-6'>
          <img
            onClick={goBack}
            className='w-[40px] left-0 absolute ml-5 h-[40px] bg-white rounded-lg p-1 shadow-sm border'
            src='../src/assets/back_arrow.png'
            alt="Back"
          />
          <h1 className='text-[25px] font-semibold text-[#fff]'>Tukar</h1>
        </div>

        <div className='w-full h-[350px]'>
          <img
            id='image'
            className='w-full h-full object-cover'
            src={newsData.image || minyak}
            alt="News"
          />
        </div>

        {/* Card Poin */}
        <div className='relative -translate-y-[40px] w-full px-[40px] bg-[#fff] rounded-3xl z-10 h-[calc(100vh-100px)] overflow-y-auto text-justify'>
          <p id='title' className='text-lg lg:text-2xl font-bold mt-10'>{newsData.title}</p>
          <p id='date' className='text-sm text-[#8696BB] mt-3'>{newsData.date}</p>
          <p id='content' className='content-preview text-sm text-[#000000] mt-4 leading-7' dangerouslySetInnerHTML={{ __html: newsData.content }}></p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
