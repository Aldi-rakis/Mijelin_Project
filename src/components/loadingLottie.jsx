import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../public/lottie (1).json'; // Pindahkan file JSON ke src/assets

const LoadingLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

 
  return (
    <div className="flex justify-center items-center h-max flex-col">
      <Lottie
        options={defaultOptions}
        height={100}
        width={100}
        isStopped={false} // Gunakan false jika animasi harus berjalan
        isPaused={false} // Gunakan false jika animasi tidak dijeda
      />
      <p className='mt-4'>Loading data</p>
    </div>
  );
};

export default LoadingLottie;
